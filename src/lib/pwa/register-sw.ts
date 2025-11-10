/**
 * Service Worker Registration
 * Google Best Practices for PWA
 */

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });

        console.log('SW registered successfully:', registration);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check every hour

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available, show update prompt
                showUpdatePrompt();
              }
            });
          }
        });

        // Handle controller change
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

      } catch (error) {
        console.error('SW registration failed:', error);
      }
    });
  }
}

function showUpdatePrompt() {
  const shouldUpdate = window.confirm(
    'A new version of the app is available. Would you like to update?'
  );
  
  if (shouldUpdate) {
    navigator.serviceWorker.controller?.postMessage({ type: 'SKIP_WAITING' });
  }
}

// Check if app is installed as PWA
export function isPWAInstalled() {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const isBeforeInstallPromptEvent = (event: Event): event is BeforeInstallPromptEvent => {
  return typeof (event as Partial<BeforeInstallPromptEvent>).prompt === 'function';
};

// Prompt for PWA installation
export function promptPWAInstall() {
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (event) => {
      if (!isBeforeInstallPromptEvent(event)) {
        return;
      }

      event.preventDefault();
      deferredPrompt = event;
      
      // Show install button/banner
      showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA installed successfully');
      deferredPrompt = null;
      hideInstallButton();
    });
  }

  return {
    prompt: async () => {
      if (!deferredPrompt) return false;
      
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted PWA install');
      }
      
      deferredPrompt = null;
      return outcome === 'accepted';
    }
  };
}

function showInstallButton() {
  // This would typically update UI state to show an install button
  const event = new CustomEvent('pwa-install-available');
  window.dispatchEvent(event);
}

function hideInstallButton() {
  const event = new CustomEvent('pwa-installed');
  window.dispatchEvent(event);
}
