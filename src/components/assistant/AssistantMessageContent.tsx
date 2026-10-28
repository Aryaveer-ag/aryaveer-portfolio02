"use client";

import React from "react";

interface AssistantMessageContentProps {
  content: string;
  onNavigate?: (href: string) => void;
}

export function AssistantMessageContent({
  content,
  onNavigate,
}: AssistantMessageContentProps) {
  // Simple, robust line-by-line formatting
  const paragraphs = content.split("\n\n");

  const renderInlineFormatted = (text: string) => {
    // Regex matching markdown links [label](url), bold **bold**, and inline code `code`
    const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, index) => {
      // 1. Markdown Link: [label](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const isInternalAnchor = href.startsWith("#");

        return (
          <a
            key={index}
            href={href}
            onClick={(e) => {
              if (isInternalAnchor) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }
                if (onNavigate) {
                  onNavigate(href);
                }
              }
            }}
            className="text-[var(--accent-cyan)] font-medium underline underline-offset-2 hover:text-white transition-colors inline-flex items-center gap-0.5"
            target={isInternalAnchor || href.startsWith("mailto:") ? undefined : "_blank"}
            rel={isInternalAnchor || href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          >
            <span>{label}</span>
            {isInternalAnchor ? (
              <span className="text-[10px] select-none">↓</span>
            ) : href.startsWith("mailto:") ? (
              <span className="text-[10px] select-none">✉</span>
            ) : (
              <span className="text-[10px] select-none">↗</span>
            )}
          </a>
        );
      }

      // 2. Bold text: **text**
      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={index} className="text-[var(--text-primary)] font-semibold">
            {boldMatch[1]}
          </strong>
        );
      }

      // 3. Inline code: `code`
      const codeMatch = part.match(/^`([^`]+)`$/);
      if (codeMatch) {
        return (
          <code
            key={index}
            className="px-1 py-0.5 rounded bg-[var(--bg-base)] text-[var(--accent-indigo)] font-mono text-[11px] border border-[var(--border-subtle)]"
          >
            {codeMatch[1]}
          </code>
        );
      }

      return part;
    });
  };

  return (
    <div className="space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n");

        // Check if paragraph is a list
        const isBulletList = lines.every((line) => line.trim().startsWith("- "));
        const isNumberedList = lines.every((line) => /^\d+\.\s/.test(line.trim()));

        if (isBulletList) {
          return (
            <ul key={pIdx} className="space-y-1 pl-3">
              {lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^- /, "");
                return (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span className="text-[var(--accent-indigo)] font-mono select-none mt-0.5">
                      •
                    </span>
                    <span>{renderInlineFormatted(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        if (isNumberedList) {
          return (
            <ol key={pIdx} className="space-y-1.5 pl-3">
              {lines.map((line, lIdx) => {
                const match = line.trim().match(/^(\d+)\.\s(.*)$/);
                if (!match) return <li key={lIdx}>{renderInlineFormatted(line)}</li>;
                const [, num, itemText] = match;
                return (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span className="font-mono text-[11px] text-[var(--accent-cyan)] font-semibold shrink-0 mt-0.5">
                      {num}.
                    </span>
                    <span>{renderInlineFormatted(itemText)}</span>
                  </li>
                );
              })}
            </ol>
          );
        }

        return <p key={pIdx}>{renderInlineFormatted(para)}</p>;
      })}
    </div>
  );
}

