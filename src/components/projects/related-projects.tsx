"use client";

import { Project } from "@/lib/data/projects";
import { ProjectCard } from "./project-card";
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16 border-t">
      <h2 className="text-3xl font-heading font-bold mb-8">
        Related Projects
      </h2>
      
      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}