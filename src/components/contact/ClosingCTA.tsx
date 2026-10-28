"use client";

import React, { useState, useRef } from "react";
import {
  Container,
  PageSection,
  SectionHeading,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Reveal,
} from "@/components/common";
import { studioProfile } from "@/data/profile";
import { freelanceServices, engagementPolicies } from "@/data/services";

interface ContactFormData {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ClosingCTA() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    topic: "Backend & Systems Architecture",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const handleSelectService = (serviceTitle: string) => {
    setFormData((prev) => ({
      ...prev,
      topic: serviceTitle,
    }));
    // Smoothly scroll down to the inquiry form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!formData.name.trim()) {
      errs.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = "Please provide a valid email format (e.g., name@domain.com).";
    }

    if (!formData.message.trim()) {
      errs.message = "Please write a brief message or project description.";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch processing
    await new Promise((resolve) => setTimeout(resolve, 450));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      topic: "Backend & Systems Architecture",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleCopyDirectEmail = async () => {
    try {
      await navigator.clipboard.writeText(studioProfile.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  // Generate mailto URI prefilled with user's input
  const mailtoUri = `mailto:${studioProfile.links.email}?subject=${encodeURIComponent(
    `[Inquiry: ${formData.topic}] from ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\nEngagement Model: ${formData.topic}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <PageSection id="contact" spacing="spacious" divided className="relative">
      <Container size="lg" className="space-y-16">
        {/* Section Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="04 // FREELANCE SERVICES & CONTRACTS"
            title="Engineering Services &amp; Client Inquiries"
            description="I take on freelance contracts and consulting engagements with a focus on robust backend systems, low-latency API architecture, and applied machine learning. All contracts can be structured through Upwork Escrow for mutual security."
            action={
              <Badge variant="emerald" dot pulse size="sm">
                Accepting Contracts (Upwork Verified)
              </Badge>
            }
          />
        </Reveal>

        {/* 1. Structured Freelance Engagement Models Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-emerald)]" />
              Structured Client Engagement Models
            </h3>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Select a model to pre-fill inquiry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freelanceServices.map((service) => {
              const isSelected = formData.topic === service.title;
              return (
                <Card
                  key={service.id}
                  variant="default"
                  className={`flex flex-col justify-between border transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--accent-indigo)] bg-[var(--bg-surface-2)] shadow-lg ring-1 ring-[var(--accent-indigo)]/50"
                      : "border-[var(--border-default)] bg-[var(--bg-surface-1)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                          {service.eyebrow}
                        </span>
                        <Badge variant={service.accent} size="sm" mono>
                          {service.badge}
                        </Badge>
                      </div>

                      <CardTitle className="text-lg font-bold text-[var(--text-primary)]">
                        {service.title}
                      </CardTitle>

                      <p className="text-xs text-[var(--accent-cyan)] font-mono pt-1">
                        {service.tagline}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] mb-2 tracking-wider">
                          Key Deliverables:
                        </div>
                        <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                          {service.deliverables.map((d, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[var(--accent-emerald)] text-[10px] font-bold select-none shrink-0 mt-0.5">
                                ✓
                              </span>
                              <span className="leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)] leading-relaxed">
                        <strong className="text-[var(--text-secondary)] font-medium">Ideal for:</strong>{" "}
                        {service.idealFor}
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0 mt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                      {service.contractModel}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectService(service.title)}
                      className={`px-3 py-1.5 rounded-[var(--radius-sm)] font-mono text-xs transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] ${
                        isSelected
                          ? "bg-[var(--accent-indigo)] text-white font-semibold"
                          : "bg-[var(--bg-surface-3)] text-[var(--text-primary)] hover:bg-[var(--accent-indigo)] hover:text-white"
                      }`}
                    >
                      {isSelected ? "Selected ✓" : "Select Model"}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 2. Client Trust & Upwork Escrow Policies */}
        <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)]/60 border border-[var(--border-subtle)]">
          <div className="text-xs font-mono uppercase text-[var(--accent-emerald)] font-semibold mb-3 tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Client Protection &amp; Engagement Guarantees</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementPolicies.map((policy, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="font-bold text-[var(--text-primary)] font-mono">
                  {policy.title}
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Main Inquiry Workstation & Channels */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <Card variant="default" className="border-[var(--border-default)] bg-[var(--bg-surface-1)]">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-xs text-[var(--accent-emerald)] uppercase tracking-wider font-semibold">
                      INQUIRY DISPATCH FORM
                    </span>
                  </div>
                  <Badge variant="indigo" size="sm" mono>
                    Direct Response
                  </Badge>
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  Start an Engineering Discussion
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {isSubmitted ? (
                  /* Success Feedback State */
                  <div className="p-6 rounded-[var(--radius-lg)] bg-[var(--bg-surface-2)] border border-emerald-500/40 space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-semibold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span>Inquiry Prepared Successfully!</span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      Thank you, <strong className="text-[var(--text-primary)]">{formData.name}</strong>. Your message regarding <strong className="text-[var(--text-primary)]">{formData.topic}</strong> has been validated and recorded.
                    </p>

                    <div className="p-3 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] space-y-1">
                      <div><strong className="text-[var(--text-primary)]">Sender:</strong> {formData.email}</div>
                      <div><strong className="text-[var(--text-primary)]">Engagement Model:</strong> {formData.topic}</div>
                      <div><strong className="text-[var(--text-primary)]">Target:</strong> {studioProfile.links.email}</div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoUri}
                        className="inline-flex items-center justify-center font-mono text-xs font-medium h-9 px-4 rounded-[var(--radius-sm)] bg-[var(--accent-indigo)] text-white hover:bg-[var(--accent-indigo)]/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]"
                      >
                        Open in Mail Client ↗
                      </a>
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] px-3 py-1.5 transition-colors"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Interactive Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider"
                        >
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, name: e.target.value }));
                            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                          }}
                          placeholder="e.g., Alex Reed"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-base)] border text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors ${
                            errors.name ? "border-red-500" : "border-[var(--border-default)] focus:border-[var(--accent-indigo)]"
                          }`}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-[11px] font-mono text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider"
                        >
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                          }}
                          placeholder="e.g., alex@company.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-base)] border text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors ${
                            errors.email ? "border-red-500" : "border-[var(--border-default)] focus:border-[var(--accent-indigo)]"
                          }`}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-[11px] font-mono text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Engagement Type / Model */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider"
                      >
                        Engagement Model
                      </label>
                      <select
                        id="contact-topic"
                        value={formData.topic}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, topic: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-base)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors"
                      >
                        <option value="Backend & Systems Architecture">
                          Backend &amp; Systems Architecture (REST APIs, Redis, PostgreSQL)
                        </option>
                        <option value="Applied AI & Machine Learning Pipelines">
                          Applied AI &amp; Machine Learning Pipelines (RAG, PyTorch Vision)
                        </option>
                        <option value="Systems Profiling & Code Modernization">
                          Systems Profiling &amp; Code Modernization (TypeScript refactoring, performance)
                        </option>
                        <option value="Engineering Opportunity">
                          Full-time / Internship Engineering Opportunity (Class of 2027)
                        </option>
                        <option value="General Technical Inquiry">
                          General Technical Inquiry
                        </option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase text-[var(--text-muted)] tracking-wider"
                      >
                        Project Scope or Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, message: e.target.value }));
                          if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                        }}
                        placeholder="Describe your technical requirements, estimated timeline, or engineering goals..."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full px-3.5 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-base)] border text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] transition-colors ${
                          errors.message ? "border-red-500" : "border-[var(--border-default)] focus:border-[var(--accent-indigo)]"
                        }`}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-[11px] font-mono text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)]">
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">
                        All inquiries answered within 24 hours.
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center font-mono text-xs font-medium h-10 px-5 rounded-[var(--radius-sm)] bg-[var(--accent-indigo)] text-white hover:bg-[var(--accent-indigo)]/90 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)] cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                            <span>Dispatching...</span>
                          </span>
                        ) : (
                          <span>Submit Inquiry →</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Contact & Verified Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <Card variant="subtle" className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="font-mono text-xs uppercase text-[var(--text-muted)] tracking-wider mb-3">
                  VERIFIED CHANNELS &amp; REPOSITORIES
                </div>
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-2.5 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <div className="text-[var(--text-muted)] text-[10px]">EMAIL ADDRESS</div>
                      <a
                        href={`mailto:${studioProfile.links.email}`}
                        className="text-[var(--text-primary)] hover:text-white transition-colors"
                      >
                        {studioProfile.links.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyDirectEmail}
                      className="text-[10px] font-mono px-2 py-1 rounded bg-[var(--bg-surface-2)] text-[var(--text-secondary)] hover:text-white"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <div className="text-[var(--text-muted)] text-[10px]">UPWORK PROFILE</div>
                      <span className="text-[var(--text-secondary)]">Escrow Contracts</span>
                    </div>
                    <a
                      href={studioProfile.links.upwork}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-emerald)] hover:underline text-[11px]"
                    >
                      Hire on Upwork ↗
                    </a>
                  </div>

                  <div className="p-2.5 rounded bg-[var(--bg-base)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <div className="text-[var(--text-muted)] text-[10px]">GITHUB REPOSITORY</div>
                      <span className="text-[var(--text-secondary)]">Public Code &amp; Labs</span>
                    </div>
                    <a
                      href={studioProfile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent-cyan)] hover:underline text-[11px]"
                    >
                      github.com ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Location</span>
                <span className="text-[var(--text-primary)]">{studioProfile.location}</span>
              </div>
            </Card>

            <Card variant="subtle" className="py-4 px-5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[var(--text-muted)]">STUDIO STATUS</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACCEPTING NEW CONTRACTS
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </PageSection>
  );
}
