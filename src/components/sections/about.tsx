"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';

const timelineData = [
  {
    year: "2022",
    title: "University Graduate - The Beginning",
    description: "Graduated from university and immediately entered the Software Engineering field driven by pure passion and love for programming. This was the moment my professional journey began.",
    icon: "🎓",
    color: "from-blue-500 to-cyan-500",
    stats: { 
      status: "Graduate", 
      passion: "100%" 
    }
  },
  {
    year: "2022-2024",
    title: "Deep Foundation with C++",
    description: "Started my Software Engineering journey by studying C++ fundamentals and algorithms. Earned 4 professional certificates from Programming Advices, mastering the core principles of programming and problem-solving at a deep level.",
    icon: "⚙️",
    color: "from-orange-500 to-red-500",
    stats: { 
      certificates: "4", 
      mastery: "C++ & DSA" 
    },
    certificates: [
      "Algorithms & Problem Solving Level 1",
      "Algorithms & Problem Solving Level 2", 
      "Algorithms & Problem Solving Level 3",
      "Introduction to Programming Using C++ Level 2"
    ]
  },
  {
    year: "2025",
    title: "Frontend Mastery - React & Next.js",
    description: "Studied Frontend Development with Route Academy, specializing in React and Next.js with all web fundamentals. Built 5+ real-world projects showcasing expertise in modern web technologies, APIs integration, and authentication systems.",
    icon: "⚛️",
    color: "from-purple-500 to-pink-500",
    stats: { 
      projects: "5+", 
      academy: "Route" 
    },
    skills: ["React", "Next.js", "Next Auth", "HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS", "REST APIs"],
    projects: [
      { name: "E-Commerce Platform", tech: "Next.js + Next Auth", desc: "Full-featured online store with authentication" },
      { name: "Information Tech Sharing Platform", tech: "React", desc: "Community platform for tech enthusiasts" },
      { name: "Weather Application", tech: "HTML/CSS/JS + Bootstrap", desc: "Demonstrates API integration mastery" },
      { name: "Product Management System", tech: "HTML/CSS/JS", desc: "Professional inventory system for businesses" },
      { name: "Personal Portfolio", tech: "Next.js 16", desc: "Modern portfolio with latest technologies" }
    ]
  },
  {
    year: "2026-Present",
    title: "Backend & Full-Stack Architect Path",
    description: "Currently studying Node.js backend development to become a Full-Stack developer. Planning to learn Angular alongside React to expand my frontend expertise. Leveraging AI professionally with flowchart-driven planning and systematic task implementation.",
    icon: "🚀",
    color: "from-green-500 to-emerald-600",
    stats: { 
      current: "Node.js", 
      goal: "Full-Stack" 
    },
    skills: ["Node.js (Learning)", "Angular (Planned)", "AI Integration", "Flowchart Planning", "System Architecture"]
  }
];

type TimelineItemType = typeof timelineData[number];

const skills = [
  { name: "Next.js", level: 90, icon: "⚡", category: "frontend" },
  { name: "React", level: 90, icon: "⚛️", category: "frontend" },
  { name: "TypeScript", level: 85, icon: "📘", category: "frontend" },
  { name: "JavaScript", level: 95, icon: "💛", category: "frontend" },
  { name: "Tailwind", level: 90, icon: "🎨", category: "frontend" },
  { name: "Node.js", level: 75, icon: "🟢", category: "backend" },
  { name: "C++", level: 85, icon: "⚙️", category: "fundamentals" },
  { name: "Git", level: 90, icon: "🐙", category: "tools" },
  { name: "REST APIs", level: 90, icon: "🔌", category: "integration" },
  { name: "AI Tools", level: 95, icon: "🤖", category: "tools" }
];

