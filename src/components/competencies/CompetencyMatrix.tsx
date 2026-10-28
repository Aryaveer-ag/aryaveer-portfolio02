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
} from "@/components/common";
import { competencyDomains } from "@/data/skills";

export function CompetencyMatrix() {
  return (
    <PageSection id="competencies" spacing="spacious" divided>
      <Container size="lg">
        <SectionHeading
          eyebrow="01 // DOMAIN ARCHITECTURE"
          title="Systems & Engineering Competency Matrix"
          description="Technical capabilities and conceptual computer science foundations, structured across backend systems, machine learning pipelines, algorithmic foundations, and modern developer toolchains."
          action={
            <Badge variant="cyan" mono size="sm">
              4 Technical Domains
            </Badge>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencyDomains.map((domain) => (
            <Card
              key={domain.id}
              variant="default"
              className="flex flex-col justify-between border-[var(--border-default)] hover:border-[var(--border-strong)] transition-colors duration-200"
            >
              <div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
                      DOMAIN {domain.index}
                    </span>
                    <Badge variant={domain.accent} size="sm">
                      Active Focus
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {domain.title}
                  </CardTitle>
                  <CardDescription className="text-sm pt-1">
                    {domain.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6 pt-2">
                  {/* Technologies & Stack */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      Primary Technologies &amp; Tools
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          className="font-mono text-xs px-2.5 py-1 rounded-[var(--radius-sm)] bg-[var(--bg-surface-2)] border border-[var(--border-default)] text-[var(--text-primary)]"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Concepts & Principles */}
                  <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-muted)]">
                      Applied Concepts &amp; Principles
                    </div>
                    <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                      {domain.keyConcepts.map((concept) => (
                        <li key={concept} className="flex items-start gap-2">
                          <span className="text-[var(--accent-cyan)] font-mono select-none">
                            ›
                          </span>
                          <span>{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Verified Competency</span>
                <span className="text-emerald-400">DTU B.Tech</span>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </PageSection>
  );
}

