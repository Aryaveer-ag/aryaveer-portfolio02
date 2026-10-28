"use client";

import React, { useState, useEffect } from "react";
import { ProjectCaseStudy } from "@/types/projects";
import { Badge, Button } from "@/components/common";

export interface CaseStudyDrawerProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyDrawer({
  project,
  isOpen,
  onClose,
}: CaseStudyDrawerProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "tradeoffs" | "code">("architecture");

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 flex justify-end animate-fade-in"
    >
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div
        key={project.id}
        className="relative w-full max-w-3xl bg-[var(--bg-surface-1)] border-l border-[var(--border-default)] shadow-2xl flex flex-col h-full overflow-hidden z-10"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/60 flex items-start justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={project.badgeVariant} size="sm">
                {project.category}
              </Badge>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">
                {project.statusLabel}
              </span>
            </div>
            <h2
              id="drawer-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[var(--accent-cyan)]">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close architecture drawer"
              className="p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-6 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none ${
              activeTab === "architecture"
                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>01.</span>
            <span>Architecture &amp; Flow</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tradeoffs")}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none ${
              activeTab === "tradeoffs"
                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>02.</span>
            <span>Tradeoffs &amp; Failure Modes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("code")}
            className={`py-3 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 focus-visible:outline-none ${
              activeTab === "code"
                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>03.</span>
            <span>Code Implementation</span>
          </button>
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* TAB 1: Architecture & Flow */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              {/* Problem Statement */}
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-2)] border border-[var(--border-default)] space-y-2">
                <span className="font-mono text-xs uppercase text-[var(--text-muted)] font-semibold tracking-wider">
                  Target Problem Statement
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              {/* Architecture Overview */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider">
                  System Architecture Overview
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.systemArchitecture.overview}
                </p>
              </div>

              {/* Architectural Diagram */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider">
                    Component Topology Diagram
                  </h3>
                  <span className="font-mono text-[10px] text-[var(--accent-cyan)]">
                    ASCII DATA FLOW
                  </span>
                </div>
                <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-subtle)] font-mono text-[11px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <pre>{project.systemArchitecture.diagramAscii.trim()}</pre>
                </div>
              </div>

              {/* Sequential Flow Stages */}
              <div className="space-y-3">
                <h3 className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider">
                  Pipeline Execution Stages
                </h3>
                <div className="space-y-3">
                  {project.systemArchitecture.flowStages.map((stage) => (
                    <div
                      key={stage.order}
                      className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono">
                        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
                          <span className="text-[var(--accent-cyan)]">
                            0{stage.order}.
                          </span>
                          <span>{stage.title}</span>
                        </div>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {stage.component}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] pl-5 leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Tradeoffs & Failure Modes */}
          {activeTab === "tradeoffs" && (
            <div className="space-y-8">
              {/* Engineering Tradeoffs */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider">
                  Design Tradeoffs &amp; Alternatives Considered
                </h3>
                <div className="space-y-4">
                  {project.tradeoffs.map((tradeoff, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-2)] border border-[var(--border-default)] space-y-3 text-xs"
                    >
                      <div className="font-mono font-semibold text-slate-200 text-sm">
                        Decision: {tradeoff.decision}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded bg-[var(--bg-surface-3)] border border-emerald-900/60 space-y-1">
                          <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold">
                            Chosen Approach
                          </span>
                          <div className="text-[var(--text-primary)] font-medium">
                            {tradeoff.chosenApproach}
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-[var(--bg-surface-3)] border border-slate-800 space-y-1">
                          <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] font-semibold">
                            Alternative Considered
                          </span>
                          <div className="text-[var(--text-secondary)]">
                            {tradeoff.alternativeConsidered}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                        <span className="font-mono text-[10px] uppercase text-[var(--text-muted)] mr-1 font-semibold">
                          Architectural Rationale:
                        </span>
                        {tradeoff.rationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Failure Modes & Mitigations */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider">
                  Failure Modes &amp; Defensive Mitigations
                </h3>
                <div className="space-y-3">
                  {project.failureModes.map((fm, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-2 text-xs"
                    >
                      <div className="flex items-start gap-2 text-rose-300 font-mono font-medium">
                        <span className="text-rose-400">⚠</span>
                        <span>Scenario: {fm.scenario}</span>
                      </div>
                      <p className="text-[var(--text-secondary)] pl-5 leading-relaxed">
                        <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold mr-1">
                          Mitigation:
                        </span>
                        {fm.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Code Implementation */}
          {activeTab === "code" && (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--text-primary)] font-semibold">
                    {project.codeSnippet.filename}
                  </span>
                  <Badge variant="cyan" size="sm">
                    {project.codeSnippet.language.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {project.codeSnippet.explanation}
                </p>
              </div>

              {/* Code Block */}
              <div className="rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-default)] p-4 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed shadow-inner">
                <pre>{project.codeSnippet.code}</pre>
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <div className="text-[11px] font-mono uppercase text-[var(--text-muted)]">
                  Environment Dependencies &amp; Tools
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-2)]/60 flex items-center justify-between">
          <div className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ESC</kbd> to close
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {project.links.github && (
              <Button
                variant="outline"
                size="sm"
                href={project.links.github}
                isExternal
              >
                Inspect Repository
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close Spec
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
