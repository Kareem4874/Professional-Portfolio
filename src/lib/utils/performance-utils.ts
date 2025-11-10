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
export function debounce<T extends (...args: unknown[]) => unknown>(
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
export function throttle<T extends (...args: unknown[]) => unknown>(
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
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
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
