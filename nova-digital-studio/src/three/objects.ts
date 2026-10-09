import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";

export type Artwork = {
  group: THREE.Group;
  core: THREE.Mesh<THREE.IcosahedronGeometry, THREE.ShaderMaterial>;
  rings: THREE.Object3D[];
  satellites: THREE.Mesh[];
  uniforms: { uTime: { value: number }; uHover: { value: number }; uMorph: { value: number } };
  lights: { key: THREE.PointLight; rim: THREE.PointLight };
  dispose: () => void;
};

export function createArtwork(scene: THREE.Scene, renderer: THREE.WebGLRenderer): Artwork {
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room).texture;
  scene.environment = environment;
  room.dispose();

  const ambient = new THREE.AmbientLight(0x8692cb, 1.5);
  const key = new THREE.PointLight(0x9581ff, 72, 18);
  key.position.set(3, 3, 5);
  const rim = new THREE.PointLight(0x45d8f7, 62, 18);
  rim.position.set(-4, -2, 3);
  scene.add(ambient, key, rim);

  const group = new THREE.Group();
  scene.add(group);
  const uniforms = { uTime: { value: 0 }, uHover: { value: 0 }, uMorph: { value: 0.25 } };
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.32, 5),
    new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, side: THREE.DoubleSide }),
  );
  core.userData.interactive = true;
  group.add(core);

  const metal = new THREE.MeshPhysicalMaterial({ color: 0xc8c4ff, metalness: 1, roughness: 0.12, envMapIntensity: 1.5, clearcoat: 1, clearcoatRoughness: 0.08 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x76d9ff, metalness: 0.12, roughness: 0.06, transmission: 0.82, thickness: 0.55, ior: 1.45, envMapIntensity: 1.8, transparent: true });
  const ringOne = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.075, 16, 128), metal);
  ringOne.rotation.set(0.4, 0.2, 0.5);
  const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.27, 0.035, 12, 128), glass);
  ringTwo.rotation.set(1.17, 0.5, -0.34);
  const ringThree = new THREE.Mesh(new THREE.TorusGeometry(2.48, 0.012, 8, 128), new THREE.MeshBasicMaterial({ color: 0x77dfff, transparent: true, opacity: 0.55 }));
  ringThree.rotation.set(0.9, -0.5, 0.8);
  group.add(ringOne, ringTwo, ringThree);

  const satellites: THREE.Mesh[] = [];
  for (let i = 0; i < 5; i++) {
    const satellite = new THREE.Mesh(new THREE.OctahedronGeometry(i % 2 ? 0.08 : 0.12, 1), i % 2 ? glass : metal);
    const angle = i * Math.PI * 2 / 5;
    satellite.position.set(Math.cos(angle) * 2.35, Math.sin(angle * 1.7) * 0.8, Math.sin(angle) * 1.55);
    satellite.userData.interactive = true;
    group.add(satellite);
    satellites.push(satellite);
  }

  return {
    group, core, rings: [ringOne, ringTwo, ringThree], satellites, uniforms, lights: { key, rim },
    dispose() {
      const materials = new Set<THREE.Material>();
      group.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach(material => materials.add(material));
        else materials.add(object.material);
      });
      materials.forEach(material => material.dispose());
      environment.dispose();
      pmrem.dispose();
      scene.remove(group, ambient, key, rim);
    },
  };
}
