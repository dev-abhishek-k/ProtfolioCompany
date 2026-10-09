"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ThreeExperience = dynamic(() => import("@/components/three/ThreeExperience"), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const context = gsap.context(() => {
      if (window.innerWidth > 640) {
        gsap.fromTo(".hero-line > span", { y: 24 }, { y: 0, duration: 1.25, stagger: 0.12, ease: "power4.out", delay: 0.18 });
      }
      gsap.fromTo(".hero-enter", { y: 16 }, { y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.55 });
    }, root);
    return () => context.revert();
  }, [reduced]);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      {!reduced && <ThreeExperience />}
      <div className="shell hero-layout">
        <div className="hero-content">
          <div className="eyebrow hero-enter"><span className="eyebrow-dot" /> INDEPENDENT CREATIVE ENGINEERING STUDIO <span className="eyebrow-line" /> EST. 2024</div>
          <h1 id="hero-title"><span className="hero-line"><span>We Build</span></span><span className="hero-line"><span className="gradient-text">Digital</span></span><span className="hero-line"><span>Experiences<span className="hero-period">.</span></span></span></h1>
          <div className="hero-bottom hero-enter"><p>We turn ambitious ideas into expressive digital products, immersive websites, and technology that feels human.</p><div className="hero-actions"><a className="button button-primary magnetic-button" href="#work">Explore our work <ArrowUpRight size={18} /></a><a className="button button-outline" href="#contact">Start a project <MoveUpRight size={18} /></a></div></div>
        </div>
        <div className="hero-side-note" aria-hidden="true"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div>
        <div className="hero-corner hero-enter"><span>01 / 06</span><span>CREATIVE TECHNOLOGY, WITHOUT LIMITS</span></div>
      </div>
    </section>
  );
}
