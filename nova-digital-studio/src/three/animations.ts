import * as THREE from "three";
import type { Artwork } from "./objects";

export type AnimationState = { time: number; delta: number; pointer: THREE.Vector2; scroll: number; story: number; hover: number; impulse: number; mobile: boolean; reducedMotion: boolean };

export function animateArtwork(art: Artwork, camera: THREE.PerspectiveCamera, particles: THREE.Points, state: AnimationState) {
  const ease = Math.min(1, state.delta * 2.5);
  const float = state.reducedMotion ? 0 : Math.sin(state.time * 0.8) * 0.12;
  const storyShift = state.story * 0.75;
  const x = state.mobile ? 0 : 1.68 - storyShift * 0.5;
  art.group.position.x = THREE.MathUtils.lerp(art.group.position.x, x + state.pointer.x * 0.16, ease);
  art.group.position.y = THREE.MathUtils.lerp(art.group.position.y, float - storyShift * 0.5, ease);
  art.group.rotation.y += state.reducedMotion ? 0 : state.delta * (0.12 + state.hover * 0.13 + state.impulse * 0.7);
  art.group.rotation.x = THREE.MathUtils.lerp(art.group.rotation.x, state.pointer.y * 0.18 + state.story * 0.5, ease);
  art.group.rotation.z = THREE.MathUtils.lerp(art.group.rotation.z, -state.pointer.x * 0.16 + state.story * 0.25, ease);
  const scale = 1 + state.hover * 0.07 + state.story * 0.14;
  art.group.scale.setScalar(THREE.MathUtils.lerp(art.group.scale.x, scale, ease));
  art.rings[0].rotation.z += state.reducedMotion ? 0 : state.delta * 0.1;
  art.rings[1].rotation.y -= state.reducedMotion ? 0 : state.delta * 0.09;
  art.satellites.forEach((item, index) => { item.rotation.y += state.reducedMotion ? 0 : state.delta * (0.25 + index * 0.04); });
  art.uniforms.uTime.value = state.time;
  art.uniforms.uHover.value = THREE.MathUtils.lerp(art.uniforms.uHover.value, state.hover, ease * 2);
  art.uniforms.uMorph.value = THREE.MathUtils.lerp(art.uniforms.uMorph.value, 0.3 + state.story * 0.52 + state.hover * 0.17, ease);
  camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.14 + state.story * 0.7, ease);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, -state.pointer.y * 0.12 + state.story * 0.2, ease);
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8.7 - state.story * 1.15 + state.scroll * 0.25, ease);
  camera.lookAt(0, 0, 0);
  art.lights.key.intensity = THREE.MathUtils.lerp(art.lights.key.intensity, 72 + state.hover * 20 + state.story * 15, ease);
  art.lights.rim.position.x = -4 + Math.sin(state.time * 0.5) * 1.2;
  particles.rotation.y = THREE.MathUtils.lerp(particles.rotation.y, state.pointer.x * 0.07 + state.scroll * 0.3, ease * 0.3);
  particles.rotation.x = THREE.MathUtils.lerp(particles.rotation.x, -state.pointer.y * 0.05, ease * 0.3);
}
