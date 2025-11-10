"use client";

import { useEffect, useState } from "react";

/**
 * Reduced Motion Hook
 * 
 * Detects if user prefers reduced motion (accessibility).
 * Use this to disable or simplify animations.
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * 
 * if (prefersReducedMotion) {
 *   return <StaticContent />;
 * }
 * 
 * return <AnimatedContent />;
 * 
 * @returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}