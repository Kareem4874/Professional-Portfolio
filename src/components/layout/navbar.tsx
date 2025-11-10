"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Code, Briefcase, FileText, Mail } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Navbar Container */}
      <motion.header
        role="banner"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-2xl shadow-accent/10 border-b border-accent/20"
            : "bg-transparent"
        }`}
      >
        <nav 
          role="navigation"
          aria-label="Main navigation"
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo with Gradient Animation */}
            <Link 
              href="/" 
              className="relative group flex-shrink-0"
              aria-label="Go to homepage"
            >
              <motion.div 
                className="flex items-center gap-2 sm:gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-lg blur-lg opacity-75"
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="relative bg-gradient-to-br from-accent to-primary p-1.5 sm:p-2 rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white font-bold text-lg sm:text-xl font-mono">&lt;/&gt;</span>
                  </motion.div>
                </div>
                <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent group-hover:opacity-80 transition-all duration-300">
                  Kareem AbdulBaset
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on tablet and below */}
            <ul 
              role="menubar"
              className="hidden lg:flex items-center gap-1 xl:gap-2"
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.name}
                    role="none"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      role="menuitem"
                      aria-label={`Go to ${item.name} page`}
                      onClick={() => setActiveItem(index)}
                      className="relative group px-3 xl:px-4 py-2 block"
                    >
                      <motion.div 
                        className="flex items-center gap-1.5 xl:gap-2 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 12 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                        </motion.div>
                        <span className="text-sm xl:text-base font-medium bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                          {item.name}
                        </span>
                      </motion.div>
                      
                      {/* Animated Underline */}
                      <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                      
                      {/* Active Indicator */}
                      {activeItem === index && (
                        <motion.span 
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          aria-hidden="true"
                        />
                      )}
                      
                      {/* Hover Glow Effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg -z-10"
                        initial={{ backgroundColor: "rgba(16, 185, 129, 0)" }}
                        whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Desktop Actions - Hidden on tablet and below */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThemeToggle />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  aria-label="Contact me - Let's talk"
                  className="relative px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold text-gray-900 dark:text-white overflow-hidden rounded-full group block"
                >
                  <motion.div 
                    className="absolute inset-0 bg-accent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-accent blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden="true"
                  />
                  <motion.span 
                    className="relative z-10 flex items-center gap-1.5 xl:gap-2"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Let&apos;s Talk
                    <motion.svg 
                      className="w-3.5 h-3.5 xl:w-4 xl:h-4" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Tablet & Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              {/* Theme Toggle for Tablet & Mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 group overflow-hidden"
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                
                {/* Animated gradient background */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/10 to-accent/20 rounded-xl"
                  animate={{ 
                    background: isOpen 
                      ? "linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.2), rgba(4, 120, 87, 0.3))"
                      : "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1), rgba(4, 120, 87, 0.2))"
                  }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
                
                {/* Hover glow */}
                <motion.div 
                  className="absolute inset-0 bg-accent/20 rounded-xl blur opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
                
                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-accent" strokeWidth={2.5} aria-hidden="true" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-accent" strokeWidth={2.5} aria-hidden="true" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </div>
          </div>

          {/* Mobile & Tablet Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden bg-gradient-to-b from-background/50 to-background/95 backdrop-blur-xl border-b border-accent/10"
              >
                <ul 
                  role="menu"
                  className="py-3 sm:py-4 px-2 space-y-1"
                >
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.name}
                        role="none"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -30, opacity: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          role="menuitem"
                          aria-label={`Go to ${item.name} page`}
                          onClick={() => {
                            setActiveItem(index);
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-3 sm:py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
                        >
                          {/* Background hover effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100"
                            initial={false}
                            transition={{ duration: 0.3 }}
                            aria-hidden="true"
                          />
                          
                          {/* Icon with gradient background */}
                          <motion.div 
                            className="relative p-2 sm:p-2.5 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 shadow-lg shadow-accent/5"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent relative z-10" aria-hidden="true" />
                          </motion.div>
                          
                          {/* Text with gradient */}
                          <div className="flex-1 relative z-10">
                            <span className="font-semibold text-sm sm:text-base bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent block">
                              {item.name}
                            </span>
                          </div>
                          
                          {/* Arrow indicator */}
                          <motion.div
                            className="relative z-10"
                            initial={{ x: -5, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden="true"
                          >
                            <svg 
                              className="w-4 h-4 sm:w-5 sm:h-5 text-accent" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </Link>
                      </motion.li>
                    );
                  })}

                  {/* Mobile CTA */}
                  <motion.li
                    role="none"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                    className="px-2 pt-3 pb-2"
                  >
                    <Link
                      href="/contact"
                      aria-label="Contact me - Let's talk"
                      onClick={() => setIsOpen(false)}
                      className="relative overflow-hidden flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 font-bold text-sm sm:text-base text-gray-900 dark:text-white rounded-2xl group"
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500"
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{ backgroundSize: "200% 200%" }}
                        aria-hidden="true"
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 blur-xl opacity-0 group-hover:opacity-50"
                        transition={{ duration: 0.3 }}
                        aria-hidden="true"
                      />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        Let&apos;s Talk
                        <motion.svg 
                          className="w-4 h-4 sm:w-5 sm:h-5" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                    </Link>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}