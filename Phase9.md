# Phase 9: SEO & Performance Optimization 🚀

**Duration:** 2-3 days  
**Goal:** Optimize portfolio for search engines, performance, and accessibility with Next.js 16 features

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [SEO Architecture](#seo-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Testing SEO & Performance](#testing-seo--performance)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 9, we'll implement:
- ✅ Enhanced Metadata API with dynamic generation
- ✅ Open Graph and Twitter Cards
- ✅ JSON-LD Structured Data
- ✅ Dynamic Sitemap Generation
- ✅ Robots.txt Configuration
- ✅ Performance Optimization (PPR, Caching, Images)
- ✅ Accessibility Improvements (WCAG AA)
- ✅ Core Web Vitals Optimization
- ✅ Lighthouse Score 95+
- ✅ Analytics Integration

**Result:** A lightning-fast, SEO-optimized portfolio that ranks well and provides excellent user experience.

---

## 🔧 Prerequisites

Before starting Phase 9:
- ✅ Phases 1-8 completed successfully
- ✅ All pages and content finalized
- ✅ Images optimized and in place
- ✅ Blog posts written (if applicable)
- ✅ Contact form functional

---

## 🏗️ SEO Architecture

```
app/
├── layout.tsx                    # Root metadata + JSON-LD
├── sitemap.ts                    # Dynamic sitemap generation
├── robots.ts                     # Robots.txt configuration
├── manifest.ts                   # PWA manifest
├── opengraph-image.tsx          # OG image generation
├── twitter-image.tsx            # Twitter card image
└── [pages]/
    ├── page.tsx                 # generateMetadata for each page
    └── opengraph-image.tsx      # Page-specific OG images

lib/
├── seo/
│   ├── metadata.ts              # Metadata utilities
│   ├── structured-data.ts       # JSON-LD schemas
│   └── constants.ts             # SEO constants
└── analytics/
    ├── google-analytics.tsx     # GA component
    └── vercel-analytics.tsx     # Vercel Analytics

public/
├── favicon.ico
├── icon.png
├── apple-icon.png
└── manifest.json
```

---

## 🚀 Performance Optimization Tips

### **1. Image Best Practices**

```typescript
// Always specify sizes for responsive images
<Image
  src={image}
  alt={alt}
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold} // Only for above-fold images
  quality={90}
/>

// Use placeholder for better UX
<Image
  src={image}
  alt={alt}
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### **2. Font Optimization**

```typescript
// In app/layout.tsx - already configured
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevents invisible text
  preload: true,
});

// Use variable fonts for better performance
```

### **3. Code Splitting**

```typescript
// Use dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false, // If not needed on server
  }
);

// Split by route automatically with app router
// Each page.tsx is automatically code-split
```

### **4. Database & API Optimization**

```typescript
// Use unstable_cache for expensive operations
import { unstable_cache } from 'next/cache';

export const getCachedData = unstable_cache(
  async () => {
    const data = await expensiveOperation();
    return data;
  },
  ['cache-key'],
  {
    revalidate: 3600, // 1 hour
    tags: ['data'],
  }
);

// Revalidate on-demand
import { revalidateTag } from 'next/cache';
revalidateTag('data');
```

### **5. Enable PPR for Hybrid Pages**

```typescript
// In app/page.tsx or other pages
export const experimental_ppr = true;

export default function Page() {
  return (
    <>
      {/* Static shell - renders instantly */}
      <Header />
      
      {/* Dynamic content - streams in */}
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
      
      {/* Static footer */}
      <Footer />
    </>
  );
}
```

---

## 🎨 SEO Customization Guide

### **Adding Custom Meta Tags**

```typescript
// For specific pages
export const metadata: Metadata = {
  ...generatePageMetadata({ ... }),
  other: {
    'custom-meta': 'value',
  },
};
```

### **Adding Multiple Languages**

```typescript
// In metadata
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://yoursite.com',
    languages: {
      'en-US': 'https://yoursite.com',
      'ar-EG': 'https://yoursite.com/ar',
    },
  },
};
```

### **Custom OG Images per Page**

```typescript
// Create app/projects/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getProjectBySlug } from '@/lib/data/projects';

export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: 60 }}>{project?.title}</h1>
        <p style={{ fontSize: 30 }}>{project?.category}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
```

---

## 🔍 Advanced SEO Techniques

### **1. FAQ Schema**

```typescript
// Add to relevant pages
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
```

### **2. Review/Rating Schema**

```typescript
// For projects or testimonials
export function generateReviewSchema(reviews: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: reviews.length,
  };
}
```

### **3. Video Schema**

```typescript
// For project demos with video
export function generateVideoSchema(video: any) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.date,
    contentUrl: video.url,
  };
}
```

---

## 📈 Analytics & Tracking

### **Custom Event Tracking**

```typescript
// Track button clicks
import { event } from '@/lib/analytics/google-analytics';

<Button
  onClick={() => {
    event({
      action: 'click',
      category: 'CTA',
      label: 'Download CV',
      value: 1,
    });
    // Handle download
  }}
>
  Download CV
</Button>

// Track form submissions
event({
  action: 'submit',
  category: 'Contact Form',
  label: 'Success',
});

