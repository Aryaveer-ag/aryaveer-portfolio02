"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import type { PortfolioAssistant, AssistantMessage } from "@/types/assistant";
import { SUGGESTED_QUESTIONS } from "@/data/assistantKnowledge";
import { usePortfolioAssistant } from "./AssistantContext";
import { AssistantMessageContent } from "./AssistantMessageContent";
import { Badge } from "@/components/common";

export interface PortfolioChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  assistant?: PortfolioAssistant;
}

const INITIAL_MESSAGE: AssistantMessage = {
  id: "msg-welcome",
  role: "assistant",
  content:
    "Hello! I am Aryaveer's **Portfolio Assistant**.\n\n" +
    "I answer factual questions about his backend architectures, AI projects, technical skills, or how to contact him. Select a question below or enter your inquiry:",
  timestamp: Date.now(),
};

export function PortfolioChatPanel({
  isOpen,
  onClose,
  assistant: propAssistant,
}: PortfolioChatPanelProps) {
  const contextAssistant = usePortfolioAssistant();
  const activeAssistant = propAssistant || contextAssistant;

  const [messages, setMessages] = useState<AssistantMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on open
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, scrollToBottom]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (text: string) => {
    const query = text.trim();
    if (!query || isLoading) return;

    setLastError(null);
    setLastFailedQuery(null);

    const userMsg: AssistantMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await activeAssistant.ask(query);
      const assistantMsg: AssistantMessage = {
        id: `msg-asst-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while communicating with the assistant.";
      setLastError(errorMessage);
      setLastFailedQuery(query);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      handleSendMessage(lastFailedQuery);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setLastError(null);
    setLastFailedQuery(null);
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Aryaveer Portfolio Assistant Chat"
      aria-modal="false"
      className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[430px] h-[580px] max-h-[calc(100vh-6.5rem)] flex flex-col rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] shadow-2xl overflow-hidden backdrop-blur-xl"
    >
      {/* 1. Header */}
      <div className="p-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-indigo)]/20 border border-[var(--accent-indigo)]/40 flex items-center justify-center text-[var(--accent-indigo)] font-mono text-sm font-bold">
            AI
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-[var(--text-primary)]">
                Portfolio Assistant
              </span>
              <Badge variant="emerald" size="sm" dot>
                Verified Facts
              </Badge>
            </div>
            <p className="text-[10px] font-mono text-[var(--text-muted)]">
              Deterministic offline assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReset}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors text-xs font-mono"
          >
            ↺
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close assistant (Esc)"
            aria-label="Close assistant"
            className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors text-sm font-mono leading-none"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                {msg.role === "user" ? "You" : "Aryaveer.dev Assistant"}
              </span>
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[90%] leading-relaxed ${
                msg.role === "user"
                  ? "bg-[var(--accent-indigo)] text-white rounded-tr-sm shadow-sm"
                  : "bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-tl-sm shadow-inner"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-xs whitespace-pre-wrap">{msg.content}</p>
              ) : (
                <AssistantMessageContent
                  content={msg.content}
                  onNavigate={onClose}
                />
              )}
            </div>
          </div>
        ))}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <span className="text-[10px] font-mono text-[var(--text-muted)] px-1">
              Aryaveer.dev Assistant
            </span>
            <div className="p-3 rounded-2xl rounded-tl-sm bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-bounce" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-indigo)] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="font-mono text-[11px]">
                Checking verified portfolio facts...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {lastError && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-[11px] font-mono text-red-400">
              <span>⚠</span>
              <span>Assistant Error</span>
            </div>
            <p className="text-[11px] text-red-300/90 leading-relaxed">
              {lastError}
            </p>
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleRetry}
                className="px-2.5 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-200 font-mono text-[10px] transition-colors"
              >
                Retry Query
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Suggested Questions Pills */}
      <div className="p-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/70 shrink-0">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1.5 px-1">
          <span>Suggested Inquiries:</span>
          <span>Click to ask</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q.id}
              type="button"
              disabled={isLoading}
              onClick={() => handleSendMessage(q.text)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-indigo)]/50 text-[11px] text-[var(--text-secondary)] hover:text-white transition-all disabled:opacity-50 text-left whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-indigo)]"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-base)] flex items-center gap-2 shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          disabled={isLoading}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question about Aryaveer's systems..."
          aria-label="Ask a question about Aryaveer's portfolio"
          className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] focus:border-[var(--accent-indigo)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          aria-label="Send inquiry"
          className="px-3 py-2 rounded-lg bg-[var(--accent-indigo)] hover:bg-[var(--accent-indigo)]/90 disabled:bg-[var(--bg-surface-elevated)] disabled:text-[var(--text-muted)] text-white text-xs font-mono font-medium transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Send</span>
          <span className="text-[10px]">→</span>
        </button>
      </form>
    </div>
  );
}

