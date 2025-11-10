/**
 * Service Worker - Google Best Practices
 * Implements: Cache-First, Network-First, and Stale-While-Revalidate strategies
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/_next/static/chunks/main.js',
  '/_next/static/chunks/webpack.js',
  '/_next/static/chunks/framework.js',
  '/_next/static/chunks/pages/_app.js',
  '/_next/static/chunks/pages/index.js',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(asset => !asset.includes('_next')));
      })
      .catch(err => {
        console.error('[SW] Pre-cache failed:', err);
      })
  );
  
  // Force immediate activation
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE)
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) protocols
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // API calls - Network First strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Static assets (images, fonts) - Cache First strategy
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // HTML pages - Stale While Revalidate strategy
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Default - Network First
  event.respondWith(networkFirst(request));
});

// Cache-First Strategy (for static assets)
async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
    });
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-First fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network-First Strategy (for API calls)
async function networkFirst(request, timeout = 3000) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const networkPromise = fetch(request);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    );
    
    const networkResponse = await Promise.race([networkPromise, timeoutPromise]);
    
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network-First: Falling back to cache');
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }
    
    return new Response('Network error', { status: 503 });
  }
}

// Stale-While-Revalidate Strategy (for HTML pages)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => {
      return cachedResponse || new Response('Offline', { status: 503 });
    });
  
  return cachedResponse || fetchPromise;
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.otf', '.eot',
    '.css', '.js', '.json'
  ];
  
  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Handle background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-contact-form') {
    event.waitUntil(syncContactForm());
  }
});

async function syncContactForm() {
  const cache = await caches.open('form-submissions');
  const requests = await cache.keys();
  
  for (const request of requests) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        await cache.delete(request);
        console.log('[SW] Form submission synced successfully');
      }
    } catch (error) {
      console.error('[SW] Form sync failed:', error);
    }
  }
}

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'New notification',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icon-96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Portfolio Update', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
