"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AboutScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.3));
    renderer.setClearColor(0x050505, 0);
    mount.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 7;
    const group = new THREE.Group();
    scene.add(group);
    const materials = [
      new THREE.MeshPhysicalMaterial({ color: 0x3d6dff, metalness: 0.6, roughness: 0.16, clearcoat: 1, emissive: 0x0b1b5a }),
      new THREE.MeshPhysicalMaterial({ color: 0x8963ff, metalness: 0.55, roughness: 0.2, clearcoat: 1, emissive: 0x241350 }),
      new THREE.MeshPhysicalMaterial({ color: 0xa5c4ff, metalness: 0.55, roughness: 0.15, clearcoat: 1 }),
    ];
    const shapes = [
      new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 4), materials[0]),
      new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.18, 24, 90), materials[1]),
      new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 1), materials[2]),
    ];
    shapes[0].position.set(0.15, -0.1, 0);
    shapes[1].position.set(-1.6, 1.35, -0.8);
    shapes[2].position.set(1.75, -1.45, 0.3);
    shapes.forEach(shape => group.add(shape));
    scene.add(new THREE.AmbientLight(0x9baaff, 1.5));
    const blue = new THREE.PointLight(0x4079ff, 55); blue.position.set(2, 3, 4); scene.add(blue);
    const purple = new THREE.PointLight(0xa346ff, 45); purple.position.set(-3, -2, 3); scene.add(purple);
    let frame = 0, visible = true, last = 0, elapsed = 0;
    const resize = () => {
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      group.scale.setScalar(mount.clientWidth < 400 ? 0.78 : 1);
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = Math.min((now - (last || now)) / 1000, 0.05); last = now; elapsed += delta;
      group.rotation.y = elapsed * 0.11;
      shapes[0].rotation.set(elapsed * 0.08, elapsed * 0.13, elapsed * 0.05);
      shapes[1].rotation.z = elapsed * -0.15;
      shapes[1].position.y = 1.35 + Math.sin(elapsed * 0.7) * 0.15;
      shapes[2].rotation.x = elapsed * 0.26;
      shapes[2].position.y = -1.45 + Math.cos(elapsed * 0.8) * 0.14;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(tick); } };
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    visibilityObserver.observe(mount);
    const onVisibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else start(); };
    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      cancelAnimationFrame(frame); resizeObserver.disconnect(); visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      shapes.forEach(shape => shape.geometry.dispose()); materials.forEach(material => material.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div className="about-webgl" ref={mountRef} aria-hidden="true" />;
}
