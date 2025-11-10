"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, Check, ChevronDown } from "lucide-react";

interface ProjectFiltersProps {
  categories: string[];
  technologies: string[];
  selectedCategory: string;
  selectedTechnology: string;
  onCategoryChange: (category: string) => void;
  onTechnologyChange: (tech: string) => void;
  onReset: () => void;
}

export function ProjectFilters({
  categories,
  technologies,
  selectedCategory,
  selectedTechnology,
  onCategoryChange,
  onTechnologyChange,
  onReset,
}: ProjectFiltersProps) {
  const [searchTech, setSearchTech] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsCategoryOpen(false);
        setIsTechOpen(false);
      }
    };

    if (isCategoryOpen || isTechOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isCategoryOpen, isTechOpen]);

  const hasFilters = selectedCategory !== "All" || selectedTechnology !== "All";

  const filteredTechnologies = technologies.filter(tech =>
    tech.toLowerCase().includes(searchTech.toLowerCase())
  );

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6 sm:mb-8"
      >
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl blur-xl" />
        
        <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-700/50">
          {/* Decorative Top Border */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl sm:rounded-t-3xl" />
          
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <motion.div 
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                >
                  <div className="absolute inset-0.5 bg-slate-900 rounded-lg sm:rounded-xl" />
                  <Filter className="relative h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                </motion.div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Filter Projects
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Find exactly what you&apos;re looking for</p>
                </div>
              </div>
              
              <AnimatePresence>
                {hasFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg sm:rounded-xl shadow-lg shadow-red-500/30 transition-all"
                  >
                    <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Clear All</span>
                    <span className="sm:hidden">Clear</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Filters Grid - Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              
              {/* Category Filter */}
              <div className="relative dropdown-container" style={{ zIndex: isCategoryOpen ? 45 : 40 }}>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Category
                </label>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCategoryOpen(!isCategoryOpen);
                    setIsTechOpen(false);
                  }}
                  className={`w-full group relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                    selectedCategory !== "All"
                      ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 text-blue-300 shadow-lg shadow-blue-500/20"
                      : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 text-slate-200"
                  }`}
                >
                  <span className="text-sm sm:text-base font-semibold truncate pr-2">{selectedCategory}</span>
                  <motion.div
                    animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 p-1 rounded-lg ${selectedCategory !== "All" ? "bg-blue-500/20" : "bg-slate-700/50"}`}
                  >
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 right-0 mt-2 sm:mt-3 bg-slate-900 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)] border-2 border-slate-700 overflow-hidden z-[45] max-w-full"
                      onClick={(e) => e.stopPropagation()}
                      style={{ minWidth: '100%' }}
                    >
                      <div className="p-2 max-h-60 sm:max-h-72 overflow-y-auto custom-scrollbar">
                        {categories.map((category, idx) => (
                          <motion.button
                            key={category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onCategoryChange(category);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                              selectedCategory === category
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                                : "hover:bg-slate-700/60 text-slate-300 hover:text-white"
                            }`}
                          >
                            <span className="truncate">{category}</span>
                            {selectedCategory === category && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-white/20 rounded-full p-0.5 flex-shrink-0 ml-2"
                              >
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technology Filter */}
              <div className="relative dropdown-container" style={{ zIndex: isTechOpen ? 45 : 40 }}>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Technology
                </label>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTechOpen(!isTechOpen);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full group relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                    selectedTechnology !== "All"
                      ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/20"
                      : "bg-slate-800/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/70 text-slate-200"
                  }`}
                >
                  <span className="text-sm sm:text-base font-semibold truncate pr-2">
                    {selectedTechnology === "All" ? "All Technologies" : selectedTechnology}
                  </span>
                  <motion.div
                    animate={{ rotate: isTechOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 p-1 rounded-lg ${selectedTechnology !== "All" ? "bg-purple-500/20" : "bg-slate-700/50"}`}
                  >
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isTechOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 right-0 mt-2 sm:mt-3 bg-slate-900 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-[0_20px_80px_-15px_rgba(0,0,0,0.9)] border-2 border-slate-700 overflow-hidden z-[45] max-w-full"
                      onClick={(e) => e.stopPropagation()}
                      style={{ minWidth: '100%' }}
                    >
                      {/* Search Box */}
                      <div className="p-3 sm:p-4 border-b border-slate-700 bg-slate-950 sticky top-0 z-[5]">                      
                        <div className="relative">
                          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search technologies..."
                            value={searchTech}
                            onChange={(e) => setSearchTech(e.target.value)}
                            className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-200 placeholder:text-slate-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>

                      {/* Technologies List */}
                      <div className="p-2 max-h-56 sm:max-h-64 overflow-y-auto custom-scrollbar">
                        {filteredTechnologies.length > 0 ? (
                          filteredTechnologies.map((tech, idx) => (
                            <motion.button
                              key={tech}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.02 }}
                              whileHover={{ scale: 1.02, x: 4 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onTechnologyChange(tech);
                                setIsTechOpen(false);
                                setSearchTech("");
                              }}
                              className={`w-full flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                selectedTechnology === tech
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                                  : "hover:bg-slate-700/60 text-slate-300 hover:text-white"
                              }`}
                            >
                              <span className="truncate">{tech}</span>
                              {selectedTechnology === tech && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="bg-white/20 rounded-full p-0.5 flex-shrink-0 ml-2"
                                >
                                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </motion.div>
                              )}
                            </motion.button>
                          ))
                        ) : (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-4 py-6 sm:py-8 text-center"
                          >
                            <Search className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 sm:mb-3 text-slate-600" />
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">No technologies found</p>
                            <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Active Filters */}
            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-800/50"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Filters:</span>
                    
                    {selectedCategory !== "All" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 text-blue-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-lg shadow-blue-500/10"
                      >
                        <span className="truncate max-w-[120px] sm:max-w-none">{selectedCategory}</span>
                        <button 
                          onClick={() => onCategoryChange("All")} 
                          className="hover:bg-blue-500/30 rounded-full p-0.5 sm:p-1 transition-colors flex-shrink-0"
                        >
                          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                      </motion.div>
                    )}
                    
                    {selectedTechnology !== "All" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 text-purple-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/10"
                      >
                        <span className="truncate max-w-[120px] sm:max-w-none">{selectedTechnology}</span>
                        <button 
                          onClick={() => onTechnologyChange("All")} 
                          className="hover:bg-purple-500/30 rounded-full p-0.5 sm:p-1 transition-colors flex-shrink-0"
                        >
                          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
          
          @media (min-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
          }

          .dropdown-container {
            position: relative;
            isolation: isolate;
          }

          /* Ensure dropdowns work properly on all screen sizes */
          @media (max-width: 1023px) {
            .dropdown-container {
              z-index: 40;
            }
          }
          
          /* Mobile optimization */
          @media (max-width: 639px) {
            .dropdown-container > div[class*="absolute"] {
              left: 0 !important;
              right: 0 !important;
              width: 100% !important;
              max-width: 100% !important;
            }
          }

          /* Ensure parent containers don't clip dropdowns */
          .dropdown-container {
            will-change: z-index;
          }
          
          .dropdown-container > div[class*="absolute"] {
            will-change: transform, opacity;
          }
        `}</style>
      </motion.div>
    </>
  );
}

// Demo Component
export default function Demo() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechnology, setSelectedTechnology] = useState("All");

  const categories = [
    "All",
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Backend Systems",
    "DevOps"
  ];

  const technologies = [
    "All",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "AWS",
    "Firebase",
    "GraphQL",
    "Redux",
    "Vue.js",
    "Angular"
  ];

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedTechnology("All");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Project Filters
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg">
            Mobile-optimized dropdown filters
          </p>
        </div>

        <ProjectFilters
          categories={categories}
          technologies={technologies}
          selectedCategory={selectedCategory}
          selectedTechnology={selectedTechnology}
          onCategoryChange={setSelectedCategory}
          onTechnologyChange={setSelectedTechnology}
          onReset={handleReset}
        />

        {/* Demo Content */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 bg-slate-800/50 rounded-xl sm:rounded-2xl border border-slate-700/50">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Selected Filters:</h3>
          <div className="space-y-2 text-sm sm:text-base text-slate-300">
            <p>Category: <span className="text-blue-400 font-medium">{selectedCategory}</span></p>
            <p>Technology: <span className="text-purple-400 font-medium">{selectedTechnology}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}