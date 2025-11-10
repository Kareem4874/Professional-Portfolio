"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  /** Strength of magnetic effect (0-1) */
  strength?: number;
}

/**
 * Magnetic Button Component
 * 
 * Button that follows mouse cursor within its bounds.
 * Creates a magnetic, playful interaction effect.
 * 
 * @example
 * <MagneticButton strength={0.3}>
 *   Hover Me!
 * </MagneticButton>
 * 
 * @example
 * <MagneticButton variant="accent" size="lg" strength={0.5}>
 *   Strong Magnetic Effect
 * </MagneticButton>
 * 
 * @param strength - How much the button follows mouse (0.1 = subtle, 0.5 = strong)
 */
export function MagneticButton({
  children,
  strength = 0.3,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  /**
   * Handle Mouse Move
   * 
   * Calculates distance from button center and applies offset
   */
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    // Get button position and dimensions
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Update position
    setPosition({ x: deltaX, y: deltaY });
  };

  /**
   * Handle Mouse Leave
   * 
   * Reset position when mouse leaves
   */
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ 
        x: position.x, 
        y: position.y 
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <Button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}