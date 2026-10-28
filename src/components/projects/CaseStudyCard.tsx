import React from "react";
import { ProjectCaseStudy } from "@/types/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  TextLink,
} from "@/components/common";

export interface CaseStudyCardProps {
  project: ProjectCaseStudy;
  onOpenDrawer: (project: ProjectCaseStudy) => void;
}

export function CaseStudyCard({ project, onOpenDrawer }: CaseStudyCardProps) {
  return (
    <Card
      variant="interactive"
      spotlight
      tilt
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
            {project.summary}
          </p>

          {/* Problem Statement Box */}
          <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs space-y-1">
            <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold tracking-wider">
              Engineering Bottleneck:
            </span>
            <p className="text-[var(--text-secondary)] leading-normal line-clamp-3">
              {project.problemStatement}
            </p>
          </div>

          {/* Architecture Preview highlights */}
          <div className="space-y-1.5 pt-1">
            <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] tracking-wider">
              Key Flow Stages ({project.systemArchitecture.flowStages.length}):
            </span>
            <div className="space-y-1 text-xs text-[var(--text-secondary)]">
              {project.systemArchitecture.flowStages.slice(0, 2).map((stage) => (
                <div key={stage.order} className="flex items-start gap-1.5">
                  <span className="text-[var(--accent-cyan)] font-mono text-[11px] select-none">
                    0{stage.order}.
                  </span>
                  <span className="text-slate-300 font-medium">
                    {stage.title}
                  </span>
                  <span className="text-[var(--text-muted)] text-[11px] hidden sm:inline">
                    — {stage.component}
                  </span>
                </div>
              ))}
            </div>
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

      <CardFooter className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onOpenDrawer(project)}
          className="text-xs"
        >
          Inspect Architecture &amp; Spec
        </Button>

        {project.links.github && (
          <TextLink href={project.links.github} variant="arrow" isExternal>
            Source
          </TextLink>
        )}
      </CardFooter>
    </Card>
  );
}

