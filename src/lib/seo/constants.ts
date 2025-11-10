import type { Metadata } from "next";

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

const normalizedSiteUrl = (() => {
  const candidate = siteConfig.url;
  try {
    if (!candidate) {
      return new URL("https://yourportfolio.com");
    }

    if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
      return new URL(candidate);
    }

    return new URL(`https://${candidate}`);
  } catch {
    return new URL("https://yourportfolio.com");
  }
})();

export const defaultMetadata: Metadata = {
  metadataBase: normalizedSiteUrl,
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