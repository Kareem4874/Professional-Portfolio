import { Suspense, ReactNode } from "react";
import { LoadingSpinnerWithText } from "./loading-spinner";
import { SkeletonCard } from "./skeleton";

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingText?: string;
}

/**
 * Suspense Wrapper
 * 
 * Convenient wrapper for React Suspense with default fallback.
 * 
 * @example
 * <SuspenseWrapper loadingText="Loading posts...">
 *   <BlogPosts />
 * </SuspenseWrapper>
 */
export function SuspenseWrapper({
  children,
  fallback,
  loadingText = "Loading...",
}: SuspenseWrapperProps) {
  const defaultFallback = (
    <div className="flex justify-center items-center min-h-[400px]">
      <LoadingSpinnerWithText text={loadingText} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

/**
 * Suspense Grid Wrapper
 * 
 * Suspense wrapper with skeleton grid fallback
 * 
 * @example
 * <SuspenseGrid columns={3} skeletonCount={6}>
 *   <ProjectsGrid />
 * </SuspenseGrid>
 */
export function SuspenseGrid({
  children,
  columns = 3,
  skeletonCount = 6,
}: {
  children: ReactNode;
  columns?: number;
  skeletonCount?: number;
}) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const fallback = (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6`}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}