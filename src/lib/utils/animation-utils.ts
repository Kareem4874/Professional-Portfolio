/**
 * Animation Utilities
 * 
 * Reusable animation configurations, easing functions,
 * and helper utilities for consistent animations.
 */

/**
 * Easing Functions
 * 
 * Pre-defined easing curves for smooth animations
 */
export const easings = {
  easeInOut: [0.25, 0.4, 0.25, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  spring: { 
    type: "spring" as const, 
    stiffness: 100, 
    damping: 15 
  },
  softSpring: { 
    type: "spring" as const, 
    stiffness: 50, 
    damping: 20 
  },
};

/**
 * Common Animation Variants
 * 
 * Pre-built Framer Motion variants for common animations
 */

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easings.easeOut },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
};

/**
 * Stagger Container Variants
 * 
 * Create stagger animation configurations
 * 
 * @example
 * <motion.div variants={staggerContainer(0.1)}>
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={staggerItem}>
 *       {item.content}
 *     </motion.div>
 *   ))}
 * </motion.div>
 */
export const staggerContainer = (
  staggerChildren = 0.1, 
  delayChildren = 0
) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOut },
  },
};

/**
 * Helper Functions
 */

/**
 * Calculate Stagger Delay
 * 
 * Calculate delay based on index for manual stagger
 * 
 * @example
 * const delay = calculateStaggerDelay(index, 0.1);
 */
export function calculateStaggerDelay(
  index: number, 
  baseDelay = 0.1
): number {
  return index * baseDelay;
}

/**
 * Check if Reduced Motion
 * 
 * Check user's motion preference
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get Transition Duration
 * 
 * Returns appropriate duration based on user preference
 * 
 * @example
 * const duration = getTransitionDuration(0.5); // 0.5s or 0.01s
 */
export function getTransitionDuration(duration: number): number {
  return shouldReduceMotion() ? 0.01 : duration;
}

/**
 * Create Animation Delays Array
 * 
 * Generate array of delays for sequential animations
 * 
 * @example
 * const delays = createDelaysArray(5, 0.1);
 * // [0, 0.1, 0.2, 0.3, 0.4]
 */
export function createDelaysArray(
  count: number,
  increment: number,
  baseDelay = 0
): number[] {
  return Array.from(
    { length: count }, 
    (_, i) => baseDelay + i * increment
  );
}