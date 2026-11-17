import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const AnimatedIcosahedron = () => {
  const meshRef = useRef()
  const wireRef = useRef()
  const glowRef = useRef()
  const rotSpeed = useRef({ value: 0.3 })

  useEffect(() => {
    if (!meshRef.current) return

    gsap.to(rotSpeed.current, {
      value: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'top top',
        scrub: 1
      }
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.rotation.x += 0.002 * rotSpeed.current.value
    meshRef.current.rotation.y += 0.003 * rotSpeed.current.value
    meshRef.current.rotation.z += 0.001 * rotSpeed.current.value

    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3

    // Pulse the inner glow
    if (glowRef.current) {
      glowRef.current.opacity = 0.08 + Math.sin(t * 2) * 0.04
    }
  })

  return (
    <group ref={meshRef}>
      {/* Wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          ref={wireRef}
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner glow */}
      <mesh scale={[0.95, 0.95, 0.95]}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial
          ref={glowRef}
          color="#00bcd4"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Edge glow lines */}
      <mesh>
        <icosahedronGeometry args={[1.82, 1]} />
        <meshBasicMaterial
          color="#00bcd4"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  )
}

export const FloatingGeometry = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      right: '-5%',
      width: '400px',
      height: '400px',
      zIndex: 2,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <AnimatedIcosahedron />
      </Canvas>
    </div>
  )
}
