'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/data/projects-data";
import { sortProjectsByDate, sortProjectsByFeatured } from "@/lib/utils/project-utils";

// Lazy load heavy components for better code splitting
const ProjectCard = dynamic(
  () => import("@/components/projects/project-card").then(mod => ({ default: mod.ProjectCard })),
  { 
    ssr: true,
    loading: () => <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
  }
);

const ProjectFilters = dynamic(
  () => import("@/components/projects/project-filters").then(mod => ({ default: mod.ProjectFilters })),
  { ssr: true }
);

const ProjectSearch = dynamic(
  () => import("@/components/projects/project-search").then(mod => ({ default: mod.ProjectSearch })),
  { ssr: true }
);
import { 
  Search, 
  Filter, 
  Calendar, 
  Star, 
  Grid3x3, 
  List, 
  ChevronUp,
  Sparkles,
  TrendingUp,
  X,
  Code2,
  Layers
} from "lucide-react";

type SortOption = "date" | "featured";
type ViewMode = "grid" | "list";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = ["All", ...new Set(projectsData.flatMap(project => project.tags))];
  const technologies = ["All", ...new Set(projectsData.flatMap(project => project.technologies || []))];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProjects = useMemo(() => {
    let projects = [...projectsData];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory !== "All") {
      projects = projects.filter(project => 
        project.tags.includes(selectedCategory)
      );
    }
    
    if (selectedTechnology !== "All") {
      projects = projects.filter(project => 
        project.technologies?.includes(selectedTechnology)
      );
    }
    
    return sortBy === "date" 
      ? sortProjectsByDate(projects) 
      : sortProjectsByFeatured(projects);
  }, [searchQuery, selectedCategory, selectedTechnology, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTechnology("All");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedTechnology !== "All";
  const featuredProjects = projectsData.filter(p => p.featured).length;
  const totalProjects = projectsData.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // ESC to clear search
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Portfolio Showcase</span>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                My Projects
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              Explore my collection of innovative projects, from web applications to design systems.
              Each project represents a unique challenge and creative solution.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-gray-200 dark:bg-slate-800/50 rounded-lg">
                  <Code2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalProjects}</div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">Total Projects</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-gray-200 dark:bg-slate-800/50 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{featuredProjects}</div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">Featured</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 bg-gray-200 dark:bg-slate-800/50 rounded-lg">
                  <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{technologies.length - 1}</div>
                  <div className="text-xs text-gray-600 dark:text-slate-400">Technologies</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Search & Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative z-40 mb-8"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-4">
              
              {/* Search */}
              <div className="flex-1">
                <ProjectSearch 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search projects by name, technology, or tag..."
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    showFilters || hasActiveFilters
                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                      : "bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  )}
                </button>

                <div className="h-8 w-px bg-gray-300 dark:bg-slate-700" />

                {/* Sort Options */}
                <button
                  onClick={() => setSortBy("date")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    sortBy === "date"
                      ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                      : "bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden md:inline">Latest</span>
                </button>

                <button
                  onClick={() => setSortBy("featured")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                    sortBy === "featured"
                      ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                      : "bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span className="hidden md:inline">Featured</span>
                </button>

                <div className="h-8 w-px bg-gray-300 dark:bg-slate-700" />

                {/* View Mode */}
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "grid"
                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                      : "bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === "list"
                      ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30"
                      : "bg-gray-100 dark:bg-slate-800/50 text-gray-600 dark:text-slate-400 border border-gray-300 dark:border-slate-700 hover:border-gray-400 dark:hover:border-slate-600"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, maxHeight: 0 }}
                  animate={{ opacity: 1, maxHeight: 1000 }}
                  exit={{ opacity: 0, maxHeight: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-visible"
                  style={{ overflow: 'visible' }}
                >
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-800">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-sm text-gray-600 dark:text-slate-400">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm text-gray-700 dark:text-slate-300">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")} className="hover:text-gray-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm text-gray-700 dark:text-slate-300">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="hover:text-gray-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTechnology !== "All" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm text-gray-700 dark:text-slate-300">
                Tech: {selectedTechnology}
                <button onClick={() => setSelectedTechnology("All")} className="hover:text-gray-900 dark:hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium"
            >
              Clear all
            </button>
          </motion.div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
            </h2>
            {filteredProjects.length < totalProjects && (
              <span className="text-sm text-gray-600 dark:text-slate-400">
                of {totalProjects} total
              </span>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                    layout: { duration: 0.3 }
                  }}
                  layout
                >
                  <ProjectCard 
                    project={project} 
                    viewMode={viewMode}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 mb-6">
              <Search className="w-10 h-10 text-gray-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No projects found</h3>
            <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto mb-8">
              We couldn&apos;t find any projects matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-300 dark:border-slate-700 rounded-full shadow-2xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-all group z-50"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-gray-900 dark:text-white group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}