/**
 * Portfolio Assistant Type Definitions
 *
 * Defines the core abstraction and message contracts for the portfolio assistant.
 * Any real AI service, edge function, or mock must conform to PortfolioAssistant.
 */

export interface PortfolioAssistant {
  /**
   * Submit a user inquiry and receive a grounded response.
   * @param question The user query text.
   * @returns A promise resolving to the assistant's factual response string.
   */
  ask(question: string): Promise<string>;
}

export type AssistantRole = "user" | "assistant" | "system";

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  timestamp: number;
  status?: "pending" | "success" | "error";
  suggestedActions?: {
    label: string;
    href: string;
  }[];
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  category: "backend" | "ai" | "skills" | "contact" | "general";
}

