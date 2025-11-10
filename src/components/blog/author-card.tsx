"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";

interface AuthorCardProps {
  name: string;
  bio: string;
  image?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export function AuthorCard({ name, bio, image, social }: AuthorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Author Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0 text-2xl">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span>👨‍💻</span>
            )}
          </div>

          {/* Author Details */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            <h3 className="font-heading font-semibold text-lg mb-1">
              Written by {name}
            </h3>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {bio}
            </p>

            {/* Social Links */}
            {social && (
              <div className="flex flex-wrap gap-2">
                {social.github && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {social.linkedin && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {social.twitter && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <a 
                      href={social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Twitter Profile"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}