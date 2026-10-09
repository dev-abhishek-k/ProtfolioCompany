"use client";

import { useRef } from "react";

const services = [
  { number: "01", icon: "◈", name: "Digital Experiences", description: "Distinctive websites and platforms that make every interaction count.", tags: "WEB / DEVELOPMENT" },
  { number: "02", icon: "◎", name: "Immersive 3D", description: "Tactile WebGL worlds with movement, depth, and a sense of wonder.", tags: "THREE.JS / INTERACTION" },
  { number: "03", icon: "✳", name: "Brand & Identity", description: "Bold visual systems that give ideas an unmistakable voice.", tags: "STRATEGY / DESIGN" },
  { number: "04", icon: "⌘", name: "Product Design", description: "Useful digital products that feel intuitive from the first moment.", tags: "UI / UX" },
  { number: "05", icon: "◇", name: "Creative Technology", description: "Experiments and intelligent tools that open new possibilities.", tags: "INNOVATION / AI" },
  { number: "06", icon: "▣", name: "E-commerce", description: "Elevated shopping journeys built for discovery and performance.", tags: "COMMERCE / GROWTH" },
];

function ServiceCard({ service }: { service: typeof services[number] }) {
  const ref = useRef<HTMLElement>(null);
  return <article className="service-card" ref={ref} onPointerMove={event => {
    const element = ref.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches || event.pointerType === "touch") return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--rx", `${-y * 4}deg`);
    element.style.setProperty("--ry", `${x * 4}deg`);
    element.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    element.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  }} onPointerLeave={() => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); }}><div className="service-card-top"><span>{service.number} / 06</span><span>↗</span></div><div className="service-symbol">{service.icon}</div><h3>{service.name}</h3><p>{service.description}</p><span className="service-tags">{service.tags}</span></article>;
}

export default function Services() { return <section className="section services" id="services"><div className="section-index"><span>02 / CAPABILITIES</span><span>WHAT WE DO</span></div><div className="section-intro" data-reveal><h2 className="section-title">Ideas made<br /><em>impossible.</em></h2><p>From the first spark to the final pixel, our multidisciplinary practice brings ambitious ideas to life.</p></div><div className="services-grid">{services.map(service => <ServiceCard key={service.number} service={service} />)}</div></section>; }
