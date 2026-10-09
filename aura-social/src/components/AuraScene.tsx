'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AuraScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
    camera.position.set(0, 0, 11);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.65;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.appendChild(renderer.domElement);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.19, envMapIntensity: 1.8 });
    const paleGold = new THREE.MeshStandardMaterial({ color: 0xf4df9b, metalness: 0.9, roughness: 0.25 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0xf6deb0, metalness: 0.06, roughness: 0.08, transmission: 0.9, thickness: 0.55, transparent: true, opacity: 0.7, clearcoat: 1, clearcoatRoughness: 0.03, ior: 1.45 });
    const group = new THREE.Group();
    scene.add(group);

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.075, 18, 120), gold);
    ringA.rotation.set(0.25, -0.32, -0.25);
    ringA.position.set(0.6, 0, -1.4);
    group.add(ringA);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.035, 14, 120), paleGold);
    ringB.rotation.set(-0.32, 0.62, 0.38);
    ringB.position.set(0.6, 0, -1.1);
    group.add(ringB);
    const ringC = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.023, 12, 120), gold);
    ringC.rotation.set(0.35, 0.2, 0.55);
    ringC.position.set(0.6, 0, -2.3);
    group.add(ringC);

    const bottle = new THREE.Group();
    bottle.position.set(0.6, -0.28, 0.2);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.58, 1.65, 8, 1, false), glass);
    body.castShadow = true;
    bottle.add(body);
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.52, 0.55, 8), new THREE.MeshPhysicalMaterial({ color: 0xb98431, metalness: 0.25, roughness: 0.1, transmission: 0.42, transparent: true, opacity: 0.48 }));
    liquid.position.y = -0.5;
    bottle.add(liquid);
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.26, 20), gold);
    neck.position.y = 0.95;
    bottle.add(neck);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.42, 8), paleGold);
    cap.position.y = 1.27;
    cap.castShadow = true;
    bottle.add(cap);
    group.add(bottle);
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.12, 48), new THREE.MeshStandardMaterial({ color: 0x17130e, metalness: 0.55, roughness: 0.36 }));
    plinth.position.set(0.6, -1.34, 0.2);
    plinth.receiveShadow = true;
    group.add(plinth);

    const key = new THREE.SpotLight(0xffe8b2, 115, 35, Math.PI / 5, 0.5, 1);
    key.position.set(-4, 6, 8);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.PointLight(0xd4af37, 75, 28);
    rim.position.set(5, -2, 5);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));

    let px = 0, py = 0, sx = 0, sy = 0, scroll = 0, frame = 0;
    const onPointer = (e: PointerEvent) => { px = (e.clientX / window.innerWidth - 0.5) * 2; py = (e.clientY / window.innerHeight - 0.5) * 2; };
    const onScroll = () => { scroll = Math.min(window.scrollY / window.innerHeight, 1.5); };
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('scroll', onScroll, { passive: true });
    const startedAt = performance.now();
    const animate = () => {
      const t = (performance.now() - startedAt) / 1000;
      sx += (px - sx) * 0.035;
      sy += (py - sy) * 0.035;
      if (!reduced) {
        group.rotation.y = sx * 0.16 + t * 0.045;
        group.rotation.x = -sy * 0.1 + scroll * 0.12;
        ringA.rotation.z = -0.25 + t * 0.055;
        ringB.rotation.z = 0.38 - t * 0.07;
        bottle.rotation.y = t * 0.12 + sx * 0.16;
        bottle.position.y = -0.28 + Math.sin(t * 0.8) * 0.1 - scroll * 0.25;
        camera.position.x += (sx * 0.24 - camera.position.x) * 0.025;
        camera.position.y += (-sy * 0.17 - scroll * 0.15 - camera.position.y) * 0.025;
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => { if (object instanceof THREE.Mesh) { object.geometry.dispose(); if (object.material instanceof THREE.Material) object.material.dispose(); } });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="aura-scene" aria-hidden="true" />;
}
