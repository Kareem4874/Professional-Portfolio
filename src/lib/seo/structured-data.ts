// src/lib/seo/structured-data.ts

export function generatePersonSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kareem AbdulBaset", // ✅ استبدل باسمك
    jobTitle: "Frontend Developer",
    url: baseUrl,
    sameAs: [
      "https://www.linkedin.com/in/kareem-abdulbaset-763294352/", // ✅ استبدل برابطك
      "https://github.com/Kareem4874", // ✅ استبدل برابطك
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Frontend Development",
      "Web Development",
    ],
    description: "Frontend Developer specializing in building modern web applications",
  };
}

// ✅ دالة جديدة للـ Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

// ✅ دالة للـ Blog Post Schema
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  keywords?: string[];
  image?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${baseUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    keywords: post.keywords?.join(", ") || "",
    image: post.image,
    author: {
      "@type": "Person",
      name: "Kareem AbdulBaset",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Kareem AbdulBaset",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };
}

// ✅ دالة للـ Project Schema (اختيارية)
export function generateProjectSchema(project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  technologies: string[];
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url || baseUrl,
    image: project.image,
    keywords: project.technologies.join(", "),
    creator: {
      "@type": "Person",
      name: "Kareem AbdulBaset", // ✅ استبدل باسمك
    },
  };
}