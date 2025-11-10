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