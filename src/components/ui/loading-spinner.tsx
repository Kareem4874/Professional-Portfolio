import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading Spinner Component
 * 
 * Animated circular loading indicator.
 * Uses CSS animation for better performance.
 * 
 * @example
 * <LoadingSpinner size="md" />
 * 
 * @example
 * <LoadingSpinner size="lg" className="text-accent" />
 */
export function LoadingSpinner({ 
  size = "md", 
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-accent border-r-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Loading Spinner with Text
 * 
 * Spinner with accompanying text message
 * 
 * @example
 * <LoadingSpinnerWithText text="Loading posts..." />
 */
export function LoadingSpinnerWithText({
  text = "Loading...",
  size = "md",
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}