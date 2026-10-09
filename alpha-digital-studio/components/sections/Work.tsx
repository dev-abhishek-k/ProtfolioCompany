"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, projects } from "@/lib/data";

type Category = (typeof categories)[number];
type Project = (typeof projects)[number];

export function Work() {
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = projects.filter(project => category === "All" || project.category === category);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
    if (!selected && dialog?.open) dialog.close();
  }, [selected]);

  return (
    <section className="work-section section-space" id="work">
      <div className="shell">
        <div className="section-heading" data-reveal><span className="eyebrow"><span className="eyebrow-dot" /> SELECTED CONCEPTS <span className="eyebrow-number">/ 02</span></span><div className="section-heading-row"><h2>Ideas made<br /><em>visible.</em></h2><p>A collection of self-initiated concepts that show the kind of stories and systems we love to build.</p></div></div>
        <div className="work-toolbar" data-reveal><div className="work-filters" role="group" aria-label="Filter projects">{categories.map(item => <button key={item} type="button" className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><span>{String(visible.length).padStart(2, "0")} PROJECTS</span></div>
        <div className="work-grid" aria-live="polite">
          {visible.map(project => (
            <button className={`work-card tone-${project.tone}`} key={project.id} type="button" onClick={() => setSelected(project)} aria-label={`View ${project.title} project details`}>
              <span className="work-image"><Image src={project.image} alt={`${project.title} concept artwork`} width={1200} height={900} sizes="(max-width: 760px) 100vw, 50vw" unoptimized /><span className="work-image-arrow"><ArrowUpRight size={23} /></span></span>
              <span className="work-card-meta"><span><small>{project.category.toUpperCase()} / {project.id}</small><strong>{project.title}</strong></span><span className="work-card-summary">{project.summary}</span></span>
            </button>
          ))}
        </div>
        <div className="work-end" data-reveal><span>GOT SOMETHING AMBITIOUS IN MIND?</span><a href="#contact">LET&apos;S BUILD IT <ArrowUpRight size={17} /></a></div>
      </div>
      <dialog ref={dialogRef} className="project-dialog" aria-label={selected ? `${selected.title} project details` : "Project details"} onClose={() => setSelected(null)} onClick={event => { if (event.target === dialogRef.current) setSelected(null); }}>
        {selected && <><button className="dialog-close" type="button" onClick={() => setSelected(null)} aria-label="Close project details"><X size={24} /></button><div className="dialog-image"><Image src={selected.image} alt={`${selected.title} concept artwork`} width={1200} height={900} sizes="(max-width: 900px) 100vw, 60vw" unoptimized /></div><div className="dialog-content"><span className="eyebrow"><span className="eyebrow-dot" /> {selected.category.toUpperCase()} / CONCEPT {selected.id}</span><h3>{selected.title}</h3><p>{selected.summary}</p><div className="dialog-divider" /><span className="dialog-service">{selected.services}</span><a className="button button-primary" href="#contact" onClick={() => setSelected(null)}>Discuss a similar project <ArrowUpRight size={18} /></a></div></>}
      </dialog>
    </section>
  );
}
