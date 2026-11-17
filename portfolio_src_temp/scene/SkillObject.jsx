import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { TorusKnot, Wireframe } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedShape = () => {
  const meshRef = useRef()

  React.useEffect(() => {
    // Sync rotation with scroll
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        x: Math.PI,
        ease: 'none',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Add slight continuous floating animation independent of scroll
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <TorusKnot ref={meshRef} args={[1.5, 0.4, 128, 32]} position={[0, 0, 0]}>
      <meshPhysicalMaterial 
        color="#ffffff"
        metalness={0.9}
        roughness={0.1}
        transmission={1.0} // Glass like
        thickness={0.5}
        envMapIntensity={1}
      />
      {/* Add a subtle wireframe overlay for techy aesthetic */}
      <Wireframe fill={"#333333"} thickness={0.02} />
    </TorusKnot>
  )
}

export const SkillObject = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      width: '400px', 
      height: '400px',
      zIndex: 5,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <AnimatedShape />
      </Canvas>
    </div>
  )
}
