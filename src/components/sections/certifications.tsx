'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getFeaturedCertifications } from '@/lib/data/certifications';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Award, Calendar, CheckCircle2, Sparkles, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Certification } from '@/lib/data/certifications';

export function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    async function loadCertifications() {
      const certs = await getFeaturedCertifications();
      setCertifications(certs);
      cardRefs.current = new Array(certs.length).fill(null);
    }
    loadCertifications();
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (certifications.length === 0) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: load all images if IntersectionObserver is not supported
      setVisibleIndices(new Set(certifications.map((_, i) => i)));
      return;
    }

    // Load first 2 images immediately for better UX
    setVisibleIndices(new Set([0, 1].filter(i => i < certifications.length)));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleIndices((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px 0px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    // Use setTimeout to ensure refs are set
    const timeoutId = setTimeout(() => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [certifications]);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => new Set(prev).add(id));
  };

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null && certifications.length > 0) {
      setSelectedImageIndex((selectedImageIndex + 1) % certifications.length);
    }
  }, [selectedImageIndex, certifications.length]);

  const previousImage = useCallback(() => {
    if (selectedImageIndex !== null && certifications.length > 0) {
      setSelectedImageIndex((selectedImageIndex - 1 + certifications.length) % certifications.length);
    }
  }, [selectedImageIndex, certifications.length]);

  // Keyboard navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
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
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, closeLightbox, nextImage, previousImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Memoized blur placeholder for better performance
  const blurDataURL = useMemo(
    () => "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
    []
  );

  // Memoized image sizes for better performance
  const imageSizes = useMemo(
    () => "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 25vw",
    []
  );

  return (
    <section id="certifications" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Subtle Background Gradient - Dark Mode Compatible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
              <Award className="h-4 w-4" />
              <span>Professional Growth</span>
            </div>
            
            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Certifications
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continuously learning and validating skills through recognized courses
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {certifications.map((cert, index) => {
              const imageLoaded = loadedImages.has(cert.id);
              const imageError = imageErrors.has(cert.id);
              const hasValidImage = cert.image && cert.image !== '/certifications/' && !imageError;

              const isVisible = visibleIndices.has(index);

              return (
                <motion.div
                  key={cert.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <Card className="h-full relative overflow-hidden border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-3 bg-gradient-to-br from-card via-card/95 to-card/90 dark:from-card/90 dark:via-card/80 dark:to-card/70 backdrop-blur-xl">
                    {/* Animated Gradient Border */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
                    <div className="absolute inset-[1px] rounded-lg bg-gradient-to-br from-background via-background to-background/95 dark:from-background dark:via-background dark:to-background/90 z-0" />
                    
                    {/* Top Accent Line with Glow */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-20 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" />
                    
                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
                    </div>
                    
                    {/* Certificate Image Section - Premium Design */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/15 via-primary/8 to-primary/5 dark:from-primary/25 dark:via-primary/15 dark:to-primary/10 rounded-t-lg z-10">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-30 dark:opacity-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(var(--primary-rgb),0.05)_50%,transparent_52%)] bg-[length:20px_20px]" />
                      </div>

                      {/* Loading Skeleton with Shimmer */}
                      {!imageLoaded && hasValidImage && (
                        <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-card/60 animate-pulse">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] dark:via-white/5" />
                        </div>
                      )}

                      {/* Certificate Image */}
                      {hasValidImage ? (
                        <>
                          <div 
                            className="cursor-pointer relative h-full w-full"
                            onClick={() => openLightbox(index)}
                          >
                            {isVisible ? (
                              <Image
                                src={decodeURIComponent(cert.image)}
                                alt={`${cert.title} Certificate`}
                                fill
                                sizes={imageSizes}
                                loading="lazy"
                                quality={85}
                                className={`object-cover transition-all duration-700 ${
                                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                } group-hover:scale-110 group-hover:brightness-110`}
                                onLoad={() => handleImageLoad(cert.id)}
                                onError={() => handleImageError(cert.id)}
                                placeholder="blur"
                                blurDataURL={blurDataURL}
                              />
                            ) : (
                              // Placeholder while not visible - prevents layout shift
                              <div className="absolute inset-0 bg-gradient-to-br from-card/60 via-card/40 to-card/60 animate-pulse" />
                            )}
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                          </div>
                          
                          {/* Hover Overlay with Animation */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center pointer-events-none z-20">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileHover={{ scale: 1.05 }}
                              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                            >
                              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary backdrop-blur-md text-primary-foreground text-sm font-bold shadow-xl shadow-primary/50 border border-primary-foreground/20">
                                <ZoomIn className="h-4 w-4 animate-pulse" />
                                <span>Click to View</span>
                              </div>
                            </motion.div>
                          </div>
                        </>
                      ) : (
                        /* Premium Fallback Icon Design */
                        <div className="relative h-full flex items-center justify-center">
                          {/* Animated Background on Hover */}
                          <motion.div 
                            className="absolute inset-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/15 to-transparent dark:from-primary/40 dark:via-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl" />
                          </motion.div>
                          
                          {/* Icon Container with Glow */}
                          <div className="relative z-10 p-8 rounded-2xl bg-gradient-to-br from-background/90 via-background/80 to-background/70 dark:from-background/50 dark:via-background/40 dark:to-background/30 backdrop-blur-xl border-2 border-primary/40 dark:border-primary/50 group-hover:border-primary/60 dark:group-hover:border-primary/70 transition-all duration-300 shadow-2xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-3">
                            <Award className="h-16 w-16 text-primary drop-shadow-lg" strokeWidth={1.5} />
                            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          
                          {/* Animated Sparkles */}
                          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-primary/50 dark:text-primary/70 animate-pulse group-hover:animate-bounce" />
                          <Sparkles className="absolute bottom-4 left-4 h-4 w-4 text-primary/40 dark:text-primary/60 animate-pulse delay-300" />
                        </div>
                      )}

                      {/* Premium Provider Badge */}
                      <div className="absolute top-3 left-3 z-30">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-background/95 via-background/90 to-background/95 dark:from-background/80 dark:via-background/70 dark:to-background/80 backdrop-blur-xl border border-primary/30 dark:border-primary/40 shadow-xl shadow-primary/20 group-hover:border-primary/50 dark:group-hover:border-primary/60 transition-all duration-300"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary drop-shadow-sm" />
                          <span className="text-xs font-bold text-foreground drop-shadow-sm">{cert.provider}</span>
                        </motion.div>
                      </div>

                      {/* Corner Decoration */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                    </div>

                    {/* Content Section with Premium Styling */}
                    <div className="relative z-10 p-5 space-y-4">
                      {/* Title with Gradient Effect */}
                      <div>
                        <CardTitle className="text-lg font-bold group-hover:text-primary dark:group-hover:text-primary transition-all duration-300 line-clamp-2 min-h-[56px] bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text group-hover:from-primary group-hover:to-primary/80">
                          {cert.title}
                        </CardTitle>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[60px] group-hover:text-foreground/90 dark:group-hover:text-foreground/90 transition-colors duration-300">
                        {cert.description}
                      </p>

                      {/* Skills Tags with Enhanced Design */}
                      <div className="flex flex-wrap gap-2 min-h-[28px]">
                        {cert.skills.slice(0, 3).map((skill, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="text-xs font-medium bg-gradient-to-br from-secondary/90 via-secondary/80 to-secondary/90 dark:from-secondary/50 dark:via-secondary/40 dark:to-secondary/50 border border-primary/20 dark:border-primary/30 hover:bg-primary/15 dark:hover:bg-primary/25 hover:border-primary/40 dark:hover:border-primary/50 hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                        {cert.skills.length > 3 && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs font-medium bg-secondary/80 dark:bg-secondary/40 border border-border/50 dark:border-border/30"
                          >
                            +{cert.skills.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Issue Date with Icon Enhancement */}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-gradient-to-r from-border/50 via-border/30 to-border/50 dark:from-border/40 dark:via-border/20 dark:to-border/40 group-hover:text-foreground/80 dark:group-hover:text-foreground/80 transition-colors duration-300">
                        <Calendar className="h-3.5 w-3.5 text-primary/70 dark:text-primary/60 group-hover:text-primary transition-colors duration-300" />
                        <span className="font-medium">
                          Issued: {new Date(cert.issueDate + '-01').toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                        </span>
                      </div>

                      {/* Premium View Certificate Button */}
                      {cert.credentialUrl && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full group/btn bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 dark:from-primary/25 dark:via-primary/20 dark:to-primary/25 border-2 border-primary/30 dark:border-primary/40 text-primary font-semibold hover:bg-gradient-to-r hover:from-primary hover:via-primary hover:to-primary hover:text-primary-foreground dark:hover:from-primary dark:hover:via-primary dark:hover:to-primary dark:hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/30" 
                            asChild
                          >
                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                              <span>View Certificate</span>
                              <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </a>
                          </Button>
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom Glow Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Optional: View All Link */}
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-primary transition-colors"
            >
              <span>View all certifications</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && certifications[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 dark:bg-background/95 backdrop-blur-md p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-3 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all z-10 shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            {/* Navigation Buttons */}
            {certifications.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previousImage();
                  }}
                  className="absolute left-4 p-3 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all z-10 shadow-lg"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-8 w-8 text-foreground" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 p-3 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 hover:bg-primary/10 dark:hover:bg-primary/20 transition-all z-10 shadow-lg"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-8 w-8 text-foreground" />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            >
              {/* Certificate Title */}
              <div className="mb-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {certifications[selectedImageIndex].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {certifications[selectedImageIndex].provider}
                </p>
              </div>

              {/* Image - Optimized for Lightbox */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-border/50 dark:border-border/40 max-w-full max-h-[75vh] bg-background">
                <Image
                  src={decodeURIComponent(certifications[selectedImageIndex].image)}
                  alt={`${certifications[selectedImageIndex].title} Certificate - Full size`}
                  width={1200}
                  height={900}
                  quality={90}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain"
                  loading="eager"
                  priority
                  onError={() => {
                    console.error(`Failed to load lightbox image: ${certifications[selectedImageIndex].image}`);
                  }}
                />
              </div>

              {/* Image Counter */}
              {certifications.length > 1 && (
                <div className="mt-4 px-4 py-2 rounded-full bg-background/80 dark:bg-background/60 backdrop-blur-md border border-border/50 dark:border-border/40 text-sm font-medium text-foreground shadow-lg">
                  {selectedImageIndex + 1} / {certifications.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}