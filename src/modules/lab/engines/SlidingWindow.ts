import { RateLimiterEngine, RateLimiterResult } from "@/types/simulations";

export class SlidingWindowCounter implements RateLimiterEngine {
  private windowSizeMs: number;
  private maxRequests: number;
  private requestTimestamps: number[];

  constructor(maxRequests: number = 10, windowSizeMs: number = 1000) {
    this.maxRequests = maxRequests;
    this.windowSizeMs = windowSizeMs;
    this.requestTimestamps = [];
  }

  public setLimit(maxRequests: number): void {
    this.maxRequests = maxRequests;
  }

  public setWindowSize(ms: number): void {
    this.windowSizeMs = ms;
  }

  public refill(): void {
    if (this.requestTimestamps.length === 0) return;
    const now = typeof performance !== "undefined" ? performance.now() : 0;
    const threshold = now - this.windowSizeMs;
    this.requestTimestamps = this.requestTimestamps.filter((t) => t > threshold);
  }

  public request(tokensNeeded: number = 1): RateLimiterResult {
    this.refill();
    const now = Date.now();
    const perfNow = typeof performance !== "undefined" ? performance.now() : now;

    if (this.requestTimestamps.length + tokensNeeded <= this.maxRequests) {
      for (let i = 0; i < tokensNeeded; i++) {
        this.requestTimestamps.push(perfNow);
      }

      return {
        allowed: true,
        statusCode: 200,
        remainingTokens: this.maxRequests - this.requestTimestamps.length,
        capacity: this.maxRequests,
        timestamp: now,
        message: "200 OK — Within sliding window threshold",
      };
    }

    return {
      allowed: false,
      statusCode: 429,
      remainingTokens: 0,
      capacity: this.maxRequests,
      timestamp: now,
      message: "429 Too Many Requests — Sliding window quota reached",
    };
  }

  public reset(): void {
    this.requestTimestamps = [];
  }

  public getTokens(): number {
    this.refill();
    return Math.max(0, this.maxRequests - this.requestTimestamps.length);
  }

  public getCapacity(): number {
    return this.maxRequests;
  }
}
