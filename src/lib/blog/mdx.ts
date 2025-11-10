import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: string;
}

// قراءة كل المقالات
function generateSlug(filename: string): string {
  // Remove the .mdx extension and convert to lowercase
  return filename.replace(/\.mdx$/, '').toLowerCase();
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(contentDirectory);
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = generateSlug(file);
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content } = matter(fileContents);
      
      // Ensure we have a valid date from frontmatter or use a fallback
      const postDate = data.date || '1970-01-01';
      
      return {
        slug,
        title: data.title || 'Untitled',
        date: postDate,
        description: data.description || '',
        tags: Array.isArray(data.tags) ? data.tags : [],
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

// قراءة مقالة واحدة
export function getPostBySlug(slug: string): BlogPost | undefined {
  // Decode the slug to handle URL-encoded characters
  const decodedSlug = decodeURIComponent(slug);
  
  // First try exact match
  const posts = getAllPosts();
  let post = posts.find((post) => post.slug === decodedSlug);
  
  // If no exact match, try case-insensitive match
  if (!post) {
    post = posts.find((post) => 
      post.slug.toLowerCase() === decodedSlug.toLowerCase()
    );
  }
  
  return post;
}