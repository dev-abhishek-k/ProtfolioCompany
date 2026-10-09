"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const vertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vWave;
  void main() {
    float wave = sin(position.y * 3.1 + uTime * 1.4) * 0.048;
    vec3 displaced = position + normal * wave;
    vWave = wave;
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vWave;
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDirection = normalize(-vViewPosition);
    float rim = pow(1.0 - max(dot(normal, viewDirection), 0.0), 2.4);
    float light = max(dot(normal, normalize(vec3(-0.6, 0.8, 1.0))), 0.0);
    float flow = sin(vViewPosition.y * 2.1 + uTime * 0.55 + vWave * 8.0) * 0.5 + 0.5;
    vec3 blue = vec3(0.02, 0.26, 0.92);
    vec3 violet = vec3(0.38, 0.08, 0.85);
    vec3 color = mix(blue, violet, flow);
    color *= 0.46 + light * 0.78;
    color += vec3(0.24, 0.58, 1.0) * rim * 1.5;
    color += vec3(0.85, 0.58, 1.0) * pow(light, 5.0) * 0.7;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ThreeExperience() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const mobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.15 : 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setClearColor(0x050505, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050b, 0.018);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);
    const world = new THREE.Group();
    scene.add(world);

    const uniforms = { uTime: { value: 0 } };
    const mainGeometry = new THREE.TorusKnotGeometry(1.43, 0.4, 256, 36, 3, 5);
    const mainMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const main = new THREE.Mesh(mainGeometry, mainMaterial);
    world.add(main);

    const cageGeometry = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.33, 2), 20);
    const cageMaterial = new THREE.LineBasicMaterial({ color: 0x7666ff, transparent: true, opacity: 0.2 });
    const cage = new THREE.LineSegments(cageGeometry, cageMaterial);
    world.add(cage);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.63, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({ color: 0x6679ff, transparent: true, opacity: 0.5 })
    );
    ring.rotation.set(0.75, 0.22, -0.33);
    world.add(ring);

    const satelliteMaterial = new THREE.MeshPhysicalMaterial({ color: 0x477bff, metalness: 0.4, roughness: 0.17, clearcoat: 1, emissive: 0x102d83 });
    const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 2), satelliteMaterial);
    satellite.position.set(2.42, 1.12, 0.6);
    world.add(satellite);
    const satelliteTwo = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.13, 1),
      new THREE.MeshPhysicalMaterial({ color: 0xc598ff, metalness: 0.55, roughness: 0.12, emissive: 0x402075 })
    );
    satelliteTwo.position.set(-2.3, -1.5, 0.8);
    world.add(satelliteTwo);

    const particleCount = mobile ? 110 : 260;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const index = i * 3;
      positions[index] = (Math.random() - 0.5) * 16;
      positions[index + 1] = (Math.random() - 0.5) * 11;
      positions[index + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0xaabaff, size: 0.026, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0x6a7cbb, 1.5);
    scene.add(ambient);
    const lightA = new THREE.PointLight(0x377cff, 65);
    lightA.position.set(3, 3, 5);
    scene.add(lightA);
    const lightB = new THREE.PointLight(0xa347ff, 55);
    lightB.position.set(-4, -2, 3);
    scene.add(lightB);

    let pointerX = 0;
    let pointerY = 0;
    let progress = 0;
    let visible = true;
    let frame = 0;
    let last = 0;
    let time = 0;

    const positionScene = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      world.position.set(width < 640 ? 0.52 : width < 1000 ? 1.45 : 2.55, width < 640 ? -0.95 : 0, 0);
      world.scale.setScalar(width < 640 ? 0.68 : width < 1000 ? 0.82 : 1);
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(positionScene);
    observer.observe(mount);
    positionScene();

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const render = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      time += delta;
      uniforms.uTime.value = time;
      world.rotation.x += ((pointerY * 0.32) + time * 0.08 - world.rotation.x) * 0.035;
      world.rotation.y += ((pointerX * 0.4) + time * 0.13 + progress * 0.9 - world.rotation.y) * 0.035;
      main.rotation.z = Math.sin(time * 0.28) * 0.1;
      cage.rotation.set(time * -0.035, time * 0.05, time * 0.02);
      ring.rotation.z = -0.33 + time * 0.08;
      satellite.position.y = 1.12 + Math.sin(time * 1.1) * 0.17;
      satelliteTwo.position.y = -1.5 + Math.cos(time * 0.9) * 0.13;
      satellite.rotation.y += delta * 0.5;
      satelliteTwo.rotation.x += delta * 0.4;
      particles.rotation.y = time * 0.004 + pointerX * 0.035;
      camera.position.y += (-progress * 0.5 + pointerY * -0.12 - camera.position.y) * 0.035;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    const start = () => { if (!frame && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(render); } };
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    visibilityObserver.observe(mount);
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const scrollTrigger = ScrollTrigger.create({ trigger: mount.closest(".hero") || mount, start: "top top", end: "bottom top", scrub: true, onUpdate: self => { progress = self.progress; } });
    start();

    return () => {
      cancelAnimationFrame(frame);
      scrollTrigger.kill();
      observer.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => material.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-webgl" ref={mountRef} aria-hidden="true" />;
}
