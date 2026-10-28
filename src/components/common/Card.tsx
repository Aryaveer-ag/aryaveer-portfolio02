"use client";

import React, { useRef } from "react";

export type CardVariant = "default" | "interactive" | "subtle" | "ghost";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  spotlight?: boolean;
  tilt?: boolean;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  spotlight = false,
  tilt = false,
  className = "",
  children,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (!spotlight && !tilt) return;

    // Check fine pointer & reduced motion preference
    if (typeof window !== "undefined") {
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (spotlight) {
      el.style.setProperty("--card-x", `${x.toFixed(1)}px`);
      el.style.setProperty("--card-y", `${y.toFixed(1)}px`);
    }

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Clamped gentle rotation: max +/-2.5 degrees
      const rotY = ((x - centerX) / centerX) * 2.5;
      const rotX = -((y - centerY) / centerY) * 2.5;

      el.style.setProperty("--card-rot-x", `${rotX.toFixed(2)}deg`);
      el.style.setProperty("--card-rot-y", `${rotY.toFixed(2)}deg`);
    }
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    const el = cardRef.current;
    if (!el) return;

    if (spotlight) {
      el.style.setProperty("--card-x", "-1000px");
      el.style.setProperty("--card-y", "-1000px");
    }

    if (tilt) {
      el.style.setProperty("--card-rot-x", "0deg");
      el.style.setProperty("--card-rot-y", "0deg");
    }
  };

  const variantClasses: Record<CardVariant, string> = {
    default:
      "bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-sm",
    interactive:
      "bg-[var(--bg-surface-1)] border border-[var(--border-subtle)] hover:border-cyan-500/30 hover:bg-[var(--bg-surface-2)]/90 hover:shadow-[0_4px_24px_-4px_rgba(6,182,212,0.12)] hover:-translate-y-0.5 transition-all duration-200 text-[var(--text-primary)] shadow-sm",
    subtle:
      "bg-[var(--bg-surface-2)]/60 border border-[var(--border-subtle)] text-[var(--text-primary)]",
    ghost:
      "bg-transparent border border-[var(--border-subtle)] text-[var(--text-primary)]",
  };

  const tiltStyles: React.CSSProperties = tilt
    ? {
        transform:
          "perspective(1000px) rotateX(var(--card-rot-x, 0deg)) rotateY(var(--card-rot-y, 0deg))",
        transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }
    : {};

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative rounded-[var(--radius-lg)] p-5 md:p-6 ${variantClasses[variant]} ${className}`}
      style={{
        ...tiltStyles,
        ...style,
      }}
      {...props}
    >
      {children}

      {/* Dynamic Specular Spotlight Border & Sheen Overlay (Non-blocking) */}
      {spotlight && (
        <>
          {/* Subtle inner card sheen following cursor */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(280px circle at var(--card-x, -1000px) var(--card-y, -1000px), rgba(6, 182, 212, 0.05), transparent 70%)",
            }}
          />
          {/* Specular 1px border highlight following cursor */}
          <div
            aria-hidden="true"
            className="absolute -inset-[1px] rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 card-spotlight-border"
            style={{
              background:
                "radial-gradient(200px circle at var(--card-x, -1000px) var(--card-y, -1000px), rgba(6, 182, 212, 0.45), rgba(59, 130, 246, 0.15) 45%, transparent 70%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
          />
        </>
      )}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  as: Component = "h3",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <Component
      className={`text-lg font-semibold tracking-tight text-[var(--text-primary)] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
