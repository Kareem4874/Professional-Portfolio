import { Suspense } from 'react';
import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';

export const metadata = {
  title: 'Contact Me',
  description: 'Get in touch with me for collaborations and opportunities',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-16 sm:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section with Animated Background */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 relative">
          {/* Animated Gradient Blobs */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply animate-pulse"></div>
            <div className="absolute top-0 right-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Badge */}
          <div className="inline-block mb-4 sm:mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full animate-bounce-slow">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              💬 Let&apos;s Connect
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Get In Touch
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
            Have a project in mind or want to collaborate? 
            <br className="hidden sm:block" />
            I&apos;d love to hear from you. Drop me a message!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info - Static Part */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <ContactInfo />
            </div>
          </div>

          {/* Contact Form - Dynamic Part */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200 dark:border-gray-700/50 p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <Suspense fallback={<ContactFormSkeleton />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700/50 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-800"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-gray-800"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-gray-800"></div>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Join 100+ people who reached out this month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Skeleton Loader
function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Name Field Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-700/50 rounded-xl animate-pulse"></div>
      </div>

      {/* Email Field Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-700/50 rounded-xl animate-pulse"></div>
      </div>

      {/* Subject Field Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-700/50 rounded-xl animate-pulse"></div>
      </div>

      {/* Message Field Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-40 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-700/50 rounded-xl animate-pulse"></div>
      </div>

      {/* Button Skeleton */}
      <div className="h-14 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/50 dark:to-purple-900/50 rounded-xl animate-pulse"></div>

      {/* Info Text Skeleton */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        <div className="w-5 h-5 bg-blue-200 dark:bg-blue-800 rounded-full animate-pulse flex-shrink-0 mt-0.5"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-blue-200 dark:bg-blue-800 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-blue-200 dark:bg-blue-800 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}