"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { y: 46 },
          { y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }
        );
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(element, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    });
    return () => context.revert();
  }, []);
  return null;
}
