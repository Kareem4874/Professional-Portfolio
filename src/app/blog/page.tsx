import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { getAllPosts } from '@/lib/blog/mdx';
import type { BlogPost } from '@/types/blog';

// Lazy load blog card component for better code splitting
const BlogCard = dynamic(
  () => import('@/components/blog/blog-card').then(mod => ({ default: mod.BlogCard })),
  { 
    ssr: true,
    loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
  }
);

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest articles about web development, Next.js, and more.',
  openGraph: {
    title: 'Blog',
    description: 'Read my latest articles about web development, Next.js, and more.',
    type: 'website',
  },
};

export default function BlogPage() {
  const mdxPosts = getAllPosts();
  
  // Transform MDX posts to match BlogPost type expected by BlogCard
  const posts: BlogPost[] = mdxPosts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.title,
      description: post.description,
      date: post.date,
      author: 'Kareem AbdulBaset',
      image: '',
      tags: post.tags,
      published: true,
      featured: false,
    },
    content: post.content,
    readingTime: post.readingTime,
    wordCount: post.content.split(/\s+/).length,
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        
        {/* Header with animated gradient */}
        <header className="mb-10 sm:mb-14 lg:mb-16 text-center relative">
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply animate-pulse delay-700"></div>
          </div>
          
          <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">📚 My Blog</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Blog
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Thoughts on web development, coding, and technology
          </p>
        </header>

        {/* Posts Grid with staggered animation */}
        {posts.length > 0 ? (
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} featured={false} />
              ))}
            </div>
          </Suspense>
        ) : (
          <EmptyState />
        )}
      </div>
    </main>
  );
}


function EmptyState() {
  return (
    <div className="text-center py-16 sm:py-24 px-4">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
        <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
        No blog posts yet
      </h3>
      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        The first article is coming soon. Stay tuned!
      </p>
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}