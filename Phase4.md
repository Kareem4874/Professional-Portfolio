# Phase 4: Projects Page 🎨

**Duration:** 2-3 days  
**Goal:** Create comprehensive projects showcase with filtering, search, and detailed project views

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Architecture](#project-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Testing Projects Page](#testing-projects-page)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 4, we'll build:
- ✅ Complete Projects listing page
- ✅ Advanced filtering system (by technology, category)
- ✅ Search functionality
- ✅ Enhanced Project Cards with hover effects
- ✅ Single Project Detail Page (optional but recommended)
- ✅ Image Gallery component
- ✅ Related Projects section

**Result:** A professional, filterable projects showcase with detailed project views.

---

## 🔧 Prerequisites

Before starting Phase 4:
- ✅ Phase 3 completed successfully
- ✅ All homepage sections working
- ✅ Featured projects displaying correctly
- ✅ Project data structure in place

---

## 🏗️ Project Architecture

```
app/
├── projects/
│   ├── page.tsx                  # Projects listing
│   ├── [slug]/
│   │   └── page.tsx              # Single project page
│   └── loading.tsx               # Loading state
components/
├── projects/
│   ├── project-card.tsx          # Enhanced project card
│   ├── project-filters.tsx       # Filter controls
│   ├── project-search.tsx        # Search bar
│   ├── project-gallery.tsx       # Image gallery
│   ├── related-projects.tsx      # Related projects
│   └── project-details.tsx       # Project info layout
lib/
├── data/
│   └── projects.ts               # Extended projects data
└── utils/
    └── project-utils.ts          # Helper functions
```

---

## 🚀 Step-by-Step Implementation

### **Part 1: Enhanced Projects Data**

---

#### **Step 1: Extend Projects Data Structure**

Update `src/lib/data/projects.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  slug: string; // URL-friendly slug
  description: string;
  longDescription: string;
  
  // Images
  image: string; // Main thumbnail
  images: string[]; // Gallery images
  
  // Technical Details
  technologies: string[];
  category: "Frontend" | "Full Stack" | "UI/UX" | "Mobile" | "Other";
  tags: string[]; // Additional tags for filtering
  
  // Links
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  // Metadata
  featured: boolean;
  status: "Completed" | "In Progress" | "Archived";
  date: string; // YYYY-MM format
  duration?: string; // "2 months"
  
  // Additional Info
  role?: string; // "Lead Developer", "Solo Project"
  team?: string[]; // Team members
  challenges?: string[]; // Technical challenges solved
  features?: string[]; // Key features
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
    longDescription: `
      Built a complete e-commerce solution using Next.js 14, featuring server-side rendering, 
      optimistic UI updates, and a seamless checkout experience. The platform includes a 
      comprehensive admin dashboard for inventory management, order tracking, and analytics.
      
      Integrated Stripe for secure payment processing and implemented real-time inventory 
      management with automatic stock updates. The application features advanced search 
      functionality, product recommendations, and a responsive design that works flawlessly 
      across all devices.
    `,
    image: "/projects/ecommerce/thumbnail.jpg",
    images: [
      "/projects/ecommerce/home.jpg",
      "/projects/ecommerce/products.jpg",
      "/projects/ecommerce/cart.jpg",
      "/projects/ecommerce/checkout.jpg",
      "/projects/ecommerce/admin.jpg"
    ],
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma", "NextAuth"],
    category: "Full Stack",
    tags: ["E-commerce", "Payment", "Admin Panel", "SEO"],
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true,
    status: "Completed",
    date: "2024-02",
    duration: "3 months",
    role: "Full Stack Developer",
    challenges: [
      "Implementing real-time inventory updates across multiple users",
      "Optimizing database queries for fast product searches",
      "Handling payment processing edge cases and refunds",
      "Building a complex admin dashboard with analytics"
    ],
    features: [
      "User authentication and authorization",
      "Shopping cart with persistent storage",
      "Stripe payment integration",
      "Product search and filtering",
      "Order tracking and history",
      "Admin dashboard with analytics",
      "Email notifications",
      "Responsive design"
    ],
    metrics: [
      { label: "Page Load Time", value: "< 2s" },
      { label: "Lighthouse Score", value: "95+" },
      { label: "Products", value: "500+" },
      { label: "Concurrent Users", value: "1000+" }
    ]
  },
  {
    id: "2",
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Interactive dashboard with real-time data visualization, charts, and comprehensive analytics.",
    longDescription: `
      Developed a modern analytics dashboard using React and TypeScript. Features include 
      real-time data updates, interactive charts with Recharts, and customizable widgets. 
      Implemented efficient data fetching with React Query and state management with Zustand.
      
      The dashboard provides comprehensive insights with multiple chart types, filters, 
      and date range selectors. Built with performance in mind, handling large datasets 
      efficiently with virtualization and memoization techniques.
    `,
    image: "/projects/dashboard/thumbnail.jpg",
    images: [
      "/projects/dashboard/overview.jpg",
      "/projects/dashboard/charts.jpg",
      "/projects/dashboard/reports.jpg"
    ],
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS", "React Query", "Zustand"],
    category: "Frontend",
    tags: ["Dashboard", "Data Visualization", "Analytics", "Charts"],
    liveUrl: "https://dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/dashboard",
    featured: true,
    status: "Completed",
    date: "2024-01",
    duration: "2 months",
    role: "Frontend Developer",
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Customizable widgets",
      "Data export functionality",
      "Responsive design",
      "Dark/Light theme"
    ],
    metrics: [
      { label: "Data Points", value: "10K+" },
      { label: "Chart Types", value: "8" },
      { label: "Update Frequency", value: "Real-time" }
    ]
  },
  {
    id: "3",
    slug: "saas-landing-page",
    title: "SaaS Landing Page",
    description: "Modern landing page with smooth animations, responsive design, and optimized performance.",
    longDescription: `
      Created a high-converting SaaS landing page with a focus on performance and user experience. 
      Implemented smooth scroll animations with Framer Motion, achieved 98+ Lighthouse score, 
      and ensured perfect responsiveness across all devices.
      
      The landing page features modern design trends including glassmorphism, gradient backgrounds, 
      and micro-interactions. Optimized for SEO with proper meta tags and structured data.
    `,
    image: "/projects/landing/thumbnail.jpg",
    images: [
      "/projects/landing/hero.jpg",
      "/projects/landing/features.jpg",
      "/projects/landing/pricing.jpg"
    ],
    technologies: ["Next.js 14", "Framer Motion", "Tailwind CSS", "TypeScript"],
    category: "Frontend",
    tags: ["Landing Page", "Animation", "Marketing", "SEO"],
    liveUrl: "https://landing-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/landing",
    featured: true,
    status: "Completed",
    date: "2023-12",
    duration: "1 month",
    role: "Frontend Developer & Designer",
    features: [
      "Smooth scroll animations",
      "Interactive elements",
      "Contact form integration",
      "SEO optimized",
      "Mobile-first design",
      "Fast loading times"
    ],
    metrics: [
      { label: "Lighthouse Score", value: "98" },
      { label: "First Paint", value: "< 1s" },
      { label: "Time to Interactive", value: "< 2s" }
    ]
  },
  {
    id: "4",
    slug: "task-management-app",
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop, real-time updates, and team features.",
    longDescription: `
      Built a collaborative task management application inspired by Trello and Asana. 
      Features drag-and-drop functionality using DnD Kit, real-time updates with Firebase, 
      and team collaboration features.
      
      Users can create boards, lists, and cards, assign tasks to team members, set due dates, 
      and track progress. The app includes notifications, activity logs, and file attachments.
    `,
    image: "/projects/tasks/thumbnail.jpg",
    images: [
      "/projects/tasks/board.jpg",
      "/projects/tasks/cards.jpg",
      "/projects/tasks/team.jpg"
    ],
    technologies: ["React", "TypeScript", "DnD Kit", "Firebase", "Tailwind CSS", "React Query"],
    category: "Full Stack",
    tags: ["Productivity", "Collaboration", "Real-time", "Drag-and-Drop"],
    liveUrl: "https://tasks-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/tasks",
    featured: false,
    status: "Completed",
    date: "2023-11",
    duration: "2.5 months",
    features: [
      "Drag-and-drop interface",
      "Real-time collaboration",
      "Task assignments",
      "Due dates and reminders",
      "File attachments",
      "Activity tracking"
    ]
  },
  {
    id: "5",
    slug: "weather-forecast-app",
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts, interactive maps, and detailed meteorological data.",
    longDescription: `
      Developed a weather application using React that provides accurate weather forecasts 
      with beautiful visualizations. Integrated OpenWeather API for weather data and 
      Leaflet for interactive maps.
      
      The app features hourly and daily forecasts, weather alerts, air quality index, 
      and UV index. Users can save favorite locations and receive notifications for 
      severe weather conditions.
    `,
    image: "/projects/weather/thumbnail.jpg",
    images: [
      "/projects/weather/current.jpg",
      "/projects/weather/forecast.jpg",
      "/projects/weather/map.jpg"
    ],
    technologies: ["React", "JavaScript", "OpenWeather API", "Leaflet", "Chart.js", "Tailwind CSS"],
    category: "Frontend",
    tags: ["Weather", "API Integration", "Maps", "Mobile"],
    liveUrl: "https://weather-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/weather",
    featured: false,
    status: "Completed",
    date: "2023-10",
    duration: "1 month",
    features: [
      "Location-based weather",
      "7-day forecast",
      "Hourly predictions",
      "Interactive maps",
      "Weather alerts",
      "Favorite locations"
    ]
  },
  {
    id: "6",
    slug: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "Modern portfolio website showcasing projects, skills, and blog posts with stunning animations.",
    longDescription: `
      This very website! Built with Next.js 14 and modern web technologies to create 
      a professional portfolio that stands out. Features smooth animations, dark theme, 
      and optimized performance.
      
      The site includes a blog system powered by MDX, contact form integration, and 
      comprehensive SEO optimization. Deployed on Vercel with automatic deployments.
    `,
    image: "/projects/portfolio/thumbnail.jpg",
    images: [
      "/projects/portfolio/home.jpg",
      "/projects/portfolio/projects.jpg",
      "/projects/portfolio/blog.jpg"
    ],
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX"],
    category: "Frontend",
    tags: ["Portfolio", "Blog", "Personal", "Showcase"],
    liveUrl: "https://yourportfolio.vercel.app",
    githubUrl: "https://github.com/yourusername/portfolio",
    featured: false,
    status: "In Progress",
    date: "2024-03",
    duration: "Ongoing",
    features: [
      "Animated homepage",
      "Projects showcase",
      "MDX blog system",
      "Contact form",
      "Dark theme",
      "SEO optimized"
    ]
  },
  {
    id: "7",
    slug: "social-media-dashboard",
    title: "Social Media Dashboard",
    description: "Multi-platform social media management dashboard with analytics and scheduling features.",
    longDescription: `
      Created a comprehensive social media management tool that allows users to manage 
      multiple social media accounts from one dashboard. Integrated with Twitter, Facebook, 
      and Instagram APIs.
      
      Features include post scheduling, analytics tracking, engagement metrics, and 
      content calendar. Built with a focus on user experience and data visualization.
    `,
    image: "/projects/social/thumbnail.jpg",
    images: [
      "/projects/social/dashboard.jpg",
      "/projects/social/analytics.jpg",
      "/projects/social/scheduler.jpg"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Recharts", "PostgreSQL", "Prisma"],
    category: "Full Stack",
    tags: ["Social Media", "Analytics", "Scheduling", "API Integration"],
    githubUrl: "https://github.com/yourusername/social-dashboard",
    featured: false,
    status: "Completed",
    date: "2023-09",
    duration: "3 months",
    features: [
      "Multi-account management",
      "Post scheduling",
      "Analytics and insights",
      "Content calendar",
      "Engagement tracking",
      "Team collaboration"
    ]
  },
  {
    id: "8",
    slug: "recipe-finder-app",
    title: "Recipe Finder App",
    description: "Discover and save your favorite recipes with advanced search and meal planning features.",
    longDescription: `
      Built a recipe discovery application that helps users find, save, and organize recipes. 
      Integrated with Spoonacular API for extensive recipe database and nutritional information.
      
      Users can search recipes by ingredients, dietary restrictions, and cuisine type. 
      Features include meal planning, shopping list generation, and recipe collections.
    `,
    image: "/projects/recipes/thumbnail.jpg",
    images: [
      "/projects/recipes/search.jpg",
      "/projects/recipes/detail.jpg",
      "/projects/recipes/planner.jpg"
    ],
    technologies: ["React", "JavaScript", "Spoonacular API", "Redux", "Styled Components"],
    category: "Frontend",
    tags: ["Food", "API", "Search", "Mobile-Friendly"],
    liveUrl: "https://recipes-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/recipes",
    featured: false,
    status: "Completed",
    date: "2023-08",
    duration: "1.5 months",
    features: [
      "Advanced recipe search",
      "Ingredient-based filtering",
      "Nutritional information",
      "Meal planning",
      "Shopping lists",
      "Recipe collections"
    ]
  }
];

// Helper functions
export const getAllProjects = () => projectsData;

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectBySlug = (slug: string) => {
  return projectsData.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: string) => {
  if (category === "All") return projectsData;
  return projectsData.filter(project => project.category === category);
};

export const getProjectsByTechnology = (tech: string) => {
  return projectsData.filter(project => 
    project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

export const getRelatedProjects = (currentProject: Project, limit = 3) => {
  return projectsData
    .filter(project => 
      project.id !== currentProject.id &&
      (project.category === currentProject.category ||
       project.technologies.some(tech => currentProject.technologies.includes(tech)))
    )
    .slice(0, limit);
};

export const searchProjects = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return projectsData.filter(project =>
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery)) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Get all unique technologies
export const getAllTechnologies = () => {
  const techSet = new Set<string>();
  projectsData.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

// Get all unique categories
export const getAllCategories = () => {
  const categories = new Set(projectsData.map(p => p.category));
  return ["All", ...Array.from(categories)];
};

// Get all unique tags
export const getAllTags = () => {
  const tagSet = new Set<string>();
  projectsData.forEach(project => {
    project.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};
```

---

### **Part 2: Project Utilities**

---

#### **Step 2: Create Project Helper Functions**

Create `src/lib/utils/project-utils.ts`:

```typescript
import { Project } from "@/lib/data/projects";

/**
 * Format project date to readable string
 */
export function formatProjectDate(date: string): string {
  const [year, month] = date.split("-");
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

/**
 * Get status badge color
 */
export function getStatusColor(status: Project["status"]): string {
  const colors = {
    "Completed": "bg-green-500/10 text-green-500 border-green-500/20",
    "In Progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Archived": "bg-gray-500/10 text-gray-500 border-gray-500/20"
  };
  return colors[status];
}

/**
 * Get category color
 */
export function getCategoryColor(category: Project["category"]): string {
  const colors = {
    "Frontend": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Full Stack": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "UI/UX": "bg-pink-500/10 text-pink-500 border-pink-500/20",
    "Mobile": "bg-green-500/10 text-green-500 border-green-500/20",
    "Other": "bg-gray-500/10 text-gray-500 border-gray-500/20"
  };
  return colors[category];
}

/**
 * Calculate reading time for project details
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Sort projects by date (newest first)
 */
export function sortProjectsByDate(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Sort projects by featured status
 */
export function sortProjectsByFeatured(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured === b.featured) return 0;
    return a.featured ? -1 : 1;
  });
}
```

---

### **Part 3: Projects Page Components**

---

#### **Step 3: Create Search Component**

Create `src/components/projects/project-search.tsx`:

```typescript
"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProjectSearch({ 
  value, 
  onChange, 
  placeholder = "Search projects..." 
}: ProjectSearchProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
```

---

#### **Step 4: Create Filters Component**

Create `src/components/projects/project-filters.tsx`:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";

interface ProjectFiltersProps {
  categories: string[];
  technologies: string[];
  selectedCategory: string;
  selectedTechnology: string;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (tech: string) => void;
  onReset: () => void;
}

export function ProjectFilters({
  categories,
  technologies,
  selectedCategory,
  selectedTechnology,
  onCategoryChange,
  onTechnologyChange,
  onReset,
}: ProjectFiltersProps) {
  const hasFilters = selectedCategory !== "All" || selectedTechnology !== "All";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Category:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {selectedCategory}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => onCategoryChange(category)}
                className={selectedCategory === category ? "bg-accent/10" : ""}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Technology Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Tech:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {selectedTechnology === "All" ? "All" : selectedTechnology}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
            <DropdownMenuItem onClick={() => onTechnologyChange("All")}>
              All Technologies
            </DropdownMenuItem>
            {technologies.map((tech) => (
              <DropdownMenuItem
                key={tech}
                onClick={() => onTechnologyChange(tech)}
                className={selectedTechnology === tech ? "bg-accent/10" : ""}
              >
                {tech}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Reset Button */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Reset
        </Button>
      )}

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 ml-auto">
          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <button
                onClick={() => onCategoryChange("All")}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTechnology !== "All" && (
            <Badge variant="secondary" className="gap-1">
              {selectedTechnology}
              <button
                onClick={() => onTechnologyChange("All")}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
```

---

#### **Step 5: Create Enhanced Project Card**

Create `src/components/projects/project-card.tsx`:

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/data/projects";
import { ExternalLink, Github, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getStatusColor, getCategoryColor, formatProjectDate } from "@/lib/utils/project-utils";

interface ProjectCardProps {
  project: Project;
  showDetails?: boolean;
}

export function ProjectCard({ project, showDetails = true }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
          <span className="text-6xl">🚀</span>
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
          {project.featured && (
            <Badge variant="accent" className="shadow-lg">
              Featured
            </Badge>
          )}
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge className={getCategoryColor(project.category)}>
            {project.category}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl group-hover:text-accent transition-colors">
            {project.title}
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <Calendar className="h-3 w-3" />
          <span>{formatProjectDate(project.date)}</span>
          {project.duration && (
            <>
              <span>•</span>
              <span>{project.duration}</span>
            </>
          )}
        </div>

        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showDetails && (
            <Button variant="accent" size="sm" asChild className="flex-1 group">
              <Link href={`/projects/${project.slug}`}>
                View Details
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
          
          <div className="flex gap-2">
            {project.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

#### **Step 6: Create Projects Listing Page**

Create `src/app/projects/page.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectSearch } from "@/components/projects/project-search";
import { ProjectFilters } from "@/components/projects/project-filters";
import { 
  getAllProjects, 
  getAllCategories, 
  getAllTechnologies,
  getProjectsByCategory,
  getProjectsByTechnology,
  searchProjects
} from "@/lib/data/projects";
import { sortProjectsByDate, sortProjectsByFeatured } from "@/lib/utils/project-utils";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

type SortOption = "date" | "featured";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [showFilters, setShowFilters] = useState(true);

  const categories = getAllCategories();
  const technologies = getAllTechnologies();

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let projects = getAllProjects();

    // Apply category filter
    if (selectedCategory !== "All") {
      projects = getProjectsByCategory(selectedCategory);
    }

    // Apply technology filter
    if (selectedTechnology !== "All") {
      projects = getProjectsByTechnology(selectedTechnology);
    }

    // Apply search
    if (searchQuery.trim()) {
      projects = searchProjects(searchQuery);
    }

    // Apply sorting
    if (sortBy === "date") {
      projects = sortProjectsByDate(projects);
    } else {
      projects = sortProjectsByFeatured(projects);
    }

    return projects;
  }, [searchQuery, selectedCategory, selectedTechnology, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTechnology("All");
  };

  return (
    <main className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
              My Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my work, showcasing various technologies and problem-solving approaches
            </p>
          </div>
        </FadeIn>

        {/* Search and Filters */}
        <FadeIn delay={0.2}>
          <div className="space-y-6 mb-12">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <ProjectSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by name, technology, or tag..."
              />
              
              <div className="flex gap-2 items-center">
                {/* Sort Options */}
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === "date" ? "accent" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("date")}
                  >
                    Latest
                  </Button>
                  <Button
                    variant={sortBy === "featured" ? "accent" : "outline"}
                    size="sm"
                    onClick={() => setSortBy("featured")}
                  >
                    Featured
                  </Button>
                </div>

                {/* Toggle Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Filter Controls */}
            {showFilters && (
              <div className="glass p-4 rounded-lg">
                <ProjectFilters
                  categories={categories}
                  technologies={technologies}
                  selectedCategory={selectedCategory}
                  selectedTechnology={selectedTechnology}
                  onCategoryChange={setSelectedCategory}
                  onTechnologyChange={setSelectedTechnology}
                  onReset={resetFilters}
                />
              </div>
            )}
          </div>
        </FadeIn>

        {/* Results Count */}
        <FadeIn delay={0.3}>
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{filteredProjects.length}</span> project
              {filteredProjects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </FadeIn>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        ) : (
          <FadeIn delay={0.4}>
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-heading font-semibold mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}
```

---

### **Part 4: Single Project Page**

---

#### **Step 7: Create Image Gallery Component**

Create `src/components/projects/project-gallery.tsx`:

```typescript
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg overflow-hidden hover:scale-105 transition-transform group"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">📸</span>
            </div>
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors flex items-center justify-center">
              <span className="text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/10 transition-colors z-10"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-4 p-2 rounded-full hover:bg-accent/10 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-2 rounded-full hover:bg-accent/10 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full aspect-video bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">📸</span>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

#### **Step 8: Create Related Projects Component**

Create `src/components/projects/related-projects.tsx`:

```typescript
"use client";

import { Project } from "@/lib/data/projects";
import { ProjectCard } from "./project-card";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16 border-t">
      <h2 className="text-3xl font-heading font-bold mb-8">
        Related Projects
      </h2>
      
      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} showDetails={true} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
```

---

#### **Step 9: Create Single Project Page**

Create `src/app/projects/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data/projects";
import { FadeIn } from "@/components/animations/fade-in";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { RelatedProjects } from "@/components/projects/related-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock, 
  Users, 
  Zap,
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";
import { formatProjectDate, getStatusColor, getCategoryColor } from "@/lib/utils/project-utils";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return (
    <main className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <FadeIn>
          <Button variant="ghost" asChild className="mb-8 group">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </Button>
        </FadeIn>

        {/* Project Header */}
        <FadeIn delay={0.1}>
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className={getCategoryColor(project.category)}>
                {project.category}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              {project.featured && (
                <Badge variant="accent">Featured</Badge>
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatProjectDate(project.date)}</span>
              </div>
              {project.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.role && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{project.role}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button variant="accent" size="lg" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="lg" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    View Source Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Gallery */}
            <FadeIn delay={0.2}>
              <section>
                <h2 className="text-2xl font-heading font-bold mb-6">
                  Project Gallery
                </h2>
                <ProjectGallery images={project.images} title={project.title} />
              </section>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.3}>
              <section>
                <h2 className="text-2xl font-heading font-bold mb-4">
                  About This Project
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {project.longDescription}
                  </p>
                </div>
              </section>
            </FadeIn>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <FadeIn delay={0.4}>
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    Key Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex items-start gap-3">
                          <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <FadeIn delay={0.5}>
                <section>
                  <h2 className="text-2xl font-heading font-bold mb-4">
                    Technical Challenges
                  </h2>
                  <div className="space-y-3">
                    {project.challenges.map((challenge, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex items-start gap-3">
                          <span className="text-accent font-bold flex-shrink-0">
                            {index + 1}.
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {challenge}
                          </span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <FadeIn delay={0.3}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <FadeIn delay={0.4}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <FadeIn delay={0.5}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">
                      Project Metrics
                    </h3>
                    <div className="space-y-4">
                      {project.metrics.map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-muted-foreground">
                              {metric.label}
                            </span>
                            <span className="font-semibold text-accent">
                              {metric.value}
                            </span>
                          </div>
                          {index !== project.metrics!.length - 1 && (
                            <div className="border-b border-border mt-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            )}

            {/* Team */}
            {project.team && project.team.length > 0 && (
              <FadeIn delay={0.6}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg mb-4">
                      Team Members
                    </h3>
                    <ul className="space-y-2">
                      {project.team.map((member, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Users className="h-4 w-4 text-accent" />
                          {member}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeIn>
            )}

            {/* CTA */}
            <FadeIn delay={0.7}>
              <Card className="bg-gradient-to-br from-accent/10 to-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Like this project?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's work together on your next idea
                  </p>
                  <Button variant="accent" asChild className="w-full">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <FadeIn delay={0.6}>
            <RelatedProjects projects={relatedProjects} />
          </FadeIn>
        )}
      </div>
    </main>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  const { getAllProjects } = await import("@/lib/data/projects");
  const projects = getAllProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { getProjectBySlug } = await import("@/lib/data/projects");
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - My Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [project.image],
    },
  };
}
```

---

#### **Step 10: Create Loading State**

Create `src/app/projects/loading.tsx`:

```typescript
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <main className="min-h-screen py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="space-y-6 mb-12">
          <div className="flex gap-4">
            <Skeleton className="h-10 flex-1 max-w-md" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-20 w-full" />
        </div>

        {/* Projects Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
```

---

#### **Step 11: Create 404 Page for Projects**

Create `src/app/projects/[slug]/not-found.tsx`:

```typescript
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <div className="text-8xl mb-4">🔍</div>
          
          <h1 className="text-4xl lg:text-5xl font-heading font-bold gradient-text">
            Project Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Sorry, the project you're looking for doesn't exist or has been removed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button variant="accent" size="lg" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Projects
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/">
                Go to Homepage
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

### **Part 5: Additional Components**

---

#### **Step 12: Add Dropdown Menu Component (if not exists)**

Create `src/components/ui/dropdown-menu.tsx`:

```typescript
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};
```

---

#### **Step 13: Update Navigation Links**

Update `src/components/layout/navbar.tsx` to include Projects link:

```typescript
// Add to your navigation items
const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/projects" }, // Add this
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
```

---

### **Part 6: Enhanced Features (Optional)**

---

#### **Step 14: Add Project Stats Component**

Create `src/components/projects/project-stats.tsx`:

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAllProjects } from "@/lib/data/projects";
import { FadeIn } from "@/components/animations/fade-in";
import { Code, Layers, Award, Calendar } from "lucide-react";

export function ProjectStats() {
  const projects = getAllProjects();
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const totalTechnologies = new Set(
    projects.flatMap(p => p.technologies)
  ).size;
  const featuredProjects = projects.filter(p => p.featured).length;

  const stats = [
    {
      icon: Code,
      label: "Total Projects",
      value: projects.length,
      color: "text-blue-500"
    },
    {
      icon: Layers,
      label: "Technologies",
      value: totalTechnologies,
      color: "text-green-500"
    },
    {
      icon: Award,
      label: "Featured",
      value: featuredProjects,
      color: "text-purple-500"
    },
    {
      icon: Calendar,
      label: "Completed",
      value: completedProjects,
      color: "text-accent"
    }
  ];

  return (
    <FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}
```

