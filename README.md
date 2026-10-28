# Aryaveer.dev — Interactive Engineering Studio

A high-performance personal engineering studio and portfolio website for **Aryaveer Agarwal**, B.Tech student in Electronics and Communications Engineering at Delhi Technological University (DTU, 2023–2027), specializing in backend & distributed systems, Agentic RAG, machine learning, and algorithmic problem-solving.

---

## Core System Pillars

1. **Engineering-First Flagship Case Studies**:
   - Deep-dive technical breakdowns of 4 production-grade systems:
     - **FloatChat – Agentic RAG Platform for Oceanographic Data** (Llama-3, PostgreSQL + FAISS, sub-2s latency, 92% SQL accuracy).
     - **High-Concurrency Flash Sale Engine** (FastAPI, Redis, PostgreSQL ACID with pessimistic row-level locking, 5,000+ concurrent requests, idempotency).
     - **Automated PCB Quality Control Dashboard** (Decoupled Node.js + FastAPI microservice, React analytics, PyTorch, 25x faster screening).
     - **Automated Insurance Policy Compliance Engine** (LangChain, GPT-4, FAISS, 95% clause precision, Chain-of-Thought explainability guardrails).
   - Architectural topology diagrams, tradeoff analyses, failure mode mitigations, and verifiable implementation source code.
2. **Industry Experience & Leadership**:
   - **Infosys Springboard ML Internship (AI-NutriCare)**: Big data NLP pipeline processing 500,000+ time-series records from the MIMIC-IV clinical database (50+ GB) for personalized nutrition across 20+ clinical conditions.
   - **Cultural Council DTU PR Head & Kalakriti Art Society Lead**: Directed operations for 10+ major festivals including Engifest (150,000+ attendees), secured 50+ corporate sponsorships (OnePlus, Intel), and managed ₹15L+ budgets.
   - **7 Verified Technical Certifications**: Google Cloud, Microsoft Azure, AWS, and freeCodeCamp.
3. **Interactive In-Browser Engineering Lab**:
   - **Flash Sale Engine Simulator**: Deterministic browser simulation modeling atomic decrements and reservation hold queues, verifying that inventory never drops below zero ($0$ overselling invariant).
   - **System Architecture Explorer**: Interactive SVG/HTML node and connection topology covering Checkout Client, FastAPI gateway, Redis in-memory engine, and PostgreSQL database.
   - **Distributed Rate Limiter**: Interactive Token Bucket vs. Sliding Window counter comparison under user-configurable burst traffic rates.
   - **Cache Eviction Visualizer**: Step-by-step memory slot visualizer comparing Least Recently Used (LRU) and Least Frequently Used (LFU) algorithms.
4. **Local AI Portfolio Assistant**:
   - Deterministic, zero-cost, privacy-preserving portfolio assistant answering visitor questions using a strictly verified offline knowledge base covering Aryaveer's systems, internship, leadership, and credentials.
   - Sourced entirely from verified facts without hallucinations, external API latency, or third-party tracking.
   - Built on a pluggable `PortfolioAssistant` service contract using Dependency Inversion.
5. **Services & Client Inquiry Workflow**:
   - Structured client engagement models for backend systems architecture, applied AI/ML pipelines, and codebase modernization.
   - 100% Upwork Escrow Protection notice ensuring mutual security.
   - Interactive inquiry form with client validation and pre-filled mailto dispatch.

---

## Directory Architecture

