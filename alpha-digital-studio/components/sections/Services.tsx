"use client";

import type { PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

function moveCard(event: PointerEvent<HTMLElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || event.pointerType === "touch") return;
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  card.style.setProperty("--rotate-x", `${-y * 6}deg`);
  card.style.setProperty("--rotate-y", `${x * 6}deg`);
  card.style.setProperty("--mouse-x", `${(x + 0.5) * 100}%`);
  card.style.setProperty("--mouse-y", `${(y + 0.5) * 100}%`);
}

function resetCard(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--rotate-x", "0deg");
  event.currentTarget.style.setProperty("--rotate-y", "0deg");
}

export function Services() {
  return (
    <section id="services" className="services-section section-space">
      <div className="shell">
        <div className="section-heading" data-reveal><span className="eyebrow"><span className="eyebrow-dot" /> WHAT WE DO <span className="eyebrow-number">/ 01</span></span><div className="section-heading-row"><h2>Six ways to make<br /><em>an impact.</em></h2><p>From first sketch to final deployment, we connect the disciplines that make exceptional digital work possible.</p></div></div>
        <div className="services-grid">
          {services.map(({ number, title, detail, icon: Icon, tags }) => (
            <article className="service-card glass-card" key={number} onPointerMove={moveCard} onPointerLeave={resetCard} data-reveal>
              <span className="service-number">/{number}</span><span className="service-icon"><Icon size={28} strokeWidth={1.45} /></span>
              <div className="service-copy"><h3>{title}</h3><p>{detail}</p></div>
              <div className="service-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <ArrowUpRight className="service-arrow" size={22} strokeWidth={1.4} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
