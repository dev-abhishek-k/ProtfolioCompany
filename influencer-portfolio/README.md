# MONOCHROME MUSE

An interactive editorial fashion museum built with Next.js App Router, TypeScript, Tailwind CSS, vanilla Three.js, GLSL, GSAP ScrollTrigger, and Lucide React.

## Run

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Verify with `npm run lint` and `npm run build`.

## Add creator content

Edit `src/data/site.ts` for the creator biography, photos, Reel cover images, video URLs, Instagram links, and contact details. Current Unsplash images are editorial layout previews. Replace them with licensed creator work before publishing. Reels without a `video` URL open their cover photograph; Reels with a video play in the fullscreen viewer. Set `instagramUrl` to show a direct Instagram link.

The Three.js exhibition uses the first six entries in `gallery`. Its images are loaded into framed planes, and clicking a frame opens the matching gallery item.

## Contact delivery

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` to a verified Resend sender. The form reports success only after the email API confirms delivery. Set `NEXT_PUBLIC_SITE_URL` to your deployed URL for metadata.

## Deploy

Deploy this directory as a Next.js project on a Node-compatible host, then set the same environment variables there. Run `npm run build` and `npm start` when self-hosting.

The 3D canvas caps pixel ratio and disposes its objects on unmount. The site also supports reduced motion, responsive layouts, keyboard access, and Escape to close the media viewer.
