/**
 * Performance Optimizations
 * Google Core Web Vitals Best Practices
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload fonts
  const fontLinks = [
    '/fonts/inter-var.woff2',
    '/fonts/poppins-var.woff2'
  ];

  fontLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preconnect to external origins
  const origins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com',
    'https://vitals.vercel-analytics.com'
  ];

  origins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  });
}

// Lazy load images with Intersection Observer
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  images.forEach(img => imageObserver.observe(img));
}

// Optimize LCP (Largest Contentful Paint)
export function optimizeLCP() {
  if (typeof window === 'undefined') return;

  // Preload hero image
  const heroImage = document.querySelector('[data-hero-image]');
  if (heroImage && heroImage instanceof HTMLImageElement) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = heroImage.src;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  }

  // Set fetchpriority for above-the-fold images
  const aboveFoldImages = document.querySelectorAll('[data-above-fold]');
  aboveFoldImages.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.setAttribute('fetchpriority', 'high');
      img.loading = 'eager';
    }
  });
}

// Optimize CLS (Cumulative Layout Shift)
export function optimizeCLS() {
  if (typeof window === 'undefined') return;

  // Add aspect-ratio to images without explicit dimensions
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.addEventListener('load', () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        img.style.aspectRatio = aspectRatio.toString();
      });
    }
  });

  // Reserve space for async content
  const asyncContainers = document.querySelectorAll('[data-async-container]');
  asyncContainers.forEach(container => {
    if (container instanceof HTMLElement) {
      const minHeight = container.dataset.minHeight || '200px';
      container.style.minHeight = minHeight;
    }
  });
}

// Optimize FID (First Input Delay)
export function optimizeFID() {
  if (typeof window === 'undefined') return;

  // Break up long tasks
  const yieldToMain = () => {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
  };

  // Use requestIdleCallback for non-critical tasks
  const runWhenIdle = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1);
    }
  };

  // Debounce input handlers
  const debounce = <Args extends unknown[]>(func: (...args: Args) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Apply optimizations to input elements
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const originalHandler = input.oninput;
      if (originalHandler) {
        input.oninput = debounce(originalHandler, 300);
      }
    }
  });

  return { yieldToMain, runWhenIdle, debounce };
}

// Resource hints for better performance
export function addResourceHints() {
  if (typeof window === 'undefined') return;

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://vitals.vercel-analytics.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Prefetch next page resources
  const prefetchLinks = document.querySelectorAll('a[data-prefetch]');
  const linkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.href;
        
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
        
        linkObserver.unobserve(link);
      }
    });
  }, {
    rootMargin: '0px 0px',
    threshold: 0.1
  });

  prefetchLinks.forEach(link => linkObserver.observe(link));
}

// Memory leak prevention
export function preventMemoryLeaks() {
  if (typeof window === 'undefined') return;

  const observers: Set<IntersectionObserver> = new Set();
  
  // Clean up observers on page navigation
  window.addEventListener('beforeunload', () => {
    observers.forEach((observer: IntersectionObserver) => {
      observer.disconnect();
    });
    observers.clear();
  });

  // Clean up event listeners
  const cleanupListeners: (() => void)[] = [];
  
  const addEventListener = (
    element: EventTarget,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ) => {
    element.addEventListener(event, handler, options);
    cleanupListeners.push(() => {
      element.removeEventListener(event, handler, options);
    });
  };

  window.addEventListener('beforeunload', () => {
    cleanupListeners.forEach(cleanup => cleanup());
  });

  return { addEventListener };
}

// Initialize all optimizations
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Run critical optimizations immediately
  preloadCriticalResources();
  optimizeLCP();
  optimizeCLS();
  
  // Run non-critical optimizations when idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      lazyLoadImages();
      optimizeFID();
      addResourceHints();
      preventMemoryLeaks();
    });
  } else {
    setTimeout(() => {
      lazyLoadImages();
      optimizeFID();
      addResourceHints();
      preventMemoryLeaks();
    }, 1);
  }
}

// Export performance metrics
export function reportWebVitals(metric: { name: string; value: number; id: string; delta: number; entries: PerformanceEntry[] }) {
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}
