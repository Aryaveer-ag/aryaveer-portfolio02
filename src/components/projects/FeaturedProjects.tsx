import React from "react";
import {
  Container,
  PageSection,
  SectionHeading,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  TextLink,
} from "@/components/common";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <PageSection id="projects" spacing="spacious" divided>
      <Container size="lg">
        <SectionHeading
          eyebrow="01 // FEATURED WORK"
          title="Engineering Projects &amp; System Architectures"
          description="Technical case studies and implementations emphasizing distributed concurrency, grounded semantic intelligence, and computer vision quality inspection."
          action={
            <Badge variant="cyan" mono size="sm">
              {featuredProjects.length} Flagship Systems
            </Badge>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              variant="interactive"
              className="flex flex-col justify-between border-[var(--border-default)]"
            >
              <div className="space-y-4">
                <CardHeader className="mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={project.badgeVariant} size="sm">
                      {project.category}
                    </Badge>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {project.statusLabel}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold leading-snug">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs font-mono text-[var(--accent-cyan)] pt-1">
                    {project.tagline}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Problem Statement Box */}
                  <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold tracking-wider">
                      Target Engineering Challenge:
                    </span>
                    <p className="text-[var(--text-secondary)] leading-normal">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Architectural Highlights */}
                  <div className="space-y-2 pt-1">
                    <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
                      Architectural Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                      {project.architectureHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[var(--accent-cyan)] font-mono select-none">
                            ›
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
                <TextLink href={project.repoUrl || "#"} variant="arrow" isExternal>
                  View Code &amp; Architecture
                </TextLink>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  Grounded Spec
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}

