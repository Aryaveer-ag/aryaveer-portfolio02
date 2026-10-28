/**
 * Core domain types for Aryaveer.dev
 */

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  category: "backend" | "machine-learning" | "systems" | "full-stack";
  summary: string;
  architectureDetails: string;
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export interface FreelanceService {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  technologies: string[];
}

export interface SimulationMetadata {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: "active" | "planned";
}

