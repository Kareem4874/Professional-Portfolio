"use client";

import { useState, useEffect } from "react";
import { ViewTransitionLink } from "@/components/animations/view-transition-link";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Palette, Rocket, ChevronDown, Star, Heart, Trophy, Coffee } from "lucide-react";
import { DownloadCVButton } from '@/components/ui/download-cv-button';
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [particleData, setParticleData] = useState<Array<{
    x: number;
    y: number;
    randomX: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);

    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Reduce particles for better performance (from 20 to 8)
    const particles = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      randomX: Math.random() * 50 - 25,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setParticleData(particles);

    // Debounce mouse move for better performance
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const skills = [
    { icon: Code2, text: "React & Next.js", color: "from-emerald-400 to-teal-400" },
    { icon: Palette, text: "UI/UX Design", color: "from-green-400 to-emerald-400" },
    { icon: Rocket, text: "Performance", color: "from-teal-400 to-cyan-400" },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Animated Grid Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
        animate={prefersReducedMotion ? {} : {
          backgroundPosition: ['0px 0px', '64px 64px'],
        }}
        transition={{
          duration: 30, // Slower = less CPU intensive
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Enhanced Floating Gradient Orbs - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {/* Reduced from 3 orbs to 2 for better performance */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 100%)',
              transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(13, 148, 136, 0.15) 50%, transparent 100%)',
              transform: `translate(${-mousePosition.x * 1.2}px, ${-mousePosition.y * 1.2}px)`,
            }}
            animate={{
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Enhanced Floating Particles - disabled for reduced motion */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {mounted && particleData.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-br from-accent to-primary rounded-full shadow-lg"
              animate={{
                y: [0, -150, 0],
                x: [0, particle.randomX * 1.5, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            {/* Enhanced Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border-2 border-accent/30 rounded-full backdrop-blur-md relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.08, borderColor: "rgba(16, 185, 129, 0.6)" }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                    "0 0 40px 10px rgba(16, 185, 129, 0.3)",
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                  ]
                }}
                transition={{ boxShadow: { duration: 3, repeat: Infinity }, scale: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-accent" />
                </motion.div>
                <span className="text-sm sm:text-base font-bold text-foreground">
                  Available for Freelance Projects
                </span>
                <motion.div
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Main Heading with 3D Effect */}
            <div className="relative mb-8">
              {/* Glowing Background Text */}
              <motion.h1
                className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold blur-2xl opacity-40"
                style={{
                  fontFamily: '"Fredericka the Great", var(--font-fredericka), cursive',
                  background: 'linear-gradient(to right, #10b981, #14b8a6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Kareem AbdulBaset
              </motion.h1>

              {/* Main Title */}
              <motion.h1
                className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight"
                style={{
                  fontFamily: '"Fredericka the Great", var(--font-fredericka), cursive',
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(16, 185, 129, 0.5)',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                >
                  Kareem
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(20, 184, 166, 0.5)',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                >
                  AbdulBaset
                </motion.span>
              </motion.h1>
            </div>

            {/* Enhanced Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="space-y-4"
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{
                  transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
                }}
              >
                <motion.span
                  className="inline-block text-black dark:text-white"
                  style={isDark ? {
                    color: 'white',
                    WebkitTextFillColor: 'white',
                  } : {
                    color: '#0a0a0a',
                    WebkitTextFillColor: '#0a0a0a',
                  }}
                >
                  Frontend Developer
                </motion.span>
                <motion.span
                  className="inline-block mx-3 text-foreground dark:text-white"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  •
                </motion.span>
                <motion.span
                  className="inline-block text-black dark:text-white"
                  style={isDark ? {
                    color: 'white',
                    WebkitTextFillColor: 'white',
                  } : {
                    color: '#0a0a0a',
                    WebkitTextFillColor: '#0a0a0a',
                  }}
                >
                  Creative Designer
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                Crafting <motion.span
                  className="text-accent font-bold"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Digital Experiences
                </motion.span> That Inspire
              </motion.p>
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              Transforming ideas into stunning, high-performance web applications
              with modern technologies and pixel-perfect design.
            </motion.p>

            {/* Enhanced Skills Tags */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 1.8 + index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.15,
                      y: -10,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full`} />
                    <div className="relative flex items-center gap-3 px-5 py-3 bg-muted/50 border-2 border-border rounded-full backdrop-blur-md hover:border-accent/50 transition-all duration-300 cursor-pointer">
                      <motion.div
                        className={`p-2 bg-gradient-to-br ${skill.color} rounded-lg shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <span className="text-sm sm:text-base font-semibold text-foreground whitespace-nowrap">
                        {skill.text}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
            >
              {/* Primary CTA with Glow */}
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />
                <MagneticButton variant="accent" size="lg" asChild strength={0.3}>
                  <ViewTransitionLink href="/projects" className="relative w-full sm:w-auto bg-accent text-background font-bold shadow-2xl">
                    <span className="flex items-center justify-center gap-2">
                      Explore My Work
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </ViewTransitionLink>
                </MagneticButton>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagneticButton variant="outline" size="lg" asChild strength={0.3}>
                  <ViewTransitionLink href="/contact" className="w-full sm:w-auto border-2 hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm">
                    <span className="flex items-center justify-center gap-2">
                      Let&apos;s Talk
                      <Mail className="w-5 h-5" />
                    </span>
                  </ViewTransitionLink>
                </MagneticButton>
              </motion.div>

              {/* Download CV */}
              {mounted && (
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.3 }}
                >
                  <DownloadCVButton />
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              className="flex items-center justify-center gap-4 pt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              {[
                { icon: Github, href: "https://github.com/Kareem4874", label: "GitHub", color: "hover:text-purple-400" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/kareem-abdulbaset-763294352/", label: "LinkedIn", color: "hover:text-blue-400" },
                { icon: Download, href: "/cv/Kareem-AbdulBaset-FlowCV-Resume-20251111.pdf", label: "Resume", color: "hover:text-green-400" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? "_blank" : undefined}
                    rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, scale: 0, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 2.7 + index * 0.1,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.3,
                      y: -15,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`group relative p-4 bg-muted/50 border-2 border-border rounded-2xl backdrop-blur-md hover:border-accent/50 transition-all duration-300 cursor-pointer ${social.color}`}
                    aria-label={social.label}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Icon className="relative w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                    <motion.div
                      className="absolute -inset-2 bg-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-16 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              {[
                { icon: Coffee, number: "1+", label: "Years Experience", color: "from-emerald-400 to-teal-400" },
                { icon: Trophy, number: "5+", label: "Projects Done", color: "from-green-400 to-emerald-400" },
                { icon: Heart, number: "6+", label: "Happy Clients", color: "from-teal-400 to-cyan-400" },
                { icon: Star, number: "1+", label: "Awards Won", color: "from-cyan-400 to-emerald-400" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: 3.2 + index * 0.1,
                      duration: 0.8,
                      type: "spring"
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -15,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                    className="group relative"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
                    <div className="relative p-6 bg-muted/50 border-2 border-border rounded-2xl backdrop-blur-md hover:border-accent/50 transition-all duration-300 cursor-pointer">
                      <motion.div
                        className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.div
                        className="text-4xl md:text-5xl font-bold text-foreground"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 3.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        {stat.number}
                      </motion.div>
                      <motion.div
                        className="text-sm font-medium text-muted-foreground mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.4 + index * 0.1 }}
                      >
                        {stat.label}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Enhanced Scroll Indicator */}
            <motion.div
              className="pt-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.6, duration: 0.8 }}
            >
              <motion.div
                className="inline-flex flex-col items-center gap-4 cursor-pointer group"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="text-sm font-bold text-accent uppercase tracking-wider"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Scroll to Explore
                </motion.span>
                <motion.div
                  className="relative w-8 h-14 border-2 border-accent/50 rounded-full flex items-center justify-center group-hover:border-accent transition-colors duration-300 bg-accent/5 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                      opacity: [1, 0.3, 1],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-accent" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 border-2 border-accent/30 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}