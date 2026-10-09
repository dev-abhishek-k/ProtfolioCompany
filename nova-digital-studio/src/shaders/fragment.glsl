uniform float uTime;
uniform float uHover;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vWave;

void main() {
  vec3 n = normalize(vNormal);
  vec3 eye = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(n, eye), 0.0), 2.4);
  float light = max(dot(n, normalize(vec3(-0.4, 0.7, 0.9))), 0.0);
  vec3 midnight = vec3(0.045, 0.067, 0.14);
  vec3 violet = vec3(0.37, 0.32, 0.91);
  vec3 cyan = vec3(0.35, 0.88, 0.96);
  vec3 color = mix(midnight, violet, smoothstep(-0.6, 0.8, n.y + vWave * 0.2));
  color += cyan * fresnel * (0.9 + uHover * 0.35);
  color += vec3(0.62, 0.49, 0.96) * pow(light, 6.0) * 0.7;
  color += 0.035 * sin(uTime * 0.6 + vWave * 3.0);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
