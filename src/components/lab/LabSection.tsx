"use client";

import React, { useState } from "react";
import { Container, PageSection, SectionHeading, Badge, Reveal } from "@/components/common";
import { FlashSaleEngineSim } from "./FlashSaleEngineSim";
import { RateLimiterSim } from "./RateLimiterSim";
import { CacheEvictionSim } from "./CacheEvictionSim";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";

export function LabSection() {
  const [activeSimulation, setActiveSimulation] = useState<
    "flash-sale" | "architecture" | "rate-limiter" | "cache-eviction"
  >("flash-sale");

  return (
    <PageSection id="lab" spacing="spacious" divided>
      <Container size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="03 // IN-BROWSER SIMULATIONS"
            title="The Engineering Lab"
            description="Interactive, browser-based systems and algorithmic simulations running entirely in pure TypeScript with zero external server latency. Observe atomic concurrency controls, system architecture topologies, and cache eviction tradeoffs."
            action={
              <Badge variant="emerald" dot pulse size="sm">
                4 Technical Modules Active
              </Badge>
            }
          />
        </Reveal>

        {/* Simulation Selector Tab Bar */}
        <div
          role="tablist"
          aria-label="Engineering Lab Simulators"
          className="flex border-b border-[var(--border-subtle)] mb-8 font-mono text-xs overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSimulation === "flash-sale"}
            onClick={() => setActiveSimulation("flash-sale")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 shrink-0 rounded-t-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
              activeSimulation === "flash-sale"
                ? "border-[var(--accent-emerald)] text-[var(--accent-emerald)] bg-[var(--accent-emerald)]/10"
                : "border-transparent text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <span>01 // FEATURED</span>
            <span>Flash Sale Simulator</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSimulation === "architecture"}
            onClick={() => setActiveSimulation("architecture")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 shrink-0 rounded-t-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
              activeSimulation === "architecture"
                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10"
                : "border-transparent text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <span>02 // ARCHITECTURE</span>
            <span>System Topology Explorer</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSimulation === "rate-limiter"}
            onClick={() => setActiveSimulation("rate-limiter")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 shrink-0 rounded-t-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
              activeSimulation === "rate-limiter"
                ? "border-[var(--accent-cyan)] text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10"
                : "border-transparent text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <span>03 //</span>
            <span>Distributed Rate Limiter</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSimulation === "cache-eviction"}
            onClick={() => setActiveSimulation("cache-eviction")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-2 shrink-0 rounded-t-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
              activeSimulation === "cache-eviction"
                ? "border-[var(--accent-indigo)] text-[var(--accent-indigo)] bg-[var(--accent-indigo)]/10"
                : "border-transparent text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            <span>04 //</span>
            <span>Cache Eviction (LRU/LFU)</span>
          </button>
        </div>

        {/* Active View */}
        <Reveal delayMs={80}>
          {activeSimulation === "flash-sale" ? (
            <FlashSaleEngineSim />
          ) : activeSimulation === "architecture" ? (
            <ArchitectureExplorer />
          ) : activeSimulation === "rate-limiter" ? (
            <RateLimiterSim />
          ) : (
            <CacheEvictionSim />
          )}
        </Reveal>
      </Container>
    </PageSection>
  );
}
