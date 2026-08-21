"use client";

import { useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  const handleResize = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    // If reduced motion is preferred, we can just skip initializing Lenis
    if (prefersReducedMotion) return;

    // Detect touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // On touch devices: lower multiplier to avoid conflicting with native scroll
      wheelMultiplier: 1,
      touchMultiplier: isTouch ? 1 : 2,
      // On touch, prefer native touch behavior
      ...(isTouch ? { syncTouch: true } : {}),
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Store the raf callback so we can properly remove it
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger on resize and orientation change
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, [prefersReducedMotion, handleResize]);

  return <>{children}</>;
}
