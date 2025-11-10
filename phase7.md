# 🎨 Phase 7: Animations & Interactions

> **Duration:** 3 days  
> **Goal:** Add professional animations and smooth interactions to the portfolio

---

## 📚 Table of Contents

### [Part 1: Overview & Setup](#part-1-overview--setup)
- What We'll Build
- Prerequisites
- Project Structure
- Dependencies Installation

### [Part 2: View Transitions API](#part-2-view-transitions-api)
- What is View Transitions API?
- Creating the Wrapper Component
- Enhanced Link Component
- CSS Animations Setup

### [Part 3: Scroll-Triggered Animations](#part-3-scroll-triggered-animations)
- Intersection Observer Hook
- Scroll Reveal Component
- Enhanced Fade In
- Enhanced Slide In
- Stagger Container

### [Part 4: Micro-Interactions](#part-4-micro-interactions)
- Mouse Position Hook
- Magnetic Button Effect
- Text Reveal Animations
- Page Transitions

### [Part 5: Loading States](#part-5-loading-states)
- Loading Spinner Component
- Skeleton Loaders
- Suspense Wrappers

### [Part 6: Accessibility & Performance](#part-6-accessibility--performance)
- Reduced Motion Hook
- Animation Utilities
- Performance Optimization

### [Part 7: Component Integration](#part-7-component-integration)
- Navbar Animations
- Hero Section
- Skills Section
- About Section
- Footer

### [Part 8: Testing & Debugging](#part-8-testing--debugging)
- Testing Checklist
- Common Issues
- Performance Testing

---

# Part 1: Overview & Setup

## 🎯 What We'll Build

By the end of Phase 7, your portfolio will have:

✅ **View Transitions API** - Smooth page transitions (Chrome/Edge)  
✅ **Scroll Animations** - Elements reveal on scroll  
✅ **Intersection Observer** - Performance-optimized triggers  
✅ **Magnetic Buttons** - Interactive hover effects  
✅ **Text Reveals** - Character/word animations  
✅ **Loading States** - Spinners and skeletons  
✅ **Stagger Effects** - Sequential animations  
✅ **Reduced Motion** - Full accessibility support  

**Expected Result:** 60fps animations with excellent UX

---

## 🔧 Prerequisites

**Before Starting Phase 7:**

- ✅ Phases 1-6 completed successfully
- ✅ All pages rendering correctly
- ✅ Components working properly
- ✅ No console errors

**Required Knowledge:**
- React hooks basics
- CSS animations fundamentals
- TypeScript basics
- Framer Motion concepts

---

## 📦 Dependencies Installation

```bash
# Core animation library
npm install framer-motion

# Utility library for debouncing
npm install lodash
npm install -D @types/lodash

# Verify installation
npm list framer-motion lodash
```

**Package Versions:**
- `framer-motion`: ^11.0.0 or higher
- `lodash`: ^4.17.21
- `@types/lodash`: ^4.14.202

---

## 🏗️ Project Structure

Create this folder structure:

```
src/
├── components/
│   ├── animations/              # 🎬 Animation Components (9 files)
│   │   ├── view-transition.tsx
│   │   ├── view-transition-link.tsx
│   │   ├── fade-in.tsx
│   │   ├── slide-in.tsx
│   │   ├── stagger-container.tsx
│   │   ├── scroll-reveal.tsx
│   │   ├── magnetic-button.tsx
│   │   ├── text-reveal.tsx
│   │   └── page-transition.tsx
│   │
│   └── ui/                      # 🎨 UI Components (3 files)
│       ├── skeleton.tsx
│       ├── loading-spinner.tsx
│       └── suspense-wrapper.tsx
│
├── lib/
│   ├── hooks/                   # 🪝 Custom Hooks (3 files)
│   │   ├── use-intersection-observer.ts
│   │   ├── use-mouse-position.ts
│   │   └── use-reduced-motion.ts
│   │
│   └── utils/                   # 🛠️ Utilities (2 files)
│       ├── animation-utils.ts
│       └── performance-utils.ts
│
└── styles/
    └── animations.css           # 💅 CSS Animations (1 file)
```

**Total Files to Create:** 18 files

---

# Part 2: View Transitions API

## 📖 What is View Transitions API?

The View Transitions API provides a way to create smooth animated transitions between page states. It's currently supported in Chrome and Edge.

**Key Features:**
- Native browser animations
- Automatic fallback handling
- Better performance than JS transitions
- Simple API

**Browser Support:**
- ✅ Chrome 111+
- ✅ Edge 111+
- ⚠️ Firefox (fallback needed)
- ⚠️ Safari (fallback needed)

---

## Step 1: Create View Transition Wrapper

**Purpose:** Core wrapper for View Transitions API with fallback support

**File:** `src/components/animations/view-transition.tsx`

```typescript
"use client";

import { ReactNode } from "react";

interface ViewTransitionProps {
  children: ReactNode;
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
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
```

**Usage Example:**

```tsx
// Animate a grid of cards with stagger
<StaggerContainer staggerDelay={0.08}>
  <div className="grid grid-cols-3 gap-6">
    {projects.map((project) => (
      <StaggerItem key={project.id}>
        <ProjectCard {...project} />
      </StaggerItem>
    ))}
  </div>
</StaggerContainer>
```

---

# Part 4: Micro-Interactions

## 📖 What are Micro-Interactions?

Micro-interactions are small, engaging animations that provide feedback and enhance user experience. They make interfaces feel alive and responsive.

**Examples:**
- Button hover effects
- Cursor following elements
- Text reveals
- Icon animations

---

## Step 9: Create Mouse Position Hook

**Purpose:** Track mouse position for interactive effects

**File:** `src/lib/hooks/use-mouse-position.ts`

```typescript
"use client";

import { useEffect, useState } from "react";
import { debounce } from "lodash";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Mouse Position Hook
 * 
 * Tracks mouse cursor position in real-time.
 * Optionally debounced for performance.
 * 
 * @example
 * const { x, y } = useMousePosition();
 * console.log(`Mouse at: ${x}, ${y}`);
 * 
 * @example
 * // With debouncing (better performance)
 * const mousePos = useMousePosition(50); // 50ms debounce
 * 
 * @param debounceMs - Debounce delay in milliseconds (0 = no debounce)
 * @returns Current mouse position {x, y}
 */
export function useMousePosition(debounceMs: number = 0): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    /**
     * Update Mouse Position
     */
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    };

    // Apply debouncing if specified
    const handler = debounceMs > 0
      ? debounce(updateMousePosition, debounceMs)
      : updateMousePosition;

    // Add event listener
    window.addEventListener("mousemove", handler);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, [debounceMs]);

  return mousePosition;
}
```

---

## Step 10: Create Magnetic Button

**Purpose:** Button that follows mouse cursor within bounds

**File:** `src/components/animations/magnetic-button.tsx`

```typescript
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
```

**Usage Example:**

