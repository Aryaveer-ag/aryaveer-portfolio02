import React from "react";
import Link from "next/link";
import { Container, Badge, Button } from "@/components/common";
import { studioProfile } from "@/data/profile";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/85 backdrop-blur-md">
      <Container size="lg" className="h-16 flex items-center justify-between">
        {/* Studio Identifier & Availability Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
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

        {/* Primary Studio Navigation */}
        <nav
          aria-label="Studio Navigation"
          className="flex items-center gap-1 sm:gap-6 text-xs font-mono"
        >
          <a
            href="#competencies"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
          >
            Competencies
          </a>
          <a
            href="#case-studies"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] hidden md:inline"
          >
            Case Studies
          </a>
          <a
            href="#lab"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] hidden sm:inline"
          >
            Engineering Lab
          </a>
          <a
            href="#inquiry"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
          >
            Inquiry
          </a>

          {/* Upwork CTA */}
          <Button
            variant="outline"
            size="sm"
            href={studioProfile.links.upwork}
            isExternal
            className="ml-2"
          >
            Upwork Profile
          </Button>
        </nav>
      </Container>
    </header>
  );
}

