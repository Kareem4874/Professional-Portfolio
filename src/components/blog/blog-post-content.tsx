'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import { ShareButtons } from './share-buttons';

interface BlogPostContentProps {
  post: {
    title: string;
    date: string;
    readingTime: string;
    tags: string[];
    content: string;
    slug: string;
  };
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <ShareButtons slug={post.slug} title={post.title} />
      </footer>
    </article>
  );
}