Add to projects page:

```typescript
// In src/app/projects/page.tsx, add after header:
<ProjectStats />
```

---

## ✅ Testing Projects Page

### **Test Checklist**

Run your development server:

```bash
npm run dev
```

**Visual Tests:**
- [ ] Projects listing page displays all projects
- [ ] Project cards show correct information
- [ ] Search bar is visible and styled correctly
- [ ] Filter dropdowns work smoothly
- [ ] Category and technology filters display
- [ ] Sort buttons (Latest/Featured) toggle correctly
- [ ] Project detail page loads properly
- [ ] Image gallery displays thumbnails
- [ ] Related projects section appears
- [ ] Loading states show skeletons
- [ ] 404 page displays for invalid slugs

**Interaction Tests:**
- [ ] Search filters projects in real-time
- [ ] Category filter updates results
- [ ] Technology filter updates results
- [ ] Multiple filters work together
- [ ] Reset button clears all filters
- [ ] Sort by Latest/Featured changes order
- [ ] Project cards link to detail pages
- [ ] Live demo buttons open in new tab
- [ ] GitHub buttons open in new tab
- [ ] Gallery images open lightbox
- [ ] Lightbox navigation (arrows/keys) works
- [ ] Lightbox closes on backdrop/ESC
- [ ] Related projects are clickable
- [ ] Back button returns to listing