// Track project views
event({
  action: 'view',
  category: 'Project',
  label: projectTitle,
});
```

### **Page View Tracking**

```typescript
// Create middleware.ts for automatic tracking
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Track page view (in production with analytics)
  if (process.env.NODE_ENV === 'production') {
    // Log page view
    console.log('Page view:', request.nextUrl.pathname);
  }
  
  return response;
}
```

---

## ✅ Pre-Launch Checklist

### **Content & SEO**

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] All images have alt text
- [ ] Sitemap is accessible and complete
- [ ] Robots.txt is configured
- [ ] Structured data is valid
- [ ] Social media previews work
- [ ] Canonical URLs are set
- [ ] 404 page is functional
- [ ] No broken links

### **Performance**

- [ ] Lighthouse score 95+
- [ ] Core Web Vitals pass
- [ ] Images are optimized
- [ ] Fonts are optimized
- [ ] JavaScript bundles < 200KB
- [ ] CSS is optimized
- [ ] Caching headers set
- [ ] PPR enabled where beneficial
- [ ] No console errors
- [ ] Loading states present

### **Accessibility**

- [ ] WCAG AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Color contrast passes
- [ ] Focus indicators visible
- [ ] Skip to content link
- [ ] ARIA labels present
- [ ] Forms are accessible
- [ ] Touch targets sized correctly
- [ ] Reduced motion respected

### **Technical**

- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Environment variables set
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Git repository clean
- [ ] Documentation complete

### **Testing**

- [ ] Desktop Chrome tested
- [ ] Desktop Firefox tested
- [ ] Desktop Safari tested
- [ ] Mobile Chrome tested
- [ ] Mobile Safari tested
- [ ] Tablet tested
- [ ] Forms work correctly
- [ ] Links open correctly
- [ ] Navigation functional
- [ ] Search works (if applicable)

---

## 🚀 Deployment Checklist

### **Pre-Deployment**

```bash
# 1. Run final tests
npm run build
npm run lint
npm run type-check

# 2. Test production build locally
npm run start

# 3. Run Lighthouse audit
npm run lighthouse

# 4. Check bundle size
npm run analyze
```

### **Vercel Deployment**

1. **Connect Repository**
   - Go to Vercel Dashboard
   - Import Git Repository
   - Connect GitHub repo

2. **Configure Environment Variables**
   ```
   NEXT_PUBLIC_SITE_URL=https://yourportfolio.vercel.app
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_WEB3FORMS_KEY=your_key
   ```

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Test deployed site

### **Post-Deployment Verification**

- [ ] Site is accessible at domain
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Analytics tracking works
- [ ] Images load properly
- [ ] No console errors
- [ ] SSL certificate active
- [ ] Redirects work (if any)
- [ ] 404 page works
- [ ] Sitemap accessible

### **DNS Configuration (Custom Domain)**

```
# Add these records to your DNS provider:
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

---

## 📊 Monitoring & Maintenance

### **Weekly Tasks**

- [ ] Check Google Search Console for errors
- [ ] Review Analytics data
- [ ] Check Core Web Vitals
- [ ] Monitor uptime
- [ ] Review error logs

### **Monthly Tasks**

- [ ] Update content (blog posts)
- [ ] Review and update projects
- [ ] Check for broken links
- [ ] Update dependencies
- [ ] Review performance metrics
- [ ] Backup data

### **Quarterly Tasks**

- [ ] Full SEO audit
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Performance optimization
- [ ] Content refresh
- [ ] Design improvements

---

## 🔗 Useful Tools & Resources

### **SEO Tools**

- **Google Search Console**: https://search.google.com/search-console
- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Meta Tags Checker**: https://metatags.io/
- **Schema Validator**: https://validator.schema.org/

### **Performance Tools**

- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org/
- **GTmetrix**: https://gtmetrix.com/
- **Vercel Analytics**: Built-in on Vercel
- **Bundle Analyzer**: https://bundlephobia.com/

### **Accessibility Tools**

- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: Chrome extension
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Screen Reader**: NVDA (free), JAWS, VoiceOver

### **Analytics & Monitoring**

- **Google Analytics 4**: https://analytics.google.com/
- **Vercel Analytics**: https://vercel.com/analytics
- **Plausible Analytics**: https://plausible.io/ (privacy-friendly)
- **Umami**: https://umami.is/ (self-hosted)

---

## 💡 Pro Tips

### **1. Optimize for Speed**

```typescript
// Use Next.js 16 features
- Enable PPR for instant static shells
- Use Suspense for code splitting
- Implement streaming where beneficial
- Cache aggressively with revalidation
- Use Edge Runtime for API routes
```

### **2. Monitor Real User Metrics**

```typescript
// Track actual user experience
- Enable Vercel Speed Insights
- Monitor Core Web Vitals
- Track slow pages
- Identify bottlenecks
- Fix issues promptly
```

### **3. Keep Content Fresh**

```typescript
// Regular updates improve SEO
- Publish blog posts regularly
- Update project descriptions
- Add new projects
- Refresh old content
- Keep skills section current
```

### **4. Build Backlinks**

