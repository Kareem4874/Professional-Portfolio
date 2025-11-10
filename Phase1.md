# Phase 1: Foundation & Setup 🏗️

**Duration:** 2-3 days  
**Goal:** Set up the project structure, install dependencies, and configure the development environment

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Implementation](#step-by-step-implementation)
4. [File Structure](#file-structure)
5. [Configuration Files](#configuration-files)
6. [Testing the Setup](#testing-the-setup)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

---

## 🎯 Overview

In Phase 1, we'll:
- ✅ Create a new Next.js 14 project with TypeScript
- ✅ Install all required dependencies
- ✅ Configure Tailwind CSS with custom dark theme
- ✅ Set up the folder structure
- ✅ Create base layout with theme provider
- ✅ Configure fonts (Inter for body, Poppins for headings)
- ✅ Add global styles and CSS variables

---

## 🔧 Prerequisites

Before starting, make sure you have:

```bash
# Check Node.js version (should be 18.17 or higher)
node --version

# Check npm version
npm --version

# Git installed
git --version
```

If you don't have Node.js, download it from: https://nodejs.org/

---

## 🚀 Step-by-Step Implementation

### **Step 1: Create Next.js Project**

Open your terminal and run:

```bash
# Create Next.js project with all options configured
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project directory
cd portfolio
```

**Options Explanation:**
- `--typescript` - Enable TypeScript
- `--tailwind` - Include Tailwind CSS
- `--eslint` - Include ESLint for code quality
- `--app` - Use App Router (Next.js 14)
- `--src-dir` - Use `src/` directory structure
- `--import-alias "@/*"` - Enable path aliases

---

### **Step 2: Install Core Dependencies**

Install all required packages:

```bash
# Animation libraries
npm install framer-motion

# UI component dependencies
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# Icons
npm install lucide-react react-icons

# Theme management
npm install next-themes

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
```

**Package Purposes:**
- **framer-motion**: Smooth animations and transitions
- **@radix-ui/react-slot**: Primitive for building components
- **class-variance-authority**: Managing component variants
- **clsx & tailwind-merge**: Utility for merging Tailwind classes
- **lucide-react**: Modern icon library
- **react-icons**: Additional icon sets
- **next-themes**: Dark/light theme management

---

### **Step 3: Project Folder Structure**

Create the following folder structure:

```bash
# Create directories
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/animations
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/images
mkdir -p public/projects
mkdir -p public/certifications
mkdir -p public/cv
```

**Final Structure:**
```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── sections/        # Page sections (Hero, About, etc.)
│   │   └── animations/      # Animation wrapper components
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── styles/
├── public/
│   ├── images/
│   ├── projects/
│   ├── certifications/
│   └── cv/
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

### **Step 4: Configure Tailwind CSS**

Replace `tailwind.config.ts` with this configuration:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        shimmer: "shimmer 2s infinite linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

**Install tailwindcss-animate:**
```bash
npm install tailwindcss-animate
```

---

### **Step 5: Update Global Styles**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 142 76% 36%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-background;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-muted rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-muted-foreground;
  }
}

@layer utilities {
  /* Glass morphism effect */
  .glass {
    @apply bg-card/80 backdrop-blur-lg border border-border/50;
  }
  
  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent;
  }
  
  /* Container utilities */
  .container-padding {
    @apply px-4 sm:px-6 lg:px-8;
  }
  
  .section-padding {
    @apply py-16 md:py-24 lg:py-32;
  }
}
```

---

### **Step 6: Configure Fonts**

Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### **Step 7: Create Theme Provider**

Create `src/components/theme-provider.tsx`:

```typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

### **Step 8: Create Utility Functions**

Create `src/lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

/**
 * Delay function for animations
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
```

---

### **Step 9: Update Home Page**

Update `src/app/page.tsx` with a temporary test:

```typescript
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-heading font-bold gradient-text">
          Portfolio Setup Complete! 🚀
        </h1>
        <p className="text-xl text-muted-foreground">
          Phase 1 Foundation is ready. Time to build!
        </p>
        <div className="glass p-6 rounded-lg max-w-md mx-auto">
          <p className="text-sm">
            If you can see this styled card with blur effect, 
            your Tailwind configuration is working perfectly!
          </p>
        </div>
      </div>
    </main>
  );
}
```

---

### **Step 10: Update Next.js Config**

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
```

---

### **Step 11: Update TypeScript Config**

Your `tsconfig.json` should look like this:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### **Step 12: Create Environment Variables File**

Create `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Your Name Portfolio

# Add more variables as needed in future phases
```

Create `.env.example` (for documentation):

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=

# Web3Forms (Phase 6)
NEXT_PUBLIC_WEB3FORMS_KEY=

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=
```

---

### **Step 13: Update .gitignore**

Ensure `.gitignore` includes:

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

---

### **Step 14: Initialize Git Repository**

```bash
# Initialize Git
git init

# Add all files
git add .

# First commit
git commit -m "Phase 1: Initial project setup with Next.js, TypeScript, and Tailwind"

# Create GitHub repository and push (optional)
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

---

## ✅ Testing the Setup

### **1. Start Development Server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### **2. Verify Checklist**

- [ ] Page loads without errors
- [ ] You see the "Portfolio Setup Complete!" message
- [ ] The gradient text effect works
- [ ] The glass card has blur effect
- [ ] Dark theme is active by default
- [ ] Fonts are loading (Inter and Poppins)
- [ ] No console errors
- [ ] Hot reload works (try editing page.tsx)

### **3. Build Test**

```bash
# Test production build
npm run build

# Check for errors
npm start
```

All builds should complete successfully with no errors.

---

## 🐛 Troubleshooting

### **Issue: Module not found errors**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Issue: TypeScript errors**

```bash
# Restart TypeScript server in VS Code
# Press: Cmd/Ctrl + Shift + P
# Type: "TypeScript: Restart TS Server"
```

### **Issue: Tailwind styles not working**

1. Check if `tailwind.config.ts` paths include your files
2. Verify `@tailwind` directives are in `globals.css`
3. Restart dev server

### **Issue: Fonts not loading**

1. Check internet connection (fonts load from Google)
2. Verify font imports in `layout.tsx`
3. Clear browser cache

### **Issue: Theme not working**

1. Check `ThemeProvider` is wrapping children in `layout.tsx`
2. Verify `next-themes` is installed
3. Check for console errors

---

## 📦 Final Package.json

Your `package.json` should include:

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.3",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "next-themes": "^0.2.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0",
    "postcss": "^8",
    "tailwindcss": "^3.3.0",
    "typescript": "^5"
  }
}
```

---

## 🎉 Phase 1 Complete!

### **What We Accomplished:**
✅ Next.js 14 project created with App Router  
✅ TypeScript configured  
✅ Tailwind CSS with custom dark theme  
✅ Fonts configured (Inter + Poppins)  
✅ Project structure organized  
✅ Theme provider setup  
✅ Utility functions created  
✅ Global styles and CSS variables  
✅ Development environment ready  

### **Project Statistics:**
- **Files Created:** ~15
- **Dependencies Installed:** ~20 packages
- **Lines of Code:** ~400
- **Time Taken:** 2-3 hours (if following guide)

---

## 🚀 Next Steps

Ready for **Phase 2: Core Components**? 

In Phase 2, we'll build:
- ✨ Navbar with sticky behavior and blur effect
- ✨ Footer with social links
- ✨ Theme toggle component
- ✨ Base UI components (Button, Card, Input)
- ✨ Animation wrapper components

**Create Phase2.md file to continue!** 🎯

---

## 📝 Commit Message

```bash
git add .
git commit -m "Phase 1 Complete: Foundation setup with Next.js, TypeScript, Tailwind, and theme configuration"
```

---

**Phase 1 Status: ✅ COMPLETE**