**Functionality Tests:**
- [ ] Search works with partial matches
- [ ] Filters combine correctly (AND logic)
- [ ] "No results" message shows when needed
- [ ] Results count updates accurately
- [ ] Featured projects sort correctly
- [ ] Date sorting is newest first
- [ ] Slugs generate correct URLs
- [ ] Static generation works
- [ ] Metadata generates for SEO

**Responsive Tests:**
- [ ] Mobile (375px) - Cards stack properly
- [ ] Mobile - Search bar full width
- [ ] Mobile - Filters stack vertically
- [ ] Tablet (768px) - 2 column grid
- [ ] Desktop (1280px+) - 3 column grid
- [ ] Gallery grid adjusts on mobile
- [ ] Lightbox works on touch devices
- [ ] Detail page sidebar stacks on mobile
- [ ] All buttons are touch-friendly

---

## 🐛 Troubleshooting

### **Issue: Dropdown menus not working**

**Solution:**
```bash
# Install Radix UI primitives
npm install @radix-ui/react-dropdown-menu
```

### **Issue: Filters not updating**

**Solution:**
```typescript
// Make sure useMemo dependencies are correct
const filteredProjects = useMemo(() => {
  // filter logic
}, [searchQuery, selectedCategory, selectedTechnology, sortBy]);
```

