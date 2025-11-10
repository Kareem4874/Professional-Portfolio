"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  /** Percentage of element that must be visible (0-1) */
  threshold?: number | number[];
  
  /** Root element for intersection (default: viewport) */
  root?: Element | null;
  
  /** Margin around root (CSS format: "10px 20px") */
  rootMargin?: string;
  
  /** Stop observing after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Intersection Observer Hook
 * 
 * Detects when an element enters the viewport.
 * More performant than scroll event listeners.
 * 
 * @example
 * const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
 *   threshold: 0.5, // Trigger when 50% visible
 *   freezeOnceVisible: true // Only trigger once
 * });
 * 
 * <div ref={ref}>
 *   {hasIntersected && <AnimatedContent />}
 * </div>
 * 
 * @param options - Intersection observer configuration
 * @returns Object with ref, isIntersecting state, and hasIntersected flag
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverOptions = {}) {
  // Current intersection state
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Has ever been intersected
  const [hasIntersected, setHasIntersected] = useState(false);
  
  // Ref to attach to element
  const ref = useRef<T>(null);
  const hasIntersectedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already intersected and frozen
    if (freezeOnceVisible && hasIntersectedRef.current) {
      return;
    }

    // Create observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        // Update current state
        setIsIntersecting(isElementIntersecting);

        // Update ever-intersected state
        if (isElementIntersecting) {
          setHasIntersected(true);
          hasIntersectedRef.current = true;

          // Stop observing if freeze is enabled
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible]);

  return { 
    ref, 
    isIntersecting, 
    hasIntersected 
  };
}