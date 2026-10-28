import React from "react";
import Link from "next/link";
import { Container, Badge } from "@/components/common";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[var(--accent-indigo)] selection:text-white">
      {/* Minimal Top Brand Bar */}
      <header className="border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/80 backdrop-blur-md">
        <Container size="lg" className="h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm font-bold tracking-tight text-[var(--text-primary)] hover:text-white transition-colors"
          >
            Aryaveer.dev
          </Link>
          <Badge variant="cyan" mono size="sm">
            Status: 404
          </Badge>
        </Container>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <Container size="sm" className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface-2)] border border-[var(--border-default)] font-mono text-xs text-[var(--accent-cyan)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>ROUTE RESOLUTION ERROR // 0x404</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] font-mono">
            Resource Not Found
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
            The requested URI path does not exist in Aryaveer.dev&apos;s portfolio routing tree. The resource may have been relocated or entered with an invalid path.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center font-mono text-xs font-medium h-10 px-5 rounded-[var(--radius-sm)] bg-slate-100 text-slate-900 hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
            >
              Return to Homepage
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center font-mono text-xs font-medium h-10 px-5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-default)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
            >
              Explore Projects
            </Link>
            <Link
              href="/#lab"
              className="inline-flex items-center justify-center font-mono text-xs font-medium h-10 px-5 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-3)] border border-[var(--border-default)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
            >
              Engineering Lab
            </Link>
          </div>
        </Container>
      </main>

      {/* Footer Note */}
      <footer className="border-t border-[var(--border-subtle)] py-6 text-center text-xs font-mono text-[var(--text-muted)]">
        Aryaveer Agarwal • Delhi Technological University (DTU, 2023–2027)
      </footer>
    </div>
  );
}

