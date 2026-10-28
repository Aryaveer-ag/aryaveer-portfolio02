export interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  category: "Backend & Systems" | "AI & Machine Learning" | "Computer Vision & Systems";
  badgeVariant: "emerald" | "cyan" | "indigo";
  description: string;
  problemStatement: string;
  architectureHighlights: string[];
  technologies: string[];
  statusLabel: string;
  repoUrl?: string;
  specUrl?: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "floatchat-rag",
    title: "FloatChat – Agentic RAG Platform for Oceanographic Data",
    tagline: "Agentic NL-to-SQL generation and hybrid retrieval over NetCDF climate data",
    category: "AI & Machine Learning",
    badgeVariant: "cyan",
    description:
      "An agentic RAG and data retrieval platform enabling researchers to query multi-dimensional NetCDF oceanographic and climate datasets using natural language.",
    problemStatement:
      "Raw NetCDF oceanographic files are massive and multi-dimensional; constructing complex geospatial SQL and semantic queries manually requires deep domain expertise and incurs high query latency.",
    architectureHighlights: [
      "Automated ETL pipeline ingesting raw NetCDF files into structured vector embeddings and relational records",
      "Hybrid retrieval system (PostgreSQL geospatial + FAISS vector similarity) reaching sub-2s query latency at production scale",
      "Fine-tuned Llama-3 translating natural-language queries into optimized SQL with 92% validation accuracy on complex geospatial queries",
      "Production-deployed Dockerized FastAPI + Streamlit application with Plotly interactive ocean visualizations and logged accuracy metrics",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "FAISS", "Llama-3", "Streamlit", "Docker"],
    statusLabel: "Sub-2s Query Latency • 92% Accuracy",
    repoUrl: "https://github.com/Aryaveer-ag",
  },
  {
    id: "flash-sale-engine",
    title: "High-Concurrency Flash Sale Engine",
    tagline: "Distributed inventory reservation under surge traffic with zero overselling",
    category: "Backend & Systems",
    badgeVariant: "emerald",
    description:
      "A high-throughput backend checkout service engineered to absorb surge traffic spikes, prevent race conditions, and guarantee zero inventory overselling under high concurrency.",
    problemStatement:
      "Preventing database write bottlenecks, deadlocks, and duplicate order reservations when 5,000+ concurrent requests target finite inventory items within milliseconds.",
    architectureHighlights: [
      "Prevented inventory overselling under 5,000+ concurrent requests using PostgreSQL ACID transactions and pessimistic row-level locking",
      "Redis caching layer for fast inventory balance checks and early rejection of sold-out requests, offloading unnecessary database traffic",
      "Built checkout API processing 1,000+ req/sec with less than 150ms latency using idempotency keys for safe retries and zero duplicate orders",
      "Dockerized microservice deployment with graceful connection pool backoff and deterministic latency bounds",
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    statusLabel: "5,000+ Concurrent Req • <150ms Latency",
    repoUrl: "https://github.com/Aryaveer-ag",
  },
  {
    id: "pcb-qc-dashboard",
    title: "Automated PCB Quality Control Dashboard",
    tagline: "Decoupled microservice backend and React analytics for sub-second defect screening",
    category: "Computer Vision & Systems",
    badgeVariant: "indigo",
    description:
      "An automated computer vision quality control dashboard converting manual defect screening into an end-to-end data pipeline with sub-second ML inference and production defect analytics.",
    problemStatement:
      "Manual visual inspection of printed circuit boards on assembly lines is slow, inconsistent, and prone to inspector fatigue, missing subtle solder bridges and missing surface-mount components.",
    architectureHighlights: [
      "Decoupled microservice backend (Node.js + Python/FastAPI) architected for image-based PyTorch deep learning inference at scale",
      "REST API data upload pipeline securely routing high-resolution scans from client to ML microservice for sub-second classification",
      "React analytics dashboard and MongoDB schema tracking production trends, flaw categories, and manufacturing defect metrics",
      "Automated defect screening operating 25x faster than manual visual inspection, taken from prototype to full working MVP",
    ],
    technologies: ["Node.js", "React", "Python", "FastAPI", "MongoDB", "REST APIs", "PyTorch"],
    statusLabel: "25x Faster Screening • Sub-Second Inference",
    repoUrl: "https://github.com/Aryaveer-ag",
  },
  {
    id: "insurance-compliance-engine",
    title: "Automated Insurance Policy Compliance Engine",
    tagline: "Auditable RAG pipeline with Chain-of-Thought reasoning and explainability guardrails",
    category: "AI & Machine Learning",
    badgeVariant: "cyan",
    description:
      "An enterprise compliance verification microservice that parses unstructured insurance claims, retrieves authoritative policy clauses, and generates verifiable compliance decisions.",
    problemStatement:
      "Unstructured insurance claims contain lengthy multi-page narratives that take adjusters hours to verify against complex regulatory clauses, while standard generative AI models risk ungrounded decisions.",
    architectureHighlights: [
      "Scalable RAG pipeline (LangChain + GPT-4 + FAISS) parsing unstructured claim documents and retrieving policy clauses with 95% precision",
      "Chain-of-Thought reasoning with explainability guardrails on AI-generated decisions, reducing manual verification effort by 70%",
      "Dockerized FastAPI + Streamlit microservice with structured output validation to catch and flag low-confidence responses",
      "Deterministic citation linking tying every decision directly to verifiable clause IDs and policy text excerpts",
    ],
    technologies: ["Python", "LangChain", "OpenAI GPT-4", "FastAPI", "Streamlit", "FAISS", "Docker"],
    statusLabel: "95% Retrieval Precision • 70% Less Effort",
    repoUrl: "https://github.com/Aryaveer-ag",
  },
];

