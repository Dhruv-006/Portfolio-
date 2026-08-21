"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !bgRef.current || !textRef.current || !bgTextRef.current) return;

      if (prefersReducedMotion) {
        gsap.set([bgRef.current, ...textRef.current.children, bgTextRef.current], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // start transitioning earlier
        },
      });

      // Background fade to night
      tl.from(bgRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Subtle background sanskrit
      tl.from(bgTextRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 2,
        ease: "power3.out",
      }, "-=0.5");

      // Text stagger
      tl.from(textRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      }, "-=1.5");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Night Background Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-[var(--color-night)] z-0"
        aria-hidden="true"
      />

      {/* Decorative Sanskrit Background — smaller on mobile to prevent bleed */}
      <div 
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 z-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <span 
          className="font-display text-[var(--color-night-text)] whitespace-nowrap"
          style={{ fontSize: "clamp(80px, 25vw, 300px)" }}
        >
          विचार
        </span>
      </div>

      <div className="relative z-10 max-w-5xl w-full px-4 sm:px-6 md:px-12 lg:px-24 flex flex-col items-center text-center space-y-8 sm:space-y-12">
        
        <div ref={textRef} className="flex flex-col items-center space-y-6 sm:space-y-8">
          <div className="flex flex-col space-y-2 mb-4 sm:mb-8">
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-gold)]">
              06 / 08 — Philosophy
            </span>
          </div>

          {/* Build. Learn. Break. Rebuild. — fluid typography */}
          <h2 
            className="font-display text-[var(--color-night-text)] leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 6rem)" }}
          >
            Build.<br className="sm:hidden" /> Learn.<br className="sm:hidden" /> Break.<br className="sm:hidden" /> Rebuild.
          </h2>

          <div className="max-w-2xl font-sans text-base sm:text-lg md:text-xl font-light text-[var(--color-night-text)]/70 leading-relaxed pt-6 sm:pt-8 border-t border-[var(--color-gold)]/20">
            <p>
              I believe in iteration. Technology is shaped by curiosity, refined through experimentation, and perfected by learning from what breaks. 
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
