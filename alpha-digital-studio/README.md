# Alpha Digital Studio

A creative technology agency website built with Next.js App Router, TypeScript, Tailwind CSS, direct Three.js, GSAP ScrollTrigger, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run lint`, `npm run typecheck`, and `npm run build`, then `npm run start`.

## Contact delivery

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY`: a Resend API key.
- `CONTACT_TO_EMAIL`: the inbox that receives inquiries.
- `CONTACT_FROM_EMAIL`: an address on a verified sending domain, for example `Alpha Studio <hello@yourdomain.com>`.
- `NEXT_PUBLIC_CONTACT_EMAIL`: the public fallback email address shown on the site.

The contact endpoint validates input, uses a honeypot field, and sends plain-text email through Resend. Without these values it returns a configuration message and the visible email link remains available. Replace the sample concept projects and agency copy with verified work before publishing.

## Structure

```text
app/                 App Router page, layout, styles, contact API
components/          Navigation, scroll effects, footer
components/sections/ Hero, services, work, about, process, contact
components/three/    Direct Three.js canvas scenes
hooks/               Motion preference hook
lib/                 Content data
public/              Local SVG project artwork and favicon
styles/              Animation styles
legacy-static/       Previous static site, kept for reference
```

All three WebGL scenes pause when offscreen and dispose resources when unmounted. Reduced-motion settings disable the 3D canvases and scroll animation.
