import { Navigation } from "@/components/layout/Navigation";
import { OpeningScene } from "@/components/hero/OpeningScene";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { FutureSection } from "@/components/sections/FutureSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div id="top" className="flex flex-col min-h-screen bg-[var(--color-ivory)]">
      <Navigation />
      
      <main className="flex flex-col flex-grow">
        <OpeningScene />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <PhilosophySection />
        <FutureSection />
        <ContactSection />
      </main>
    </div>
  );
}


