"use client";

import React, { useState } from "react";
import { Badge, Card } from "@/components/common";
import { flashSaleArchitectureData } from "@/data/flashSaleArchitecture";
import { ArchitectureNode, ArchitectureConnection } from "@/types/architecture";

export function ArchitectureExplorer() {
  const spec = flashSaleArchitectureData;

  const [selectedType, setSelectedType] = useState<"node" | "connection">(
    spec.defaultSelectionType
  );
  const [selectedId, setSelectedId] = useState<string>(spec.defaultSelectedId);

  // Active node or connection
  const activeNode: ArchitectureNode | undefined = spec.nodes.find(
    (n) => n.id === selectedId
  );
  const activeConnection: ArchitectureConnection | undefined = spec.connections.find(
    (c) => c.id === selectedId
  );

  const handleSelectNode = (nodeId: string) => {
    setSelectedType("node");
    setSelectedId(nodeId);
  };

  const handleSelectConnection = (connectionId: string) => {
    setSelectedType("connection");
    setSelectedId(connectionId);
  };

  const handleReset = () => {
    setSelectedType(spec.defaultSelectionType);
    setSelectedId(spec.defaultSelectedId);
  };

  // Helper connection lookup
  const clientToFastapi = spec.connections.find((c) => c.id === "client-to-fastapi")!;
  const fastapiToRedis = spec.connections.find((c) => c.id === "fastapi-to-redis")!;
  const fastapiToPostgres = spec.connections.find((c) => c.id === "fastapi-to-postgres")!;

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Selector Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)] border border-[var(--border-default)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--accent-cyan)] font-semibold">
              System Architecture Explorer
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Select any component or request path to inspect its engineering responsibilities, tradeoffs, and failure scenarios.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-center font-mono text-xs px-3 py-1.5 rounded bg-[var(--bg-surface-3)] text-slate-300 hover:text-white border border-[var(--border-subtle)] hover:border-slate-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
        >
          Reset Selection
        </button>
      </div>

      {/* Quick Navigation Pills for Keyboard & Screen Reader Access */}
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
        <span className="text-[var(--text-muted)] text-[11px] mr-1 uppercase">Components:</span>
        {spec.nodes.map((node) => {
          const isSelected = selectedType === "node" && selectedId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => handleSelectNode(node.id)}
              className={`px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                isSelected
                  ? "bg-cyan-950 text-cyan-300 border-cyan-600 font-semibold"
                  : "bg-[var(--bg-surface-1)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white"
              }`}
            >
              {node.name}
            </button>
          );
        })}

        <span className="text-[var(--text-muted)] text-[11px] mx-1 uppercase">Flows:</span>
        {spec.connections.map((conn) => {
          const isSelected = selectedType === "connection" && selectedId === conn.id;
          return (
            <button
              key={conn.id}
              type="button"
              onClick={() => handleSelectConnection(conn.id)}
              className={`px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                isSelected
                  ? "bg-indigo-950 text-indigo-300 border-indigo-600 font-semibold"
                  : "bg-[var(--bg-surface-1)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-white"
              }`}
            >
              {conn.name}
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Diagram & Details Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Architecture Topology (SVG + HTML) */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="default" className="border-[var(--border-default)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <span className="font-mono text-xs uppercase text-[var(--text-muted)]">
                Topology Map (Click Any Component or Flow)
              </span>
              <Badge variant="cyan" size="sm">
                Reference Model
              </Badge>
            </div>

            {/* Interactive Component Flow Layout */}
            <div className="flex flex-col space-y-3">
              {/* Node 1: Client */}
              {(() => {
                const isSelected = selectedType === "node" && selectedId === "client";
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectNode("client")}
                    className={`w-full p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500/50"
                        : "bg-[var(--bg-surface-2)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase">01 // Client Boundary</span>
                      <Badge variant="indigo" size="sm">Client</Badge>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Checkout Client</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">Browser / Mobile App (Surge Ingestion)</div>
                  </button>
                );
              })()}

              {/* Connection 1: Client -> FastAPI */}
              {(() => {
                const isSelected = selectedType === "connection" && selectedId === clientToFastapi.id;
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectConnection(clientToFastapi.id)}
                    className={`w-full p-2 rounded text-left font-mono text-[11px] flex items-center justify-between border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-cyan-950/70 border-cyan-500 text-cyan-300 font-bold"
                        : "bg-[var(--bg-base)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--accent-cyan)] font-bold">↓</span>
                      <span>POST /api/v1/checkout</span>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)]">HTTPS / JSON</span>
                  </button>
                );
              })()}

              {/* Node 2: FastAPI Application Gateway */}
              {(() => {
                const isSelected = selectedType === "node" && selectedId === "fastapi-app";
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectNode("fastapi-app")}
                    className={`w-full p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-cyan-950/60 border-cyan-500 shadow-md ring-1 ring-cyan-500/50"
                        : "bg-[var(--bg-surface-2)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className="text-[10px] text-[var(--text-muted)] uppercase">02 // Application Gateway</span>
                      <Badge variant="cyan" size="sm">FastAPI (Async)</Badge>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">FastAPI Application Service</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">Non-blocking ASGI concurrency orchestrator</div>
                  </button>
                );
              })()}

              {/* Connection 2: FastAPI -> Redis */}
              {(() => {
                const isSelected = selectedType === "connection" && selectedId === fastapiToRedis.id;
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectConnection(fastapiToRedis.id)}
                    className={`w-full p-2 rounded text-left font-mono text-[11px] flex items-center justify-between border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-emerald-950/70 border-emerald-500 text-emerald-300 font-bold"
                        : "bg-[var(--bg-base)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">↓</span>
                      <span>EVAL reserve_inventory.lua</span>
                    </div>
                    <span className="text-[10px] text-emerald-400/80">Redis RESP (&lt;1ms)</span>
                  </button>
                );
              })()}

              {/* Node 3: Redis In-Memory Engine */}
              {(() => {
                const isSelected = selectedType === "node" && selectedId === "redis-guard";
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectNode("redis-guard")}
                    className={`w-full p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500/50"
                        : "bg-[var(--bg-surface-2)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className="text-[10px] text-emerald-400 uppercase font-semibold">03 // Concurrency Guard</span>
                      <Badge variant="emerald" size="sm">Redis In-Memory</Badge>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">Redis In-Memory Engine</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">Single-threaded atomic Lua inventory decrement</div>
                  </button>
                );
              })()}

              {/* Connection 3: FastAPI -> PostgreSQL */}
              {(() => {
                const isSelected = selectedType === "connection" && selectedId === fastapiToPostgres.id;
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectConnection(fastapiToPostgres.id)}
                    className={`w-full p-2 rounded text-left font-mono text-[11px] flex items-center justify-between border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-amber-950/70 border-amber-500 text-amber-300 font-bold"
                        : "bg-[var(--bg-base)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">↳</span>
                      <span>Async Order Persistence</span>
                    </div>
                    <span className="text-[10px] text-amber-400/80">Worker Queue</span>
                  </button>
                );
              })()}

              {/* Node 4: PostgreSQL Database */}
              {(() => {
                const isSelected = selectedType === "node" && selectedId === "postgresql-store";
                return (
                  <button
                    type="button"
                    onClick={() => handleSelectNode("postgresql-store")}
                    className={`w-full p-3.5 rounded-[var(--radius-md)] border text-left transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                      isSelected
                        ? "bg-amber-950/60 border-amber-500 shadow-md ring-1 ring-amber-500/50"
                        : "bg-[var(--bg-surface-2)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className="text-[10px] text-amber-400 uppercase font-semibold">04 // Persistent Truth</span>
                      <Badge variant="amber" size="sm">PostgreSQL</Badge>
                    </div>
                    <div className="text-sm font-bold text-white font-mono">PostgreSQL Database</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">Audited relational orders, invoices &amp; accounting</div>
                  </button>
                );
              })()}
            </div>
          </Card>
        </div>

        {/* Right Column: Detailed Architectural Specification Panel */}
        <div className="lg:col-span-7">
          <Card variant="default" className="border-[var(--border-default)] p-6 space-y-6">
            {/* If NODE is selected */}
            {selectedType === "node" && activeNode && (
              <div className="space-y-6 animate-fade-in">
                {/* Node Title Header */}
                <div className="border-b border-[var(--border-subtle)] pb-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant={activeNode.accent} size="sm">
                      {activeNode.role}
                    </Badge>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {activeNode.technology}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {activeNode.name}
                  </h4>
                </div>

                {/* Section 1: Responsibility & Why Used */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[var(--accent-cyan)] font-semibold tracking-wider">
                      Architectural Responsibility
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {activeNode.responsibility}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-emerald-400 font-semibold tracking-wider">
                      Why It Is Used In This System
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {activeNode.whyUsed}
                    </p>
                  </div>
                </div>

                {/* Section 2: Interactions with Other Components */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
                    Inter-Component Interactions
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                    {activeNode.interactions.map((interaction, idx) => (
                      <li key={idx} className="flex items-start gap-2 p-2.5 rounded bg-[var(--bg-surface-3)] border border-[var(--border-subtle)]">
                        <span className="text-[var(--accent-cyan)] font-mono font-bold select-none">
                          ›
                        </span>
                        <span className="leading-relaxed">{interaction}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 3: Failure Scenarios & Defensive Mitigations */}
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
                    Failure Scenarios &amp; Defensive Mitigations
                  </span>
                  <div className="space-y-2.5">
                    {activeNode.failureScenarios.map((failure, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-1.5 text-xs"
                      >
                        <div className="flex items-start gap-1.5 text-rose-300 font-mono font-medium">
                          <span className="text-rose-400">⚠</span>
                          <span>Scenario: {failure.scenario}</span>
                        </div>
                        <p className="text-[var(--text-secondary)] pl-4 leading-relaxed">
                          <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold mr-1">
                            Mitigation:
                          </span>
                          {failure.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Design Tradeoffs */}
                <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider block">
                    Engineering Tradeoff Rationale
                  </span>
                  {activeNode.designTradeoffs.map((tradeoff, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] text-xs space-y-1"
                    >
                      <span className="font-mono font-semibold text-slate-200">
                        {tradeoff.decision}
                      </span>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {tradeoff.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If CONNECTION is selected */}
            {selectedType === "connection" && activeConnection && (
              <div className="space-y-6 animate-fade-in">
                {/* Connection Header */}
                <div className="border-b border-[var(--border-subtle)] pb-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan" size="sm">
                      {activeConnection.trafficType}
                    </Badge>
                    <span className="font-mono text-xs text-emerald-400 font-semibold">
                      {activeConnection.protocol}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {activeConnection.name}
                  </h4>
                </div>

                {/* Connection Description */}
                <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-1 text-xs sm:text-sm">
                  <span className="font-mono text-[10px] uppercase text-[var(--accent-cyan)] font-semibold tracking-wider">
                    Flow Description
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {activeConnection.description}
                  </p>
                </div>

                {/* Data Payload Example */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-muted)] uppercase tracking-wider text-[10px]">
                      Simulated Data Payload
                    </span>
                    <span className="text-slate-400 text-[10px]">Over-the-wire representation</span>
                  </div>
                  <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)] font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>{activeConnection.dataPayload}</pre>
                  </div>
                </div>

                {/* Failure & Network Handling */}
                <div className="p-3.5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-amber-900/40 space-y-1 text-xs">
                  <span className="font-mono text-[10px] uppercase text-amber-400 font-semibold tracking-wider">
                    Network &amp; Transient Failure Handling
                  </span>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {activeConnection.failureHandling}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* 3. Non-Interactive Text Accessible Summary for Mobile & Assistive Devices */}
      <details className="p-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-surface-1)] text-xs text-[var(--text-secondary)] space-y-2">
        <summary className="font-mono text-xs text-[var(--text-primary)] font-semibold cursor-pointer select-none hover:text-cyan-400 transition-colors">
          Accessible Text Architecture Summary (Click to expand plain text overview)
        </summary>
        <div className="pt-2 space-y-3 font-sans leading-relaxed border-t border-[var(--border-subtle)]">
          <p>
            The <strong>High-Concurrency Flash Sale Engine</strong> decouples request ingestion and inventory reservation from relational persistence:
          </p>
          <ol className="list-decimal pl-5 space-y-1 font-mono text-[11px]">
            <li><strong>Client Boundary:</strong> Submits purchase attempts over HTTPS with unique idempotency keys.</li>
            <li><strong>FastAPI Application:</strong> Handles non-blocking async I/O and immediately calls Redis Lua scripts.</li>
            <li><strong>Redis In-Memory Engine:</strong> Executes single-threaded Lua script atomically, guarding against negative inventory and overselling.</li>
            <li><strong>PostgreSQL Database:</strong> Receives audited persistence tasks asynchronously via background workers, preventing database lock contention during traffic surges.</li>
          </ol>
        </div>
      </details>
    </div>
  );
}

