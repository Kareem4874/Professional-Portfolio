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