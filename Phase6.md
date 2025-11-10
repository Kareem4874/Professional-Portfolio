# 📧 Phase 6: Contact Page - الدليل التفصيلي

## 🎯 الهدف من هذه المرحلة
بناء صفحة اتصال احترافية باستخدام **Server Actions** في Next.js 16 مع تفعيل **Partial Prerendering (PPR)** لضمان أداء فائق وتجربة مستخدم ممتازة.

---

## 📋 المحتويات
1. [تثبيت المكتبات](#1-تثبيت-المكتبات)
2. [تفعيل PPR للصفحة](#2-تفعيل-ppr-للصفحة)
3. [إنشاء Server Action](#3-إنشاء-server-action)
4. [بناء نموذج الاتصال](#4-بناء-نموذج-الاتصال)
5. [تطبيق Rate Limiting](#5-تطبيق-rate-limiting)
6. [تصميم صفحة الاتصال](#6-تصميم-صفحة-الاتصال)
7. [الحماية من السبام](#7-الحماية-من-السبام)

---

## 1. تثبيت المكتبات

### الخطوة 1.1: تثبيت React Hook Form و Zod

```bash
npm install react-hook-form zod @hookform/resolvers
```

**الشرح:**
- `react-hook-form`: مكتبة قوية لإدارة النماذج مع أداء عالي
- `zod`: مكتبة للتحقق من صحة البيانات (validation)
- `@hookform/resolvers`: ربط Zod مع React Hook Form

---

## 2. تفعيل PPR للصفحة

### الخطوة 2.1: إنشاء ملف الصفحة

**المسار:** `app/contact/page.tsx`

```typescript
// app/contact/page.tsx
import { Suspense } from 'react';
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';

// تفعيل Partial Prerendering لهذه الصفحة
export const experimental_ppr = true;

export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch with me for collaborations and opportunities',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">
          Get In Touch
        </h1>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? 
          Feel free to reach out using the form below.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Static Part - يتم تحميله فوراً مع PPR */}
          <ContactInfo />

          {/* Dynamic Part - النموذج التفاعلي */}
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loader للنموذج
function ContactFormSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 bg-gray-800 rounded-lg" />
      <div className="h-12 bg-gray-800 rounded-lg" />
      <div className="h-32 bg-gray-800 rounded-lg" />
      <div className="h-12 bg-gray-800 rounded-lg" />
    </div>
  );
}
```

**الشرح:**
- `experimental_ppr = true`: تفعيل PPR لتحميل الأجزاء الثابتة فوراً
- `ContactInfo`: معلومات ثابتة (Static) - Server Component
- `ContactForm`: نموذج تفاعلي (Dynamic) - Client Component
- `Suspense`: لعرض loader أثناء تحميل النموذج

---

## 3. إنشاء Server Action

### الخطوة 3.1: إنشاء ملف Server Actions

**المسار:** `app/contact/actions.ts`

```typescript
// app/contact/actions.ts
'use server';

import { z } from 'zod';

// Schema للتحقق من البيانات
const contactSchema = z.object({
  name: z.string()
    .min(2, 'الاسم يجب أن يكون حرفين على الأقل')
    .max(100, 'الاسم طويل جداً'),
  email: z.string()
    .email('البريد الإلكتروني غير صحيح'),
  subject: z.string()
    .min(3, 'الموضوع يجب أن يكون 3 أحرف على الأقل')
    .max(200, 'الموضوع طويل جداً')
    .optional(),
  message: z.string()
    .min(10, 'الرسالة يجب أن تكون 10 أحرف على الأقل')
    .max(1000, 'الرسالة طويلة جداً'),
});

// Type للبيانات المُدخلة
type ContactFormData = z.infer<typeof contactSchema>;

// Server Action الرئيسي
export async function submitContactForm(formData: FormData) {
  try {
    // استخراج البيانات من FormData
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    // التحقق من البيانات باستخدام Zod
    const validatedData = contactSchema.parse(rawData);

    // إرسال البيانات إلى Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject || 'رسالة جديدة من الموقع',
        message: validatedData.message,
        from_name: validatedData.name,
        // معلومات إضافية
        botcheck: formData.get('botcheck'), // Honeypot field
      }),
    });

    const result = await response.json();

    // التحقق من نجاح الإرسال
    if (!response.ok || !result.success) {
      throw new Error(result.message || 'فشل إرسال الرسالة');
    }

    // إرجاع نتيجة نجاح
    return {
      success: true,
      message: 'تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.',
    };

  } catch (error) {
    // معالجة أخطاء Zod
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
        errors: error.errors,
      };
    }

    // أخطاء عامة
    console.error('Contact form error:', error);
    return {
      success: false,
      message: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    };
  }
}
```

**الشرح:**
- `'use server'`: تحديد أن هذا ملف Server Actions
- `contactSchema`: قواعد التحقق من البيانات
- `submitContactForm`: الدالة التي ستستقبل البيانات وترسلها
- **CSRF Protection**: تلقائي في Next.js 16 Server Actions

---

## 4. بناء نموذج الاتصال

### الخطوة 4.1: إنشاء مكون النموذج

**المسار:** `components/contact/contact-form.tsx`

```typescript
// components/contact/contact-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/app/contact/actions';
import { useState, useTransition } from 'react';

// نفس Schema من Server Action
const contactSchema = z.object({
  name: z.string().min(2, 'الاسم قصير جداً').max(100),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  subject: z.string().min(3).max(200).optional(),
  message: z.string().min(10, 'الرسالة قصيرة جداً').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('subject', data.subject || '');
      formData.append('message', data.message);

      const result = await submitContactForm(formData);

      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message,
      });

      if (result.success) {
        reset(); // مسح النموذج عند النجاح
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* حقل الاسم */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          الاسم الكامل *
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg 
                     focus:outline-none focus:border-green-500 transition-colors"
          placeholder="أحمد محمد"
          disabled={isPending}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* حقل البريد الإلكتروني */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          البريد الإلكتروني *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg 
                     focus:outline-none focus:border-green-500 transition-colors"
          placeholder="ahmad@example.com"
          disabled={isPending}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* حقل الموضوع */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          الموضوع (اختياري)
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg 
                     focus:outline-none focus:border-green-500 transition-colors"
          placeholder="استفسار عن مشروع"
          disabled={isPending}
        />
      </div>

      {/* حقل الرسالة */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          الرسالة *
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={6}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg 
                     focus:outline-none focus:border-green-500 transition-colors resize-none"
          placeholder="اكتب رسالتك هنا..."
          disabled={isPending}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot للحماية من السبام (مخفي) */}
      <input
        type="text"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* رسالة النتيجة */}
      {submitStatus.type && (
        <div
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success'
              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 
                   disabled:bg-gray-700 disabled:cursor-not-allowed
                   text-black font-semibold rounded-lg transition-colors
                   flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            جاري الإرسال...
          </>
        ) : (
          'إرسال الرسالة'
        )}
      </button>
    </form>
  );
}
```

**الشرح:**
- `'use client'`: مكون تفاعلي يعمل على المتصفح
- `useTransition`: لإدارة حالة الإرسال (React 19)
- `react-hook-form`: لإدارة النموذج والتحقق
- **Progressive Enhancement**: يعمل حتى بدون JavaScript

---

## 5. تطبيق Rate Limiting

### الخطوة 5.1: إنشاء Rate Limiter بسيط

**المسار:** `lib/rate-limit.ts`

```typescript
// lib/rate-limit.ts

// Simple in-memory rate limiter
// للإنتاج، استخدم Vercel KV أو Upstash Redis

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// تنظيف البيانات القديمة كل ساعة
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60 * 60 * 1000);

export async function rateLimit(identifier: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3; // 3 requests per hour

  if (!store[identifier] || store[identifier].resetTime < now) {
    // إنشاء أو إعادة تعيين النافذة
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: maxRequests - 1 };
  }

  if (store[identifier].count >= maxRequests) {
    // تجاوز الحد الأقصى
    return {
      success: false,
      remaining: 0,
      resetTime: new Date(store[identifier].resetTime),
    };
  }

  // زيادة العداد
  store[identifier].count++;
  return {
    success: true,
    remaining: maxRequests - store[identifier].count,
  };
}
```

### الخطوة 5.2: إضافة Rate Limiting للـ Server Action

```typescript
// app/contact/actions.ts
'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { rateLimit } from '@/lib/rate-limit';

// ... (باقي الكود)

export async function submitContactForm(formData: FormData) {
  try {
    // الحصول على IP المستخدم
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // التحقق من Rate Limit
    const rateLimitResult = await rateLimit(ip);
    
    if (!rateLimitResult.success) {
      return {
        success: false,
        message: `لقد تجاوزت الحد الأقصى للطلبات. يرجى المحاولة مرة أخرى بعد ${
          rateLimitResult.resetTime 
            ? new Date(rateLimitResult.resetTime).toLocaleTimeString('ar-EG')
            : 'ساعة'
        }`,
      };
    }

    // ... (باقي كود الإرسال)
    
  } catch (error) {
    // ... (معالجة الأخطاء)
  }
}
```

**الشرح:**
- يقيد المستخدم إلى **3 طلبات في الساعة**
- يستخدم IP Address للتعرف على المستخدم
- **للإنتاج:** استخدم Vercel KV أو Upstash Redis بدلاً من in-memory

---

## 6. تصميم صفحة الاتصال

### الخطوة 6.1: إنشاء مكون معلومات الاتصال (Static)

**المسار:** `components/contact/contact-info.tsx`

```typescript
// components/contact/contact-info.tsx
// Server Component - Static

import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* العنوان */}
      <div>
        <h2 className="text-3xl font-bold mb-4">
          دعنا نبني شيئاً رائعاً معاً
        </h2>
        <p className="text-gray-400 leading-relaxed">
          أنا متاح دائماً للفرص الجديدة والتعاون في المشاريع المثيرة. 
          سواء كان لديك فكرة مشروع أو تريد الاستفسار عن خدماتي، لا تتردد في التواصل.
        </p>
      </div>

      {/* معلومات الاتصال */}
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
          <Mail className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-400 hover:text-green-500 transition-colors"
            >
              your.email@example.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
          <MapPin className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">الموقع</h3>
            <p className="text-gray-400">القاهرة، مصر</p>
          </div>
        </div>
      </div>

      {/* روابط التواصل الاجتماعي */}
      <div>
        <h3 className="font-semibold mb-4">تواصل معي</h3>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900 border border-gray-800 rounded-lg 
                       hover:border-green-500 hover:bg-gray-800 transition-all
                       group"
          >
            <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-900 border border-gray-800 rounded-lg 
                       hover:border-green-500 hover:bg-gray-800 transition-all
                       group"
          >
            <Github className="w-6 h-6 text-gray-400 group-hover:text-green-500 transition-colors" />
          </a>
        </div>
      </div>

      {/* وقت الاستجابة */}
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <p className="text-sm text-green-500">
          ⚡ عادةً ما أرد على الرسائل خلال 24 ساعة
        </p>
      </div>
    </div>
  );
}
```

**الشرح:**
- **Server Component**: يتم تحميله فوراً مع PPR
- معلومات ثابتة لا تتغير
- لا يحتاج JavaScript للعمل

---

## 7. الحماية من السبام

### الخطوة 7.1: إضافة Honeypot Field

تم إضافته بالفعل في النموذج:

```typescript
{/* Honeypot - حقل مخفي */}
<input
  type="text"
  name="botcheck"
  className="hidden"
  tabIndex={-1}
  autoComplete="off"
/>
```

### الخطوة 7.2: التحقق من Honeypot في Server Action

```typescript
// في app/contact/actions.ts

export async function submitContactForm(formData: FormData) {
  // التحقق من Honeypot
  const honeypot = formData.get('botcheck');
  if (honeypot) {
    // البوت ملأ الحقل المخفي - رفض الطلب
    return {
      success: false,
      message: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
    };
  }

  // ... باقي الكود
}
```

**الشرح:**
- **Honeypot**: حقل مخفي للبشر، لكن البوتات تملأه
- إذا تم ملء الحقل = البوت = رفض الطلب
- **CSRF Protection**: تلقائي في Next.js 16

---

## 📝 ملخص ميزات Phase 6

✅ **Partial Prerendering (PPR)**
   - الأجزاء الثابتة تحمّل فوراً
   - النموذج يحمّل بشكل ديناميكي

✅ **Server Actions**
   - أمان تلقائي (CSRF)
   - لا حاجة لـ API Routes
   - Progressive Enhancement

✅ **Form Validation**
   - Client-side مع react-hook-form
   - Server-side مع Zod
   - رسائل خطأ واضحة

✅ **Rate Limiting**
   - 3 طلبات/ساعة لكل IP
   - حماية من الإساءة

✅ **Spam Protection**
   - Honeypot field
   - CSRF tokens (تلقائي)
   - Rate limiting

✅ **User Experience**
   - Loading states واضحة
   - رسائل نجاح/خطأ
   - Progressive enhancement
   - يعمل بدون JavaScript

---

## 🔧 متغيرات البيئة المطلوبة

```env
# .env.local
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

**للحصول على المفتاح:**
1. اذهب إلى [Web3Forms](https://web3forms.com)
2. سجل حساب مجاني
3. احصل على Access Key
4. ضعه في `.env.local`

---

## ✅ اختبار الصفحة

### قائمة الاختبار:

- [ ] الصفحة تحمل بسرعة (PPR يعمل)
- [ ] النموذج يعمل بشكل صحيح
- [ ] رسائل الخطأ تظهر بشكل صحيح
- [ ] رسالة النجاح تظهر بعد الإرسال
- [ ] Rate limiting يعمل (جرب إرسال 4 رسائل)
- [ ] Honeypot يمنع البوتات
- [ ] الصفحة responsive على الموبايل
- [ ] التصميم متناسق مع بقية الموقع
- [ ] البريد الإلكتروني يصل بنجاح

---

## 🎨 تخصيصات إضافية (اختيارية)

### إضافة Recaptcha

```bash
npm install react-google-recaptcha
```

### إضافة Email Notifications

```typescript
// استخدم Resend أو SendGrid
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
```

### إضافة Analytics

```typescript
// تتبع عدد الرسائل المُرسلة
import { track } from '@vercel/analytics';

track('contact_form_submit', {
  success: true,
});
```

---

## 🚀 الخطوة التالية

بعد إكمال Phase 6، انتقل إلى:
- **Phase 7**: الحركات والتفاعلات (Animations)
- **Phase 8**: إضافة المحتوى والبيانات
- **Phase 9**: تحسين SEO والأداء
- **Phase 10**: التجهيز والنشر

---

**تم إنشاؤه بـ 💚 Next.js 16 و Server Actions**

---

## 🎯 نصائح مهمة للتطبيق

### ⚠️ مشاكل شائعة وحلولها

#### المشكلة 1: Server Action لا يعمل
```typescript
// تأكد من وجود 'use server' في أول الملف
'use server';

// تأكد من أن الدالة async
export async function submitContactForm(formData: FormData) {
  // ...
}
```

#### المشكلة 2: PPR لا يعمل
```typescript
// في next.config.ts
const nextConfig = {
  experimental: {
    ppr: true, // تأكد من تفعيله هنا
  },
};

// في الصفحة
export const experimental_ppr = true; // وهنا أيضاً
```

#### المشكلة 3: Validation Errors لا تظهر
```typescript
// تأكد من استخدام zodResolver
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema), // مهم جداً!
});

// عرض الأخطاء
{errors.email && (
  <p className="text-red-500">{errors.email.message}</p>
)}
```

#### المشكلة 4: Web3Forms لا يرسل
```bash
# تأكد من وجود المفتاح في .env.local
NEXT_PUBLIC_WEB3FORMS_KEY=your_actual_key_here

# تأكد من أن المفتاح يبدأ بـ NEXT_PUBLIC_
# لأنه يستخدم في Client Component
```

---

## 🔄 تحسينات إضافية

### 1. إضافة Optimistic UI مع React 19

```typescript
// components/contact/contact-form.tsx
'use client';

import { useOptimistic } from 'react';

export default function ContactForm() {
  const [optimisticState, addOptimistic] = useOptimistic(
    { status: 'idle', message: '' },
    (state, newMessage: string) => ({
      status: 'sending',
      message: newMessage,
    })
  );

  async function handleSubmit(formData: FormData) {
    // عرض رسالة فورية قبل الإرسال الفعلي
    addOptimistic('جاري إرسال رسالتك...');
    
    const result = await submitContactForm(formData);
    
    // تحديث الحالة بالنتيجة الفعلية
    setSubmitStatus({
      type: result.success ? 'success' : 'error',
      message: result.message,
    });
  }

  return (
    <form action={handleSubmit}>
      {/* النموذج */}
      
      {optimisticState.status === 'sending' && (
        <div className="p-4 bg-blue-500/10 text-blue-500 rounded-lg animate-pulse">
          {optimisticState.message}
        </div>
      )}
    </form>
  );
}
```

### 2. إضافة Toast Notifications

```bash
npm install sonner
```

```typescript
// app/layout.tsx
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
```

```typescript
// components/contact/contact-form.tsx
import { toast } from 'sonner';

const onSubmit = async (data: ContactFormData) => {
  const result = await submitContactForm(formData);
  
  if (result.success) {
    toast.success(result.message);
    reset();
  } else {
    toast.error(result.message);
  }
};
```

### 3. إضافة File Upload (للسيرة الذاتية مثلاً)

```typescript
// في النموذج
<div>
  <label htmlFor="resume" className="block text-sm font-medium mb-2">
    إرفاق سيرة ذاتية (اختياري)
  </label>
  <input
    id="resume"
    type="file"
    accept=".pdf,.doc,.docx"
    {...register('resume')}
    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg"
  />
</div>
```

```typescript
// في Server Action
export async function submitContactForm(formData: FormData) {
  const file = formData.get('resume') as File;
  
  if (file && file.size > 0) {
    // معالجة الملف - رفعه إلى Cloudinary أو S3
    const buffer = await file.arrayBuffer();
    // ... رفع الملف
  }
}
```

### 4. إضافة Character Counter

```typescript
// components/contact/character-counter.tsx
'use client';

interface CharacterCounterProps {
  value: string;
  maxLength: number;
}

export function CharacterCounter({ value, maxLength }: CharacterCounterProps) {
  const remaining = maxLength - value.length;
  const percentage = (value.length / maxLength) * 100;
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all ${
            percentage > 90 ? 'bg-red-500' : 'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={percentage > 90 ? 'text-red-500' : 'text-gray-400'}>
        {remaining} حرف متبقي
      </span>
    </div>
  );
}
```

```typescript
// استخدامه في النموذج
const messageValue = watch('message');

<div>
  <label>الرسالة *</label>
  <textarea {...register('message')} maxLength={1000} />
  <CharacterCounter value={messageValue || ''} maxLength={1000} />
</div>
```

---

## 📊 إضافة Analytics للنموذج

### تتبع نجاح/فشل الإرسال

```typescript
// lib/analytics.ts
export function trackContactFormSubmit(success: boolean, error?: string) {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_form_submit', {
      event_category: 'Contact',
      event_label: success ? 'Success' : 'Error',
      value: success ? 1 : 0,
      error_message: error,
    });
  }

  // Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'ContactFormSubmit', {
      success,
      error,
    });
  }
}
```

```typescript
// استخدامه في Server Action
import { trackContactFormSubmit } from '@/lib/analytics';

