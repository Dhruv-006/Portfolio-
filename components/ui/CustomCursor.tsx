"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function useFinePointer(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return window.matchMedia("(pointer: fine)").matches;
  }, []);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isFinePointer = useFinePointer();

  useEffect(() => {
    // Only enable on fine pointer devices (desktops) and if reduced motion is false
    if (!isFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast quick setter for performance
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xSet(e.clientX);
      ySet(e.clientY);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Use event delegation for hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button']");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [prefersReducedMotion, isFinePointer, isVisible]);

  // Render nothing on touch devices or reduced motion
  if (!isFinePointer || prefersReducedMotion) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 rounded-full border border-[var(--color-saffron)] pointer-events-none z-[9999] mix-blend-difference transition-all duration-300 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isHovering ? 2.5 : 1})`,
        backgroundColor: isHovering ? "rgba(235, 94, 40, 0.2)" : "transparent",
      }}
      aria-hidden="true"
    />
  );
}
