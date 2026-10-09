# Abhishek — Full Stack Developer Portfolio

A Next.js App Router portfolio built with TypeScript, Tailwind CSS, vanilla Three.js, GSAP ScrollTrigger, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Verify a production build with `npm run build`.

## Personalize

Edit `src/data/portfolio.ts` for the introduction, background, skills, projects, experience, and links. Empty GitHub, LinkedIn, résumé, and project URLs are intentionally displayed as pending or omitted. Replace the four concept project descriptions with verified project details before publishing.

The contact form uses the Resend email API. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to a verified sender address. Until configured, the API returns a clear error and never reports success. Add `profile.email` to show a direct email link.

## Notes

The Three.js scene is loaded on the client, limits pixel density, pauses outside the viewport, reduces particles on small screens, and disposes resources on unmount. Reduced motion preferences disable decorative movement and scroll reveals.
