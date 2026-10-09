"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ProjectPreview({ variant }: { variant: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { canvas.classList.add("preview-failed"); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 30);
    camera.position.set(0, 0, 6.4);
    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.PointLight(0xb1a6ff, 55, 15);
    key.position.set(3, 3, 4);
    const rim = new THREE.PointLight(0x81e4f7, 40, 15);
    rim.position.set(-3, -2, 2);
    scene.add(key, rim);
    const geometry = variant === "nocturne" ? new THREE.CylinderGeometry(1, 0.75, 2.5, 64, 1) : variant === "form" ? new THREE.TorusKnotGeometry(1, 0.35, 160, 24, 2, 3) : variant === "mono" ? new THREE.BoxGeometry(2.15, 2.15, 0.65, 5, 5, 2) : new THREE.IcosahedronGeometry(1.4, 3);
    const material = new THREE.MeshPhysicalMaterial({ color: variant === "nocturne" ? 0x9d745f : variant === "mono" ? 0x9cb5bf : variant === "form" ? 0xb69afa : 0x83bfe8, metalness: 0.74, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08, flatShading: variant === "aether" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.04, 0.02, 8, 100), new THREE.MeshBasicMaterial({ color: 0xc5daff, transparent: true, opacity: 0.62 }));
    orbit.rotation.x = 0.9;
    scene.add(orbit);
    const pointer = new THREE.Vector2();
    let raf = 0;
    let visible = document.visibilityState === "visible";
    let last = performance.now();
    let elapsed = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.25));
      renderer.setSize(rect.width, rect.height, false);
    };
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, (event.clientY - rect.top) / rect.height * 2 - 1);
    };
    const frame = (now: number) => {
      if (!visible) return;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += delta;
      mesh.rotation.y += delta * 0.35;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pointer.y * 0.22, 0.06);
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, -pointer.x * 0.18, 0.06);
      mesh.position.y = Math.sin(elapsed * 1.1) * 0.07;
      orbit.rotation.z += delta * 0.1;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      cancelAnimationFrame(raf);
      if (visible) { last = performance.now(); raf = requestAnimationFrame(frame); }
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.parentElement?.addEventListener("pointermove", onMove);
    document.addEventListener("visibilitychange", onVisibility);
    if (visible) raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.parentElement?.removeEventListener("pointermove", onMove);
      geometry.dispose(); material.dispose(); orbit.geometry.dispose(); (orbit.material as THREE.Material).dispose(); renderer.dispose();
    };
  }, [variant]);
  return <canvas ref={canvasRef} className="project-webgl" aria-hidden="true" />;
}
