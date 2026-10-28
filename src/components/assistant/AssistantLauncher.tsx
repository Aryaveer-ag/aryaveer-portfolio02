"use client";

import React from "react";

export interface AssistantLauncherProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AssistantLauncher({ isOpen, onToggle }: AssistantLauncherProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
      className={`fixed bottom-4 right-4 sm:right-6 z-50 group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] select-none ${
        isOpen
          ? "bg-[var(--bg-surface-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)]"
          : "bg-[var(--accent-indigo)] text-white hover:bg-[var(--accent-indigo)]/90 hover:scale-[1.03] active:scale-[0.98] shadow-indigo-900/30"
      }`}
    >
      {/* Icon */}
      <span className="flex items-center justify-center font-mono text-sm leading-none">
        {isOpen ? (
          <span className="font-bold">✕</span>
        ) : (
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
        )}
      </span>

      {/* Label */}
      <span className="font-mono text-xs font-semibold tracking-tight">
        {isOpen ? "Close Assistant" : "Ask Assistant"}
      </span>

      {!isOpen && (
        <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/20 text-white leading-none">
          AI
        </span>
      )}
    </button>
  );
}

