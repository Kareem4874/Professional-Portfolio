# Phase 3: Homepage Sections 🏠

**Duration:** 4-5 days  
**Goal:** Build all homepage sections with animations and interactions

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Section Architecture](#section-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Testing Sections](#testing-sections)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 3, we'll build:
- ✅ Hero Section with typewriter effect
- ✅ About Section with stats counter
- ✅ Skills Section with interactive cards
- ✅ Featured Projects Section
- ✅ Certifications Section with lightbox
- ✅ CTA (Call-to-Action) Section

**Result:** A complete, animated, and responsive homepage.

---

## 🔧 Prerequisites

Before starting Phase 3:
- ✅ Phase 2 completed successfully
- ✅ All UI components working
- ✅ Navbar and Footer implemented
- ✅ Animations tested

---

## 🏗️ Section Architecture

```
components/
├── sections/
│   ├── hero.tsx                # Hero with typewriter
│   ├── about.tsx               # About with stats
│   ├── skills.tsx              # Skills grid
│   ├── featured-projects.tsx   # Top 3 projects
│   ├── certifications.tsx      # Certificates display
│   └── cta.tsx                 # Call-to-action
lib/
├── data/
│   ├── about.ts                # About data
│   ├── skills.ts               # Skills data
│   ├── projects.ts             # Projects data
│   └── certifications.ts       # Certificates data
└── hooks/
    ├── use-typewriter.ts       # Typewriter effect
    └── use-counter.ts          # Stats counter
```

---

## 🚀 Step-by-Step Implementation

### **Part 1: Data Files Setup**

---

#### **Step 1: Create About Data**

Create `src/lib/data/about.ts`:

```typescript
export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface AboutData {
  name: string;
  bio: string[];
  stats: Stat[];
}

export const aboutData: AboutData = {
  name: "Your Name",
  bio: [
    "I'm a passionate Frontend Developer with 3+ years of experience building modern web applications. I specialize in React, Next.js, and TypeScript, creating user-friendly interfaces that combine beautiful design with robust functionality.",
    "My journey in web development started with a curiosity about how websites work, and it has evolved into a career where I get to turn creative ideas into reality. I love the challenge of solving complex problems and the satisfaction of seeing users interact with the applications I build.",
    "When I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring new web technologies. I believe in continuous learning and staying up-to-date with the latest industry trends."
  ],
  stats: [
    {
      label: "Years Experience",
      value: 3,
      suffix: "+"
    },
    {
      label: "Projects Completed",
      value: 15,
      suffix: "+"
    },
    {
      label: "Technologies",
      value: 20,
      suffix: "+"
    },
    {
      label: "Happy Clients",
      value: 10,
      suffix: "+"
    }
  ]
};
```

---

#### **Step 2: Create Skills Data**

Create `src/lib/data/skills.ts`:

```typescript
export interface Skill {
  name: string;
  category: "Frontend" | "Styling" | "Tools" | "Other";
  icon: string; // Icon name from lucide-react or emoji
  proficiency?: number; // 0-100
  color?: string;
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "Frontend",
    icon: "⚛️",
    proficiency: 90,
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "▲",
    proficiency: 85,
    color: "#000000"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    icon: "📘",
    proficiency: 85,
    color: "#3178C6"
  },
  {
    name: "JavaScript",
    category: "Frontend",
    icon: "🟨",
    proficiency: 95,
    color: "#F7DF1E"
  },
  
  // Styling
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "🎨",
    proficiency: 90,
    color: "#06B6D4"
  },
  {
    name: "CSS3",
    category: "Styling",
    icon: "🎭",
    proficiency: 90,
    color: "#1572B6"
  },
  {
    name: "Sass",
    category: "Styling",
    icon: "💅",
    proficiency: 80,
    color: "#CC6699"
  },
  {
    name: "Framer Motion",
    category: "Styling",
    icon: "🎬",
    proficiency: 85,
    color: "#FF0055"
  },
  
  // Tools
  {
    name: "Git",
    category: "Tools",
    icon: "🔧",
    proficiency: 85,
    color: "#F05032"
  },
  {
    name: "GitHub",
    category: "Tools",
    icon: "🐙",
    proficiency: 85,
    color: "#181717"
  },
  {
    name: "VS Code",
    category: "Tools",
    icon: "💻",
    proficiency: 95,
    color: "#007ACC"
  },
  {
    name: "Figma",
    category: "Tools",
    icon: "🎨",
    proficiency: 75,
    color: "#F24E1E"
  },
  
  // Other
  {
    name: "REST APIs",
    category: "Other",
    icon: "🔌",
    proficiency: 85,
    color: "#009688"
  },
  {
    name: "Responsive Design",
    category: "Other",
    icon: "📱",
    proficiency: 95,
    color: "#4CAF50"
  },
  {
    name: "Web Performance",
    category: "Other",
    icon: "⚡",
    proficiency: 80,
    color: "#FFC107"
  },
  {
    name: "SEO",
    category: "Other",
    icon: "🔍",
    proficiency: 75,
    color: "#8BC34A"
  }
];

export const skillCategories = [
  "All",
  "Frontend",
  "Styling",
  "Tools",
  "Other"
] as const;
```

---

#### **Step 3: Create Projects Data**

Create `src/lib/data/projects.ts`:

```typescript
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category?: string;
  date?: string;
}

export const projectsData: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.",
    longDescription: "Built a complete e-commerce solution using Next.js 14, featuring server-side rendering, optimistic UI updates, and a seamless checkout experience. Integrated Stripe for payments and implemented real-time inventory management.",
    image: "/projects/ecommerce.jpg",
    images: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg"
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce",
    featured: true,
    category: "Full Stack",
    date: "2024-02"
  },
  {
    id: "dashboard-app",
    title: "Analytics Dashboard",
    description: "Interactive dashboard with real-time data visualization, charts, and comprehensive analytics.",
    longDescription: "Developed a modern analytics dashboard using React and TypeScript. Features include real-time data updates, interactive charts with Recharts, and customizable widgets. Implemented efficient data fetching with React Query.",
    image: "/projects/dashboard.jpg",
    images: [
      "/projects/dashboard-1.jpg",
      "/projects/dashboard-2.jpg"
    ],
    technologies: ["React", "TypeScript", "Recharts", "Tailwind CSS", "React Query"],
    liveUrl: "https://dashboard-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/dashboard",
    featured: true,
    category: "Frontend",
    date: "2024-01"
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    description: "Modern landing page with smooth animations, responsive design, and optimized performance.",
    longDescription: "Created a high-converting SaaS landing page with a focus on performance and user experience. Implemented smooth scroll animations with Framer Motion, achieved 98+ Lighthouse score, and ensured perfect responsiveness across all devices.",
    image: "/projects/landing.jpg",
    images: [
      "/projects/landing-1.jpg",
      "/projects/landing-2.jpg"
    ],
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://landing-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/landing",
    featured: true,
    category: "Frontend",
    date: "2023-12"
  },
  {
    id: "task-manager",
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop, real-time updates, and team features.",
    image: "/projects/tasks.jpg",
    technologies: ["React", "TypeScript", "DnD Kit", "Firebase"],
    liveUrl: "https://tasks-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/tasks",
    featured: false,
    category: "Full Stack",
    date: "2023-11"
  },
  {
    id: "weather-app",
    title: "Weather Forecast App",
    description: "Beautiful weather app with location-based forecasts and interactive maps.",
    image: "/projects/weather.jpg",
    technologies: ["React", "JavaScript", "OpenWeather API", "Leaflet"],
    liveUrl: "https://weather-demo.vercel.app",
    githubUrl: "https://github.com/yourusername/weather",
    featured: false,
    category: "Frontend",
    date: "2023-10"
  }
];

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectById = (id: string) => {
  return projectsData.find(project => project.id === id);
};
```

---

#### **Step 4: Create Certifications Data**

Create `src/lib/data/certifications.ts`:

```typescript
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  credentialId?: string;
  description?: string;
}

export const certificationsData: Certification[] = [
  {
    id: "react-complete",
    name: "React - The Complete Guide 2024",
    issuer: "Udemy",
    date: "January 2024",
    image: "/certifications/react-cert.jpg",
    credentialUrl: "https://udemy.com/certificate/...",
    credentialId: "UC-xxxxx",
    description: "Comprehensive React course covering hooks, context, Redux, and advanced patterns."
  },
  {
    id: "typescript-advanced",
    name: "Advanced TypeScript",
    issuer: "Frontend Masters",
    date: "December 2023",
    image: "/certifications/typescript-cert.jpg",
    credentialUrl: "https://frontendmasters.com/certificate/...",
    description: "Deep dive into TypeScript's type system, generics, and advanced patterns."
  },
  {
    id: "nextjs-masterclass",
    name: "Next.js 14 & React - Complete Guide",
    issuer: "Udemy",
    date: "February 2024",
    image: "/certifications/nextjs-cert.jpg",
    credentialUrl: "https://udemy.com/certificate/...",
    credentialId: "UC-yyyyy",
    description: "Master Next.js 14 with App Router, Server Components, and modern features."
  }
];
```

---

### **Part 2: Custom Hooks**

---

#### **Step 5: Create Typewriter Hook**

Create `src/lib/hooks/use-typewriter.ts`:

```typescript
"use client";

import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  words: string[];
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export function useTypewriter({
  words,
  loop = true,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}: UseTypewriterOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1));
          } else {
            // Word complete, wait then start deleting
            setTimeout(() => setIsDeleting(true), delayBetweenWords);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            // Deletion complete, move to next word
            setIsDeleting(false);
            if (loop || currentWordIndex < words.length - 1) {
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ]);

  return currentText;
}
```

---

#### **Step 6: Create Counter Hook**

Create `src/lib/hooks/use-counter.ts`:

```typescript
"use client";

import { useState, useEffect, useRef } from "react";

interface UseCounterOptions {
  start?: number;
  end: number;
  duration?: number; // in milliseconds
  delay?: number;
}

export function useCounter({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
}: UseCounterOptions) {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const delayTimeout = setTimeout(() => {
      const startTime = Date.now();
      const range = end - start;

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(
          start + range * easeOutQuad(progress)
        );

        setCount(currentCount);

        if (progress === 1) {
          clearInterval(timer);
          setCount(end);
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isInView, start, end, duration, delay]);

  return { count, ref };
}
```

---

### **Part 3: Homepage Sections**

---

#### **Step 7: Create Hero Section**

Create `src/components/sections/hero.tsx`:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { useTypewriter } from "@/lib/hooks/use-typewriter";
import { Download, Mail, Github, Linkedin, ChevronDown } from "lucide-react";
import Link from "next/link";

const roles = [
  "Frontend Developer",
  "React Specialist",
  "UI/UX Enthusiast",
  "Problem Solver"
];

export function Hero() {
  const typedRole = useTypewriter({
    words: roles,
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenWords: 2000,
  });

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full animate-pulse delay-75" />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-accent rounded-full animate-pulse delay-300" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Greeting */}
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground">
              Hi, I'm <span className="text-accent font-semibold">Your Name</span> 👋
            </p>
          </FadeIn>

          {/* Main Heading with Typewriter */}
          <div className="space-y-4">
            <FadeIn delay={0.4}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold">
                <span className="gradient-text">Frontend Developer</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="h-12 flex items-center justify-center">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-foreground/80">
                  I'm a{" "}
                  <span className="text-accent">
                    {typedRole}
                    <span className="animate-blink">|</span>
                  </span>
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Description */}
          <FadeIn delay={0.8}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Building beautiful and functional web experiences with{" "}
              <span className="text-foreground font-semibold">React</span>,{" "}
              <span className="text-foreground font-semibold">Next.js</span>, and{" "}
              <span className="text-foreground font-semibold">TypeScript</span>.
              Passionate about creating user-friendly interfaces and solving complex problems.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <SlideIn direction="up" delay={1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="accent"
                onClick={scrollToProjects}
                className="group"
              >
                View My Work
                <ChevronDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a href="/cv/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </a>
              </Button>

              <Button size="lg" variant="ghost" asChild>
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </SlideIn>

          {/* Social Links */}
          <FadeIn delay={1.2}>
            <div className="flex gap-4 justify-center">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={1.5}>
        <button
          onClick={scrollToProjects}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </FadeIn>
    </section>
  );
}
```

Add blink animation to `src/app/globals.css`:

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s infinite;
}
```

