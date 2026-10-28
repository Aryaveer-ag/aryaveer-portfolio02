import React from "react";
import {
  Container,
  PageSection,
  SectionHeading,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Reveal,
} from "@/components/common";
import { studioProfile } from "@/data/profile";

export function TechnicalIdentity() {
  return (
    <PageSection id="focus-areas" spacing="spacious" divided>
      <Container size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="02 // TECHNICAL IDENTITY"
            title="Areas of Specialization &amp; Engineering Focus"
            description="B.Tech student in Electronics and Communications Engineering at Delhi Technological University combining rigorous computer science with production-oriented software development."
            action={
              <Badge variant="indigo" mono size="sm">
                4 Core Focus Areas
              </Badge>
            }
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studioProfile.focusAreas.map((area, idx) => (
            <Reveal key={area.id} delayMs={idx % 2 === 0 ? 0 : 80}>
              <Card
                variant="interactive"
                spotlight
                tilt
                className="flex flex-col justify-between border-[var(--border-default)] h-full"
              >
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
                        {area.eyebrow}
                      </span>
                      <Badge variant="neutral" size="sm">
                        Core Domain
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="text-sm pt-1">
                      {area.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      Key Practical Capabilities
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                      {area.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2">
                          <span className="text-[var(--accent-cyan)] font-mono select-none">
                            ›
                          </span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                  <span>Domain Focus</span>
                  <span className="text-[var(--accent-emerald)] font-medium">Active</span>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}

