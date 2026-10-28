import React from "react";

export type BadgeVariant =
  | "emerald"
  | "cyan"
  | "indigo"
  | "amber"
  | "neutral"
  | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  pulse?: boolean;
  mono?: boolean;
  children: React.ReactNode;
}

export function Badge({
  variant = "neutral",
  size = "sm",
  dot = false,
  pulse = false,
  mono = true,
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<
    BadgeVariant,
    { badge: string; dotColor: string }
  > = {
    emerald: {
      badge:
        "bg-emerald-950/40 text-emerald-400 border border-emerald-800/60",
      dotColor: "bg-emerald-400",
    },
    cyan: {
      badge: "bg-cyan-950/40 text-cyan-400 border border-cyan-800/60",
      dotColor: "bg-cyan-400",
    },
    indigo: {
      badge: "bg-blue-950/40 text-blue-400 border border-blue-800/60",
      dotColor: "bg-blue-400",
    },
    amber: {
      badge: "bg-amber-950/40 text-amber-400 border border-amber-800/60",
      dotColor: "bg-amber-400",
    },
    neutral: {
      badge:
        "bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-default)]",
      dotColor: "bg-slate-400",
    },
    outline: {
      badge:
        "bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)]",
      dotColor: "bg-slate-400",
    },
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5",
    md: "text-sm px-3 py-1 gap-2",
  }[size];

  const fontClass = mono ? "font-mono" : "font-sans font-medium";

  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sm)] ${fontClass} ${sizeClasses} ${variantStyles[variant].badge} ${className}`}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          {pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${variantStyles[variant].dotColor} opacity-70`}
            />
          )}
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
              variantStyles[variant].dotColor
            } ${pulse ? "shadow-[0_0_6px_currentColor]" : ""}`}
          />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}

