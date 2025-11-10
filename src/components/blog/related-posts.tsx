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