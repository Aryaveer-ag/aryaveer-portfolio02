"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from "@/components/common";
import { studioProfile } from "@/data/profile";

export function ResumeProfilesCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(studioProfile.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Resume Card */}
      <Card
        variant="default"
        className="border-[var(--border-strong)] bg-[var(--bg-surface)] flex flex-col justify-between"
      >
        <div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-[var(--accent-indigo)] tracking-wider">
                DOCUMENTATION // CREDENTIALS
              </span>
              <Badge variant="indigo" size="sm" mono>
                PDF Format
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Engineering Resume
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xs text-[var(--text-secondary)] space-y-3 pt-0">
            <p className="leading-relaxed">
              Comprehensive resume detailing academic coursework at Delhi Technological University (DTU), software engineering projects, system architectures, and technical competencies.
            </p>
            <div className="p-2.5 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)] space-y-1">
              <div><strong className="text-[var(--text-primary)]">Program:</strong> B.Tech in Electronics &amp; Communication (2023–2027)</div>
              <div><strong className="text-[var(--text-primary)]">Institution:</strong> Delhi Technological University (DTU)</div>
              <div><strong className="text-[var(--text-primary)]">Availability:</strong> Software Engineering &amp; High-Impact Contract Work</div>
            </div>
          </CardContent>
        </div>

        <div className="p-6 pt-0 mt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${studioProfile.links.email}?subject=Resume%20Request%20-%20Aryaveer%20Agarwal`}
            className="inline-flex items-center justify-center font-mono text-xs font-medium h-9 px-4 rounded-[var(--radius-sm)] bg-[var(--accent-indigo)] text-white hover:bg-[var(--accent-indigo)]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
          >
            Request Resume via Email
          </a>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            Dispatched on direct inquiry
          </span>
        </div>
      </Card>

      {/* 2. Verified Profiles Card */}
      <Card
        variant="default"
        className="border-[var(--border-strong)] bg-[var(--bg-surface)] flex flex-col justify-between"
      >
        <div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-[var(--accent-emerald)] tracking-wider">
                CONNECTIVITY // PROFILES
              </span>
              <Badge variant="emerald" size="sm" dot>
                Verified Channels
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold">
              External Profiles &amp; Inquiries
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xs text-[var(--text-secondary)] space-y-3 pt-0">
            <p className="leading-relaxed">
              Official professional profiles, source code repositories, freelance contract platforms, and direct engineering contact channels.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">GitHub:</span>
                <a
                  href={studioProfile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1"
                >
                  <span>github.com/Aryaveer-ag</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>

              <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">LinkedIn:</span>
                <a
                  href={studioProfile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-indigo)] hover:underline inline-flex items-center gap-1"
                >
                  <span>in/aryaveer-agarwal-dtu</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>

              <div className="flex items-center justify-between p-2 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)]">Upwork:</span>
                <a
                  href={studioProfile.links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-emerald)] hover:underline inline-flex items-center gap-1"
                >
                  <span>upwork.com</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>
            </div>
          </CardContent>
        </div>

        <div className="p-6 pt-0 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          <div className="font-mono text-xs text-[var(--text-muted)] truncate mr-2">
            {studioProfile.links.email}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyEmail}
            className="text-xs font-mono shrink-0"
          >
            {copied ? "Copied!" : "Copy Email"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
