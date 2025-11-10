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