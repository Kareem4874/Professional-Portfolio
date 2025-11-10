# Phase 5: Blog System with MDX 📝

**Duration:** 3-4 days  
**Goal:** Implement a fully functional blog system with MDX support, syntax highlighting, and comprehensive blog features

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Blog Architecture](#blog-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Testing Blog System](#testing-blog-system)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 5, we'll build:
- ✅ MDX-powered blog system
- ✅ Syntax highlighting for code blocks
- ✅ Blog post listing with pagination
- ✅ Single blog post page with rich content
- ✅ Table of contents (auto-generated)
- ✅ Reading time calculation
- ✅ Tags/Categories system
- ✅ Search and filter functionality
- ✅ Social sharing buttons
- ✅ Previous/Next post navigation
- ✅ Related posts section
- ✅ RSS feed generation

**Result:** A professional blog that showcases your technical writing and expertise.

---

## 🔧 Prerequisites

Before starting Phase 5:
- ✅ Phase 4 completed successfully
- ✅ Projects page fully functional
- ✅ All components working
- ✅ Navigation updated

---

## 🏗️ Blog Architecture

```
app/
├── blog/
│   ├── page.tsx                  # Blog listing
│   ├── loading.tsx               # Loading state
│   ├── [slug]/
│   │   ├── page.tsx              # Single post page
│   │   └── not-found.tsx         # 404 page
│   └── tag/
│       └── [tag]/
│           └── page.tsx          # Posts by tag
components/
├── blog/
│   ├── blog-card.tsx             # Post card
│   ├── blog-search.tsx           # Search component
│   ├── blog-filters.tsx          # Filter controls
│   ├── table-of-contents.tsx    # TOC component
│   ├── share-buttons.tsx         # Social sharing
│   ├── post-navigation.tsx       # Prev/Next
│   ├── related-posts.tsx         # Related posts
│   ├── author-card.tsx           # Author info
│   └── code-block.tsx            # Custom code block
├── mdx/
│   └── mdx-components.tsx        # Custom MDX components
lib/
├── blog/
│   ├── mdx.ts                    # MDX utilities
│   ├── posts.ts                  # Posts data functions
│   └── rss.ts                    # RSS feed generation
content/
└── blog/                         # Blog posts (MDX files)
    ├── getting-started-with-nextjs.mdx
    ├── mastering-typescript.mdx
    ├── tailwind-best-practices.mdx
    ├── react-performance-tips.mdx
    └── building-accessible-websites.mdx
```

---

## 🚀 Step-by-Step Implementation

### **Part 1: Setup & Dependencies**

---

#### **Step 1: Install Required Packages**

```bash
# MDX and related packages
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# Rehype plugins for enhanced MDX
npm install rehype-highlight rehype-slug rehype-autolink-headings rehype-pretty-code

# Remark plugins
npm install remark-gfm remark-math rehype-katex

# Utilities
npm install gray-matter reading-time date-fns

# Shiki for syntax highlighting
npm install shiki

# RSS feed
npm install rss
```

---

#### **Step 2: Configure Next.js for MDX**

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-gfm'),
    ],
    rehypePlugins: [
      require('rehype-slug'),
      require('rehype-autolink-headings'),
      [
        require('rehype-pretty-code'),
        {
          theme: 'github-dark',
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
    ],
  },
})

module.exports = withMDX(nextConfig)
```

---

#### **Step 3: Add Syntax Highlighting Styles**

Create `app/styles/code-highlight.css`:

```css
/* Code block base styles */
pre {
  @apply overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 my-6;
}

code {
  @apply text-sm font-mono;
}

/* Inline code */
:not(pre) > code {
  @apply bg-muted px-1.5 py-0.5 rounded text-accent font-semibold;
}

/* Line numbers */
code[data-line-numbers] {
  counter-reset: line;
}

code[data-line-numbers] > [data-line]::before {
  counter-increment: line;
  content: counter(line);
  @apply inline-block w-4 mr-4 text-right text-muted-foreground;
}

/* Highlighted lines */
.line--highlighted {
  @apply bg-accent/10 border-l-2 border-accent pl-3 -ml-4 pr-4;
}

/* Highlighted words */
.word--highlighted {
  @apply bg-accent/20 rounded px-1;
}

/* Code block title */
pre[data-title]::before {
  content: attr(data-title);
  @apply block text-xs text-muted-foreground mb-2 font-semibold;
}

/* Copy button container */
pre {
  @apply relative;
}

.copy-button {
  @apply absolute top-2 right-2 p-2 rounded bg-background/80 hover:bg-background border border-border opacity-0 transition-opacity;
}

pre:hover .copy-button {
  @apply opacity-100;
}
```

Import in `app/globals.css`:

```css
@import './styles/code-highlight.css';
```

---

### **Part 2: Type Definitions**

---

#### **Step 4: Create Blog Types**

Create `src/types/blog.ts`:

```typescript
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
```

---

### **Part 3: MDX Utilities**

---

#### **Step 5: Create MDX Helper Functions**

Create `src/lib/blog/mdx.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogPostMetadata } from '@/types/blog';

const BLOG_PATH = path.join(process.cwd(), 'content/blog');

/**
 * Get all MDX files from blog directory
 */
export function getAllBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }
  return fs.readdirSync(BLOG_PATH).filter((file) => /\.mdx?$/.test(file));
}

/**
 * Get blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      metadata: data as BlogPostMetadata,
      content,
      readingTime: stats.text,
      wordCount: stats.words,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog posts with metadata
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = getAllBlogFiles();
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx?$/, '');
      return getPostBySlug(slug);
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => post.metadata.published)
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date);
      const dateB = new Date(b.metadata.date);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.metadata.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<{ name: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagsMap = new Map<string, number>();
  
  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagsMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(
  currentSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const currentPost = await getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = await getAllPosts();
  const currentTags = currentPost.metadata.tags || [];

  // Calculate relevance score for each post
  const postsWithScore = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.metadata.tags?.filter((tag) =>
        currentTags.includes(tag)
      ).length || 0;
      
      return {
        post,
        score: commonTags,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return postsWithScore.slice(0, limit).map((item) => item.post);
}

/**
 * Get previous and next posts
 */