```typescript
// Improve domain authority
- Share on social media
- Submit to directories
- Guest post on blogs
- Contribute to open source
- Network with developers
```

### **5. Mobile-First Approach**

```typescript
// Google uses mobile-first indexing
- Test on real devices
- Optimize touch targets
- Ensure fast mobile loads
- Use responsive images
- Test on slow connections
```

---

## 📝 Git Commit

```bash
# Stage all changes
git add .

# Commit with comprehensive message
git commit -m "Phase 9 Complete: SEO & Performance Optimization

## SEO Implementation
- Enhanced Metadata API with dynamic generation
- Open Graph and Twitter Card meta tags
- JSON-LD Structured Data (Website, Person, Projects, Blog)
- Dynamic sitemap generation with all routes
- Robots.txt configuration
- PWA manifest file
- Breadcrumb navigation schema

## Performance Optimization
- Next.js 16 configuration optimized
- Image optimization with AVIF support
- Font optimization with display swap
- Resource hints (preconnect, dns-prefetch)
- Code splitting and lazy loading
- Caching headers configured
- PPR enabled for hybrid pages
- Bundle size optimization

## Analytics & Monitoring
- Google Analytics 4 integration
- Vercel Analytics and Speed Insights
- Web Vitals tracking
- Custom event tracking
- Performance monitoring
- Error boundary implementation

## Accessibility Improvements
- WCAG AA compliance
- Skip to content link
- Enhanced focus indicators
- Proper ARIA labels and landmarks
- Keyboard navigation support
- Screen reader optimization
- Reduced motion support
- High contrast mode support

## Testing Tools
- Lighthouse CI configuration
- SEO validation utilities
- Performance monitoring component
- Automated testing scripts

## Assets
- Favicon and app icons (all sizes)
- Open Graph images
- Twitter Card images
- PWA icons with maskable versions

## Documentation
- Complete testing checklist
- Deployment guide
- Monitoring strategies
- Troubleshooting guide
- Performance tips
- SEO best practices

Lighthouse Score Target: 95+
Core Web Vitals: All Pass
Accessibility: WCAG AA Compliant"

# Push to remote
git push origin main
```

---

## 🎓 Key Learnings

### **What We Accomplished**

1. **Comprehensive SEO Implementation**
   - Dynamic metadata generation for all pages
   - Structured data for rich search results
   - Social media optimization
   - Sitemap and robots.txt automation

2. **Performance Excellence**
   - Next.js 16 optimization techniques
   - Image and font optimization
   - Code splitting and lazy loading
   - Caching strategies

3. **Accessibility Standards**
   - WCAG AA compliance achieved
   - Keyboard navigation fully functional
   - Screen reader optimization
   - Focus management

4. **Analytics & Monitoring**
   - Real user monitoring setup
   - Performance tracking
   - Error tracking
   - Custom event tracking

### **Best Practices Applied**

- ✅ Metadata-driven SEO approach
- ✅ Type-safe structured data
- ✅ Progressive enhancement
- ✅ Performance budgets
- ✅ Accessibility-first design
- ✅ Real user monitoring
- ✅ Automated testing
- ✅ Documentation-driven development

### **Skills Developed**

- **SEO Expertise**: Meta tags, structured data, sitemaps
- **Performance Optimization**: Core Web Vitals, caching, code splitting
- **Accessibility**: WCAG compliance, ARIA, keyboard navigation
- **Analytics**: GA4, custom events, Web Vitals tracking
- **Testing**: Lighthouse, automated testing, validation
- **Monitoring**: Error tracking, performance monitoring
- **Next.js 16**: PPR, enhanced metadata API, optimization

---

## 🔮 Future Enhancements

### **Advanced SEO**
- [ ] Implement hreflang tags for internationalization
- [ ] Add FAQ schema for common questions
- [ ] Create video sitemap for demos
- [ ] Implement AMP pages for news content
- [ ] Add review/rating schema

### **Performance**
- [ ] Implement Service Worker for offline support
- [ ] Add request/response caching with workbox
- [ ] Optimize with Brotli compression
- [ ] Implement lazy hydration
- [ ] Use React Server Components more extensively

### **Analytics**
- [ ] Heat maps with Hotjar
- [ ] Session recording
- [ ] Conversion funnel tracking
- [ ] A/B testing implementation
- [ ] User journey mapping

### **Monitoring**
- [ ] Error tracking with Sentry
- [ ] Uptime monitoring
- [ ] Performance regression detection
- [ ] Automated alerts
- [ ] Status page

---

## 📚 Additional Resources

