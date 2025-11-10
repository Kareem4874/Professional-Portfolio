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