import { getAllPosts } from '@/lib/blog/posts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts,
  ];
}