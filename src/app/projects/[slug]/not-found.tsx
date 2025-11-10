import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="text-8xl mb-4">🔍</div>
          
          <h1 className="text-4xl lg:text-5xl font-heading font-bold gradient-text">
            Project Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Sorry, the project you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button variant="accent" size="lg" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Projects
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}