### **Next.js 16 Documentation**
- [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [SEO](https://nextjs.org/learn/seo/introduction-to-seo)

### **SEO Resources**
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

### **Performance Resources**
- [Web.dev](https://web.dev/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### **Accessibility Resources**
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

---

## ✅ Phase 9 Complete! 

**Congratulations!** 🎉 Your portfolio is now fully optimized for:
- ✅ Search engines (SEO)
- ✅ Performance (Core Web Vitals)
- ✅ Accessibility (WCAG AA)
- ✅ Analytics & monitoring
- ✅ User experience

### **Next Steps:**

1. **Run Final Tests**
   ```bash
   npm run build
   npm run lighthouse
   ```

2. **Deploy to Production**
   - Push to GitHub
   - Deploy on Vercel
   - Configure custom domain

3. **Post-Launch**
   - Submit sitemap to Google Search Console
   - Set up Google Analytics
   - Monitor performance
   - Share your portfolio!

4. **Phase 10: Polish & Deploy**
   - Final bug fixes
   - Cross-browser testing
   - Content proofreading
   - Launch preparation

---

**Your portfolio is production-ready with world-class SEO and performance!** 🚀

Ready for Phase 10 (Final Polish & Deployment)? Let's finish strong! 💪Step-by-Step Implementation

### **Part 1: SEO Configuration Files**

---

#### **Step 1: Create SEO Constants**

Create `src/lib/seo/constants.ts`:

```typescript
export const siteConfig = {
  name: "Kareem AbdulBaset",
  title: "Kareem AbdulBaset - Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications with exceptional user experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yourportfolio.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "mailto:your.email@example.com",
  },
  creator: {
    name: "Kareem AbdulBaset",
    url: "https://yourportfolio.com",
    email: "your.email@example.com",
    jobTitle: "Frontend Developer",
    location: "Cairo, Egypt",
  },
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "UI/UX",
    "Portfolio",
    "Kareem AbdulBaset",
  ],
};

export const socialProfiles = {
  twitter: "@yourusername",
  github: "yourusername",
  linkedin: "yourprofile",
};

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  ],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: socialProfiles.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};
```

---

#### **Step 2: Create Metadata Utilities**

Create `src/lib/seo/metadata.ts`:

```typescript
import { Metadata } from "next";
import { siteConfig } from "./constants";

interface PageMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  image,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMetadataProps): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;
  const fullImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${siteConfig.url}${ogImage}`;

  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title,
    description,
    keywords: allKeywords,
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: siteConfig.creator.name, url: siteConfig.creator.url }],
    openGraph: {
      type,
      locale: "en_US",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [siteConfig.creator.name],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: siteConfig.links.twitter,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function generateBlogPostMetadata({
  title,
  description,
  slug,
  image,
  publishedAt,
  modifiedAt,
  tags = [],
  author = siteConfig.creator.name,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  tags?: string[];
  author?: string;
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    image,
    keywords: tags,
    type: "article",
    publishedTime: publishedAt,
    modifiedTime: modifiedAt || publishedAt,
    authors: [author],
  });
}

export function generateProjectMetadata({
  title,
  description,
  slug,
  image,
  technologies = [],
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  technologies?: string[];
}): Metadata {
  return generatePageMetadata({
    title,
    description,
    path: `/projects/${slug}`,
    image,
    keywords: [...technologies, "project", "portfolio"],
    type: "article",
  });
}
```

---

#### **Step 3: Create Structured Data Schemas**

Create `src/lib/seo/structured-data.ts`:

```typescript
import { siteConfig } from "./constants";

export interface Person {
  "@type": "Person";
  name: string;
  url: string;
  image?: string;
  jobTitle?: string;
  worksFor?: Organization;
  sameAs?: string[];
}

export interface Organization {
  "@type": "Organization";
  name: string;
  url: string;
}

export interface WebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: Person;
  inLanguage: string;
}

export interface BlogPosting {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: Person;
  publisher: Organization;
  url: string;
  keywords?: string[];
}

export interface CreativeWork {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  image?: string[];
  author: Person;
  datePublished: string;
  url: string;
  keywords?: string[];
}

// Website Schema
export function generateWebsiteSchema(): WebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
      jobTitle: siteConfig.creator.jobTitle,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
      ],
    },
    inLanguage: "en-US",
  };
}

// Person Schema
export function generatePersonSchema(): Person {
  return {
    "@type": "Person",
    name: siteConfig.creator.name,
    url: siteConfig.creator.url,
    jobTitle: siteConfig.creator.jobTitle,
    image: `${siteConfig.url}/profile.jpg`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
  };
}

// Blog Post Schema
export function generateBlogPostSchema({
  title,
  description,
  slug,
  image,
  publishedAt,
  modifiedAt,
  keywords,
}: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  keywords?: string[];
}): BlogPosting {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || siteConfig.ogImage,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${slug}`,
    keywords,
  };
}

// Project Schema
export function generateProjectSchema({
  title,
  description,
  slug,
  images,
  date,
  technologies,
}: {
  title: string;
  description: string;
  slug: string;
  images?: string[];
  date: string;
  technologies?: string[];
}): CreativeWork {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    image: images,
    author: {
      "@type": "Person",
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
    datePublished: date,
    url: `${siteConfig.url}/projects/${slug}`,
    keywords: technologies,
  };
}

// Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
```

---

### **Part 2: Root Layout SEO**

---

#### **Step 4: Update Root Layout with Metadata**

Update `src/app/layout.tsx`:

```typescript
import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { defaultMetadata } from "@/lib/seo/constants";
import { generateWebsiteSchema } from "@/lib/seo/structured-data";
import { GoogleAnalytics } from "@/lib/analytics/google-analytics";
import { VercelAnalytics } from "@/lib/analytics/vercel-analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
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
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
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
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        
        {/* Analytics */}
        <GoogleAnalytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
```

---

#### **Step 5: Generate Sitemap**

Create `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/blog/blog-utils"; // If you have blog
import { siteConfig } from "@/lib/seo/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Dynamic project pages
  const projects = getAllProjects();
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.9 : 0.8,
  }));

  // Dynamic blog pages (if applicable)
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    blogPages = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.log("No blog posts found");
  }

  return [...staticPages, ...projectPages, ...blogPages];
}
```

---

#### **Step 6: Configure Robots.txt**

Create `src/app/robots.ts`:

```typescript
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

---

#### **Step 7: Create Manifest for PWA**

Create `src/app/manifest.ts`:

```typescript
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
```

---

### **Part 3: Page-Specific SEO**

---

#### **Step 8: Homepage Metadata**

Update `src/app/page.tsx`:

```typescript
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generatePersonSchema } from "@/lib/seo/structured-data";
// ... other imports

