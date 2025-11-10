"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  gradient: string;
  gradientColors: { start: string; middle: string; end: string };
  blob: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    category: "Frontend Magic",
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    gradientColors: { start: "#3b82f6", middle: "#8b5cf6", end: "#ec4899" },
    blob: "M43.5,-76.7C56.9,-69.6,68.7,-59.3,76.3,-46.3C83.9,-33.3,87.3,-16.6,86.9,-0.3C86.5,16.1,82.3,32.1,74.3,45.5C66.3,58.9,54.5,69.7,41,76.8C27.5,83.9,12.3,87.3,-3.7,87.1C-19.7,86.9,-39.4,83.1,-54.7,74.7C-70,66.3,-80.9,53.3,-87.3,38C-93.7,22.7,-95.6,5.1,-93,-11.7C-90.4,-28.5,-83.3,-44.5,-72.3,-57.7C-61.3,-70.9,-46.4,-81.3,-31.1,-87.3C-15.8,-93.3,0,-95,14.7,-91.4C29.4,-87.8,30.1,-83.8,43.5,-76.7Z",
    skills: [
      { name: "Next.js", level: 85, icon: "⚡", desc: "App Router & SSR" },
      { name: "React", level: 80, icon: "⚛️", desc: "Hooks & Components" },
      { name: "TypeScript", level: 75, icon: "📘", desc: "Type Safety" },
      { name: "Tailwind", level: 85, icon: "🎨", desc: "Utility-first CSS" },
    ]
  },
  {
    category: "Backend Power",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    gradientColors: { start: "#22c55e", middle: "#10b981", end: "#14b8a6" },
    blob: "M39.3,-65.3C51.2,-58.7,61.3,-48.9,68.3,-37.1C75.3,-25.3,79.2,-11.5,79.1,0.3C79,12.1,74.9,24.2,67.5,34.7C60.1,45.2,49.4,54.1,37.3,61.3C25.2,68.5,11.7,74,-2.7,78.3C-17.1,82.6,-32.8,85.7,-46.3,81.3C-59.8,76.9,-71.1,65,-77.8,51C-84.5,37,-86.6,20.9,-84.9,5.7C-83.2,-9.5,-77.7,-23.8,-69.3,-36.1C-60.9,-48.4,-49.6,-58.7,-36.8,-64.7C-24,-70.7,-9.8,-72.4,3.1,-77.3C16,-82.2,27.4,-71.9,39.3,-65.3Z",
    skills: [
      { name: "Node.js", level: 70, icon: "🟢", desc: "Express & APIs" },
      { name: "PostgreSQL", level: 65, icon: "🐘", desc: "Relational DB" },
      { name: "MongoDB", level: 60, icon: "🍃", desc: "NoSQL Database" },
      { name: "GraphQL", level: 50, icon: "◇", desc: "Query Language" },
    ]
  },
  {
    category: "DevOps & Tools",
    gradient: "from-orange-500 via-red-500 to-pink-500",
    gradientColors: { start: "#f97316", middle: "#ef4444", end: "#ec4899" },
    blob: "M44.3,-76.8C57.5,-69.2,68.1,-57.2,75.3,-43.3C82.5,-29.4,86.3,-13.6,86.4,0.2C86.5,14,82.9,28,75.5,40.4C68.1,52.8,56.9,63.6,43.8,70.7C30.7,77.8,15.6,81.2,0.3,80.6C-15,80,-30,75.4,-43.4,68.1C-56.8,60.8,-68.6,50.8,-76.5,38.1C-84.4,25.4,-88.4,10,-87.6,-5.1C-86.8,-20.2,-81.2,-34.9,-72.3,-47.5C-63.4,-60.1,-51.2,-70.6,-37.5,-77.9C-23.8,-85.2,-9.5,-89.3,4.3,-95.7C18.1,-102.1,31.1,-84.4,44.3,-76.8Z",
    skills: [
      { name: "Git", level: 80, icon: "🐙", desc: "Version Control" },
      { name: "VS Code", level: 85, icon: "💻", desc: "Code Editor" },
      { name: "Vercel", level: 75, icon: "▲", desc: "Deployment" },
      { name: "Figma", level: 70, icon: "🎨", desc: "UI/UX Design" },
    ]
  }
];