### **Issue: Gallery lightbox not closing**

**Solution:**
```typescript
// Verify body overflow is being reset
const closeLightbox = () => {
  setSelectedImage(null);
  document.body.style.overflow = "unset"; // Important!
};
```

### **Issue: Project detail page 404**

**Solution:**
```typescript
// Check slug matches exactly
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug, // Must match [slug] folder name
  }));
}
```

### **Issue: Search not finding results**

**Solution:**
```typescript
// Check toLowerCase() is applied to both query and data
const lowerQuery = query.toLowerCase();
project.title.toLowerCase().includes(lowerQuery)
```

### **Issue: Related projects not showing**

**Solution:**
```typescript
// Verify project has category or shared technologies
const relatedProjects = getRelatedProjects(project, 3);
console.log('Related:', relatedProjects); // Debug
```

---

## 🎯 Phase 4 Deliverables

### **Files Created:** ~15 files

**Data & Utils (2):**
- ✅ lib/data/projects.ts (extended)
- ✅ lib/utils/project-utils.ts

**Project Components (5):**
- ✅ components/projects/project-card.tsx
- ✅ components/projects/project-search.tsx
- ✅ components/projects/project-filters.tsx
- ✅ components/projects/project-gallery.tsx
- ✅ components/projects/related-projects.tsx
- ✅ components/projects/project-stats.tsx (optional)

