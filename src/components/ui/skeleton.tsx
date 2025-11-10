import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "pulse";
}

/**
 * Skeleton Component
 * 
 * Placeholder element shown while content loads.
 * Supports multiple animation variants.
 * 
 * @example
 * <Skeleton className="h-4 w-full" />
 * 
 * @example
 * <Skeleton variant="shimmer" className="h-48 w-full rounded-lg" />
 */
function Skeleton({
  className,
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: "animate-pulse",
    shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
    pulse: "animate-pulse",
  };

  return (
    <div
      className={cn(
        "rounded-md bg-muted",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * Pre-built Skeleton Layouts
 */

/**
 * Skeleton Card
 * 
 * Complete card skeleton with image, text, and tags
 */
export function SkeletonCard() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

/**
 * Skeleton Text
 * 
 * Multiple text line skeletons
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar
 * 
 * Circular avatar placeholder
 */
export function SkeletonAvatar({ 
  size = "md" 
}: { 
  size?: "sm" | "md" | "lg" 
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <Skeleton 
      className={cn("rounded-full", sizeClasses[size])} 
    />
  );
}

export { Skeleton };