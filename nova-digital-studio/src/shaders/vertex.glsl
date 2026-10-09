uniform float uTime;
uniform float uHover;
uniform float uMorph;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vWave;

float hash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}

void main() {
  vec3 direction = normalize(position);
  vec3 faceted = direction * (1.0 + 0.13 * sin(direction.x * 7.0) * sin(direction.y * 7.0));
  vec3 shaped = mix(position, faceted, uMorph);
  float wave = sin(shaped.y * 8.0 + uTime * 1.1) * sin(shaped.x * 6.0 - uTime * 0.8);
  wave += sin((shaped.x + shaped.z) * 12.0 + uTime * 1.5) * 0.24;
  shaped += normal * wave * (0.035 + uHover * 0.075);
  vWave = wave;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(shaped, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(shaped, 1.0);
}