**Pages (4):**
- ✅ app/projects/page.tsx
- ✅ app/projects/loading.tsx
- ✅ app/projects/[slug]/page.tsx
- ✅ app/projects/[slug]/not-found.tsx

**UI Components (1):**
- ✅ components/ui/dropdown-menu.tsx

**Updates:**
- ✅ components/layout/navbar.tsx (added Projects link)

### **Features Implemented:**
✅ Full projects listing page  
✅ Advanced search functionality  
✅ Category filtering  
✅ Technology filtering  
✅ Sort by date/featured  
✅ Enhanced project cards  
✅ Single project detail pages  
✅ Image gallery with lightbox  
✅ Related projects section  
✅ Loading states  
✅ 404 handling  
✅ SEO optimization  
✅ Static generation  
✅ Responsive design  
✅ Accessible components  

---

## 📊 Code Statistics

- **Total Lines:** ~1,800+
- **Components:** 11
- **Pages:** 4
- **Helper Functions:** 12+
- **Time Estimate:** 8-12 hours

---

## 🚀 Performance Tips

### **1. Image Optimization**

When adding real images:

```typescript
import Image from "next/image";

<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### **2. Lazy Load Gallery**

```typescript
import dynamic from 'next/dynamic';

const ProjectGallery = dynamic(
  () => import('@/components/projects/project-gallery').then(mod => mod.ProjectGallery),
  { loading: () => <div>Loading gallery...</div> }
);
```

### **3. Optimize Search**

```typescript
// Debounce search for better performance
import { useMemo } from 'react';
import { debounce } from 'lodash'; // or create own

