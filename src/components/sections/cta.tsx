"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Mail, Download, ArrowRight, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-background">
      {/* Enhanced Animated Background - Dark Mode Compatible */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/15 dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent dark:from-primary/20" />
      
      {/* Floating shapes with dark mode support */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 dark:bg-primary/30 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/15 dark:bg-primary/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center space-y-10">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Let&apos;s Collaborate</span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                <span className="text-foreground dark:text-foreground">Ready to Work </span>
                <span className="text-primary">Together?</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Let&apos;s create something amazing! Get in touch and let&apos;s discuss your next project.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                asChild 
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 dark:hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  <span>Get In Touch</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="group border-2 border-border dark:border-border hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
              >
                <Link
                  href="/cv/Kareem-AbdulBaset-FlowCV-Resume-20251111.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </Link>
              </Button>
            </div>

            {/* Additional Info Card */}
            <div className="relative mt-12 group">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/30 dark:from-primary/60 dark:to-primary/40 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
              
              <div className="relative bg-card/80 dark:bg-card/50 backdrop-blur-lg border border-border/50 dark:border-border/40 p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                  {/* Availability Status */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground dark:text-foreground">
                        Available for Projects
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                        Freelance & Full-time
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-px h-12 bg-border/50 dark:bg-border/40" />

                  {/* Response Time */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20 flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground dark:text-foreground">
                        Quick Response
                      </p>
                      <p className="text-xs text-primary dark:text-primary font-bold">
                        Within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Proof / Trust Badge */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 opacity-70 hover:opacity-100 transition-opacity">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground">1+</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-border/50 dark:bg-border/40" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground">6+</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Projects Done</p>
              </div>
              <div className="w-px h-10 bg-border/50 dark:bg-border/40" />
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-foreground dark:text-foreground">100%</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}