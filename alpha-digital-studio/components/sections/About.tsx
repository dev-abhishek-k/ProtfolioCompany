"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AboutScene = dynamic(() => import("@/components/three/AboutScene"), { ssr: false });

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ref.current.textContent = `${String(target).padStart(2, "0")}${suffix}`; return; }
    const node = ref.current;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1350, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${String(Math.round(target * eased)).padStart(2, "0")}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, suffix]);

  return <span ref={ref}>00{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="about-section section-space">
      <div className="shell about-layout"><div className="about-copy"><span className="eyebrow" data-reveal><span className="eyebrow-dot" /> WHO WE ARE <span className="eyebrow-number">/ 03</span></span><h2 data-reveal>Good design gets attention.<br /><em>Great experiences</em> create connection.</h2><p data-reveal>We are a creative technology studio working at the intersection of sharp strategy, expressive design, and thoughtful engineering. Every pixel has a purpose. Every interaction has a point.</p><a className="text-action" href="#process" data-reveal>HOW WE WORK <ArrowUpRight size={18} /></a></div><div className="about-visual" data-parallax><AboutScene /><div className="about-visual-label">FUTURE<br />IN MOTION<span>↗</span></div><span className="about-visual-index">ALPHA / 001</span></div></div>
      <div className="shell stats-grid" data-reveal><div><strong><Counter target={6} /></strong><span>CONNECTED CAPABILITIES</span></div><div><strong><Counter target={4} /></strong><span>CONCEPT EXPLORATIONS</span></div><div><strong><Counter target={1} /></strong><span>UNIFIED CREATIVE PROCESS</span></div></div>
    </section>
  );
}
