import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../hooks/scrollStore'

export function BackgroundEffects() {
  const materialRef = useRef()

  // Simple gradient shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec3 colorTop;
    uniform vec3 colorBottom;
    uniform float progress;
    varying vec2 vUv;

    void main() {
      // Shift colors slightly based on progress
      vec3 finalTop = mix(colorTop, colorBottom * 0.2, progress);
      vec3 finalBottom = mix(colorBottom, vec3(0.0), progress);
      
      vec3 color = mix(finalBottom, finalTop, vUv.y);
      gl_FragColor = vec4(color, 1.0);
    }
  `

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.progress.value = scrollStore.progress
    }
  })

  return (
    <mesh position={[0, 0, -20]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          colorTop: { value: new THREE.Color('#1a1a2e') },
          colorBottom: { value: new THREE.Color('#0f0f1a') },
          progress: { value: 0 }
        }}
        depthWrite={false}
      />
    </mesh>
  )
}
