"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const NAV_LINKS = [
  { href: "#about", label: "परिचय", english: "About" },
  { href: "#skills", label: "विद्या", english: "Skills" },
  { href: "#projects", label: "सृजन", english: "Projects" },
  { href: "#journey", label: "यात्रा", english: "Journey" },
  { href: "#philosophy", label: "विचार", english: "Philosophy" },
  { href: "#future", label: "भविष्य", english: "Future" },
  { href: "#contact", label: "सम्पर्क", english: "Contact" },
];

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Show navigation only after scrolling past the hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.8; 
      setIsVisible(scrollPosition > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // trigger near middle of screen
    );

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Focus management: focus first link when menu opens
  useEffect(() => {
    if (menuOpen) {
      // Small delay to allow the menu to render
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    }
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    // Allow menu close animation before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  }, []);

  return (
    <>
      {/* ===== DESKTOP NAV (lg and up) ===== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 p-6 hidden lg:flex flex-row justify-between items-center mix-blend-difference text-[var(--color-paper)] pointer-events-none transition-opacity duration-1000 print:hidden ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isVisible}
      >
        {/* Left side: Minimal Branding */}
        <div className="pointer-events-auto">
          <a 
            href="#top" 
            className="font-display text-2xl hover:text-[var(--color-saffron)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
            aria-label="Back to top"
            tabIndex={isVisible ? 0 : -1}
          >
            ॥ श्री ॥
          </a>
        </div>

        {/* Right side: Links */}
        <ul className="flex gap-8 pointer-events-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeHash === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className="group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
                  tabIndex={isVisible ? 0 : -1}
                >
                  <span className={`font-display text-xl transition-colors duration-500 ${isActive ? "text-[var(--color-saffron)]" : "group-hover:text-[var(--color-saffron)]"}`}>
                    {link.label}
                  </span>
                  
                  {/* Active Indicator (Dot) */}
                  <span 
                    className={`absolute -bottom-2 w-1 h-1 rounded-full bg-[var(--color-saffron)] transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} 
                    aria-hidden="true" 
                  />

                  <span className="font-sans text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute mt-8 text-[var(--color-paper)] hover-only">
                    {link.english}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ===== MOBILE/TABLET NAV (below lg) ===== */}
      {/* Hamburger button */}
      <button
        ref={hamburgerRef}
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-4 right-4 z-[60] lg:hidden flex items-center justify-center w-12 h-12 rounded-full mix-blend-difference text-[var(--color-paper)] transition-all duration-500 print:hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        tabIndex={isVisible ? 0 : -1}
      >
        <div className="relative w-6 h-5 flex flex-col justify-between">
          <span 
            className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`} 
          />
          <span 
            className={`block w-full h-[1.5px] bg-current transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
            }`} 
          />
          <span 
            className={`block w-full h-[1.5px] bg-current transform transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`} 
          />
        </div>
      </button>

      {/* Mobile branding (श्री) — shown on mobile when scrolled, NOT inside the menu */}
      <div
        className={`fixed top-4 left-4 z-[60] lg:hidden mix-blend-difference pointer-events-auto transition-opacity duration-500 print:hidden ${
          isVisible && !menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <a 
          href="#top" 
          className="font-display text-xl text-[var(--color-paper)] focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)]"
          aria-label="Back to top"
          tabIndex={isVisible && !menuOpen ? 0 : -1}
        >
          ॥ श्री ॥
        </a>
      </div>

      {/* Fullscreen overlay menu */}
      <div
        id="mobile-nav"
        ref={menuRef}
        className={`fixed inset-0 z-[55] lg:hidden flex flex-col items-center justify-center transition-all duration-500 print:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-[var(--color-night)]/95 backdrop-blur-xl transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Nav links */}
        <nav className="relative z-10 flex flex-col items-center gap-2">
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeHash === link.href;
            return (
              <a
                key={link.href}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex flex-col items-center py-3 px-8 min-h-[48px] min-w-[200px] justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-saffron)] rounded-lg ${
                  menuOpen 
                    ? "translate-y-0 opacity-100" 
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${idx * 60}ms` : "0ms",
                }}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={`font-display text-2xl sm:text-3xl transition-colors duration-300 ${
                  isActive ? "text-[var(--color-saffron)]" : "text-[var(--color-night-text)]"
                }`}>
                  {link.label}
                </span>
                <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[var(--color-night-text)]/50 mt-1">
                  {link.english}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom branding in menu */}
        <div className={`absolute bottom-8 flex flex-col items-center transition-all duration-500 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
          style={{ transitionDelay: menuOpen ? "450ms" : "0ms" }}
        >
          <span className="font-display text-lg text-[var(--color-night-text)]/20">
            ॥ श्री ॥
          </span>
        </div>
      </div>
    </>
  );
}
