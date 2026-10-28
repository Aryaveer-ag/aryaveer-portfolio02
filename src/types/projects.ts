/**
 * Strongly typed schemas for engineering case studies, system architecture,
 * technical tradeoffs, and code implementations.
 */

export interface FlowStage {
  order: number;
  title: string;
  component: string;
  description: string;
}

export interface EngineeringTradeoff {
  decision: string;
  chosenApproach: string;
  alternativeConsidered: string;
  rationale: string;
}

export interface FailureMode {
  scenario: string;
  mitigation: string;
}

export interface CodeHighlight {
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Backend & Systems" | "AI & Machine Learning" | "Computer Vision & Systems";
  badgeVariant: "emerald" | "cyan" | "indigo";
  statusLabel: string;
  summary: string;
  problemStatement: string;
  systemArchitecture: {
    overview: string;
    flowStages: FlowStage[];
    diagramAscii: string;
  };
  tradeoffs: EngineeringTradeoff[];
  failureModes: FailureMode[];
  codeSnippet: CodeHighlight;
  technologies: string[];
  links: {
    github?: string;
    specDoc?: string;
  };
}

