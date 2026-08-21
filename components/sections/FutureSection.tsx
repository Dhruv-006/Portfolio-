"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const directions = [
  "Exploring Artificial Intelligence integration in consumer products.",
  "Building toward scalable, robust Software Engineering architectures.",
  "Experimenting with modern interaction design and human-computer interfaces.",
];

export function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current || !listRef.current) return;

      if (prefersReducedMotion) {
        gsap.set([...textRef.current.children, ...listRef.current.children], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(textRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      })
      .from(listRef.current.children, {
        x: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.5");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="future"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-night-soft)] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-24">
        
        {/* Left Column */}
        <div ref={textRef} className="md:col-span-5 flex flex-col space-y-4 sm:space-y-6">
          <div className="flex flex-col space-y-2">
            <span className="font-display text-[var(--color-saffron)] text-xl sm:text-2xl tracking-wide">
              भविष्य <span className="font-sans text-lg sm:text-xl opacity-70 tracking-normal">(Future)</span>
            </span>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-night-text)]/50">
              07 / 08 — Future
            </span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-5xl text-[var(--color-night-text)] font-medium leading-tight">
            Current<br/> Direction.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[var(--color-night-text)]/70 font-light leading-relaxed">
            I am constantly learning, adapting, and looking ahead. The goal is not just to write code, but to solve meaningful problems at the intersection of technology and human experience.
          </p>
        </div>

        {/* Right Column: Directions */}
        <div className="md:col-span-7 flex items-center">
          <ul ref={listRef} className="flex flex-col space-y-6 sm:space-y-8 border-l border-[var(--color-gold)]/20 pl-6 sm:pl-8 md:pl-12">
            {directions.map((text, idx) => (
              <li key={idx} className="relative group">
                <div className="absolute -left-[25px] sm:-left-[33px] md:-left-[49px] top-2 w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/50 group-hover:bg-[var(--color-gold)] transition-colors" />
                <p className="font-sans text-base sm:text-lg md:text-xl text-[var(--color-night-text)] font-light leading-relaxed">
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
