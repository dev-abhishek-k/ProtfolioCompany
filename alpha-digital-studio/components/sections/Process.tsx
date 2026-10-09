import { ArrowUpRight } from "lucide-react";

const steps = [
  { number: "01", title: "Discover", copy: "We listen, research, and find the real opportunity behind the brief." },
  { number: "02", title: "Define", copy: "We shape a clear idea and map the experience that will bring it to life." },
  { number: "03", title: "Create", copy: "Design, code, and motion come together through rapid iteration." },
  { number: "04", title: "Evolve", copy: "We refine, launch, and keep improving what people actually use." },
];

export function Process() {
  return (
    <section id="process" className="process-section section-space"><div className="shell"><div className="section-heading" data-reveal><span className="eyebrow"><span className="eyebrow-dot" /> THE WAY WE WORK <span className="eyebrow-number">/ 04</span></span><div className="section-heading-row"><h2>From idea to<br /><em>impact.</em></h2><p>Our process stays collaborative, transparent, and focused on what moves the work forward.</p></div></div><div className="process-grid">{steps.map(step => <article key={step.number} className="process-card" data-reveal><div className="process-card-top"><span>{step.number} / 04</span><ArrowUpRight size={20} strokeWidth={1.2} /></div><div><h3>{step.title}</h3><p>{step.copy}</p></div></article>)}</div></div></section>
  );
}
