import type { SuggestedQuestion } from "../types/assistant.ts";

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: "q-backend",
    text: "What backend projects has Aryaveer built?",
    category: "backend",
  },
  {
    id: "q-flash-sale",
    text: "Explain the flash-sale engine.",
    category: "backend",
  },
  {
    id: "q-ai",
    text: "Show me his AI projects.",
    category: "ai",
  },
  {
    id: "q-tech",
    text: "What technologies has he used?",
    category: "skills",
  },
  {
    id: "q-contact",
    text: "How can I discuss a project with him?",
    category: "contact",
  },
];

export interface KnowledgeTopic {
  id: string;
  keywords: string[];
  patterns: RegExp[];
  answer: string;
}

export const KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  // 1. Backend Projects
  {
    id: "backend-projects",
    keywords: [
      "backend",
      "server",
      "distributed",
      "architecture",
      "microservice",
      "concurrency",
      "backend projects",
    ],
    patterns: [
      /backend project/i,
      /what.*backend/i,
      /server.*built/i,
      /systems.*built/i,
    ],
    answer:
      "Aryaveer's primary backend project is the **High-Concurrency Flash Sale Engine**.\n\n" +
      "It is engineered in Python and FastAPI to absorb surge traffic and eliminate inventory overselling under 5,000+ concurrent requests. It uses PostgreSQL ACID transactions with pessimistic row-level locking (`SELECT ... FOR UPDATE`), Redis caching for fast inventory checks and early rejection of sold-out requests, and idempotency keys to process 1,000+ req/sec with less than 150ms latency.\n\n" +
      "You can explore the full case study under [Featured Projects](#projects) or test the deterministic simulation live in the [Engineering Lab](#lab).",
  },

  // 2. Flash Sale Engine Deep Dive
  {
    id: "flash-sale-deep-dive",
    keywords: [
      "flash-sale",
      "flash sale",
      "redis",
      "lua",
      "pessimistic",
      "acid",
      "overselling",
      "inventory",
      "reservation",
      "contention",
      "engine",
    ],
    patterns: [
      /explain.*flash.*sale/i,
      /how does.*flash.*sale/i,
      /flash.*sale.*engine/i,
      /oversell/i,
      /inventory.*simulation/i,
    ],
    answer:
      "The **High-Concurrency Flash Sale Engine** solves race conditions when thousands of concurrent requests target finite stock:\n\n" +
      "1. **Pessimistic Row-Level Locking:** Uses PostgreSQL ACID transactions with `SELECT ... FOR UPDATE` to strictly prevent inventory overselling under 5,000+ concurrent requests, guaranteeing balance never drops below zero.\n" +
      "2. **Fast In-Memory Rejection:** Uses Redis for fast inventory balance checks and instant early rejection of sold-out requests, shielding the database from query storms.\n" +
      "3. **API Reliability & Idempotency:** The checkout API processes 1,000+ req/sec with <150ms latency, utilizing unique idempotency keys to eliminate duplicate orders on client retries.\n\n" +
      "You can test this behavior interactively in the [Engineering Lab Simulator](#lab) or inspect the component topology in the [Architecture Explorer](#lab).",
  },

  // 3. AI & Machine Learning Projects
  {
    id: "ai-projects",
    keywords: [
      "ai",
      "machine learning",
      "ml",
      "deep learning",
      "pytorch",
      "vision",
      "floatchat",
      "insurance",
      "compliance",
      "rag",
      "pcb",
      "llama",
    ],
    patterns: [
      /ai project/i,
      /show.*ai/i,
      /machine learning/i,
      /floatchat/i,
      /insurance/i,
      /compliance/i,
      /pcb/i,
      /computer vision/i,
    ],
    answer:
      "Aryaveer has engineered three flagship AI and machine learning systems:\n\n" +
      "1. **FloatChat (Agentic RAG for Oceanographic Data):** Multi-dimensional NetCDF climate data querying using fine-tuned Llama-3 for NL-to-SQL translation (92% accuracy) and a PostgreSQL + FAISS hybrid retrieval system achieving sub-2s latency.\n" +
      "2. **Automated Insurance Policy Compliance Engine:** Scalable RAG pipeline using LangChain, GPT-4, and FAISS with 95% clause retrieval precision, featuring Chain-of-Thought reasoning with explainability guardrails that reduce manual verification effort by 70%.\n" +
      "3. **Automated PCB Quality Control Dashboard:** Decoupled microservice architecture (Node.js + FastAPI) running PyTorch convolutional defect classification, operating 25x faster than manual visual inspection with sub-second inference.\n\n" +
      "All systems are detailed in the [Case Studies section](#projects).",
  },

  // 4. Technologies & Tech Stack
  {
    id: "technologies-used",
    keywords: [
      "technologies",
      "tech stack",
      "languages",
      "skills",
      "tools",
      "frameworks",
      "stack",
      "typescript",
      "python",
      "c++",
      "redis",
      "postgres",
    ],
    patterns: [
      /what technolog/i,
      /what stack/i,
      /what skills/i,
      /programming language/i,
      /tech stack/i,
      /tools.*used/i,
    ],
    answer:
      "Aryaveer's technical stack is organized across 5 core domains:\n\n" +
      "- **Programming:** TypeScript, Python, C++, SQL\n" +
      "- **Backend & APIs:** FastAPI, Node.js & Express, RESTful APIs, Concurrency Control\n" +
      "- **Databases & Systems:** PostgreSQL, Redis (Lua/Caching), Distributed Systems, Operating Systems (POSIX)\n" +
      "- **AI & Machine Learning:** PyTorch, Vector Search/RAG, Computer Vision, Scikit-Learn\n" +
      "- **Development Tools:** Docker, Git & GitHub, Linux/Shell, CI/CD & Automated Testing\n\n" +
      "You can interact with every skill and its exact project application in the [Skills Matrix](#about).",
  },

  // 5. Contact & Collaboration
  {
    id: "contact-discussion",
    keywords: [
      "contact",
      "discuss",
      "hire",
      "email",
      "upwork",
      "freelance",
      "collaborate",
      "talk",
      "reach out",
      "connect",
    ],
    patterns: [
      /how.*discuss/i,
      /how.*contact/i,
      /how.*hire/i,
      /work together/i,
      /start.*project/i,
      /email/i,
    ],
    answer:
      "You can discuss a project or engineering inquiry with Aryaveer through the following verified channels:\n\n" +
      "- **Direct Email:** [aryaveeragarwal10@gmail.com](mailto:aryaveeragarwal10@gmail.com) — monitored regularly for engineering inquiries.\n" +
      "- **LinkedIn:** Connect for professional and recruitment inquiries at [linkedin.com/in/aryaveer-agarwal-dtu](https://linkedin.com/in/aryaveer-agarwal-dtu/).\n" +
      "- **GitHub:** Explore public repositories at [github.com/Aryaveer-ag](https://github.com/Aryaveer-ag).\n" +
      "- **Upwork:** Available for freelance software engineering contracts.\n" +
      "- **Quick Inquiry Form:** Send a message directly via the [Contact Section](#contact).\n\n" +
      "Engineering resumes in PDF format are also dispatched directly upon email inquiry.",
  },

  // 6. Academic Background at DTU
  {
    id: "academic-background",
    keywords: [
      "dtu",
      "college",
      "university",
      "education",
      "degree",
      "delhi technological university",
      "graduation",
      "student",
      "btech",
      "academics",
    ],
    patterns: [
      /where.*study/i,
      /education/i,
      /academics/i,
      /degree/i,
      /when.*graduate/i,
      /dtu.*degree/i,
      /study.*dtu/i,
      /college.*degree/i,
      /btech/i,
    ],
    answer:
      "Aryaveer Agarwal is an **undergraduate engineering student at Delhi Technological University (DTU)**, pursuing his Bachelor of Technology (B.Tech) degree in **Electronics and Communications Engineering (2023–2027)**.\n\n" +
      "His coursework and practical focus cover foundational computer science: Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems & Concurrency, Computer Networks, and Machine Learning.\n\n" +
      "Review the full academic background in the [About Section](#about).",
  },

  // 7. Engineering Lab & Simulations
  {
    id: "engineering-lab",
    keywords: [
      "lab",
      "simulation",
      "simulator",
      "rate limiter",
      "cache eviction",
      "lru",
      "lfu",
      "token bucket",
    ],
    patterns: [
      /engineering lab/i,
      /what.*simulat/i,
      /rate limiter.*sim/i,
      /cache.*sim/i,
    ],
    answer:
      "The [Engineering Lab](#lab) features 4 in-browser interactive simulators built to demonstrate backend systems principles:\n\n" +
      "1. **Flash Sale Engine Simulator:** Configurable stock $N$ and requests $R$ demonstrating atomic decrement without overselling.\n" +
      "2. **Interactive Architecture Explorer:** Clickable node and connection topology covering Client, FastAPI, Redis, and PostgreSQL.\n" +
      "3. **Rate Limiter Visualizer:** Token Bucket vs. Sliding Window counter comparison under burst traffic.\n" +
      "4. **Cache Eviction Visualizer:** LRU (Least Recently Used) vs. LFU (Least Frequently Used) hit/miss comparison.\n\n" +
      "Visit the [Engineering Lab](#lab) to run the simulations directly in your browser.",
  },

  // 8. Freelance Services & Upwork Engagements
  {
    id: "freelance-services",
    keywords: [
      "services",
      "freelance services",
      "consulting",
      "contracts",
      "upwork",
      "escrow",
      "offer",
      "hire",
      "engagement",
    ],
    patterns: [
      /what services/i,
      /freelance.*offer/i,
      /how do you work/i,
      /engagement.*model/i,
      /upwork.*contract/i,
    ],
    answer:
      "Aryaveer offers 3 structured freelance engineering engagement models with 100% Upwork Escrow protection:\n\n" +
      "1. **Backend & Systems Architecture:** Production REST APIs in Node.js/TypeScript or FastAPI, Redis Lua atomic scripts, and PostgreSQL schema design.\n" +
      "2. **Applied AI & ML Pipelines:** Grounded RAG retrieval pipelines with dense embeddings and PyTorch computer vision inspection models.\n" +
      "3. **Systems Profiling & Code Modernization:** Latency bottleneck profiling, race condition elimination, and strict TypeScript/Python refactoring.\n\n" +
      "Explore all offerings and select an engagement model in the [Services & Contact Section](#contact).",
  },

  // 9. Industry Experience & Internships
  {
    id: "internship-experience",
    keywords: [
      "experience",
      "internship",
      "intern",
      "infosys",
      "springboard",
      "nutricare",
      "mimic",
      "clinical",
      "work experience",
    ],
    patterns: [
      /internship/i,
      /infosys/i,
      /where.*worked/i,
      /work.*experience/i,
      /nutricare/i,
      /industry experience/i,
    ],
    answer:
      "Aryaveer completed a Machine Learning Internship at **Infosys Springboard** (Nov 2025 – Jan 2026), engineering **AI-NutriCare**:\n\n" +
      "- **NLP Clinical Parsing:** Converted unstructured physician notes, prescriptions, and diagnostic lab reports into structured patient health profiles.\n" +
      "- **MIMIC-IV Big Data:** Processed 500,000+ time-series patient records from the MIMIC-IV clinical database (50+ GB) to extract health-nutrition correlations.\n" +
      "- **Personalization Engine:** Built a recommendation engine dynamically adapting dietary recommendations across 20+ specific clinical conditions, validated against clinical guidelines.\n\n" +
      "Details are featured in the [Experience section](#about).",
  },

  // 10. Leadership & Extracurriculars
  {
    id: "leadership-roles",
    keywords: [
      "leadership",
      "cultural council",
      "kalakriti",
      "engifest",
      "sponsorship",
      "oneplus",
      "intel",
      "extracurricular",
    ],
    patterns: [
      /leadership/i,
      /cultural council/i,
      /engifest/i,
      /kalakriti/i,
      /sponsorship/i,
      /responsibilit/i,
    ],
    answer:
      "Aryaveer holds key leadership roles at Delhi Technological University:\n\n" +
      "1. **Public Relations Head, Cultural Council DTU (Jan 2024 – Present):** Directed operations for 10+ large-scale events including Engifest (150,000+ attendees), secured 50+ corporate sponsorships (OnePlus, Intel), and doubled digital channel reach.\n" +
      "2. **Corporate Relations Lead, Kalakriti Art Society DTU (Jan 2024 – Present):** Managed Delhi-NCR's largest collegiate art festival spanning 70+ colleges with a budget exceeding ₹15 Lakhs.\n\n" +
      "Explore the [Leadership section](#about) for full details.",
  },

  // 11. Certifications & Credentials
  {
    id: "certifications-credentials",
    keywords: [
      "certifications",
      "credentials",
      "badges",
      "google cloud",
      "azure",
      "aws",
      "freecodecamp",
      "certified",
    ],
    patterns: [
      /certification/i,
      /credentials/i,
      /google cloud.*genai/i,
      /azure.*skills/i,
      /aws.*badge/i,
    ],
    answer:
      "Aryaveer holds 7 verified technical credentials from leading cloud and developer institutions:\n\n" +
      "- **Google Cloud:** Generative AI Fundamentals\n" +
      "- **Microsoft Applied Skills:** Generative AI Solutions on Azure\n" +
      "- **AWS Knowledge Badge:** Cloud Essentials & AI Foundations\n" +
      "- **freeCodeCamp:** Relational Database (SQL)\n" +
      "- **freeCodeCamp:** Machine Learning with Python\n" +
      "- **freeCodeCamp:** Front End Development Libraries (React JS)\n" +
      "- **freeCodeCamp:** Data Analysis with Python\n\n" +
      "All credentials are listed in the [Credentials section](#about).",
  },
];

export const FALLBACK_UNKNOWN_RESPONSE =
  "I don't have verified information regarding that specific query. As a portfolio assistant, I only provide factual information about Aryaveer's software engineering background at DTU, his backend and AI projects, technical skills, or how to contact him.\n\n" +
  "You can ask one of the suggested questions below, explore his [Featured Projects](#projects), or get in touch directly via [aryaveeragarwal10@gmail.com](mailto:aryaveeragarwal10@gmail.com).";

