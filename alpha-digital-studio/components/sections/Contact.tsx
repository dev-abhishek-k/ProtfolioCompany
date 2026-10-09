"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Check, LoaderCircle, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

const ContactParticles = dynamic(() => import("@/components/three/ContactParticles"), { ssr: false });
type Status = "idle" | "sending" | "success" | "error";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus("sending"); setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result: { message?: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "The message could not be sent. Please try again.");
      form.reset(); setStatus("success"); setMessage("Thanks — your message is on its way. We’ll be in touch.");
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Something went wrong. Please email us directly.");
    }
  }

  return (
    <section id="contact" className="contact-section section-space">
      <ContactParticles />
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell contact-layout">
        <div className="contact-copy" data-reveal><span className="eyebrow"><span className="eyebrow-dot" /> THE NEXT MOVE <span className="eyebrow-number">/ 05</span></span><h2>Have something<br /><em>brilliant in mind?</em></h2><p>Big idea, early sketch, complex challenge — we&apos;d love to hear it. Tell us what you&apos;re imagining and let&apos;s see where it can go.</p><a href={`mailto:${contactEmail}`} className="contact-email"><Mail size={18} /> {contactEmail} <ArrowUpRight size={17} /></a><span className="contact-side-note">INDEPENDENT THINKING. EXTRAORDINARY OUTCOMES.</span></div>
        <form className="contact-form glass-card" onSubmit={submit} data-reveal><div className="form-top"><span>PROJECT INQUIRY</span><span>01 — 04</span></div><div className="form-row"><label htmlFor="contact-name">YOUR NAME <span>*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="How should we call you?" required minLength={2} maxLength={80} /></div><div className="form-row"><label htmlFor="contact-email">EMAIL ADDRESS <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></div><div className="form-row"><label htmlFor="contact-project">PROJECT TYPE <span>*</span></label><select id="contact-project" name="project" required defaultValue=""><option value="" disabled>Select what fits best</option><option>Website or digital experience</option><option>Mobile app or product</option><option>AI or automation</option><option>Brand and design</option><option>Something else</option></select></div><div className="form-row"><label htmlFor="contact-message">TELL US ABOUT IT <span>*</span></label><textarea id="contact-message" name="message" rows={4} placeholder="The idea, the challenge, or your first question..." required minLength={10} maxLength={3000} /></div><div className="honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div><button type="submit" className="button button-primary form-submit" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className="spin" size={18} /> Sending...</> : status === "success" ? <><Check size={18} /> Send another message</> : <>Send your message <ArrowUpRight size={18} /></>}</button><p className={`form-status ${status}`} role="status" aria-live="polite">{message || "We’ll only use your details to respond to your inquiry."}</p></form>
      </div>
    </section>
  );
}
