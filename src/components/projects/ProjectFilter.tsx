"use client";

import React from "react";

export type ProjectCategoryFilter =
  | "All"
  | "Backend & Systems"
  | "AI & Machine Learning"
  | "Computer Vision & Systems";

export interface ProjectFilterProps {
  categories: { label: ProjectCategoryFilter; count: number }[];
  selectedCategory: ProjectCategoryFilter;
  onSelectCategory: (category: ProjectCategoryFilter) => void;
}

export function ProjectFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: ProjectFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter case studies by domain"
      className="flex flex-wrap items-center gap-2 mb-8"
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.label;
        return (
          <button
            key={cat.label}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.label)}
            className={`font-mono text-xs px-3 py-1.5 rounded-[var(--radius-sm)] border transition-all duration-150 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
              isSelected
                ? "bg-[var(--bg-surface-3)] text-white border-[var(--border-strong)] shadow-sm"
                : "bg-[var(--bg-surface-1)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)]"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected
                  ? "bg-slate-700/80 text-slate-200"
                  : "bg-slate-800/60 text-slate-400"
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