export const metadata: Metadata = generatePageMetadata({
  title: "Home - Frontend Developer Portfolio",
  description:
    "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications with exceptional user experiences.",
  path: "/",
  keywords: [
    "portfolio",
    "frontend developer",
    "web developer",
    "React",
    "Next.js",
  ],
});

export default function HomePage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      
      {/* Page content */}
      {/* ... */}
    </>
  );
}
```

---

#### **Step 9: Projects Page Metadata**

Update `src/app/projects/page.tsx`:

```typescript
import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Projects - Web Development Portfolio",
  description:
    "Explore my portfolio of web development projects built with React, Next.js, TypeScript, and modern web technologies. Featuring e-commerce platforms, dashboards, and more.",
  path: "/projects",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "React projects",
    "Next.js projects",
  ],
});

// ... rest of the component
```

---

#### **Step 10: Single Project Metadata**

Update `src/app/projects/[slug]/page.tsx`:

```typescript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { generateProjectMetadata } from "@/lib/seo/metadata";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Generate Metadata
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return generateProjectMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    image: project.image,
    technologies: project.technologies,
  });
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Structured Data
  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.longDescription,
    slug: project.slug,
    images: project.images,
    date: project.date,
    technologies: project.technologies,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Page content */}
      {/* ... */}
    </>
  );
}
```

---

#### **Step 11: Blog Post Metadata (if applicable)**

Update `src/app/blog/[slug]/page.tsx`:

```typescript
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog/blog-utils";
import { generateBlogPostMetadata } from "@/lib/seo/metadata";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogPostMetadata({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.coverImage,
    publishedAt: post.publishedAt,
    modifiedAt: post.updatedAt,
    tags: post.tags,
    author: post.author,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.coverImage,
    publishedAt: post.publishedAt,
    modifiedAt: post.updatedAt,
    keywords: post.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Article content */}
      <article>
        {/* ... */}
      </article>
    </>
  );
}
```

---

### **Part 4: Performance Optimization**

---

#### **Step 12: Optimize Next.js Config**

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable PPR for hybrid static/dynamic pages
  experimental: {
    ppr: true,
  },

  // Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compression
  compress: true,

  // Strict Mode
  reactStrictMode: true,

  // Power by header removal
  poweredByHeader: false,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.{jpg,jpeg,png,gif,webp,avif,ico,svg}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

#### **Step 13: Create Image Optimization Component**

Create `src/components/ui/optimized-image.tsx`:

```typescript
"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  fallbackSrc = "/placeholder.png",
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        quality={90}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError(true);
        }}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"
        )}
        {...props}
      />
    </div>
  );
}
```

---

#### **Step 14: Create Analytics Components**

Create `src/lib/analytics/google-analytics.tsx`:

```typescript
"use client";

import Script from "next/script";

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

Create `src/lib/analytics/vercel-analytics.tsx`:

