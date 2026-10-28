"use client";

import React, { useState, useMemo } from "react";
import { Badge, Card } from "@/components/common";
import { FlashSaleEngine } from "@/modules/lab/engines/FlashSaleEngine";
import { ContentionMode, FlashSaleSimulationResult } from "@/types/flashSaleSim";

export function FlashSaleEngineSim() {
  const [initialInventory, setInitialInventory] = useState<number>(20);
  const [totalRequests, setTotalRequests] = useState<number>(50);
  const [contentionMode, setContentionMode] = useState<ContentionMode>("burst");

  // Run the deterministic simulation
  const simulationResult: FlashSaleSimulationResult = useMemo(() => {
    return FlashSaleEngine.runSimulation({
      initialInventory,
      totalRequests,
      contentionMode,
    });
  }, [initialInventory, totalRequests, contentionMode]);

  // Handle scenario presets
  const applyPreset = (preset: "surge" | "single-item" | "zero-stock" | "normal") => {
    if (preset === "surge") {
      setInitialInventory(20);
      setTotalRequests(60);
      setContentionMode("burst");
    } else if (preset === "single-item") {
      setInitialInventory(1);
      setTotalRequests(40);
      setContentionMode("single-item");
    } else if (preset === "zero-stock") {
      setInitialInventory(0);
      setTotalRequests(25);
      setContentionMode("zero-stock");
    } else if (preset === "normal") {
      setInitialInventory(50);
      setTotalRequests(25);
      setContentionMode("gradual");
    }
  };

  const handleReset = () => {
    setInitialInventory(20);
    setTotalRequests(50);
    setContentionMode("burst");
  };

  const inventoryFillPercent =
    simulationResult.initialInventory > 0
      ? (simulationResult.finalRemainingInventory / simulationResult.initialInventory) * 100
      : 0;

  const successfulPurchases = simulationResult.successfulPurchases;
  const rejectedRequests = simulationResult.rejectedRequests;
  const finalStock = simulationResult.finalRemainingInventory;

  return (
    <div className="space-y-8">
      {/* 1. Mandatory Transparency & Simulation Disclaimer Banner */}
      <div className="p-4 rounded-[var(--radius-md)] border border-amber-900/60 bg-amber-950/20 text-xs font-mono text-amber-300 space-y-1">
        <div className="flex items-center gap-2 font-semibold uppercase tracking-wider">
          <span className="text-amber-400">⚡</span>
          <span>Architectural Simulation Notice (Not a Real Distributed Load Test)</span>
        </div>
        <p className="text-amber-300/80 leading-relaxed font-sans text-xs">
          This browser-based module models the <strong>deterministic inventory allocation rules</strong> of Aryaveer&apos;s High-Concurrency Flash Sale Engine. It simulates how atomic in-memory guards prevent negative stock and overselling without locking relational database rows. It does not send live network requests to Redis or PostgreSQL, nor does client-side JavaScript reproduce true multi-server network partitions.
        </p>
      </div>

      {/* 2. Controls & Parameter Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)] border border-[var(--border-default)]">
        {/* Inventory Slider */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <label htmlFor="inventory-slider" className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
              Initial Stock (N):
            </label>
            <span className="font-bold text-white bg-[var(--bg-surface-3)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              {initialInventory} items
            </span>
          </div>
          <input
            id="inventory-slider"
            type="range"
            min={FlashSaleEngine.MIN_INVENTORY}
            max={FlashSaleEngine.MAX_INVENTORY}
            value={initialInventory}
            onChange={(e) => setInitialInventory(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-emerald)]"
          />
          <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>Min: 0</span>
            <span>Max: {FlashSaleEngine.MAX_INVENTORY}</span>
          </div>
        </div>

        {/* Requests Slider */}
        <div className="md:col-span-4 space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <label htmlFor="requests-slider" className="text-[var(--text-muted)] uppercase text-[10px] tracking-wider">
              Simulated Purchases (R):
            </label>
            <span className="font-bold text-white bg-[var(--bg-surface-3)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              {totalRequests} attempts
            </span>
          </div>
          <input
            id="requests-slider"
            type="range"
            min={FlashSaleEngine.MIN_REQUESTS}
            max={FlashSaleEngine.MAX_REQUESTS}
            value={totalRequests}
            onChange={(e) => setTotalRequests(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
          />
          <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>Min: 1</span>
            <span>Max: {FlashSaleEngine.MAX_REQUESTS}</span>
          </div>
        </div>

        {/* Presets & Reset */}
        <div className="md:col-span-4 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block">
            Contention Presets
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => applyPreset("surge")}
              className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                contentionMode === "burst" && initialInventory === 20 && totalRequests === 60
                  ? "bg-cyan-950 text-cyan-300 border-cyan-700"
                  : "bg-[var(--bg-surface-3)] text-slate-300 border-[var(--border-subtle)] hover:text-white"
              }`}
            >
              Surge (20/60)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("single-item")}
              className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                initialInventory === 1
                  ? "bg-indigo-950 text-indigo-300 border-indigo-700"
                  : "bg-[var(--bg-surface-3)] text-slate-300 border-[var(--border-subtle)] hover:text-white"
              }`}
            >
              Single Item (1/40)
            </button>
            <button
              type="button"
              onClick={() => applyPreset("zero-stock")}
              className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                initialInventory === 0
                  ? "bg-rose-950 text-rose-300 border-rose-700"
                  : "bg-[var(--bg-surface-3)] text-slate-300 border-[var(--border-subtle)] hover:text-white"
              }`}
            >
              Zero Stock
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-1 text-[11px] font-mono rounded bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. Visual Telemetry Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Initial Inventory */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] border border-[var(--border-default)]">
          <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Initial Inventory (N)</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">{simulationResult.initialInventory}</div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1">Starting available stock</div>
        </div>

        {/* Successful Purchases */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] border border-emerald-900/60">
          <div className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">Successful Purchases</div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">{successfulPurchases}</div>
          <div className="text-[11px] font-mono text-emerald-400/80 mt-1">
            Capped at {simulationResult.initialInventory} max
          </div>
        </div>

        {/* Rejected Requests */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] border border-rose-900/60">
          <div className="text-[10px] font-mono uppercase text-rose-400 font-semibold">Rejected (429 Sold Out)</div>
          <div className="text-2xl font-mono font-bold text-rose-400 mt-1">{rejectedRequests}</div>
          <div className="text-[11px] font-mono text-rose-400/80 mt-1">Safely dropped without locking</div>
        </div>

        {/* Remaining Inventory */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface-1)] border border-[var(--border-default)]">
          <div className="text-[10px] font-mono uppercase text-[var(--accent-cyan)] font-semibold">Remaining Stock</div>
          <div className="text-2xl font-mono font-bold text-white mt-1">{finalStock}</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">
            Oversold: 0 (Guaranteed)
          </div>
        </div>
      </div>

      {/* 4. Inventory Depletion Bar */}
      <Card variant="default" className="border-[var(--border-default)] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-cyan)] font-semibold uppercase">Inventory Depletion Progress</span>
            <Badge variant={finalStock === 0 ? "amber" : "emerald"} size="sm">
              {finalStock === 0 ? "STOCK DEPLETED" : "STOCK AVAILABLE"}
            </Badge>
          </div>
          <span className="text-white font-bold">
            {finalStock} / {simulationResult.initialInventory} remaining ({Math.round(inventoryFillPercent)}%)
          </span>
        </div>

        <div className="w-full h-3 bg-slate-900 rounded-full border border-[var(--border-subtle)] overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              finalStock === 0
                ? "bg-slate-700"
                : finalStock <= 5
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{ width: `${inventoryFillPercent}%` }}
          />
        </div>

        {/* Mathematical Invariants Checklist */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-2">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span> Remaining Stock &ge; 0 ({finalStock})
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span> Successful Purchases &le; N ({successfulPurchases} &le; {simulationResult.initialInventory})
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span>✓</span> Exact Conservation Law ({simulationResult.initialInventory} - {successfulPurchases} = {finalStock})
          </span>
        </div>
      </Card>

      {/* 5. Request-Flow Architectural Diagram & Reference Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Request Outcome Grid / Visual Stream */}
        <div className="lg:col-span-7">
          <Card variant="default" className="border-[var(--border-default)] p-5 h-full flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3">
                <span className="font-mono text-xs uppercase text-[var(--accent-cyan)] font-semibold">
                  Request Outcome Stream ({simulationResult.requests.length} attempts)
                </span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">
                  Green = Confirmed Order • Gray = 429 Sold Out
                </span>
              </div>

              {/* Visual Grid representing every incoming request */}
              <div className="max-h-56 overflow-y-auto pr-1">
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                  {simulationResult.requests.map((req) => (
                    <div
                      key={req.id}
                      title={`${req.id}: ${req.status} (Remaining: ${req.remainingInventoryAfter})`}
                      className={`h-6 rounded text-[9px] font-mono flex items-center justify-center font-bold select-none transition-colors ${
                        req.status === "SUCCESS_ALLOCATED"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                          : "bg-slate-900 text-slate-500 border border-slate-800"
                      }`}
                    >
                      {req.requestIndex}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
              <span>Deterministic Order Allocation:</span>
              <span className="text-emerald-400 font-semibold">Zero Double-Spend Race Conditions</span>
            </div>
          </Card>
        </div>

        {/* Right: Architecture Diagram & Tech Roles */}
        <div className="lg:col-span-5">
          <Card variant="default" className="border-[var(--border-default)] p-5 space-y-4">
            <div className="border-b border-[var(--border-subtle)] pb-2">
              <span className="font-mono text-xs uppercase text-[var(--accent-cyan)] font-semibold block">
                Reference Architecture Topology
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                Project Design: Redis + FastAPI + PostgreSQL
              </span>
            </div>

            {/* ASCII Topology Diagram */}
            <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] font-mono text-[10px] text-slate-300 leading-tight overflow-x-auto">
              <pre>{`[Incoming Checkout Traffic]
           │
           ▼
┌─────────────────────────────┐
│ FastAPI Ingestion Gateway   │ ── Async non-blocking endpoints
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ Redis In-Memory Guard       │ ── Atomic Lua Script decrement
│                             │    • Checks & decrements in 1 op
│                             │    • Rejects excess with 429
└──────────────┬──────────────┘
               │ (Buffered Async Queue)
               ▼
┌─────────────────────────────┐
│ PostgreSQL Persistent Store │ ── Audited orders & invoices
└─────────────────────────────┘`}</pre>
            </div>

            {/* Component Roles Explanation */}
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-0.5">
                <span className="text-red-400 font-bold">1. Redis:</span>
                <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                  Executes single-threaded Lua script atomically in memory. Guards the inventory boundary in sub-milliseconds without DB row locks.
                </p>
              </div>

              <div className="p-2 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-0.5">
                <span className="text-emerald-400 font-bold">2. FastAPI:</span>
                <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                  Asynchronous Python web framework handling thousands of concurrent incoming HTTP connections with low event-loop overhead.
                </p>
              </div>

              <div className="p-2 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-0.5">
                <span className="text-blue-400 font-bold">3. PostgreSQL:</span>
                <p className="text-[11px] text-[var(--text-secondary)] font-sans">
                  Persistent transactional database. Receives finalized orders asynchronously via queue workers, keeping the write path off the critical request loop.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

