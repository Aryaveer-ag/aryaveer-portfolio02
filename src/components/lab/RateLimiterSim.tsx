"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Badge, Card } from "@/components/common";
import { TokenBucket } from "@/modules/lab/engines/TokenBucket";
import { SlidingWindowCounter } from "@/modules/lab/engines/SlidingWindow";
import { RateLimiterLog, RateLimiterTelemetry } from "@/types/simulations";

export function RateLimiterSim() {
  const [algorithm, setAlgorithm] = useState<"token-bucket" | "sliding-window">("token-bucket");
  const [capacity, setCapacity] = useState<number>(12);
  const [refillRate, setRefillRate] = useState<number>(3); // tokens per sec
  const [isAutoGenerating, setIsAutoGenerating] = useState<boolean>(false);
  const [currentTokens, setCurrentTokens] = useState<number>(12);

  const [telemetry, setTelemetry] = useState<RateLimiterTelemetry>({
    totalRequests: 0,
    allowedRequests: 0,
    droppedRequests: 0,
    dropRatePercent: 0,
  });

  const [logs, setLogs] = useState<RateLimiterLog[]>([]);

  // Persistent algorithmic engines initialized once via lazy state
  const [tokenBucket] = useState(() => new TokenBucket(12, 3));
  const [slidingWindow] = useState(() => new SlidingWindowCounter(12, 1000));

  const activeEngine = algorithm === "token-bucket" ? tokenBucket : slidingWindow;

  // Update capacity dynamically
  const handleCapacityChange = (newCap: number) => {
    setCapacity(newCap);
    tokenBucket.setCapacity(newCap);
    slidingWindow.setLimit(newCap);
    setCurrentTokens(activeEngine.getTokens());
  };

  // Update refill rate dynamically
  const handleRefillRateChange = (newRate: number) => {
    setRefillRate(newRate);
    tokenBucket.setRefillRate(newRate);
  };

  // Send request execution
  const processRequest = useCallback((count: number = 1) => {
    const engine = algorithm === "token-bucket" ? tokenBucket : slidingWindow;
    let newAllowed = 0;
    let newDropped = 0;
    const newLogs: RateLimiterLog[] = [];

    for (let i = 0; i < count; i++) {
      const result = engine.request(1);
      const timeStr = new Date(result.timestamp).toLocaleTimeString();

      if (result.allowed) {
        newAllowed++;
      } else {
        newDropped++;
      }

      newLogs.unshift({
        id: `${result.timestamp}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: timeStr,
        statusCode: result.statusCode,
        remaining: result.remainingTokens,
        message: result.message,
      });
    }

    setCurrentTokens(engine.getTokens());

    setTelemetry((prev) => {
      const total = prev.totalRequests + count;
      const allowed = prev.allowedRequests + newAllowed;
      const dropped = prev.droppedRequests + newDropped;
      const dropRate = total > 0 ? (dropped / total) * 100 : 0;
      return {
        totalRequests: total,
        allowedRequests: allowed,
        droppedRequests: dropped,
        dropRatePercent: Math.round(dropRate * 10) / 10,
      };
    });

    setLogs((prev) => [...newLogs, ...prev].slice(0, 7));
  }, [algorithm, tokenBucket, slidingWindow]);

  // Frame tick to animate token refill
  useEffect(() => {
    const interval = setInterval(() => {
      const engine = algorithm === "token-bucket" ? tokenBucket : slidingWindow;
      engine.refill();
      setCurrentTokens(engine.getTokens());
    }, 150);

    return () => clearInterval(interval);
  }, [algorithm, tokenBucket, slidingWindow]);

  // Auto-traffic generator
  useEffect(() => {
    if (!isAutoGenerating) return;

    const trafficInterval = setInterval(() => {
      processRequest(1);
    }, 400); // ~2.5 req/sec

    return () => clearInterval(trafficInterval);
  }, [isAutoGenerating, processRequest]);

  // Reset simulation
  const handleReset = () => {
    setIsAutoGenerating(false);
    activeEngine.reset();
    setCurrentTokens(activeEngine.getCapacity());
    setTelemetry({
      totalRequests: 0,
      allowedRequests: 0,
      droppedRequests: 0,
      dropRatePercent: 0,
    });
    setLogs([]);
  };

  const fillPercentage = Math.min(100, Math.max(0, (currentTokens / capacity) * 100));

  return (
    <div className="space-y-6">
      {/* Simulation Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)] border border-[var(--border-default)]">
        {/* Algorithm Toggle */}
        <div className="md:col-span-5 space-y-1">
          <label className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider block">
            Algorithm Strategy
          </label>
          <div className="flex rounded-[var(--radius-sm)] border border-[var(--border-subtle)] p-0.5 bg-[var(--bg-base)]">
            <button
              type="button"
              onClick={() => {
                setAlgorithm("token-bucket");
                setCurrentTokens(tokenBucket.getTokens());
              }}
              className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] font-mono text-xs transition-colors cursor-pointer ${
                algorithm === "token-bucket"
                  ? "bg-[var(--bg-surface-3)] text-white font-semibold"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              Token Bucket
            </button>
            <button
              type="button"
              onClick={() => {
                setAlgorithm("sliding-window");
                setCurrentTokens(slidingWindow.getTokens());
              }}
              className={`flex-1 py-1.5 px-3 rounded-[var(--radius-sm)] font-mono text-xs transition-colors cursor-pointer ${
                algorithm === "sliding-window"
                  ? "bg-[var(--bg-surface-3)] text-white font-semibold"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              Sliding Window
            </button>
          </div>
        </div>

        {/* Capacity Slider */}
        <div className="md:col-span-4 space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[var(--text-muted)]">Capacity Limit:</span>
            <span className="text-white font-semibold">{capacity} tokens</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={capacity}
            onChange={(e) => handleCapacityChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-cyan)]"
          />
        </div>

        {/* Refill Rate Slider */}
        <div className="md:col-span-3 space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[var(--text-muted)]">Refill Rate:</span>
            <span className="text-white font-semibold">{refillRate}/sec</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            disabled={algorithm === "sliding-window"}
            value={refillRate}
            onChange={(e) => handleRefillRateChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[var(--accent-emerald)] disabled:opacity-30"
          />
        </div>
      </div>

      {/* Main Interactive Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bucket Fill Visualization & Actions */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="default" className="border-[var(--border-default)] p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
              <div>
                <div className="text-xs font-mono uppercase text-[var(--accent-cyan)] font-semibold">
                  Bucket Reservoir State
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  Live token volume ready for immediate consumption
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-white">
                  {Math.floor(currentTokens)}
                </span>
                <span className="text-xs text-[var(--text-muted)]"> / {capacity}</span>
              </div>
            </div>

            {/* Visual Token Reservoir Bar */}
            <div className="space-y-2">
              <div className="w-full h-7 bg-[var(--bg-base)] rounded-[var(--radius-sm)] border border-[var(--border-subtle)] overflow-hidden relative p-0.5">
                <div
                  className="h-full rounded-[var(--radius-sm)] bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 transition-all duration-150 relative"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)]">
                <span>0 (Exhausted)</span>
                <span>Burst Threshold: {capacity} Tokens</span>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => processRequest(1)}
              >
                Send Request (1)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => processRequest(8)}
                className="border-amber-700/60 text-amber-300 hover:border-amber-500"
              >
                Burst Surge (8)
              </Button>
              <Button
                variant={isAutoGenerating ? "outline" : "ghost"}
                size="sm"
                onClick={() => setIsAutoGenerating(!isAutoGenerating)}
                className={isAutoGenerating ? "text-emerald-400 border-emerald-700" : ""}
              >
                {isAutoGenerating ? "Stop Auto-Traffic" : "Start Auto-Traffic"}
              </Button>
              <button
                type="button"
                onClick={handleReset}
                className="ml-auto font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline transition-colors cursor-pointer"
              >
                Reset Telemetry
              </button>
            </div>
          </Card>

          {/* Telemetry Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-1)] border border-[var(--border-subtle)]">
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)]">Total Ingestion</div>
              <div className="text-lg font-mono font-bold text-white mt-1">{telemetry.totalRequests}</div>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-1)] border border-emerald-900/50">
              <div className="text-[10px] font-mono uppercase text-emerald-400">Allowed (200 OK)</div>
              <div className="text-lg font-mono font-bold text-emerald-400 mt-1">{telemetry.allowedRequests}</div>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-1)] border border-rose-900/50">
              <div className="text-[10px] font-mono uppercase text-rose-400">Dropped (429)</div>
              <div className="text-lg font-mono font-bold text-rose-400 mt-1">{telemetry.droppedRequests}</div>
            </div>
            <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--bg-surface-1)] border border-[var(--border-subtle)]">
              <div className="text-[10px] font-mono uppercase text-[var(--accent-cyan)]">Drop Rate</div>
              <div className="text-lg font-mono font-bold text-white mt-1">{telemetry.dropRatePercent}%</div>
            </div>
          </div>
        </div>

        {/* Right: Live HTTP Status Stream */}
        <div className="lg:col-span-5">
          <Card variant="default" className="border-[var(--border-default)] h-full flex flex-col justify-between p-4">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent-cyan)] font-semibold">
                  Live Request Ingestion Stream
                </span>
                <Badge variant={isAutoGenerating ? "emerald" : "neutral"} dot={isAutoGenerating} size="sm">
                  {isAutoGenerating ? "STREAMING" : "IDLE"}
                </Badge>
              </div>

              {logs.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-[var(--text-muted)] space-y-1">
                  <div>No requests in stream.</div>
                  <div>Click &quot;Send Request&quot; or &quot;Burst Surge&quot; to test limiters.</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2 rounded bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] font-mono text-xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                            log.statusCode === 200
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                              : "bg-rose-950/80 text-rose-400 border border-rose-800"
                          }`}
                        >
                          {log.statusCode}
                        </span>
                        <span className="text-[11px] text-[var(--text-secondary)]">
                          {log.timestamp}
                        </span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        rem: {log.remaining}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)] flex justify-between">
              <span>Client-side engine: Zero network latency</span>
              <span className="text-[var(--accent-emerald)]">100% Deterministic</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

