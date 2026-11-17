import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function Scene() {
  const cubeRef = useRef(null)

  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.5
      cubeRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#888888" wireframe />
      </mesh>
    </group>
  )
}