export async function getAdjacentPosts(
  currentSlug: string
): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: allPosts[currentIndex + 1] || null,
    next: allPosts[currentIndex - 1] || null,
  };
}

/**
 * Search posts by query
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    const searchContent = [
      post.metadata.title,
      post.metadata.description,
      post.metadata.tags?.join(' '),
      post.content,
    ]
      .join(' ')
      .toLowerCase();

    return searchContent.includes(lowerQuery);
  });
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.metadata.featured).slice(0, limit);
}

/**
 * Extract table of contents from content
 */
export function extractTableOfContents(content: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, title, level });
  }

  return headings;
}
```

---

### **Part 4: Blog Components**

---

#### **Step 6: Create Blog Card Component**

Create `src/components/blog/blog-card.tsx`:

```typescript
"use client";

import { BlogPost } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { slug, metadata, readingTime } = post;
  const formattedDate = format(new Date(metadata.date), "MMM dd, yyyy");

  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all h-full flex flex-col ${
      featured ? "md:col-span-2" : ""
    }`}>
      {/* Featured Image */}
      <div className={`relative overflow-hidden bg-muted ${
        featured ? "h-64" : "h-48"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <span className="text-6xl">📝</span>
        </div>

        {/* Featured Badge */}
        {metadata.featured && (
          <div className="absolute top-4 right-4 z-20">
            <Badge variant="accent" className="shadow-lg">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span>{readingTime}</span>
          {metadata.author && (
            <>
              <span>•</span>
              <User className="h-3 w-3" />
              <span>{metadata.author}</span>
            </>
          )}
        </div>

        <CardTitle className={`group-hover:text-accent transition-colors ${
          featured ? "text-2xl" : "text-xl"
        }`}>
          {metadata.title}
        </CardTitle>

        <CardDescription className={featured ? "text-base" : ""}>
          {metadata.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {metadata.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {metadata.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{metadata.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Read More Button */}
        <Button variant="accent" size="sm" asChild className="w-full group">
          <Link href={`/blog/${slug}`}>
            Read Article
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

#### **Step 7: Create Blog Search Component**

Create `src/components/blog/blog-search.tsx`:

```typescript
"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BlogSearch({ 
  value, 
  onChange, 
  placeholder = "Search articles..." 
}: BlogSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
```

---

#### **Step 8: Create Blog Filters Component**

Create `src/components/blog/blog-filters.tsx`:

```typescript
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BlogFiltersProps {
  tags: { name: string; count: number }[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function BlogFilters({ tags, selectedTag, onTagChange }: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold">Filter by Tag</h3>
        {selectedTag && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTagChange(null)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.name}
            variant={selectedTag === tag.name ? "accent" : "secondary"}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onTagChange(selectedTag === tag.name ? null : tag.name)}
          >
            {tag.name} ({tag.count})
          </Badge>
        ))}
      </div>
    </div>
  );
}
```

---

#### **Step 9: Create Table of Contents Component**

Create `src/components/blog/table-of-contents.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/types/blog";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
        On This Page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "text-sm text-left transition-colors hover:text-accent w-full",
                activeId === item.id
                  ? "text-accent font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

#### **Step 10: Create Share Buttons Component**

Create `src/components/blog/share-buttons.tsx`:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        asChild
      >
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
}
```

---

#### **Step 11: Create Post Navigation Component**

Create `src/components/blog/post-navigation.tsx`:

```typescript
"use client";

import { BlogPost } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export function PostNavigation({ previous, next }: PostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Previous Post */}
      {previous ? (
        <Link href={`/blog/${previous.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Post</span>
              </div>
              <h3 className="font-heading font-semibold group-hover:text-accent transition-colors">
                {previous.metadata.title}
              </h3>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Post */}
      {next && (
        <Link href={`/blog/${next.slug}`}>
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="p-6 text-right">
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                <span>Next Post</span>
                <ArrowRight className="h-4 w-4" />
              </div>
              <h3 className="font-heading font-semibold group-hover:text-accent transition-colors">
                {next.metadata.title}
              </h3>
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
}
```

---

#### **Step 12: Create Related Posts Component**

Create `src/components/blog/related-posts.tsx`:

```typescript
"use client";

import { BlogPost } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

interface RelatedPostsProps {
  posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 border-t">
      <h2 className="text-3xl font-heading font-bold mb-8">
        Related Articles
      </h2>
      
      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
```

---
# Step 13: Create Author Card Component

Create a professional author card component to display author information at the end of blog posts.

---

## 📁 File Location

Create the file at: `src/components/blog/author-card.tsx`

---

## 📝 Complete Code

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

interface AuthorCardProps {
  name: string;
  bio: string;
  image?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export function AuthorCard({ name, bio, image, social }: AuthorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Author Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0 text-2xl">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>👨‍💻</span>
            )}
          </div>

          {/* Author Details */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="font-heading font-semibold text-lg mb-1">
              Written by {name}
            </h3>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {bio}
            </p>

            {/* Social Links */}
            {social && (
              <div className="flex flex-wrap gap-2">
                {social.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {social.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {social.twitter && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## ✨ Component Features

### Key Features

1. **Flexible Avatar Display**
   - Shows custom image if provided
   - Falls back to emoji icon
   - Gradient background for visual appeal

2. **Responsive Layout**
   - Flexbox layout adapts to content
   - Mobile-friendly design
   - Proper text truncation with `min-w-0`

3. **Social Integration**
   - GitHub, LinkedIn, Twitter links
   - Optional social links (only show if provided)
   - Icon-only buttons for clean look

4. **Accessibility**
   - Proper ARIA labels on links
   - External link attributes (`target="_blank"`, `rel="noopener noreferrer"`)
   - Screen reader friendly
   - Semantic HTML structure

5. **Styling**
   - Consistent with design system
   - Hover effects on buttons
   - Card component for clean container
   - Smooth transitions

---

## 📖 Usage Examples

### Basic Usage

```typescript
import { AuthorCard } from "@/components/blog/author-card";

export default function BlogPost() {
  return (
    <article>
      {/* Blog content */}
      
      {/* Author Card */}
      <AuthorCard
        name="Kareem AbdulBaset"
        bio="Frontend Developer passionate about building modern web applications with React, Next.js, and TypeScript. Love sharing knowledge through writing."
        social={{
          github: "https://github.com/kareemAbdulBaset",
          linkedin: "https://linkedin.com/in/kareemAbdulBaset",
          twitter: "https://twitter.com/kareemAbdulBaset",
        }}
      />
    </article>
  );
}
```




### With Custom Image

```typescript
<AuthorCard
  name="Jane Smith"
  bio="Full-stack developer and tech blogger specializing in web performance and accessibility."
  image="/images/authors/jane.jpg"
  social={{
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  }}
/>
```

### Minimal (No Social Links)

```typescript
<AuthorCard
  name="Alex Johnson"
  bio="Software engineer with a passion for clean code and great user experiences."
/>
```

### Only GitHub Link

```typescript
<AuthorCard
  name="Sarah Lee"
  bio="Open source contributor and JavaScript enthusiast."
  social={{
    github: "https://github.com/sarahlee",
  }}
/>
```

---

## 🎨 Props Interface

```typescript
interface AuthorCardProps {
  name: string;              // Author's full name (required)
  bio: string;               // Short bio/description (required)
  image?: string;            // URL to author image (optional)
  social?: {                 // Social media links (optional)
    github?: string;         // GitHub profile URL
    linkedin?: string;       // LinkedIn profile URL
    twitter?: string;        // Twitter profile URL
  };
}
```

### Props Details

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | ✅ Yes | Author's full name displayed in the card |
| `bio` | `string` | ✅ Yes | Short biography or description (2-3 sentences recommended) |
| `image` | `string` | ❌ No | URL to author's profile image. Falls back to emoji if not provided |
| `social` | `object` | ❌ No | Object containing social media profile URLs |
| `social.github` | `string` | ❌ No | GitHub profile URL |
| `social.linkedin` | `string` | ❌ No | LinkedIn profile URL |
| `social.twitter` | `string` | ❌ No | Twitter profile URL |

---

## 🎨 Styling Customization

### Custom Gradient Colors

Modify the gradient in the avatar section:

```typescript
// Current gradient
<div className="bg-gradient-to-br from-accent/20 to-primary/20">

// Blue gradient
<div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20">

// Green gradient
<div className="bg-gradient-to-br from-green-500/20 to-teal-500/20">

// Orange gradient
<div className="bg-gradient-to-br from-orange-500/20 to-red-500/20">
```

### Larger Avatar

```typescript
// Change avatar size from 16 (64px) to 20 (80px)
<div className="w-20 h-20 rounded-full ...">
```

### Different Card Padding

```typescript
// More padding
<CardContent className="p-8">

// Less padding
<CardContent className="p-4">
```

### Add Border

```typescript
<Card className="overflow-hidden border-2 border-accent/20">
```

---

## 🔧 Advanced Customization

### With Email Link

```typescript
interface AuthorCardProps {
  // ... existing props
  email?: string;
}

// In the component
{email && (
  <Button variant="outline" size="sm" asChild>
    <a href={`mailto:${email}`} aria-label="Email Author">
      <Mail className="h-4 w-4" />
    </a>
  </Button>
)}
```

### With Website Link

```typescript
interface AuthorCardProps {
  // ... existing props
  website?: string;
}

// In the component
{website && (
  <Button variant="outline" size="sm" asChild>
    <a href={website} target="_blank" rel="noopener noreferrer" aria-label="Personal Website">
      <Globe className="h-4 w-4" />
    </a>
  </Button>
)}
```

### With Follow Button

```typescript
<div className="flex items-center justify-between mb-4">
  <h3 className="font-heading font-semibold text-lg">
    Written by {name}
  </h3>
  <Button size="sm" variant="accent">
    Follow
  </Button>
</div>
```

---

## 📱 Responsive Behavior

### Mobile (< 768px)
- Avatar and content stack vertically
- Social buttons wrap to next line
- Full width card

### Tablet & Desktop (≥ 768px)
- Horizontal layout maintained
- Social buttons in a row
- Card width constrained by parent

### Custom Responsive Layout

```typescript
// Stack on mobile, horizontal on tablet+
<div className="flex flex-col sm:flex-row items-start gap-4">
```

---

## ♿ Accessibility Features

1. **ARIA Labels**: Each social button has descriptive `aria-label`
2. **External Links**: Proper `rel="noopener noreferrer"` for security
3. **Alt Text**: Image has alt attribute with author name
4. **Semantic HTML**: Uses proper heading hierarchy (`h3`)
5. **Focus States**: Buttons have visible focus indicators

---

## 🧪 Testing

### Test Cases

```typescript
// Test 1: Renders with minimum props
<AuthorCard name="Test User" bio="Test bio" />

// Test 2: Renders with all props
<AuthorCard
  name="Test User"
  bio="Test bio"
  image="/test.jpg"
  social={{
    github: "https://github.com/test",
    linkedin: "https://linkedin.com/in/test",
    twitter: "https://twitter.com/test",
  }}
/>

// Test 3: Renders with partial social links
<AuthorCard
  name="Test User"
  bio="Test bio"
  social={{ github: "https://github.com/test" }}
/>
```

---

## 🐛 Troubleshooting

### Issue: Social buttons not showing
**Solution**: Ensure the `social` prop is passed and contains valid URLs

### Issue: Avatar image not loading
**Solution**: Check image path and ensure it's in the `public` folder or use absolute URL

### Issue: Buttons not clickable
**Solution**: Verify `asChild` prop is present on Button component

### Issue: Layout breaks on mobile
**Solution**: Check that parent container has proper width constraints

---

## 🔗 Related Components

- `Card` - UI component for container
- `Button` - UI component for social links
- Icons from `lucide-react` - GitHub, Linkedin, Twitter

---

## 📚 Integration with Blog Post

This component should be used at the end of blog posts:

```typescript
// app/blog/[slug]/page.tsx

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
      {/* Blog content */}
      
      {/* Author Card Section */}
      <div className="mt-16">
        <AuthorCard
          name={post.metadata.author || "Your Name"}
          bio="Frontend Developer passionate about building modern web applications."
          social={{
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourprofile",
            twitter: "https://twitter.com/yourhandle",
          }}
        />
      </div>
    </article>
  );
}
```

---

## ✅ Checklist

- [ ] Component file created at correct location
- [ ] All imports working (Card, Button, Icons)
- [ ] TypeScript interface defined correctly
- [ ] Avatar displays properly (with/without image)
- [ ] Social links render conditionally
- [ ] Links open in new tab with proper security
- [ ] Component is responsive on all screen sizes
- [ ] Accessibility attributes present
- [ ] Hover effects working
- [ ] Integrated into blog post page
- [ ] Tested with different prop combinations

---

## 🎯 Next Steps

After completing this step:
1. Move to **Step 14: Create Custom MDX Components**
2. Test the author card in a blog post
3. Customize styling to match your brand
4. Add your actual social media links

---

**Component complete! Ready to showcase author information! ✨**



### **Step 14: Create Custom MDX Components**

Create `src/components/mdx/mdx-components.tsx`:

```typescript
import { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Custom Alert Component for MDX
function Callout({ 
  type = "info", 
  title, 
  children 
}: { 
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: ReactNode;
}) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    error: XCircle,
  };

  const Icon = icons[type];

  return (
    <Alert variant={type} className="my-6">
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}

// Custom Image Component
function MDXImage({ src, alt, ...props }: any) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="w-full h-auto"
        {...props}
      />
    </div>
  );
}

// Custom Link Component
function MDXLink({ href, children, ...props }: any) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline font-semibold"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="text-accent hover:underline font-semibold" {...props}>
      {children}
    </Link>
  );
}

// Export all custom components
export const mdxComponents = {
  // Typography
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl font-heading font-bold mt-12 mb-6 scroll-mt-20" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-3xl font-heading font-bold mt-10 mb-4 scroll-mt-20" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-2xl font-heading font-semibold mt-8 mb-3 scroll-mt-20" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-xl font-heading font-semibold mt-6 mb-2 scroll-mt-20" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: any) => (
    <p className="my-4 leading-7 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="leading-7 text-muted-foreground" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote 
      className="my-6 border-l-4 border-accent pl-6 italic text-muted-foreground" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: any) => <hr className="my-8 border-border" {...props} />,
  
  // Custom components
  Callout,
  Image: MDXImage,
  a: MDXLink,
};
```

---

### **Part 5: Blog Pages**

---

### **Step 15: Create Blog Listing Page**

Create `app/blog/page.tsx`:

```typescript
import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog/mdx";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogFilters } from "@/components/blog/blog-filters";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = {
  title: "Blog | Your Name",
  description: "Articles, tutorials, and thoughts on web development, programming, and technology.",
  openGraph: {
    title: "Blog | Your Name",
    description: "Articles, tutorials, and thoughts on web development",
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Articles, tutorials, and thoughts on web development, programming, and technology
          </p>
        </div>
      </FadeIn>

      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <FadeIn delay={0.1}>
          <BlogSearch value="" onChange={() => {}} />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <BlogFilters 
            tags={tags} 
            selectedTag={null} 
            onTagChange={() => {}} 
          />
        </FadeIn>
      </div>

      {/* Blog Posts Grid */}
      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} featured={post.metadata.featured} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* Empty State */}
      {posts.length === 0 && (
        <FadeIn>
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No blog posts found. Check back soon!
            </p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
```

---

### **Step 16: Create Client-Side Blog Page with Filtering**

Create `app/blog/blog-client.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogSearch } from "@/components/blog/blog-search";
import { BlogFilters } from "@/components/blog/blog-filters";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

interface BlogClientProps {
  posts: BlogPost[];
  tags: { name: string; count: number }[];
}

export function BlogClient({ posts, tags }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filter by search query
      const matchesSearch = searchQuery
        ? post.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.metadata.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.metadata.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      // Filter by selected tag
      const matchesTag = selectedTag
        ? post.metadata.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase())
        : true;

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <>
      {/* Search and Filters */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <BlogSearch 
          value={searchQuery} 
          onChange={setSearchQuery}
          placeholder="Search articles by title, description, or tags..."
        />
        
        <BlogFilters 
          tags={tags} 
          selectedTag={selectedTag} 
          onTagChange={setSelectedTag} 
        />
      </div>

      {/* Results Count */}
      {(searchQuery || selectedTag) && (
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-sm text-muted-foreground">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            {selectedTag && ` in "${selectedTag}"`}
          </p>
        </div>
      )}

      {/* Blog Posts Grid */}
      <StaggerContainer key={`${searchQuery}-${selectedTag}`}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} featured={post.metadata.featured} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-2">
            No articles found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </>
  );
}
```

Update `app/blog/page.tsx`:

```typescript
import { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog/mdx";
import { FadeIn } from "@/components/animations/fade-in";
import { BlogClient } from "./blog-client";

export const metadata: Metadata = {
  title: "Blog | Your Name",
  description: "Articles, tutorials, and thoughts on web development, programming, and technology.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <FadeIn>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Articles, tutorials, and thoughts on web development, programming, and technology
          </p>
        </div>
      </FadeIn>

      {/* Client-side filtering */}
      <BlogClient posts={posts} tags={tags} />
    </div>
  );
}
```

---

### **Step 17: Create Single Blog Post Page**

Create `app/blog/[slug]/page.tsx`:

```typescript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getAdjacentPosts, getRelatedPosts, extractTableOfContents } from "@/lib/blog/mdx";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PostNavigation } from "@/components/blog/post-navigation";
import { RelatedPosts } from "@/components/blog/related-posts";
import { AuthorCard } from "@/components/blog/author-card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { FadeIn } from "@/components/animations/fade-in";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const { metadata } = post;

  return {
    title: `${metadata.title} | Your Name`,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: "article",
      publishedTime: metadata.date,
      authors: [metadata.author],
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { metadata, content, readingTime } = post;
  const formattedDate = format(new Date(metadata.date), "MMMM dd, yyyy");
  
  // Get adjacent and related posts
  const { previous, next } = await getAdjacentPosts(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug, 3);
  
  // Extract table of contents
  const tableOfContents = extractTableOfContents(content);

  // Generate full URL for sharing
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${params.slug}`;

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeIn>
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {metadata.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8">
              {metadata.description}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={metadata.date}>{formattedDate}</time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime}</span>
              </div>

              {metadata.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{metadata.author}</span>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t">
              <ShareButtons title={metadata.title} url={postUrl} />
            </div>
          </header>
        </FadeIn>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-[1fr_250px] gap-12">
          {/* Main Content */}
          <FadeIn delay={0.1}>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                      rehypeHighlight,
                    ],
                  },
                }}
              />
            </div>
          </FadeIn>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <FadeIn delay={0.2}>
                <TableOfContents items={tableOfContents} />
              </FadeIn>
            </div>
          </aside>
        </div>

        {/* Author Card */}
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <AuthorCard
              name={metadata.author || "Your Name"}
              bio="Frontend Developer passionate about building modern web applications with React, Next.js, and TypeScript."
              social={{
                github: "https://github.com/yourusername",
                linkedin: "https://linkedin.com/in/yourprofile",
                twitter: "https://twitter.com/yourhandle",
              }}
            />
          </div>
        </FadeIn>

        {/* Post Navigation */}
        <FadeIn delay={0.4}>
          <div className="mt-16">
            <PostNavigation previous={previous} next={next} />
          </div>
        </FadeIn>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-24">
          <RelatedPosts posts={relatedPosts} />
        </div>
      )}
    </article>
  );
}
```

---

### **Step 18: Create Loading State**

Create `app/blog/[slug]/loading.tsx`:

```typescript
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-8 w-1/2 mt-8" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
```

---

### **Step 19: Create 404 Page for Blog**

Create `app/blog/[slug]/not-found.tsx`:

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function BlogPostNotFound() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-2xl mx-auto text-center">
        <FileQuestion className="h-24 w-24 mx-auto mb-8 text-muted-foreground" />
        
        <h1 className="text-4xl font-heading font-bold mb-4">
          Blog Post Not Found
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, we couldn't find the blog post you're looking for.
          It may have been moved or deleted.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button asChild variant="accent">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

### **Part 6: Sample Blog Posts**

---

### **Step 20: Create Sample MDX Blog Posts**

Create `content/blog/getting-started-with-nextjs.mdx`:

```mdx
---
title: "Getting Started with Next.js 14: A Complete Guide"
description: "Learn how to build modern web applications with Next.js 14, exploring the new App Router, Server Components, and best practices."
date: "2024-01-15"
author: "Your Name"
tags: ["Next.js", "React", "Web Development", "Tutorial"]
category: "Tutorial"
published: true
featured: true
---

# Getting Started with Next.js 14

Next.js 14 brings revolutionary changes to how we build React applications. In this comprehensive guide, we'll explore the new features and best practices.

## What's New in Next.js 14?

Next.js 14 introduces several game-changing features:

- **App Router**: A new way to structure your application
- **Server Components**: Improved performance and SEO
- **Turbopack**: Faster development with Rust-powered bundler
- **Server Actions**: Simplified data mutations

<Callout type="info" title="Pro Tip">
The App Router is now stable and recommended for all new projects. It offers better performance and developer experience.
</Callout>

## Setting Up Your First Project

Let's create a new Next.js 14 project:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Project Structure

The new App Router uses a file-system based routing:

```
app/
├── layout.tsx      # Root layout
├── page.tsx        # Homepage
├── about/
│   └── page.tsx    # About page
└── blog/
    ├── page.tsx    # Blog listing
    └── [slug]/
        └── page.tsx # Blog post
```

## Server Components by Default

One of the biggest changes is that all components are Server Components by default:

```tsx
// This is a Server Component (default)
export default function HomePage() {
  // Can directly access database or APIs
  const data = await fetchData();
  
  return (
    <div>
      <h1>Welcome</h1>
      <p>{data.message}</p>
    </div>
  );
}
```

<Callout type="warning" title="Important">
To use client-side features like hooks or event handlers, add 'use client' directive at the top of your file.
</Callout>

## Data Fetching Patterns

Next.js 14 provides multiple ways to fetch data:

### 1. Server-Side Fetching

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Always fetch fresh data
  });
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>;
}
```

### 2. Static Generation

```tsx
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  return res.json();
}
```

## Conclusion

Next.js 14 represents a major leap forward in React development. The App Router, Server Components, and improved performance make it the perfect choice for modern web applications.

Ready to start building? Check out the [official Next.js documentation](https://nextjs.org/docs) for more details.

<Callout type="success" title="Next Steps">
- Explore the App Router in depth
- Learn about Server Actions
- Build your first full-stack application
</Callout>
```

---

Create `content/blog/mastering-typescript.mdx`:

```mdx
---
title: "Mastering TypeScript: Advanced Types and Patterns"
description: "Deep dive into TypeScript's advanced type system, exploring generics, utility types, and advanced patterns for building type-safe applications."
date: "2024-01-10"
author: "Your Name"
tags: ["TypeScript", "JavaScript", "Programming", "Advanced"]
category: "Advanced"
published: true
featured: true
---

# Mastering TypeScript

TypeScript has become the de facto standard for building scalable JavaScript applications. Let's explore advanced concepts that will take your TypeScript skills to the next level.

## Generic Types

Generics allow you to write reusable, type-safe code:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const result = identity<string>("hello");
const num = identity<number>(42);
```

### Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // ✅ Works
logLength([1, 2, 3]); // ✅ Works
logLength(42); // ❌ Error: number doesn't have length
```

## Utility Types

TypeScript provides built-in utility types for common transformations:

### Partial<T>

Makes all properties optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// All properties are optional
type PartialUser = Partial<User>;

const updateUser = (user: PartialUser) => {
  // Can update any subset of properties
};
```

### Pick<T, K> and Omit<T, K>

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit specific properties
type UserWithoutId = Omit<User, 'id'>;
```

<Callout type="info" title="Best Practice">
Use utility types to derive new types from existing ones. This keeps your codebase DRY and maintainable.
</Callout>

## Advanced Patterns

### Discriminated Unions

```typescript
type Success = {
  status: 'success';
  data: any;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === 'success') {
    // TypeScript knows this is Success
    console.log(result.data);
  } else {
    // TypeScript knows this is Error
    console.log(result.message);
  }
}
```

### Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

## Conclusion

Mastering TypeScript's advanced features will help you write more maintainable, type-safe code. Keep practicing and exploring the type system!
```

---

Create `content/blog/tailwind-best-practices.mdx`:

```mdx
---
title: "Tailwind CSS Best Practices for 2024"
description: "Learn the best practices, tips, and tricks for using Tailwind CSS effectively in modern web development projects."
date: "2024-01-05"
author: "Your Name"
tags: ["Tailwind CSS", "CSS", "Web Development", "Best Practices"]
category: "Tutorial"
published: true
featured: false
---

# Tailwind CSS Best Practices

Tailwind CSS has revolutionized how we write CSS. Here are the best practices to follow in 2024.

## 1. Use @apply Sparingly

While `@apply` is convenient, overusing it defeats Tailwind's purpose:

```css
/* ❌ Bad: Defeating Tailwind's purpose */
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}

/* ✅ Good: Use classes directly in HTML */
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>
```

<Callout type="info" title="When to use @apply">
Use @apply only for truly reusable components that appear many times and need consistent styling.
</Callout>

## 2. Configure Your Theme

Extend Tailwind's theme to match your design system:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... more shades
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

## 3. Use Arbitrary Values Wisely

Tailwind 3+ allows arbitrary values for one-off styles:

```jsx
// ✅ Good for unique values
<div className="top-[117px]">
  Custom positioning
</div>

// ❌ Bad: Should be in config
<div className="text-[#1a1a1a]">
  Use theme colors instead
</div>
```

## 4. Organize Classes with clsx/cn

Keep your className strings readable:

```typescript
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  isPrimary ? 'primary-styles' : 'secondary-styles'
)} />
```

## 5. Responsive Design

Mobile-first approach is key:

```jsx
// ✅ Good: Mobile first
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

// Also use container queries
<div className="@container">
  <div className="@lg:flex @lg:gap-4">
    Container query responsive
  </div>
</div>
```

## 6. Dark Mode Strategy

Implement dark mode properly:

```jsx
// Configure in tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
}

// Use in components
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Dark mode content
</div>
```

## 7. Component Variants with CVA

Use `class-variance-authority` for complex components:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'px-4 py-2 rounded font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'text-sm px-3 py-1',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

## 8. Performance Tips

### Purge Unused Styles

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
};
```

### Use JIT Mode

JIT is now default in Tailwind 3+, providing faster builds and smaller file sizes.

## 9. Accessibility Patterns

```jsx
// ✅ Good: Accessible focus states
<button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  Accessible Button
</button>

// Use sr-only for screen readers
<span className="sr-only">Loading...</span>
```

## 10. Plugin Ecosystem

Leverage official and community plugins:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
```

<Callout type="success" title="Pro Tip">
The @tailwindcss/typography plugin is perfect for styling blog content and MDX!
</Callout>

## Conclusion

Following these best practices will help you build maintainable, performant applications with Tailwind CSS. Remember: Tailwind is a tool—use it wisely!

## Resources

- [Official Tailwind Docs](https://tailwindcss.com)
- [Tailwind UI Components](https://tailwindui.com)
- [Headless UI](https://headlessui.com)
```

---

Create `content/blog/react-performance-tips.mdx`:

```mdx
---
title: "React Performance Optimization: 10 Essential Tips"
description: "Comprehensive guide to optimizing React application performance, covering memoization, code splitting, and advanced rendering techniques."
date: "2023-12-28"
author: "Your Name"
tags: ["React", "Performance", "Optimization", "JavaScript"]
category: "Advanced"
published: true
featured: false
---

# React Performance Optimization

Performance is crucial for user experience. Let's explore 10 essential techniques to optimize your React applications.

## 1. Use React.memo for Component Memoization

Prevent unnecessary re-renders:

```typescript
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }: Props) => {
  // This only re-renders if data changes
  return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>;
});
```

<Callout type="warning" title="Important">
React.memo performs shallow comparison. For deep comparisons, provide a custom comparison function.
</Callout>

## 2. useMemo and useCallback

Memoize expensive calculations and functions:

```typescript
import { useMemo, useCallback } from 'react';

function MyComponent({ items }: Props) {
  // Memoize expensive calculation
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  // Memoize callback
  const handleClick = useCallback((id: string) => {
    console.log('Clicked:', id);
  }, []);

  return <List items={sortedItems} onClick={handleClick} />;
}
```

## 3. Code Splitting with React.lazy

Load components only when needed:

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 4. Virtualization for Long Lists

Use react-window or react-virtualized:

```typescript
import { FixedSizeList } from 'react-window';

function VirtualList({ items }: Props) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

## 5. Optimize Context Usage

Split contexts to minimize re-renders:

```typescript
// ❌ Bad: One large context
const AppContext = createContext({ user, theme, settings });

// ✅ Good: Multiple focused contexts
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const SettingsContext = createContext(settings);
```

## 6. Use Key Prop Correctly

Proper key usage improves reconciliation:

```typescript
// ❌ Bad: Using index as key
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ Good: Using unique ID
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

## 7. Debounce and Throttle

Control event handler frequency:

```typescript
import { useDebouncedCallback } from 'use-debounce';

function SearchInput() {
  const handleSearch = useDebouncedCallback((value: string) => {
    // API call
    searchAPI(value);
  }, 500);

  return (
    <input onChange={(e) => handleSearch(e.target.value)} />
  );
}
```

## 8. Image Optimization

Use next/image or proper lazy loading:

```typescript
import Image from 'next/image';

function Avatar({ src }: Props) {
  return (
    <Image
      src={src}
      alt="Avatar"
      width={50}
      height={50}
      loading="lazy"
      placeholder="blur"
    />
  );
}
```

## 9. Web Vitals Monitoring

Track performance metrics:

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

## 10. Use React DevTools Profiler

Identify performance bottlenecks:

```typescript
import { Profiler } from 'react';

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
) {
  console.log(`${id} took ${actualDuration}ms to ${phase}`);
}

<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

<Callout type="success" title="Performance Checklist">
- ✅ Measure before optimizing
- ✅ Use production build for testing
- ✅ Monitor bundle size
- ✅ Lazy load routes and components
- ✅ Optimize images and assets
</Callout>

## Conclusion

Performance optimization is an ongoing process. Focus on the biggest bottlenecks first and measure the impact of your changes.
```

---

Create `content/blog/building-accessible-websites.mdx`:

```mdx
---
title: "Building Accessible Websites: A Practical Guide"
description: "Learn how to build inclusive, accessible web applications that work for everyone, following WCAG guidelines and best practices."
date: "2023-12-20"
author: "Your Name"
tags: ["Accessibility", "A11y", "Web Development", "Best Practices"]
category: "Tutorial"
published: true
featured: false
---

# Building Accessible Websites

Web accessibility ensures everyone can use your website, regardless of disabilities. Let's explore practical techniques for building inclusive applications.

## Why Accessibility Matters

- **1 billion people** worldwide have disabilities
- **Legal requirements** in many countries
- **Better SEO** and user experience
- **Wider audience reach**

<Callout type="info" title="WCAG Guidelines">
Follow Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as the minimum standard.
</Callout>

## Semantic HTML

Use proper HTML elements:

```html
<!-- ❌ Bad: Divs for everything -->
<div onClick={handleClick}>Click me</div>

<!-- ✅ Good: Semantic button -->
<button onClick={handleClick}>Click me</button>

<!-- ❌ Bad: Non-semantic structure -->
<div class="header">...</div>
<div class="main">...</div>

<!-- ✅ Good: Semantic structure -->
<header>...</header>
<main>...</main>
<footer>...</footer>
```

## ARIA Attributes

Use ARIA when semantic HTML isn't enough:

```tsx
// Modal dialog
<div
  role="dialog"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  aria-modal="true"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
</div>

// Loading state
<button aria-busy="true" aria-live="polite">
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

## Keyboard Navigation

Ensure full keyboard accessibility:

```tsx
function Menu() {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        // Move to next item
        break;
      case 'ArrowUp':
        // Move to previous item
        break;
      case 'Escape':
        // Close menu
        break;
    }
  };

  return (
    <ul role="menu" onKeyDown={handleKeyDown}>
      <li role="menuitem" tabIndex={0}>Item 1</li>
      <li role="menuitem" tabIndex={0}>Item 2</li>
    </ul>
  );
}
```

## Focus Management

Control focus for better UX:

```tsx
import { useRef, useEffect } from 'react';

function Modal({ isOpen }: Props) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus close button when modal opens
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <dialog open={isOpen}>
      <button ref={closeButtonRef}>Close</button>
    </dialog>
  );
}
```

## Color Contrast

Maintain proper contrast ratios:

```css
/* ❌ Bad: Low contrast (2.5:1) */
.text {
  color: #767676;
  background: #ffffff;
}

/* ✅ Good: WCAG AA compliant (4.5:1 minimum) */
.text {
  color: #595959;
  background: #ffffff;
}
```

<Callout type="warning" title="Testing Tools">
Use tools like WAVE, axe DevTools, or Lighthouse to check color contrast automatically.
</Callout>

## Alternative Text

Provide meaningful alt text:

```tsx
// ❌ Bad: Redundant or missing alt
<img src="photo.jpg" alt="image" />
<img src="icon.png" alt="" /> {/* decorative but not marked */}

// ✅ Good: Descriptive alt text
<img src="profile.jpg" alt="John Doe, Senior Developer" />
<img src="decorative.png" alt="" aria-hidden="true" />

// ✅ Good: Complex images
<figure>
  <img src="chart.png" alt="Sales chart showing 30% increase" />
  <figcaption>
    Detailed description: Sales increased from $100k to $130k...
  </figcaption>
</figure>
```

## Form Accessibility

Create accessible forms:

```tsx
function ContactForm() {
  return (
    <form>
      {/* Label association */}
      <label htmlFor="name">Name *</label>
      <input
        id="name"
        type="text"
        required
        aria-required="true"
        aria-invalid={hasError}
        aria-describedby={hasError ? 'name-error' : undefined}
      />
      {hasError && (
        <span id="name-error" role="alert">
          Name is required
        </span>
      )}

      {/* Fieldset for radio groups */}
      <fieldset>
        <legend>Choose your preference</legend>
        <label>
          <input type="radio" name="pref" value="a" />
          Option A
        </label>
        <label>
          <input type="radio" name="pref" value="b" />
          Option B
        </label>
      </fieldset>
    </form>
  );
}
```

## Screen Reader Support

Provide helpful announcements:

```tsx
import { useEffect, useState } from 'react';

function LiveRegion() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <button onClick={() => setMessage('Item added to cart')}>
        Add to Cart
      </button>
      
      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>
    </div>
  );
}
```

## Skip Links

Add skip navigation:

```tsx
function Layout() {
  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to main content
      </a>
      
      <header>...</header>
      <main id="main-content">...</main>
    </>
  );
}
```

## Testing Checklist

<Callout type="success" title="Accessibility Testing">
- ✅ Test with keyboard only
- ✅ Use screen reader (NVDA, JAWS, VoiceOver)
- ✅ Check color contrast
- ✅ Validate HTML
- ✅ Run automated tests (axe, WAVE)
- ✅ Test with real users
</Callout>

## Useful Tools

- **Browser Extensions**: axe DevTools, WAVE, Accessibility Insights
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (Mac)
- **Color Tools**: Contrast Checker, Colorblind simulators
- **Automation**: jest-axe, Playwright accessibility testing

## Conclusion

Accessibility is not optional—it's essential. By following these practices, you create better experiences for everyone.

Remember: **Accessibility is a journey, not a destination.**
```

---

### **Part 7: RSS Feed Generation**

---

### **Step 21: Create RSS Feed Generator**

Create `src/lib/blog/rss.ts`:

```typescript
import RSS from 'rss';
import { getAllPosts } from './mdx';

export async function generateRSS() {
  const posts = await getAllPosts();
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
      title: post.metadata.title,
      description: post.metadata.description,
      url: `${siteUrl}/blog/${post.slug}`,
      date: new Date(post.metadata.date),
      categories: post.metadata.tags,
      author: post.metadata.author,
    });
  });

  return feed.xml({ indent: true });
}
```

---

### **Step 22: Create RSS Route**

Create `app/rss.xml/route.ts`:

```typescript
import { generateRSS } from '@/lib/blog/rss';