---

#### **Step 8: Create About Section**

Create `src/components/sections/about.tsx`:

```typescript
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { useCounter } from "@/lib/hooks/use-counter";
import { aboutData } from "@/lib/data/about";
import { Briefcase, Code, Users, Award } from "lucide-react";

const statIcons = {
  0: Briefcase, // Years Experience
  1: Code,      // Projects
  2: Award,     // Technologies
  3: Users,     // Clients
};

function StatCard({ label, value, suffix = "", index }: { 
  label: string; 
  value: number; 
  suffix?: string; 
  index: number;
}) {
  const { count, ref } = useCounter({
    end: value,
    duration: 2000,
    delay: index * 100,
  });

  const Icon = statIcons[index as keyof typeof statIcons] || Award;

  return (
    <Card className="hover:shadow-lg transition-all hover:scale-105">
      <CardContent className="p-6 text-center" ref={ref}>
        <div className="flex justify-center mb-3">
          <div className="p-3 rounded-full bg-accent/10">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
        <div className="text-4xl font-heading font-bold gradient-text mb-2">
          {count}{suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my journey and expertise
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <div className="glass p-8 rounded-lg">
                {aboutData.bio.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-muted-foreground leading-relaxed ${
                      index !== aboutData.bio.length - 1 ? "mb-4" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="font-heading font-semibold text-xl mb-3">
                  What I Do
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Build responsive and accessible web applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Develop reusable component libraries and design systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Optimize performance and improve user experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Collaborate with designers and backend developers</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>

          {/* Stats */}
          <div>
            <StaggerContainer>
              <div className="grid grid-cols-2 gap-4">
                {aboutData.stats.map((stat, index) => (
                  <StaggerItem key={stat.label}>
                    <StatCard
                      label={stat.label}
                      value={stat.value}
                      suffix={stat.suffix}
                      index={index}
                    />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            <FadeIn delay={0.6}>
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-3">
                    Current Focus
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "React Patterns"].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

#### **Step 9: Create Skills Section**

Create `src/components/sections/skills.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { skillsData, skillCategories } from "@/lib/data/skills";

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills = selectedCategory === "All"
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
              Skills & Technologies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "accent" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <StaggerContainer>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredSkills.map((skill) => (
              <StaggerItem key={skill.name}>
                <Card className="group hover:scale-105 hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h3 className="font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                      {skill.name}
                    </h3>
                    
                    {skill.proficiency && (
                      <div className="mt-3">
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent/60 transition-all duration-1000 group-hover:w-full"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {skill.proficiency}%
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Skills Summary */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <div className="glass p-8 rounded-lg max-w-3xl mx-auto">
              <h3 className="font-heading font-semibold text-2xl mb-4">
                Always Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I believe in continuous learning and staying updated with the latest technologies.
                Currently exploring <span className="text-accent font-semibold">Server Components</span>,{" "}
                <span className="text-accent font-semibold">Web Performance</span>, and{" "}
                <span className="text-accent font-semibold">Advanced Animation Techniques</span>.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

#### **Step 10: Create Featured Projects Section**

Create `src/components/sections/featured-projects.tsx`:

```typescript
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { getFeaturedProjects } from "@/lib/data/projects";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out some of my recent work
            </p>
          </div>
        </FadeIn>

        <StaggerContainer>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Placeholder - Replace with actual images */}
                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <span className="text-6xl">🚀</span>
                    </div>

                    {/* Uncomment when you have actual images */}
                    {/* <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    /> */}
                    
                    <div className="absolute top-4 right-4 z-20">
                      <Badge variant="accent">Featured</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="group-hover:text-accent transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
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
                    <div className="flex gap-2 mt-auto">
                      {project.liveUrl && (
                        <Button variant="accent" size="sm" asChild className="flex-1">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
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
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* View All Projects Button */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

#### **Step 11: Create Certifications Section**

Create `src/components/sections/certifications.tsx`:

```typescript
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { certificationsData } from "@/lib/data/certifications";
import { ExternalLink, X, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const openModal = (certId: string) => {
    setSelectedCert(certId);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = "unset";
  };

  const activeCert = certificationsData.find(cert => cert.id === selectedCert);

  return (
    <>
      <section id="certifications" className="py-20 lg:py-32 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-4">
                Certifications
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Courses and certifications that helped shape my skills
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {certificationsData.map((cert) => (
                <StaggerItem key={cert.id}>
                  <Card className="group hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                    {/* Certificate Badge/Image */}
                    <div 
                      className="relative h-40 overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center"
                      onClick={() => openModal(cert.id)}
                    >
                      <Award className="h-20 w-20 text-accent/50 group-hover:text-accent group-hover:scale-110 transition-all" />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 transition-colors flex items-center justify-center">
                        <span className="text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          View Certificate
                        </span>
                      </div>
                    </div>

                    <CardHeader className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant="accent" className="text-xs">
                          {cert.issuer}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{cert.date}</span>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                        {cert.name}
                      </CardTitle>
                      {cert.description && (
                        <CardDescription className="text-sm mt-2">
                          {cert.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent>
                      {cert.credentialUrl && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          asChild
                        >
                          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Credential
                          </a>
                        </Button>
                      )}
                      {cert.credentialId && (
                        <p className="text-xs text-muted-foreground mt-2 text-center">
                          ID: {cert.credentialId}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Certificate Modal/Lightbox */}
      <AnimatePresence>
        {selectedCert && activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass rounded-lg p-8"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Certificate Content */}
              <div className="text-center space-y-6">
                <Award className="h-24 w-24 text-accent mx-auto" />
                
                <div>
                  <Badge variant="accent" className="mb-3">{activeCert.issuer}</Badge>
                  <h3 className="text-3xl font-heading font-bold mb-2">
                    {activeCert.name}
                  </h3>
                  <p className="text-muted-foreground">{activeCert.date}</p>
                </div>

                {activeCert.description && (
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {activeCert.description}
                  </p>
                )}

                {activeCert.credentialId && (
                  <div className="glass p-4 rounded-lg inline-block">
                    <p className="text-sm text-muted-foreground">Credential ID</p>
                    <p className="font-mono text-accent">{activeCert.credentialId}</p>
                  </div>
                )}

                {activeCert.credentialUrl && (
                  <Button variant="accent" size="lg" asChild>
                    <a href={activeCert.credentialUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Verify Certificate
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

#### **Step 12: Create CTA Section**

Create `src/components/sections/cta.tsx`:

```typescript
"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Mail, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold gradient-text">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's create something amazing! Get in touch and let's discuss your next project.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="accent" asChild className="group">
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" asChild>
                <a href="/cv/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Additional Info */}
            <div className="glass p-6 rounded-lg max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                Available for freelance projects and full-time opportunities.
                <br />
                <span className="text-accent font-semibold">Response time: Within 24 hours</span>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
```

---

### **Part 4: Homepage Integration**

---

#### **Step 13: Update Homepage**

Update `src/app/(home)/page.tsx` (or `src/app/page.tsx`):

```typescript
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Certifications } from "@/components/sections/certifications";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <Certifications />
      <CTA />
    </main>
  );
}
```

---

### **Part 5: Create Section Index**

---

#### **Step 14: Create Sections Index**

Create `src/components/sections/index.ts`:

```typescript
export { Hero } from "./hero";
export { About } from "./about";
export { Skills } from "./skills";
export { FeaturedProjects } from "./featured-projects";
export { Certifications } from "./certifications";
export { CTA } from "./cta";
```

---

### **Part 6: Smooth Scroll Configuration**

---

#### **Step 15: Add Smooth Scroll to Globals**

Update `src/app/globals.css` - add to the end:

```css
/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Section spacing for anchor links (to account for fixed navbar) */
section[id] {
  scroll-margin-top: 80px;
}

/* Custom animations */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s infinite;
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-text-animated {
  background: linear-gradient(
    90deg,
    var(--accent),
    var(--primary),
    var(--accent)
  );
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## ✅ Testing Sections

### **Test Checklist**

Run your development server:

```bash
npm run dev
```

**Visual Tests:**
- [ ] Hero section displays with typewriter effect
- [ ] Typewriter cycles through all roles
- [ ] About section shows bio and stats
- [ ] Stats counter animates when scrolling into view
- [ ] Skills section displays all skills
- [ ] Skills filter works correctly
- [ ] Featured projects show 3 projects
- [ ] Project cards have hover effects
- [ ] Certifications display correctly
- [ ] Certificate modal opens/closes
- [ ] CTA section is eye-catching
- [ ] All animations are smooth

**Interaction Tests:**
- [ ] "View My Work" scrolls to projects
- [ ] Download CV button works
- [ ] Social links open in new tabs
- [ ] Scroll indicator bounces and works
- [ ] Skills category filter changes content
- [ ] Project demo/GitHub buttons link correctly
- [ ] Certificate cards open modal
- [ ] Modal closes on backdrop click
- [ ] CTA buttons navigate correctly

**Animation Tests:**
- [ ] Typewriter types and deletes smoothly
- [ ] Stats count up when in view
- [ ] Sections fade in on scroll
- [ ] Cards stagger animate properly
- [ ] Hover effects are responsive
- [ ] No animation jank or stuttering
- [ ] Animations respect reduced motion

**Responsive Tests:**
- [ ] Mobile (375px) - All sections stack properly
- [ ] Tablet (768px) - Grid layouts adjust
- [ ] Desktop (1280px+) - Full layout displays
- [ ] Text remains readable on all sizes
- [ ] Buttons are touch-friendly
- [ ] Images/icons scale appropriately

---

## 🎨 Customization Guide

### **Personalizing Your Content**

**1. Update About Data** (`lib/data/about.ts`):
```typescript
// Change name, bio, and stats to match your experience
bio: [
  "Your first paragraph here...",
  "Your second paragraph here...",
  "Your third paragraph here..."
],
stats: [
  { label: "Your metric", value: 5, suffix: "+" }
]
```

**2. Update Skills** (`lib/data/skills.ts`):
```typescript
// Add your skills with appropriate icons
{
  name: "Your Skill",
  category: "Frontend", // or Styling, Tools, Other
  icon: "🎨", // Choose an emoji or icon
  proficiency: 85
}
```

**3. Update Projects** (`lib/data/projects.ts`):
```typescript
// Replace with your actual projects
{
  id: "your-project-id",
  title: "Your Project",
  description: "Project description",
  image: "/projects/your-image.jpg", // Add actual image
  technologies: ["React", "Next.js"],
  liveUrl: "https://your-project.com",
  githubUrl: "https://github.com/you/project",
  featured: true
}
```

**4. Update Certifications** (`lib/data/certifications.ts`):
```typescript
// Add your actual certificates
{
  id: "cert-id",
  name: "Certificate Name",
  issuer: "Issuing Organization",
  date: "Month Year",
  image: "/certifications/cert.jpg",
  credentialUrl: "https://..."
}
```

**5. Update Social Links** (in `hero.tsx`):
```typescript
// Replace with your actual links
href="https://github.com/yourusername"
href="https://linkedin.com/in/yourprofile"
href="mailto:your.email@example.com"
```

---

## 📦 Adding Project Images

### **Image Preparation**

**1. Create folders:**
```bash
mkdir -p public/projects
mkdir -p public/certifications
mkdir -p public/cv
```

**2. Add your images:**
- Projects: `public/projects/project1.jpg`, etc.
- Certificates: `public/certifications/cert1.jpg`, etc.
- Resume: `public/cv/resume.pdf`

**3. Optimize images:**
- Use WebP format for best performance
- Recommended sizes:
  - Project images: 1200x675px (16:9)
  - Certificates: 800x600px
- Compress with [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app)

**4. Update Image component in projects:**

Uncomment this in `featured-projects.tsx`:
```typescript
<Image
  src={project.image}
  alt={project.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-500"
/>
```

---

## 🐛 Troubleshooting

### **Issue: Typewriter not working**

**Solution:**
```bash
# Verify the hook is being used in a client component
# Ensure "use client" is at the top of hero.tsx
```

### **Issue: Stats counter not animating**

**Solution:**
- Check that Intersection Observer is supported
- Verify the `ref` is attached to the element
- Test scroll position threshold

### **Issue: Skills filter not updating**

**Solution:**
```typescript
// Make sure useState is imported and component has "use client"
"use client";
import { useState } from "react";
```

### **Issue: Modal not closing**

**Solution:**
- Verify AnimatePresence is imported
- Check body overflow style is being reset
- Ensure backdrop click handler is working

### **Issue: Smooth scroll not working**

**Solution:**
```css
/* Add to globals.css */
html {
  scroll-behavior: smooth;
}

/* For anchor links with fixed navbar */
section[id] {
  scroll-margin-top: 80px;
}
```

### **Issue: Animations stuttering**

**Solution:**
- Reduce number of animated elements
- Use `will-change` CSS property sparingly
- Check browser dev tools for performance
- Test on slower devices

### **Issue: Images not loading**

**Solution:**
```typescript
// Verify images exist in public folder
// Check file paths are correct
// For now, use placeholder gradients
<div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20" />
```

---

## 🎯 Phase 3 Deliverables

### **Files Created:** ~11 files

**Data Files (4):**
- ✅ lib/data/about.ts
- ✅ lib/data/skills.ts
- ✅ lib/data/projects.ts
- ✅ lib/data/certifications.ts

**Hooks (2):**
- ✅ lib/hooks/use-typewriter.ts
- ✅ lib/hooks/use-counter.ts

**Section Components (6):**
- ✅ components/sections/hero.tsx
- ✅ components/sections/about.tsx
- ✅ components/sections/skills.tsx
- ✅ components/sections/featured-projects.tsx
- ✅ components/sections/certifications.tsx
- ✅ components/sections/cta.tsx

**Index Files (1):**
- ✅ components/sections/index.ts

**Updates:**
- ✅ app/page.tsx (integrated all sections)
- ✅ app/globals.css (added animations)

### **Features Implemented:**
✅ Hero with typewriter effect  
✅ Animated stats counter  
✅ Filterable skills section  
✅ Featured projects showcase  
✅ Certificate lightbox modal  
✅ Call-to-action section  
✅ Smooth scroll navigation  
✅ Intersection Observer animations  
✅ Responsive on all devices  
✅ Accessible components  

---

## 📊 Code Statistics

- **Total Lines:** ~2,000+
- **Components:** 6 sections
- **Data Files:** 4
- **Custom Hooks:** 2
- **Animations:** 10+ types
- **Time Estimate:** 12-16 hours

---

## 🚀 Performance Optimization

### **Tips for Better Performance:**

**1. Image Optimization:**
```typescript
// Use next/image with priority for above-fold images
<Image
  src="/hero-bg.jpg"
  alt="Background"
  fill
  priority
  quality={85}
/>
```

**2. Lazy Load Off-Screen Sections:**
```typescript
// Use dynamic imports for heavy sections
import dynamic from 'next/dynamic';

const Certifications = dynamic(() => 
  import('@/components/sections/certifications').then(mod => mod.Certifications)
);
```

**3. Reduce Animation Complexity:**
```typescript
// Use CSS transforms instead of animating layout properties
// Prefer opacity and transform over width/height
```

**4. Optimize Re-renders:**
```typescript
// Memoize expensive calculations
import { useMemo } from 'react';

const filteredSkills = useMemo(() => {
  return skills.filter(skill => skill.category === selected);
}, [skills, selected]);
```

---

## 🎓 Key Learnings

**What we accomplished:**
- Built complete homepage with 6 interactive sections
- Implemented custom React hooks for animations
- Created reusable data structures
- Used Intersection Observer for scroll animations
- Built accessible modal/lightbox
- Implemented typewriter effect
- Created animated counters
- Used Framer Motion effectively

**Best Practices Used:**
- Separation of data and components
- Custom hooks for reusable logic
- Client/Server component distinction
- Semantic HTML structure
- Accessible interactions
- Performance-first animations
- Mobile-first responsive design
- TypeScript for type safety

---

## 📱 Responsive Breakpoints

Test on these sizes:

```
Mobile Small: 375px
Mobile Large: 414px
Tablet: 768px
Desktop Small: 1024px
Desktop Medium: 1280px
Desktop Large: 1920px
```

**Key responsive changes:**
- Grid columns reduce on smaller screens
- Typography scales appropriately
- Spacing adjusts for mobile
- Buttons stack on small screens
- Stats cards go from 2x2 to single column

---

## 🔍 SEO Considerations

### **Section-Specific SEO:**

**1. Add proper heading hierarchy:**
```typescript
// Each section should have proper h2 headings
// Subsections use h3, h4, etc.
```

**2. Alt text for images:**
```typescript
// Always provide descriptive alt text
<Image src="..." alt="Dashboard showing analytics charts" />
```

**3. Semantic HTML:**
```typescript
// Use proper section, article, nav tags
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About Me</h2>
</section>
```

**4. Meta descriptions:**
```typescript
// Update in layout.tsx or page.tsx
export const metadata = {
  title: "Your Name - Frontend Developer",
  description: "Portfolio showcasing React, Next.js projects..."
}
```

---

## ✅ Final Checklist

Before moving to Phase 4:

**Content:**
- [ ] All data files filled with real content
- [ ] Social media links updated
- [ ] Email address correct
- [ ] CV/Resume PDF uploaded
- [ ] Project images added (or placeholders)
- [ ] Certificate images added

**Functionality:**
- [ ] All sections render correctly
- [ ] Typewriter effect works
- [ ] Stats counter animates
- [ ] Skills filter functions
- [ ] Project links work
- [ ] Certificate modal opens/closes
- [ ] Smooth scroll works
- [ ] All buttons navigate correctly

**Responsive:**
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] No horizontal scroll
- [ ] Touch targets are large enough

**Performance:**
- [ ] No console errors
- [ ] Animations are 60fps
- [ ] Page loads quickly
- [ ] Images optimized
- [ ] No layout shift

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] ARIA labels where needed
- [ ] Color contrast sufficient

---

## 🔗 Next Steps

**Phase 4: Projects Page**

Ready for the next phase? Phase 4 includes:
- 🎨 Full projects listing page
- 🔍 Advanced filtering and search
- 📱 Project detail pages
- 🖼️ Image galleries
- 🏷️ Category system

**To continue:**
1. Test all Phase 3 sections thoroughly
2. Add real content and images
3. Verify performance
4. Create Phase4.md document

---

## 📝 Git Commit

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Phase 3 Complete: All homepage sections with animations

- Hero section with typewriter effect
- About section with animated stats counter
- Skills section with category filter
- Featured projects showcase
- Certifications with lightbox modal
- CTA section
- Custom hooks for typewriter and counter
- Data files for all content
- Smooth scroll navigation
- Responsive on all devices"

# Push to remote
git push origin main
```

---

## 💡 Tips for Phase 4

**Before starting Phase 4:**

1. **Gather Project Content:**
   - Write detailed descriptions
   - Take high-quality screenshots
   - List all technologies used
   - Document features and challenges

2. **Plan Project Categories:**
   - Frontend, Full Stack, Mobile
   - Personal, Client, Open Source
   - Decide on taxonomy

3. **Design Project Detail Pages:**
   - Layout for single project
   - Gallery component
   - Related projects section

4. **Prepare More Projects:**
   - Aim for 8-12 total projects
   - Mix of different types
   - Recent work first

---

## 🎨 Customization Ideas

**Make it uniquely yours:**

1. **Personal Branding:**
   - Change accent color
   - Add personal logo
   - Unique typography choices

2. **Interactive Elements:**
   - Add more micro-interactions
   - Custom cursor effects
   - Parallax backgrounds

3. **Content Enhancements:**
   - Add testimonials section
   - Include blog preview
   - Add timeline/experience

4. **Visual Flair:**
   - Animated illustrations
   - Custom icons
   - Unique section dividers

---

**Phase 3 Status: ✅ COMPLETE**

Congratulations! You now have a fully functional, animated homepage! 🎉

Ready for Phase 4? Let's build an amazing projects page!