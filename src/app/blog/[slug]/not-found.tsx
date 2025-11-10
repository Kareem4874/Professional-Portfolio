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
          Sorry, we couldn&apos;t find the blog post you&apos;re looking for.
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