import test from "node:test";
import assert from "node:assert";
import { caseStudiesData } from "../src/data/caseStudies.ts";
import { featuredProjects } from "../src/data/projects.ts";
import { skillsCatalog } from "../src/data/skillsExplorer.ts";
import { studioProfile } from "../src/data/profile.ts";
import { SUGGESTED_QUESTIONS, KNOWLEDGE_TOPICS } from "../src/data/assistantKnowledge.ts";
import { freelanceServices, engagementPolicies } from "../src/data/services.ts";
import {
  workExperienceData,
  leadershipRolesData,
  certificationsData,
  priorEducationData,
} from "../src/data/experience.ts";

test("Cross-Referenced Project Identifiers Integrity", () => {
  const caseStudyIds = new Set(caseStudiesData.map((p) => p.id));
  const featuredProjectIds = new Set(featuredProjects.map((p) => p.id));

  // Verify that all featured projects match case studies
  for (const id of featuredProjectIds) {
    assert.ok(
      caseStudyIds.has(id),
      `Featured project ID "${id}" must exist in caseStudiesData`
    );
  }

  // Verify all skills associatedProjectIds reference existing projects
  for (const skill of skillsCatalog) {
    for (const projId of skill.associatedProjectIds) {
      assert.ok(
        caseStudyIds.has(projId),
        `Skill "${skill.id}" references non-existent project "${projId}"`
      );
    }
  }
});

test("Contact Form Validation Logic", () => {
  const validateForm = (name: string, email: string, message: string) => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your name.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!emailRegex.test(email.trim())) {
      errs.email = "Please provide a valid email format.";
    }

    if (!message.trim()) {
      errs.message = "Please write a brief message.";
    } else if (message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }

    return {
      isValid: Object.keys(errs).length === 0,
      errors: errs,
    };
  };

  // Test empty inputs
  const emptyRes = validateForm("", "", "");
  assert.strictEqual(emptyRes.isValid, false);
  assert.ok(emptyRes.errors.name);
  assert.ok(emptyRes.errors.email);
  assert.ok(emptyRes.errors.message);

  // Test invalid email
  const badEmailRes = validateForm("Jane Doe", "invalid-email-address", "We need a backend developer.");
  assert.strictEqual(badEmailRes.isValid, false);
  assert.ok(badEmailRes.errors.email);
  assert.strictEqual(badEmailRes.errors.name, undefined);

  // Test message too short
  const shortMsgRes = validateForm("Jane Doe", "jane@company.com", "Hi");
  assert.strictEqual(shortMsgRes.isValid, false);
  assert.ok(shortMsgRes.errors.message);

  // Test valid submission
  const validRes = validateForm(
    "Jane Doe",
    "jane@company.com",
    "We have a high-throughput backend project and would like to collaborate."
  );
  assert.strictEqual(validRes.isValid, true);
  assert.strictEqual(Object.keys(validRes.errors).length, 0);
});

test("Truthfulness & Academic Verification Data", () => {
  // Confirm DTU graduation year is 2027 (2023–2027)
  assert.strictEqual(studioProfile.graduatingYear, "2027");
  assert.ok(studioProfile.institution.includes("Delhi Technological University"));
  assert.ok(studioProfile.degree.includes("Electronics and Communication"));

  // Confirm email and external profiles are verified
  assert.strictEqual(studioProfile.links.email, "aryaveeragarwal10@gmail.com");
  assert.ok(studioProfile.links.github.includes("Aryaveer-ag"));
  assert.ok(studioProfile.links.linkedin.includes("aryaveer-agarwal-dtu"));
  assert.ok(studioProfile.links.upwork.startsWith("http"));
});

test("Assistant Knowledge Base Coverage", () => {
  // Verify suggested questions count
  assert.strictEqual(SUGGESTED_QUESTIONS.length, 5);

  // Verify knowledge topics have non-empty answers and keywords
  for (const topic of KNOWLEDGE_TOPICS) {
    assert.ok(topic.keywords.length > 0, `Topic ${topic.id} must have keywords`);
    assert.ok(topic.answer.length > 30, `Topic ${topic.id} must have substantial answer`);
  }
});

test("Freelance Services & Engagement Models Integrity", () => {
  assert.strictEqual(freelanceServices.length, 3, "Must have 3 core freelance services");
  assert.strictEqual(engagementPolicies.length, 3, "Must have 3 core client policies");

  for (const s of freelanceServices) {
    assert.ok(s.id.length > 0, "Service must have an id");
    assert.ok(s.title.length > 0, "Service must have a title");
    assert.ok(s.deliverables.length >= 3, `Service ${s.id} must have at least 3 deliverables`);
    assert.ok(s.idealFor.length > 20, `Service ${s.id} must define who it is ideal for`);
    assert.ok(s.contractModel.includes("Upwork"), `Service ${s.id} must reference Upwork Escrow`);
  }

  for (const p of engagementPolicies) {
    assert.ok(p.title.length > 0, "Policy must have a title");
    assert.ok(p.description.length > 20, "Policy must have a detailed description");
  }
});

test("Experience, Leadership & Certifications Integrity", () => {
  // 1. Work Experience
  assert.ok(workExperienceData.length >= 1, "Must have at least 1 verified work experience");
  const infosys = workExperienceData.find((w) => w.company.includes("Infosys"));
  assert.ok(infosys, "Infosys Springboard experience must exist");
  assert.ok(infosys.bullets.some((b) => b.includes("MIMIC-IV")), "Must reference MIMIC-IV database");
  assert.ok(infosys.bullets.some((b) => b.includes("500,000+")), "Must reference 500k+ patient records");
  assert.ok(infosys.technologies.includes("Python"), "Must list Python");

  // 2. Leadership Roles
  assert.strictEqual(leadershipRolesData.length, 2, "Must have 2 leadership roles");
  const culturalCouncil = leadershipRolesData.find((l) => l.organization.includes("Cultural Council"));
  assert.ok(culturalCouncil, "Cultural Council DTU role must exist");
  assert.ok(culturalCouncil.bullets.some((b) => b.includes("Engifest")), "Must reference Engifest");
  assert.ok(culturalCouncil.bullets.some((b) => b.includes("OnePlus")), "Must reference OnePlus/Intel sponsors");

  // 3. Certifications
  assert.strictEqual(certificationsData.length, 7, "Must have exactly 7 verified certifications");
  const certIssuers = new Set(certificationsData.map((c) => c.issuer));
  assert.ok(certIssuers.has("Google Cloud"), "Must have Google Cloud certification");
  assert.ok(certIssuers.has("Microsoft"), "Must have Microsoft certification");
  assert.ok(certIssuers.has("Amazon Web Services"), "Must have AWS certification");
  assert.ok(certIssuers.has("freeCodeCamp"), "Must have freeCodeCamp certifications");

  // 4. Prior Education (NO CGPA check)
  assert.strictEqual(priorEducationData.length, 3, "Must list 3 educational milestones");
  for (const edu of priorEducationData) {
    assert.ok(edu.institution.length > 0, "Must have institution name");
    assert.ok(edu.year.length > 0, "Must have graduation/completion year");
    // Ensure no accidental CGPA property is defined
    assert.strictEqual((edu as Record<string, unknown>).cgpa, undefined);
    assert.strictEqual((edu as Record<string, unknown>).percentage, undefined);
  }
});
