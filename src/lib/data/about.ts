import { createCachedFunction, DEFAULT_CACHE_CONFIG } from '@/lib/utils/cache';

export interface AboutContent {
  name: string;
  title: string;
  bio: string;
  longBio: string[];
  location: string;
  email: string;
  phone?: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  interests: string[];
  languages: {
    name: string;
    level: string;
  }[];
}

export interface AboutStat {
  label: string;
  value: string;
  icon: string;
}

const aboutData: AboutContent = {
  name: "Kareem AbdulBaset",
  title: "Frontend Developer & UI/UX Enthusiast",
  bio: "Passionate frontend developer specializing in building exceptional digital experiences with Next.js, React, and modern web technologies.",
  longBio: [
    "Hi! I'm a frontend developer with a passion for creating beautiful, performant, and user-friendly web applications. With over 2 years of experience, I specialize in React, Next.js, and TypeScript.",
    "I love turning complex problems into simple, elegant solutions. My approach combines technical expertise with a strong understanding of user experience and design principles.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing my knowledge through technical writing and mentoring."
  ],
  location: "Cairo, Egypt",
  email: "karemebrahim484@gmail.com",
  phone: "+20 155 6311 496",
  availability: "Available",
  interests: [
    "Web Development",
    "UI/UX Design",
    "Open Source",
    "Technical Writing",
    "Photography",
    "Travel",
    "Music",
    "Gaming"
  ],
  languages: [
    {
      name: "Arabic",
      level: "Native"
    },
    {
      name: "English",
      level: "Very Good"
    },
    {
      name: "French",
      level: "Basic"
    }
  ]
};

// Separate stats array
const statsData: AboutStat[] = [
  {
    label: "Years Experience",
    value: "2",
    icon: "Calendar"
  },
  {
    label: "Projects Completed",
    value: "9+",
    icon: "FolderCheck"
  },
  {
    label: "Happy Clients",
    value: "23+",
    icon: "Users"
  },
  {
    label: "Lines of Code",
    value: "10K+",
    icon: "Code"
  }
];

// Get about content (without stats)
export const getAboutContent = createCachedFunction(
  () => aboutData,
  DEFAULT_CACHE_CONFIG.about.tags,
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get about stats (separate array)
export const getAboutStats = createCachedFunction(
  () => statsData,
  DEFAULT_CACHE_CONFIG.about.tags,
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get interests
export const getInterests = createCachedFunction(
  () => aboutData.interests,
  DEFAULT_CACHE_CONFIG.about.tags,
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get languages
export const getLanguages = createCachedFunction(
  () => aboutData.languages,
  DEFAULT_CACHE_CONFIG.about.tags,
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get availability status
export const getAvailability = createCachedFunction(
  () => ({
    status: aboutData.availability,
    isAvailable: aboutData.availability === "Available"
  }),
  DEFAULT_CACHE_CONFIG.about.tags,
  DEFAULT_CACHE_CONFIG.about.revalidate
);