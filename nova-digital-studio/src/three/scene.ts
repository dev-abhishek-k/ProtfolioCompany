import * as THREE from "three";
import { createCamera, resizeCamera } from "./camera";
import { createRenderer } from "./renderer";
import { createArtwork } from "./objects";
import { createParticles } from "./particles";
import { animateArtwork } from "./animations";

export class SceneManager {
  private scene = new THREE.Scene();
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private artwork;
  private particles;
  private pointer = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private raf = 0;
  private previous = 0;
  private elapsed = 0;
  private hover = 0;
  private impulse = 0;
  private scroll = 0;
  private storyProgress = 0;
  private visible = false;
  private heroVisible = true;
  private storyVisible = false;
  private observer: IntersectionObserver;
  private mobile = window.innerWidth < 700;
  private lost = false;

  constructor(private canvas: HTMLCanvasElement, private hero: HTMLElement, private story: HTMLElement, private reducedMotion: boolean, private onContextLost: () => void) {
    this.renderer = createRenderer(canvas);
    this.scene.fog = new THREE.FogExp2(0x080b1a, 0.018);
    this.camera = createCamera(window.innerWidth, window.innerHeight);
    this.artwork = createArtwork(this.scene, this.renderer);
    this.particles = createParticles(this.scene, this.mobile);
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) this.heroVisible = entry.isIntersecting;
        if (entry.target === story) this.storyVisible = entry.isIntersecting;
      });
      this.updateVisibility();
    }, { rootMargin: "150px" });
    this.observer.observe(hero);
    this.observer.observe(story);
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
    window.addEventListener("scroll", this.onScroll, { passive: true });
    document.addEventListener("visibilitychange", this.updateVisibility);
    canvas.addEventListener("webglcontextlost", this.onWebGLLost);
    this.onScroll();
    this.updateVisibility();
    if (reducedMotion) this.drawStatic();
  }

  private onResize = () => {
    this.mobile = window.innerWidth < 700;
    resizeCamera(this.camera, window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    if (this.reducedMotion) this.drawStatic();
  };

  private onPointerMove = (event: PointerEvent) => {
    if (this.reducedMotion) return;
    this.pointer.set(event.clientX / window.innerWidth * 2 - 1, -(event.clientY / window.innerHeight * 2 - 1));
    if (!this.heroVisible && !this.storyVisible) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects([this.artwork.core, ...this.artwork.satellites], false);
    this.hover = hits.length && (this.hero.contains(event.target as Node) || this.story.contains(event.target as Node)) ? 1 : 0;
    this.canvas.dataset.hovered = this.hover ? "true" : "false";
  };

  private onPointerDown = () => { if (this.hover) this.impulse = 1; };

  private onScroll = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    this.scroll = Math.min(1, window.scrollY / max);
    const rect = this.story.getBoundingClientRect();
    this.storyProgress = THREE.MathUtils.clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
    if (this.reducedMotion) this.drawStatic();
  };

  private updateVisibility = () => {
    const shouldRender = !this.lost && document.visibilityState === "visible" && (this.heroVisible || this.storyVisible);
    if (shouldRender === this.visible) return;
    this.visible = shouldRender;
    if (shouldRender) {
      this.previous = performance.now();
      if (this.reducedMotion) this.drawStatic();
      else this.raf = requestAnimationFrame(this.frame);
    } else cancelAnimationFrame(this.raf);
  };

  private onWebGLLost = (event: Event) => {
    event.preventDefault();
    this.lost = true;
    this.updateVisibility();
    this.onContextLost();
  };

  private drawStatic() {
    if (this.lost) return;
    animateArtwork(this.artwork, this.camera, this.particles.points, { time: 0, delta: 1, pointer: new THREE.Vector2(), scroll: this.scroll, story: this.storyProgress, hover: 0, impulse: 0, mobile: this.mobile, reducedMotion: true });
    this.renderer.render(this.scene, this.camera);
  }

  private frame = (now: number) => {
    if (!this.visible) return;
    const delta = Math.min((now - this.previous) / 1000, 0.05);
    this.previous = now;
    this.elapsed += delta;
    this.impulse = THREE.MathUtils.lerp(this.impulse, 0, Math.min(1, delta * 2.5));
    animateArtwork(this.artwork, this.camera, this.particles.points, { time: this.elapsed, delta, pointer: this.pointer, scroll: this.scroll, story: this.storyProgress, hover: this.hover, impulse: this.impulse, mobile: this.mobile, reducedMotion: false });
    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.frame);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.observer.disconnect();
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("visibilitychange", this.updateVisibility);
    this.canvas.removeEventListener("webglcontextlost", this.onWebGLLost);
    this.artwork.dispose();
    this.particles.dispose();
    this.renderer.dispose();
  }
}
