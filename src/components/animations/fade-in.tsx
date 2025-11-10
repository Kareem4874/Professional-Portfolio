"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

/**
 * Fade In Component
 * 
 * Simple fade in animation triggered by scroll.
 * Combines opacity and subtle scale effect.
 * 
 * @example
 * <FadeIn delay={0.2}>
 *   <p>This fades in smoothly</p>
 * </FadeIn>
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  className,
}: FadeInProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.95, // Subtle scale for depth
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: Math.min(duration, 0.3), // Limit max duration for performance
        delay,
        ease: "easeOut",
      }}
      className={className}
      style={{ willChange: hasIntersected ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}