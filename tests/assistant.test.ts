import test from "node:test";
import assert from "node:assert";
import type { PortfolioAssistant } from "../src/types/assistant.ts";
import { MockPortfolioAssistant } from "../src/services/mockAssistant.ts";
import {
  SUGGESTED_QUESTIONS,
  FALLBACK_UNKNOWN_RESPONSE,
} from "../src/data/assistantKnowledge.ts";

test("PortfolioAssistant Contract & Class Instantiation", () => {
  const assistant: PortfolioAssistant = new MockPortfolioAssistant({
    simulatedDelayMs: 0,
  });

  assert.strictEqual(typeof assistant.ask, "function");
});

test("Suggested Questions Verification", async () => {
  const assistant = new MockPortfolioAssistant({ simulatedDelayMs: 0 });

  assert.strictEqual(
    SUGGESTED_QUESTIONS.length,
    5,
    "Must have 5 core suggested questions"
  );

  // 1. Backend projects query
  const backendAns = await assistant.ask("What backend projects has Aryaveer built?");
  assert.ok(
    backendAns.includes("Flash Sale Engine"),
    "Should mention Flash Sale Engine"
  );
  assert.ok(backendAns.includes("#projects"), "Should link to #projects");
  assert.ok(backendAns.includes("Redis"), "Should mention Redis");

  // 2. Flash-sale deep dive
  const flashSaleAns = await assistant.ask("Explain the flash-sale engine.");
  assert.ok(
    flashSaleAns.includes("Pessimistic") ||
      flashSaleAns.includes("pessimistic") ||
      flashSaleAns.includes("atomic"),
    "Should explain pessimistic locking or atomic decrements"
  );
  assert.ok(
    flashSaleAns.includes("overselling") || flashSaleAns.includes("oversell"),
    "Should explain overselling protection"
  );
  assert.ok(flashSaleAns.includes("#lab"), "Should link to #lab simulation");

  // 3. AI projects query
  const aiAns = await assistant.ask("Show me his AI projects.");
  assert.ok(
    aiAns.includes("FloatChat"),
    "Should mention FloatChat"
  );
  assert.ok(
    aiAns.includes("Automated Insurance Policy Compliance Engine"),
    "Should mention Insurance Compliance Engine"
  );
  assert.ok(
    aiAns.includes("Automated PCB Quality Control Dashboard"),
    "Should mention PCB Quality Control Dashboard"
  );
  assert.ok(aiAns.includes("PyTorch"), "Should mention PyTorch");

  // 4. Technologies used query
  const techAns = await assistant.ask("What technologies has he used?");
  assert.ok(
    techAns.includes("TypeScript") && techAns.includes("Python"),
    "Should list core programming languages"
  );
  assert.ok(
    techAns.includes("Redis") && techAns.includes("PostgreSQL"),
    "Should list databases"
  );
  assert.ok(techAns.includes("#about"), "Should link to #about skills matrix");

  // 5. Contact & discussion query
  const contactAns = await assistant.ask("How can I discuss a project with him?");
  assert.ok(
    contactAns.includes("aryaveeragarwal10@gmail.com"),
    "Should give direct contact email"
  );
  assert.ok(
    contactAns.includes("#contact"),
    "Should link to #contact form anchor"
  );
  assert.ok(
    contactAns.includes("Upwork"),
    "Should mention Upwork freelance profile"
  );
});

test("Grounded Unknown Question Fallback (No Hallucination)", async () => {
  const assistant = new MockPortfolioAssistant({ simulatedDelayMs: 0 });

  const unknownQueries = [
    "Who is the president of Mars?",
    "Can Aryaveer bake a sourdough loaf?",
    "What is the airspeed velocity of an unladen swallow?",
    "Tell me about your Fortune 500 enterprise clients",
  ];

  for (const query of unknownQueries) {
    const response = await assistant.ask(query);
    assert.strictEqual(
      response,
      FALLBACK_UNKNOWN_RESPONSE,
      `Query "${query}" should trigger grounded fallback`
    );
  }
});

test("Empty Question Validation", async () => {
  const assistant = new MockPortfolioAssistant({ simulatedDelayMs: 0 });

  const response = await assistant.ask("   ");
  assert.ok(
    response.includes("Please enter a question"),
    "Should prompt for a question on whitespace"
  );
});

test("Error Handling & Simulation", async () => {
  const assistant = new MockPortfolioAssistant({ simulatedDelayMs: 0 });

  // Test special error trigger token
  await assert.rejects(
    async () => {
      await assistant.ask("Please test [trigger-error] now");
    },
    (err: Error) => {
      assert.ok(err.message.includes("Service temporarily unavailable"));
      return true;
    }
  );

  // Test manual failure flag
  assistant.setShouldFail(true, "Custom simulated outage");
  await assert.rejects(
    async () => {
      await assistant.ask("Explain the flash-sale engine.");
    },
    (err: Error) => {
      assert.strictEqual(err.message, "Custom simulated outage");
      return true;
    }
  );
});

test("Service Interchangeability (Pluggable Architecture)", async () => {
  // A hypothetical custom external or real AI service conforming to PortfolioAssistant
  class RealAPICloudAssistant implements PortfolioAssistant {
    private endpoint: string;

    constructor(endpoint: string) {
      this.endpoint = endpoint;
    }

    async ask(question: string): Promise<string> {
      return `[${this.endpoint}] Grounded answer for: ${question}`;
    }
  }

  const cloudAssistant: PortfolioAssistant = new RealAPICloudAssistant(
    "https://api.aryaveer.dev/v1/assistant"
  );

  const res = await cloudAssistant.ask("What projects are available?");
  assert.strictEqual(
    res,
    "[https://api.aryaveer.dev/v1/assistant] Grounded answer for: What projects are available?"
  );
});

test("Personalized Knowledge Queries: Internship & Leadership", async () => {
  const assistant = new MockPortfolioAssistant({ simulatedDelayMs: 0 });

  // 1. Internship query
  const internAns = await assistant.ask("Tell me about Aryaveer's internship experience");
  assert.ok(internAns.includes("Infosys Springboard"), "Should mention Infosys Springboard");
  assert.ok(internAns.includes("MIMIC-IV"), "Should mention MIMIC-IV clinical dataset");
  assert.ok(internAns.includes("AI-NutriCare"), "Should mention AI-NutriCare");

  // 2. Leadership query
  const leadAns = await assistant.ask("What leadership roles did he hold at DTU?");
  assert.ok(leadAns.includes("Cultural Council"), "Should mention Cultural Council DTU");
  assert.ok(leadAns.includes("Engifest"), "Should mention Engifest");
  assert.ok(leadAns.includes("OnePlus") || leadAns.includes("Intel"), "Should mention corporate sponsors");
});

