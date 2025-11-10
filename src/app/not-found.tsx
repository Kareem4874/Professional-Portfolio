import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";

export default function NotFound() {
  const suggestions = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: FileQuestion },
    { name: "Blog", href: "/blog", icon: Search },
    { name: "Contact", href: "/contact", icon: ArrowLeft },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Error Code */}
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-bold gradient-text leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-8xl animate-bounce">🔍</div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">
                <FileQuestion className="mr-2 h-5 w-5" />
                View Projects
              </Link>
            </Button>
          </div>

          {/* Suggestions */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Or try one of these pages:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <Link
                      href={suggestion.href}
                      className="flex flex-col items-center gap-2 text-center group"
                    >
                      <suggestion.icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium group-hover:text-accent transition-colors">
                        {suggestion.name}
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please{" "}
              <Link href="/contact" className="text-accent hover:underline">
                Contact me
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Metadata for 404 page
export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
};