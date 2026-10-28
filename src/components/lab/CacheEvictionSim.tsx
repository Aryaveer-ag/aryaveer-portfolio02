"use client";

import React, { useState, useMemo } from "react";
import { Badge, Card } from "@/components/common";
import { LRUCacheEngine, LFUCacheEngine } from "@/modules/lab/engines/CacheEviction";
import { CacheAlgorithm, CacheEntry, CacheTelemetry } from "@/types/simulations";

export function CacheEvictionSim() {
  const [algorithm, setAlgorithm] = useState<CacheAlgorithm>("LRU");
  const [capacity, setCapacity] = useState<number>(4);
  const [entries, setEntries] = useState<CacheEntry[]>([]);
  const [lastAction, setLastAction] = useState<{
    op: "GET" | "PUT";
    key: string;
    status: "HIT" | "MISS";
    evictedKey?: string;
  } | null>(null);

  const [telemetry, setTelemetry] = useState<CacheTelemetry>({
    totalLookups: 0,
    hits: 0,
    misses: 0,
    hitRatioPercent: 0,
    evictions: 0,
  });

  // Engine instances
  const lruEngine = useMemo(() => new LRUCacheEngine(capacity), [capacity]);
  const lfuEngine = useMemo(() => new LFUCacheEngine(capacity), [capacity]);

  const activeEngine = algorithm === "LRU" ? lruEngine : lfuEngine;

  // Handle key access (reads if present, otherwise inserts)
  const accessKey = (key: string) => {
    const isPresent = entries.some((e) => e.key === key);
    let result;

    if (isPresent) {
      result = activeEngine.get(key);
    } else {
      result = activeEngine.put(key, `payload_${key.toLowerCase()}`);
    }

    setEntries(result.entries);
    setLastAction({
      op: result.operation,
      key,
      status: result.status,
      evictedKey: result.evictedEntry?.key,
    });

    setTelemetry((prev) => {
      const isHit = result.status === "HIT";
      const total = prev.totalLookups + 1;
      const hits = prev.hits + (isHit ? 1 : 0);
      const misses = prev.misses + (isHit ? 0 : 1);
      const evictions = prev.evictions + (result.evictedEntry ? 1 : 0);
      const ratio = total > 0 ? (hits / total) * 100 : 0;

      return {
        totalLookups: total,
        hits,
        misses,
        hitRatioPercent: Math.round(ratio * 10) / 10,
        evictions,
      };
    });
  };

  // Run access preset
  const runPreset = (pattern: "sequential" | "hot-key" | "thrash") => {
    if (pattern === "sequential") {
      ["A", "B", "C", "D"].forEach((k) => accessKey(k));
    } else if (pattern === "hot-key") {
      ["A", "A", "A", "B", "A"].forEach((k) => accessKey(k));
    } else if (pattern === "thrash") {
      ["A", "B", "C", "D", "E", "F", "A"].forEach((k) => accessKey(k));
    }
  };

  const handleClear = () => {
    activeEngine.clear();
    setEntries([]);
    setLastAction(null);
    setTelemetry({
      totalLookups: 0,
      hits: 0,
      misses: 0,
      hitRatioPercent: 0,
      evictions: 0,
    });
  };

  const availableKeys = ["A", "B", "C", "D", "E", "F"];

  return (
    <div className="space-y-6">
      {/* Simulation Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)] border border-[var(--border-default)]">
        {/* Algorithm Switcher */}
        <div className="md:col-span-5 space-y-1">
          <label className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block">
            Eviction Strategy
          </label>
          <div className="flex rounded-[var(--radius-sm)] border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-base)]">
            <button
              type="button"
              onClick={() => {
                setAlgorithm("LRU");
                setEntries(lruEngine.getEntries());
              }}
              className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] font-mono text-xs transition-colors cursor-pointer ${
                algorithm === "LRU"
                  ? "bg-[var(--bg-surface-3)] text-white font-semibold"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              LRU (Recency)
            </button>
            <button
              type="button"
              onClick={() => {
                setAlgorithm("LFU");
                setEntries(lfuEngine.getEntries());
              }}
              className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] font-mono text-xs transition-colors cursor-pointer ${
                algorithm === "LFU"
                  ? "bg-[var(--bg-surface-3)] text-white font-semibold"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              LFU (Frequency)
            </button>
          </div>
        </div>

        {/* Capacity Slider */}
        <div className="md:col-span-4 space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[var(--text-muted)]">Cache Slots:</span>
            <span className="text-white font-semibold">{capacity} slots</span>
          </div>
          <input
            type="range"
            min="3"
            max="6"
            value={capacity}
            onChange={(e) => {
              const newCap = Number(e.target.value);
              setCapacity(newCap);
              activeEngine.setCapacity(newCap);
              setEntries(activeEngine.getEntries());
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-indigo)]"
          />
        </div>

        {/* Presets Row */}
        <div className="md:col-span-3 space-y-1">
          <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block">
            Preset Pattern
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => runPreset("hot-key")}
              className="px-2 py-1 bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] text-[10px] font-mono text-slate-300 rounded hover:text-white transition-colors cursor-pointer"
            >
              Hot Key
            </button>
            <button
              type="button"
              onClick={() => runPreset("thrash")}
              className="px-2 py-1 bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] text-[10px] font-mono text-slate-300 rounded hover:text-white transition-colors cursor-pointer"
            >
              Thrash
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-2 py-1 bg-[var(--bg-surface-3)] border border-[var(--border-subtle)] text-[10px] font-mono text-rose-400 rounded hover:text-rose-300 transition-colors cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Memory Slot Visualization & Key Controls */}
        <div className="lg:col-span-8 space-y-4">
          <Card variant="default" className="border-[var(--border-default)] p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <div className="text-xs font-mono uppercase text-[var(--accent-cyan)] font-semibold">
                  Visual Cache Memory Slots
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {algorithm === "LRU"
                    ? "Entries sorted by recency (oldest evicted when full)"
                    : "Entries track access frequency (least frequent evicted)"}
                </div>
              </div>

              {lastAction && (
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      lastAction.status === "HIT"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {lastAction.status}: Key {lastAction.key}
                  </span>
                  {lastAction.evictedKey && (
                    <span className="text-[11px] text-rose-400">
                      (Evicted: {lastAction.evictedKey})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Memory Blocks Visual Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: capacity }).map((_, slotIdx) => {
                const entry = entries[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`p-3.5 rounded-[var(--radius-md)] border transition-all duration-200 flex flex-col justify-between min-h-[96px] ${
                      entry
                        ? "bg-[var(--bg-surface-2)] border-[var(--border-default)]"
                        : "bg-[var(--bg-surface-1)] border-[var(--border-subtle)] border-dashed opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[var(--text-muted)]">
                        Slot 0{slotIdx + 1}
                      </span>
                      {entry && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                          f = {entry.frequency}
                        </span>
                      )}
                    </div>

                    {entry ? (
                      <div>
                        <div className="text-xl font-bold font-mono text-white">
                          Key &quot;{entry.key}&quot;
                        </div>
                        <div className="text-[10px] font-mono text-[var(--accent-cyan)] truncate">
                          {entry.value}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center font-mono text-xs text-[var(--text-muted)] py-2">
                        [EMPTY SLOT]
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Key Trigger Buttons */}
            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block">
                Simulate Key Access Operation (Read / Insert):
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {availableKeys.map((key) => {
                  const isPresent = entries.some((e) => e.key === key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => accessKey(key)}
                      className={`font-mono text-sm px-3.5 py-1.5 rounded-[var(--radius-sm)] border font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                        isPresent
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/50"
                          : "bg-[var(--bg-surface-3)] text-slate-200 border-[var(--border-default)] hover:text-white hover:border-slate-500"
                      }`}
                    >
                      {key} {isPresent && <span className="text-[10px] text-emerald-400 font-normal">●</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Telemetry & Hit/Miss Telemetry */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="default" className="border-[var(--border-default)] p-4 space-y-4">
            <div className="border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-[var(--accent-cyan)] font-semibold">
                Cache Hit Telemetry
              </span>
              <Badge variant="indigo" size="sm">
                O(1) Access
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)]">
                <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Total Lookups</div>
                <div className="text-lg font-mono font-bold text-white mt-1">{telemetry.totalLookups}</div>
              </div>
              <div className="p-3 rounded bg-[var(--bg-surface-2)] border border-emerald-900/50">
                <div className="text-[10px] font-mono uppercase text-emerald-400">Cache Hits</div>
                <div className="text-lg font-mono font-bold text-emerald-400 mt-1">{telemetry.hits}</div>
              </div>
              <div className="p-3 rounded bg-[var(--bg-surface-2)] border border-amber-900/50">
                <div className="text-[10px] font-mono uppercase text-amber-400">Cache Misses</div>
                <div className="text-lg font-mono font-bold text-amber-400 mt-1">{telemetry.misses}</div>
              </div>
              <div className="p-3 rounded bg-[var(--bg-surface-2)] border border-rose-900/50">
                <div className="text-[10px] font-mono uppercase text-rose-400">Evictions</div>
                <div className="text-lg font-mono font-bold text-rose-400 mt-1">{telemetry.evictions}</div>
              </div>
            </div>

            {/* Hit Ratio Visual Percentage Bar */}
            <div className="p-3 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[var(--text-muted)]">Hit Ratio Efficiency:</span>
                <span className="font-bold text-emerald-400">{telemetry.hitRatioPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-200"
                  style={{ width: `${telemetry.hitRatioPercent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)]">
              Hash Map + Doubly Linked List guarantees deterministic $O(1)$ amortized lookups and evictions.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
