/**
 * Types for technical competencies, toolchains, and architectural knowledge.
 */

export interface SkillItem {
  name: string;
  category?: "language" | "framework" | "database" | "tool" | "concept";
  proficiency?: "core" | "proficient" | "familiar";
}

export interface CompetencyDomain {
  id: string;
  index: string;
  title: string;
  summary: string;
  accent: "emerald" | "cyan" | "indigo" | "amber";
  technologies: SkillItem[];
  keyConcepts: string[];
}

