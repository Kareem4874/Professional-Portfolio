"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Page Transition Component
 * 
 * Wraps page content with enter/exit animations.
 * Uses Next.js pathname to detect page changes.
 * 
 * @example
 * // In layout.tsx
 * <PageTransition>
 *   {children}
 * </PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const variants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Page Transition - Slide Variant
 * 
 * Alternative transition with sliding effect
 */
export function PageTransitionSlide({ children }: PageTransitionProps) {
  const pathname = usePathname();

  const variants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    enter: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}