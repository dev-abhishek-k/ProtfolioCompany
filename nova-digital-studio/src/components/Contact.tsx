"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="contact" id="contact"><div className="section-index"><span>05 / LET&apos;S CONNECT</span><span>YOUR IDEA STARTS HERE</span></div><div className="contact-content" data-reveal><p className="overline">HAVE SOMETHING IN MIND?</p><h2>Let&apos;s make<br /><em>something matter.</em></h2><div className="contact-row"><p>Big idea, small question, or just a hello. We&apos;d love to hear what you&apos;re dreaming up.</p><a href="mailto:hello@auralis.studio">hello@auralis.studio <span>↗</span></a></div></div><form className="contact-form" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject: ${data.get("project")}\n\n${data.get("message")}`);
    window.location.href = `mailto:hello@auralis.studio?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }}><div className="form-grid"><label>YOUR NAME<input name="name" autoComplete="name" required placeholder="How should we call you?" /></label><label>EMAIL ADDRESS<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label></div><label>WHAT ARE WE MAKING?<select name="project" defaultValue=""><option value="" disabled>Select a project type</option><option>Website or digital platform</option><option>Immersive 3D experience</option><option>Brand or product design</option><option>Something else entirely</option></select></label><label>TELL US ABOUT IT<textarea name="message" required rows={4} placeholder="A few words about what you have in mind..." /></label><button className="button button-light" type="submit">{submitted ? "OPEN EMAIL APP" : "SEND AN INQUIRY"} <span>↗</span></button><p className="form-note">This opens your email app with your message ready to send.</p></form></section>;
}
