"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProjectSearch({ 
  value, 
  onChange, 
  placeholder = "Search by name, technology, or tag..." 
}: ProjectSearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // ESC to clear search
      if (e.key === 'Escape' && value) {
        onChange("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl group"
    >
      {/* Gradient Background Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transition-opacity duration-300"
        animate={{ 
          opacity: isFocused ? 1 : 0.3,
          scale: isFocused ? 1.05 : 1
        }}
      />
      
      <div className="relative">
        {/* Decorative Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-purple-500/50 rounded-tr-xl" />
        
        {/* Main Search Container */}
        <div className={`relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isFocused 
            ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/20' 
            : 'border-gray-300 dark:border-slate-700/50 hover:border-gray-400 dark:hover:border-slate-600'
        }`}>
          
          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Search Icon Container */}
          <motion.div 
            className="relative flex items-center justify-center w-14 h-14 ml-2"
            animate={{ 
              scale: isFocused ? 1.1 : 1,
              rotate: isFocused ? 360 : 0
            }}
            transition={{ 
              scale: { duration: 0.3 },
              rotate: { duration: 0.5 }
            }}
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-xl blur-md transition-all duration-300 ${
                isFocused 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-500' 
                  : 'bg-gray-300 dark:bg-slate-700/50'
              }`} />
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-800/80">
                <Search className={`h-5 w-5 transition-colors duration-300 ${
                  isFocused ? 'text-cyan-400' : 'text-gray-600 dark:text-slate-400'
                }`} />
              </div>
            </div>
          </motion.div>
          
          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="relative flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-slate-500 outline-none text-base font-medium"
          />
          
          {/* Results Counter */}
          <AnimatePresence>
            {value && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="flex items-center gap-2 px-3"
              >
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Searching</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Clear Button */}
          <AnimatePresence>
            {value && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onChange("")}
                className="relative flex items-center justify-center w-10 h-10 mr-2 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 hover:border-red-500/50 transition-all group/clear"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl opacity-0 group-hover/clear:opacity-20 transition-opacity"
                />
                <X className="relative h-4 w-4 text-red-400 group-hover/clear:text-red-300 transition-colors" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom Decorative Accents */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-xl" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-purple-500/50 rounded-br-xl" />
      </div>
      
      {/* Keyboard Shortcut Hint */}
      <AnimatePresence>
        {!isFocused && !value && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2"
          >
            <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700/50 rounded-lg">
              <kbd className="text-xs font-semibold text-gray-600 dark:text-slate-400">Ctrl</kbd>
              <span className="text-xs text-gray-400 dark:text-slate-600">+</span>
              <kbd className="text-xs font-semibold text-gray-600 dark:text-slate-400">K</kbd>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active Search Indicator */}
      <AnimatePresence>
        {value && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -bottom-8 left-0 right-0 text-center"
          >
            <p className="text-xs text-gray-500 dark:text-slate-500">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded text-gray-600 dark:text-slate-400">ESC</kbd> to clear
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}