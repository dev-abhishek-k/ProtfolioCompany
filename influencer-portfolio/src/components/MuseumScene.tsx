'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gallery } from '@/data/site';

export default function MuseumScene({ onInspect }: { onInspect: (id: number) => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const inspect = useRef(onInspect);
  useEffect(() => { inspect.current = onInspect; }, [onInspect]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#e9e8e3');
    scene.fog = new THREE.Fog('#e9e8e3', 12, 33);
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 60);
    camera.position.set(0, 1.7, 8.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
    scene.add(new THREE.HemisphereLight('#ffffff', '#aaa9a4', 2.2));
    const spot = new THREE.DirectionalLight('#ffffff', 2.4);
    spot.position.set(-4, 7, 5); spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024);
    scene.add(spot);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 38), new THREE.ShaderMaterial({
      vertexShader: 'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader: 'varying vec2 vUv; void main(){float seam=step(.993,fract(vUv.x*9.0))*.035+step(.993,fract(vUv.y*13.0))*.035;float grain=fract(sin(dot(vUv*1800.0,vec2(12.9898,78.233)))*43758.5453)*.018;gl_FragColor=vec4(vec3(.79+grain-seam),1.0);}',
    }));
    floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const wallMat = new THREE.MeshStandardMaterial({ color: '#f7f7f4', roughness: .93 });
    const trimMat = new THREE.MeshStandardMaterial({ color: '#272727', roughness: .72 });
    function box(w: number, h: number, d: number, x: number, y: number, z: number, mat = wallMat) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh;
    }
    box(20, 6, .25, 0, 3, -12); box(.22, 6, 24, -5.4, 3, -1); box(.22, 6, 24, 5.4, 3, -1);
    box(11, .18, 24, 0, 5.95, -1);
    for (let z = 2; z > -10; z -= 4) {
      box(10.5, .045, .04, 0, .025, z, trimMat);
      const light = new THREE.PointLight('#fff9ed', 20, 7, 2);
      light.position.set(0, 5.3, z); scene.add(light);
    }
    const artwork: THREE.Mesh[] = [];
    const loader = new THREE.TextureLoader();
    gallery.slice(0, 6).forEach((item, i) => {
      const side = i % 2 ? 1 : -1;
      const z = 2.3 - Math.floor(i / 2) * 4.5;
      const portrait = i % 3 !== 2;
      const w = portrait ? 1.45 : 1.9, h = portrait ? 2.05 : 1.5;
      const pivot = new THREE.Group(); pivot.position.set(side * 5.22, 2.65, z); pivot.rotation.y = side * -Math.PI / 2; scene.add(pivot);
      const frame = new THREE.Mesh(new THREE.BoxGeometry(w + .18, h + .18, .10), trimMat); frame.castShadow = true; pivot.add(frame);
      const mat = new THREE.MeshBasicMaterial({ color: '#bcbab5', side: THREE.DoubleSide });
      const photo = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
      photo.position.z = .063; photo.userData.id = item.id; pivot.add(photo); artwork.push(photo);
      loader.load(item.image, texture => { texture.colorSpace = THREE.SRGBColorSpace; mat.map = texture; mat.color.set('#ffffff'); mat.needsUpdate = true; });
      const label = new THREE.Mesh(new THREE.BoxGeometry(.8, .08, .02), new THREE.MeshBasicMaterial({ color: '#242424' }));
      label.position.set(0, -h / 2 - .3, .03); pivot.add(label);
    });
    const sculpture = new THREE.Mesh(new THREE.TorusKnotGeometry(.63, .20, 120, 12, 2, 3), new THREE.MeshStandardMaterial({ color: '#ebe9e3', metalness: .47, roughness: .3 }));
    sculpture.position.set(0, 1.5, -5.6); sculpture.castShadow = true; scene.add(sculpture);
    box(1.7, .85, 1.7, 0, .42, -5.6);
    const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
    let mx = 0, my = 0, scroll = 0, raf = 0, hovered: THREE.Mesh | null = null;
    const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); mx = ((e.clientX - r.left) / r.width - .5) * 2; my = ((e.clientY - r.top) / r.height - .5) * 2; pointer.set(mx, -my); };
    const onScroll = () => { const bounds = host.getBoundingClientRect(); scroll = THREE.MathUtils.clamp(-bounds.top / Math.max(1, window.innerHeight * 1.5), 0, 1); };
    const onClick = () => { ray.setFromCamera(pointer, camera); const hits = ray.intersectObjects(artwork); if (hits[0]) inspect.current(hits[0].object.userData.id); };
    const resize = () => { const w = host.clientWidth, h = host.clientHeight; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
    const ro = new ResizeObserver(resize); ro.observe(host); resize(); onScroll();
    host.addEventListener('pointermove', onMove); host.addEventListener('click', onClick); window.addEventListener('scroll', onScroll, { passive: true });
    const clock = new THREE.Clock();
    const animate = () => { const t = clock.getElapsedTime(); camera.position.z += (8.2 - scroll * 9.5 - camera.position.z) * .035; camera.position.x += (mx * .48 - camera.position.x) * .035; camera.position.y += (1.7 - my * .18 - camera.position.y) * .035; camera.lookAt(mx * .25, 1.65, camera.position.z - 6); sculpture.rotation.y = t * .18; sculpture.rotation.x = Math.sin(t * .3) * .1; sculpture.position.y = 1.58 + Math.sin(t * .7) * .08; ray.setFromCamera(pointer, camera); const hit = ray.intersectObjects(artwork)[0]?.object as THREE.Mesh | undefined; if (hovered && hovered !== hit) hovered.scale.setScalar(1); hovered = hit || null; if (hovered) hovered.scale.setScalar(1.035); host.style.cursor = hovered ? 'pointer' : 'default'; renderer.render(scene, camera); raf = requestAnimationFrame(animate); };
    animate();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); host.removeEventListener('pointermove', onMove); host.removeEventListener('click', onClick); window.removeEventListener('scroll', onScroll); scene.traverse(o => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); const materials = Array.isArray(o.material) ? o.material : [o.material]; materials.forEach(m => { if (m instanceof THREE.MeshBasicMaterial && m.map) m.map.dispose(); m.dispose(); }); } }); renderer.dispose(); host.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mount} className="museum-canvas" aria-label="Interactive 3D fashion gallery" />;
}
