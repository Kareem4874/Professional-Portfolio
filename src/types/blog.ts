export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  authorImage?: string;
  image: string;
  tags: string[];
  category?: string;
  published: boolean;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
  readingTime: string;
  wordCount: number;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}