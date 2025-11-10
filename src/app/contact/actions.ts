// app/contact/actions.ts
'use server';

import { z } from 'zod';

// Schema للتحقق من البيانات
const contactSchema = z.object({
  name: z.string()
    .min(2, 'The name must be at least 2 characters long')
    .max(100, 'The name is too long'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.string()
    .min(3, 'The subject must be at least 3 characters long')
    .max(200, 'The subject is too long')
    .optional(),
  message: z.string()
    .min(10, 'The message must be at least 10 characters long')
    .max(1000, 'The message is too long'),
});


// Helper function to get the base URL
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Default to localhost for development
  return 'http://localhost:3000';
}

// Server Action الرئيسي
export async function submitContactForm(formData: FormData) {
  console.log('Form submission started');
  
  try {
    // استخراج البيانات من FormData
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    console.log('Raw form data:', JSON.stringify(rawData, null, 2));

    // التحقق من البيانات باستخدام Zod
    const validatedData = contactSchema.parse(rawData);
    console.log('Form data validated successfully');

    const apiUrl = `${getBaseUrl()}/api/send-email`;
    console.log('Sending request to:', apiUrl);
    
    // إرسال البيانات إلى API endpoint الخاص بنا
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      }),
    });

    const result = await response.json().catch(async () => {
      const text = await response.text();
      console.error('Failed to parse JSON response:', text);
      throw new Error(`Invalid response from server: ${text}`);
    });

    console.log('API Response:', JSON.stringify(result, null, 2));

    // التحقق من نجاح الإرسال
    if (!response.ok || !result.success) {
      console.error('API Error:', result.message || 'Unknown error');
      throw new Error(result.message || 'Failed to send message. Please try again later.');
    }

    console.log('Email sent successfully');
    
    // إرجاع نتيجة نجاح
    return {
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
    };

  } catch (error: unknown) {
    // معالجة أخطاء Zod
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues[0]?.message || 'Invalid form data';
      console.error('Validation error:', errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }

    // General errors
    const errorObj = error as { message?: string; stack?: string; name?: string };
    console.error('Contact form error:', {
      message: errorObj.message,
      stack: errorObj.stack,
      name: errorObj.name,
    });
    
    // Return user-friendly error message
    return {
      success: false,
      message: errorObj.message || 'An error occurred while sending the message. Please try again later.',
    };
  }
}