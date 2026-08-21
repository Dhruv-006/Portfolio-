"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Project } from "@/types/content";
import { ProjectMedia } from "./ProjectMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectSceneProps {
  project: Project;
  index: number;
  total: number;
}

export function ProjectScene({ project, index, total }: ProjectSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current || !mediaRef.current) return;

      if (prefersReducedMotion) {
        gsap.set([textRef.current.children, mediaRef.current], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      tl.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      })
      .from(mediaRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.05,
        duration: 1.2,
        ease: "power3.inOut",
      }, "-=0.6");
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  const formattedNumber = String(index + 1).padStart(2, "0");
  const formattedTotal = String(total).padStart(2, "0");

  return (
    <div ref={containerRef} className="w-full flex flex-col py-12 sm:py-16 md:py-24 border-b border-[var(--color-ink)]/10 last:border-0 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
        
        {/* Text Content */}
        <div ref={textRef} className="lg:col-span-5 flex flex-col space-y-4 sm:space-y-6 lg:sticky lg:top-32">
          <div className="font-sans text-xs tracking-widest text-[var(--color-muted)]">
            {formattedNumber} / {formattedTotal}
          </div>
          
          {/* Title: w-fit instead of w-max to allow wrapping on narrow screens */}
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] leading-tight relative inline-block pb-2 group-hover:text-[var(--color-saffron)] transition-colors duration-500">
            {project.title}
            {/* Underline — always visible on touch via CSS, hover-triggered on desktop */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-saffron)] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out touch-underline" />
          </h3>
          
          <div className="space-y-3 sm:space-y-4 font-sans text-sm sm:text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            <p>{project.shortDescription}</p>
            <p>{project.description}</p>
          </div>
          
          <div className="flex flex-col space-y-2 pt-4 border-t border-[var(--color-ink)]/10">
            <span className="font-sans text-xs uppercase tracking-widest text-[var(--color-ink)] font-semibold">
              Role & Tech
            </span>
            <p className="font-sans text-sm text-[var(--color-muted)]">
              {project.role}
            </p>
            {project.technologies.length > 0 ? (
              <p className="font-sans text-sm text-[var(--color-muted)]">
                {project.technologies.join(", ")}
              </p>
            ) : (
              <p className="font-sans text-sm italic text-[var(--color-muted)]">
                [TECHNOLOGIES TO CONFIRM]
              </p>
            )}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm uppercase tracking-wider text-[var(--color-paper)] bg-[var(--color-ink)] px-5 sm:px-6 py-3 min-h-[44px] flex items-center hover:bg-[var(--color-saffron)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
                >
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm uppercase tracking-wider text-[var(--color-ink)] border border-[var(--color-ink)] px-5 sm:px-6 py-3 min-h-[44px] flex items-center hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        {/* Media Content */}
        <div ref={mediaRef} className="lg:col-span-7 mt-4 sm:mt-6 lg:mt-0">
          <ProjectMedia
            src={project.coverImage}
            alt={`${project.title} Preview`}
            className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9]"
            priority={index === 0}
          />
        </div>
      </div>
    </div>
  );
}
