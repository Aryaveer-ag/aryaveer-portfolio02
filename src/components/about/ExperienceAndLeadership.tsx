import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from "@/components/common";
import {
  workExperienceData,
  leadershipRolesData,
  certificationsData,
  priorEducationData,
} from "@/data/experience";

export function ExperienceAndLeadership() {
  return (
    <div className="space-y-12">
      {/* 1. Industry Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[var(--accent-emerald)] tracking-wider">
              INDUSTRY // ML INTERNSHIP
            </span>
            <Badge variant="emerald" size="sm" dot>
              Verified Experience
            </Badge>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            Nov 2025 – Jan 2026
          </span>
        </div>

        {workExperienceData.map((exp) => (
          <Card
            key={exp.id}
            variant="default"
            className="border-[var(--border-strong)] bg-[var(--bg-surface)] hover:border-emerald-500/40 transition-colors duration-200"
          >
            <CardHeader className="pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-[var(--text-primary)]">
                      {exp.role}
                    </CardTitle>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="text-base font-semibold text-[var(--accent-emerald)]">
                      {exp.company}
                    </span>
                  </div>
                  <CardDescription className="text-xs font-mono text-[var(--accent-cyan)] pt-1">
                    {exp.projectTitle}
                  </CardDescription>
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                  {exp.period} • {exp.location}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {exp.summary}
              </p>

              {/* Key Quantitative Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                {exp.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)]"
                  >
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                      {m.label}
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[var(--text-primary)] pt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--accent-emerald)] font-mono select-none pt-0.5">
                      ›
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Used */}
              <div className="pt-2 flex flex-wrap gap-1.5 border-t border-[var(--border-subtle)]">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2 py-0.5 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Campus Leadership & Execution */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
              LEADERSHIP // DTU COUNCIL &amp; SOCIETIES
            </span>
            <Badge variant="cyan" size="sm" mono>
              Executive Roles
            </Badge>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            Jan 2024 – Present
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leadershipRolesData.map((lead) => (
            <Card
              key={lead.id}
              variant="default"
              className="border-[var(--border-default)] bg-[var(--bg-surface)] flex flex-col justify-between"
            >
              <div>
                <CardHeader className="pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs text-[var(--accent-indigo)] font-semibold">
                      {lead.organization}
                    </span>
                    <Badge variant="neutral" size="sm">
                      {lead.period}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-[var(--text-primary)]">
                    {lead.role}
                  </CardTitle>
                  <CardDescription className="text-xs text-[var(--text-muted)]">
                    {lead.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 pb-1">
                    {lead.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-2 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)]"
                      >
                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                          {m.label}
                        </div>
                        <div className="text-xs font-mono font-bold text-[var(--text-primary)]">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {lead.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[var(--accent-cyan)] font-mono select-none">
                          ›
                        </span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <div className="p-4 pt-3 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)] flex items-center justify-between">
                <span>Engagement Model</span>
                <span className="text-[var(--accent-emerald)] font-medium">Strategic Operations</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Verified Certifications & Credentials Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[var(--accent-indigo)] tracking-wider">
              CREDENTIALS // CLOUD, AI &amp; SYSTEM CERTIFICATIONS
            </span>
            <Badge variant="indigo" size="sm" mono>
              7 Verified Credentials
            </Badge>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">
            Accredited Providers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant={cert.badgeVariant} size="sm">
                    {cert.issuer}
                  </Badge>
                  <span className="text-[10px] font-mono text-[var(--accent-emerald)]">
                    ✓ Verified
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  {cert.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {cert.skillsCovered}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                <span>Domain</span>
                <span className="text-[var(--text-primary)]">{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Complete Education Trajectory (DTU & Schools - No CGPA) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
              ACADEMIC TRAJECTORY // FORMAL EDUCATION
            </span>
            <Badge variant="neutral" size="sm" mono>
              Institution Milestones
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {priorEducationData.map((edu) => (
            <div
              key={edu.institution}
              className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase">
                  {edu.board}
                </span>
                <Badge variant="neutral" size="sm" mono>
                  {edu.year}
                </Badge>
              </div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                {edu.institution}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                {edu.level}
              </div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1">
                📍 {edu.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