const debouncedSearch = useMemo(
  () => debounce((query: string) => setSearchQuery(query), 300),
  []
);
```

---

## 🎨 Customization Guide

### **Adding More Projects**

1. Add project to `projects.ts`:
```typescript
{
  id: "9",
  slug: "my-new-project",
  title: "My New Project",
  // ... rest of fields
}
```

2. Add images to `/public/projects/my-new-project/`

3. Project automatically appears on listing!

### **Custom Filter Options**

Add custom filter:

```typescript
// In project-filters.tsx
<div className="flex items-center gap-2">
  <span className="text-sm text-muted-foreground">Status:</span>
  <DropdownMenu>
    {/* Add status filter */}
  </DropdownMenu>
</div>
```

### **Styling Project Cards**

Modify card appearance:

```typescript
// In project-card.tsx
<Card className="your-custom-classes">
  {/* Customize layout */}
</Card>
```

---

## 🔍 SEO Best Practices

### **Project Metadata**

Already implemented:

```typescript
export async function generateMetadata({ params }) {
  return {
    title: `${project.title} - Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}
```

### **Structured Data**

Add to project detail page:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "author": {
        "@type": "Person",
        "name": "Your Name"
      },
      "datePublished": project.date,
      "url": `https://yoursite.com/projects/${project.slug}`
    })
  }}
