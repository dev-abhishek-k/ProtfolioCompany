"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setValue(Math.round(end * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [end]);
  return <span ref={ref}>{value}{suffix}</span>;
}

export default function About() {
  return <section className="section about" id="about"><div className="section-index"><span>01 / THE STUDIO</span><span>WHO WE ARE</span></div><div className="about-main"><div data-reveal><p className="overline">A DIFFERENT KIND OF DIGITAL STUDIO</p><h2 className="section-title">Beyond<br />the <em>expected.</em></h2></div><div className="about-copy" data-reveal><p className="statement">The most powerful experiences do more than look beautiful. They make you <em>feel something.</em></p><p>We are an independent team of makers, thinkers, and explorers. We unite purposeful strategy, expressive design, and inventive technology to make what comes next impossible to ignore.</p><a className="text-link" href="#experience">DISCOVER OUR APPROACH <span>↗</span></a></div></div><div className="stat-grid" data-reveal><div><strong><Counter end={48} suffix="+" /></strong><span>PROJECTS RELEASED</span></div><div><strong><Counter end={12} /></strong><span>COUNTRIES REACHED</span></div><div><strong><Counter end={96} suffix="%" /></strong><span>HAPPY COLLABORATORS</span></div><div><strong><Counter end={6} /></strong><span>YEARS MAKING WAVES</span></div></div><div className="about-ornament" aria-hidden="true"><span /><span /><span /></div></section>;
}
