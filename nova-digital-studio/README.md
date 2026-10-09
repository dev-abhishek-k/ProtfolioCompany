# Auralis — pure Three.js digital atelier

A cinematic agency site built with Next.js App Router, TypeScript, Tailwind CSS, and the native Three.js API. The hero and scroll story share one renderer. Portfolio objects use a second renderer only while a desktop card is hovered.

## Run

npm ci
npm run dev

Open the local address printed by Next.js. Validate with npm run lint and npm run build.

## Architecture

- src/three/scene.ts owns the hero renderer, visibility, pointer and scroll listeners, raycasting, animation frame, and cleanup.
- src/three/camera.ts, renderer.ts, objects.ts, particles.ts, and animations.ts contain the reusable Three.js setup and update logic.
- src/shaders/*.glsl define the vertex displacement and fresnel color shader. Turbopack loads these files as text with raw-loader.
- src/hooks/useThreeScene.ts mounts the scene on the client and shows a CSS fallback when WebGL is unavailable.
- src/components/ProjectPreview.tsx creates a temporary native Three.js preview on portfolio card hover.

The canvas caps device pixel ratio, uses fewer particles on mobile, stops rendering when the relevant sections or document are hidden, honors reduced motion, and disposes its WebGL resources and listeners on unmount.

The showcase names, metrics, and project descriptions are demonstration content. The contact form opens the visitor's email application with their message filled in. Replace hello@auralis.studio with your real receiving address before publishing.
