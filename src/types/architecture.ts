/**
 * Type definitions for the Interactive Architecture Explorer.
 */

export interface ArchitectureNode {
  id: string;
  name: string;
  technology: string;
  role: string;
  category: "client" | "gateway" | "cache" | "database";
  accent: "indigo" | "cyan" | "emerald" | "amber";
  responsibility: string;
  whyUsed: string;
  interactions: string[];
  failureScenarios: {
    scenario: string;
    mitigation: string;
  }[];
  designTradeoffs: {
    decision: string;
    rationale: string;
  }[];
}

export interface ArchitectureConnection {
  id: string;
  sourceId: string;
  targetId: string;
  name: string;
  protocol: string;
  trafficType: "Synchronous" | "Asynchronous / Background";
  dataPayload: string;
  description: string;
  failureHandling: string;
}

export interface SystemArchitectureSpec {
  id: string;
  title: string;
  subtitle: string;
  defaultSelectedId: string;
  defaultSelectionType: "node" | "connection";
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

