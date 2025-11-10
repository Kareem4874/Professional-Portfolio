"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart, 
  ArrowUp,
  Sparkles,
  Code,
  Briefcase,
  MapPin,
  Send,
  ExternalLink,
  MessageSquare,
  FileText,
  Shield,
  Cookie,
  ChevronRight,
  Zap
} from "lucide-react";

const socialLinks = [
  { 
    icon: Github, 
    href: "https://github.com/Kareem4874", 
    label: "GitHub",
    username: "@Kareem4874",
    color: "from-gray-600 to-gray-800"
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/kareem-abdulbaset-763294352/", 
    label: "LinkedIn",
    username: "Kareem AbdulBaset",
    color: "from-blue-600 to-blue-800"
  },
  { 
    icon: Mail, 
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=karemebrahim484@gmail.com&su=Hello%20Kareem&body=Hi%20Kareem,%0A%0AI%20wanted%20to%20reach%20out%20to%20you...", 
    label: "Email Me",
    username: "karemebrahim484@gmail.com",
    color: "from-emerald-600 to-teal-700",
    isEmail: true
  },
];

const navigationSections = [
  {
    title: "Explore",
    icon: Sparkles,
    links: [
      { name: "Home", href: "/", icon: Zap },
      { name: "About Me", href: "/#about", icon: Code },
      { name: "My Skills", href: "/skills", icon: Briefcase },
      { name: "Projects", href: "/projects", icon: FileText },
    ]
  },
  {
    title: "Resources",
    icon: FileText,
    links: [
      { name: "Blog", href: "/blog", icon: MessageSquare },
      { name: "Case Studies", href: "/case-studies", icon: FileText },
      { name: "Contact", href: "/contact", icon: Send },
      { name: "Newsletter", href: "/newsletter", icon: Mail },
    ]
  },
  {
    title: "Legal",
    icon: Shield,
    links: [
      { name: "Privacy Policy", href: "/privacy", icon: Shield },
      { name: "Terms of Service", href: "/terms", icon: FileText },
      { name: "Cookie Policy", href: "/cookies", icon: Cookie },
    ]
  }
];

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand Section - Larger on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Logo & Brand */}
              <div className="space-y-6">
                <motion.div 
                  className="inline-flex items-center gap-4 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    {/* Logo Container */}
                    <div className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-4 rounded-2xl shadow-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-2xl font-mono">&lt;/&gt;</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                      Kareem AbdulBaset
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Code className="w-3.5 h-3.5" />
                      Frontend Developer
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed max-w-md text-sm lg:text-base">
                  Crafting exceptional digital experiences with modern web technologies. 
                  Specialized in React, Next.js, and creating pixel-perfect, performant interfaces.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 p-2 rounded-lg">
                          <Briefcase className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">5+</p>
                          <p className="text-xs text-slate-500">Projects</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500/10 p-2 rounded-lg">
                          <Code className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">1+</p>
                          <p className="text-xs text-slate-500">Years Exp</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Location & Status */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>Cairo, Egypt</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-emerald-400 font-medium">Available for hire</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
              {navigationSections.map((section, sectionIdx) => (
                <motion.nav
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
                  className="space-y-6"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800/50">
                    <section.icon className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      {section.title}
                    </h4>
                  </div>

                  {/* Links */}
                  <ul className="space-y-3">
                    {section.links.map((link, linkIdx) => {
                      const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:') || link.href.startsWith('//');
                      
                      // Handle hash links (like /#about) - split into path and hash
                      let path = link.href;
                      let hash = '';
                      if (link.href.includes('#')) {
                        const parts = link.href.split('#');
                        path = parts[0] || '/';
                        hash = parts[1] || '';
                      }
                      
                      if (isExternal) {
                        return (
                          <motion.li
                            key={link.name}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (sectionIdx * 0.1) + (linkIdx * 0.05) }}
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                              <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                              <span className="text-sm group-hover:translate-x-1 transition-transform inline-block">
                                {link.name}
                              </span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </motion.li>
                        );
                      }
                      
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (sectionIdx * 0.1) + (linkIdx * 0.05) }}
                        >
                          <Link
                            href={link.href}
                            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                            onClick={(e) => {
                              // Handle hash links smoothly without refresh
                              if (hash) {
                                const currentPath = window.location.pathname;
                                // If we're on the same page, just scroll
                                if (path === currentPath || (path === '/' && currentPath === '/')) {
                                  e.preventDefault();
                                  const element = document.getElementById(hash);
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                    // Update URL without refresh
                                    window.history.pushState(null, '', link.href);
                                  }
                                }
                                // If different page, let Link handle navigation naturally
                              }
                            }}
                          >
                            <link.icon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                            <span className="text-sm group-hover:translate-x-1 transition-transform inline-block">
                              {link.name}
                            </span>
                            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.nav>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 lg:mt-24"
          >
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-white mb-2">Let&apos;s Connect</h4>
              <p className="text-slate-400 text-sm">Follow me for updates and insights</p>
            </div>

            {/* Social Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative overflow-hidden"
                >
                  {/* Background Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  
                  {/* Card */}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 group-hover:border-slate-700/50 p-6 rounded-2xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${social.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <social.icon className="w-6 h-6 text-white" />
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    
                    <div>
                      <p className="text-white font-semibold mb-1">{social.label}</p>
                      <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors truncate">
                        {social.username}
                      </p>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider with Animation */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <motion.div 
              className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className="relative flex justify-center">
            <motion.div 
              className="bg-slate-900 px-6 py-2 rounded-full border border-slate-800/50"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pb-12 flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500 text-center lg:text-left">
            <p className="flex items-center gap-2 flex-wrap justify-center">
              <span>© {currentYear}</span>
              <span className="font-semibold text-emerald-400">Kareem AbdulBaset</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                Made with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                </motion.span>
                and
                <code className="px-2 py-1 rounded-lg bg-slate-800/50 text-emerald-400 text-xs font-mono border border-slate-700/50">
                  Next.js 16
                </code>
              </span>
            </p>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-slate-900 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">R</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-slate-900 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">N</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-slate-900 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">T</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">React • Next.js • TypeScript</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 group"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* Button */}
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-500 p-4 rounded-2xl shadow-2xl border border-emerald-400/20">
              <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
            </div>
            
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 right-0 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Back to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </footer>
  );
}

// Demo
export default function Demo() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="h-[100vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Scroll Down</h1>
          <p className="text-slate-400">To see the footer</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}