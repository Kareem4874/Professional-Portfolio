import { Metadata } from 'next';

// Site configuration
export const siteConfig = {
  name: "Kareem AbdulBaset",
  title: "Kareem AbdulBaset - Frontend Developer",
  description: "Frontend Developer specializing in Next.js, React, and TypeScript. Building modern, performant web applications.",
  url: "https://yourportfolio.com",
  ogImage: "https://yourportfolio.com/og-image.jpg",
  links: {
    github: "https://github.com/Kareem4874",
    linkedin: "https://linkedin.com/in/kareem-abdulbaset-763294352"
  },
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "UI/UX Developer",
    "JavaScript Developer",
    "Kareem AbdulBaset",
    "Cairo Developer",
    "Egypt Developer"
  ],
};

// Default metadata for all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
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
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

// Page-specific metadata
export const pageMetadata = {
  home: {
    title: "Home",
    description: "Welcome to my portfolio. Explore my projects, skills, and blog posts about web development.",
  },
  about: {
    title: "About Me",
    description: "Learn more about my journey as a frontend developer, my skills, and what drives my passion for web development.",
  },
  projects: {
    title: "Projects",
    description: "Explore my portfolio of web development projects built with Next.js, React, TypeScript, and modern technologies.",
  },
  blog: {
    title: "Blog",
    description: "Read my thoughts on web development, React, Next.js, and the latest frontend technologies.",
  },
  contact: {
    title: "Contact",
    description: "Get in touch with me for freelance projects, collaborations, or just to say hello.",
  },
};

// JSON-LD structured data
export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    "@type": "Person",
    name: siteConfig.name,
  },
};

export const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  jobTitle: "Frontend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    ],
};