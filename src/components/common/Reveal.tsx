"use client";

import React, { useEffect, useRef } from "react";

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Reveal
 *
 * Implements Stage 4 restrained entrance reveals for prioritized content:
 * 1. Uses IntersectionObserver to trigger a single subtle fade-in & 10px upward glide.
 * 2. Unobserves immediately upon entering viewport to prevent unexpected replays.
 * 3. Does not delay content access or cause layout shift.
 * 4. Bypasses animation immediately when prefers-reduced-motion is active.
 * 5. Direct DOM class manipulation: zero React re-renders upon viewport entry.
 */
export function Reveal({ children, className = "", delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If reduced-motion is requested or IntersectionObserver is unsupported, reveal immediately
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      element.classList.add("is-revealed");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          element.classList.add("is-revealed");
          observer.unobserve(element);
        }
      },
      {
        rootMargin: "0px 0px -30px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      className={`reveal-on-scroll ${className}`}
    >
      {children}
    </div>
  );
}

