"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner shell">
        <Link href="#top" className="brand" aria-label="Alpha Digital Studio, back to top" onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true"><span /></span>
          <span>alpha<span className="brand-period">.</span><small>DIGITAL STUDIO</small></span>
        </Link>
        <nav className={`primary-nav ${open ? "is-open" : ""}`} aria-label="Main navigation" id="main-navigation">
          {links.map((link, index) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              <span className="nav-index">0{index + 1}</span>{link.label}
            </a>
          ))}
          <a className="mobile-nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={18} /></a>
        </nav>
        <a href="#contact" className="header-cta magnetic-button">LET&apos;S TALK <ArrowUpRight size={16} strokeWidth={1.8} /></a>
        <button className="nav-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
