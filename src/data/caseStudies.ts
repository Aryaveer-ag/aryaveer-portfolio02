import type { ProjectCaseStudy } from "../types/projects.ts";

export const caseStudiesData: ProjectCaseStudy[] = [
  // 1. FloatChat – Agentic RAG Platform for Oceanographic Data
  {
    id: "floatchat-rag",
    slug: "floatchat-rag",
    title: "FloatChat – Agentic RAG Platform for Oceanographic Data",
    tagline: "Agentic NL-to-SQL generation and hybrid retrieval over NetCDF climate data",
    category: "AI & Machine Learning",
    badgeVariant: "cyan",
    statusLabel: "Sub-2s Query Latency • 92% SQL Accuracy",
    summary:
      "An agentic RAG and data retrieval platform enabling oceanographers and climate researchers to query massive multi-dimensional NetCDF datasets using natural language, achieving sub-2s query latency and 92% SQL validation accuracy.",
    problemStatement:
      "Raw NetCDF oceanographic files represent multi-gigabyte spatial grids with time-series measurements (temperature, salinity, pressure across depth). Constructing geospatial SQL queries and cross-referencing multi-variable metadata manually required marine scientists to spend hours per query iteration, creating research bottlenecks.",
    systemArchitecture: {
      overview:
        "The architecture combines an automated NetCDF ingestion ETL pipeline with a dual-layer hybrid retrieval engine (PostgreSQL geospatial indexing + FAISS vector embeddings). A fine-tuned Llama-3 model acts as an agentic translator converting natural language into optimized SQL queries, served via Dockerized FastAPI and Streamlit microservices with Plotly visualizations.",
      flowStages: [
        {
          order: 1,
          title: "Automated NetCDF ETL Ingestion",
          component: "Ingestion Worker (Python / xarray)",
          description:
            "Extracts raw multidimensional climate arrays from NetCDF files, normalizes temporal coordinates, generates relational metadata rows, and chunks contextual variables.",
        },
        {
          order: 2,
          title: "Hybrid Indexing & Vectorization",
          component: "PostgreSQL & FAISS Store",
          description:
            "Spatial boundaries and numerical telemetry are indexed in PostgreSQL, while textual documentation and parameter descriptions are embedded into a high-speed FAISS vector index.",
        },
        {
          order: 3,
          title: "Agentic NL-to-SQL Translation",
          component: "Fine-Tuned Llama-3 Engine",
          description:
            "User natural-language prompts are mapped to calibrated SQL statements with schema-aware guardrails, achieving 92% validation accuracy on complex geospatial boundaries.",
        },
        {
          order: 4,
          title: "Sub-2s Execution & Plotly Rendering",
          component: "FastAPI + Streamlit + Plotly",
          description:
            "FastAPI executes the generated SQL alongside vector similarity lookups in under 2 seconds, streaming structured series data to interactive Streamlit Plotly visualizers.",
        },
      ],
      diagramAscii: `
[Natural Language Query] ("Salinity trends in Arabian Sea at 500m depth")
       │
       ▼
┌─────────────────────────┐
│ FastAPI API Gateway     │ ── (Token Validation & Query Preprocessing)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Fine-Tuned Llama-3      │ ── [Agentic NL-to-SQL Engine]
│ (92% Validation Acc)    │    ├─ Schema Inspection & Type Coercion
│                         │    └─ Logged Accuracy Evaluation Metrics
└───────────┬─────────────┘
            │
            ├───────────────────────────────┐
            ▼ (Geospatial SQL Filter)       ▼ (Semantic Context)
┌─────────────────────────┐     ┌─────────────────────────┐
│ PostgreSQL Engine       │     │ FAISS Vector Index      │
│ (Bounding Boxes & Depth)│     │ (Parameter Similarity)  │
└───────────┬─────────────┘     └───────────┬─────────────┘
            │                               │
            └───────────────┬───────────────┘
                            ▼
┌─────────────────────────┐
│ Interactive Streamlit   │ ── [Sub-2s Response Latency]
│ & Plotly Visualizations │    (Dynamic Heatmaps & Ocean Trajectories)
└─────────────────────────┘
`,
    },
    tradeoffs: [
      {
        decision: "Hybrid FAISS + PostgreSQL retrieval vs. Pure Vector Store",
        chosenApproach: "Hybrid dual retrieval (PostgreSQL for numeric bounding + FAISS for semantic intent)",
        alternativeConsidered: "Storing entire multidimensional climate grid in a dense vector database",
        rationale:
          "Dense vector similarity alone cannot accurately execute strict mathematical bounding conditions (e.g., 'depth between 400m and 600m' or 'salinity > 35 PSU'). PostgreSQL handles exact relational filters in microseconds, while FAISS handles ambiguous parameter semantics.",
      },
      {
        decision: "Fine-tuned open-weights Llama-3 vs. Proprietary API calls",
        chosenApproach: "Fine-tuned Llama-3 deployed on local infrastructure",
        alternativeConsidered: "Zero-shot prompting via cloud-hosted proprietary API",
        rationale:
          "Fine-tuning Llama-3 on domain-specific oceanographic SQL schemas achieved 92% validation accuracy without recurring per-query API token costs, while keeping scientific research data fully private within Dockerized environments.",
      },
    ],
    failureModes: [
      {
        scenario: "Hallucinated or syntactically invalid SQL from user queries",
        mitigation:
          "AST-based SQL query sanitizer validating table identifiers and injecting strict READ-ONLY transaction scopes before query execution.",
      },
      {
        scenario: "Memory exhaustion during raw NetCDF multi-gigabyte ingestion",
        mitigation:
          "Chunked tile streaming using xarray and Dask lazy loading, preventing memory spikes by processing coordinate dimensions in bounded batches.",
      },
    ],
    codeSnippet: {
      filename: "hybrid_query_engine.py",
      language: "python",
      explanation:
        "FastAPI query execution service orchestrating fine-tuned Llama-3 SQL generation, relational query execution, and FAISS semantic context retrieval.",
      code: `import time
from typing import Dict, Any, List
from fastapi import APIRouter, HTTPException
import psycopg2
import faiss
import numpy as np

router = APIRouter(prefix="/api/floatchat")

class OceanDataRetriever:
    def __init__(self, db_conn, faiss_index, embedding_model, llama_engine):
        self.conn = db_conn
        self.index = faiss_index
        self.embed = embedding_model
        self.llm = llama_engine

    async def execute_query(self, user_prompt: str) -> Dict[str, Any]:
        start_time = time.perf_counter()

        # Step 1: Semantic parameter search via FAISS
        query_vec = self.embed.encode([user_prompt]).astype("float32")
        _, indices = self.index.search(query_vec, k=3)
        context_params = [self.index.metadata[i] for i in indices[0] if i >= 0]

        # Step 2: Agentic SQL translation with fine-tuned Llama-3
        generated_sql = self.llm.translate_to_sql(
            prompt=user_prompt,
            context=context_params
        )

        # Step 3: Enforce AST and read-only safety guardrail
        if not generated_sql.strip().upper().startswith("SELECT"):
            raise HTTPException(status_code=400, detail="Disallowed non-SELECT query generated.")

        # Step 4: Execute geospatial query in PostgreSQL
        with self.conn.cursor() as cur:
            cur.execute(generated_sql)
            records = cur.fetchall()
            columns = [desc[0] for desc in cur.description]

        latency_ms = (time.perf_counter() - start_time) * 1000
        return {
            "sql": generated_sql,
            "record_count": len(records),
            "latency_ms": round(latency_ms, 2),
            "results": [dict(zip(columns, row)) for row in records[:100]]
        }`,
    },
    technologies: ["Python", "FastAPI", "PostgreSQL", "FAISS", "Llama-3", "Streamlit", "Docker"],
    links: {
      github: "https://github.com/Aryaveer-ag",
      specDoc: "#",
    },
  },

  // 2. High-Concurrency Flash Sale Engine
  {
    id: "flash-sale-engine",
    slug: "flash-sale-engine",
    title: "High-Concurrency Flash Sale Engine",
    tagline: "Distributed inventory reservation under surge traffic with zero overselling",
    category: "Backend & Systems",
    badgeVariant: "emerald",
    statusLabel: "5,000+ Concurrent Req • <150ms Latency",
    summary:
      "A high-throughput backend checkout architecture engineered in Python and FastAPI to absorb surge traffic spikes, prevent inventory overselling under 5,000+ concurrent requests, and process 1,000+ req/sec with sub-150ms latency using PostgreSQL ACID transactions and Redis caching.",
    problemStatement:
      "During peak promotional events, thousands of concurrent requests hit the checkout endpoint within milliseconds. Unsynchronized database writes lead to row lock contention, connection pool exhaustion, double reservations, and inventory overselling beyond zero balance.",
    systemArchitecture: {
      overview:
        "The architecture implements a multi-tier defense: fast Redis in-memory caching performs instant inventory sanity checks and early rejection of sold-out items to shield the database, while persistent inventory commits execute inside PostgreSQL ACID transactions with pessimistic row-level locking (`SELECT ... FOR UPDATE`). Client retries are governed by unique idempotency keys.",
      flowStages: [
        {
          order: 1,
          title: "Idempotency & Request Admission",
          component: "FastAPI Gateway Layer",
          description:
            "Incoming checkout requests are validated against unique idempotency keys to safely permit retries without risk of duplicate charge or double allocation.",
        },
        {
          order: 2,
          title: "In-Memory Pre-Check & Early Rejection",
          component: "Redis In-Memory Cache",
          description:
            "Fast inventory checks in Redis immediately drop requests when stock is depleted, shielding the relational database from redundant read/write spikes.",
        },
        {
          order: 3,
          title: "Pessimistic Row-Level Lock & Commit",
          component: "PostgreSQL ACID Engine",
          description:
            "Active checkout transactions acquire an explicit `SELECT ... FOR UPDATE` lock on the specific SKU row, decrement stock atomically, and commit the order audit record.",
        },
        {
          order: 4,
          title: "Sync & Microservice Notification",
          component: "Async Task Worker",
          description:
            "Following successful transaction commit, Redis cache stock is reconciled and order confirmation is published to fulfillment queues with sub-150ms roundtrip latency.",
        },
      ],
      diagramAscii: `
[5,000+ Concurrent Requests] (Flash Sale Spike)
       │
       ▼
┌─────────────────────────┐
│ FastAPI Checkout API    │ ── (Idempotency Key Check: Eliminates Duplicates)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ Redis In-Memory Layer   │ ── [Fast Inventory Check]
│                         │    ├─ Stock == 0? ──► Instant 410 Rejection
│                         │    └─ Stock > 0?  ──► Pass to Transaction
└───────────┬─────────────┘
            │ (Shields 95%+ of excess DB traffic)
            ▼
┌─────────────────────────┐
│ PostgreSQL Engine       │ ── [ACID Transaction Scope]
│                         │    ├─ SELECT ... FOR UPDATE (Pessimistic Row Lock)
│                         │    ├─ Strict Invariant: Balance >= Quantity
│                         │    └─ Commit Order & Generate Audit Receipt
└───────────┬─────────────┘
            │
            ▼
[Confirmed Order Receipt] (<150ms Latency • Exactly-Once Guarantee)
`,
    },
    tradeoffs: [
      {
        decision: "Pessimistic row-level locking vs. Unconstrained optimistic concurrency",
        chosenApproach: "PostgreSQL pessimistic row locking (`SELECT ... FOR UPDATE`) within bounded transactions",
        alternativeConsidered: "Optimistic retry loops with version tags",
        rationale:
          "Under extreme contention (>5,000 requests for 50 items), optimistic retry loops cause massive thrashing where 99% of transactions abort and retry repeatedly, generating severe CPU spikes. Pessimistic row locking guarantees deterministic queueing with zero duplicate order risk.",
      },
      {
        decision: "Redis early rejection shield vs. Direct relational hit",
        chosenApproach: "In-memory Redis cache fast-rejection filter",
        alternativeConsidered: "Direct PostgreSQL query for every inbound checkout hit",
        rationale:
          "Once stock drops to zero, thousands of subsequent hits are rejected instantly in Redis in sub-millisecond memory cycles, preserving PostgreSQL connection pools for in-flight purchase completions.",
      },
    ],
    failureModes: [
      {
        scenario: "Network timeout between payment gateway and order persistence",
        mitigation:
          "Idempotency key persistence in Redis and PostgreSQL ensures that client automated retries return the original confirmation without double-billing or double-decrementing stock.",
      },
      {
        scenario: "PostgreSQL transaction deadlock under high simultaneous SKU concurrency",
        mitigation:
          "Strict global SKU lock ordering and deterministic lock acquisition timeouts with exponential backoff on retryable serialization errors.",
      },
    ],
    codeSnippet: {
      filename: "flash_sale_service.py",
      language: "python",
      explanation:
        "FastAPI checkout handler utilizing Redis early rejection, idempotency key verification, and PostgreSQL pessimistic row locking.",
      code: `from fastapi import APIRouter, HTTPException, Header, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
import redis

router = APIRouter(prefix="/api/checkout")
redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)

@router.post("/reserve/{item_id}")
def process_flash_checkout(
    item_id: str,
    quantity: int,
    user_id: str,
    idempotency_key: str = Header(...),
    db: Session = Depends(get_db_session)
):
    # 1. Idempotency Check: Prevent duplicate charge on client retries
    idem_key = f"idem:{idempotency_key}"
    if redis_client.get(idem_key):
        return {"status": "SUCCESS", "message": "Order already processed (cached)."}

    # 2. Redis Early Rejection: Shield database when stock is depleted
    cached_stock = redis_client.get(f"stock:{item_id}")
    if cached_stock is not None and int(cached_stock) < quantity:
        raise HTTPException(status_code=410, detail="Item sold out.")

    # 3. PostgreSQL ACID Transaction with Pessimistic Row Lock
    try:
        with db.begin():
            # Acquire exclusive row lock: blocks concurrent decrements on this SKU
            row = db.execute(
                text("SELECT id, available_stock FROM inventory WHERE id = :id FOR UPDATE"),
                {"id": item_id}
            ).fetchone()

            if not row or row.available_stock < quantity:
                redis_client.set(f"stock:{item_id}", 0)
                raise HTTPException(status_code=410, detail="Insufficient inventory.")

            # Atomically decrement persistent inventory
            db.execute(
                text("UPDATE inventory SET available_stock = available_stock - :qty WHERE id = :id"),
                {"qty": quantity, "id": item_id}
            )

            # Record audited order record
            db.execute(
                text("INSERT INTO orders (user_id, item_id, quantity, idempotency_key) VALUES (:u, :i, :q, :k)"),
                {"u": user_id, "i": item_id, "q": quantity, "k": idempotency_key}
            )

        # Set idempotency TTL for 24 hours & sync remaining stock to Redis
        redis_client.setex(idem_key, 86400, "CONFIRMED")
        redis_client.decrby(f"stock:{item_id}", quantity)

        return {"status": "RESERVED", "item_id": item_id, "quantity": quantity}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))`,
    },
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    links: {
      github: "https://github.com/Aryaveer-ag",
      specDoc: "#",
    },
  },

  // 3. Automated PCB Quality Control Dashboard
  {
    id: "pcb-qc-dashboard",
    slug: "pcb-qc-dashboard",
    title: "Automated PCB Quality Control Dashboard",
    tagline: "Decoupled microservice backend and React analytics for sub-second defect screening",
    category: "Computer Vision & Systems",
    badgeVariant: "indigo",
    statusLabel: "25x Faster Screening • Sub-Second Inference",
    summary:
      "An automated computer vision quality control dashboard converting manual defect screening into an end-to-end data pipeline with a decoupled Node.js + FastAPI microservice architecture, operating 25x faster than manual visual inspection with sub-second ML inference.",
    problemStatement:
      "Manual optical inspection of printed circuit board assemblies is labor-intensive, fatigue-prone, and misses microscopic manufacturing defects such as solder bridges, track fractures, and missing surface-mount pins, leading to costly downstream electronic device failures.",
    systemArchitecture: {
      overview:
        "The system decouples client data upload and telemetry from the deep learning inference engine. A high-performance Node.js REST API routes high-resolution camera scans to a Python/FastAPI microservice executing PyTorch convolutional models, while production data and defect trends are aggregated into MongoDB and rendered via an interactive React analytics dashboard.",
      flowStages: [
        {
          order: 1,
          title: "High-Resolution Image Ingestion",
          component: "Node.js REST API Gateway",
          description:
            "Securely routes multi-megapixel optical PCB scan payloads from production lines, handles authentication, and streams data to the inference pipeline.",
        },
        {
          order: 2,
          title: "Microservice Routing & Preprocessing",
          component: "Decoupled FastAPI Service",
          description:
            "Normalizes image aspect ratios, applies glare-reduction filters, and batches tensor representations for hardware-accelerated classification.",
        },
        {
          order: 3,
          title: "PyTorch Inference & Localization",
          component: "Convolutional Detection Engine",
          description:
            "Executes sub-second flaw classification and Non-Maximum Suppression (NMS) to localize solder bridges, broken traces, and missing SMD components.",
        },
        {
          order: 4,
          title: "Production Analytics & Visualization",
          component: "React Dashboard & MongoDB",
          description:
            "Aggregates yield percentages, defect frequencies, and board telemetry in real time, accelerating defect screening by 25x compared to manual inspection.",
        },
      ],
      diagramAscii: `
[Production Optical Scanners] (High-Res Images)
       │
       ▼
┌─────────────────────────┐
│ Node.js Gateway Layer   │ ── [REST API Data Upload Pipeline]
│                         │    ├─ Secure Stream Ingestion
│                         │    └─ Microservice Dispatch & Auth
└───────────┬─────────────┘
            │
            ▼ (Decoupled REST Routing)
┌─────────────────────────┐
│ Python / FastAPI Worker │ ── [PyTorch Deep Learning Engine]
│ (Sub-Second Inference)  │    ├─ Multi-Scale Feature Extraction
│                         │    ├─ Defect Bounding Boxes (IoU / NMS)
│                         │    └─ Solder Bridge & Missing Pin Detection
└───────────┬─────────────┘
            │
            ├───────────────────────────────┐
            ▼ (Structured Logs)             ▼ (Real-Time Socket Stream)
┌─────────────────────────┐     ┌─────────────────────────┐
│ MongoDB Production DB   │     │ React Analytics UI      │
│ (Historical Defect Data)│ ──► │ (25x Faster Screening)  │
└─────────────────────────┘     └─────────────────────────┘
`,
    },
    tradeoffs: [
      {
        decision: "Decoupled Node.js + FastAPI microservices vs. Monolithic backend",
        chosenApproach: "Decoupled microservices (Node.js I/O gateway + Python/FastAPI ML inference)",
        alternativeConsidered: "Single monolithic backend running both API routing and ML inference",
        rationale:
          "Node.js excels at non-blocking file streaming and client concurrency without blocking on CPU compute, while FastAPI/PyTorch handles GPU-accelerated numerical tensor inference in dedicated worker pools, preventing API starvation.",
      },
      {
        decision: "Document-oriented MongoDB schema vs. Rigid relational schema for defects",
        chosenApproach: "Flexible MongoDB document schema with bounding-box subdocuments",
        alternativeConsidered: "Relational PostgreSQL tables with multiple join foreign keys",
        rationale:
          "Manufacturing defects vary drastically in structure (differing coordinates, classes, confidence arrays, and scan metadata). MongoDB stores dynamic defect telemetry directly with sub-millisecond document write speeds.",
      },
    ],
    failureModes: [
      {
        scenario: "Lighting variance causing false positives from solder reflections",
        mitigation:
          "Contrast-adaptive histogram equalization in image preprocessing alongside augmentation training on specular reflection artifacts.",
      },
      {
        scenario: "Inference worker saturation during high-volume production line bursts",
        mitigation:
          "Asynchronous queue buffer with worker horizontal pod autoscaling and fallback downsampled fast-pass triage.",
      },
    ],
    codeSnippet: {
      filename: "defect_inference_service.py",
      language: "python",
      explanation:
        "FastAPI deep learning inference endpoint performing image preprocessing, PyTorch convolutional classification, and emitting structured defect annotations.",
      code: `import io
import time
from typing import Dict, Any, List
from fastapi import APIRouter, File, UploadFile, HTTPException
from PIL import Image
import torch
import torchvision.transforms as transforms

router = APIRouter(prefix="/api/pcb")

# Transform pipeline matching model training distribution
preprocess = transforms.Compose([
    transforms.Resize((512, 512)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

DEFECT_CLASSES = ["Solder_Bridge", "Missing_Pin", "Broken_Trace", "Hole_Misalignment"]

@router.post("/inspect")
async def inspect_pcb_scan(file: UploadFile = File(...)) -> Dict[str, Any]:
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    start_time = time.perf_counter()
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    tensor = preprocess(image).unsqueeze(0)

    with torch.no_grad():
        # Execute model inference
        outputs = pcb_model(tensor)
        probabilities = torch.softmax(outputs, dim=1)[0]
        confidence, predicted_idx = torch.max(probabilities, dim=0)

    latency_ms = (time.perf_counter() - start_time) * 1000
    is_defective = predicted_idx.item() > 0

    return {
        "filename": file.filename,
        "is_defective": is_defective,
        "defect_type": DEFECT_CLASSES[predicted_idx.item()] if is_defective else "None",
        "confidence": round(confidence.item(), 4),
        "inference_latency_ms": round(latency_ms, 2),
        "pass_fail": "FAIL" if is_defective else "PASS"
    }`,
    },
    technologies: ["Node.js", "React", "Python", "FastAPI", "MongoDB", "REST APIs", "PyTorch"],
    links: {
      github: "https://github.com/Aryaveer-ag",
      specDoc: "#",
    },
  },

  // 4. Automated Insurance Policy Compliance Engine
  {
    id: "insurance-compliance-engine",
    slug: "insurance-compliance-engine",
    title: "Automated Insurance Policy Compliance Engine",
    tagline: "Auditable RAG pipeline with Chain-of-Thought reasoning and explainability guardrails",
    category: "AI & Machine Learning",
    badgeVariant: "cyan",
    statusLabel: "95% Retrieval Precision • 70% Less Effort",
    summary:
      "A production RAG microservice engineered with LangChain, GPT-4, and FAISS to parse unstructured insurance claims, retrieve relevant policy clauses with 95% precision, and apply Chain-of-Thought reasoning with explainability guardrails, reducing manual verification effort by 70%.",
    problemStatement:
      "Unstructured insurance claims involve multi-page medical and damage incident narratives that adjusters must cross-reference against complex legal clauses. Manual verification causes severe processing backlogs, while generic generative AI solutions risk hallucinations and lack regulatory auditability.",
    systemArchitecture: {
      overview:
        "The compliance engine segments unstructured claim documents, executes dense vector similarity search over policy clauses using FAISS with a 95% precision threshold, and routes retrieved evidence through a Chain-of-Thought reasoning pipeline powered by GPT-4. Outputs are strictly validated with Pydantic schemas and guardrails to flag low-confidence decisions before reaching humans.",
      flowStages: [
        {
          order: 1,
          title: "Claim Document Decomposition",
          component: "Document Parser (PyPDF & Regex)",
          description:
            "Extracts clinical diagnosis codes, incident dates, reported damages, and unstructured claim narratives into structured metadata blocks.",
        },
        {
          order: 2,
          title: "High-Precision Clause Retrieval",
          component: "FAISS Vector Index (LangChain)",
          description:
            "Retrieves relevant underwriting clauses, exclusion terms, and benefit caps with 95% precision using dense vector embeddings.",
        },
        {
          order: 3,
          title: "Chain-of-Thought Reasoning with Guardrails",
          component: "OpenAI GPT-4 Engine",
          description:
            "Applies step-by-step clause verification with explainable reasoning traces, evaluating eligibility while strictly enforcing hallucination guardrails.",
        },
        {
          order: 4,
          title: "Structured Output Validation & Delivery",
          component: "FastAPI + Streamlit Microservice",
          description:
            "Validates decisions against strict Pydantic models; flags low-confidence findings for human review, reducing manual adjuster effort by 70%.",
        },
      ],
      diagramAscii: `
[Unstructured Claim PDF / Text]
       │
       ▼
┌─────────────────────────┐
│ Claim Parsing Pipeline  │ ── (Decompose Narratives, Dates, Incurred Costs)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ FAISS Vector Store      │ ── [Dense Retrieval Pipeline]
│ (95% Clause Precision)  │    ├─ Policy Exclusions & Benefit Limits
│                         │    └─ Similarity Cutoff Threshold Filter
└───────────┬─────────────┘
            │
            ▼ (Grounded Context)
┌─────────────────────────┐
│ Chain-of-Thought Engine │ ── [GPT-4 with Reasoning Guardrails]
│ (Explainability Traces) │    ├─ Step-by-Step Clause Application
│                         │    ├─ Mandatory Citation to Clause IDs
│                         │    └─ 70% Reduction in Manual Verification
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ FastAPI Microservice    │ ── [Structured Pydantic Output]
│ & Streamlit Auditor UI  │    (Auditable Decision: APPROVED / REJECTED / REVIEW)
└─────────────────────────┘
`,
    },
    tradeoffs: [
      {
        decision: "Chain-of-Thought with strict guardrails vs. Direct zero-shot classification",
        chosenApproach: "Step-by-step Chain-of-Thought reasoning with explicit citation guardrails",
        alternativeConsidered: "Single-shot binary prompt ('Is this claim covered: Yes/No')",
        rationale:
          "Insurance decisions require legal auditability. Single-shot responses offer no justification, whereas Chain-of-Thought outputs verifiable reasoning traces tying every clause to explicit claim evidence.",
      },
      {
        decision: "Pydantic structured output validation vs. Free-form text generation",
        chosenApproach: "Enforced Pydantic JSON schema with confidence scoring",
        alternativeConsidered: "Unstructured conversational output",
        rationale:
          "Free-form text can omit critical coverage exceptions. Enforcing a strict schema guarantees that every response contains approval status, referenced clause numbers, confidence metrics, and flagging triggers.",
      },
    ],
    failureModes: [
      {
        scenario: "Borderline policy ambiguity with low-similarity retrieval",
        mitigation:
          "Confidence threshold gate: if retrieval similarity falls below 0.80 or LLM confidence is uncertain, the system automatically marks the claim for human adjuster review.",
      },
      {
        scenario: "Claim narrative containing adversarial prompts attempting to bypass exclusions",
        mitigation:
          "Strict separation of user input from system policy context, with input sanitization and delimiter boundary enforcement.",
      },
    ],
    codeSnippet: {
      filename: "compliance_verifier.py",
      language: "python",
      explanation:
        "LangChain compliance verification pipeline enforcing Chain-of-Thought reasoning, FAISS clause retrieval, and Pydantic structured output validation.",
      code: `from typing import List, Optional
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import PydanticOutputParser

class ComplianceDecision(BaseModel):
    is_compliant: bool = Field(description="Whether the claim complies with policy clauses")
    decision: str = Field(description="'APPROVED', 'REJECTED', or 'NEEDS_HUMAN_REVIEW'")
    confidence_score: float = Field(ge=0.0, le=1.0, description="Confidence in evaluation")
    applied_clause_ids: List[str] = Field(description="Policy clause numbers cross-referenced")
    reasoning_trace: str = Field(description="Chain-of-Thought justification with citations")
    flags: List[str] = Field(default=[], description="Any low-confidence warnings")

class PolicyCompliancePipeline:
    def __init__(self, vector_store, model_name: str = "gpt-4"):
        self.retriever = vector_store.as_retriever(search_kwargs={"k": 4})
        self.llm = ChatOpenAI(model=model_name, temperature=0.0)
        self.parser = PydanticOutputParser(pydantic_object=ComplianceDecision)

    def evaluate_claim(self, claim_text: str) -> ComplianceDecision:
        # Retrieve authoritative policy clauses with high precision
        matched_docs = self.retriever.invoke(claim_text)
        policy_context = "\\n\\n".join([f"[{d.metadata['clause_id']}]: {d.page_content}" for d in matched_docs])

        prompt = ChatPromptTemplate.from_template(
            "You are an insurance compliance engine. Evaluate the claim against policy context.\\n"
            "Apply Chain-of-Thought reasoning. Tie every conclusion to a cited clause ID.\\n\\n"
            "POLICY CONTEXT:\\n{context}\\n\\n"
            "CLAIM SUMMARY:\\n{claim}\\n\\n"
            "{format_instructions}"
        )

        chain = prompt | self.llm | self.parser
        decision: ComplianceDecision = chain.invoke({
            "context": policy_context,
            "claim": claim_text,
            "format_instructions": self.parser.get_format_instructions()
        })

        # Explainability guardrail: flag low-confidence decisions for manual human review
        if decision.confidence_score < 0.85:
            decision.decision = "NEEDS_HUMAN_REVIEW"
            decision.flags.append("Confidence below 85% threshold - flagged for manual adjuster review.")

        return decision`,
    },
    technologies: ["Python", "LangChain", "OpenAI GPT-4", "FastAPI", "Streamlit", "FAISS", "Docker"],
    links: {
      github: "https://github.com/Aryaveer-ag",
      specDoc: "#",
    },
  },
];
