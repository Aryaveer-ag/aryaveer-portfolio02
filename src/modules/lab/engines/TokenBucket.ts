import { RateLimiterEngine, RateLimiterResult } from "@/types/simulations";

export class TokenBucket implements RateLimiterEngine {
  private capacity: number;
  private refillRate: number; // tokens per second
  private tokens: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number = 10, refillRate: number = 2) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefillTimestamp = 0;
  }

  public setCapacity(capacity: number): void {
    this.capacity = capacity;
    if (this.tokens > capacity) {
      this.tokens = capacity;
    }
  }

  public setRefillRate(rate: number): void {
    this.refillRate = rate;
  }

  public refill(): void {
    if (typeof performance === "undefined") return;
    const now = performance.now();

    if (this.lastRefillTimestamp === 0) {
      this.lastRefillTimestamp = now;
      return;
    }

    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    const tokensToAdd = elapsedSeconds * this.refillRate;

    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastRefillTimestamp = now;
    }
  }

  public request(tokensNeeded: number = 1): RateLimiterResult {
    this.refill();

    const timestamp = Date.now();

    if (this.tokens >= tokensNeeded) {
      this.tokens -= tokensNeeded;
      return {
        allowed: true,
        statusCode: 200,
        remainingTokens: Math.floor(this.tokens),
        capacity: this.capacity,
        timestamp,
        message: "200 OK — Request processed successfully",
      };
    }

    return {
      allowed: false,
      statusCode: 429,
      remainingTokens: Math.floor(this.tokens),
      capacity: this.capacity,
      timestamp,
      message: "429 Too Many Requests — Token capacity exhausted",
    };
  }

  public reset(): void {
    this.tokens = this.capacity;
    this.lastRefillTimestamp = typeof performance !== "undefined" ? performance.now() : 0;
  }

  public getTokens(): number {
    this.refill();
    return Math.min(this.capacity, Math.max(0, this.tokens));
  }

  public getCapacity(): number {
    return this.capacity;
  }
}
