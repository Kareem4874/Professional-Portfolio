import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Fredericka_the_Great } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/seo/constants";
import { generatePersonSchema } from "@/lib/seo/structured-data";
import Script from 'next/script';

// Critical components - import directly for SSR
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/accessibility/skip-to-content";
import { ClientComponents } from "@/components/layout/client-components";

// Optimize font loading with better fallbacks and preloading
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'sans-serif']
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ['sans-serif']
});

const fredericka = Fredericka_the_Great({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  adjustFontFallback: false,
  variable: "--font-fredericka",
  fallback: ['cursive']
});  

// Enhanced Metadata
export const metadata: Metadata = defaultMetadata;

// Viewport Configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="KA Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KA Portfolio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/_next/static/media/Inter.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/Poppins.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to important origins */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePersonSchema()),
          }}
          suppressHydrationWarning
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel-analytics.com" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${fredericka.variable} font-sans antialiased overflow-x-hidden`}
      >
        <SkipToContent />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <ClientComponents />
        </ThemeProvider>
        
        {/* Service Worker Registration */}
        <Script
          id="sw-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
        
        {/* Performance Optimizations - Removed dynamic import as it's not needed in client */}
      </body>
    </html>
  );
}