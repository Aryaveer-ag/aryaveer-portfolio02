import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/hero/HeroSection";
import { CaseStudiesSection } from "@/components/projects/CaseStudiesSection";
import { TechnicalIdentity } from "@/components/about/TechnicalIdentity";
import { LabSection } from "@/components/lab/LabSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ClosingCTA } from "@/components/contact/ClosingCTA";
import { PortfolioAssistantWidget } from "@/components/assistant";
import { InteractiveBackground } from "@/components/background";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[var(--accent-indigo)] selection:text-white relative">
      {/* Interactive Cyber Engineering Background */}
      <InteractiveBackground />

      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1 relative z-10">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Interactive Case Studies */}
        <CaseStudiesSection />

        {/* 4. Live Engineering Lab Simulations & Architecture Explorer */}
        <LabSection />

        {/* 5. Areas of Specialization */}
        <TechnicalIdentity />

        {/* 6. About, Academic Background, Profiles & Skills Explorer */}
        <AboutSection />

        {/* 7. Closing CTA / Contact */}
        <ClosingCTA />
      </main>

      {/* Global Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* 8. Floating AI Portfolio Assistant (Deterministic Facts Engine) */}
      <PortfolioAssistantWidget />
    </div>
  );
}
