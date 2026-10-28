"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container, Badge, Button } from "@/components/common";
import { studioProfile } from "@/data/profile";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#top" },
    { label: "Projects", href: "#projects" },
    { label: "Engineering Lab", href: "#lab" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/90 backdrop-blur-md">
      <Container size="lg" className="h-16 flex items-center justify-between">
        {/* Brand & Studio Indicator */}
        <div className="flex items-center gap-3">
          <Link
            href="#top"
            className="font-mono text-sm font-bold tracking-tight text-[var(--text-primary)] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] rounded-[var(--radius-sm)]"
          >
            Aryaveer.dev
          </Link>
          <span className="text-[var(--border-strong)] hidden sm:inline">/</span>
          <div className="hidden sm:flex items-center">
            <Badge variant="emerald" dot pulse size="sm">
              {studioProfile.availability.label}
            </Badge>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-xs font-mono"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 px-1.5 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            magnetic
            href="#contact"
          >
            {studioProfile.ctas.talk.label}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            href="#contact"
            className="text-xs px-2.5 py-1"
          >
            Let&apos;s Talk
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] border border-[var(--border-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface-1)] px-4 py-4 space-y-3 transition-all animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
            <span className="font-mono text-xs text-[var(--text-muted)]">
              NAVIGATION
            </span>
            <Badge variant="emerald" dot size="sm">
              Available
            </Badge>
          </div>
          <nav className="flex flex-col space-y-2 font-mono text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-[var(--radius-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-2)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <Button
              variant="primary"
              size="md"
              href="#contact"
              onClick={handleLinkClick}
              className="w-full text-center"
            >
              {studioProfile.ctas.talk.label}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

