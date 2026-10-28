import type { SkillCategory, SkillItem, AssociatedProjectSummary } from "../types/skillsExplorer.ts";
import { featuredProjects } from "./projects.ts";

export const skillCategories: SkillCategory[] = [
  "Programming",
  "Backend and APIs",
  "Databases and systems",
  "AI and machine learning",
  "Development tools",
];

export const skillsCatalog: SkillItem[] = [
  // 1. Programming
  {
    id: "python",
    name: "Python",
    category: "Programming",
    accent: "emerald",
    description:
      "High-throughput backend development, asynchronous FastAPI services, PyTorch deep learning, and LangChain/Llama-3 agentic workflows.",
    associatedProjectIds: ["floatchat-rag", "flash-sale-engine", "pcb-qc-dashboard", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Powers the automated NetCDF ETL pipeline, FAISS hybrid search, and fine-tuned Llama-3 translation runtime.",
      "flash-sale-engine":
        "Implements the high-concurrency FastAPI checkout API, idempotency middleware, and PostgreSQL transactional commits.",
      "pcb-qc-dashboard":
        "Powers the PyTorch convolutional classification worker and sub-second defect inference microservice.",
      "insurance-compliance-engine":
        "Powers the LangChain RAG pipeline, Chain-of-Thought evaluation logic, and Pydantic guardrail schemas.",
    },
    courseworkContext:
      "Core language for machine learning, data engineering, and backend microservice development at DTU.",
  },
  {
    id: "typescript",
    name: "TypeScript & JavaScript",
    category: "Programming",
    accent: "indigo",
    description:
      "Strictly typed full-stack development, decoupled Node.js API routing, React analytics interfaces, and type-safe data contracts.",
    associatedProjectIds: ["pcb-qc-dashboard"],
    projectApplications: {
      "pcb-qc-dashboard":
        "Powers the Node.js REST API gateway routing scans to the ML worker, and the interactive React analytics dashboard.",
    },
    courseworkContext:
      "Applied in full-stack web applications, front-end state management, and type-safe API tooling.",
  },
  {
    id: "cpp",
    name: "C++",
    category: "Programming",
    accent: "indigo",
    description:
      "Low-level memory management, systems programming, and high-performance algorithmic problem solving with strict runtime bounds.",
    associatedProjectIds: [],
    courseworkContext:
      "Primary language for Data Structures & Algorithms coursework at DTU; competitive programming, pointer manipulation, and asymptotic performance profiling.",
  },
  {
    id: "sql",
    name: "SQL",
    category: "Programming",
    accent: "cyan",
    description:
      "Relational schema modeling, multi-table queries, ACID transactional isolation, pessimistic row-level locking, and query optimization.",
    associatedProjectIds: ["flash-sale-engine", "floatchat-rag"],
    projectApplications: {
      "flash-sale-engine":
        "Pessimistic row-level locking (`SELECT ... FOR UPDATE`) and ACID order commits preventing overselling under 5,000+ concurrent requests.",
      "floatchat-rag":
        "Geospatial bounding-box queries in PostgreSQL paired with fine-tuned Llama-3 SQL generation achieving 92% validation accuracy.",
    },
    courseworkContext:
      "Relational Database Management Systems (DBMS) lab and coursework at DTU covering normalization, transactions, and indexing.",
  },

  // 2. Backend and APIs
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend and APIs",
    accent: "cyan",
    description:
      "High-performance Python asynchronous web framework with automatic OpenAPI documentation, dependency injection, and Pydantic validation.",
    associatedProjectIds: ["floatchat-rag", "flash-sale-engine", "pcb-qc-dashboard", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Asynchronous query endpoint orchestrating dual retrieval and streaming results in sub-2s latency.",
      "flash-sale-engine":
        "Checkout API processing 1,000+ req/sec with less than 150ms latency using idempotency keys.",
      "pcb-qc-dashboard":
        "Dedicated ML microservice executing sub-second PyTorch tensor inference on uploaded PCB scans.",
      "insurance-compliance-engine":
        "Dockerized compliance microservice validating claims against policy clauses with structured outputs.",
    },
    courseworkContext:
      "Applied in building modular microservice endpoints and REST API prototypes for machine learning services.",
  },
  {
    id: "nodejs-runtime",
    name: "Node.js & Express",
    category: "Backend and APIs",
    accent: "emerald",
    description:
      "Event-driven asynchronous server-side runtime for high-concurrency network services, secure file uploads, and decoupled I/O.",
    associatedProjectIds: ["pcb-qc-dashboard"],
    projectApplications: {
      "pcb-qc-dashboard":
        "Decoupled microservice backend streaming high-resolution client scans securely to the Python inference engine.",
    },
    courseworkContext:
      "Client-server architecture, asynchronous I/O event loops, and middleware pipeline design.",
  },
  {
    id: "rest-architecture",
    name: "RESTful Architecture & APIs",
    category: "Backend and APIs",
    accent: "indigo",
    description:
      "Clean API contract design adhering to stateless HTTP semantics, idempotency guarantees, and structured error responses.",
    associatedProjectIds: ["flash-sale-engine", "pcb-qc-dashboard", "floatchat-rag"],
    projectApplications: {
      "flash-sale-engine":
        "Idempotent reservation endpoints preventing duplicate submissions and ensuring safe client retries.",
      "pcb-qc-dashboard":
        "High-resolution scan upload pipeline connecting client frontend to decoupled ML microservice.",
      "floatchat-rag":
        "Structured query endpoints returning serialized geospatial telemetry and vector similarity scores.",
    },
    courseworkContext:
      "Computer Networks and Distributed Systems curriculum at DTU covering HTTP/HTTPS, sockets, and transport layers.",
  },
  {
    id: "concurrency-control",
    name: "Concurrency & Race Mitigation",
    category: "Backend and APIs",
    accent: "emerald",
    description:
      "Techniques and data structures to prevent race conditions, dirty reads, and overselling under surge traffic.",
    associatedProjectIds: ["flash-sale-engine"],
    projectApplications: {
      "flash-sale-engine":
        "Prevented inventory overselling under 5,000+ concurrent requests using PostgreSQL row-level locks and Redis caching.",
    },
    courseworkContext:
      "Operating Systems multi-threading, semaphores, mutexes, and deadlocks studied in DTU core CS curriculum.",
  },

  // 3. Databases and systems
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases and systems",
    accent: "cyan",
    description:
      "Robust relational database engine with advanced ACID transactional guarantees, row-level locks, and spatial indexing.",
    associatedProjectIds: ["flash-sale-engine", "floatchat-rag"],
    projectApplications: {
      "flash-sale-engine":
        "Pessimistic row-level locking (`SELECT ... FOR UPDATE`) guaranteeing absolute zero overselling.",
      "floatchat-rag":
        "Geospatial coordinate storage and indexed relational ocean metadata querying.",
    },
    courseworkContext:
      "Relational database theory, B-tree indexes, execution plans, and transaction isolation levels.",
  },
  {
    id: "redis",
    name: "Redis",
    category: "Databases and systems",
    accent: "emerald",
    description:
      "In-memory key-value data store used for sub-millisecond inventory caching, rate limiting, and early rejection of sold-out traffic.",
    associatedProjectIds: ["flash-sale-engine"],
    projectApplications: {
      "flash-sale-engine":
        "Used Redis for fast inventory balance checks and instant early rejection of sold-out requests, shielding database traffic.",
    },
    courseworkContext:
      "High-performance cache hierarchies, eviction policies (LRU/LFU), and memory-bounded storage strategies.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Databases and systems",
    accent: "emerald",
    description:
      "Flexible document-oriented database schema optimized for hierarchical telemetry, defect coordinates, and dynamic manufacturing logs.",
    associatedProjectIds: ["pcb-qc-dashboard"],
    projectApplications: {
      "pcb-qc-dashboard":
        "Stores high-resolution inspection metadata, defect coordinate bounding boxes, and aggregate production line analytics.",
    },
    courseworkContext:
      "NoSQL database architectures, document validation schemas, and high-velocity append-only logging.",
  },
  {
    id: "distributed-fundamentals",
    name: "System Design Fundamentals",
    category: "Databases and systems",
    accent: "amber",
    description:
      "Foundations of scalable architectures including decoupling, microservices, cache-aside patterns, and fault isolation.",
    associatedProjectIds: ["flash-sale-engine", "pcb-qc-dashboard"],
    projectApplications: {
      "flash-sale-engine":
        "Multi-tier isolation decoupling client API admission from persistent relational transactions.",
      "pcb-qc-dashboard":
        "Decoupled microservice architecture separating client I/O (Node.js) from ML inference (FastAPI/PyTorch).",
    },
    courseworkContext:
      "Distributed systems coursework and independent engineering explorations into fault tolerance and partitioning.",
  },
  {
    id: "os-internals",
    name: "Operating Systems Principles",
    category: "Databases and systems",
    accent: "indigo",
    description:
      "Process scheduling, virtual memory management, file system architectures, and POSIX system calls.",
    associatedProjectIds: [],
    courseworkContext:
      "Rigorous core DTU curriculum: Unix processes, fork/exec, thread scheduling, page replacement, and memory virtualization.",
  },

  // 4. AI and machine learning
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI and machine learning",
    accent: "cyan",
    description:
      "Deep learning framework for building, training, and deploying neural network architectures with hardware-accelerated tensor execution.",
    associatedProjectIds: ["pcb-qc-dashboard"],
    projectApplications: {
      "pcb-qc-dashboard":
        "Convolutional neural network inference pipeline identifying solder bridges, broken traces, and missing components.",
    },
    courseworkContext:
      "Machine Learning and Neural Networks coursework at DTU covering backpropagation and gradient descent optimization.",
  },
  {
    id: "vector-retrieval",
    name: "Vector Search & Agentic RAG",
    category: "AI and machine learning",
    accent: "emerald",
    description:
      "Semantic vector indexing, FAISS retrieval, dense embeddings, LangChain agentic pipelines, and grounded generation with guardrails.",
    associatedProjectIds: ["floatchat-rag", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Hybrid retrieval system (PostgreSQL + FAISS) achieving sub-2s query latency across oceanographic datasets.",
      "insurance-compliance-engine":
        "RAG pipeline (LangChain + GPT-4 + FAISS) retrieving policy clauses with 95% precision and Chain-of-Thought reasoning.",
    },
    courseworkContext:
      "Natural Language Processing and Information Retrieval independent research and implementation.",
  },
  {
    id: "computer-vision",
    name: "Computer Vision & Defect Detection",
    category: "AI and machine learning",
    accent: "indigo",
    description:
      "Image preprocessing, bounding box localization, Non-Maximum Suppression (NMS), and automated surface flaw screening.",
    associatedProjectIds: ["pcb-qc-dashboard"],
    projectApplications: {
      "pcb-qc-dashboard":
        "Automated defect screening operating 25x faster than manual visual inspection with sub-second ML inference.",
    },
    courseworkContext:
      "Digital Image Processing and Computer Vision academic electives at DTU.",
  },
  {
    id: "scikit-learn",
    name: "Evaluation Metrics & Validation",
    category: "AI and machine learning",
    accent: "amber",
    description:
      "Accuracy benchmarking, precision/recall evaluation, confusion matrices, and logged metrics for continuous model validation.",
    associatedProjectIds: ["floatchat-rag", "pcb-qc-dashboard", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Logged accuracy metrics evaluating fine-tuned Llama-3 NL-to-SQL translation, achieving 92% validation accuracy.",
      "pcb-qc-dashboard":
        "Precision, recall, and false-positive benchmarking against manual assembly line baseline inspections.",
      "insurance-compliance-engine":
        "95% clause retrieval precision benchmarking and explainability guardrail validation.",
    },
    courseworkContext:
      "Applied Data Science and Machine Learning laboratory at DTU.",
  },

  // 5. Development tools
  {
    id: "docker",
    name: "Docker & Containerization",
    category: "Development tools",
    accent: "cyan",
    description:
      "Containerized microservices ensuring reproducible execution across local environments and production deployments.",
    associatedProjectIds: ["floatchat-rag", "flash-sale-engine", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Production-deployed Docker container running FastAPI backend and Streamlit interface.",
      "flash-sale-engine":
        "Dockerized FastAPI microservice with containerized Redis and PostgreSQL instances.",
      "insurance-compliance-engine":
        "Containerized FastAPI + Streamlit compliance microservice with isolated environment dependencies.",
    },
    courseworkContext:
      "Isolated testing environments and reproducible dependency management.",
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Development tools",
    accent: "amber",
    description:
      "Distributed version control, branch management, pull request reviews, and semantic commit hygiene.",
    associatedProjectIds: ["floatchat-rag", "flash-sale-engine", "pcb-qc-dashboard", "insurance-compliance-engine"],
    projectApplications: {
      "floatchat-rag":
        "Public repository architecture and versioned dataset extraction scripts.",
      "flash-sale-engine":
        "Branching strategy, automated integration testing, and issue management.",
      "pcb-qc-dashboard":
        "Monorepo management decoupling Node.js gateway from Python ML microservice.",
      "insurance-compliance-engine":
        "Versioned prompt templates and LangChain component configuration.",
    },
    courseworkContext:
      "Standard collaboration and project submission toolchain across all DTU lab coursework.",
  },
  {
    id: "linux-tooling",
    name: "Linux & Shell Scripting",
    category: "Development tools",
    accent: "indigo",
    description:
      "Command-line productivity, Bash automation, container logs, and server process inspection.",
    associatedProjectIds: ["floatchat-rag", "flash-sale-engine", "pcb-qc-dashboard"],
    projectApplications: {
      "floatchat-rag":
        "Automated NetCDF downloading and preprocessing shell pipelines.",
      "flash-sale-engine":
        "System performance monitoring, Redis CLI commands, and database container logs.",
      "pcb-qc-dashboard":
        "Microservice startup scripts and optical scan batch preprocessing.",
    },
    courseworkContext:
      "Linux environment proficiency developed through DTU Systems Programming & OS labs.",
  },
  {
    id: "ci-cd",
    name: "Automated Testing & Code Quality",
    category: "Development tools",
    accent: "emerald",
    description:
      "Automated linting, static type verification, test suite execution, and reproducible builds.",
    associatedProjectIds: ["flash-sale-engine", "pcb-qc-dashboard", "floatchat-rag"],
    projectApplications: {
      "flash-sale-engine":
        "Automated unit tests validating inventory non-overselling invariants and idempotency.",
      "pcb-qc-dashboard":
        "Automated evaluation scripts benchmarking validation accuracy and sub-second inference latency.",
      "floatchat-rag":
        "Logged evaluation suite tracking SQL syntax validity and semantic retrieval accuracy.",
    },
    courseworkContext:
      "Software Engineering methodology and test-driven validation practices.",
  },
];

/**
 * Helper to retrieve associated project summaries with specific application notes for a given skill item.
 */
export function getAssociatedProjects(skill: SkillItem): AssociatedProjectSummary[] {
  const summaries: AssociatedProjectSummary[] = [];
  for (const projectId of skill.associatedProjectIds) {
    const proj = featuredProjects.find((p) => p.id === projectId);
    if (proj) {
      const applicationNote =
        skill.projectApplications?.[projectId] || proj.tagline;
      summaries.push({
        id: proj.id,
        title: proj.title,
        category: proj.category,
        applicationNote,
      });
    }
  }
  return summaries;
}