```tsx
// Basic usage
<MagneticButton>Click Me</MagneticButton>

// With styling
<MagneticButton 
  variant="accent" 
  size="lg"
  strength={0.4}
>
  Strong Effect
</MagneticButton>

// As link
<MagneticButton asChild>
  <Link href="/projects">View Projects</Link>
</MagneticButton>
```

---

## Step 11: Create Text Reveal Animations

**Purpose:** Animated text that reveals character by character or word by word

**File:** `src/components/animations/text-reveal.tsx`

```typescript
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
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
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
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
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
```

**Usage Examples:**

```tsx
// Heading with character reveal
<TextReveal 
  text="Frontend Developer" 
  className="text-5xl font-bold gradient-text"
/>

// Paragraph with word reveal
<TextRevealWords 
  text="I create beautiful and functional web experiences"
  delay={0.5}
  className="text-xl text-muted-foreground"
/>
```

---

## Step 12: Create Page Transition

**Purpose:** Smooth transitions between pages

**File:** `src/components/animations/page-transition.tsx`

```typescript
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
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
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
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
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
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

# Part 5: Loading States

## Step 13: Create Loading Spinner

**Purpose:** Animated loading indicator

**File:** `src/components/ui/loading-spinner.tsx`

```typescript
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Loading Spinner Component
 * 
 * Animated circular loading indicator.
 * Uses CSS animation for better performance.
 * 
 * @example
 * <LoadingSpinner size="md" />
 * 
 * @example
 * <LoadingSpinner size="lg" className="text-accent" />
 */
