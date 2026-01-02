"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Star,
  Eye,
  Heart,
  Code2,
  Sparkles,
  Layers,
  Zap,
  ChevronRight,
  Folder
} from "lucide-react";
import Link from "next/link";

type ViewMode = 'grid' | 'list';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  tags: string[];
  technologies: string[];
  date: string;
  duration?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  stats?: {
    views?: string;
    likes?: number;
  };
}

interface ProjectCardProps {
  project: Project;
  viewMode?: ViewMode;
  index?: number;
}

// Category colors with modern gradients
const getCategoryStyles = (category: string) => {
  const styles = {
    'Web Development': {
      color: '#3b82f6',
      gradient: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50 dark:bg-blue-950/30',
      icon: Code2
    },
    'Mobile App': {
      color: '#a855f7',
      gradient: 'from-purple-500 to-pink-600',
      lightBg: 'bg-purple-50 dark:bg-purple-950/30',
      icon: Zap
    },
    'UI/UX Design': {
      color: '#ec4899',
      gradient: 'from-pink-500 to-rose-600',
      lightBg: 'bg-pink-50 dark:bg-pink-950/30',
      icon: Sparkles
    },
    'Full Stack': {
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-600',
      lightBg: 'bg-cyan-50 dark:bg-cyan-950/30',
      icon: Layers
    },
    'Frontend': {
      color: '#6366f1',
      gradient: 'from-indigo-500 to-purple-600',
      lightBg: 'bg-indigo-50 dark:bg-indigo-950/30',
      icon: Folder
    },
    'Backend': {
      color: '#f97316',
      gradient: 'from-orange-500 to-red-600',
      lightBg: 'bg-orange-50 dark:bg-orange-950/30',
      icon: Code2
    },
  };
  return styles[category as keyof typeof styles] || {
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    icon: Code2
  };
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const demoProject: Project = {
  id: "1",
  slug: "ecommerce-platform",
  title: "E-Commerce Platform",
  description: "A modern e-commerce platform with seamless shopping experience, real-time inventory management, and secure payment processing.",
  image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
  category: "Full Stack",
  tags: ["ecommerce", "shopping", "nextjs"],
  technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
  date: "2024-01-15",
  duration: "3 months",
  githubUrl: "https://github.com/username/ecommerce-platform",
  liveUrl: "https://ecommerce-platform.vercel.app",
  featured: true,
  stats: {
    views: "2.5K",
    likes: 142
  }
};

export function ProjectCard({ project = demoProject, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categoryStyle = getCategoryStyles(project.category || 'Web Development');
  const CategoryIcon = categoryStyle.icon;

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Main Card Container */}
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500">

        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, ${categoryStyle.color}20, transparent, ${categoryStyle.color}20)`,
            backgroundSize: '200% 200%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Image Section */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
          )}

          {/* Actual Image */}
          <motion.img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.7 }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Featured Badge */}
          {project.featured && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-4"
            >
              <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${categoryStyle.gradient} rounded-lg shadow-lg`}>
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                <span className="text-xs font-bold text-white">Featured</span>
              </div>
            </motion.div>
          )}

          {/* Quick Actions - Always Visible on Mobile */}
          <div className="absolute top-4 right-4 flex gap-2">
            <AnimatePresence>
              {(isHovered || isMobile) && (
                <>
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg shadow-lg hover:bg-white dark:hover:bg-black/90 transition-colors"
                    >
                      <Github className="w-4 h-4 text-gray-700 dark:text-white" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ delay: 0.1 }}
                      className="p-2.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg shadow-lg hover:bg-white dark:hover:bg-black/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-700 dark:text-white" />
                    </motion.a>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          {project.stats && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{project.stats.views}</span>
              </motion.div>
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 py-1.5 bg-white/90 dark:bg-black/70 backdrop-blur-md rounded-lg flex items-center gap-1.5"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-all ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600 dark:text-gray-400'
                    }`}
                />
                <span className="text-xs font-semibold text-gray-900 dark:text-white">
                  {(project.stats.likes || 0) + (isLiked ? 1 : 0)}
                </span>
              </motion.button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">

          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${categoryStyle.lightBg} border border-gray-200 dark:border-slate-700`}
            >
              <CategoryIcon
                className="w-3.5 h-3.5"
                style={{ color: categoryStyle.color }}
              />
              <span
                className="text-xs font-semibold"
                style={{ color: categoryStyle.color }}
              >
                {project.category}
              </span>
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
            {project.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(project.date)}</span>
            </div>
            {project.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{project.duration}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium border border-gray-200 dark:border-slate-700"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 rounded-md text-xs font-medium border border-gray-200 dark:border-slate-700">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* CTA Button - Fully Clickable */}
          <Link
            href={`/projects/${project.slug || project.id}`}
            className={`relative z-10 block w-full px-4 py-3 bg-gradient-to-r ${categoryStyle.gradient} text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-center cursor-pointer`}
          >
            <span className="flex items-center justify-center gap-2 pointer-events-none">
              View Project Details
              <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${categoryStyle.color}, transparent)`,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.article>
  );
}
