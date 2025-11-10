"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface ScrollRevealProps {
  children: ReactNode;
  
  /** Direction of reveal animation */
  direction?: "up" | "down" | "left" | "right";
  
  /** Delay before animation starts (seconds) */
  delay?: number;
  
  /** Animation duration (seconds) */
  duration?: number;
  
  /** Distance to travel (pixels) */
  distance?: number;
  
  /** Intersection threshold (0-1) */
  threshold?: number;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Scroll Reveal Component
 * 
 * Reveals children with animation when scrolled into view.
 * Uses Intersection Observer for performance.
 * 
 * @example
 * <ScrollReveal direction="up" delay={0.2}>
 *   <h1>Animated Heading</h1>
 * </ScrollReveal>
 * 
 * @example
 * <ScrollReveal direction="left" distance={100} duration={0.8}>
 *   <Card>Content</Card>
 * </ScrollReveal>
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  // Track intersection
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  /**
   * Calculate Initial Transform
   * 
   * Determines starting position based on direction
   */
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      case "left":
        return { x: distance, opacity: 0 };
      case "right":
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  /**
   * Animation Variants
   */
  const variants = {
    hidden: getInitialTransform(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}