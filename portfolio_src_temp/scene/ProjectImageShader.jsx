import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uDistortion;
  uniform float uTime;
  
  varying vec2 vUv;

  // Random hash
  float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    // Glitch block displacement
    float glitchStrength = uDistortion * 0.8;
    float blockSize = 0.03 + random(vec2(floor(uTime * 10.0), 0.0)) * 0.05;
    float glitchBlock = step(0.95, random(vec2(floor(uv.y / blockSize), floor(uTime * 8.0))));
    uv.x += glitchBlock * glitchStrength * (random(vec2(uTime, uv.y)) - 0.5);
    
    // Liquid ripple
    float ripple = sin(uv.y * 25.0 + uTime * 6.0) * 0.04 * uDistortion;
    float ripple2 = sin(uv.x * 15.0 + uTime * 4.0) * 0.02 * uDistortion;
    uv.x += ripple;
    uv.y += ripple2;
    
    // RGB chromatic aberration
    float shift = uDistortion * 0.035;
    float r = texture2D(uTexture, uv + vec2(shift, shift * 0.5)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, -shift * 0.3)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Scanlines
    float scanline = sin(uv.y * 400.0) * 0.04 * uDistortion;
    color -= scanline;
    
    // Noise grain
    float noise = (random(uv + uTime) - 0.5) * 0.08 * uDistortion;
    color += noise;
    
    // Grayscale with slight desaturation
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(color, vec3(gray), 0.7);
    
    // Contrast boost
    color = (color - 0.5) * 1.3 + 0.5;
    color *= 0.75;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

const ShaderMesh = ({ texture, distortionRef }) => {
  const materialRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      if (distortionRef.current) {
        materialRef.current.uniforms.uDistortion.value = distortionRef.current.value
      }
    }
  })

  if (!texture) return null

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uDistortion: { value: 0 }
        }}
      />
    </mesh>
  )
}

export const ProjectImageShader = ({ imageUrl, isHovered }) => {
  const [texture, setTexture] = React.useState(null)
  const distortionRef = useRef({ value: 0 })

  React.useEffect(() => {
    if (imageUrl) {
      new THREE.TextureLoader().load(imageUrl, (tex) => {
        setTexture(tex)
      })
    }
  }, [imageUrl])

  React.useEffect(() => {
    gsap.to(distortionRef.current, {
      value: isHovered ? 1 : 0,
      duration: 0.6,
      ease: 'power3.out'
    })
  }, [isHovered])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ShaderMesh texture={texture} distortionRef={distortionRef} />
      </Canvas>
    </div>
  )
}
