import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface HeroRefs {
  container: HTMLElement;
  shri: HTMLElement;
  sanskritFragments: HTMLElement[];
  portrait: HTMLElement;
  identityName: HTMLElement;
  identityRole: HTMLElement;
  identityTagline: HTMLElement;
}

export function createHeroTimeline(
  refs: HeroRefs,
  prefersReducedMotion: boolean
) {
  const {
    container,
    shri,
    sanskritFragments,
    portrait,
    identityName,
    identityRole,
    identityTagline,
  } = refs;

  const mm = gsap.matchMedia();

  mm.add({
    isMobile: "(max-width: 768px)",
    isDesktop: "(min-width: 769px)"
  }, (context) => {
    const { isMobile } = context.conditions as { isMobile: boolean };

    if (prefersReducedMotion) {
      // Reduced motion fallback
      const tl = gsap.timeline();
      gsap.set([portrait, identityName, identityRole, identityTagline], { 
        opacity: 0,
        y: 20
      });
      gsap.set(shri, { opacity: 0.2, scale: isMobile ? 0.8 : 0.5, y: isMobile ? -100 : 0 });
      gsap.set(sanskritFragments, { opacity: 0 });

      tl.to(portrait, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
        .to([identityName, identityRole, identityTagline], { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out" 
        }, "-=0.5");

      return;
    }

    const scrollEnd = isMobile ? "+=120%" : "+=300%";
    const initialBlur = isMobile ? "blur(6px)" : "blur(12px)";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: scrollEnd,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    gsap.set(portrait, { 
      opacity: 0, 
      scale: 1.1,
      filter: initialBlur,
      clipPath: "inset(100% 0% 0% 0%)"
    });
    
    gsap.set([identityName, identityRole, identityTagline], {
      opacity: 0,
      y: 30
    });

    tl.to(shri, {
      scale: 0.85,
      duration: 2,
      ease: "none"
    });

    tl.to(shri, {
      scale: isMobile ? 0.35 : 0.45,
      y: isMobile ? -120 : 0,
      opacity: 0.3,
      duration: 2,
      ease: "power1.inOut"
    }, ">");

    sanskritFragments.forEach((fragment, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const distance = isMobile ? 40 : 100;
      tl.to(fragment, {
        x: distance * direction,
        opacity: 0.2,
        duration: 4,
        ease: "none"
      }, "<");
    });

    tl.to(portrait, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 2,
      ease: "power2.out"
    }, ">");

    tl.to(shri, {
      y: isMobile ? -180 : -100,
      opacity: 0.1,
      duration: 2,
      ease: "power2.inOut"
    }, ">");

    if (!isMobile) {
      tl.to(portrait, {
        x: "10vw",
        duration: 2,
        ease: "power2.inOut"
      }, "<");
    } else {
      tl.to(portrait, {
        y: "-15%",
        duration: 2,
        ease: "power2.inOut"
      }, "<");
    }

    const staggerDuration = 1.5;
    tl.to(identityName, {
      opacity: 1,
      y: 0,
      duration: staggerDuration,
      ease: "power2.out"
    }, ">")
    .to(identityRole, {
      opacity: 1,
      y: 0,
      duration: staggerDuration,
      ease: "power2.out"
    }, ">-0.8")
    .to(identityTagline, {
      opacity: 1,
      y: 0,
      duration: staggerDuration,
      ease: "power2.out"
    }, ">-0.8");

    tl.to({}, { duration: 0.5 });
  });
  
  return mm;
}
