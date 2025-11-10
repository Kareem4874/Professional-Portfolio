"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects-data";
import { useState } from "react";

export function FeaturedProjects() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  // Get only featured projects
  const featuredProjects = projectsData.filter(p => p.featured).slice(0, 3);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-sm font-medium mb-4 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Featured Work</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground dark:text-foreground">
              Featured <span className="text-primary">Projects</span>
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              A curated selection of my best work showcasing modern web development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 border-border/50 dark:border-border/40 bg-card/80 dark:bg-card/40 backdrop-blur-sm">
                  
                  {/* Project Image */}
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 cursor-pointer">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index === 0}
                        quality={85}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onLoad={() => handleImageLoad(project.id)}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      
                      {/* Loading Skeleton */}
                      {!loadedImages.has(project.id) && (
                        <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card/30 animate-pulse" />
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/90 dark:bg-primary/80 backdrop-blur-md text-primary-foreground text-xs font-semibold shadow-lg">
                          Featured
                        </div>
                      )}
                    </div>
                  </Link>

                  <CardContent className="p-6 space-y-4">
                    {/* Title */}
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-bold text-foreground dark:text-foreground group-hover:text-primary dark:group-hover:text-primary transition-colors cursor-pointer line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground leading-relaxed line-clamp-2 min-h-[40px]">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 min-h-[28px]">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs bg-secondary/80 dark:bg-secondary/40 border border-border/50 dark:border-border/30 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge 
                          variant="secondary"
                          className="text-xs bg-secondary/80 dark:bg-secondary/40 border border-border/50 dark:border-border/30"
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {project.liveUrl && (
                        <Button 
                          size="sm" 
                          className="flex-1 group/btn bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                            <span>Live Demo</span>
                          </a>
                        </Button>
                      )}
                      
                      {project.githubUrl && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-2 hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary transition-all"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            <span>Code</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              className="group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="/projects">
                <span className="font-semibold">View All Projects</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}