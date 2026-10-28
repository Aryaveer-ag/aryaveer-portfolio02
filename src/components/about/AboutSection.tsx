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
import { SkillsExplorer } from "@/components/skills/SkillsExplorer";
import { ResumeProfilesCard } from "@/components/about/ResumeProfilesCard";
import { ExperienceAndLeadership } from "@/components/about/ExperienceAndLeadership";

export function AboutSection() {
  const interests = [
    {
      id: "software-engineering",
      number: "01",
      title: "Software Engineering",
      accent: "indigo",
      summary:
        "Building reliable, maintainable software by applying strong type systems, clean modular architecture, automated test suites, and strict separation of concerns.",
    },
    {
      id: "backend-systems",
      number: "02",
      title: "Backend Systems",
      accent: "emerald",
      summary:
        "Designing scalable server architectures, resilient APIs, atomic concurrency control under contention, and efficient relational and in-memory data persistence.",
    },
    {
      id: "ai-machine-learning",
      number: "03",
      title: "AI & Machine Learning",
      accent: "cyan",
      summary:
        "Developing grounded retrieval-augmented generation (RAG) pipelines, computer vision surface inspection models, and rigorous metric-based evaluation frameworks.",
    },
    {
      id: "problem-solving",
      number: "04",
      title: "Algorithmic Problem-Solving",
      accent: "amber",
      summary:
        "Applying asymptotic computational complexity analysis (Big-O), advanced data structures, and mathematical intuition to resolve latency and memory bottlenecks.",
    },
    {
      id: "open-source",
      number: "05",
      title: "Open-Source Development",
      accent: "indigo",
      summary:
        "Advocating for transparent, reproducible code, disciplined semantic version control hygiene, and building community-accessible technical tools.",
    },
  ];

  const academicCoursework = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems & Concurrency",
    "Computer Networks & Protocols",
    "Object-Oriented Programming (OOP)",
    "Machine Learning & Neural Networks",
    "Systems Programming & Linux",
    "Software Engineering Methodologies",
  ];

  return (
    <PageSection id="about" spacing="spacious" divided>
      <Container size="lg" className="space-y-16">
        {/* Section Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="03 // BACKGROUND & TECHNICAL IDENTITY"
            title="Engineering Foundations &amp; Academic Background"
            description="A grounded profile of Aryaveer Agarwal: undergraduate engineering student at Delhi Technological University combining algorithmic principles with production-grade system design."
            action={
              <Badge variant="emerald" mono size="sm">
                DTU Class of 2027
              </Badge>
            }
          />
        </Reveal>

        {/* Narrative & Academic Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)] leading-relaxed space-y-4">
              <p>
                I am an undergraduate engineering student at{" "}
                <strong className="text-[var(--text-primary)] font-semibold">
                  Delhi Technological University (DTU)
                </strong>
                , pursuing my Bachelor of Technology degree in Electronics and Communications Engineering (2023–2027). My technical path is defined by a focus on engineering truthfulness: understanding how systems behave when pushed to concurrency limits, how distributed state remains consistent, and how machine learning components can be integrated without hallucination or fragility.
              </p>
              <p>
                Rather than treating software as a collection of disconnected frameworks, I concentrate on fundamental mechanisms: memory layouts, event-driven I/O loops, atomic operations in Redis, schema constraints in relational databases, and verifiable convergence in deep learning models.
              </p>
            </div>

            {/* Core Interests List */}
            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-semibold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-indigo)]" />
                Core Engineering Interests
              </h3>
              <div className="space-y-3">
                {interests.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-[var(--radius-md)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="font-mono text-xs font-bold text-[var(--accent-cyan)]">
                        {item.number} {"//"}
                      </span>
                      <h4 className="font-semibold text-sm text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-7">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic Foundation Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card
              variant="default"
              className="border-[var(--border-strong)] bg-[var(--bg-surface)]"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
                    ACADEMIA // INSTITUTION
                  </span>
                  <Badge variant="cyan" size="sm">
                    Accredited
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold">
                  Delhi Technological University
                </CardTitle>
                <CardDescription className="text-xs text-[var(--text-muted)] font-mono">
                  Formerly Delhi College of Engineering (DCE) • Delhi, India
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0 text-xs">
                <div className="space-y-2 py-3 border-y border-[var(--border-subtle)] font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Program:</span>
                    <span className="text-[var(--text-primary)] font-medium">
                      Bachelor of Technology (B.Tech, ECE)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Graduation:</span>
                    <span className="text-[var(--accent-emerald)] font-medium">
                      Class of 2027 (2023–2027)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Major:</span>
                    <span className="text-[var(--text-primary)] font-medium">
                      Electronics and Communications Engineering
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
                    Core Technical Coursework
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {academicCoursework.map((course) => (
                      <div
                        key={course}
                        className="px-2 py-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-base)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] flex items-center gap-1.5"
                      >
                        <span className="text-[var(--accent-cyan)] text-[10px]">›</span>
                        <span className="truncate">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent-emerald)] font-semibold">
                Integrity &amp; Professional Standards
              </div>
              <p className="leading-relaxed">
                All claims across this portfolio are backed by working code, mathematical simulations, or verified coursework. No invented awards, fake client rosters, or inflated metrics are used.
              </p>
            </div>
          </div>
        </div>

        {/* Experience, Leadership & Certifications */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <ExperienceAndLeadership />
        </div>

        {/* Resume and External Profile Links */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
              <span>Resume &amp; Professional Channels</span>
              <Badge variant="neutral" size="sm" mono>
                Direct Access
              </Badge>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Official credentials, verifiable code repositories, and direct recruitment communication channels.
            </p>
          </div>

          <ResumeProfilesCard />
        </div>

        {/* Skills Explorer Sub-Section */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-[var(--accent-cyan)] tracking-wider">
                COMPETENCY // EXPLORER
              </span>
              <Badge variant="cyan" mono size="sm">
                5 Domains
              </Badge>
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Interactive Technical Skills Matrix
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl">
              Select any skill below to inspect its concrete implementation across featured portfolio projects and academic coursework at Delhi Technological University.
            </p>
          </div>

          <SkillsExplorer />
        </div>
      </Container>
    </PageSection>
  );
}
