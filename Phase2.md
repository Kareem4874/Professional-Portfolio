# Phase 2: Core Components 🎨

**Duration:** 2-3 days  
**Goal:** Build reusable UI components and layout structure

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Component Architecture](#component-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [Testing Components](#testing-components)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 2, we'll build:
- ✅ Base UI Components (Button, Card, Input, Skeleton)
- ✅ Navbar with sticky behavior and mobile menu
- ✅ Footer with social links
- ✅ Theme toggle component
- ✅ Animation wrapper components
- ✅ Layout wrapper

**Result:** A complete component library ready for building pages.

---

## 🔧 Prerequisites

Before starting Phase 2:
- ✅ Phase 1 completed successfully
- ✅ Development server running without errors
- ✅ All dependencies installed

---

## 🏗️ Component Architecture

```
components/
├── ui/                      # Base UI components
│   ├── button.tsx          # Button with variants
│   ├── card.tsx            # Card with glass effect
│   ├── input.tsx           # Input field
│   ├── textarea.tsx        # Textarea field
│   ├── skeleton.tsx        # Loading skeleton
│   └── badge.tsx           # Badge for tags
├── layout/                  # Layout components
│   ├── navbar.tsx          # Main navigation
│   ├── footer.tsx          # Footer with links
│   ├── mobile-menu.tsx     # Mobile navigation
│   └── theme-toggle.tsx    # Dark/light toggle
└── animations/              # Animation wrappers
    ├── fade-in.tsx         # Fade in animation
    ├── slide-in.tsx        # Slide in animation
    └── stagger-container.tsx # Stagger children
```

---

## 🚀 Step-by-Step Implementation

### **Part 1: Base UI Components** 

---

#### **Step 1: Create Button Component**

Create `src/components/ui/button.tsx`:

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105",
        glass: "glass hover:bg-card/90 hover:scale-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

---

#### **Step 2: Create Card Component**

Create `src/components/ui/card.tsx`:

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-heading font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

---

#### **Step 3: Create Input Component**

Create `src/components/ui/input.tsx`:

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

---

#### **Step 4: Create Textarea Component**

Create `src/components/ui/textarea.tsx`:

```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
```

---

#### **Step 5: Create Skeleton Component**

Create `src/components/ui/skeleton.tsx`:

```typescript
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
```

---

#### **Step 6: Create Badge Component**

Create `src/components/ui/badge.tsx`:

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        accent:
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
```

---

### **Part 2: Animation Components**

---

#### **Step 7: Create FadeIn Component**

Create `src/components/animations/fade-in.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.5,
  className 
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

#### **Step 8: Create SlideIn Component**

Create `src/components/animations/slide-in.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({ 
  children, 
  direction = "up",
  delay = 0, 
  duration = 0.5,
  className 
}: SlideInProps) {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

#### **Step 9: Create StaggerContainer Component**

Create `src/components/animations/stagger-container.tsx`:

```typescript
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children,
  className 
}: { 
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

### **Part 3: Layout Components**

---

#### **Step 10: Create Theme Toggle**

Create `src/components/layout/theme-toggle.tsx`:

```typescript
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

---

#### **Step 11: Create Mobile Menu**

Create `src/components/layout/mobile-menu.tsx`:

```typescript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-64 bg-card border-l border-border z-50 p-6"
            >
              <div className="flex justify-end mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

#### **Step 12: Create Navbar**

Create `src/components/layout/navbar.tsx`:

```typescript
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-heading font-bold gradient-text"
          >
            Your Name
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button variant="accent" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
```

---

#### **Step 13: Create Footer**

Create `src/components/layout/footer.tsx`:

```typescript
import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourprofile",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:your.email@example.com",
    icon: Mail,
  },
];

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
              Your Name
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Frontend Developer specializing in React, Next.js, and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-accent" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

#### **Step 14: Update Main Layout**

Update `src/app/layout.tsx` to include Navbar and Footer:

```typescript
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Name - Frontend Developer",
  description: "Frontend Developer specializing in React, Next.js, and modern web technologies. View my portfolio and projects.",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.vercel.app",
    title: "Your Name - Frontend Developer",
    description: "Frontend Developer Portfolio",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Frontend Developer",
    description: "Frontend Developer Portfolio",
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

#### **Step 15: Create Component Showcase Page**

Update `src/app/page.tsx` to test all components:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";
import { Download, Github, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      {/* Hero Test */}
      <FadeIn>
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-heading font-bold gradient-text">
            Phase 2 Complete! 🎨
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All core components are ready. Testing animations and UI elements.
          </p>
        </div>
      </FadeIn>

      {/* Buttons Test */}
      <SlideIn direction="up">
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Testing all button styles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="glass">Glass</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </SlideIn>

      {/* Cards Test */}
      <div>
        <h2 className="text-3xl font-heading font-bold mb-8">Card Layouts</h2>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>Card {i}</CardTitle>
                    <CardDescription>Testing card component</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a test card with glass morphism effect and animations.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="accent">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>

      {/* Form Elements Test */}
      <SlideIn direction="left">
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>Input and textarea components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input type="email" placeholder="your.email@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea placeholder="Type your message here..." />
            </div>
            <Button className="w-full">Submit</Button>
          </CardContent>
        </Card>
      </SlideIn>

      {/* Skeleton Test */}
      <div>
        <h2 className="text-3xl font-heading font-bold mb-8">Loading Skeletons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/6" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Badges Test */}
      <SlideIn direction="right">
        <Card>
          <CardHeader>
            <CardTitle>Badge Variants</CardTitle>
            <CardDescription>Different badge styles for tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </CardContent>
        </Card>
      </SlideIn>

      {/* Glass Effect Test */}
      <div className="relative h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="glass p-8 rounded-lg max-w-md">
          <h3 className="text-2xl font-heading font-bold mb-4">Glass Morphism</h3>
          <p className="text-muted-foreground mb-4">
            This card demonstrates the glass morphism effect with backdrop blur.
          </p>
          <div className="flex gap-2">
            <Button variant="glass" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            <Button variant="glass" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Animation Test */}
      <div>
        <h2 className="text-3xl font-heading font-bold mb-8">Animation Tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeIn delay={0.2}>
            <Card className="text-center p-8">
              <p className="text-sm text-muted-foreground">FadeIn Animation</p>
              <p className="text-2xl font-bold mt-2">✨</p>
            </Card>
          </FadeIn>

          <SlideIn direction="left" delay={0.3}>
            <Card className="text-center p-8">
              <p className="text-sm text-muted-foreground">SlideIn Left</p>
              <p className="text-2xl font-bold mt-2">👈</p>
            </Card>
          </SlideIn>

          <SlideIn direction="right" delay={0.4}>
            <Card className="text-center p-8">
              <p className="text-sm text-muted-foreground">SlideIn Right</p>
              <p className="text-2xl font-bold mt-2">👉</p>
            </Card>
          </SlideIn>

          <SlideIn direction="up" delay={0.5}>
            <Card className="text-center p-8">
              <p className="text-sm text-muted-foreground">SlideIn Up</p>
              <p className="text-2xl font-bold mt-2">👆</p>
            </Card>
          </SlideIn>
        </div>
      </div>

      {/* Success Message */}
      <FadeIn delay={0.6}>
        <div className="text-center space-y-4 py-12">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-heading font-bold">
            All Components Working!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Phase 2 is complete. All UI components, animations, and layout elements are ready for Phase 3.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="accent">
              Start Phase 3
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
```

---

## ✅ Testing Components

### **Test Checklist**

Run your development server and verify:

```bash
npm run dev
```

**Visual Tests:**
- [ ] Navbar appears at top with sticky behavior
- [ ] Navbar blurs when scrolling down
- [ ] Mobile menu works on small screens
- [ ] Theme toggle switches between dark/light
- [ ] Footer displays with social links
- [ ] All button variants render correctly
- [ ] Cards have proper shadows and hover effects
- [ ] Input and textarea fields are styled
- [ ] Skeletons animate with pulse effect
- [ ] Badges display in different colors
- [ ] Glass morphism effect works
- [ ] All animations play smoothly

**Interaction Tests:**
- [ ] Theme toggle changes colors instantly
- [ ] Mobile menu opens/closes smoothly
- [ ] Navbar links are clickable
- [ ] Buttons have hover effects
- [ ] Cards have hover animations
- [ ] Input fields can be typed in
- [ ] Smooth scroll behavior works

**Responsive Tests:**
- [ ] Mobile (375px) - Menu hamburger visible
- [ ] Tablet (768px) - Layout adjusts properly
- [ ] Desktop (1280px+) - Full navigation visible

---

## 🎨 Component Usage Examples

### **Using Buttons**

```tsx
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Basic button
<Button>Click me</Button>

// With icon
<Button>
  <Download className="mr-2 h-4 w-4" />
  Download CV
</Button>

// Different variants
<Button variant="accent">Accent</Button>
<Button variant="glass">Glass Effect</Button>
<Button variant="outline" size="lg">Large Outline</Button>

// As link
<Button asChild>
  <Link href="/contact">Contact Me</Link>
</Button>
```

### **Using Cards**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle>Project Title</CardTitle>
    <CardDescription>Short description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Project details here...</p>
  </CardContent>
</Card>
```

### **Using Animations**

```tsx
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

// Fade in with delay
<FadeIn delay={0.2}>
  <h1>Animated Heading</h1>
</FadeIn>

// Slide in from left
<SlideIn direction="left">
  <Card>Content</Card>
</SlideIn>

// Stagger children
<StaggerContainer>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.name}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

## 📦 Component Export Index

Create `src/components/ui/index.ts` for easier imports:

```typescript
export * from "./button";
export * from "./card";
export * from "./input";
export * from "./textarea";
export * from "./skeleton";
export * from "./badge";
```

Create `src/components/animations/index.ts`:

```typescript
export * from "./fade-in";
export * from "./slide-in";
export * from "./stagger-container";
```

Create `src/components/layout/index.ts`:

```typescript
export * from "./navbar";
export * from "./footer";
export * from "./theme-toggle";
export * from "./mobile-menu";
```

**Now you can import like this:**

```typescript
import { Button, Card, Input } from "@/components/ui";
import { FadeIn, SlideIn } from "@/components/animations";
import { Navbar, Footer } from "@/components/layout";
```

---

## 🐛 Troubleshooting

### **Issue: Animations not working**

**Solution:**
```bash
# Verify framer-motion is installed
npm list framer-motion

# Reinstall if needed
npm install framer-motion
```

### **Issue: "use client" errors**

**Solution:**
- Ensure all components using hooks have `"use client"` at the top
- Check that you're not importing client components in server components

### **Issue: Navbar not sticky**

**Solution:**
- Verify `position: fixed` in Tailwind classes
- Check z-index is high enough (`z-50`)
- Ensure `pt-16` is added to main content

### **Issue: Theme toggle not working**

**Solution:**
```typescript
// Make sure ThemeProvider is in layout.tsx
// Add suppressHydrationWarning to <html> tag
<html lang="en" suppressHydrationWarning>
```

### **Issue: Mobile menu not closing**

**Solution:**
- Check AnimatePresence is imported from framer-motion
- Verify state is updating correctly
- Check backdrop click handler

### **Issue: Glass effect not showing**

**Solution:**
- Ensure backdrop-blur is enabled in tailwind.config.ts
- Check browser support for backdrop-filter
- Verify background opacity is less than 100%

---

## 🎯 Phase 2 Deliverables

### **Files Created:** ~15 components

**UI Components (6):**
- ✅ button.tsx
- ✅ card.tsx
- ✅ input.tsx
- ✅ textarea.tsx
- ✅ skeleton.tsx
- ✅ badge.tsx

**Animation Components (3):**
- ✅ fade-in.tsx
- ✅ slide-in.tsx
- ✅ stagger-container.tsx

**Layout Components (4):**
- ✅ navbar.tsx
- ✅ footer.tsx
- ✅ mobile-menu.tsx
- ✅ theme-toggle.tsx

**Index Files (3):**
- ✅ ui/index.ts
- ✅ animations/index.ts
- ✅ layout/index.ts

### **Features Implemented:**
✅ Complete UI component library  
✅ Framer Motion animations  
✅ Responsive navbar with mobile menu  
✅ Theme toggle (dark/light)  
✅ Footer with social links  
✅ Glass morphism effects  
✅ Loading skeletons  
✅ Accessible components  

---

## 📊 Code Statistics

- **Total Lines:** ~1,500+
- **Components:** 15
- **Animations:** 3 types
- **Variants:** 25+ (buttons, cards, badges)
- **Time Estimate:** 6-8 hours

---

## 🚀 Next Steps

**Phase 3: Homepage Sections**

Ready to build the homepage? Phase 3 includes:
- 🎨 Hero section with typewriter effect
- 👤 About section with bio
- 💻 Skills showcase
- 🚀 Featured projects preview
- 🎓 Certifications display
- 📞 Call-to-action section

**To continue:**
1. Verify all Phase 2 components work
2. Test on different screen sizes
3. Check animations are smooth
4. Create Phase3.md for next steps

---

## 📝 Git Commit

```bash
git add .
git commit -m "Phase 2 Complete: Core UI components, animations, navbar, and footer"
git push origin main
```

---

## 🎓 Key Learnings

**What we accomplished:**
- Built a complete design system from scratch
- Implemented reusable component patterns
- Created smooth animations with Framer Motion
- Made responsive layouts for all devices
- Set up proper TypeScript types
- Used Radix UI primitives for accessibility
- Implemented theme switching
- Created mobile-first navigation

**Best Practices Used:**
- Component composition
- Variant-based styling with CVA
- Proper TypeScript typing
- Accessibility with ARIA labels
- Semantic HTML
- CSS utility classes
- Animation performance
- Mobile-first approach

---

**Phase 2 Status: ✅ COMPLETE**

Ready for Phase 3! 🎉