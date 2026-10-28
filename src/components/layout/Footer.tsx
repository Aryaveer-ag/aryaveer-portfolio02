import React from "react";
import { Container, TextLink } from "@/components/common";
import { studioProfile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)] py-12">
      <Container size="lg" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-sm font-semibold text-[var(--text-primary)]">
              {studioProfile.name}
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              {studioProfile.degree} • {studioProfile.institution}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <TextLink href={studioProfile.links.github} variant="arrow" isExternal>
              GitHub
            </TextLink>
            <TextLink href={studioProfile.links.linkedin} variant="arrow" isExternal>
              LinkedIn
            </TextLink>
            <TextLink href={studioProfile.links.upwork} variant="arrow" isExternal>
              Upwork
            </TextLink>
            <TextLink href={`mailto:${studioProfile.links.email}`} variant="arrow">
              Email
            </TextLink>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-3">
          <div>
            &copy; 2026 {studioProfile.name}. All verified personal rights reserved.
          </div>
          <div>
            Engineered with Next.js App Router, TypeScript &amp; Tailwind CSS
          </div>
        </div>
      </Container>
    </footer>
  );
}

