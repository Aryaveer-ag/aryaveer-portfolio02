import { CompetencyDomain } from "@/types/skills";

export const competencyDomains: CompetencyDomain[] = [
  {
    id: "backend-systems",
    index: "01",
    title: "Backend & Systems Architecture",
    summary:
      "High-throughput API microservices, distributed concurrency control, relational ACID transactions with pessimistic row-level locking, and in-memory Redis caching hierarchies.",
    accent: "emerald",
    technologies: [
      { name: "Python", category: "language", proficiency: "core" },
      { name: "FastAPI", category: "framework", proficiency: "core" },
      { name: "Node.js & Express", category: "framework", proficiency: "core" },
      { name: "PostgreSQL", category: "database", proficiency: "core" },
      { name: "Redis Caching", category: "database", proficiency: "core" },
      { name: "MongoDB", category: "database", proficiency: "proficient" },
      { name: "REST APIs", category: "concept", proficiency: "core" },
      { name: "Microservices", category: "concept", proficiency: "proficient" },
    ],
    keyConcepts: [
      "Pessimistic row-level locking & ACID isolation under 5,000+ req",
      "Redis early rejection for sold-out traffic protection",
      "Idempotency keys preventing duplicate orders on retry",
      "Sub-150ms checkout latency under 1,000+ req/sec throughput",
    ],
  },
  {
    id: "machine-learning",
    index: "02",
    title: "Agentic AI, LLMs & Machine Learning",
    summary:
      "Agentic RAG pipelines, fine-tuned LLM translation (Llama-3, GPT-4), dense vector similarity search, Chain-of-Thought explainability guardrails, and PyTorch computer vision.",
    accent: "cyan",
    technologies: [
      { name: "Python", category: "language", proficiency: "core" },
      { name: "LangChain", category: "framework", proficiency: "core" },
      { name: "FAISS Vector Search", category: "tool", proficiency: "core" },
      { name: "Llama-3 & GPT-4", category: "concept", proficiency: "core" },
      { name: "PyTorch (CNNs, ResNet)", category: "framework", proficiency: "proficient" },
      { name: "Pandas & NumPy", category: "tool", proficiency: "core" },
      { name: "Prompt Engineering & Guardrails", category: "concept", proficiency: "core" },
      { name: "Model Evaluation & Benchmarking", category: "concept", proficiency: "core" },
    ],
    keyConcepts: [
      "Agentic NL-to-SQL translation with 92% validation accuracy",
      "Hybrid retrieval (PostgreSQL + FAISS) with sub-2s query latency",
      "Chain-of-Thought reasoning with 95% clause retrieval precision",
      "Explainability guardrails reducing manual verification effort by 70%",
    ],
  },
  {
    id: "algorithmic-foundations",
    index: "03",
    title: "Core CS & Algorithmic Foundations",
    summary:
      "Rigorous application of data structures, algorithm design, asymptotic analysis, and foundational computer science principles to eliminate computational bottlenecks.",
    accent: "indigo",
    technologies: [
      { name: "C++", category: "language", proficiency: "core" },
      { name: "SQL", category: "language", proficiency: "core" },
      { name: "Data Structures & Algorithms", category: "concept", proficiency: "core" },
      { name: "Object-Oriented Programming (OOP)", category: "concept", proficiency: "core" },
      { name: "Operating Systems & Concurrency", category: "concept", proficiency: "proficient" },
      { name: "DBMS Internals", category: "concept", proficiency: "proficient" },
      { name: "System Design", category: "concept", proficiency: "proficient" },
    ],
    keyConcepts: [
      "Asymptotic time & space complexity analysis (Big-O)",
      "Dynamic programming & graph traversal algorithms",
      "Multi-threading, deadlocks, semaphores & race conditions",
      "Relational schema design & B-tree execution indexing",
    ],
  },
  {
    id: "toolchain-web",
    index: "04",
    title: "DevOps, Cloud & Modern Web",
    summary:
      "Containerized microservices with Docker, modern full-stack web interfaces with React JS and Next.js, interactive Streamlit analytics, and cloud foundation architectures.",
    accent: "amber",
    technologies: [
      { name: "Docker", category: "tool", proficiency: "core" },
      { name: "Git & GitHub", category: "tool", proficiency: "core" },
      { name: "CI/CD Pipelines", category: "concept", proficiency: "proficient" },
      { name: "Linux / POSIX Shell", category: "tool", proficiency: "core" },
      { name: "React JS", category: "framework", proficiency: "core" },
      { name: "Streamlit & Plotly", category: "framework", proficiency: "proficient" },
      { name: "Cloud Foundations (AWS, Azure)", category: "concept", proficiency: "proficient" },
      { name: "Tailwind CSS", category: "tool", proficiency: "core" },
    ],
    keyConcepts: [
      "Dockerized microservice deployments & container networking",
      "Decoupled client-worker microservices (Node.js + Python)",
      "Interactive data dashboards operating 25x faster than manual inspection",
      "Automated test suites & continuous evaluation logging",
    ],
  },
];
