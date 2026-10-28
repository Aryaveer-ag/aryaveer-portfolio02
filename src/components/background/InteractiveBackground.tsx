"use client";

import React, { useEffect, useRef } from "react";
import { ParticleNetwork } from "./ParticleNetwork";

/**
 * InteractiveBackground
 *
 * Implements Stage 1 & Stage 2 of the interactive engineering portfolio aesthetic:
 * - Stage 1: Preserved 24px engineering dot grid with proximity cyan illumination and micro-parallax.
 * - Stage 2: Refined, multi-stop cyan-blue ambient spotlight tracking the cursor with fluid lerp damping.
 *
 * Key Engineering Properties:
 * 1. Zero React re-renders: coordinates stream directly to CSS variables (--pointer-x, --pointer-y, --offset-x, --offset-y).
 * 2. Multi-stop radial gradient: soft cyan core (0.09) fading through engineering indigo (0.03) to transparent (80%).
 * 3. Autonomous sleep: RAF cancels itself once cursor is stationary, consuming 0% idle CPU.
 * 4. Responsive fallback: On touch/mobile devices or reduced-motion preferences, renders a static, restrained ambient glow.
 * 5. Non-blocking: 'pointer-events-none' ensures zero interference with clicks, selections, or drawer controls.
 */
export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for fine pointer (desktop mouse/trackpad vs touch screens)
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!finePointerQuery.matches || prefersReducedMotion) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let isRunning = false;

    // Target coordinates (raw pointer)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.25;

    // Interpolated coordinates (smooth lerp)
    let currentX = targetX;
    let currentY = targetY;

    const applyStyles = (x: number, y: number) => {
      // Clamped subtle parallax shift (-4px to +4px)
      const offsetX = (x / window.innerWidth - 0.5) * 8;
      const offsetY = (y / window.innerHeight - 0.5) * 8;

      container.style.setProperty("--pointer-x", `${x.toFixed(1)}px`);
      container.style.setProperty("--pointer-y", `${y.toFixed(1)}px`);
      container.style.setProperty("--offset-x", `${offsetX.toFixed(2)}px`);
      container.style.setProperty("--offset-y", `${offsetY.toFixed(2)}px`);
    };

    const updateFrame = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // When cursor is idle and coordinates converge within 0.1px, sleep RAF loop to save CPU
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        applyStyles(currentX, currentY);
        isRunning = false;
        return;
      }

      // Smooth interpolation factor (0.12 provides responsive glide without lag or abruptness)
      currentX += dx * 0.12;
      currentY += dy * 0.12;
      applyStyles(currentX, currentY);

      rafId = requestAnimationFrame(updateFrame);
    };

    const startRafIfNeeded = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updateFrame);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      startRafIfNeeded();
    };

    const handlePointerLeave = () => {
      // Gently return toward the top-center hero area
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight * 0.25;
      startRafIfNeeded();
    };

    const handleResize = () => {
      // Maintain boundary accuracy on viewport resize
      applyStyles(currentX, currentY);
    };

    // Initialize resting coordinates
    applyStyles(currentX, currentY);

    let scrollRafId: number | null = null;
    const handleScroll = () => {
      if (scrollRafId === null) {
        scrollRafId = requestAnimationFrame(() => {
          const scrollOffset = (window.scrollY * 0.035) % 24;
          container.style.setProperty("--scroll-y", `${scrollOffset.toFixed(2)}px`);
          scrollRafId = null;
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={
        {
          "--pointer-x": "50%",
          "--pointer-y": "25%",
          "--offset-x": "0px",
          "--offset-y": "0px",
          "--scroll-y": "0px",
        } as React.CSSProperties
      }
    >
      {/* Layer 1: Base Dotted Grid (Foundational 24px engineering grid) */}
      <div
        className="absolute inset-[-24px] bg-grid-pattern opacity-70 motion-safe:will-change-transform"
        style={{
          transform:
            "translate3d(var(--offset-x, 0px), calc(var(--offset-y, 0px) - var(--scroll-y, 0px)), 0)",
        }}
      />

      {/* Layer 2A: Desktop Pointer-Following Cyan-Blue Spotlight (Refined multi-stop atmospheric gradient) */}
      <div
        className="hidden [@media(hover:hover)_and_(pointer:fine)]:block absolute inset-0"
        style={{
          background:
            "radial-gradient(650px circle at var(--pointer-x, 50%) var(--pointer-y, 25%), rgba(6, 182, 212, 0.09) 0%, rgba(6, 182, 212, 0.04) 25%, rgba(59, 130, 246, 0.03) 45%, rgba(59, 130, 246, 0.01) 65%, transparent 80%)",
        }}
      />

      {/* Layer 2B: Touch & Static Fallback Spotlight (Graceful centered glow for mobile/reduced-motion) */}
      <div
        className="block [@media(hover:hover)_and_(pointer:fine)]:hidden absolute inset-0"
        style={{
          background:
            "radial-gradient(500px circle at 50% 20%, rgba(6, 182, 212, 0.06) 0%, rgba(59, 130, 246, 0.02) 45%, transparent 70%)",
        }}
      />

      {/* Layer 3: Proximity Cyan-Illuminated Grid (Restricted to fine pointers with smooth masking) */}
      <div
        className="absolute inset-[-24px] opacity-0 [@media(hover:hover)_and_(pointer:fine)]:opacity-100 transition-opacity duration-500 motion-safe:will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(rgba(6, 182, 212, 0.45) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          transform:
            "translate3d(var(--offset-x, 0px), calc(var(--offset-y, 0px) - var(--scroll-y, 0px)), 0)",
          maskImage:
            "radial-gradient(320px circle at var(--pointer-x, 50%) var(--pointer-y, 25%), black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(320px circle at var(--pointer-x, 50%) var(--pointer-y, 25%), black 0%, transparent 80%)",
        }}
      />

      {/* Layer 4: Sparse Engineering Particle Network (Faint nodes & telemetry lines) */}
      <ParticleNetwork />
    </div>
  );
}
