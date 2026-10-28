"use client";

import React, { useState, useMemo } from "react";
import { Container, PageSection, SectionHeading, Badge, Reveal } from "@/components/common";
import { caseStudiesData } from "@/data/caseStudies";
import { ProjectCaseStudy } from "@/types/projects";
import { ProjectFilter, ProjectCategoryFilter } from "./ProjectFilter";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyDrawer } from "./CaseStudyDrawer";

export function CaseStudiesSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategoryFilter>("All");
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter categories calculation
  const categories = useMemo(() => {
    const counts: Record<string, number> = {
      All: caseStudiesData.length,
      "Backend & Systems": 0,
      "AI & Machine Learning": 0,
      "Computer Vision & Systems": 0,
    };

    caseStudiesData.forEach((project) => {
      if (counts[project.category] !== undefined) {
        counts[project.category]++;
      }
    });

    return [
      { label: "All" as ProjectCategoryFilter, count: counts.All },
      { label: "Backend & Systems" as ProjectCategoryFilter, count: counts["Backend & Systems"] },
      { label: "AI & Machine Learning" as ProjectCategoryFilter, count: counts["AI & Machine Learning"] },
      { label: "Computer Vision & Systems" as ProjectCategoryFilter, count: counts["Computer Vision & Systems"] },
    ];
  }, []);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return caseStudiesData;
    return caseStudiesData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenDrawer = (project: ProjectCaseStudy) => {
    setActiveProject(project);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <PageSection id="projects" spacing="spacious" divided>
      <Container size="lg">
        <Reveal>
          <SectionHeading
            eyebrow="01 // ARCHITECTURE & CASE STUDIES"
            title="Interactive Engineering Case Studies"
            description="In-depth architectural breakdowns of distributed systems, machine learning pipelines, and computer vision models. Inspect sequence topologies, tradeoff analyses, failure modes, and implementation code."
            action={
              <Badge variant="cyan" mono size="sm">
                {caseStudiesData.length} Deep-Dive Systems
              </Badge>
            }
          />
        </Reveal>

        {/* Category Filter Pills */}
        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delayMs={idx % 2 === 0 ? 0 : 80}>
              <CaseStudyCard
                project={project}
                onOpenDrawer={handleOpenDrawer}
              />
            </Reveal>
          ))}
        </div>

        {/* Interactive Architecture Slide-Over Drawer */}
        <CaseStudyDrawer
          project={activeProject}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      </Container>
    </PageSection>
  );
}

