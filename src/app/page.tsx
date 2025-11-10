import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from 'react';
import { generatePageMetadata } from "@/lib/seo/metadata";
import { generatePersonSchema } from "@/lib/seo/structured-data";

// Lazy load all components for better code splitting
const Hero = dynamic(
  () => import("@/components/sections/hero").then(mod => mod.Hero),
  {
    ssr: true,
    loading: () => (
      <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-pulse" />
    ),
  }
);

const About = dynamic(
  () => import("@/components/sections").then(mod => mod.About),
  {
    ssr: true,
    loading: () => <SectionSkeleton />,
  }
);

const Skills = dynamic(
  () => import("@/components/sections/skills").then(mod => mod.Skills),
  {
    ssr: true,
    loading: () => <SectionSkeleton />,
  }
);

const FeaturedProjects = dynamic(
  () => import("@/components/sections/featured-projects").then(mod => mod.FeaturedProjects),
  { 
    ssr: true,
    loading: () => <ProjectsSkeleton />,
  }
);

const Certifications = dynamic(
  () => import("@/components/sections/certifications").then(mod => mod.Certifications),
  {
    ssr: true,
    loading: () => <SectionSkeleton />,
  }
);

const CTA = dynamic(
  () => import("@/components/sections/cta").then(mod => mod.CTA),
  {
    ssr: true,
    loading: () => <SectionSkeleton />,
  }
);

// Skeleton loaders
function SectionSkeleton() {
  return (
    <div className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8 mx-auto"></div>
        <div className="h-96 bg-gray-100 dark:bg-gray-900 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-12 w-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 h-80 animate-pulse">
              <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2"></div>
              <div className="space-y-2 mt-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ✅ SEO Metadata
export const metadata: Metadata = generatePageMetadata({
  title: "Home - Frontend Developer Portfolio",
  description: "Frontend Developer specializing in React, Next.js, and TypeScript. Building modern, performant web applications with exceptional user experiences.",
  path: "/",
  keywords: ["portfolio", "frontend developer", "web developer", "React", "Next.js", "TypeScript"],
});

export default function Home() {
  // Generate SEO structured data
  const personSchema = generatePersonSchema();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
        suppressHydrationWarning
      />

      {/* Main Content with PPR */}
      <main>
        {/* Hero Section - Critical content, loads first */}
        <Suspense fallback={
          <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" />
        }>
          <Hero />
        </Suspense>

        {/* Skills Section - Static content with Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>

        {/* About Section - Static content with Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>

        {/* Featured Projects - Dynamic content with Suspense boundary */}
        <Suspense fallback={<ProjectsSkeleton />}>
          <FeaturedProjects />
        </Suspense>

        {/* Certifications Section - Static content with Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <Certifications />
        </Suspense>

        {/* CTA Section - Static content with Suspense */}
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </main>
    </>
  );
}