import { createCachedFunction, DEFAULT_CACHE_CONFIG } from '@/lib/utils/cache';

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Icon name from lucide-react
  color: string; // Tailwind color class
  username?: string;
  followers?: string;
  description?: string;
}

const socialLinksData: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Kareem4874",
    icon: "Github",
    color: "hover:text-[#333]",
    username: "@Kareem4874",
    followers: "500+",
    description: "Open source projects and contributions"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kareem-abdulbaset-763294352/",
    icon: "Linkedin",
    color: "hover:text-[#0A66C2]",
    username: "Kareem AbdulBaset",
    followers: "1K+",
    description: "Professional network and career updates"
  },
  {
    name: "Email",
    url: "mail to:karemebrahim484@gmail.com",
    icon: "Mail",
    color: "hover:text-accent",
    username: "karemebrahim484@gmail.com",
    description: "Get in touch directly"
  },
  {
    name: "Dev.to",
    url: "https://dev.to/yourusername",
    icon: "FileText",
    color: "hover:text-[#0A0A0A]",
    username: "@yourusername",
    description: "Technical articles and tutorials"
  }
];

// Get all social links
export const getAllSocialLinks = createCachedFunction(
  () => socialLinksData,
  [DEFAULT_CACHE_CONFIG.about.tags[0]],
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get primary social links (for header/footer)
export const getPrimarySocialLinks = createCachedFunction(
  () => {
    const primaryNames = ["GitHub", "LinkedIn", "Twitter", "Email"];
    return socialLinksData.filter(link => 
      primaryNames.includes(link.name)
    );
  },
  [DEFAULT_CACHE_CONFIG.about.tags[0]],
  DEFAULT_CACHE_CONFIG.about.revalidate
);

// Get social link by name
export const getSocialLinkByName = (name: string) => {
  return socialLinksData.find(link => 
    link.name.toLowerCase() === name.toLowerCase()
  );
};