export function LoadingSpinner({ 
  size = "md", 
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-solid border-accent border-r-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Loading Spinner with Text
 * 
 * Spinner with accompanying text message
 * 
 * @example
 * <LoadingSpinnerWithText text="Loading posts..." />
 */
export function LoadingSpinnerWithText({
  text = "Loading...",
  size = "md",
}: {
  text?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner size={size} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
```

---

## Step 14: Enhanced Skeleton Component

**Purpose:** Placeholder for loading content

**File:** `src/components/ui/skeleton.tsx`

```typescript
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "shimmer" | "pulse";
}

/**
 * Skeleton Component
 * 
 * Placeholder element shown while content loads.
 * Supports multiple animation variants.
 * 
 * @example
 * <Skeleton className="h-4 w-full" />
 * 
 * @example
 * <Skeleton variant="shimmer" className="h-48 w-full rounded-lg" />
 */
function Skeleton({
  className,
  variant = "shimmer",
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: "animate-pulse",
    shimmer: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
    pulse: "animate-pulse",
  };

  return (
    <div
      className={cn(
        "rounded-md bg-muted",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * Pre-built Skeleton Layouts
 */

/**
 * Skeleton Card
 * 
 * Complete card skeleton with image, text, and tags
 */
export function SkeletonCard() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}

/**
 * Skeleton Text
 * 
 * Multiple text line skeletons
 */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-2/3" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar
 * 
 * Circular avatar placeholder
 */
export function SkeletonAvatar({ 
  size = "md" 
}: { 
  size?: "sm" | "md" | "lg" 
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <Skeleton 
      className={cn("rounded-full", sizeClasses[size])} 
    />
  );
}

export { Skeleton };
```

**Usage Examples:**

```tsx
// Simple skeleton
<Skeleton className="h-4 w-full" />

// Card skeleton
<SkeletonCard />

// Text lines
<SkeletonText lines={5} />

// Avatar
<SkeletonAvatar size="lg" />
```

---

## Step 15: Create Suspense Wrapper

**Purpose:** Convenient wrapper for React Suspense

**File:** `src/components/ui/suspense-wrapper.tsx`

```typescript
import { Suspense, ReactNode } from "react";
import { LoadingSpinnerWithText } from "./loading-spinner";
import { SkeletonCard } from "./skeleton";

interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  loadingText?: string;
}

/**
 * Suspense Wrapper
 * 
 * Convenient wrapper for React Suspense with default fallback.
 * 
 * @example
 * <SuspenseWrapper loadingText="Loading posts...">
 *   <BlogPosts />
 * </SuspenseWrapper>
 */
export function SuspenseWrapper({
  children,
  fallback,
  loadingText = "Loading...",
}: SuspenseWrapperProps) {
  const defaultFallback = (
    <div className="flex justify-center items-center min-h-[400px]">
      <LoadingSpinnerWithText text={loadingText} />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

/**
 * Suspense Grid Wrapper
 * 
 * Suspense wrapper with skeleton grid fallback
 * 
 * @example
 * <SuspenseGrid columns={3} skeletonCount={6}>
 *   <ProjectsGrid />
 * </SuspenseGrid>
 */
export function SuspenseGrid({
  children,
  columns = 3,
  skeletonCount = 6,
}: {
  children: ReactNode;
  columns?: number;
  skeletonCount?: number;
}) {
  const gridClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const fallback = (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6`}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
```

---

# Part 6: Accessibility & Performance

## Step 16: Create Reduced Motion Hook

**Purpose:** Detect user's motion preference for accessibility

**File:** `src/lib/hooks/use-reduced-motion.ts`

```typescript
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
```

**Usage Example:**

```tsx
function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="fade-in">{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {content}
    </motion.div>
  );
}
```

---

## Step 17: Create Animation Utilities

**Purpose:** Reusable animation configurations and helpers

**File:** `src/lib/utils/animation-utils.ts`

```typescript
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
```

---

# Part 7: Component Integration

Now let's apply animations to existing components!

## Step 18: Update Navbar with Animations

**File:** `src/components/layout/navbar.tsx`

```typescript
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ViewTransitionLink } from "@/components/animations/view-transition-link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <ViewTransitionLink href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-heading font-bold gradient-text"
            >
              YourName
            </motion.div>
          </ViewTransitionLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ViewTransitionLink href={item.href}>
                  <Button variant="ghost" className="relative group">
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                  </Button>
                </ViewTransitionLink>
              </motion.div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ViewTransitionLink href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Button>
                    </ViewTransitionLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
```

---

## Step 19: Update Hero Section

**File:** `src/components/sections/hero.tsx`

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { ViewTransitionLink } from "@/components/animations/view-transition-link";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextRevealWords } from "@/components/animations/text-reveal";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Greeting */}
          <FadeIn delay={0.2}>
            <motion.p
              className="text-lg text-accent font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              👋 Hello, I'm
            </motion.p>
          </FadeIn>

          {/* Name with Text Reveal */}
          <TextRevealWords
            text="Your Name"
            delay={0.4}
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold gradient-text"
          />

          {/* Title */}
          <SlideIn direction="up" delay={0.8} duration={0.6}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground">
              Frontend Developer & UI/UX Enthusiast
            </h2>
          </SlideIn>

          {/* Description */}
          <FadeIn delay={1.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I craft beautiful, functional, and user-friendly web experiences
              using modern technologies and best practices.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={1.4}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="accent" size="lg" asChild strength={0.2}>
                <ViewTransitionLink href="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ViewTransitionLink>
              </MagneticButton>

              <MagneticButton variant="outline" size="lg" asChild strength={0.2}>
                <ViewTransitionLink href="/contact">
                  Get In Touch
                </ViewTransitionLink>
              </MagneticButton>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={1.6}>
            <div className="flex items-center justify-center gap-4 pt-4">
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-muted hover:bg-accent/10 transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-muted hover:bg-accent/10 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="/cv/resume.pdf"
                download
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-muted hover:bg-accent/10 transition-colors"
              >
                <Download className="h-5 w-5" />
              </motion.a>
            </div>
          </FadeIn>

          {/* Scroll Indicator */}
          <FadeIn delay={2}>
            <motion.div
              className="pt-16"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="inline-flex flex-col items-center gap-2 text-muted-foreground">
                <span className="text-sm">Scroll Down</span>
                <motion.div
                  className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1"
                  whileHover={{ borderColor: "var(--accent)" }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 bg-accent rounded-full mx-auto"
                    animate={{ y: [0, 20, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

---

## Step 20: Update Skills Section

**File:** `src/components/sections/skills.tsx`

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { motion } from "framer-motion";
import { skillsData } from "@/lib/data/skills";

export function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </ScrollReveal>

        {/* Skills Grid */}
        <StaggerContainer staggerDelay={0.08}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative overflow-hidden h-full hover:shadow-xl transition-shadow">
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <CardContent className="p-6 relative z-10">
                      <div className="flex flex-col items-center text-center gap-4">
                        {/* Icon with Animation */}
                        <motion.div
                          className="text-5xl"
                          whileHover={{ 
                            rotate: [0, -10, 10, -10, 0], 
                            scale: 1.1 
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.div>

                        {/* Skill Name */}
                        <h3 className="font-heading font-semibold text-lg group-hover:text-accent transition-colors">
                          {skill.name}
                        </h3>

                        {/* Proficiency Bar */}
                        {skill.level && (
                          <div className="w-full">
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                              <span>Proficiency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-accent to-primary"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ 
                                  duration: 1, 
                                  delay: index * 0.05, 
                                  ease: "easeOut" 
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
```

---

## Step 21: Update About Section

**File:** `src/components/sections/about.tsx`

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { motion } from "framer-motion";
import { Code, Palette, Rocket, Users } from "lucide-react";

const stats = [
  { icon: Code, label: "Projects Completed", value: "50+" },
  { icon: Palette, label: "Happy Clients", value: "30+" },
  { icon: Rocket, label: "Years Experience", value: "5+" },
  { icon: Users, label: "Team Collaborations", value: "20+" },
];

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <ScrollReveal direction="left">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-6">
                About Me
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate frontend developer with a keen eye for design and
                a love for creating seamless user experiences. With over 5 years of
                experience, I've worked on diverse projects ranging from e-commerce
                platforms to complex web applications.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach combines technical expertise with creative problem-solving,
                ensuring that every project not only looks great but also performs
                exceptionally. I'm constantly learning and adapting to new technologies
                to deliver cutting-edge solutions.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new design trends,
                contributing to open-source projects, or sharing my knowledge with
                the developer community through blog posts and tutorials.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column - Stats */}
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="group relative overflow-hidden h-full hover:shadow-xl transition-shadow">
                      {/* Animated Background Gradient */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />

                      <CardContent className="p-6 text-center relative z-10">
                        <motion.div
                          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon className="h-8 w-8 text-accent" />
                        </motion.div>

                        <motion.div
                          className="text-4xl font-bold gradient-text mb-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {stat.value}
                        </motion.div>

                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
```

---

## Step 22: Update Footer

**File:** `src/components/layout/footer.tsx`

```typescript
"use client";

import { motion } from "framer-motion";
import { ViewTransitionLink } from "@/components/animations/view-transition-link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourprofile", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/yourhandle", label: "Twitter" },
  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-heading font-bold gradient-text">
              YourName
            </h3>
            <p className="text-muted-foreground">
              Crafting beautiful web experiences with modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <ViewTransitionLink
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </ViewTransitionLink>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-heading font-semibold text-lg">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-muted hover:bg-accent/10 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground"
        >
          <p className="flex items-center gap-2">
            © {currentYear} YourName. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </motion.span>
            and Next.js
          </p>
          <div className="flex gap-4">
            <ViewTransitionLink
              href="/privacy"
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </ViewTransitionLink>
            <ViewTransitionLink
              href="/terms"
              className="hover:text-accent transition-colors"
            >
              Terms of Service
            </ViewTransitionLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
```

---

## Step 23: Update Root Layout

**File:** `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/animations/page-transition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Your Name",
    default: "Your Name - Frontend Developer",
  },
  description: "Portfolio showcasing my work as a frontend developer",
  keywords: ["frontend", "developer", "react", "nextjs", "portfolio"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    siteName: "Your Name Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## Step 24: Update Tailwind Config

**File:** `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        // Existing animations
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-up": "slide-in-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "spin": "spin 1s linear infinite",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 3s ease-in-out infinite",
        "bounce": "bounce 2s ease-in-out infinite",
        
        // New animations
        "shimmer": "shimmer 2s linear infinite",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "spin": {
          "to": { transform: "rotate(360deg)" },
        },
        "pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

# Part 8: Testing & Debugging

## 🧪 Testing Checklist

### Visual Tests

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

**Test Each Animation:**

- [ ] **View Transitions** (Chrome/Edge only)
  - Navigate between pages
  - Check smooth fade transitions
  - Verify fallback works in Firefox/Safari

- [ ] **Navbar Animations**
  - [ ] Slides down on mount
  - [ ] Nav items stagger in
  - [ ] Mobile menu opens/closes smoothly
  - [ ] Theme toggle animates
  - [ ] Logo hover scales

- [ ] **Hero Section**
  - [ ] Background orbs float
  - [ ] Text reveals word by word
  - [ ] Buttons have magnetic effect
  - [ ] Social icons scale on hover
  - [ ] Scroll indicator bounces

- [ ] **Scroll Animations**
  - [ ] Skills section reveals on scroll
  - [ ] About section slides in
  - [ ] Stats cards stagger
  - [ ] Proficiency bars animate

- [ ] **Loading States**
  - [ ] Spinners rotate smoothly
  - [ ] Skeletons shimmer
  - [ ] Suspense boundaries work

---

### Performance Tests

**Check Frame Rate:**

```javascript
// Add to browser console
let frameCount = 0;
let lastTime = performance.now();

function countFrames() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(countFrames);
}

countFrames();
```

**Target:** 60 FPS

**Performance Checklist:**

- [ ] Smooth scrolling (no jank)
- [ ] Animations don't block interactions
- [ ] No layout shifts (CLS < 0.1)
- [ ] Page loads quickly (LCP < 2.5s)
- [ ] CPU usage reasonable (<50% on scroll)

---

### Accessibility Tests

**Reduced Motion:**

```bash
# Test in browser DevTools
# 1. Open DevTools
# 2. Cmd/Ctrl + Shift + P
# 3. Type "Emulate CSS prefers-reduced-motion"
# 4. Select "prefers-reduced-motion: reduce"
```

**Checklist:**

- [ ] Reduced motion preference respected
- [ ] Animations minimal or disabled
- [ ] No seizure-inducing flashes
- [ ] Keyboard navigation works
- [ ] Focus visible during animations
- [ ] Screen reader compatible
- [ ] ARIA labels present

---

### Browser Compatibility

Test in:

- [ ] **Chrome** (View Transitions work)
- [ ] **Firefox** (Fallback animations)
- [ ] **Safari** (Fallback animations)
- [ ] **Edge** (View Transitions work)
- [ ] **Mobile Safari** (iOS)
- [ ] **Mobile Chrome** (Android)

---

### Responsive Tests

Test breakpoints:

- [ ] **Mobile:** 375px, 414px
- [ ] **Tablet:** 768px, 1024px
- [ ] **Desktop:** 1280px, 1920px
- [ ] **Landscape mode**
- [ ] **Portrait mode**

---

## 🐛 Troubleshooting

### Issue 1: Animations Not Triggering

**Symptoms:**
- Elements don't animate on scroll
- Components remain invisible

**Solutions:**

```typescript
// 1. Check Intersection Observer threshold
const { ref, hasIntersected } = useIntersectionObserver({
  threshold: 0.1, // Lower = triggers earlier
  rootMargin: "100px", // Trigger before entering viewport
});

// 2. Verify ref is attached
<div ref={ref}> {/* Must attach ref */}
  {hasIntersected && <Content />}
</div>

// 3. Check initial state
<motion.div
  initial="hidden" // Must have initial
  animate={hasIntersected ? "visible" : "hidden"}
  variants={variants}
>
```

---

### Issue 2: Framer Motion Hydration Errors

**Symptoms:**
- Console warnings about hydration
- Content flashes on load

**Solutions:**

```typescript
// 1. Mark as client component
"use client";

// 2. Use dynamic import
import dynamic from 'next/dynamic';

const AnimatedComponent = dynamic(
  () => import('@/components/animated-component'),
  { ssr: false }
);

// 3. Disable initial animation
<motion.div
  initial={false} // Disable on mount
  animate="visible"
>
```

---

### Issue 3: Poor Scroll Performance

**Symptoms:**
- Janky scrolling
- Low frame rate
- High CPU usage

**Solutions:**

```typescript
// 1. Use throttle/debounce
import { throttle } from 'lodash';

const handleScroll = throttle(() => {
  // Your code
}, 100);

// 2. Freeze animations after trigger
const { ref, hasIntersected } = useIntersectionObserver({
  freezeOnceVisible: true, // Stop observing after first trigger
});

// 3. Use CSS animations for simple effects
// ❌ Bad
<motion.div animate={{ opacity: 1 }} />

// ✅ Good
<div className="animate-fade-in" />
```

---

### Issue 4: View Transitions Not Working

**Symptoms:**
- No smooth page transitions
- Instant navigation

**Solutions:**

```typescript
// 1. Check browser support
if ('startViewTransition' in document) {
  console.log('✅ Supported');
} else {
  console.log('❌ Not supported - using fallback');
}

// 2. Verify you're using ViewTransitionLink
import { ViewTransitionLink } from '@/components/animations/view-transition-link';

<ViewTransitionLink href="/about">
  About
</ViewTransitionLink>

// 3. Check CSS is imported
// In globals.css
@import './animations.css';
```

---

### Issue 5: Magnetic Button Not Following Mouse

**Symptoms:**
- Button doesn't move
- Effect not working

**Solutions:**

```typescript
// 1. Ensure ref is attached
const ref = useRef<HTMLButtonElement>(null);

<Button ref={ref} {...props}>

// 2. Check getBoundingClientRect
const rect = ref.current?.getBoundingClientRect();
console.log('Button rect:', rect);

// 3. Verify mouse events are firing
const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
  console.log('Mouse:', e.clientX, e.clientY);
  // Your code
};

// 4. Adjust strength
<MagneticButton strength={0.5}> {/* Higher = stronger */}
```

---

### Issue 6: Stagger Animation Not Working

**Symptoms:**
- All items animate at once
- No delay between children

**Solutions:**

```typescript
// 1. Ensure parent has variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Must be present!
    },
  },
};

// 2. Children must have variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }, // Must match parent states
};

// 3. Use StaggerContainer + StaggerItem
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

### Issue 7: Layout Shift During Animations

**Symptoms:**
- Content jumps
- CLS score high
- Poor user experience

**Solutions:**

```css
/* 1. Reserve space before animation */
.animated-element {
  min-height: 100px; /* Reserve space */
}

/* 2. Use transform instead of position */
/* ❌ Bad - causes layout shift */
.element {
  top: 100px;
  left: 50px;
}

/* ✅ Good - no layout shift */
.element {
  transform: translate(50px, 100px);
}

/* 3. Use contain property */
.animated-element {
  contain: layout style paint;
}
```

---

### Issue 8: Reduced Motion Not Working

**Symptoms:**
- Animations still play with reduced motion enabled
- Accessibility issue

**Solutions:**

```typescript
// 1. Use the hook
import { useReducedMotion } from '@/lib/hooks/use-reduced-motion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <StaticContent />;
  }
  
  return <AnimatedContent />;
}

// 2. Verify CSS media query
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}

// 3. Test in browser
// DevTools -> Cmd+Shift+P -> "Emulate CSS prefers-reduced-motion"
```

---

## 📊 Performance Optimization Tips

### 1. Use CSS When Possible

```css
/* ✅ Good - GPU accelerated */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}

/* ❌ Bad - triggers reflow */
.element {
  left: 100px;
  width: 200px;
}
```

### 2. Debounce Expensive Operations

```typescript
import { debounce } from 'lodash';

const handleExpensiveOperation = debounce(() => {
  // Expensive code
}, 100);
```

### 3. Use Intersection Observer

```typescript
// ✅ Good
const { ref, hasIntersected } = useIntersectionObserver();

// ❌ Bad
window.addEventListener('scroll', checkPosition);
```

### 4. Lazy Load Heavy Components

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/heavy'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);
```

### 5. Optimize Animation Duration

```typescript
// Shorter animations = better perceived performance
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 0.3 // Keep it short!
    }
  }
};
```

---

## ✅ Final Deliverables Checklist

### Files Created (18 total)

**Animation Components (9):**
- [ ] `components/animations/view-transition.tsx`
- [ ] `components/animations/view-transition-link.tsx`
- [ ] `components/animations/fade-in.tsx`
- [ ] `components/animations/slide-in.tsx`
- [ ] `components/animations/stagger-container.tsx`
- [ ] `components/animations/scroll-reveal.tsx`
- [ ] `components/animations/magnetic-button.tsx`
- [ ] `components/animations/text-reveal.tsx`
- [ ] `components/animations/page-transition.tsx`

**UI Components (3):**
- [ ] `components/ui/loading-spinner.tsx`
- [ ] `components/ui/skeleton.tsx`
- [ ] `components/ui/suspense-wrapper.tsx`

**Hooks (3):**
- [ ] `lib/hooks/use-intersection-observer.ts`
- [ ] `lib/hooks/use-mouse-position.ts`
- [ ] `lib/hooks/use-reduced-motion.ts`

**Utilities (2):**
- [ ] `lib/utils/animation-utils.ts`
- [ ] `lib/utils/performance-utils.ts` (optional)

**Styles (1):**
- [ ] `styles/animations.css`

### Updated Files (7)

- [ ] `components/layout/navbar.tsx`
- [ ] `components/layout/footer.tsx`
- [ ] `components/sections/hero.tsx`
- [ ] `components/sections/skills.tsx`
- [ ] `components/sections/about.tsx`
- [ ] `app/layout.tsx`
- [ ] `tailwind.config.ts`

### Features Implemented

- [ ] View Transitions API with fallbacks
- [ ] Scroll-triggered animations
- [ ] Intersection Observer optimization
- [ ] Magnetic button effect
- [ ] Text reveal animations
- [ ] Page transitions
- [ ] Loading spinners
- [ ] Skeleton loaders
- [ ] Suspense wrappers
- [ ] Reduced motion support
- [ ] Stagger animations
- [ ] Enhanced hover effects

### Testing Complete

- [ ] All animations work visually
- [ ] 60fps performance maintained
- [ ] No console errors
- [ ] Accessibility compliance
- [ ] Browser compatibility verified
- [ ] Mobile responsive
- [ ] Reduced motion tested

---

## 🎓 What You've Learned

### Key Concepts Mastered:

1. **View Transitions API** - Modern page transitions
2. **Intersection Observer** - Performance-optimized scroll detection
3. **Framer Motion** - Advanced React animations
4. **Accessibility** - Reduced motion support
5. **Performance** - GPU-accelerated animations
6. **Custom Hooks** - Reusable animation logic
7. **TypeScript** - Type-safe animation components
8. **CSS Animations** - Keyframes and transitions

### Best Practices Applied:

- ✅ CSS-first animations
- ✅ Intersection Observer over scroll events
- ✅ Debouncing/throttling
- ✅ Reduced motion support
- ✅ Progressive enhancement
- ✅ Component reusability
- ✅ TypeScript type safety
- ✅ Performance monitoring

---

## 🚀 Next Steps

### Phase 8: Content & Data

Ready to move forward? Phase 8 covers:

- 📝 Adding project content
- 🖼️ Image optimization
- 💾 Data caching strategies
- 📄 Resume/CV setup
- 🔗 Link verification
- ✅ Content validation

### Quick Start Phase 8:

```bash
# 1. Test all Phase 7 animations
npm run dev

# 2. Verify performance
# Check Chrome DevTools Performance tab

# 3. Run accessibility audit
# Chrome DevTools Lighthouse

# 4. Git commit
git add .
git commit -m "Phase 7 Complete: Animations & Interactions"
git push origin main

# 5. Proceed to Phase 8
# Create Phase8.md document
```

---

## 📝 Git Commit Message

```bash
git add .

git commit -m "✨ Phase 7 Complete: Animations & Interactions

Features Added:
- ✅ View Transitions API with fallbacks
- ✅ Scroll-triggered animations (Intersection Observer)
- ✅ Magnetic buttons and text reveals
- ✅ Loading states with Suspense
- ✅ Skeleton loaders and spinners
- ✅ Performance optimization
- ✅ Full accessibility support (reduced motion)
- ✅ Enhanced Navbar, Hero, Skills, About, Footer

Components Created:
- 9 animation components
- 3 custom hooks
- 3 UI components
- 2 utility files
- 1 CSS animations file

Performance:
- 60fps animations maintained
- Optimized with Intersection Observer
- GPU-accelerated transforms
- Minimal layout shift

Browser Support:
- Chrome/Edge: View Transitions
- Firefox/Safari: Fallback animations
- Mobile: Fully responsive

Total Files: 18 created, 7 updated
Lines of Code: ~2,500+
"

git push origin main
```

---

## 🎉 Congratulations!

You've successfully completed **Phase 7: Animations & Interactions**!

Your portfolio now features:
- 🎬 Professional animations
- ⚡ 60fps performance
- ♿ Full accessibility
- 📱 Mobile-optimized
- 🌐 Cross-browser compatible

**Phase 7 Status: ✅ COMPLETE**

Ready for Phase 8? Let's add all the content and polish everything! 🚀

---

## 📚 Additional Resources

### Performance Utilities (Optional)

**File:** `src/lib/utils/performance-utils.ts`

```typescript
/**
 * Performance Optimization Utilities
 */

/**
 * Debounce Function
 * 
 * Delays function execution until after a wait period
 * 
 * @example
 * const debouncedSearch = debounce(searchFunction, 300);
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle Function
 * 
 * Limits function execution to once per time period
 * 
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request Animation Frame Throttle
 * 
 * Throttles to browser's refresh rate (60fps)
 * 
 * @example
 * const rafHandler = rafThrottle(expensiveFunction);
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;

  return function executedFunction(...args: Parameters<T>) {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
}

/**
 * Check if Element is in Viewport
 * 
 * @example
 * if (isInViewport(element)) {
 *   console.log('Element visible!');
 * }
 */
export function isInViewport(element: Element, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= -offset &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

/**
 * Lazy Load Image
 * 
 * Loads image when it enters viewport
 * 
 * @example
 * lazyLoadImage(imgElement, '/path/to/image.jpg');
 */
export function lazyLoadImage(img: HTMLImageElement, src: string): void {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
}

/**
 * Preload Critical Assets
 * 
 * Preloads fonts, images, and styles
 * 
 * @example
 * preloadAssets([
 *   '/fonts/inter.woff2',
 *   '/images/hero.jpg',
 * ]);
 */
export function preloadAssets(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    
    if (url.endsWith(".woff2") || url.endsWith(".woff")) {
      link.as = "font";
      link.type = url.endsWith(".woff2") ? "font/woff2" : "font/woff";
      link.crossOrigin = "anonymous";
    } else if (url.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
      link.as = "image";
    } else if (url.endsWith(".css")) {
      link.as = "style";
    }
    
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Get Optimal Animation Duration
 * 
 * Calculates duration based on distance traveled
 * 
 * @example
 * const duration = getOptimalDuration(200); // ~450ms
 */
export function getOptimalDuration(
  distance: number, 
  baseSpeed = 500
): number {
  const duration = Math.sqrt(distance) * baseSpeed / 100;
  return Math.max(300, Math.min(1000, duration));
}

/**
 * Create Staggered Delays
 * 
 * Generates array of delays for sequential animations
 * 
 * @example
 * const delays = createStaggerDelays(5, 0, 0.1);
 * // [0, 0.1, 0.2, 0.3, 0.4]
 */
export function createStaggerDelays(
  count: number,
  baseDelay: number,
  increment: number
): number[] {
  return Array.from({ length: count }, (_, i) => baseDelay + i * increment);
}
```

---

## 🎨 Animation Best Practices

### DO ✅

**1. Use Transform and Opacity**
```css
/* GPU accelerated */
.element {
  transform: translateX(100px);
  opacity: 0.5;
}
```

**2. Add Reduced Motion Support**
```typescript
const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  return <StaticContent />;
}
```

**3. Use Intersection Observer**
```typescript
const { ref, hasIntersected } = useIntersectionObserver();
```

**4. Debounce/Throttle Events**
```typescript
const handleScroll = debounce(() => {
  // Your code
}, 100);
```

**5. Keep Animations Short**
```typescript
transition: { duration: 0.3 } // 300ms max for UI
```

---

### DON'T ❌

**1. Animate Width/Height**
```css
/* ❌ Triggers reflow */
.element {
  width: 200px;
  height: 100px;
}

/* ✅ Use scale instead */
.element {
  transform: scale(1.5);
}
```

**2. Use Scroll Events Directly**
```typescript
// ❌ Bad performance
window.addEventListener('scroll', handleScroll);

// ✅ Use Intersection Observer
const { ref } = useIntersectionObserver();
```

**3. Animate Many Elements at Once**
```typescript
// ❌ Heavy
{items.map(item => (
  <motion.div animate={{ ... }}>{item}</motion.div>
))}

// ✅ Use stagger
<StaggerContainer>
  {items.map(item => (
    <StaggerItem>{item}</StaggerItem>
  ))}
</StaggerContainer>
```

**4. Forget Accessibility**
```typescript
// ❌ Always animates
<motion.div animate={{ ... }} />

// ✅ Respects preferences
{!prefersReducedMotion && (
  <motion.div animate={{ ... }} />
)}
```

**5. Block Main Thread**
```typescript
// ❌ Synchronous heavy work
const result = heavyCalculation();

// ✅ Use requestAnimationFrame
requestAnimationFrame(() => {
  const result = heavyCalculation();
});
```

---

## 🎯 Common Animation Patterns

### Pattern 1: Sequential Page Load

```typescript
export function PageLoad() {
  return (
    <>
      <FadeIn delay={0}>
        <Logo />
      </FadeIn>
      
      <TextReveal delay={0.2}>
        Welcome to My Portfolio
      </TextReveal>
      
      <SlideIn direction="up" delay={0.5}>
        <p>Description text</p>
      </SlideIn>
      
      <FadeIn delay={0.8}>
        <CTAButtons />
      </FadeIn>
    </>
  );
}
```

---

### Pattern 2: Grid with Stagger

```typescript
export function ProjectsGrid() {
  return (
    <StaggerContainer staggerDelay={0.1}>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCard {...project} />
          </StaggerItem>
        ))}
      </div>
    </StaggerContainer>
  );
}
```

---

### Pattern 3: Interactive Card

```typescript
export function InteractiveCard() {
  return (
    <motion.div
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card>Content</Card>
    </motion.div>
  );
}
```

---

### Pattern 4: Loading Sequence

```typescript
export function LoadingSequence() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 w-full" />
        <SkeletonText lines={3} />
      </div>
    );
  }
  
  return (
    <FadeIn>
      <ActualContent />
    </FadeIn>
  );
}
```

---

### Pattern 5: Scroll Progress Bar

```typescript
"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
      }}
    />
  );
}
```

---

## 📱 Mobile Optimization

### Reduce Animation Complexity

```typescript
"use client";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

export function AdaptiveAnimation() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <FadeIn 
      duration={isMobile ? 0.3 : 0.6}
      distance={isMobile ? 20 : 40}
    >
      <Content />
    </FadeIn>
  );
}
```

---

### Touch-Friendly Interactions

```typescript
export function TouchFriendlyButton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <MagneticButton 
      strength={isMobile ? 0.1 : 0.3}
    >
      Button
    </MagneticButton>
  );
}
```

---

### Disable Heavy Animations

```typescript
export function ConditionalAnimation() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  if (!shouldAnimate) {
    return <StaticVersion />;
  }
  
  return <AnimatedVersion />;
}
```

---

## 🔍 SEO Considerations

### Ensure Content is Crawlable

```typescript
const variants = {
  hidden: { 
    opacity: 0.01, // Not 0 - still readable by bots
    transform: "translateY(20px)"
  },
  visible: { 
    opacity: 1, 
    transform: "translateY(0)" 
  },
};
```

---

### Progressive Enhancement

```typescript
// Content visible without JavaScript
<div className="content">
  <noscript>
    <style>{`.animated { opacity: 1 !important; }`}</style>
  </noscript>
  
  <div className="animated">
    Important content here
  </div>
</div>
```

---

### Don't Hide Critical Content

```typescript
// ❌ Bad - hidden until animation
<motion.div initial={{ display: "none" }}>
  <h1>Main Heading</h1>
</motion.div>

// ✅ Good - always visible
<motion.div initial={{ opacity: 0 }}>
  <h1>Main Heading</h1>
</motion.div>
```

---

## 🎓 Advanced Techniques (Optional)

### 1. Parallax Scrolling

```typescript
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  return (
    <motion.div style={{ y }}>
      <BackgroundLayer />
    </motion.div>
  );
}
```

---

### 2. Drag Interactions

```typescript
export function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
    >
      <Card>Drag me!</Card>
    </motion.div>
  );
}
```

---

### 3. SVG Path Animations

```typescript
export function AnimatedLogo() {
  return (
    <svg viewBox="0 0 100 100">
      <motion.path
        d="M 10 10 L 90 90"
        stroke="currentColor"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
      />
    </svg>
  );
}
```

---

### 4. 3D Rotations

```typescript
export function Card3D() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    
    setRotateX(x * 20);
    setRotateY(y * 20);
  };
  
  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
      }}
    >
      <Card>3D Card</Card>
    </motion.div>
  );
}
```

---

### 5. Morphing Shapes

```typescript
export function MorphingShape() {
  const [isCircle, setIsCircle] = useState(true);
  
  return (
    <motion.div
      className="w-24 h-24 bg-accent"
      animate={{
        borderRadius: isCircle ? "50%" : "0%",
      }}
      transition={{ duration: 0.5 }}
      onClick={() => setIsCircle(!isCircle)}
    />
  );
}
```

---

## 📊 Performance Metrics

### Target Metrics

| Metric | Target | Current |
|--------|--------|---------|
| **First Contentful Paint** | < 1.0s | ✅ |
| **Largest Contentful Paint** | < 2.5s | ✅ |
| **Time to Interactive** | < 3.0s | ✅ |
| **Cumulative Layout Shift** | < 0.1 | ✅ |
| **Frame Rate** | 60 FPS | ✅ |
| **CPU Usage** | < 50% | ✅ |

---

### Measuring Performance

```javascript
// Add to browser console

// 1. Check FPS
let frameCount = 0;
let lastTime = performance.now();

function measureFPS() {
  frameCount++;
  const currentTime = performance.now();
  
  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = currentTime;
  }
  
  requestAnimationFrame(measureFPS);
}

measureFPS();

// 2. Check Paint Times
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}ms`);
  }
});

observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

// 3. Check Layout Shifts
const clsObserver = new PerformanceObserver((list) => {
  let cls = 0;
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      cls += entry.value;
    }
  }
  console.log(`CLS: ${cls}`);
});

clsObserver.observe({ entryTypes: ['layout-shift'] });
```

---

## 🎬 Demo Page (Optional)

Create a demo page to test all animations:

**File:** `src/app/animations-demo/page.tsx`

```typescript
"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextReveal, TextRevealWords } from "@/components/animations/text-reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton";

export default function AnimationsDemo() {
  return (
    <main className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <FadeIn>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold gradient-text text-center mb-4">
            Animations Demo
          </h1>
          <p className="text-center text-muted-foreground">
            Testing all animation components
          </p>
        </FadeIn>

        {/* FadeIn Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Fade In</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <FadeIn delay={0}>
              <Card>
                <CardHeader>
                  <CardTitle>No Delay</CardTitle>
                </CardHeader>
                <CardContent>Appears immediately</CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>0.2s Delay</CardTitle>
                </CardHeader>
                <CardContent>Appears after 0.2s</CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>0.4s Delay</CardTitle>
                </CardHeader>
                <CardContent>Appears after 0.4s</CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>

        {/* SlideIn Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Slide In</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <SlideIn direction="left">
              <Card><CardHeader><CardTitle>From Left</CardTitle></CardHeader></Card>
            </SlideIn>
            <SlideIn direction="right">
              <Card><CardHeader><CardTitle>From Right</CardTitle></CardHeader></Card>
            </SlideIn>
            <SlideIn direction="up">
              <Card><CardHeader><CardTitle>From Bottom</CardTitle></CardHeader></Card>
            </SlideIn>
            <SlideIn direction="down">
              <Card><CardHeader><CardTitle>From Top</CardTitle></CardHeader></Card>
            </SlideIn>
          </div>
        </section>

        {/* ScrollReveal Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Scroll Reveal</h2>
          <p className="text-muted-foreground">Scroll down to see the effect</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Section {i + 1}</h3>
                  <p className="text-muted-foreground">
                    This section reveals when you scroll to it
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </section>

        {/* Stagger Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Stagger Animation</h2>
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <StaggerItem key={i}>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <h3 className="font-semibold">Item {i + 1}</h3>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* Magnetic Button Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Magnetic Button</h2>
          <div className="flex gap-4">
            <MagneticButton variant="accent" size="lg">
              Hover Me!
            </MagneticButton>
            <MagneticButton variant="outline" size="lg" strength={0.5}>
              Stronger Effect
            </MagneticButton>
          </div>
        </section>

        {/* Text Reveal Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Text Reveal</h2>
          <TextReveal
            text="This text reveals character by character"
            className="text-2xl font-semibold"
          />
          <TextRevealWords
            text="This text reveals word by word with a smoother effect"
            className="text-xl text-muted-foreground"
            delay={0.5}
          />
        </section>

        {/* Loading States Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-heading font-bold">Loading States</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader><CardTitle>Loading Spinner</CardTitle></CardHeader>
              <CardContent className="flex justify-center">
                <LoadingSpinner size="lg" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Skeleton Loader</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Skeleton Card</CardTitle></CardHeader>
              <CardContent>
                <SkeletonCard />
              </CardContent>
            </Card>
          </div>
        </section>

      </div>
    </main>
  );
}
```

**Access at:** `http://localhost:3000/animations-demo`

---

## 🎯 Summary

### What We Built:
- ✅ 18 animation components and utilities
- ✅ View Transitions API integration
- ✅ Scroll-triggered animations
- ✅ Micro-interactions
- ✅ Loading states
- ✅ Full accessibility support
- ✅ Performance optimizations

### Time Investment:
- **Setup:** 2-3 hours
- **Core Components:** 8-10 hours
- **Integration:** 4-6 hours
- **Testing:** 2-3 hours
- **Total:** ~20 hours

### Results:
- 🚀 60fps animations
- ♿ WCAG AA compliant
- 📱 Mobile optimized
- 🌐 Cross-browser compatible
- ⚡ Lighthouse 95+ score

---

## 🚀 Ready for Phase 8!

Congratulations! Your portfolio now has professional-grade animations!

**Next up: Phase 8 - Content & Data**
- Adding all project content
- Image optimization
- Resume/CV setup
- Data caching
- Final polish

Let me know when you're ready to proceed! 🎉 View Transitions API Wrapper
 * 
 * Provides a wrapper component for View Transitions.
 * Falls back gracefully if API is not supported.
 * 
 * @example
 * <ViewTransition>
 *   <YourContent />
 * </ViewTransition>
 */
export function ViewTransition({ children }: ViewTransitionProps) {
  return <>{children}</>;
}

/**
 * Start a View Transition
 * 
 * Wraps a callback in a View Transition if supported,
 * otherwise executes immediately.
 * 
 * @example
 * startViewTransition(() => router.push('/about'))
 * 
 * @param callback - Function to execute within transition
 */
export function startViewTransition(callback: () => void) {
  // Check if running in browser
  if (typeof document === 'undefined') {
    callback();
    return;
  }

  // Check if View Transitions API is supported
  if ('startViewTransition' in document) {
    // @ts-ignore - View Transitions API is experimental
    return document.startViewTransition(callback);
  } else {
    // Fallback: execute immediately
    callback();
  }
}

/**
 * Check View Transitions Support
 * 
 * Returns true if the browser supports View Transitions API
 * 
 * @example
 * const supported = useViewTransitions();
 * if (supported) {
 *   console.log('View Transitions available!');
 * }
 */
export function useViewTransitions(): boolean {
  if (typeof document === 'undefined') return false;
  return 'startViewTransition' in document;
}
```

**Key Points:**
- ✅ Client component (`"use client"`)
- ✅ TypeScript interfaces
- ✅ Fallback for unsupported browsers
- ✅ JSDoc comments for better DX

---

## Step 2: Create Enhanced Link Component

**Purpose:** Next.js Link with View Transitions support

**File:** `src/components/animations/view-transition-link.tsx`

```typescript
"use client";

import { ReactNode, MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startViewTransition } from "./view-transition";

interface ViewTransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  [key: string]: any; // Allow other props
}

/**
 * Enhanced Link with View Transitions
 * 
 * A wrapper around Next.js Link that adds View Transitions API support.
 * Automatically falls back to standard navigation if not supported.
 * 
 * @example
 * <ViewTransitionLink href="/about" className="nav-link">
 *   About
 * </ViewTransitionLink>
 * 
 * @param href - Navigation destination
 * @param children - Link content
 * @param className - CSS classes
 * @param prefetch - Enable Next.js prefetching (default: true)
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  prefetch = true,
  ...props
}: ViewTransitionLinkProps) {
  const router = useRouter();

  /**
   * Handle Click Event
   * 
   * Intercepts clicks to add View Transition if supported.
   * Respects modified clicks (Ctrl, Cmd, etc.)
   */
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Check for modified clicks (new tab, etc.)
    if (
      e.ctrlKey ||  // Ctrl+Click (Windows/Linux)
      e.shiftKey || // Shift+Click
      e.altKey ||   // Alt+Click
      e.metaKey ||  // Cmd+Click (Mac)
      e.button !== 0 // Not left click
    ) {
      return; // Let browser handle it
    }

    // Check if View Transitions API is supported
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      e.preventDefault(); // Prevent default navigation

      // Wrap navigation in View Transition
      startViewTransition(() => {
        router.push(href);
      });
    }
    // If not supported, Next.js Link handles it normally
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}
```

**Usage Example:**

```tsx
// Replace regular Link
<Link href="/projects">Projects</Link>

// With ViewTransitionLink
<ViewTransitionLink href="/projects">
  Projects
</ViewTransitionLink>
```

**Features:**
- ✅ Respects keyboard modifiers (Ctrl, Cmd, etc.)
- ✅ Automatic fallback
- ✅ Works with Next.js prefetching
- ✅ Type-safe

---

## Step 3: Add CSS Animations

**Purpose:** Define CSS keyframes and View Transitions styles

**File:** `src/styles/animations.css`

```css
/* ============================================
   VIEW TRANSITIONS API STYLES
   ============================================ */

/**
 * Default Page Transitions
 * 
 * Applies fade animation to page transitions.
 * Only works in browsers that support View Transitions API.
 */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-old(root) {
  animation-name: fade-out;
}

::view-transition-new(root) {
  animation-name: fade-in;
}

/**
 * Slide Transitions for Specific Elements
 * 
 * Can be applied to specific elements with view-transition-name CSS property.
 */
::view-transition-old(slide-left),
::view-transition-new(slide-left) {
  animation-duration: 0.4s;
}

::view-transition-old(slide-left) {
  animation-name: slide-out-left;
}

::view-transition-new(slide-left) {
  animation-name: slide-in-right;
}


/* ============================================
   KEYFRAME ANIMATIONS
   ============================================ */

/**
 * Fade Animations
 */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/**
 * Slide Animations - Vertical
 */
@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-out-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
}

/**
 * Slide Animations - Horizontal
 */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-out-left {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50px);
  }
}

@keyframes slide-out-right {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(50px);
  }
}

/**
 * Scale Animations
 */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

/**
 * Loading Animations
 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/**
 * Floating Animation
 */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}


/* ============================================
   UTILITY CLASSES
   ============================================ */

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
}

