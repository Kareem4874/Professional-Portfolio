"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getAllProjects } from "@/lib/data/projects";
import { FadeIn } from "@/components/animations/fade-in";
import { Code, Layers, Award, Calendar } from "lucide-react";

export function ProjectStats() {
  const projects = getAllProjects();
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const totalTechnologies = new Set(
    projects.flatMap(p => p.technologies)
  ).size;
  const featuredProjects = projects.filter(p => p.featured).length;

  const stats = [
    {
      icon: Code,
      label: "Total Projects",
      value: projects.length,
      color: "text-blue-500"
    },
    {
      icon: Layers,
      label: "Technologies",
      value: totalTechnologies,
      color: "text-green-500"
    },
    {
      icon: Award,
      label: "Featured",
      value: featuredProjects,
      color: "text-purple-500"
    },
    {
      icon: Calendar,
      label: "Completed",
      value: completedProjects,
      color: "text-accent"
    }
  ];

  return (
    <FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </FadeIn>
  );
}