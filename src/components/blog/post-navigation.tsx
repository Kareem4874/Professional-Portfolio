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