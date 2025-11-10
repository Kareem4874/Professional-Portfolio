"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
  disableObserver?: boolean;
}

/**
 * Stagger Container
 * 
 * Animates children sequentially with a stagger delay.
 * Use with StaggerItem children for best results.
 * 
 * @example
 * <StaggerContainer staggerDelay={0.1}>
 *   <StaggerItem><Card>Item 1</Card></StaggerItem>
 *   <StaggerItem><Card>Item 2</Card></StaggerItem>
 *   <StaggerItem><Card>Item 3</Card></StaggerItem>
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
  threshold = 0.1,
  disableObserver = false,
}: StaggerContainerProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay, // Delay between children
        delayChildren: 0.1, // Initial delay before first child
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={disableObserver ? false : "hidden"}
      animate={disableObserver ? "visible" : hasIntersected ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Stagger Item
 * 
 * Individual item within a StaggerContainer.
 * Must be direct child of StaggerContainer to inherit animations.
 * 
 * @example
 * <StaggerItem>
 *   <Card>Animated Card</Card>
 * </StaggerItem>
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
