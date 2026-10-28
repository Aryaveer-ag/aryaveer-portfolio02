"use client";

import React, { useRef } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonAsLink = ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    isExternal?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button
 *
 * Implements Stage 6 refined interactions:
 * 1. Optional subtle magnetic tracking for key CTA buttons (clamped to max +/-3.5px).
 * 2. Restrained tactile active micro-compression (scale: 0.98).
 * 3. Refined cyan specular highlight and diffuse glow on secondary/primary hover.
 * 4. Automatic bypass on touch devices and reduced-motion preferences.
 * 5. Full keyboard focus ring and accessible navigation preservation.
 */
export function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  iconLeft,
  iconRight,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const buttonRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!magnetic) return;

    if (typeof window !== "undefined") {
      if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    }

    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Subtle magnetic attraction factor: max +/-3.5px
    const dx = ((e.clientX - centerX) / (rect.width / 2)) * 3.5;
    const dy = ((e.clientY - centerY) / (rect.height / 2)) * 3.5;

    el.style.setProperty("--btn-x", `${dx.toFixed(2)}px`);
    el.style.setProperty("--btn-y", `${dy.toFixed(2)}px`);
  };

  const handlePointerLeave = () => {
    if (!magnetic) return;
    const el = buttonRef.current;
    if (!el) return;

    el.style.setProperty("--btn-x", "0px");
    el.style.setProperty("--btn-y", "0px");
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-slate-100 text-slate-900 hover:bg-white hover:shadow-[0_0_16px_rgba(255,255,255,0.22)] active:bg-slate-200 border border-transparent font-medium",
    secondary:
      "bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-3)] hover:border-cyan-500/40 hover:shadow-[0_0_14px_rgba(6,182,212,0.15)] border border-[var(--border-default)] font-medium",
    outline:
      "bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] hover:border-cyan-500/30 hover:text-white border border-[var(--border-default)] font-medium",
    ghost:
      "bg-transparent text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-surface-2)] border border-transparent font-normal",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 gap-1.5 rounded-[var(--radius-sm)]",
    md: "text-sm px-4 py-2 gap-2 rounded-[var(--radius-md)]",
    lg: "text-base px-5 py-2.5 gap-2.5 rounded-[var(--radius-lg)]",
  };

  const baseClasses =
    "inline-flex items-center justify-center transition-all duration-150 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]";

  const magneticStyles: React.CSSProperties = magnetic
    ? {
        transform: "translate3d(var(--btn-x, 0px), var(--btn-y, 0px), 0)",
        transition:
          "transform 200ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease",
        willChange: "transform",
      }
    : {};

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
    magnetic ? "magnetic-btn" : ""
  } ${className}`;

  if ("href" in rest && rest.href) {
    const {
      href,
      isExternal,
      style: restStyle,
      onPointerMove: propOnPointerMove,
      onPointerLeave: propOnPointerLeave,
      ...anchorProps
    } = rest;

    const combinedStyle = { ...magneticStyles, ...restStyle };

    const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
      handlePointerMove(e);
      propOnPointerMove?.(e);
    };

    const onLeave = (e: React.PointerEvent<HTMLAnchorElement>) => {
      handlePointerLeave();
      propOnPointerLeave?.(e);
    };

    if (isExternal) {
      return (
        <a
          ref={(node) => {
            buttonRef.current = node;
          }}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          style={combinedStyle}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          {...anchorProps}
        >
          {iconLeft && <span className="shrink-0">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </a>
      );
    }

    return (
      <Link
        ref={(node) => {
          buttonRef.current = node;
        }}
        href={href}
        className={combinedClasses}
        style={combinedStyle}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        {...anchorProps}
      >
        {iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </Link>
    );
  }

  const {
    style: restStyle,
    onPointerMove: propOnPointerMove,
    onPointerLeave: propOnPointerLeave,
    ...buttonRest
  } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;

  const combinedStyle = { ...magneticStyles, ...restStyle };

  const onBtnMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    handlePointerMove(e);
    propOnPointerMove?.(e);
  };

  const onBtnLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    handlePointerLeave();
    propOnPointerLeave?.(e);
  };

  return (
    <button
      ref={(node) => {
        buttonRef.current = node;
      }}
      className={combinedClasses}
      style={combinedStyle}
      onPointerMove={onBtnMove}
      onPointerLeave={onBtnLeave}
      {...buttonRest}
    >
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
