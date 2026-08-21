"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { skills } from "@/data/skills";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { 
  SiFlutter, SiDart, SiKotlin, SiPython, SiHtml5, SiCss, SiFirebase, SiFlask, 
  SiFigma, SiMaterialdesign, SiAndroidstudio, SiGit, SiGithub 
} from "react-icons/si";
import { FaJava, FaAndroid, FaDatabase } from "react-icons/fa";
import { Brain, Cpu, PenTool } from "lucide-react";

const getSkillIcon = (skillName: string) => {
  // On touch devices, icons are always full opacity via the touch-show class
  const iconClass = "w-5 h-5 mr-4 opacity-50 group-hover/skill:opacity-100 group-hover/skill:text-[var(--color-saffron)] transition-all duration-300 touch-show";
  switch(skillName.toLowerCase()) {
    case 'flutter': return <SiFlutter className={iconClass} />;
    case 'dart': return <SiDart className={iconClass} />;
    case 'java': return <FaJava className={iconClass} />;
    case 'kotlin': return <SiKotlin className={iconClass} />;
    case 'android development': return <FaAndroid className={iconClass} />;
    case 'python': return <SiPython className={iconClass} />;
    case 'html': return <SiHtml5 className={iconClass} />;
    case 'css': return <SiCss className={iconClass} />;
    case 'firebase': return <SiFirebase className={iconClass} />;
    case 'sql': return <FaDatabase className={iconClass} />;
    case 'flask': return <SiFlask className={iconClass} />;
    case 'artificial intelligence': return <Brain className={iconClass} />;
    case 'machine learning': return <Cpu className={iconClass} />;
    case 'figma': return <SiFigma className={iconClass} />;
    case 'material design 3': return <SiMaterialdesign className={iconClass} />;
    case 'android studio': return <SiAndroidstudio className={iconClass} />;
    case 'git': return <SiGit className={iconClass} />;
    case 'github': return <SiGithub className={iconClass} />;
    case 'ui/ux design': return <PenTool className={iconClass} />;
    default: return <div className="w-5 h-5 mr-4 opacity-0" />;
  }
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !headerRef.current) return;
      const modules = modulesRef.current.filter((el): el is HTMLDivElement => el !== null);

      if (prefersReducedMotion) {
        gsap.set([headerRef.current, ...modules], { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      tl.from(modules, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="w-full min-h-screen bg-[var(--color-ivory)] text-[var(--color-ink)] py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center justify-center border-t border-[var(--color-gold)]/10 paper-texture"
    >
      <div className="max-w-7xl w-full flex flex-col space-y-10 sm:space-y-16">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col space-y-2">
          <span className="font-display text-[var(--color-saffron)] text-xl sm:text-2xl tracking-wide">
            विद्या <span className="font-sans text-lg sm:text-xl opacity-70 tracking-normal">(Skills)</span>
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-[var(--color-muted)]">
            03 / 08 — Skills & Knowledge
          </span>
        </div>

        {/* Skills Grid — 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
          {skills
            .sort((a, b) => a.order - b.order)
            .map((group, index) => (
              <div
                key={group.id}
                ref={(el) => {
                  modulesRef.current[index] = el;
                }}
                className="flex flex-col space-y-6 sm:space-y-8 group"
              >
                <div className="border-b border-[var(--color-ink)]/10 pb-4 sm:pb-6 transition-colors duration-500 group-hover:border-[var(--color-saffron)]/50">
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--color-ink)] mb-2">
                    {group.sanskritLabel}
                  </h3>
                  <p className="font-sans text-sm uppercase tracking-widest text-[var(--color-muted)]">
                    {group.englishLabel}
                  </p>
                </div>

                <ul className="flex flex-col space-y-3 sm:space-y-4">
                  {group.skills.length > 0 ? (
                    group.skills.map((skill, skillIdx) => (
                      <li
                        key={skillIdx}
                        className="font-sans text-base sm:text-lg md:text-xl font-light text-[var(--color-ink)] flex items-center group/skill"
                      >
                        {getSkillIcon(skill)}
                        <span className="group-hover/skill:text-[var(--color-saffron)] transition-colors duration-300">
                          {skill}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="font-sans text-sm text-[var(--color-muted)] italic">
                      [SKILLS TO CONFIRM]
                    </li>
                  )}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
