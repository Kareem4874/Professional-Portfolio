import { createCachedFunction, DEFAULT_CACHE_CONFIG } from '@/lib/utils/cache';

export interface Certification {
  id: string;
  title: string;
  provider: string;
  issueDate: string; // YYYY-MM format
  expiryDate?: string; // YYYY-MM format
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  description: string;
  skills: string[];
  featured: boolean;
}

const certificationsData: Certification[] = [
  {
    id: "1",
    title: "Problem Solving Level 1",
    provider: "Programming Advices",
    issueDate: "2024-01",
    credentialId: "UC-XXXX-XXXX-XXXX",
    image: "/certifications/problem%20solving%20lvl%201.webp",
    description: "Comprehensive problem-solving course covering algorithms, data structures, and coding challenges.",
    skills: ["Problem Solving", "Algorithms", "Data Structures", "Coding"],
    featured: true
  },
  {
    id: "2",
    title: "Problem Solving Level 2",
    provider: "Programming Advices",
    issueDate: "2023-11",
    image: "/certifications/problem%20solving%20lvl%202.webp",
    description: "Advanced problem-solving patterns, optimization techniques, and complex algorithm implementations.",
    skills: ["Problem Solving", "Algorithms", "Optimization", "Advanced Coding"],
    featured: true
  },
  {
    id: "3",
    title: "Problem Solving Level 3",
    provider: "Programming Advices",
    issueDate: "2023-08",
    credentialId: "CERT-XXXX-XXXX",
    image: "/certifications/Problem%20solving%20lvl%203.webp",
    description: "Expert-level problem solving with advanced algorithms, dynamic programming, and system design.",
    skills: ["Problem Solving", "Dynamic Programming", "System Design", "Expert Algorithms"],
    featured: true
  },
  {
    id: "4",
    title: "C++ Level 2",
    provider: "Programming Advices",
    issueDate: "2024-02",
    credentialId: "CERT-CPP-LVL2",
    image: "/certifications/c%2B%2B%20lvl%202.webp",
    description: "Advanced C++ programming course covering object-oriented programming, templates, STL, and modern C++ features.",
    skills: ["C++", "Object-Oriented Programming", "STL", "Templates", "Modern C++"],
    featured: true
  },
  {
    id: "5",
    title: "Tailwind CSS: From Zero to Production",
    provider: "Tailwind Labs",
    issueDate: "2023-06",
    image: "/certifications/tailwind-cert.avif",
    description: "Master Tailwind CSS with advanced techniques, custom configurations, and design systems.",
    skills: ["Tailwind CSS", "CSS", "Design Systems"],
    featured: false
  },
  {
    id: "6",
    title: "JavaScript Algorithms and Data Structures",
    provider: "freeCodeCamp",
    issueDate: "2023-03",
    image: "/certifications/js-algorithms-cert.avif",
    description: "Comprehensive algorithms and data structures course with problem-solving focus.",
    skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
    featured: false
  },
  {
    id: "7",
    title: "Git & GitHub Masterclass",
    provider: "Udemy",
    issueDate: "2023-01",
    credentialId: "UC-YYYY-YYYY-YYYY",
    image: "/certifications/git-cert.avif",
    description: "Advanced Git workflows, branching strategies, and team collaboration techniques.",
    skills: ["Git", "GitHub", "Version Control"],
    featured: false
  }
];

// Get all certifications
export const getAllCertifications = createCachedFunction(
  () => certificationsData,
  DEFAULT_CACHE_CONFIG.certifications.tags,
  DEFAULT_CACHE_CONFIG.certifications.revalidate
);

// Get featured certifications
export const getFeaturedCertifications = createCachedFunction(
  () => certificationsData.filter(cert => cert.featured),
  DEFAULT_CACHE_CONFIG.certifications.tags,
  DEFAULT_CACHE_CONFIG.certifications.revalidate
);

// Get certification by ID
export const getCertificationById = (id: string) => {
  return certificationsData.find(cert => cert.id === id);
};

// Get certifications by provider
export const getCertificationsByProvider = (provider: string) => {
  return certificationsData.filter(cert => 
    cert.provider.toLowerCase() === provider.toLowerCase()
  );
};

// Get all providers
export const getAllProviders = createCachedFunction(
  () => {
    const providers = new Set(certificationsData.map(cert => cert.provider));
    return Array.from(providers).sort();
  },
  DEFAULT_CACHE_CONFIG.certifications.tags,
  DEFAULT_CACHE_CONFIG.certifications.revalidate
);

// Get certifications statistics
export const getCertificationsStats = createCachedFunction(
  () => {
    return {
      total: certificationsData.length,
      featured: certificationsData.filter(c => c.featured).length,
      providers: new Set(certificationsData.map(c => c.provider)).size,
      latestYear: Math.max(...certificationsData.map(c => 
        parseInt(c.issueDate.split('-')[0])
      ))
    };
  },
  DEFAULT_CACHE_CONFIG.certifications.tags,
  DEFAULT_CACHE_CONFIG.certifications.revalidate
);