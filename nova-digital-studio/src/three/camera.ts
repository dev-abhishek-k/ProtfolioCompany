import * as THREE from "three";

export function createCamera(width: number, height: number) {
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0, 8.7);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function resizeCamera(camera: THREE.PerspectiveCamera, width: number, height: number) {
  camera.aspect = width / height;
  camera.fov = width < 700 ? 48 : 38;
  camera.updateProjectionMatrix();
}
