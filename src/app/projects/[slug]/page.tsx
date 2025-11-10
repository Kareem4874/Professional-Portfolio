// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects, getAllProjects } from "@/lib/data/projects";
import { FadeIn } from "@/components/animations/fade-in";
import { ProjectGallery } from "@/components/projects/project-gallery";
import { RelatedProjects } from "@/components/projects/related-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ExternalLink, 
  Github, 
  Calendar, 
  Clock, 
  Users, 
  Zap,
  ArrowLeft,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Code2
} from "lucide-react";
import Link from "next/link";
import { formatProjectDate, getStatusColor, getCategoryColor } from "@/lib/utils/project-utils";
import { Metadata } from "next";
import { generateProjectMetadata } from "@/lib/seo/metadata";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/seo/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return generateProjectMetadata({
    title: project.title,
    description: project.description,
    slug: project.slug,
    image: project.image,
    technologies: project.technologies,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  const projectSchema = generateProjectSchema({
    name: project.title,
    description: project.longDescription,
    url: project.slug,
    image: project.image,
    technologies: project.technologies,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.title, url: `/projects/${project.slug}` },
  ]);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <main className="min-h-screen py-16 lg:py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <FadeIn>
            <Button 
              variant="ghost" 
              asChild 
              className="mb-8 group hover:bg-slate-800/50 transition-all"
            >
              <Link href="/projects" className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-colors">
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-medium">Back to Projects</span>
              </Link>
            </Button>
          </FadeIn>

          {/* Hero Section */}
          <FadeIn delay={0.1}>
            <div className="relative mb-16">
              {/* Decorative Element */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
                {/* Status Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className={`${getCategoryColor(project.category)} px-4 py-1.5 text-sm font-semibold`}>
                    {project.category}
                  </Badge>
                  <Badge className={`${getStatusColor(project.status)} px-4 py-1.5 text-sm font-semibold`}>
                    {project.status}
                  </Badge>
                  {project.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" />
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Title & Description */}
                <h1 className="text-4xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 leading-tight">
                  {project.title}
                </h1>

                <p className="text-lg lg:text-xl text-slate-300 mb-8 max-w-4xl leading-relaxed">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 lg:gap-8 mb-8">
                  <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2.5 rounded-xl">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">Date</p>
                      <p className="text-sm font-semibold text-white">{formatProjectDate(project.date)}</p>
                    </div>
                  </div>

                  {project.duration && (
                    <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2.5 rounded-xl">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Duration</p>
                        <p className="text-sm font-semibold text-white">{project.duration}</p>
                      </div>
                    </div>
                  )}

                  {project.role && (
                    <div className="flex items-center gap-3 bg-slate-800/50 px-4 py-2.5 rounded-xl">
                      <div className="p-2 rounded-lg bg-pink-500/10">
                        <Users className="h-4 w-4 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Role</p>
                        <p className="text-sm font-semibold text-white">{project.role}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <Button 
                      variant="default" 
                      size="lg" 
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 px-8"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5" />
                        View Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button 
                      variant="outline" 
                      size="lg" 
                      asChild
                      className="border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 px-8"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-5 w-5" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Content - 8 columns */}
            <div className="lg:col-span-8 space-y-8">
              {/* Gallery */}
              <FadeIn delay={0.2}>
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50 overflow-hidden">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                        <Sparkles className="h-5 w-5 text-blue-400" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-white">
                        Project Gallery
                      </h2>
                    </div>
                    <ProjectGallery images={project.images} title={project.title} />
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Description */}
              <FadeIn delay={0.3}>
                <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <Target className="h-5 w-5 text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-heading font-bold text-white">
                        About This Project
                      </h2>
                    </div>
                    <div className="prose prose-invert prose-lg max-w-none">
                      <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                        {project.longDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <FadeIn delay={0.4}>
                  <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                          <Zap className="h-5 w-5 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white">
                          Key Features
                        </h2>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.features.map((feature, index) => (
                          <div
                            key={index}
                            className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-4 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                <Zap className="h-4 w-4 text-blue-400 flex-shrink-0" />
                              </div>
                              <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                {feature}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <FadeIn delay={0.5}>
                  <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800/50">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                          <Target className="h-5 w-5 text-orange-400" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold text-white">
                          Technical Challenges
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {project.challenges.map((challenge, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:border-orange-500/30 transition-colors"
                          >
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 flex-shrink-0">
                              <span className="text-orange-400 font-bold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {challenge}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}
            </div>

            {/* Right Sidebar - 4 columns */}
            <div className="lg:col-span-4 space-y-6">
              {/* Technologies */}
              <FadeIn delay={0.3}>
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border-slate-700/50 sticky top-24">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Code2 className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-white">
                        Tech Stack
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          className="bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 px-3 py-1.5 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Metrics */}
              {project.metrics && project.metrics.length > 0 && (
                <FadeIn delay={0.4}>
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border-slate-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <TrendingUp className="h-5 w-5 text-green-400" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-white">
                          Project Metrics
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {project.metrics.map((metric, index) => (
                          <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-400">
                                {metric.label}
                              </span>
                              <span className="font-bold text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                {metric.value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <FadeIn delay={0.5}>
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border-slate-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                          <Award className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-white">
                          Tags
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline"
                            className="border-slate-700 text-slate-300 hover:border-purple-500/50 hover:text-purple-300 transition-colors px-3 py-1"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}

              {/* Team */}
              {project.team && project.team.length > 0 && (
                <FadeIn delay={0.6}>
                  <Card className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border-slate-700/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 rounded-lg bg-pink-500/10">
                          <Users className="h-5 w-5 text-pink-400" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-white">
                          Team Members
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {project.team.map((member, index) => (
                          <div 
                            key={index} 
                            className="flex items-center gap-3 bg-slate-800/50 rounded-lg p-3"
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                              <Users className="h-4 w-4 text-pink-400" />
                            </div>
                            <span className="text-sm text-slate-300">{member}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              )}

              {/* CTA */}
              <FadeIn delay={0.7}>
                <Card className="bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl border-blue-500/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2 text-white">
                      Like this project?
                    </h3>
                    <p className="text-sm text-slate-300 mb-5">
                      Let&apos;s work together on your next idea
                    </p>
                    <Button 
                      asChild 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                    >
                      <Link href="/contact">
                        Get in Touch
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <FadeIn delay={0.8}>
              <div className="mt-16">
                <RelatedProjects projects={relatedProjects} />
              </div>
            </FadeIn>
          )}
        </div>
      </main>
    </>
  );
}