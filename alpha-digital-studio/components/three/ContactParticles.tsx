"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactParticles() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: "low-power" }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    renderer.setClearColor(0x050505, 0);
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 50);
    camera.position.z = 8;
    const count = window.innerWidth < 700 ? 55 : 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0x728aff, size: 0.035, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    let frame = 0, visible = true, last = 0, elapsed = 0;
    const resize = () => { camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1); camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight); renderer.render(scene, camera); };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(mount); resize();
    const tick = (now: number) => {
      frame = 0; if (!visible || document.hidden) return;
      const delta = Math.min((now - (last || now)) / 1000, 0.05); last = now; elapsed += delta;
      points.rotation.y = Math.sin(elapsed * 0.09) * 0.11;
      points.position.y = Math.sin(elapsed * 0.27) * 0.13;
      renderer.render(scene, camera); frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); } };
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    visibilityObserver.observe(mount);
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    document.addEventListener("visibilitychange", onVisibility); start();
    return () => { cancelAnimationFrame(frame); resizeObserver.disconnect(); visibilityObserver.disconnect(); document.removeEventListener("visibilitychange", onVisibility); geometry.dispose(); material.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);

  return <div className="contact-particles" ref={mountRef} aria-hidden="true" />;
}
