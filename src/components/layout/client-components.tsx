'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical client-only components
const GoogleAnalytics = dynamic(
  () => import("@/lib/analytics/google-analytics").then(mod => ({ default: mod.GoogleAnalytics })),
  { ssr: false }
);

const VercelAnalytics = dynamic(
  () => import("@/lib/analytics/vercel-analytics").then(mod => ({ default: mod.VercelAnalytics })),
  { ssr: false }
);

const WebVitals = dynamic(
  () => import("@/components/performance/web-vitals").then(mod => ({ default: mod.WebVitals })),
  { ssr: false }
);

const PWAInstaller = dynamic(
  () => import("@/components/pwa/pwa-installer").then(mod => ({ default: mod.PWAInstaller })),
  { ssr: false }
);

export function ClientComponents() {
  return (
    <>
      <GoogleAnalytics />
      <VercelAnalytics />
      <WebVitals />
      <PWAInstaller />
    </>
  );
}

