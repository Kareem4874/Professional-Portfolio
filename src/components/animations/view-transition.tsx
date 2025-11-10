"use client";

import { ReactNode } from "react";

interface ViewTransitionProps {
  children: ReactNode;
}

/**
 * View Transition Component
 * 
 * Wrapper that enables View Transitions API for smooth page transitions.
 * Falls back gracefully in browsers that don't support it.
 * 
 * Currently supported in Chrome 111+ and Edge 111+.
 * 
 * @example
 * <ViewTransition>
 *   <YourPageContent />
 * </ViewTransition>
 */
export function ViewTransition({ children }: ViewTransitionProps) {
  return <>{children}</>;
}

/**
 * Start View Transition
 * 
 * Helper function to trigger view transition programmatically.
 * Automatically falls back to immediate execution if not supported.
 * 
 * @example
 * startViewTransition(() => {
 *   router.push('/new-page');
 * });
 */
export function startViewTransition(callback: () => void) {
  if (typeof document === "undefined") {
    callback();
    return;
  }

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void;
  };

  if (typeof doc.startViewTransition === "function") {
    doc.startViewTransition(callback);
  } else {
    // Fallback for browsers that don't support View Transitions
    callback();
  }
}