// components/contact/contact-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm } from '@/app/contact/actions';
import { useState, useTransition } from 'react';

// Schema التحقق من البيانات
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3).max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
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
        reset();
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* حقل الاسم */}
      <div className="space-y-2">
        <label 
          htmlFor="name" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Your Name *
        </label>
        <div className="relative">
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 rounded-xl
                       transition-all duration-300 outline-none
                       ${errors.name 
                         ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                         : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10'
                       }
                       disabled:opacity-50 disabled:cursor-not-allowed
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       text-gray-900 dark:text-white`}
            placeholder="Kareem Ebrahim"
            disabled={isPending}
          />
          {errors.name && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {errors.name && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400 animate-in slide-in-from-top-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      {/* حقل البريد الإلكتروني */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email Address *
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 rounded-xl
                       transition-all duration-300 outline-none
                       ${errors.email 
                         ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                         : 'border-gray-200 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/10'
                       }
                       disabled:opacity-50 disabled:cursor-not-allowed
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       text-gray-900 dark:text-white`}
            placeholder="kareem@example.com"
            disabled={isPending}
          />
          {errors.email && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {errors.email && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400 animate-in slide-in-from-top-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email.message}
          </p>
        )}
      </div>

      {/* حقل الموضوع */}
      <div className="space-y-2">
        <label 
          htmlFor="subject" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <svg className="w-4 h-4 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Subject
          <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                     transition-all duration-300 outline-none
                     focus:border-pink-500 dark:focus:border-pink-400 focus:ring-4 focus:ring-pink-500/10
                     disabled:opacity-50 disabled:cursor-not-allowed
                     placeholder:text-gray-400 dark:placeholder:text-gray-500
                     text-gray-900 dark:text-white"
          placeholder="Project Collaboration"
          disabled={isPending}
        />
      </div>

      {/* حقل الرسالة */}
      <div className="space-y-2">
        <label 
          htmlFor="message" 
          className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        >
          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Your Message *
        </label>
        <div className="relative">
          <textarea
            id="message"
            {...register('message')}
            rows={6}
            className={`w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 rounded-xl
                       transition-all duration-300 outline-none resize-none
                       ${errors.message 
                         ? 'border-red-300 dark:border-red-800 focus:border-red-500 focus:ring-4 focus:ring-red-500/10' 
                         : 'border-gray-200 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-400 focus:ring-4 focus:ring-green-500/10'
                       }
                       disabled:opacity-50 disabled:cursor-not-allowed
                       placeholder:text-gray-400 dark:placeholder:text-gray-500
                       text-gray-900 dark:text-white`}
            placeholder="Tell me about your project or idea..."
            disabled={isPending}
          />
          {errors.message && (
            <div className="absolute right-3 top-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        {errors.message && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400 animate-in slide-in-from-top-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot للحماية من السبام */}
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
          className={`p-4 rounded-xl border-2 animate-in slide-in-from-top-2 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {submitStatus.type === 'success' ? (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className="text-sm font-medium leading-relaxed">{submitStatus.message}</p>
          </div>
        </div>
      )}

      {/* معلومة مفيدة */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          Your information is secure and will never be shared with third parties.
        </p>
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={isPending}
        className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                   disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                   text-white font-bold rounded-xl transition-all duration-300
                   hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5
                   disabled:hover:translate-y-0 disabled:hover:shadow-none
                   flex items-center justify-center gap-3 overflow-hidden"
      >
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <span className="relative flex items-center gap-3">
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
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </>
          )}
        </span>
      </button>
    </form>
  );
}