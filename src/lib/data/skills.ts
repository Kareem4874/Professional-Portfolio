import { createCachedFunction, DEFAULT_CACHE_CONFIG } from '@/lib/utils/cache';

export interface Skill {
  name: string;
  icon: string; // Icon name from lucide-react or emoji
  level: number; // 1-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Soft Skills';
  yearsOfExperience?: number;
  description?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Building modern, responsive user interfaces",
    skills: [
      {
        name: "Next.js",
        icon: "⚡",
        level: 85,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Learning Next.js 14/15, App Router, Server Components"
      },
      {
        name: "React",
        icon: "⚛️",
        level: 80,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "React hooks, components, and state management"
      },
      {
        name: "TypeScript",
        icon: "📘",
        level: 75,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Basic TypeScript features and type safety"
      },
      {
        name: "Tailwind CSS",
        icon: "🎨",
        level: 85,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Utility-first CSS framework and responsive design"
      },
      {
        name: "JavaScript",
        icon: "💛",
        level: 80,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "ES6+, async/await, and modern JavaScript features"
      },
      {
        name: "HTML5 & CSS3",
        icon: "🌐",
        level: 90,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Semantic HTML, CSS Grid, Flexbox, and animations"
      },
      {
        name: "Framer Motion",
        icon: "🎬",
        level: 70,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Basic animations and transitions"
      },
      {
        name: "Responsive Design",
        icon: "📱",
        level: 85,
        category: "Frontend",
        yearsOfExperience: 1,
        description: "Mobile-first approach and cross-browser compatibility"
      }
    ]
  },
  {
    title: "Backend & Database",
    description: "Server-side development and data management",
    skills: [
      {
        name: "Node.js",
        icon: "🟢",
        level: 70,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Basic Express and API development"
      },
      {
        name: "PostgreSQL",
        icon: "🐘",
        level: 65,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Basic database queries and design"
      },
      {
        name: "Prisma",
        icon: "🔷",
        level: 60,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Basic ORM usage and migrations"
      },
      {
        name: "MongoDB",
        icon: "🍃",
        level: 60,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Basic NoSQL database operations"
      },
      {
        name: "REST APIs",
        icon: "🔗",
        level: 75,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Basic RESTful API design and implementation"
      },
      {
        name: "GraphQL",
        icon: "◇",
        level: 50,
        category: "Backend",
        yearsOfExperience: 1,
        description: "Learning GraphQL basics and queries"
      }
    ]
  },
  {
    title: "Tools & Technologies",
    description: "Development tools and workflows",
    skills: [
      {
        name: "Git & GitHub",
        icon: "🐙",
        level: 80,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Version control, basic branching, and collaboration"
      },
      {
        name: "VS Code",
        icon: "💻",
        level: 85,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Basic extensions, debugging, and productivity workflows"
      },
      {
        name: "Vercel",
        icon: "▲",
        level: 75,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Basic deployment and hosting"
      },
      {
        name: "Figma",
        icon: "🎨",
        level: 70,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Basic UI/UX design and prototyping"
      },
      {
        name: "Firebase",
        icon: "🔥",
        level: 65,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Basic authentication and database operations"
      },
      {
        name: "Webpack/Vite",
        icon: "📦",
        level: 70,
        category: "Tools",
        yearsOfExperience: 1,
        description: "Basic module bundling and build processes"
      }
    ]
  },
  {
    title: "Soft Skills",
    description: "Professional and interpersonal abilities",
    skills: [
      {
        name: "Problem Solving",
        icon: "🧩",
        level: 95,
        category: "Soft Skills",
        description: "Breaking down complex problems into manageable solutions"
      },
      {
        name: "Communication",
        icon: "💬",
        level: 90,
        category: "Soft Skills",
        description: "Clear technical communication with team and stakeholders"
      },
      {
        name: "Teamwork",
        icon: "🤝",
        level: 90,
        category: "Soft Skills",
        description: "Collaborative development and code reviews"
      },
      {
        name: "Time Management",
        icon: "⏰",
        level: 85,
        category: "Soft Skills",
        description: "Meeting deadlines and prioritizing tasks effectively"
      },
      {
        name: "Adaptability",
        icon: "🔄",
        level: 90,
        category: "Soft Skills",
        description: "Learning new technologies and adapting to changes quickly"
      },
      {
        name: "Attention to Detail",
        icon: "🔍",
        level: 90,
        category: "Soft Skills",
        description: "Writing clean, bug-free code with proper testing"
      }
    ]
  }
];

// ✅ الحل الصحيح - بدون Promise.resolve
export const getAllSkills = createCachedFunction(
  () => skillsData,
  DEFAULT_CACHE_CONFIG.skills.tags,
  DEFAULT_CACHE_CONFIG.skills.revalidate
);

// Get skills by category
export const getSkillsByCategory = (category: string) => {
  return skillsData.find(cat => cat.title === category);
};

// Get all skill names (for filtering, search, etc.)
export const getAllSkillNames = createCachedFunction(
  () => {
    const names: string[] = [];
    skillsData.forEach(category => {
      category.skills.forEach(skill => {
        names.push(skill.name);
      });
    });
    return names;
  },
  DEFAULT_CACHE_CONFIG.skills.tags,
  DEFAULT_CACHE_CONFIG.skills.revalidate
);

// Get top skills (highest level)
export const getTopSkills = (limit: number = 6) => {
  const allSkills: Skill[] = [];
  skillsData.forEach(category => {
    allSkills.push(...category.skills);
  });
  return allSkills
    .sort((a, b) => b.level - a.level)
    .slice(0, limit);
};

// Calculate total years of experience
export const getTotalExperience = createCachedFunction(
  () => {
    let maxYears = 0;
    skillsData.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.yearsOfExperience && skill.yearsOfExperience > maxYears) {
          maxYears = skill.yearsOfExperience;
        }
      });
    });
    return maxYears;
  },
  DEFAULT_CACHE_CONFIG.skills.tags,
  DEFAULT_CACHE_CONFIG.skills.revalidate
);

// Get skills statistics
export const getSkillsStats = createCachedFunction(
  () => {
    let totalSkills = 0;
    let averageLevel = 0;
    const totalCategories = skillsData.length;

    skillsData.forEach(category => {
      totalSkills += category.skills.length;
      category.skills.forEach(skill => {
        averageLevel += skill.level;
      });
    });

    averageLevel = Math.round(averageLevel / totalSkills);

    return {
      totalSkills,
      averageLevel,
      totalCategories,
      skillsPerCategory: Math.round(totalSkills / totalCategories),
    };
  },
  DEFAULT_CACHE_CONFIG.skills.tags,
  DEFAULT_CACHE_CONFIG.skills.revalidate
);