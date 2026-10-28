import React from "react";
import {
  Container,
  PageSection,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Reveal,
} from "@/components/common";
import { studioProfile } from "@/data/profile";

export function HeroSection() {
  return (
    <PageSection id="top" spacing="normal" className="border-b border-[var(--border-subtle)] relative">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Copy & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" mono size="sm">
                {studioProfile.institution}
              </Badge>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                • {studioProfile.degree} ({studioProfile.graduatingYear})
              </span>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-sm uppercase tracking-wider text-[var(--accent-cyan)] font-medium">
                {studioProfile.name}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                {studioProfile.headline}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed max-w-2xl">
              {studioProfile.supportingText}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Button
                variant="primary"
                size="md"
                magnetic
                href={studioProfile.ctas.primary.href}
              >
                {studioProfile.ctas.primary.label}
              </Button>
              <Button
                variant="secondary"
                size="md"
                magnetic
                href={studioProfile.ctas.secondary.href}
              >
                {studioProfile.ctas.secondary.label}
              </Button>
              <Button
                variant="ghost"
                size="md"
                href={studioProfile.links.github}
                isExternal
              >
                GitHub Profile
              </Button>
            </div>
          </div>

          {/* Right Column: Systems Telemetry Card */}
          <div className="lg:col-span-5">
            <Reveal delayMs={100}>
              <Card variant="default" spotlight tilt className="border-[var(--border-default)] bg-[var(--bg-surface-1)]">
                <CardHeader className="border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 duration-1000" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-emerald)] font-semibold">
                        ENGINEERING_SPEC
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      DTU // VERIFIED
                    </span>
                  </div>
                  <CardTitle as="h2" className="text-sm font-mono text-[var(--text-primary)] pt-1">
                    System &amp; Workstation Parameters
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-2">
                  <dl className="space-y-3 divide-y divide-[var(--border-subtle)] text-xs font-mono">
                    {studioProfile.specs.map((item, idx) => (
                      <div
                        key={item.label}
                        className={`flex justify-between items-start gap-4 ${
                          idx > 0 ? "pt-3" : ""
                        }`}
                      >
                        <dt className="text-[var(--text-muted)] shrink-0">
                          {item.label}
                        </dt>
                        <dd className="text-[var(--text-primary)] text-right font-medium">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>

                <CardFooter className="bg-[var(--bg-surface-2)]/40 -mx-5 md:-mx-6 -mb-5 md:-mb-6 px-5 md:px-6 py-3 rounded-b-[var(--radius-lg)] border-t border-[var(--border-subtle)]">
                  <span className="font-mono text-[11px] text-[var(--text-secondary)]">
                    Availability: Open for Contract
                  </span>
                  <Badge variant="emerald" dot pulse size="sm">
                    Available
                  </Badge>
                </CardFooter>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </PageSection>
  );
}