export async function GET() {
  const rss = await generateRSS();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
```

---

### **Part 8: Testing & Validation**

---

### **Step 23: Testing Checklist**

Create a comprehensive testing plan:

```markdown
## Blog System Testing Checklist

### Functionality
- [ ] Blog listing page loads correctly
- [ ] Search functionality works
- [ ] Tag filtering works
- [ ] Individual blog posts render properly
- [ ] MDX components render correctly
- [ ] Syntax highlighting works
- [ ] Table of contents works
- [ ] Share buttons work
- [ ] Previous/Next navigation works
- [ ] Related posts display correctly
- [ ] RSS feed generates properly

### Performance
- [ ] Images load efficiently
- [ ] Code blocks render without lag
- [ ] Page loads in < 3 seconds
- [ ] Lighthouse score > 90

### Responsive Design
- [ ] Mobile layout (375px)
- [ ] Tablet layout (768px)
- [ ] Desktop layout (1280px+)
- [ ] Table of contents on desktop only
- [ ] Touch-friendly buttons on mobile

### SEO
- [ ] Meta tags present on all pages
- [ ] Open Graph tags configured
- [ ] Structured data for articles
- [ ] Sitemap includes blog posts
- [ ] Canonical URLs set

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Proper heading hierarchy
- [ ] Alt text on images
- [ ] Focus indicators visible
- [ ] Color contrast WCAG AA compliant

### Content
- [ ] All 5 sample posts created
- [ ] Proper frontmatter on all posts
- [ ] Code examples work
- [ ] Links are valid
- [ ] Images display correctly
```

---

### **Step 24: Troubleshooting Common Issues**

```markdown
## Common Issues & Solutions

### Issue 1: MDX not rendering
**Solution**: Check that @next/mdx is configured correctly in next.config.js

### Issue 2: Syntax highlighting not working
**Solution**: Import rehype-highlight CSS or use rehype-pretty-code

### Issue 3: Table of contents not updating
**Solution**: Ensure headings have proper IDs (use rehype-slug)

### Issue 4: RSS feed 404
**Solution**: Verify route.ts file location and restart dev server

### Issue 5: Slow blog page loads
**Solution**: 
- Use dynamic imports for heavy components
- Optimize images
- Check for unnecessary re-renders
```

---

### **Step 25: Final Optimizations**

Create `app/blog/sitemap.ts` for blog sitemap:

```typescript
import { getAllPosts } from '@/lib/blog/mdx';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

  const blogPosts = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
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
```

---

## ✅ Phase 5 Completion Checklist

- [ ] All dependencies installed
- [ ] MDX configuration complete
- [ ] Blog utilities created
- [ ] All blog components built
- [ ] Blog listing page functional
- [ ] Single post page working
- [ ] Search and filtering working
- [ ] Table of contents functional
- [ ] Share buttons working
- [ ] Related posts showing
- [ ] Navigation working
- [ ] 5 sample blog posts created
- [ ] RSS feed generating
- [ ] Sitemap including blog
- [ ] All tests passing
- [ ] Mobile responsive
- [ ] Accessible
- [ ] SEO optimized

---

## 🎉 Next Steps

After completing Phase 5:

1. **Test thoroughly** - Check all functionality
2. **Add more blog posts** - Aim for 8-10 quality posts
3. **Move to Phase 6** - Contact page implementation
4. **Consider analytics** - Track blog post views
5. **Newsletter integration** - Collect email subscribers (optional)

---

## 📚 Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js MDX Guide](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [Rehype Plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md)
- [Remark Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [RSS Specification](https://www.rssboard.org/rss-specification)

---

**Great job! Your blog system is now complete! 🎊**