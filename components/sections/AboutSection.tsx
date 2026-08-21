"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function HoverWord({ eng, san }: { eng: string; san: string }) {
  return (
    <span className="group relative inline-block cursor-default">
      {/* English word — fades out on hover (desktop only; touch-safe via hover-word-eng CSS class) */}
      <span className="inline-block transition-opacity duration-300 group-hover:opacity-0 hover-word-eng">
        {eng}
      </span>
      {/* Sanskrit word — appears on hover on desktop only */}
      <span className="absolute left-0 top-0 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-[var(--color-saffron)] font-display whitespace-nowrap pointer-events-none hover-only">
        {san}
      </span>
      {/* On mobile/touch: show subtle Sanskrit hint below */}
      <span className="block text-[var(--color-saffron)]/60 font-display text-sm leading-tight md:hidden" aria-hidden="true">
        {san}
      </span>
    </span>
  );
}


export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;

      if (prefersReducedMotion) {
        gsap.set([leftColRef.current.children, rightColRef.current], { opacity: 1, y: 0 });
        return;
      }

      const elementsToAnimate = [
        ...leftColRef.current.children,
        rightColRef.current
      ];

      gsap.from(elementsToAnimate, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center border-t border-[var(--color-gold)]/10 paper-texture"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-24 items-center">
        {/* Left Column: Content */}
        <div ref={leftColRef} className="md:col-span-7 xl:col-span-6 flex flex-col space-y-6 sm:space-y-8">
          <div className="flex flex-col space-y-2">
            <span className="font-display text-[var(--color-saffron)] text-xl sm:text-2xl tracking-wide">
              परिचय <span className="font-sans text-lg sm:text-xl opacity-70 tracking-normal">(About)</span>
            </span>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
              02 / 08 — About
            </span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight flex flex-wrap gap-x-[0.3em] items-baseline">
            <HoverWord eng="Hello," san="नमस्ते," />
            <HoverWord eng="I'm" san="अहम्" />
            <HoverWord eng={profile.displayName} san="ध्रुव टापणीया." />
          </h2>

          <p className="font-sans text-base sm:text-lg md:text-xl text-[var(--color-ink)] font-light leading-relaxed">
            {profile.shortBio}
          </p>

          <div className="font-sans text-sm sm:text-base text-[var(--color-muted)] leading-relaxed space-y-4">
            <p>{profile.aboutBody}</p>
          </div>
        </div>

        {/* Right Column: Media / Portrait */}
        <div ref={rightColRef} className="md:col-span-5 xl:col-span-6 flex justify-center md:justify-end lg:translate-x-12">
          <div
            className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px] flex items-center justify-center p-6 sm:p-8 lg:p-12"
          >
            {/* Soft Glowing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-[var(--color-saffron)]/15 blur-[60px] rounded-full -z-10 pointer-events-none" />
            
            {/* Minimalist Offset Wireframes */}
            <div className="absolute top-4 sm:top-6 md:top-10 left-4 sm:left-6 md:left-10 w-full h-full border-[1.5px] border-[var(--color-gold)]/30 -z-10 pointer-events-none" />
            <div className="absolute -top-3 sm:-top-4 md:-top-6 -left-3 sm:-left-4 md:-left-6 w-full h-full border-[1.5px] border-[var(--color-ink)]/10 -z-10 pointer-events-none" />

            {profile.cutoutSrc || profile.portraitSrc ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={profile.cutoutSrc || profile.portraitSrc || ""}
                alt={`Portrait of ${profile.name}`}
                className="w-full h-auto object-contain mix-blend-multiply relative z-10 brightness-[1.08] contrast-[1.12]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[var(--color-muted)] border border-[var(--color-gold)]/20 aspect-[3/4] w-full relative z-10">
                <span className="font-sans text-xs tracking-widest uppercase">
                  [PORTRAIT REQUIRED]
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