.animate-slide-in-left {
  animation: slide-in-left 0.5s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.5s ease-out forwards;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s linear infinite;
}


/* ============================================
   ACCESSIBILITY - REDUCED MOTION
   ============================================ */

/**
 * Respect User Preferences
 * 
 * Disable animations for users who prefer reduced motion.
 * This is crucial for accessibility and avoiding motion sickness.
 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable View Transitions */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
  }
}


/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

/**
 * GPU Acceleration
 * 
 * Force GPU acceleration for animated elements
 */
.animate-gpu {
  transform: translateZ(0);
  will-change: transform, opacity;
}

/**
 * Contain Layout
 * 
 * Prevent layout recalculation during animations
 */
.animate-contain {
  contain: layout style paint;
}
```

**Import in your global CSS:**

**File:** `src/app/globals.css`

```css
@import './animations.css';

/* Rest of your global styles */
```

---

# Part 3: Scroll-Triggered Animations

## 📖 Understanding Intersection Observer

**Intersection Observer API** detects when elements enter/exit the viewport. It's more performant than scroll event listeners.

**Benefits:**
- ⚡ Better performance
- 🎯 Precise triggering
- 🔋 Less battery drain
- 📱 Mobile-friendly

---

## Step 4: Create Intersection Observer Hook

**Purpose:** Reusable hook for viewport detection

**File:** `src/lib/hooks/use-intersection-observer.ts`

```typescript
"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  /** Percentage of element that must be visible (0-1) */
  threshold?: number | number[];
  
  /** Root element for intersection (default: viewport) */
  root?: Element | null;
  
  /** Margin around root (CSS format: "10px 20px") */
  rootMargin?: string;
  
  /** Stop observing after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Intersection Observer Hook
 * 
 * Detects when an element enters the viewport.
 * More performant than scroll event listeners.
 * 
 * @example
 * const { ref, isIntersecting, hasIntersected } = useIntersectionObserver({
 *   threshold: 0.5, // Trigger when 50% visible
 *   freezeOnceVisible: true // Only trigger once
 * });
 * 
 * <div ref={ref}>
 *   {hasIntersected && <AnimatedContent />}
 * </div>
 * 
 * @param options - Intersection observer configuration
 * @returns Object with ref, isIntersecting state, and hasIntersected flag
 */
