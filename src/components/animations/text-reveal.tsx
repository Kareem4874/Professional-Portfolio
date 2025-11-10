"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
}

/**
 * Text Reveal - Character by Character
 * 
 * Reveals text character by character with stagger effect.
 * Best for short text like headings.
 * 
 * @example
 * <TextReveal 
 *   text="Welcome to My Portfolio" 
 *   delay={0.5}
 *   className="text-4xl font-bold"
 * />
 */
export function TextReveal({ 
  text, 
  delay = 0, 
  className 
}: TextRevealProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // 30ms between each character
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          style={{ 
            display: "inline-block", 
            marginRight: "0.25em" 
          }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 100,
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

/**
 * Text Reveal - Word by Word
 * 
 * Reveals text word by word with stagger effect.
 * Better for longer text and better performance.
 * 
 * @example
 * <TextRevealWords 
 *   text="This is a longer paragraph that reveals word by word" 
 *   className="text-lg"
 * />
 */
export function TextRevealWords({ 
  text, 
  delay = 0, 
  className 
}: TextRevealProps) {
  const { ref, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // 80ms between each word
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{ 
            display: "inline-block", 
            marginRight: "0.25em" 
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}