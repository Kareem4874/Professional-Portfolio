"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder.png",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        quality={90}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
        )}
        {...props}
      />
    </div>
  );
}