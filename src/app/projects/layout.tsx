// src/app/projects/layout.tsx

import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbSchema } from "@/lib/seo/structured-data";

// ✅ Metadata للـ Projects Page
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
    "TypeScript projects",
    "frontend projects",
    "full-stack projects",
  ],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Breadcrumb Schema للـ SEO
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);

  return (
    <>
      {/* ✅ Structured Data للـ Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {children}
    </>
  );
}