export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: {
    name: string;
    institution: string;
    status: string;
    domains: readonly string[];
  };
  links: {
    github: string;
    linkedin: string;
    upwork: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Aryaveer.dev",
  title: "Aryaveer Agarwal — Software & AI Systems Engineer",
  description:
    "Engineering portfolio of Aryaveer Agarwal — High-concurrency backend architectures, Agentic RAG pipelines, machine learning, and computer vision.",
  author: {
    name: "Aryaveer Agarwal",
    institution: "Delhi Technological University",
    status: "B.Tech in Electronics and Communications Engineering (2023–2027)",
    domains: [
      "Backend & Distributed Systems",
      "AI & Agentic RAG Pipelines",
      "Computer Vision & ML",
      "Algorithmic Problem Solving",
    ],
  },
  links: {
    github: "https://github.com/Aryaveer-ag",
    linkedin: "https://linkedin.com/in/aryaveer-agarwal-dtu/",
    upwork: "https://upwork.com",
  },
};

