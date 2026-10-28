import type { PortfolioAssistant } from "../types/assistant.ts";
import {
  KNOWLEDGE_TOPICS,
  FALLBACK_UNKNOWN_RESPONSE,
} from "../data/assistantKnowledge.ts";

export interface MockAssistantOptions {
  simulatedDelayMs?: number;
  shouldFail?: boolean;
  failureMessage?: string;
}

export class MockPortfolioAssistant implements PortfolioAssistant {
  private simulatedDelayMs: number;
  private shouldFail: boolean;
  private failureMessage: string;

  constructor(options: MockAssistantOptions = {}) {
    this.simulatedDelayMs = options.simulatedDelayMs ?? 280;
    this.shouldFail = options.shouldFail ?? false;
    this.failureMessage =
      options.failureMessage ??
      "Service temporarily unavailable. Please retry or check your network connection.";
  }

  public setShouldFail(fail: boolean, message?: string) {
    this.shouldFail = fail;
    if (message) this.failureMessage = message;
  }

  public setDelay(delayMs: number) {
    this.simulatedDelayMs = delayMs;
  }

  public async ask(question: string): Promise<string> {
    const trimmed = (question || "").trim();

    // 1. Validate non-empty
    if (!trimmed) {
      return "Please enter a question to explore Aryaveer's portfolio.";
    }

    // 2. Simulated delay
    if (this.simulatedDelayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, this.simulatedDelayMs));
    }

    // 3. Error state trigger (for testing / resilience verification)
    if (this.shouldFail || trimmed.toLowerCase().includes("[trigger-error]")) {
      throw new Error(this.failureMessage);
    }

    // 4. Intent matching
    return this.resolveAnswer(trimmed);
  }

  private resolveAnswer(question: string): string {
    const normalized = question.toLowerCase();

    // Pass 1: Pattern matching
    for (const topic of KNOWLEDGE_TOPICS) {
      for (const pattern of topic.patterns) {
        if (pattern.test(normalized)) {
          return topic.answer;
        }
      }
    }

    // Pass 2: Keyword overlap scoring (using exact token matching for single words to avoid substring traps)
    const rawTokens = normalized
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 0);
    const tokenSet = new Set(rawTokens);

    let bestTopic = null;
    let maxMatches = 0;

    for (const topic of KNOWLEDGE_TOPICS) {
      let matches = 0;
      for (const keyword of topic.keywords) {
        if (keyword.includes(" ")) {
          // Multi-word phrase matching
          if (normalized.includes(keyword.toLowerCase())) {
            matches += 2; // Extra weight for explicit phrase matches
          }
        } else {
          // Exact token match (e.g. "ai" matches "ai", not "airspeed")
          if (tokenSet.has(keyword.toLowerCase())) {
            matches++;
          }
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestTopic = topic;
      }
    }

    // Require at least 1 verified match
    if (bestTopic && maxMatches >= 1) {
      return bestTopic.answer;
    }

    // Pass 3: Grounded Fallback
    return FALLBACK_UNKNOWN_RESPONSE;
  }
}

// Default singleton instance for UI consumption
export const defaultPortfolioAssistant = new MockPortfolioAssistant();
