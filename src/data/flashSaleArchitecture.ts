import type { SystemArchitectureSpec } from "../types/architecture.ts";

export const flashSaleArchitectureData: SystemArchitectureSpec = {
  id: "flash-sale-architecture",
  title: "High-Concurrency Flash Sale Engine — System Architecture",
  subtitle:
    "Handling 5,000+ concurrent requests with PostgreSQL ACID row-level locking, Redis early rejection caching, and idempotency protection.",
  defaultSelectedId: "redis-guard",
  defaultSelectionType: "node",
  nodes: [
    {
      id: "client",
      name: "Checkout Client",
      technology: "Browser / Mobile App",
      role: "Client Ingestion",
      category: "client",
      accent: "indigo",
      responsibility:
        "Initiates purchase requests on behalf of users, captures client intent, supplies idempotency headers, and renders deterministic checkout outcomes (Order Confirmed vs. Sold Out).",
      whyUsed:
        "Acts as the entry boundary for external incoming traffic, providing an interface for users to participate in limited-quantity sales without retry duplication.",
      interactions: [
        "Sends HTTPS POST /api/checkout/reserve with unique idempotency keys.",
        "Awaits fast HTTP response (<150ms roundtrip latency).",
        "Renders checkout confirmation with audited order receipt.",
      ],
      failureScenarios: [
        {
          scenario: "Network timeout before receiving confirmation",
          mitigation:
            "Client sends retry request with identical idempotency token; backend recognizes token in Redis/PostgreSQL and returns cached reservation without double decrement.",
        },
        {
          scenario: "Client drops connection mid-flight",
          mitigation:
            "PostgreSQL transaction rolls back automatically on aborted connections; Redis inventory counter reflects true committed balance.",
        },
      ],
      designTradeoffs: [
        {
          decision: "Short synchronous polling vs. Persistent WebSockets",
          rationale:
            "HTTP REST with sub-150ms responses keeps connection lifetimes minimal, avoiding open socket memory overhead across 5,000+ concurrent clients.",
        },
      ],
    },
    {
      id: "fastapi-app",
      name: "FastAPI Application",
      technology: "Python 3.12 / Uvicorn (ASGI)",
      role: "Request Ingestion & Validation",
      category: "gateway",
      accent: "cyan",
      responsibility:
        "Validates incoming request schemas, performs idempotency verification, checks Redis for early rejection of sold-out items, and coordinates PostgreSQL pessimistic row-level transactions.",
      whyUsed:
        "FastAPI's asynchronous ASGI architecture processes 1,000+ req/sec with less than 150ms latency on a single process without blocking threads.",
      interactions: [
        "Receives HTTP requests with idempotency keys from the Checkout Client.",
        "Performs sub-millisecond stock availability checks against Redis cache.",
        "Executes atomic ACID transactions in PostgreSQL using pessimistic row-level locking.",
        "Returns immediate HTTP 200 (Reserved) or 410 (Sold Out) status back to the client.",
      ],
      failureScenarios: [
        {
          scenario: "Process crash under sudden surge pressure",
          mitigation:
            "Stateless container deployment behind Docker reverse proxy; unhealthy worker processes are automatically recycled with zero data loss.",
        },
        {
          scenario: "Redis connection pool timeout during surge",
          mitigation:
            "Fallback circuit breaker queries PostgreSQL with bounded row locks, ensuring zero overselling even if cache is temporarily degraded.",
        },
      ],
      designTradeoffs: [
        {
          decision: "Stateless microservice vs. In-memory local application state",
          rationale:
            "Maintaining inventory counters inside local process memory prevents horizontal multi-container scaling. Redis acts as the centralized fast-rejection authority.",
        },
      ],
    },
    {
      id: "redis-guard",
      name: "Redis In-Memory Engine",
      technology: "Redis 7.x (Cluster / In-Memory)",
      role: "Early Rejection & Idempotency Cache",
      category: "cache",
      accent: "emerald",
      responsibility:
        "Provides fast inventory balance checks and immediate early rejection of sold-out requests, offloading over 95% of unnecessary traffic from the relational database during high-concurrency spikes.",
      whyUsed:
        "Operating in-memory at sub-millisecond speeds, Redis eliminates database query storms once finite stock reaches zero.",
      interactions: [
        "Validates cached stock levels for inbound requests.",
        "Fast-rejects requests when stock == 0 with instant 410 Sold Out.",
        "Caches completed idempotency keys with 24-hour TTL to prevent double billing.",
      ],
      failureScenarios: [
        {
          scenario: "Redis instance restart or failover",
          mitigation:
            "PostgreSQL remains the audited source of truth; remaining inventory is re-synchronized to Redis upon restart.",
        },
        {
          scenario: "Key eviction under memory limits",
          mitigation:
            "`noeviction` maxmemory policy configured so Redis rejects writes rather than silently evicting active inventory keys.",
        },
      ],
      designTradeoffs: [
        {
          decision: "In-memory early rejection filter vs. Direct database query",
          rationale:
            "Under 5,000+ concurrent requests, hitting PostgreSQL for sold-out items saturates connection pools. Redis filters redundant hits in sub-millisecond memory cycles.",
        },
      ],
    },
    {
      id: "postgresql-store",
      name: "PostgreSQL Database",
      technology: "PostgreSQL 16 (ACID Relational)",
      role: "Pessimistic Row-Level Lock & Audited Persistence",
      category: "database",
      accent: "amber",
      responsibility:
        "Guarantees absolute zero overselling under 5,000+ concurrent requests using isolated ACID transactions and pessimistic row-level locking (`SELECT ... FOR UPDATE`). Stores finalized audited orders and idempotency records.",
      whyUsed:
        "Strict ACID compliance, row-level locks, foreign keys, and write-ahead logging (WAL) ensure financial-grade transactional safety.",
      interactions: [
        "Acquires exclusive pessimistic row lock on inventory SKU row.",
        "Verifies available balance >= requested quantity inside active transaction.",
        "Atomically decrements stock and inserts order audit receipt.",
        "Commits transaction and releases row lock in <15ms.",
      ],
      failureScenarios: [
        {
          scenario: "Simultaneous SKU contention creating deadlocks",
          mitigation:
            "Deterministic global SKU locking order and lock acquisition timeouts with exponential backoff on retryable serialization errors.",
        },
        {
          scenario: "Connection pool exhaustion under peak spikes",
          mitigation:
            "Pessimistic transactions are kept strictly bounded to sub-15ms, and connection pool sizing is tuned to match available CPU cores.",
        },
      ],
      designTradeoffs: [
        {
          decision: "Pessimistic row locking (`SELECT ... FOR UPDATE`) vs. Optimistic retry loops",
          rationale:
            "Under extreme contention (>5,000 requests for 50 items), optimistic retry loops cause massive thrashing where 99% of transactions abort and retry repeatedly, generating severe CPU spikes. Pessimistic row locking guarantees deterministic queueing with zero duplicate order risk.",
        },
      ],
    },
  ],
  connections: [
    {
      id: "client-to-fastapi",
      sourceId: "client",
      targetId: "fastapi-app",
      name: "Client Checkout Request",
      protocol: "HTTPS / REST JSON",
      trafficType: "Synchronous",
      dataPayload: "{\n  \"item_id\": \"sku_982\",\n  \"user_id\": \"usr_441\",\n  \"idempotency_key\": \"uuid-v4\"\n}",
      description:
        "Client initiates order attempt over HTTPS. FastAPI processes authentication and evaluates idempotency before touching downstream services.",
      failureHandling:
        "Client retries with identical idempotency token if network drops; gateway returns existing reservation without double allocation.",
    },
    {
      id: "fastapi-to-redis",
      sourceId: "fastapi-app",
      targetId: "redis-guard",
      name: "Fast Inventory & Rejection Filter",
      protocol: "Redis RESP / TCP Pool",
      trafficType: "Synchronous",
      dataPayload: "GET stock:sku_982\nSETNX idem:uuid-v4 PENDING EX 86400",
      description:
        "FastAPI executes instant memory check in Redis. If stock == 0, immediately returns 410 Sold Out to drop sold-out traffic before touching the database. Idempotency keys are cached to ensure safe client retries.",
      failureHandling:
        "50ms connection timeout. If Redis is degraded, circuit breaker falls back to bounded PostgreSQL queries with row locks.",
    },
    {
      id: "fastapi-to-postgres",
      sourceId: "fastapi-app",
      targetId: "postgresql-store",
      name: "Pessimistic Row-Level Transaction",
      protocol: "PostgreSQL Native / SQLAlchemy Pool",
      trafficType: "Synchronous",
      dataPayload: "BEGIN;\nSELECT available_stock FROM inventory WHERE id = 'sku_982' FOR UPDATE;\nUPDATE inventory SET available_stock = available_stock - 1 WHERE id = 'sku_982';\nINSERT INTO orders (id, user_id, item_id, idempotency_key) VALUES ('ord_102', 'usr_441', 'sku_982', 'uuid-v4');\nCOMMIT;",
      description:
        "When Redis confirms available stock, FastAPI opens an ACID transaction with pessimistic row lock (`SELECT ... FOR UPDATE`), decrements inventory, and commits audited order records, guaranteeing zero overselling under 5,000+ concurrent requests.",
      failureHandling:
        "Automatic rollback on transaction abort; deterministic lock acquisition timeouts with exponential backoff on transient contention.",
    },
  ],
};
