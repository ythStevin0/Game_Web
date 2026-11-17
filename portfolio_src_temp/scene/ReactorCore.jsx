import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Torus, Cylinder, Instances, Instance, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function Rings() {
  const outerRing = useRef()
  const middleRing = useRef()
  const innerRing = useRef()

  useFrame((state, delta) => {
    // Mechanical rotations
    if (outerRing.current) {
      outerRing.current.rotation.x += delta * 0.15
      outerRing.current.rotation.y -= delta * 0.1
    }
    if (middleRing.current) {
      middleRing.current.rotation.y += delta * 0.3
      middleRing.current.rotation.z += delta * 0.15
    }
    if (innerRing.current) {
      innerRing.current.rotation.x -= delta * 0.5
      innerRing.current.rotation.z -= delta * 0.25
    }
  })

  // Common metallic material properties
  const metalProps = {
    metalness: 1,
    roughness: 0.15,
    color: '#111111',
    envMapIntensity: 2
  }

  return (
    <group>
      {/* Outer Containment Ring */}
      <Torus ref={outerRing} args={[3.5, 0.2, 32, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial {...metalProps} clearcoat={1} clearcoatRoughness={0.1} />
      </Torus>
      
      {/* Middle Support Ring */}
      <Torus ref={middleRing} args={[2.8, 0.15, 32, 100]} rotation={[0, Math.PI / 4, 0]}>
        <meshPhysicalMaterial {...metalProps} roughness={0.2} />
      </Torus>

      {/* Inner Accelerator Ring */}
      <Torus ref={innerRing} args={[2.0, 0.08, 16, 100]}>
        <meshPhysicalMaterial {...metalProps} roughness={0.1} />
        {/* Glowing accents on the inner ring */}
        <Torus args={[2.0, 0.09, 4, 100]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color={[0, 2, 5]} wireframe toneMapped={false} />
        </Torus>
      </Torus>

      {/* Central Axis Pillars */}
      <Cylinder args={[0.03, 0.03, 8, 16]} rotation={[0, 0, Math.PI / 2]}>
        <meshPhysicalMaterial {...metalProps} />
      </Cylinder>
      <Cylinder args={[0.03, 0.03, 8, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshPhysicalMaterial {...metalProps} />
      </Cylinder>
    </group>
  )
}

function EnergyCore() {
  const coreRef = useRef()
  const glowRef = useRef()

  useFrame((state, delta) => {
    // Pulsating energy core
    const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05
    if (coreRef.current) coreRef.current.scale.setScalar(1 + pulse)
    
    if (glowRef.current) {
      glowRef.current.rotation.y += delta * 0.5
      glowRef.current.rotation.x += delta * 0.5
      glowRef.current.scale.setScalar(1 + pulse * 1.5)
    }
  })

  return (
    <group>
      {/* Intense solid core */}
      <Sphere ref={coreRef} args={[0.8, 32, 32]}>
        {/* Colors > 1 trigger bloom automatically in postprocessing */}
        <meshBasicMaterial color={[0.2, 2.0, 5.0]} toneMapped={false} />
      </Sphere>
      
      {/* Outer energy shell (wireframe) */}
      <Sphere ref={glowRef} args={[1.0, 16, 16]}>
        <meshBasicMaterial color={[0, 0.8, 3.0]} wireframe transparent opacity={0.4} toneMapped={false} />
      </Sphere>
      
      {/* Core light emitter to cast real light on the metal rings */}
      <pointLight color="#00bcd4" intensity={80} distance={15} decay={2} />
    </group>
  )
}

function Particle({ data }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * data.speed + data.phase
    // Float up and down
    ref.current.position.y = data.position.y + Math.sin(t) * 0.8
    // Pulse size
    ref.current.scale.setScalar(Math.max(0.1, Math.sin(t * 2) * 1.5))
  })
  
  return <Instance ref={ref} position={data.position} />
}

function Particles({ count = 300 }) {
  const groupRef = useRef()
  
  // Generate random positions in a sphere volume outside the core
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      // Random radius between 2.5 and 7
      const radius = 2.5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        speed: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2
      })
    }
    return temp
  }, [count])

  useFrame((state, delta) => {
    // Slowly rotate the entire particle cloud
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <Instances limit={count} range={count}>
        <sphereGeometry args={[0.02, 8, 8]} />
        {/* Very bright cyan/blue for bloom */}
        <meshBasicMaterial color={[0.5, 2.5, 6.0]} toneMapped={false} />
        {particles.map((data, i) => (
          <Particle key={i} data={data} />
        ))}
      </Instances>
    </group>
  )
}

export function ReactorCore() {
  return (
    <group position={[0, 0, -3]}>
      {/* Floating animation for the entire machine */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <EnergyCore />
        <Rings />
        <Particles />
      </Float>
      
      {/* Realistic lighting environment for metallic PBR reflections */}
      <Environment preset="city" />
      
      {/* Ambient light for base visibility */}
      <ambientLight intensity={0.2} />
    </group>
  )
}