function TimelineItem({ item, index, isLast }: { item: TimelineItemType; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="relative"
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-20 top-0 md:top-auto"
        whileInView={{ scale: [0, 1.2, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl sm:text-3xl shadow-2xl border-2 md:border-4 border-border`}
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {item.icon}
        </motion.div>
        
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-30`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Content card */}
      <div className="pl-20 md:pl-0 md:grid md:grid-cols-2 gap-4 md:gap-8">
        <div className={`${index % 2 === 0 ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16 md:col-start-2'}`}>
          <motion.div
            className="bg-muted/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-border relative group"
            whileHover={{ borderColor: `rgb(${index % 2 === 0 ? '59, 130, 246' : '168, 85, 247'})`, scale: 1.02 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 blur-2xl`}
              transition={{ duration: 0.5 }}
            />

            {/* Year badge */}
            <motion.div
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r ${item.color} rounded-full text-white font-bold text-xs sm:text-sm shadow-lg`}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {item.year}
            </motion.div>

            <div className="relative z-10">
              <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent pr-28 sm:pr-32 md:pr-24`}>
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Stats */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                {Object.entries(item.stats).map(([key, value], i) => (
                  <motion.div
                    key={key}
                    className="flex-1 p-3 sm:p-4 bg-muted/50 rounded-lg sm:rounded-xl border border-border"
                    whileHover={{ y: -5, borderColor: "rgb(59, 130, 246)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-1`}>
                      {String(value)}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{key}</div>
                  </motion.div>
                ))}
              </div>

              {/* Skills tags */}
              {item.skills && (
                <div className="mb-4 pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Key Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill: string, i: number) => (
                      <motion.span
                        key={i}
                        className={`px-3 py-1 bg-gradient-to-r ${item.color} bg-opacity-10 border border-opacity-30 rounded-full text-xs font-medium text-foreground`}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates list */}
              {item.certificates && (
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🏆</span>
                    <span>Certifications</span>
                  </div>
                  <div className="space-y-2">
                    {item.certificates.map((cert: string, i: number) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2 text-sm"
                        initial={{ opacity: 1, x: 0 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-foreground">{cert}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects list */}
              {item.projects && (
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>🚀</span>
                    <span>Real-World Projects</span>
                  </div>
                  <div className="space-y-3">
                    {item.projects?.map((project: { name: string; tech: string; desc: string }, i: number) => (
                      <motion.div
                        key={i}
                        className="bg-muted/30 rounded-lg p-3 border border-border/50 hover:border-blue-500/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">▹</span>
                          <div className="flex-1">
                            <div className="text-foreground font-semibold text-sm mb-1">{project.name}</div>
                            <div className="text-muted-foreground text-xs mb-1">{project.desc}</div>
                            <div className="text-blue-400 text-xs font-mono">Tech: {project.tech}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Connecting line */}
      {!isLast && (
        <motion.div
          className="absolute left-7 md:left-1/2 top-12 md:top-16 h-full w-0.5 md:w-1 bg-gradient-to-b from-blue-500/50 to-transparent transform md:-translate-x-1/2 z-10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ originY: 0 }}
        />
      )}
    </motion.div>
  );
}

function SkillBubble({ skill, index }: { skill: { name: string; level: number; icon: string; category: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors: { [key: string]: string } = {
    frontend: "from-blue-500 to-cyan-500",
    backend: "from-green-500 to-emerald-500",
    fundamentals: "from-orange-500 to-red-500",
    tools: "from-purple-500 to-pink-500",
    integration: "from-yellow-500 to-orange-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${categoryColors[skill.category]} rounded-full blur-xl opacity-0`}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
      />

      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-muted/50 backdrop-blur-sm rounded-full flex flex-col items-center justify-center border border-border cursor-pointer"
        whileHover={{ scale: 1.1, borderColor: "rgb(59, 130, 246)" }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 2 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">{skill.icon}</div>
        <div className="text-foreground font-bold text-xs sm:text-sm text-center px-1">{skill.name}</div>
        <motion.div
          className="text-xs text-blue-400 font-semibold"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          {skill.level}%
        </motion.div>

        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            fill="none"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke={`url(#gradient-${index})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: skill.level / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.1 }}
          />
          <defs>
            <linearGradient id={`gradient-${index}`}>
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-visible relative">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 sm:mb-24 md:mb-32"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block mb-4 sm:mb-6 md:mb-8"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">🎯</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-bold mb-3 sm:mb-4 md:mb-6 px-4">
            <motion.span
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              My Journey
            </motion.span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4 leading-relaxed">
            From university graduate to full-stack architect - driven by passion, 
            built on fundamentals, powered by continuous learning
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-16 sm:space-y-24 md:space-y-32 mb-16 sm:mb-24 md:mb-32">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>

        {/* Skills Arsenal */}
        <motion.div
          className="mb-16 sm:mb-24 md:mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Arsenal
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 justify-items-center px-2 sm:px-4">
            {skills.map((skill, index) => (
              <SkillBubble key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* AI & Strategic Approach */}
        <motion.div
          className="bg-muted/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-border relative overflow-hidden mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ borderColor: "rgb(139, 92, 246)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6 text-center"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🤖
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 text-center px-2">
              AI-Powered Development Strategy
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 sm:mb-7 md:mb-8 leading-relaxed text-center px-2">
              I leverage AI tools professionally with a strategic, systematic approach. Every project starts with 
              meticulous planning using flowcharts, breaking down complex systems into manageable tasks, 
              then implementing each component with precision. I discuss every detail with AI models to ensure 
              the strongest design and optimal performance for each project component.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: "📊", title: "Flowchart Planning", desc: "Visual project architecture" },
                { icon: "🎯", title: "Task Division", desc: "Breaking complex into simple" },
                { icon: "⚙️", title: "Systematic Implementation", desc: "Step-by-step execution" },
                { icon: "🔍", title: "AI Collaboration", desc: "Strategic model discussions" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-muted/30 p-4 rounded-xl border border-border text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgb(139, 92, 246)" }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-bold text-foreground mb-1">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Personal Touch */}
        <motion.div
          className="bg-muted/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-border relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ borderColor: "rgb(59, 130, 246)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5 md:mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              💡
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-2">
              Never Stop Learning
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-6 sm:mb-7 md:mb-8 leading-relaxed px-2">
              Passionate about continuous learning and deepening my expertise in programming fundamentals. 
              I believe in building rock-solid foundations before specializing. My goal is to become a complete 
              Full-Stack Architect who can design and implement robust, scalable systems from conception to deployment.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-7 md:mb-8 px-2">
              {["🎓 Continuous Learning", "💪 Strong Fundamentals", "🏗️ System Architecture", "🚀 Innovation", "🤝 Collaboration", "📈 Growth Mindset"].map((interest, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-medium text-xs sm:text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>

            <Link href="/contact">
              <motion.button
                className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-sm sm:text-base md:text-lg rounded-full relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["0%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="relative z-10">Let&apos;s Build Something Amazing 🚀</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}