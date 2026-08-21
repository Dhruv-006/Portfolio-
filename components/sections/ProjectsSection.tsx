"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import { ProjectScene } from "@/components/projects/ProjectScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current) return;

      if (prefersReducedMotion) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 });
        return;
      }

      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center border-t border-[var(--color-gold)]/10 paper-texture"
    >
      <div className="max-w-7xl w-full flex flex-col space-y-10 sm:space-y-16">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col space-y-2">
          <span className="font-display text-[var(--color-saffron)] text-xl sm:text-2xl tracking-wide">
            सृजन <span className="font-sans text-lg sm:text-xl opacity-70 tracking-normal">(Projects)</span>
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
            04 / 08 — Selected Works
          </span>
        </div>

        {/* Projects List */}
        <div className="flex flex-col">
          {projects
            .sort((a, b) => a.order - b.order)
            .map((project, index) => (
              <ProjectScene 
                key={project.id} 
                project={project} 
                index={index} 
                total={projects.length} 
              />
            ))}
        </div>
      </div>
    </section>
  );
}