```typescript
"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function VercelAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

---

### **Part 5: Accessibility Improvements**

---

#### **Step 15: Create Skip to Content Link**

Create `src/components/accessibility/skip-to-content.tsx`:

```typescript
"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
```

Add to layout:

```typescript
// In src/app/layout.tsx
import { SkipToContent } from "@/components/accessibility/skip-to-content";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SkipToContent />
        <ThemeProvider>
          {/* ... */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Update main content:

```typescript
// In your page components
<main id="main-content" className="flex-1">
  {children}
</main>
```

---

#### **Step 16: Enhance Focus Indicators**

Update `src/app/globals.css`:

```css
/* Enhanced Focus Indicators for Accessibility */
*:focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove default outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}

/* Skip link styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.sr-only:active {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-width: 2px;
  }
  
  button,
  a {
    text-decoration: underline;
  }
}

/* Focus within for better keyboard navigation */
nav:focus-within,
form:focus-within {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 4px;
}
```

---

#### **Step 17: Add ARIA Labels and Landmarks**

Update `src/components/layout/navbar.tsx`:

```typescript
export function Navbar() {
  return (
    <header role="banner">
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="container mx-auto"
      >
        {/* Navigation items with proper aria labels */}
        <ul role="menubar">
          <li role="none">
            <Link
              href="/"
              role="menuitem"
              aria-label="Go to homepage"
              className="nav-link"
            >
              Home
            </Link>
          </li>
          {/* ... */}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="mobile-menu-button"
        >
          <span className="sr-only">
            {isOpen ? "Close menu" : "Open menu"}
          </span>
          {/* Icon */}
        </button>
      </nav>
    </header>
  );
}
```

Update `src/components/layout/footer.tsx`:

```typescript
export function Footer() {
  return (
    <footer role="contentinfo" className="border-t">
      <div className="container mx-auto py-12">
        <nav aria-label="Footer navigation">
          {/* Footer links */}
        </nav>
        
        <div role="complementary" aria-label="Social media links">
          {/* Social links */}
        </div>
        
        <p role="contentinfo">
          © {new Date().getFullYear()} Kareem AbdulBaset. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

### **Part 6: Performance Monitoring**

---

#### **Step 18: Create Performance Monitor Component**

Create `src/components/performance/web-vitals.tsx`:

```typescript
"use client";

import { useReportWebVitals } from "next/web-vitals";
import { event } from "@/lib/analytics/google-analytics";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }

    // Send to analytics
    event({
      action: metric.name,
      category: "Web Vitals",
      label: metric.id,
      value: Math.round(metric.value),
    });

    // Send to Vercel Analytics automatically
  });

  return null;
}
```

Add to layout:

```typescript
// In src/app/layout.tsx
import { WebVitals } from "@/components/performance/web-vitals";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WebVitals />
        {/* ... */}
      </body>
    </html>
  );
}
```

---

#### **Step 19: Add Loading Performance Optimization**

Create `src/components/performance/resource-hints.tsx`:

```typescript
export function ResourceHints() {
  return (
    <>
      {/* Preconnect to critical domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      
      {/* DNS Prefetch for external resources */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://vercel-analytics.com" />
      
      {/* Preload critical assets */}
      <link
        rel="preload"
        href="/fonts/inter.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
```

---

### **Part 7: Error Monitoring**

---

#### **Step 20: Create Error Boundary**

Create `src/components/error/error-boundary.tsx`:

```typescript
"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
    
    // You can send to Sentry or other error tracking service
    if (process.env.NODE_ENV === "production") {
      // logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-4 max-w-md">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-heading font-bold">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <pre className="text-left text-xs bg-muted p-4 rounded overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <Button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = "/";
              }}
            >
              Go to Homepage
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### **Part 8: Image Assets**

---

#### **Step 21: Create Favicons and Icons**

Generate the following images and place in `public/`:

**Required Files:**
- `favicon.ico` (32x32, 16x16)
- `icon.png` (512x512) - Will be auto-resized by Next.js
- `apple-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)
- `icon-192-maskable.png` (192x192 with safe zone)
- `icon-512-maskable.png` (512x512 with safe zone)
- `og-image.png` (1200x630) - Open Graph image
- `twitter-image.png` (1200x630) - Twitter Card image

**Quick Generation Script:**

Create `scripts/generate-icons.js`:

```javascript
// Use this with sharp library to generate all sizes
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 192, 512, 180];
const inputImage = './public/logo.png'; // Your source logo

async function generateIcons() {
  for (const size of sizes) {
    await sharp(inputImage)
      .resize(size, size)
      .toFile(`./public/icon-${size}.png`);
    
    console.log(`Generated icon-${size}.png`);
  }
  
  // Generate OG Image
  await sharp(inputImage)
    .resize(1200, 630, { fit: 'contain', background: '#0a0a0a' })
    .toFile('./public/og-image.png');
  
  console.log('All icons generated!');
}

generateIcons();
```

---

### **Part 9: Testing Tools**

---

#### **Step 22: Create SEO Testing Utilities**

Create `src/lib/testing/seo-validator.ts`:

```typescript
export interface SEOCheck {
  name: string;
  passed: boolean;
  message: string;
}

export function validatePageSEO(
  title?: string,
  description?: string,
  heading?: string
): SEOCheck[] {
  const checks: SEOCheck[] = [];

  // Title check
  checks.push({
    name: "Title Length",
    passed: title ? title.length >= 30 && title.length <= 60 : false,
    message: title
      ? `Title is ${title.length} characters (recommended: 30-60)`
      : "No title found",
  });

  // Description check
  checks.push({
    name: "Meta Description Length",
    passed: description
      ? description.length >= 120 && description.length <= 160
      : false,
    message: description
      ? `Description is ${description.length} characters (recommended: 120-160)`
      : "No description found",
  });

  // H1 check
  checks.push({
    name: "H1 Heading",
    passed: !!heading,
    message: heading ? "H1 heading present" : "No H1 heading found",
  });

  return checks;
}

export function logSEOChecks(checks: SEOCheck[]) {
  if (process.env.NODE_ENV === "development") {
    console.group("🔍 SEO Validation");
    checks.forEach((check) => {
      const icon = check.passed ? "✅" : "❌";
      console.log(`${icon} ${check.name}: ${check.message}`);
    });
    console.groupEnd();
  }
}
```

---

#### **Step 23: Create Performance Testing Component**

Create `src/components/dev/performance-monitor.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Observe performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metric = entry as any;
        
        setMetrics((prev) => ({
          ...prev,
          [metric.name]: metric.value,
        }));
      }
    });

    observer.observe({ entryTypes: ["measure", "navigation", "paint"] });

    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 bg-background/95 backdrop-blur">
        <h3 className="font-semibold mb-2 text-xs">Performance Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.fcp && (
            <div>FCP: {Math.round(metrics.fcp)}ms</div>
          )}
          {metrics.lcp && (
            <div>LCP: {Math.round(metrics.lcp)}ms</div>
          )}
          {metrics.ttfb && (
            <div>TTFB: {Math.round(metrics.ttfb)}ms</div>
          )}
        </div>
      </Card>
    </div>
  );
}
```

---

### **Part 10: Environment Variables**

---

#### **Step 24: Update Environment Variables**

Update `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_key

