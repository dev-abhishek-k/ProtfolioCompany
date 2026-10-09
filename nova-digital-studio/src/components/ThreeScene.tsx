"use client";

import { useEffect } from "react";
import { useThreeScene } from "@/hooks/useThreeScene";

export default function ThreeScene() {
  const { canvasRef, fallback } = useThreeScene("hero", "scroll-experience");
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return <div className="webgl-layer" aria-hidden="true"><canvas ref={canvasRef} className={fallback ? "webgl-canvas hidden" : "webgl-canvas"} />{fallback && <div className="webgl-fallback"><span className="fallback-orb" /><span className="fallback-ring ring-a" /><span className="fallback-ring ring-b" /></div>}</div>;
}
