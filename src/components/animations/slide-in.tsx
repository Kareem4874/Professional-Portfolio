"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

/**
 * Slide In Component
 * 
 * Slides in from specified direction when scrolled into view.
 * 
 * @example
 * <SlideIn direction="left" distance={80}>
 *   <Card>Slides from left</Card>
 * </SlideIn>
 */
export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  className,
}: SlideInProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: -distance, opacity: 0 };
      case "right":
        return { x: distance, opacity: 0 };
      case "up":
        return { y: distance, opacity: 0 };
      case "down":
        return { y: -distance, opacity: 0 };
      default:
        return { x: -distance, opacity: 0 };
    }
  };

  const variants = {
    hidden: getInitialPosition(),
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