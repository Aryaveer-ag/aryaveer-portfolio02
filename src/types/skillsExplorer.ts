/**
 * Type definitions for the Skills Explorer with actual project associations.
 */

export type SkillCategory =
  | "Programming"
  | "Backend and APIs"
  | "Databases and systems"
  | "AI and machine learning"
  | "Development tools";

export interface SkillProjectApplication {
  projectId: string;
  projectTitle: string;
  category: string;
  applicationNote: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  accent: "indigo" | "cyan" | "emerald" | "amber";
  description: string;
  associatedProjectIds: string[];
  projectApplications?: Record<string, string>;
  courseworkContext?: string;
}

export interface AssociatedProjectSummary {
  id: string;
  title: string;
  category: "Backend & Systems" | "AI & Machine Learning" | "Computer Vision & Systems";
  applicationNote: string;
}
