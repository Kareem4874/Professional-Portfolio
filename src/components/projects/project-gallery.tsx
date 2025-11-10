"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  priority?: boolean;
}

// Optimize image loading with intersection observer
export function ProjectGallery({ images, title, priority = false }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  // Memoize image URLs to prevent unnecessary re-renders
  const optimizedImages = useMemo(() => {
    return images.map(img => ({
      src: img,
      // Generate blur placeholder for better loading experience
      blurDataURL: `data:image/svg+xml;base64,${btoa(
        `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23f3f4f6'/><text x='50%' y='50%' font-family='sans-serif' font-size='16' text-anchor='middle' fill='%239ca3af'>Loading...</text></svg>`
      )}`
    }));
  }, [images]);
  
  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! + 1) % images.length);
    }
  }, [selectedImage, images.length]);

  const previousImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [selectedImage, images.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        previousImage();
        break;
    }
  }, [selectedImage, closeLightbox, nextImage, previousImage]);

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";  
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => {
      // Only update if the image wasn't already loaded
      if (prev.has(index)) return prev;
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
  }, []);

  // Keyboard navigation effect with proper cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const keyDownHandler = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [handleKeyDown]);

  // Clean up effects
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  
  // Preload next and previous images in lightbox
  useEffect(() => {
    if (selectedImage === null) return;
    
    const preloadImage = (index: number) => {
      if (index < 0 || index >= images.length) return;
      const img = new window.Image();
      img.src = images[index];
    };
    
    // Preload next and previous images
    preloadImage((selectedImage + 1) % images.length);
    preloadImage((selectedImage - 1 + images.length) % images.length);
  }, [selectedImage, images]);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No images available for this project
      </div>
    );
  }

  return (
    <>
      {/* Optimized Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {optimizedImages.map(({ src, blurDataURL }, index) => (
          <motion.div
            key={`gallery-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video rounded-xl overflow-hidden border border-border/50 dark:border-border/40 bg-card/30 dark:bg-card/20 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            {/* Optimized Next.js Image with lazy loading */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted/50">
              <Image
                src={src}
                alt={`${title} - Screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-all duration-500 group-hover:scale-105"
                priority={priority && index < 2}
                loading={index > 2 ? "lazy" : "eager"}
                placeholder="blur"
                blurDataURL={blurDataURL}
                onLoadingComplete={() => handleImageLoad(index)}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  console.error(`Failed to load: ${src}`);
                  
                  // Try fallback formats
                  if (src.endsWith('.webp')) {
                    img.src = src.replace(/\.webp$/, '.jpg');
                  } else if (src.endsWith('.jpg') || src.endsWith('.jpeg')) {
                    img.src = src.replace(/\.(jpg|jpeg)$/i, '.png');
                  } else {
                    // Show placeholder on error
                    const parent = img.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="w-full h-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                          <span class="text-sm">Image not available</span>
                        </div>
                      `;
                    }
                  }
                }}
              />
              
              {/* Hover overlay with animation */}
              <motion.div 
                className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="bg-background/80 backdrop-blur-sm p-2 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ZoomIn className="w-5 h-5 text-foreground" />
                </motion.span>
              </motion.div>
            </div>

            {/* Loading skeleton */}
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card/30 animate-pulse" />
            )}

            {/* Overlay with Zoom Icon */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="bg-primary/90 dark:bg-primary/80 backdrop-blur-sm p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ZoomIn className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>

            {/* Image Counter Badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 text-xs font-semibold text-foreground dark:text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {index + 1} / {images.length}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/98 dark:bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm z-10 flex items-center justify-between px-6">
              <div className="text-sm font-medium text-foreground dark:text-foreground">
                {title} - Image {selectedImage + 1} of {images.length}
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5 text-foreground dark:text-foreground" />
              </button>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previousImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary transition-all z-10 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary transition-all z-10 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <motion.div
              key={`lightbox-${selectedImage}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[85vh] w-full flex items-center justify-center"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 dark:border-border/40 max-w-full max-h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[selectedImage]}
                  alt={`${title} - Full size ${selectedImage + 1}`}
                  className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                  onError={() => {
                    console.error(`Failed to load lightbox image: ${images[selectedImage]}`);
                  }}
                />
              </div>
            </motion.div>

            {/* Bottom Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 text-sm font-medium text-foreground dark:text-foreground shadow-lg">
              {selectedImage + 1} / {images.length}
            </div>

            {/* Keyboard Hints */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground">
              <kbd className="px-2 py-1 rounded bg-background/60 dark:bg-background/40 border border-border/50 dark:border-border/40">←</kbd>
              <kbd className="px-2 py-1 rounded bg-background/60 dark:bg-background/40 border border-border/50 dark:border-border/40">→</kbd>
              <span>Navigate</span>
              <span className="mx-2">•</span>
              <kbd className="px-2 py-1 rounded bg-background/60 dark:bg-background/40 border border-border/50 dark:border-border/40">ESC</kbd>
              <span>Close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}