/>
```

---

## ✅ Final Checklist

Before moving to Phase 5:

**Content:**
- [ ] All 8+ projects added with data
- [ ] Project images prepared (or placeholders)
- [ ] Descriptions written
- [ ] Technologies listed accurately
- [ ] Links verified (live demos, GitHub)
- [ ] Slugs are URL-friendly

**Functionality:**
- [ ] Search works across all fields
- [ ] All filters function correctly
- [ ] Sorting works (date & featured)
- [ ] Gallery lightbox functional
- [ ] Related projects display
- [ ] All links navigate correctly
- [ ] Back buttons work

**Pages:**
- [ ] Listing page complete
- [ ] Detail pages render
- [ ] Loading states show
- [ ] 404 page works
- [ ] Navigation updated

**Performance:**
- [ ] No console errors
- [ ] Fast filtering/search
- [ ] Images optimized
- [ ] Static generation working
- [ ] SEO metadata present

**Responsive:**
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Touch interactions smooth
- [ ] No horizontal scroll

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Alt text on images
- [ ] Screen reader friendly

---

## 🔗 Next Steps

**Phase 5: Blog System**

Ready for the next phase? Phase 5 includes:
- 📝 MDX-powered blog
- 🎨 Syntax highlighting
- 🏷️ Tags and categories
- 📖 Reading time
- 💬 Table of contents
- 🔗 Social sharing

**To continue:**
1. Test all Phase 4 features thoroughly
2. Add real project content and images
3. Verify all links and functionality
4. Create Phase5.md document

---

## 💡 Enhancement Ideas

**Make it even better:**

1. **Advanced Features:**
   - Project comparison tool
   - Filter presets (save favorite filters)
   - View toggle (grid/list)
   - Project timeline view

2. **Interactive Elements:**
   - Project live preview iframe
   - Technology stack diagram
   - Interactive demos
   - Video walkthroughs

3. **Analytics:**
   - Track popular projects
   - View count per project
   - Technology popularity chart

4. **Social Features:**
   - Share buttons
   - Twitter cards
   - LinkedIn integration
   - Copy link button

---

## 📝 Git Commit

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Phase 4 Complete: Projects page with filtering and details

- Full projects listing page with search
- Advanced filtering (category, technology)
- Sort by date and featured status
- Enhanced project cards with badges
- Single project detail pages
- Image gallery with lightbox
- Related projects section
- Loading and 404 states
- SEO optimization
- Static generation
- Responsive design
- Accessible components"

# Push to remote
git push origin main
```

---

## 🎓 Key Learnings

**What we accomplished:**
- Built comprehensive projects showcase
- Implemented advanced filtering system
- Created dynamic routing with Next.js 13+
- Used static generation for performance
- Built reusable search/filter components
- Implemented image gallery with lightbox
- Created related content algorithm
- Optimized for SEO and accessibility

**Best Practices Used:**
- TypeScript for type safety
- useMemo for performance optimization
- Static generation for fast pages
- Proper metadata for SEO
- Accessible filter controls
- Keyboard navigation support
- Loading states for better UX
- Error boundaries (404 pages)
- Responsive design patterns
- Clean component architecture

**Skills Developed:**
- Advanced React patterns
- Next.js routing and generation
- Search and filter algorithms
- State management
- Performance optimization
- SEO best practices
- Accessibility standards
- Component composition

---

**Phase 4 Status: ✅ COMPLETE**

Congratulations! You now have a professional projects showcase with advanced filtering! 🎉

Ready for Phase 5? Let's build an amazing blog system with MDX! 📝