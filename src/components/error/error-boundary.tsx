"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    
    // You can send to Sentry or other error tracking service
    if (process.env.NODE_ENV === "production") {
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-heading font-bold">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="text-left text-xs bg-muted p-4 rounded overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = "/";
              }}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}