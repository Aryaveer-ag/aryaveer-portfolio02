import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Component = "h2",
  action,
  className = "",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
        isCentered ? "text-center items-center md:items-center" : ""
      } ${className}`}
    >
      <div className={`space-y-2 max-w-2xl ${isCentered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent-cyan)]">
              {eyebrow}
            </span>
          </div>
        )}

        <Component className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {title}
        </Component>

        {description && (
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

