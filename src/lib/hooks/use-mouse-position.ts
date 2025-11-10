"use client";

import { useEffect, useState, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Simple debounce function (replaces lodash)
 */
function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  wait: number
): (...args: Args) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
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

  const debouncedUpdateRef = useRef<((e: MouseEvent) => void) | null>(null);

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

    // Create debounced handler if needed
    const handler = debounceMs > 0
      ? debounce(updateMousePosition, debounceMs)
      : updateMousePosition;

    debouncedUpdateRef.current = handler;

    // Add event listener
    window.addEventListener("mousemove", handler, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handler);
      debouncedUpdateRef.current = null;
    };
  }, [debounceMs]);

  return mousePosition;
}