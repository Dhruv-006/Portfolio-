"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !progressRef.current) return;

    // We must ensure ScrollTrigger is registered before using it
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.to(progressRef.current, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // very slight smoothing
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(() => {
        // We only kill this specific trigger if it has an id, but timeline's trigger is automatically killed when timeline is killed.
      });
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div 
      className="fixed top-0 right-0 h-full w-[2px] bg-[var(--color-ink)]/5 z-[9000] mix-blend-difference hidden md:block"
      aria-hidden="true"
    >
      <div 
        ref={progressRef}
        className="w-full h-full bg-[var(--color-saffron)] origin-top scale-y-0"
      />
    </div>
  );
}
