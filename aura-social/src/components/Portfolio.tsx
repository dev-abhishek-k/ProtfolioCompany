'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const AuraScene = dynamic(() => import('./AuraScene'), { ssr: false });

const work = [
  { number: '01', category: 'FASHION / EDITORIAL', title: 'The Art of Presence', image: '/images/editorial.jpg', alt: 'Fashion editorial clothing arrangement' },
  { number: '02', category: 'BEAUTY / STORYTELLING', title: 'Quiet Allure', image: '/images/beauty.jpg', alt: 'Beauty portrait in natural light' },
  { number: '03', category: 'TRAVEL / LIFESTYLE', title: 'Elsewhere, Always', image: '/images/travel.jpg', alt: 'Sunlit Mediterranean architecture' },
];

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 90, opacity: 0, duration: 1.3, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-line', { scaleX: 0, transformOrigin: 'left', duration: 1.5, delay: 0.8, ease: 'power2.out' });
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, { y: 55, opacity: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('.mask-image').forEach((el) => {
        gsap.from(el, { clipPath: 'inset(0 100% 0 0)', duration: 1.3, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
      });
      gsap.to('.about-image', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <div ref={root} className="site-shell">
    <header className="site-header">
      <a href="#top" className="brand" aria-label="AURA SOCIAL, home">AURA<span className="brand-dot">.</span><small>SOCIAL</small></a>
      <nav className={`navigation ${menuOpen ? 'navigation-open' : ''}`} aria-label="Main navigation">
        <a href="#about" onClick={() => setMenuOpen(false)}>THE STORY</a>
        <a href="#portfolio" onClick={() => setMenuOpen(false)}>PORTFOLIO</a>
        <a href="#collaborate" onClick={() => setMenuOpen(false)}>COLLABORATE</a>
      </nav>
      <a className="header-contact" href="mailto:hello@aurasocial.studio?subject=Let's%20collaborate">LET&apos;S TALK <ArrowUpRight size={15} /></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-photo"><Image src="/images/hero-generated.png" alt="Fashion editorial portrait" fill priority sizes="100vw" className="hero-img" /></div>
        <div className="hero-shade" />
        <AuraScene />
        <div className="hero-side hero-side-left">CURATED MOMENTS &nbsp; / &nbsp; 2026</div>
        <div className="hero-content">
          <p className="eyebrow hero-reveal"><span className="gold-diamond" /> A PERSONAL CREATIVE UNIVERSE</p>
          <h1 id="hero-title" className="hero-title"><span className="hero-reveal">BEYOND</span><span className="hero-reveal italic-line">THE FRAME<span className="period">.</span></span></h1>
          <div className="hero-line" />
          <div className="hero-bottom hero-reveal"><p>Fashion. Influence. Identity.</p><div className="hero-actions"><a href="#portfolio" className="button button-gold">EXPLORE PORTFOLIO <ArrowUpRight size={17} /></a><a href="#collaborate" className="button button-outline">COLLABORATE WITH ME <ArrowUpRight size={17} /></a></div></div>
        </div>
        <a href="#intro" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        <span className="hero-index">01 / 05</span>
      </section>

      <section id="intro" className="intro section-pad">
        <div className="section-kicker reveal"><span className="line-mark" /> THE AURA PHILOSOPHY <span>01 / THE VISION</span></div>
        <div className="intro-grid"><p className="intro-side reveal">AN OPEN INVITATION<br />TO SEE THINGS DIFFERENTLY.</p><div><h2 className="statement reveal">A world where <em>style</em> becomes a story, and every frame leaves a feeling.</h2><div className="intro-footer reveal"><p>Through fashion, beauty, and the places in between, AURA SOCIAL creates imagery that feels intimate, intentional, and impossible to scroll past.</p><span className="asterisk">✳</span></div></div></div>
      </section>

      <section id="portfolio" className="portfolio section-pad">
        <div className="section-kicker reveal"><span className="line-mark" /> SELECTED WORK <span>02 / THE PORTFOLIO</span></div>
        <div className="portfolio-heading"><h2 className="display-heading reveal">A visual <em>language.</em></h2><p className="reveal">An editorial collection of moments, moods, and stories made to stay with you.</p></div>
        <div className="work-grid">{work.map((item) => <article className="work-item" key={item.number}><div className="work-image mask-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 33vw" /><span className="work-view"><ArrowUpRight size={23} /></span></div><div className="work-meta"><span>{item.number} / {item.category}</span><ArrowUpRight size={16} /></div><h3>{item.title}</h3></article>)}</div>
      </section>

      <section id="about" className="about"><div className="about-visual mask-image"><Image src="/images/hero-generated.png" alt="Editorial portrait of the creator" fill sizes="(max-width: 850px) 100vw, 50vw" className="about-image" /><div className="about-caption">THE PERSON / BEHIND THE PERSPECTIVE</div></div><div className="about-content"><div className="section-kicker reveal"><span className="line-mark" /> ABOUT THE CREATOR <span>03 / THE STORY</span></div><h2 className="display-heading reveal">THE STORY<br />BEHIND <em>THE AURA.</em></h2><div className="about-rule reveal" /><p className="about-lead reveal">A point of view shaped by curiosity, considered details, and a love for beautiful stories.</p><p className="about-copy reveal">AURA SOCIAL lives at the intersection of personal style and visual storytelling. The work moves across fashion, beauty, lifestyle, and travel, always led by a simple idea: make the familiar feel extraordinary.</p><div className="specialties reveal"><span>FASHION</span><span>BEAUTY</span><span>LIFESTYLE</span><span>TRAVEL</span></div><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-link reveal"><Instagram size={17} /> EXPLORE INSTAGRAM <ArrowUpRight size={17} /></a></div></section>

      <section className="manifesto section-pad"><div className="section-kicker reveal"><span className="line-mark" /> THE CREATIVE APPROACH <span>04 / THE POINT OF VIEW</span></div><div className="manifesto-inner"><span className="manifesto-quote reveal">“</span><h2 className="reveal">The most powerful influence is the kind you <em>feel.</em></h2><p className="reveal">IMAGERY WITH INTENTION. STORIES WITH SOUL.</p></div></section>

      <section id="collaborate" className="collaborate section-pad"><div className="section-kicker reveal"><span className="line-mark" /> CREATE TOGETHER <span>05 / THE NEXT CHAPTER</span></div><div className="collab-grid"><div><p className="collab-overline reveal">FOR BRANDS, EDITORS & CREATIVE MINDS</p><h2 className="display-heading reveal">LET&apos;S MAKE<br /><em>AN IMPACT.</em></h2></div><div className="collab-right"><p className="reveal">From considered campaigns to compelling content, let&apos;s create something that looks exceptional and feels entirely your own.</p><a className="collab-link reveal" href="mailto:hello@aurasocial.studio?subject=Let's%20collaborate">START A CONVERSATION <ArrowUpRight size={28} /></a></div></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><a href="#top" className="footer-brand">AURA<span>.</span> SOCIAL</a><a href="#top" className="back-top">BACK TO TOP <ArrowRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} AURA SOCIAL</span><span>FASHION · INFLUENCE · IDENTITY</span><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">INSTAGRAM <ArrowUpRight size={13} /></a></div></footer>
  </div>;
}
