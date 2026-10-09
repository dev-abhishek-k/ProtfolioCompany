import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> READY WHEN YOU ARE</span>
          <h2>Let&apos;s make<br /><em>something matter.</em></h2>
        </div>
        <a className="footer-orb" href="#contact" aria-label="Go to contact form"><ArrowUpRight size={36} strokeWidth={1.2} /></a>
      </div>
      <div className="shell footer-bottom">
        <Link href="#top" className="footer-logo">alpha<span>.</span></Link>
        <p>Independent minds. Connected ideas.<br />Made for what&apos;s next.</p>
        <nav aria-label="Footer navigation">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a>
        </nav>
        <a className="footer-email" href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com"}`}>
          {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com"} <ArrowRight size={15} />
        </a>
      </div>
      <div className="shell footer-legal"><span>© {new Date().getFullYear()} ALPHA DIGITAL STUDIO</span><span>DESIGNED TO MOVE FORWARD</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
