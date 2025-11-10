'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Home, RefreshCw, AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-2 border-destructive/20">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Something went wrong!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">
                We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault.
              </p>
              {error.message && (
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded border">
                  {error.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={reset}
                variant="default" 
                size="lg"
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Try again
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                asChild
                className="flex-1"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-center text-muted-foreground">
                If this problem persists, please{' '}
                <Link href="/contact" className="text-accent hover:underline">
                  contact me
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

