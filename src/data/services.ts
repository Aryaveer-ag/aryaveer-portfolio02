import type { FreelanceService, EngagementPolicy } from "../types/services.ts";

export const freelanceServices: FreelanceService[] = [
  {
    id: "backend-architecture",
    title: "Backend & Systems Architecture",
    eyebrow: "01 // BACKEND ARCHITECTURE",
    tagline: "Scalable REST APIs, Redis concurrency guards, and normalized relational databases.",
    badge: "Core Service",
    accent: "emerald",
    deliverables: [
      "Production-grade REST API architecture in Node.js/TypeScript or FastAPI",
      "Atomic Redis Lua scripts for concurrency control, caching, and rate limiting",
      "PostgreSQL schema modeling, constraint integrity, and query index optimization",
      "Asynchronous message decoupling and background task processing",
      "Deterministic local development with Docker and comprehensive unit tests",
    ],
    idealFor: "Startups and engineering teams needing robust, low-latency server infrastructure that handles traffic spikes without overselling or data corruption.",
    contractModel: "Fixed-Scope Milestones or Hourly via Upwork Escrow",
  },
  {
    id: "applied-ml-rag",
    title: "Applied AI & Machine Learning Pipelines",
    eyebrow: "02 // APPLIED AI & VISION",
    tagline: "Grounded semantic retrieval (RAG) systems and PyTorch computer vision models.",
    badge: "Applied ML",
    accent: "cyan",
    deliverables: [
      "Grounded document retrieval (RAG) pipelines with dense embeddings and exact citations",
      "Surface flaw inspection and custom CNN classification models in PyTorch",
      "Rigorous metric benchmarking (mAP, IoU, Precision/Recall, and ROC-AUC)",
      "High-throughput inference endpoints wrapped in asynchronous FastAPI services",
      "Zero-hallucination prompt construction and retrieval validation",
    ],
    idealFor: "Teams integrating AI or computer vision into production applications where factual grounding, latency, and measurable accuracy are paramount.",
    contractModel: "Sprint-Based Milestones via Upwork Escrow",
  },
  {
    id: "systems-optimization",
    title: "Systems Profiling & Code Modernization",
    eyebrow: "03 // PERFORMANCE & AUDIT",
    tagline: "Eliminating concurrency bottlenecks, query deadlocks, and untyped code debt.",
    badge: "Optimization",
    accent: "indigo",
    deliverables: [
      "Asymptotic computational profiling and slow database query remediation",
      "Refactoring untyped JavaScript/Python into strict, maintainable TypeScript",
      "Concurrency race mitigation, mutex timeouts, and deadlock elimination",
      "Automated unit testing, static linting, and CI/CD quality pipelines",
      "Clear architectural documentation and technical design doc deliverables",
    ],
    idealFor: "Organizations experiencing latency bottlenecks, flaky race conditions, or preparing backend services for surge traffic.",
    contractModel: "Audit Review & Milestone Remediation via Upwork",
  },
];

export const engagementPolicies: EngagementPolicy[] = [
  {
    title: "Upwork Escrow Protection",
    description:
      "All engagements can be structured securely through Upwork with milestone escrow protection, ensuring total transparency, verified time tracking, and guaranteed deliverables.",
  },
  {
    title: "Transparent Technical Communication",
    description:
      "Daily asynchronous progress reports, clear architectural decision records (ADRs), and transparent Git commit histories with no hidden surprises.",
  },
  {
    title: "Complete Code Ownership",
    description:
      "100% intellectual property transfer upon milestone completion, accompanied by reproducible Docker environments and comprehensive documentation.",
  },
];

