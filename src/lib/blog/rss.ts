import RSS from 'rss';
import { getAllPosts } from './posts';

export async function generateRSS() {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  const feed = new RSS({
    title: 'Your Name - Blog',
    description: 'Articles about web development, programming, and technology',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      date: new Date(post.date),
      categories: post.tags,
    });
  });

  return feed.xml({ indent: true });
}