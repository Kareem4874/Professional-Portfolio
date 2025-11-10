// Re-export functions from mdx.ts
export {
  getAllPosts,
  getPostBySlug,
} from './mdx';

// Additional utility functions
import { getAllPosts, getPostBySlug, type BlogPost } from './mdx';

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => post.tags.includes(tag));
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(slug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost) return [];
  
  const posts = getAllPosts()
    .filter(post => post.slug !== slug)
    .map(post => {
      const commonTags = post.tags.filter(tag => currentPost.tags.includes(tag));
      return { post, score: commonTags.length };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
  
  return posts;
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return getAllPosts().filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getFeaturedPosts(limit: number = 3): BlogPost[] {
  return getAllPosts().slice(0, limit);
}
