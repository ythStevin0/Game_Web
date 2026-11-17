import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Smooth noise hash
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    h = h * h * h * h;
    vec3 n = h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.1;
    
    // Flowing gradient
    float n1 = noise(uv * 2.0 + t);
    float n2 = noise(uv * 3.0 - t * 0.7);
    float n3 = noise(uv * 5.0 + vec2(t * 0.3, -t * 0.5));
    
    float flow = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    
    // Color palette: deep blacks with subtle cyan/purple
    vec3 c1 = vec3(0.01, 0.01, 0.02);
    vec3 c2 = vec3(0.0, 0.12, 0.16);
    vec3 c3 = vec3(0.06, 0.02, 0.1);
    
    vec3 color = mix(c1, c2, smoothstep(-0.3, 0.5, flow));
    color = mix(color, c3, smoothstep(0.2, 0.8, n2));
    
    // Mouse ripple
    float mouseDist = distance(uv, uMouse);
    float ripple = sin(mouseDist * 30.0 - uTime * 4.0) * 0.5 + 0.5;
    ripple *= smoothstep(0.4, 0.0, mouseDist);
    ripple *= 0.06;
    
    color += vec3(0.0, ripple * 0.8, ripple);
    
    // Vignette
    float vig = 1.0 - smoothstep(0.2, 1.5, length(uv - 0.5) * 2.0);
    color *= vig * 0.8 + 0.2;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const GradientMesh = () => {
  const materialRef = useRef()
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5))
  const { viewport } = useThree()

  useFrame((state) => {
    if (!materialRef.current) return
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime

    const target = new THREE.Vector2(
      (state.pointer.x + 1) * 0.5,
      (state.pointer.y + 1) * 0.5
    )
    mouseRef.current.lerp(target, 0.05)
    materialRef.current.uniforms.uMouse.value.copy(mouseRef.current)
  })

  return (
    <mesh scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}

export const ContactBackground = () => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <GradientMesh />
      </Canvas>
    </div>
  )
}
