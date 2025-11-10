"use client";

import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number; // in milliseconds
  delay?: number;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const delayTimeout = setTimeout(() => {
      const startTime = Date.now();
      const range = end - start;

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(
          start + range * easeOutQuad(progress)
        );

        setCount(currentCount);

        if (progress === 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isInView, start, end, duration, delay]);

  return { count, ref };
}