export async function submitContactForm(formData: FormData) {
  try {
    // ... الإرسال
    
    trackContactFormSubmit(true);
    return { success: true, message: '...' };
  } catch (error) {
    trackContactFormSubmit(false, error.message);
    return { success: false, message: '...' };
  }
}
```

---

## 🎨 تحسينات UI/UX إضافية

### 1. إضافة Auto-save للمسودة

```typescript
'use client';

import { useEffect } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

export default function ContactForm() {
  const { watch } = useForm();
  const formValues = watch();
  const debouncedValues = useDebounce(formValues, 1000);

  useEffect(() => {
    // حفظ في localStorage
    if (debouncedValues) {
      localStorage.setItem('contact-draft', JSON.stringify(debouncedValues));
    }
  }, [debouncedValues]);

  useEffect(() => {
    // استرجاع عند التحميل
    const draft = localStorage.getItem('contact-draft');
    if (draft) {
      const data = JSON.parse(draft);
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, []);

  return (
    <form>
      {/* النموذج */}
      <p className="text-xs text-gray-500">
        ✓ يتم حفظ المسودة تلقائياً
      </p>
    </form>
  );
}
```

### 2. إضافة Suggested Subjects

```typescript
const suggestedSubjects = [
  'استفسار عن مشروع',
  'فرصة عمل',
  'تعاون محتمل',
  'استشارة تقنية',
  'آخر',
];

<div>
  <label>الموضوع</label>
  <div className="flex flex-wrap gap-2 mb-2">
    {suggestedSubjects.map((subject) => (
      <button
        key={subject}
        type="button"
        onClick={() => setValue('subject', subject)}
        className="px-3 py-1 text-sm bg-gray-900 border border-gray-800 
                   rounded-full hover:border-green-500 transition-colors"
      >
        {subject}
      </button>
    ))}
  </div>
  <input {...register('subject')} />
</div>
```

### 3. إضافة Success Animation

```bash
npm install lottie-react
```

```typescript
import Lottie from 'lottie-react';
import successAnimation from '@/public/animations/success.json';

{submitStatus.type === 'success' && (
  <div className="flex flex-col items-center gap-4 p-8">
    <Lottie
      animationData={successAnimation}
      loop={false}
      style={{ width: 150, height: 150 }}
    />
    <p className="text-green-500 text-lg font-semibold">
      {submitStatus.message}
    </p>
  </div>
)}
```

---

## 🔐 تحسينات الأمان

### 1. إضافة CAPTCHA (للحماية الإضافية)

```bash
npm install @hcaptcha/react-hcaptcha
```

```typescript
// components/contact/contact-form.tsx
import HCaptcha from '@hcaptcha/react-hcaptcha';

export default function ContactForm() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  return (
    <form>
      {/* الحقول */}
      
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={(token) => setCaptchaToken(token)}
        theme="dark"
      />

      <button
        type="submit"
        disabled={!captchaToken || isPending}
      >
        إرسال
      </button>
    </form>
  );
}
```

```typescript
// في Server Action
export async function submitContactForm(formData: FormData) {
  const captchaToken = formData.get('h-captcha-response');
  
  // التحقق من CAPTCHA
  const captchaResponse = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  });
  
  const captchaData = await captchaResponse.json();
  
  if (!captchaData.success) {
    return {
      success: false,
      message: 'فشل التحقق من CAPTCHA. يرجى المحاولة مرة أخرى.',
    };
  }
  
  // ... باقي الكود
}
```

### 2. تشفير البيانات الحساسة

```bash
npm install bcryptjs
```

```typescript
import bcrypt from 'bcryptjs';