# Optional: Error Tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Optional: Rate Limiting (Vercel KV)
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

Create `.env.example`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=

# Contact Form
NEXT_PUBLIC_WEB3FORMS_KEY=

# Error Tracking (Optional)
NEXT_PUBLIC_SENTRY_DSN=

# Rate Limiting (Optional)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

---

## ✅ Testing SEO & Performance

### **SEO Testing Checklist**

#### **1. Metadata Validation**

```bash
# Check all pages have proper metadata
# Visit each page and inspect:
```

- [ ] Title is 30-60 characters
- [ ] Description is 120-160 characters
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Canonical URLs set correctly
- [ ] Language attribute present (`lang="en"`)
- [ ] Viewport meta tag configured

#### **2. Structured Data Validation**

Visit: https://search.google.com/test/rich-results

- [ ] Homepage has Person/Website schema
- [ ] Projects have CreativeWork schema
- [ ] Blog posts have BlogPosting schema
- [ ] Breadcrumbs present on detail pages
- [ ] No structured data errors

#### **3. Sitemap Validation**

Visit: `https://yoursite.com/sitemap.xml`

- [ ] Sitemap is accessible
- [ ] All important pages included
- [ ] No 404 pages in sitemap
- [ ] Priority values set correctly
- [ ] Change frequency appropriate

#### **4. Robots.txt Validation**

Visit: `https://yoursite.com/robots.txt`

- [ ] Robots.txt is accessible
- [ ] Sitemap URL is correct
- [ ] No important pages blocked
- [ ] API routes blocked correctly

#### **5. Social Media Preview**

Test with:
- **Facebook**: https://developers.facebook.com/tools/debug/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/

- [ ] Images display correctly (1200x630)
- [ ] Title and description show properly
- [ ] No broken images
- [ ] Card type is correct

---

### **Performance Testing Checklist**

#### **1. Lighthouse Audit**

Run Lighthouse in Chrome DevTools:

```bash
# Target Scores:
Performance: 95+
Accessibility: 95+
Best Practices: 95+
SEO: 100
```

- [ ] Performance score 95+
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Speed Index < 3.4s

#### **2. Core Web Vitals**

Test with: https://pagespeed.web.dev/

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTFB (Time to First Byte) < 800ms

#### **3. Image Optimization**

- [ ] All images use next/image
- [ ] AVIF format enabled
- [ ] Proper sizes attribute set
- [ ] Lazy loading enabled
- [ ] No layout shifts from images

#### **4. Code Splitting**

Check in Network tab:

- [ ] JavaScript bundles < 200KB
- [ ] CSS files optimized
- [ ] No unused code
- [ ] Dynamic imports used
- [ ] Route-based code splitting working

#### **5. Caching**

Check in Network tab:

- [ ] Static assets cached (fonts, images)
- [ ] Cache-Control headers set
- [ ] Service worker (if PWA)
- [ ] API responses cached appropriately

---

### **Accessibility Testing Checklist**

#### **1. Keyboard Navigation**

- [ ] Tab through all interactive elements
- [ ] Skip to content link works
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Modal dialogs trap focus
- [ ] Escape key closes overlays

#### **2. Screen Reader Testing**

Test with:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (Mac)

- [ ] All images have alt text
- [ ] Links are descriptive
- [ ] Headings are hierarchical
- [ ] Forms have labels
- [ ] ARIA labels present where needed
- [ ] Live regions announce updates

#### **3. Color Contrast**

Test with: https://webaim.org/resources/contrastchecker/

- [ ] Text contrast ratio ≥ 4.5:1
- [ ] Large text ≥ 3:1
- [ ] UI components ≥ 3:1
- [ ] Works in high contrast mode

#### **4. Responsive Testing**

- [ ] Mobile (375px) - All content accessible
- [ ] Tablet (768px) - Layout adjusts
- [ ] Desktop (1280px+) - Optimal layout
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scrolling

#### **5. Forms Accessibility**

- [ ] All inputs have labels
- [ ] Error messages are clear
- [ ] Required fields indicated
- [ ] Success messages announced
- [ ] Form validation accessible

---

### **Automated Testing Tools**

#### **1. Install Testing Dependencies**

