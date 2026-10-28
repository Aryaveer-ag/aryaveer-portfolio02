"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "@/components/common";
import {
  skillCategories,
  skillsCatalog,
  getAssociatedProjects,
} from "@/data/skillsExplorer";
import { SkillCategory, SkillItem } from "@/types/skillsExplorer";

export function SkillsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [selectedSkillId, setSelectedSkillId] = useState<string>("typescript");

  // Filter skills based on selected category tab
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "All") {
      return skillsCatalog;
    }
    return skillsCatalog.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  // Find currently selected skill, defaulting to the first in filtered list if current is not in category
  const selectedSkill = useMemo(() => {
    const found = skillsCatalog.find((s) => s.id === selectedSkillId);
    if (found) return found;
    return filteredSkills[0] || skillsCatalog[0];
  }, [selectedSkillId, filteredSkills]);

  // Associated project summaries for the selected skill
  const associatedProjects = useMemo(() => {
    return getAssociatedProjects(selectedSkill);
  }, [selectedSkill]);

  const accentColorMap: Record<SkillItem["accent"], {
    badge: "indigo" | "cyan" | "emerald" | "amber";
    border: string;
    text: string;
    bg: string;
  }> = {
    indigo: {
      badge: "indigo",
      border: "border-[var(--accent-indigo)]/50",
      text: "text-[var(--accent-indigo)]",
      bg: "bg-[var(--accent-indigo)]/10",
    },
    cyan: {
      badge: "cyan",
      border: "border-[var(--accent-cyan)]/50",
      text: "text-[var(--accent-cyan)]",
      bg: "bg-[var(--accent-cyan)]/10",
    },
    emerald: {
      badge: "emerald",
      border: "border-[var(--accent-emerald)]/50",
      text: "text-[var(--accent-emerald)]",
      bg: "bg-[var(--accent-emerald)]/10",
    },
    amber: {
      badge: "amber",
      border: "border-[var(--accent-amber)]/50",
      text: "text-[var(--accent-amber)]",
      bg: "bg-[var(--accent-amber)]/10",
    },
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-4">
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          aria-pressed={selectedCategory === "All"}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
            selectedCategory === "All"
              ? "bg-[var(--accent-indigo)] text-white font-medium"
              : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
          }`}
        >
          All Domains ({skillsCatalog.length})
        </button>

        {skillCategories.map((category) => {
          const count = skillsCatalog.filter((s) => s.category === category).length;
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isActive}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                isActive
                  ? "bg-[var(--accent-indigo)] text-white font-medium"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Main Grid: Skill Selector Pills + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Skill Item Cloud */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Select a skill to inspect project application:</span>
            <span>{filteredSkills.length} skills listed</span>
          </div>

          <div
            role="radiogroup"
            aria-label="Skills Selector"
            className="flex flex-wrap gap-2 p-3 bg-[var(--bg-surface)]/60 rounded-[var(--radius-lg)] border border-[var(--border-subtle)]"
          >
            {filteredSkills.map((skill) => {
              const isSelected = skill.id === selectedSkill.id;
              const hasProjects = skill.associatedProjectIds.length > 0;
              const style = accentColorMap[skill.accent];

              return (
                <button
                  key={skill.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`group px-3 py-2 rounded-[var(--radius-md)] text-xs font-mono transition-all duration-150 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                    isSelected
                      ? `bg-[var(--bg-surface-elevated)] border-2 ${style.border} text-white shadow-sm`
                      : "bg-[var(--bg-base)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected
                        ? "bg-white"
                        : style.bg.replace("/10", "/80")
                    }`}
                  />
                  <span className="font-medium">{skill.name}</span>

                  {hasProjects ? (
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isSelected
                          ? "bg-[var(--bg-base)] text-[var(--text-secondary)]"
                          : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                      }`}
                      title={`${skill.associatedProjectIds.length} associated project(s)`}
                    >
                      {skill.associatedProjectIds.length}p
                    </span>
                  ) : (
                    <span
                      className="text-[10px] text-[var(--text-muted)]"
                      title="Academic coursework context at DTU"
                    >
                      edu
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] font-mono text-[var(--text-muted)]">
            <span className="text-[var(--accent-emerald)] font-semibold">Note:</span> Skills are directly mapped to practical projects and DTU engineering coursework rather than arbitrary self-assessed percentages.
          </p>
        </div>

        {/* Right: Selected Skill Detail Inspector Panel */}
        <div className="lg:col-span-7">
          <Card
            variant="default"
            className="border-[var(--border-strong)] bg-[var(--bg-surface)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-indigo)] via-[var(--accent-cyan)] to-[var(--accent-emerald)]" />

            <CardHeader className="pt-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <Badge variant={accentColorMap[selectedSkill.accent].badge} mono size="sm">
                  {selectedSkill.category}
                </Badge>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Skill ID: <code className="text-[var(--text-secondary)]">{selectedSkill.id}</code>
                </span>
              </div>

              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <span>{selectedSkill.name}</span>
              </CardTitle>

              <CardDescription className="text-sm pt-2 text-[var(--text-secondary)] leading-relaxed">
                {selectedSkill.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              {/* Associated Featured Projects */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                    Associated Portfolio Implementations
                  </h4>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {associatedProjects.length > 0
                      ? `${associatedProjects.length} Verified System(s)`
                      : "Theoretical & Coursework Application"}
                  </span>
                </div>

                {associatedProjects.length > 0 ? (
                  <div className="space-y-3">
                    {associatedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="p-3.5 rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-default)] hover:border-[var(--border-strong)] transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-sm text-[var(--text-primary)]">
                            {project.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]">
                            {project.category}
                          </span>
                        </div>

                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                          <strong className="text-[var(--text-primary)] font-medium">Role in system:</strong>{" "}
                          {project.applicationNote}
                        </p>

                        <div className="flex items-center justify-end">
                          <a
                            href="#projects"
                            className="text-xs font-mono text-[var(--accent-cyan)] hover:text-white transition-colors inline-flex items-center gap-1 group"
                          >
                            <span>Inspect case study</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">No standalone featured showcase project:</span> This technology is applied in academic problem-solving, laboratory assignments, and core curriculum implementations rather than an isolated portfolio deployment.
                  </div>
                )}
              </div>

              {/* Coursework & Academic Context at DTU */}
              {selectedSkill.courseworkContext && (
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-indigo)]" />
                    Coursework &amp; Academic Foundation (DTU)
                  </h4>
                  <div className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-base)]/50 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedSkill.courseworkContext}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
