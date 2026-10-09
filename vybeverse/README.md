# VYBEVERSE

An interactive creator portfolio built with Next.js App Router, TypeScript, Tailwind CSS, vanilla Three.js, custom GLSL, GSAP ScrollTrigger, and Lucide React.

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` for a production check.

## Customize the portfolio

Edit `src/data/content.ts` for the creator identity, biography, Reel metadata, gallery, verified collaborations, and verified statistics. The included Unsplash images are **visual placeholders**. Replace them with your own licensed images before publishing. Add a `video` URL to each Reel for playback and an `instagramUrl` for the original Reel. Video assets load only when a visitor opens the player. If there is no video, the player shows the cover image.

The collaboration and statistics sections are intentionally empty until real information is supplied. The content galaxy and portal navigation remain usable without it.

## Contact delivery

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. The sender address must be verified with Resend. The form posts to `/api/contact`, validates all fields, and reports delivery failure if the endpoint is not configured or the email provider rejects the request.

## Deploy

Deploy this directory to Vercel or any Node-compatible Next.js host. Add the same three contact environment variables in the host settings. Run `npm run build` and start with `npm start` for self-hosting.

The Three.js canvas caps pixel ratio, uses fewer particles on mobile, pauses drawing when hidden, responds to WebGL context loss, and disposes resources on unmount. Reduced-motion preferences disable decorative movement. Standard links provide navigation without the canvas.
