"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { journey } from "@/data/journey";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current || !lineRef.current) return;
      const items = itemsRef.current.filter((el): el is HTMLDivElement => el !== null);

      if (prefersReducedMotion) {
        gsap.set([headerRef.current, lineRef.current, ...items], { opacity: 1, y: 0, scaleX: 1, scaleY: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Reveal header
      tl.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Draw timeline line (horizontal on desktop, vertical on mobile)
      tl.from(lineRef.current, {
        scaleX: 0, // for horizontal (we'll also handle vertical in css layout, but gsap handles the transform origin)
        scaleY: 0,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left top",
      }, "-=0.4");

      // Reveal milestones
      tl.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      }, "-=0.8");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="w-full min-h-screen bg-[var(--color-ivory)] text-[var(--color-ink)] py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center border-t border-[var(--color-gold)]/10 paper-texture"
    >
      <div className="max-w-7xl w-full flex flex-col space-y-12 sm:space-y-16 md:space-y-24">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col space-y-2">
          <span className="font-display text-[var(--color-saffron)] text-xl sm:text-2xl tracking-wide">
            यात्रा <span className="font-sans text-lg sm:text-xl opacity-70 tracking-normal">(Journey)</span>
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
            05 / 08 — Journey
          </span>
        </div>

        {/* Timeline Container */}
        <div className="relative pt-8">
          {/* Main Line — vertical on mobile, horizontal on desktop */}
          <div 
            ref={lineRef} 
            className="absolute top-0 left-4 sm:left-0 md:top-[4.5rem] w-[1px] md:w-full h-full md:h-[1px] bg-gradient-to-b md:bg-gradient-to-r from-[var(--color-saffron)]/10 via-[var(--color-saffron)]/40 to-[var(--color-saffron)]/10"
            aria-hidden="true"
          />

          {/* Timeline Items — vertical stack on mobile, horizontal grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10 md:gap-6 pl-10 sm:pl-8 md:pl-0">
            {journey
              .sort((a, b) => a.order - b.order)
              .map((item, index) => {
                const isCurrent = index === journey.length - 1;
                const formattedNumber = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      itemsRef.current[index] = el;
                    }}
                    className="relative flex flex-col space-y-3 sm:space-y-4 group"
                  >
                    {/* Node indicator — positioned on the vertical line on mobile, static on desktop */}
                    <div className="absolute -left-[30px] sm:-left-[37px] md:static md:mb-8 flex items-center justify-center">
                      <div className={`w-3 h-3 rounded-full border border-[var(--color-saffron)] transition-colors duration-500 ${isCurrent ? 'bg-[var(--color-saffron)]' : 'bg-[var(--color-ivory)] group-hover:bg-[var(--color-saffron)]/20'}`} />
                    </div>

                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      <span className="font-sans text-xs tracking-widest text-[var(--color-muted)] uppercase">
                        {formattedNumber}
                      </span>
                      <h3 className={`font-display text-lg sm:text-xl md:text-2xl leading-tight ${isCurrent ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink)]/80'}`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex flex-col space-y-1 sm:space-y-2">
                      <span className="font-sans text-xs sm:text-sm tracking-widest text-[var(--color-saffron)] uppercase">
                        {item.period}
                      </span>
                      <p className={`font-sans text-sm md:text-base leading-relaxed ${isCurrent ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-muted)]'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
