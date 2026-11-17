import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'NEXT.JS',
  'GSAP', 'THREE.JS', 'TAILWIND', 'LARAVEL',
  'POSTGRESQL', 'DOCKER', 'PYTHON', 'AWS',
  'WEBGL', 'GLSL', 'GIT', 'VITE'
]

const SkillTag = ({ text, position, index, totalCount }) => {
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!textRef.current) return
    // Always face camera
    textRef.current.lookAt(state.camera.position)
  })

  return (
    <group position={position}>
      <Text
        ref={textRef}
        fontSize={0.22}
        color={hovered ? '#00bcd4' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {text}
        <meshBasicMaterial
          color={hovered ? '#00bcd4' : '#ffffff'}
          transparent
          opacity={hovered ? 1 : 0.7}
        />
      </Text>
      {hovered && (
        <mesh scale={[1.2, 0.4, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial color="#00bcd4" transparent opacity={0.08} />
        </mesh>
      )}
    </group>
  )
}

const OrbitalCloud = () => {
  const groupRef = useRef()
  const rotSpeed = useRef({ value: 0.15 })
  const tiltRef = useRef(new THREE.Vector2(0, 0))

  const positions = useMemo(() => {
    // Fibonacci sphere distribution
    const pts = []
    const n = skills.length
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i

      pts.push([
        Math.cos(theta) * radius * 3.2,
        y * 2.8,
        Math.sin(theta) * radius * 3.2
      ])
    }
    return pts
  }, [])

  useEffect(() => {
    gsap.to(rotSpeed.current, {
      value: 0.6,
      ease: 'none',
      scrollTrigger: {
        trigger: '#skills',
        start: 'top bottom',
        end: 'top center',
        scrub: 1
      }
    })
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += 0.001 * rotSpeed.current.value

    // Mouse tilt
    const targetX = state.pointer.y * 0.15
    const targetY = state.pointer.x * 0.2
    tiltRef.current.x += (targetX - tiltRef.current.x) * 0.03
    tiltRef.current.y += (targetY - tiltRef.current.y) * 0.03

    groupRef.current.rotation.x = tiltRef.current.x
    groupRef.current.rotation.z = tiltRef.current.y * 0.1
  })

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillTag
          key={skill}
          text={skill}
          position={positions[i]}
          index={i}
          totalCount={skills.length}
        />
      ))}

      {/* Central wireframe sphere for structure */}
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.03} />
      </mesh>
    </group>
  )
}

export const SkillCloud = () => {
  return (
    <div style={{
      width: '100%',
      height: '70vh',
      position: 'relative',
      pointerEvents: 'auto'
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <OrbitalCloud />
      </Canvas>
    </div>
  )
}
