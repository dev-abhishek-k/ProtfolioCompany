"use client";

import { useEffect, useState } from "react";
import ProjectPreview from "./ProjectPreview";

const projects = [
  { number: "01", name: "AETHER", type: "DIGITAL PLATFORM", category: "Web", year: "2026", art: "aether", description: "A future facing digital presence for a new generation of clean energy." },
  { number: "02", name: "NOCTURNE", type: "COMMERCE EXPERIENCE", category: "Commerce", year: "2025", art: "nocturne", description: "An editorial commerce world for collectible objects and quiet luxury." },
  { number: "03", name: "FORM / ZERO", type: "IMMERSIVE EXPERIENCE", category: "3D", year: "2025", art: "form", description: "A tactile interactive story that explores form, light, and possibility." },
  { number: "04", name: "MONO", type: "PRODUCT DESIGN", category: "Product", year: "2024", art: "mono", description: "A calmer and more considered way to navigate modern work." },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);
  return <section className="section portfolio" id="work"><div className="section-index"><span>03 / SELECTED WORK</span><span>PROOF IN THE POSSIBILITY</span></div><div className="section-intro" data-reveal><h2 className="section-title">Made to<br /><em>move you.</em></h2><p>A selection of digital worlds and products we are proud to have put into the world.</p></div><div className="portfolio-filters" role="group" aria-label="Filter projects">{["All", "Web", "Commerce", "3D", "Product"].map(item => <button type="button" key={item} onClick={() => setFilter(item)} aria-pressed={filter === item} className={filter === item ? "active" : ""}>{item}</button>)}</div><div className="project-grid">{projects.filter(project => filter === "All" || project.category === filter).map(project => <button type="button" className="project-card" key={project.number} onPointerEnter={event => { if (event.pointerType !== "touch" && !matchMedia("(prefers-reduced-motion: reduce)").matches) setHovered(project.number); }} onPointerLeave={() => setHovered(null)} onClick={() => setSelected(project)} aria-label={`View ${project.name} project`}><div className={`project-image ${project.art}`}><div className="project-object"><span /><i /></div>{hovered === project.number && <ProjectPreview variant={project.art} />}<span className="project-art-name">{project.name}</span><span className="project-hover">VIEW CASE STUDY ↗</span></div><div className="project-info"><div><span>{project.number} / {project.type}</span><h3>{project.name}</h3></div><span>{project.year} ↗</span></div></button>)}</div>{selected && <div className="modal-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) setSelected(null); }}><div className="project-dialog" role="dialog" aria-modal="true" aria-label={`${selected.name} project details`}><button className="dialog-close" type="button" aria-label="Close project details" onClick={() => setSelected(null)}>×</button><div className={`project-image ${selected.art}`}><div className="project-object"><span /><i /></div><span className="project-art-name">{selected.name}</span></div><div className="dialog-content"><span>{selected.category.toUpperCase()} / {selected.year}</span><h2>{selected.name}</h2><p>{selected.description}</p><a href="#contact" onClick={() => setSelected(null)}>LET&apos;S MAKE SOMETHING TOGETHER ↗</a></div></div></div>}</section>;
}