export function useIntersectionObserver<T extends Element>({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverOptions = {}) {
  // Current intersection state
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  // Has ever been intersected
  const [hasIntersected, setHasIntersected] = useState(false);
  
  // Ref to attach to element
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip if already intersected and frozen
    if (freezeOnceVisible && hasIntersected) {
      return;
    }

    // Create observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        // Update current state
        setIsIntersecting(isElementIntersecting);

        // Update ever-intersected state
        if (isElementIntersecting) {
          setHasIntersected(true);

          // Stop observing if freeze is enabled
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, root, rootMargin }
    );

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, hasIntersected]);

  return { 
    ref, 
    isIntersecting, 
    hasIntersected 
  };
}
```

**Usage Example:**

```tsx
function MyComponent() {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.3, // 30% visible
    rootMargin: "50px", // Trigger 50px before entering
    freezeOnceVisible: true
  });

  return (
    <div ref={ref}>
      {hasIntersected ? (
        <AnimatedContent />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
```

---

## Step 5: Create Scroll Reveal Component

**Purpose:** Reveal elements with animation when scrolled into view

**File:** `src/components/animations/scroll-reveal.tsx`

```typescript
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
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom easing
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Usage Examples:**

```tsx
// Simple reveal from bottom
<ScrollReveal direction="up">
  <h2>Section Title</h2>
</ScrollReveal>

// Reveal from left with delay
<ScrollReveal direction="left" delay={0.3}>
  <p>Delayed paragraph</p>
</ScrollReveal>

// Custom distance and duration
<ScrollReveal 
  direction="right" 
  distance={100} 
  duration={1}
  threshold={0.5}
>
  <Card>Content Card</Card>
</ScrollReveal>
```

---

## Step 6: Enhanced Fade In Component

**Purpose:** Simple fade in animation with Intersection Observer

**File:** `src/components/animations/fade-in.tsx`

```typescript
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
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Step 7: Enhanced Slide In Component

**Purpose:** Slide in from any direction with Intersection Observer

**File:** `src/components/animations/slide-in.tsx`

```typescript
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
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## Step 8: Stagger Container Component

**Purpose:** Animate children sequentially with delay

**File:** `src/components/animations/stagger-container.tsx`

```typescript
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/hooks/use-intersection-observer";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
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
      initial="hidden"
      animate={hasIntersected ? "visible" : "hidden"}
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
 *