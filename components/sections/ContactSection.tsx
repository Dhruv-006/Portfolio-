"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Mail, FileText } from "lucide-react";

const getContactIcon = (label: string) => {
  const iconClass = "w-4 h-4 sm:w-5 sm:h-5 mr-2 opacity-50 group-hover:opacity-100 group-hover:text-[var(--color-saffron)] transition-all duration-300 touch-show";
  switch (label.toLowerCase()) {
    case 'email': return <Mail className={iconClass} />;
    case 'linkedin': return <FaLinkedin className={iconClass} />;
    case 'github': return <FaGithub className={iconClass} />;
    case 'resume': return <FileText className={iconClass} />;
    default: return null;
  }
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shriRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current || !shriRef.current) return;

      if (prefersReducedMotion) {
        gsap.set([...contentRef.current.children, shriRef.current], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      tl.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });

      tl.from(shriRef.current, {
        y: -30,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      }, "-=0.5");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const links = [
    { label: "Email", url: profile.email ? `mailto:${profile.email}` : null },
    { label: "LinkedIn", url: profile.linkedinUrl },
    { label: "GitHub", url: profile.githubUrl },
    { label: "Resume", url: profile.resumeUrl },
  ].filter((link) => link.url !== null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-paper)] flex flex-col items-center justify-between pt-16 sm:pt-24 pb-24 sm:pb-32 md:pb-40 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden border-t border-[var(--color-gold)]/10 paper-texture"
    >
      <div
        ref={contentRef}
        className="flex flex-col items-center text-center space-y-8 sm:space-y-12 z-10 w-full max-w-4xl"
      >
        <div className="flex flex-col space-y-3 sm:space-y-4">
          <span className="font-display text-[var(--color-saffron)] text-2xl sm:text-3xl md:text-4xl tracking-wide">
            सम्पर्क <span className="font-sans text-xl sm:text-2xl md:text-3xl opacity-70 tracking-normal">(Contact)</span>
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
            08 / 08 — Contact
          </span>
        </div>

        <h2 
          className="font-sans text-[var(--color-ink)] font-medium leading-tight"
          style={{ fontSize: "clamp(1.75rem, 6vw, 4.5rem)" }}
        >
          Let&apos;s build something <br className="hidden md:block" /> meaningful.
        </h2>

        {links.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-12 pt-6 sm:pt-8">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center font-sans text-sm md:text-base uppercase tracking-widest text-[var(--color-ink)] hover:text-[var(--color-saffron)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] p-2 min-h-[44px] min-w-[44px]"
              >
                {getContactIcon(link.label)}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="pt-8 font-sans text-sm tracking-widest uppercase text-[var(--color-muted)] italic">
            [CONTACT LINKS TO CONFIRM]
          </div>
        )}
      </div>

      {/* Closing Shri Symbol and Quote — fluid sizing */}
      <div
        ref={shriRef}
        className="flex flex-col items-center justify-center select-none pointer-events-none mt-24 sm:mt-32 md:mt-40 mb-0 w-full"
        aria-hidden="true"
      >
        <h2 
          className="font-display leading-none text-[var(--color-ink)]/5"
          style={{ 
            fontSize: "clamp(80px, 20vw, 240px)",
            whiteSpace: "nowrap",
            letterSpacing: "0px",
            fontVariantLigatures: "normal"
          }}
        >
          ॥ श्री ॥
        </h2>
        <div className="flex flex-col items-center mt-2 sm:mt-4 md:mt-6">
          <span 
            className="font-display tracking-wide mb-1 sm:mb-2 text-[var(--color-ink)]/15 font-medium"
            style={{ fontSize: "clamp(1.25rem, 4vw, 3rem)" }}
          >
            <span className="sm:inline">कर्म एव </span>
            <span className="sm:inline">परिचयः ।</span>
          </span>
          <span 
            className="font-sans tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--color-ink)]/20 font-bold"
            style={{ fontSize: "clamp(8px, 1.2vw, 14px)" }}
          >
            My work is my identity.
          </span>
        </div>
      </div>
    </section>
  );
}