// إذا كنت تخزن البيانات في قاعدة بيانات
const hashedEmail = await bcrypt.hash(email, 10);
```

### 3. إضافة Request Signing

```typescript
import crypto from 'crypto';

function signRequest(data: string): string {
  const secret = process.env.REQUEST_SECRET!;
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');
}

function verifySignature(data: string, signature: string): boolean {
  const expectedSignature = signRequest(data);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

---

## 📱 تحسين Responsive Design

### استجابة كاملة للموبايل

```typescript
// app/contact/page.tsx
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white 
                    py-12 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          تواصل معي
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* معلومات الاتصال */}
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* النموذج */}
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🧪 Testing الصفحة

### 1. Unit Tests مع Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// __tests__/contact-form.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '@/components/contact/contact-form';

describe('ContactForm', () => {
  it('يعرض رسالة خطأ للبريد الإلكتروني غير الصحيح', async () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/البريد الإلكتروني/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    await waitFor(() => {
      expect(screen.getByText(/البريد الإلكتروني غير صحيح/i)).toBeInTheDocument();
    });
  });

  it('يرسل النموذج بنجاح مع بيانات صحيحة', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/الاسم/i), {
      target: { value: 'أحمد محمد' },
    });
    fireEvent.change(screen.getByLabelText(/البريد/i), {
      target: { value: 'ahmad@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/الرسالة/i), {
      target: { value: 'هذه رسالة اختبار طويلة' },
    });

    fireEvent.click(screen.getByRole('button', { name: /إرسال/i }));

    await waitFor(() => {
      expect(screen.getByText(/تم إرسال رسالتك بنجاح/i)).toBeInTheDocument();
    });
  });
});
```

### 2. E2E Tests مع Playwright

```bash
npm install -D @playwright/test
```

```typescript
// e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test('يرسل نموذج الاتصال بنجاح', async ({ page }) => {
  await page.goto('/contact');

  // ملء النموذج
  await page.fill('input[name="name"]', 'أحمد محمد');
  await page.fill('input[name="email"]', 'ahmad@example.com');
  await page.fill('textarea[name="message"]', 'هذه رسالة اختبار');

  // إرسال النموذج
  await page.click('button[type="submit"]');

  // التحقق من رسالة النجاح
  await expect(page.locator('text=تم إرسال رسالتك بنجاح')).toBeVisible();
});

test('يعرض أخطاء التحقق', async ({ page }) => {
  await page.goto('/contact');

  // إرسال نموذج فارغ
  await page.click('button[type="submit"]');

  // التحقق من رسائل الخطأ
  await expect(page.locator('text=الاسم قصير جداً')).toBeVisible();
  await expect(page.locator('text=البريد الإلكتروني غير صحيح')).toBeVisible();
});
```

---

## 📈 مراقبة الأداء

### إضافة Performance Monitoring

```typescript
// lib/performance.ts
export function measureFormPerformance() {
  if (typeof window === 'undefined') return;

  // قياس وقت تحميل النموذج
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Form Load Time:', entry.duration);
      
      // إرسال إلى Analytics
      window.gtag?.('event', 'timing_complete', {
        name: 'form_load',
        value: Math.round(entry.duration),
        event_category: 'Contact Form',
      });
    }
  });

  observer.observe({ entryTypes: ['measure'] });
  
  performance.mark('form-start');
  
  return () => {
    performance.mark('form-end');
    performance.measure('form-load', 'form-start', 'form-end');
  };
}
```

---

## ✅ Checklist النهائي

قبل الانتقال إلى Phase 7، تأكد من:

- [ ] ✅ النموذج يعمل ويرسل البيانات بنجاح
- [ ] ✅ رسائل الخطأ تظهر بشكل صحيح
- [ ] ✅ Rate Limiting يعمل (اختبر 4 رسائل متتالية)
- [ ] ✅ Honeypot يمنع البوتات
- [ ] ✅ PPR مفعّل والصفحة تحمل بسرعة
- [ ] ✅ Server Actions تعمل بدون أخطاء
- [ ] ✅ البريد يصل إلى Web3Forms
- [ ] ✅ التصميم responsive على جميع الأحجام
- [ ] ✅ Accessibility (يمكن استخدامه بالكيبورد)
- [ ] ✅ Loading states واضحة ومفهومة
- [ ] ✅ Success/Error messages واضحة
- [ ] ✅ النموذج يعمل بدون JavaScript (Progressive Enhancement)
- [ ] ✅ تم اختبار جميع السيناريوهات (نجاح، فشل، أخطاء)

---

## 🎓 ما تعلمته في هذه المرحلة

1. ✅ كيفية استخدام **Server Actions** في Next.js 16
2. ✅ تطبيق **Partial Prerendering (PPR)** على صفحة تفاعلية
3. ✅ بناء نموذج احترافي مع **React Hook Form** و **Zod**
4. ✅ تطبيق **Rate Limiting** لحماية السيرفر
5. ✅ الحماية من **Spam** و **Bots**
6. ✅ معالجة الأخطاء بشكل احترافي
7. ✅ تحسين **User Experience** مع Loading States
8. ✅ **Progressive Enhancement** - يعمل بدون JavaScript

---

## 🚀 الخطوة التالية: Phase 7

الآن وبعد إتمام صفحة الاتصال، حان الوقت للانتقال إلى:

### **Phase 7: Animations & Interactions** 🎨
- View Transitions API
- Framer Motion animations
- Scroll animations
- Micro-interactions
- Loading states

**مدة التنفيذ المتوقعة:** 3 أيام

---

## 📚 مصادر إضافية

### الوثائق الرسمية
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Web3Forms API](https://web3forms.com/docs)

### دروس فيديو مفيدة
- [Next.js 16 Server Actions Tutorial](https://www.youtube.com/results?search_query=nextjs+16+server+actions)
- [React Hook Form Complete Guide](https://www.youtube.com/results?search_query=react+hook+form+tutorial)
- [Form Validation with Zod](https://www.youtube.com/results?search_query=zod+validation)

---

**🎉 مبروك! لقد أنهيت Phase 6 بنجاح!**

**تم التحديث بـ 💚 من Kareem AbdulBaset**