interface LiquidSkillCardProps extends SkillCategory {
  index: number;
}

function LiquidSkillCard({ category, gradient, gradientColors, blob, skills, index }: LiquidSkillCardProps) {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 80
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="relative group"
    >
      {/* Animated blob background */}
      <motion.div
        className="absolute -inset-4"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full opacity-20">
          <defs>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors.start} />
              <stop offset="50%" stopColor={gradientColors.middle} />
              <stop offset="100%" stopColor={gradientColors.end} />
            </linearGradient>
          </defs>
          <motion.path
            d={blob}
            fill={`url(#grad-${index})`}
            transform="translate(100 100)"
            animate={{
            d: [
              blob, 
              blob.replace(/M[\d\.,\-\s]+Z/, (match: string) => {
                return match.split(/[\s,]/).map((val: string) => {
                  const num = parseFloat(val);
                  return isNaN(num) ? val : String(num * (0.9 + Math.random() * 0.2));
                }).join(' ');
              }), 
              blob
            ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Card */}
      <div 
        className="relative bg-gradient-to-br from-muted/80 via-muted/70 to-muted/80 backdrop-blur-xl rounded-3xl p-8 border border-border overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* Category title */}
        <motion.h3 
          className={`text-4xl font-bold mb-8 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          style={{ transform: "translateZ(70px)" }}
        >
          {category}
        </motion.h3>

        {/* Skills list */}
        <div className="space-y-6">
          {skills.map((skill: Skill, skillIndex: number) => (
            <motion.div
              key={skillIndex}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + skillIndex * 0.1 }}
              onMouseEnter={() => setHoveredSkill(skillIndex)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="relative cursor-pointer"
              style={{ transform: "translateZ(60px)" }}
            >
              {/* Skill header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="text-3xl"
                    animate={{
                      rotate: hoveredSkill === skillIndex ? [0, -10, 10, 0] : 0,
                      scale: hoveredSkill === skillIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {skill.icon}
                  </motion.span>
                  <div>
                    <div className="text-foreground font-bold text-lg">{skill.name}</div>
                    <motion.div 
                      className="text-muted-foreground text-sm overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: hoveredSkill === skillIndex ? 1 : 0,
                        height: hoveredSkill === skillIndex ? "auto" : 0,
                      }}
                    >
                      {skill.desc}
                    </motion.div>
                  </div>
                </div>
                <motion.div 
                  className={`text-xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                  animate={{
                    scale: hoveredSkill === skillIndex ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.5, repeat: hoveredSkill === skillIndex ? Infinity : 0 }}
                >
                  {skill.level}%
                </motion.div>
              </div>

              {/* Progress bar */}
              <div className="relative h-2 bg-border/50 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradient} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.2 + skillIndex * 0.1 + 0.5,
                    ease: "easeOut" 
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Particles on hover */}
                <AnimatePresence>
                  {hoveredSkill === skillIndex && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1.5 h-1.5 bg-gradient-to-r ${gradient} rounded-full`}
                          initial={{ 
                            left: `${skill.level}%`, 
                            y: 0,
                            scale: 0,
                            opacity: 1 
                          }}
                          animate={{
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 50 - 20,
                            scale: [0, 1, 0],
                            opacity: [1, 0.5, 0],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1,
                            delay: i * 0.05,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section className="min-h-screen bg-background py-20 px-4 overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
          animate={{
            x: ["-25%", "125%"],
            y: ["-25%", "125%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          }}
          animate={{
            x: ["125%", "-25%"],
            y: ["125%", "-25%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <span className="text-7xl">✨</span>
          </motion.div>

          <motion.h2
            className="text-6xl lg:text-8xl font-bold mb-6"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            Liquid Skills
          </motion.h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Morphing excellence through technology and creativity
          </p>
        </motion.div>

        {/* Skills cards grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "2000px" }}
        >
          {skillsData.map((category, index) => (
            <LiquidSkillCard
              key={index}
              category={category.category}
              gradient={category.gradient}
              gradientColors={category.gradientColors}
              blob={category.blob}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            className="px-12 py-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg rounded-full relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100"
              animate={{
                x: ["0%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <Link href="/contact" className="relative z-10">Let&apos;s Work Together 🚀</Link>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}