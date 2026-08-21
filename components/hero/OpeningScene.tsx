"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PortraitReveal } from "./PortraitReveal";
import { createHeroTimeline } from "@/animations/heroTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function OpeningScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shriRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const identityNameRef = useRef<HTMLHeadingElement>(null);
  const identityRoleRef = useRef<HTMLParagraphElement>(null);
  const identityTaglineRef = useRef<HTMLParagraphElement>(null);
  const fragmentRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      // Don't run animation on server or before hydation gives us reliable media query
      if (!containerRef.current || !shriRef.current || !portraitRef.current) return;

      createHeroTimeline(
        {
          container: containerRef.current,
          shri: shriRef.current,
          sanskritFragments: fragmentRefs.current.filter((el): el is HTMLSpanElement => el !== null),
          portrait: portraitRef.current,
          identityName: identityNameRef.current!,
          identityRole: identityRoleRef.current!,
          identityTagline: identityTaglineRef.current!,
        },
        prefersReducedMotion
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen-safe bg-[var(--color-ivory)] overflow-hidden flex items-center justify-center text-[var(--color-ink)] paper-texture"
    >
      {/* Background Sanskrit Fragments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex flex-col justify-between py-8 sm:py-12 md:py-24">
        {[
          "असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥",
          "विद्या ददाति विनयं विनयाद् याति पात्रताम् । पात्रत्वात् धनमाप्नोति धनात् धर्मं ततः सुखम् ॥",
          "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
          "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥"
        ].map((shloka, i) => (
          <span
            key={i}
            ref={(el) => {
              fragmentRefs.current[i] = el;
            }}
            aria-hidden="true"
            className="text-[var(--color-muted)] font-display text-lg sm:text-2xl md:text-4xl lg:text-6xl whitespace-nowrap block"
            style={{
              marginLeft: i % 2 === 0 ? "-10%" : "10%",
              opacity: 0.06,
            }}
          >
            {`${shloka} ${shloka} ${shloka}`}
          </span>
        ))}
      </div>

      {/* Main Shri Symbol and Quote */}
      <div
        ref={shriRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center select-none text-center px-4"
        style={{ transformOrigin: "center center" }}
      >
        <h1 
          className="font-display leading-none text-[var(--color-ink)]"
          style={{ fontSize: "clamp(100px, 25vw, 400px)" }}
        >
          ॥ श्री ॥
        </h1>
        {/* Negative top margin to pull the quote closer to the large Shri symbol */}
        <div className="flex flex-col items-center" style={{ marginTop: "clamp(-8px, -2vw, -24px)" }}>
          <span 
            className="font-display text-[var(--color-saffron)] tracking-wide mb-1 sm:mb-2 md:mb-4"
            style={{ fontSize: "clamp(1.25rem, 4vw, 3.75rem)" }}
          >
            <span className="sm:inline">कर्म एव </span>
            <span className="sm:inline">परिचयः ।</span>
          </span>
          <span 
            className="font-sans tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--color-ink)]/70 font-light"
            style={{ fontSize: "clamp(8px, 1.2vw, 16px)" }}
          >
            My work is my identity.
          </span>
        </div>
      </div>

      {/* Portrait Reveal */}
      <PortraitReveal
        ref={portraitRef}
        className="absolute z-20 w-[55vw] max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[420px]"
      />

      {/* Identity Content — stacked below center on mobile, editorial on desktop */}
      <div className="absolute z-30 flex flex-col items-center text-center md:items-start md:text-left bottom-[10%] sm:bottom-auto sm:mt-0 md:mt-0 md:ml-[-30vw] xl:ml-[-40vw] px-4 sm:px-6 w-full sm:w-auto max-w-[90vw] sm:max-w-none">
        <h2
          ref={identityNameRef}
          className="font-sans font-medium tracking-tight mb-2"
          style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
        >
          Dhruv Tapaniya.
        </h2>
        <p
          ref={identityRoleRef}
          className="font-sans text-xs sm:text-sm md:text-lg text-[var(--color-muted)] tracking-wider uppercase mb-4 sm:mb-6"
        >
          [ROLE TO CONFIRM]
        </p>
        <p
          ref={identityTaglineRef}
          className="font-display italic text-[var(--color-saffron)]"
          style={{ fontSize: "clamp(1.125rem, 3vw, 1.875rem)" }}
        >
          From Roots to Code.
        </p>
      </div>
    </section>
  );
}
