"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  color: string;
  alpha: number;
}

/**
 * ParticleNetwork
 *
 * Implements Stage 3 of the interactive engineering portfolio aesthetic:
 * 1. Sparse constellation of faint cyan and blue particles.
 * 2. Ultra-slow, subtle ambient drift (0.15 - 0.35 px/frame).
 * 3. Faint connecting lines (max opacity 0.10) between nearby particles (<= 110px).
 * 4. Gentle pointer response: soft repulsion with gradual damping back to cruise velocity.
 * 5. Tab visibility awareness: pauses animation when page is hidden to save battery.
 * 6. Responsive scaling: conservative count (12-14) on mobile, 28-30 on desktop.
 * 7. Accessibility: freezes on reduced-motion preference.
 * 8. Zero React re-renders: pure HTML5 Canvas 2D with capped devicePixelRatio.
 */
export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check accessibility & pointer preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    let animationFrameId: number | null = null;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Pointer state (stored in closure, zero re-renders)
    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    // Calculate conservative particle count based on screen width
    const getParticleCount = (w: number) => {
      if (w < 640) return 12; // Mobile screens
      if (w < 1024) return 20; // Tablets / laptops
      return 30; // Desktop workstations
    };

    const initParticles = (w: number, h: number) => {
      const count = getParticleCount(w);
      const list: Particle[] = [];

      for (let i = 0; i < count; i++) {
        // Slow base velocities
        const baseVx = (Math.random() - 0.5) * 0.35;
        const baseVy = (Math.random() - 0.5) * 0.35;

        // Alternate subtle cyan and engineering blue
        const isCyan = Math.random() > 0.35;
        const color = isCyan ? "rgba(6, 182, 212, " : "rgba(59, 130, 246, ";

        list.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: 0.9 + Math.random() * 0.8, // 0.9px - 1.7px
          color,
          alpha: 0.25 + Math.random() * 0.25, // 0.25 - 0.50 opacity
        });
      }

      particles = list;
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // Cap devicePixelRatio at 2 to avoid excess GPU load on 4K/retina displays
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reinitialize particles if empty or size changed significantly
      if (particles.length === 0) {
        initParticles(width, height);
      } else {
        // Clamp existing particles to new dimensions
        for (const p of particles) {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        }
      }
    };

    resizeCanvas();

    // If reduced motion is requested, render once statically and exit
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }
      return;
    }

    const maxConnectionDistance = 110;
    const maxConnectionDistSq = maxConnectionDistance * maxConnectionDistance;
    const mouseRadius = 120;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const hasFinePointer = finePointerQuery.matches && mouse.active;

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Soft pointer repulsion (desktop fine pointer only)
        if (hasFinePointer) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadius * mouseRadius && distSq > 0) {
            const dist = Math.sqrt(distSq);
            // Gentle inverse-linear force factor
            const force = (1 - dist / mouseRadius) * 0.45;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Return smoothly toward base drift velocity (damping)
        p.vx = p.vx * 0.96 + p.baseVx * 0.04;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;

        // Advance position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen boundaries with a small 10px buffer
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      }

      // 2. Draw faint connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          // Quick bounding box check before calculating square distance
          if (Math.abs(dx) > maxConnectionDistance) continue;

          const dy = p1.y - p2.y;
          if (Math.abs(dy) > maxConnectionDistance) continue;

          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectionDistSq) {
            const dist = Math.sqrt(distSq);
            // Subtle, faint line opacity (max 0.10)
            const lineAlpha = (1 - dist / maxConnectionDistance) * 0.10;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Event listeners
    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!animationFrameId && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Restrained scroll impulse: clamp to prevent sudden jumps on rapid swipe
      const clampedDelta = Math.max(-15, Math.min(15, deltaY));
      for (let i = 0; i < particles.length; i++) {
        particles[i].y -= clampedDelta * 0.06;
      }
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (finePointerQuery.matches) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.addEventListener("mouseleave", handlePointerLeave, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (finePointerQuery.matches) {
        window.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("mouseleave", handlePointerLeave);
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}

