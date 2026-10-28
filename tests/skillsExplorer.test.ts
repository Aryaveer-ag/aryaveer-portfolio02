import test from "node:test";
import assert from "node:assert";
import {
  skillCategories,
  skillsCatalog,
  getAssociatedProjects,
} from "../src/data/skillsExplorer.ts";
import { featuredProjects } from "../src/data/projects.ts";

test("Skill Categories Completeness", () => {
  const expectedCategories = [
    "Programming",
    "Backend and APIs",
    "Databases and systems",
    "AI and machine learning",
    "Development tools",
  ];

  assert.deepStrictEqual(
    skillCategories,
    expectedCategories,
    "Categories must match expected specification"
  );

  // Every category should have at least 2 skills
  for (const category of expectedCategories) {
    const matching = skillsCatalog.filter((s) => s.category === category);
    assert.ok(
      matching.length >= 2,
      `Category "${category}" should have at least 2 skills (found ${matching.length})`
    );
  }
});

test("Skills Catalog Integrity and Unique IDs", () => {
  const seenIds = new Set<string>();

  for (const skill of skillsCatalog) {
    assert.ok(skill.id, "Skill must have an id");
    assert.ok(!seenIds.has(skill.id), `Duplicate skill ID found: ${skill.id}`);
    seenIds.add(skill.id);

    assert.ok(skill.name.length > 0, `Skill ${skill.id} must have a name`);
    assert.ok(
      skillCategories.includes(skill.category),
      `Skill ${skill.id} has invalid category: ${skill.category}`
    );
    assert.ok(
      skill.description.length > 15,
      `Skill ${skill.id} must have a descriptive summary`
    );

    // If courseworkContext is provided, it should be substantial
    if (skill.courseworkContext) {
      assert.ok(
        skill.courseworkContext.length > 10,
        `Coursework context for ${skill.id} should be descriptive`
      );
    }
  }
});

test("Associated Project Integrity", () => {
  const validProjectIds = new Set(featuredProjects.map((p) => p.id));

  for (const skill of skillsCatalog) {
    for (const projId of skill.associatedProjectIds) {
      assert.ok(
        validProjectIds.has(projId),
        `Skill "${skill.id}" references non-existent project "${projId}"`
      );
    }

    if (skill.projectApplications) {
      for (const [projId, note] of Object.entries(skill.projectApplications)) {
        assert.ok(
          validProjectIds.has(projId),
          `Skill "${skill.id}" has application note for non-existent project "${projId}"`
        );
        assert.ok(
          note.length > 10,
          `Application note for "${skill.id}" on "${projId}" should be descriptive`
        );
      }
    }

    // Verify getAssociatedProjects returns valid metadata
    const summaries = getAssociatedProjects(skill);
    assert.strictEqual(
      summaries.length,
      skill.associatedProjectIds.length,
      `Summary count must match associated project IDs count for ${skill.id}`
    );

    for (const summary of summaries) {
      assert.ok(summary.title.length > 0, "Summary must have a title");
      assert.ok(summary.category.length > 0, "Summary must have a category");
      assert.ok(
        summary.applicationNote.length > 0,
        "Summary must have an application note"
      );
    }
  }
});

test("Filtering Skills by Category", () => {
  for (const category of skillCategories) {
    const filtered = skillsCatalog.filter((s) => s.category === category);
    assert.ok(
      filtered.length > 0,
      `Filtering by category "${category}" must return skills`
    );
    for (const item of filtered) {
      assert.strictEqual(
        item.category,
        category,
        `Item "${item.id}" must match category "${category}"`
      );
    }
  }
});

