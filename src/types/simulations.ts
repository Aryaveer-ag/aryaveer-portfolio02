/**
 * Type definitions for the Engineering Lab technical simulations:
 * Distributed Rate Limiting & Cache Eviction.
 */

// --- Rate Limiter Types ---

export interface RateLimiterResult {
  allowed: boolean;
  statusCode: 200 | 429;
  remainingTokens: number;
  capacity: number;
  timestamp: number;
  message: string;
}

export interface RateLimiterTelemetry {
  totalRequests: number;
  allowedRequests: number;
  droppedRequests: number;
  dropRatePercent: number;
}

export interface RateLimiterLog {
  id: string;
  timestamp: string;
  statusCode: 200 | 429;
  remaining: number;
  message: string;
}

export interface RateLimiterEngine {
  request(tokensNeeded?: number): RateLimiterResult;
  refill(): void;
  reset(): void;
  getTokens(): number;
  getCapacity(): number;
}

// --- Cache Eviction Types ---

export type CacheAlgorithm = "LRU" | "LFU";

export interface CacheEntry {
  key: string;
  value: string;
  frequency: number;
  lastAccessed: number;
}

export interface CacheOperationResult {
  operation: "GET" | "PUT";
  key: string;
  status: "HIT" | "MISS";
  evictedEntry?: CacheEntry;
  entries: CacheEntry[];
  timestamp: number;
}

export interface CacheTelemetry {
  totalLookups: number;
  hits: number;
  misses: number;
  hitRatioPercent: number;
  evictions: number;
}

export interface CacheEngine {
  get(key: string): CacheOperationResult;
  put(key: string, value: string): CacheOperationResult;
  getEntries(): CacheEntry[];
  clear(): void;
  getCapacity(): number;
}

