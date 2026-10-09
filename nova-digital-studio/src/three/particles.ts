import * as THREE from "three";

export function createParticles(scene: THREE.Scene, mobile: boolean) {
  const count = mobile ? 180 : 520;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const violet = new THREE.Color(0x9a91ff);
  const cyan = new THREE.Color(0x78dfff);
  for (let i = 0; i < count; i++) {
    const r = 2.8 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 2;
    const color = violet.clone().lerp(cyan, Math.random());
    color.toArray(colors, i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: mobile ? 0.025 : 0.018, vertexColors: true, sizeAttenuation: true, transparent: true, opacity: 0.8, depthWrite: false });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  return { points, dispose: () => { scene.remove(points); geometry.dispose(); material.dispose(); } };
}
