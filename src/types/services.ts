/**
 * Type definitions for Freelance Services & Client Engagement Models.
 */

export interface FreelanceService {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  badge: string;
  accent: "emerald" | "cyan" | "indigo";
  deliverables: string[];
  idealFor: string;
  contractModel: string;
}

export interface EngagementPolicy {
  title: string;
  description: string;
}

