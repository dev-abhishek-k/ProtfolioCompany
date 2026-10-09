# AURA SOCIAL

An editorial influencer portfolio built with Next.js App Router, TypeScript, Tailwind CSS, vanilla Three.js, GSAP ScrollTrigger, and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production check, run `npm run build`.

## Before launch

The hero and about portrait is an AI-generated illustrative asset (`public/images/hero-generated.png`), made with the built-in image generation tool using this prompt: "Photorealistic horizontal fashion editorial photograph for a luxury website. Original adult woman in a fully covered tailored black blazer and high-neck top, framed waist up on the right side, deep charcoal studio backdrop with dark empty left half for text, warm soft side lighting, natural skin texture, elegant calm expression. No text, logos, watermark, or objects." The project images are illustrative stock photography. Replace these with the creator's licensed portraits and portfolio work. Replace `hello@aurasocial.studio` and the generic Instagram link in `src/components/Portfolio.tsx` with verified contact details. Update the biography and project captions to match the creator's actual story.

The Three.js scene is rendered directly on a canvas. Three.js and GSAP motion honor reduced-motion preferences.
