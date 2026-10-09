"use client";

import { useEffect, useState } from "react";

const links = ["About", "Services", "Work", "Experience", "Contact"];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  return <section className="hero" id="hero" aria-labelledby="hero-title">
    <header className="site-header"><a className="wordmark" href="#hero" aria-label="Auralis home"><span className="wordmark-symbol">✳</span> AURALIS<span className="wordmark-period">.</span></a><nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</nav><a className="header-contact" href="#contact">LET&apos;S TALK <span>↗</span></a><button className="menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE ×" : "MENU +"}</button></header>
    {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link => <a href={`#${link.toLowerCase()}`} key={link} onClick={() => setMenuOpen(false)}>{link}<span>↗</span></a>)}</nav>}
    <div className="hero-grid" /><div className="hero-aura" />
    <div className="hero-inner"><div className="hero-kicker"><span className="pulse-dot" /> INDEPENDENT DIGITAL ATELIER <span className="kicker-rule" /> EST. 2020</div><h1 id="hero-title"><span className="title-row">WE MAKE</span><span className="title-row title-italic">THE FUTURE</span><span className="title-row">TANGIBLE<span className="title-period">.</span></span></h1><div className="hero-lower"><p>Strategy, design, and technology converge to create remarkable digital worlds for ambitious brands.</p><div className="hero-buttons"><a className="button button-light" href="#work">EXPLORE OUR WORK <span>↗</span></a><a className="button button-outline" href="#contact">START A PROJECT <span>↗</span></a></div></div></div>
    <div className="hero-vertical">EXPERIMENTAL BY NATURE — 2026</div><div className="hero-bottom"><span>SCROLL TO DISCOVER ↓</span><span>DESIGN / TECHNOLOGY / IMAGINATION</span><span>01 — 06</span></div>
  </section>;
}