```
src/
├── app/                  # Next.js App Router (Layouts, routes, global styles)
│   ├── globals.css       # Tailwind CSS theme tokens and dark palettes
│   ├── layout.tsx        # Base root layout, SEO metadata, OpenGraph & Twitter tags
│   ├── not-found.tsx     # Custom, accessible 404 error page
│   └── page.tsx          # Studio homepage (Server Component)
├── components/           # Reusable UI primitives & feature components
│   ├── about/            # Background, DTU academic details & resume cards
│   ├── architecture/     # Interactive system architecture topology explorer
│   ├── assistant/        # Local AI assistant chat panel, launcher & context
│   ├── common/           # Shared UI primitives (Badge, Button, Card, Container)
│   ├── contact/          # Freelance services grid, inquiry form & escrow policies
│   ├── hero/             # Terminal workstation hero section
│   ├── lab/              # In-browser simulators (Flash Sale, Rate Limiter, Cache)
│   ├── layout/           # Global Navbar with mobile drawer & studio Footer
│   ├── projects/         # Case studies cards, filter pills & slide-over drawer
│   └── skills/           # Interactive 5-domain skills matrix with project mappings
├── data/                 # Centralized typed configuration & portfolio facts
│   ├── assistantKnowledge.ts # Verified knowledge base topics & suggested inquiries
│   ├── caseStudies.ts        # Comprehensive project case study design docs
│   ├── experience.ts         # Infosys ML internship, DTU leadership & certifications
│   ├── flashSaleArchitecture.ts # Node & connection topology specifications
│   ├── profile.ts            # Personal specs, contact channels & DTU telemetry
│   ├── projects.ts           # Featured projects baseline
│   ├── services.ts           # Freelance engagement models & escrow guarantees
│   └── skillsExplorer.ts     # 5-domain skills catalog with concrete project linkage
├── modules/lab/engines/  # Algorithmic and simulation engines (Pure TypeScript)
│   ├── CacheEviction.ts  # LRU and LFU cache implementations
│   ├── FlashSaleEngine.ts # Deterministic inventory allocation engine
│   ├── SlidingWindow.ts  # Sliding window counter rate limiter
│   └── TokenBucket.ts    # Token bucket rate limiter
├── services/             # Application services & abstractions
│   └── mockAssistant.ts  # Deterministic offline PortfolioAssistant implementation
└── types/                # Domain-wide TypeScript type definitions
    ├── architecture.ts   # System topology types
    ├── assistant.ts      # Assistant service contracts & message models
    ├── flashSaleSim.ts   # Flash sale simulation parameters & results
    ├── projects.ts       # Case study models
    ├── services.ts       # Freelance service contracts
    ├── simulations.ts    # Rate limiter & cache telemetry types
    └── skillsExplorer.ts # Skills matrix models
tests/                    # Automated native unit test suites (Node.js test runner)
├── architecture.test.ts  # Architecture nodes and connection integrity tests
├── assistant.test.ts     # Portfolio assistant intent matching & fallback tests
├── auditIntegrity.test.ts # Cross-referenced project IDs and form validation tests
├── flashSaleEngine.test.ts # Zero overselling & concurrency invariant tests
└── skillsExplorer.test.ts # Skills catalog coverage & project mapping tests
```

---

## Getting Started

### Prerequisites

- **Node.js**: `20.x` or higher (tested with `v24.12.0`)
- **npm**: `10.x` or higher (tested with `11.6.2`)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quality & Verification Pipeline

The codebase includes automated unit test suites running on Node's native test runner (`node --test --experimental-strip-types`), strict TypeScript compilation, and ESLint static analysis:

```bash
# 1. Run all unit tests (26 tests across 5 suites)
npm test

# 2. Strict TypeScript type check
npx tsc --noEmit

# 3. Static code analysis and linting
npm run lint

# 4. Production Webpack build
npm run build
```

---

## Extensibility & SOLID Architecture

### 1. Adding a New Project Case Study (Open/Closed Principle)
To add a new project without modifying any React rendering components:
1. Open `src/data/caseStudies.ts`.
2. Append a new object conforming to `ProjectCaseStudy`.
3. The project immediately appears in the case study grid, filter categories, drawer slide-over, and skills matrix mapping.

### 2. Adding a New Skill
1. Open `src/data/skillsExplorer.ts`.
2. Append a new `SkillItem` to `skillsCatalog` with its category, description, and `associatedProjectIds`.
3. The skills explorer automatically updates its category counts, selector pills, and project links.

### 3. Replacing the Mock Assistant with a Live LLM API (Dependency Inversion)
The AI assistant is decoupled from the chat UI through the `PortfolioAssistant` interface (`src/types/assistant.ts`):

```typescript
export interface PortfolioAssistant {
  ask(question: string): Promise<string>;
}
```

To connect an edge function or external LLM API (e.g., Gemini, OpenAI, Claude):
1. Create a class implementing `PortfolioAssistant`:
   ```typescript
   export class CloudAIPortfolioAssistant implements PortfolioAssistant {
     async ask(question: string): Promise<string> {
       const res = await fetch("/api/assistant", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ question }),
       });
       const data = await res.json();
       return data.answer;
     }
   }
   ```
2. Pass the instance to `<AssistantProvider assistant={new CloudAIPortfolioAssistant()}>` or directly to `<PortfolioAssistantWidget assistant={...} />`.
3. The chat panel, quick prompt pills, and message renderer continue functioning with zero code changes.

---

## Security & Privacy

- **Zero API Keys in Browser**: The offline assistant runs deterministically in the client without external keys or network calls.
- **Privacy-Preserving**: No user conversation history or client analytics are persisted to external databases.
- **Environment Isolation**: `.env` and `.env.local` files are strictly excluded via `.gitignore`.

---

## License

Private repository &copy; 2026 Aryaveer Agarwal. All rights reserved.