```bash
npm install -D @axe-core/react lighthouse ci
```

#### **2. Create Lighthouse CI Config**

Create `lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/projects',
        'http://localhost:3000/blog',
        'http://localhost:3000/contact',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

#### **3. Add Test Scripts**

Update `package.json`:

```json
{
  "scripts": {
    "lighthouse": "lhci autorun",
    "test:seo": "npm run build && npm run lighthouse",
    "analyze": "ANALYZE=true npm run build"
  }
}
```

---

## 🐛 Troubleshooting

### **Issue: Sitemap not generating**

**Solution:**
```typescript
// Make sure you export default function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ...
}

// Check that projects/blog data is accessible
console.log('Projects:', getAllProjects().length);
```

### **Issue: Metadata not showing in social previews**

**Solution:**
```typescript
// Ensure metadataBase is set in root layout
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'),
  // ...
};

// Use absolute URLs for images
openGraph: {
  images: [`${siteConfig.url}/og-image.png`],
}
```

### **Issue: Low performance score**

**Solution:**
```typescript
// 1. Enable PPR in next.config.ts
experimental: {
  ppr: true,
}

// 2. Use Suspense for dynamic content
<Suspense fallback={<Skeleton />}>
  <DynamicComponent />
</Suspense>

// 3. Optimize images
<Image
  src={image}
  alt={alt}
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={90}
/>

// 4. Use dynamic imports
const Component = dynamic(() => import('./Component'));
```

### **Issue: Structured data errors**

**Solution:**
```typescript
// Validate JSON-LD schema
const schema = generateBlogPostSchema({ ... });
console.log('Schema:', JSON.stringify(schema, null, 2));

// Check for required fields
// Use Google's Rich Results Test
// Fix any validation errors
```

### **Issue: Accessibility violations**

**Solution:**
```typescript
// Add missing ARIA labels
<button aria-label="Close menu">
  <X />
</button>

// Fix heading hierarchy
// h1 → h2 → h3 (no skipping)

// Add alt text to images
<Image src={img} alt="Descriptive text" />

// Ensure sufficient color contrast
// Use contrast checker tools
```

### **Issue: Slow Time to First Byte (TTFB)**

**Solution:**
```typescript
// Use static generation where possible
export const dynamic = 'force-static';

// Use unstable_cache for data fetching
const getData = unstable_cache(
  async () => await fetchData(),
  ['data-key'],
  { revalidate: 3600 }
);

// Enable edge runtime for API routes
export const runtime = 'edge';
```

---

## 🎯 Phase 9 Deliverables

### **Files Created:** ~20 files

**SEO Files (6):**
- ✅ lib/seo/constants.ts
- ✅ lib/seo/metadata.ts
- ✅ lib/seo/structured-data.ts
- ✅ app/sitemap.ts
- ✅ app/robots.ts
- ✅ app/manifest.ts

**Analytics (2):**
- ✅ lib/analytics/google-analytics.tsx
- ✅ lib/analytics/vercel-analytics.tsx

**Performance (3):**
- ✅ components/ui/optimized-image.tsx
- ✅ components/performance/web-vitals.tsx
- ✅ components/performance/resource-hints.tsx

**Accessibility (2):**
- ✅ components/accessibility/skip-to-content.tsx
- ✅ components/error/error-boundary.tsx

**Testing (2):**
- ✅ lib/testing/seo-validator.ts
- ✅ components/dev/performance-monitor.tsx

**Configuration (2):**
- ✅ next.config.ts (updated)
- ✅ lighthouserc.js

**Assets (8+):**
- ✅ public/favicon.ico
- ✅ public/icon.png
- ✅ public/apple-icon.png
- ✅ public/icon-192.png
- ✅ public/icon-512.png
- ✅ public/og-image.png
- ✅ public/twitter-image.png
- ✅ public/manifest.json

**Updates:**
- ✅ app/layout.tsx (metadata + analytics)
- ✅ app/page.tsx (metadata + schema)
- ✅ app/projects/page.tsx (metadata)
- ✅ app/projects/[slug]/page.tsx (metadata + schema)
- ✅ app/blog/[slug]/page.tsx (metadata + schema)
- ✅ app/globals.css (accessibility styles)

### **Features Implemented:**
✅ Enhanced Metadata API  
✅ Open Graph & Twitter Cards  
✅ JSON-LD Structured Data  
✅ Dynamic Sitemap Generation  
✅ Robots.txt Configuration  
✅ Image Optimization (AVIF)  
✅ Performance Monitoring  
✅ Core Web Vitals Tracking  
✅ Google Analytics Integration  
✅ Vercel Analytics Integration  
✅ Accessibility Improvements  
✅ Skip to Content Link  
✅ Focus Indicators  
✅ ARIA Labels  
✅ Error Boundary  
✅ PWA Manifest  
✅ Resource Hints  
✅ SEO Testing Utilities  
✅ Performance Testing Tools  

---

## 📊 Code Statistics

- **Total Lines:** ~2,500+
- **Components:** 8
- **Utilities:** 6
- **Configuration Files:** 4
- **Test Tools:** 2
- **Time Estimate:** 10-16 hours

---

## 🚀