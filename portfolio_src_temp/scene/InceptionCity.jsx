import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Instances, Instance, Environment } from '@react-three/drei'
import { scrollStore } from '../hooks/scrollStore'

// Totem component removed to be placed in the footer

function VoxelCityGrid() {
  const groupRef = useRef()
  
  const cols = 50 
  const rows = 120 
  const spacing = 4 
  
  const { rectBuildings, crossBuildings } = useMemo(() => {
    const rects = []
    const crosses = []
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing
        const z = 20 - (j * spacing)
        
        if (Math.abs(x) < 6) {
          if (Math.random() > 0.15) continue
        }
        
        let heightLevels = 2 + Math.floor(Math.random() * 8)
        if (Math.random() > 0.85) heightLevels += Math.floor(Math.random() * 15)
        if (Math.abs(x) < 12 && heightLevels > 10) heightLevels = 4 + Math.floor(Math.random() * 4) 
        
        const height = heightLevels * 2 
        
        const color = new THREE.Color()
        // Monochromatic brutalist colors matching the photo
        const shade = 0.3 + Math.random() * 0.3
        color.setRGB(shade, shade, shade)
        
        // 12% chance to be a cross building if it's tall enough
        const isCross = Math.random() > 0.88 && height > 12
        
        const b = {
          position: [x, height / 2, z], 
          scale: [spacing * 0.85, height, spacing * 0.85], // tightly packed
          color: color
        }
        
        if (isCross) {
          crosses.push(b)
        } else {
          rects.push(b)
        }
      }
    }
    return { rectBuildings: rects, crossBuildings: crosses }
  }, [])

  const uniforms = useMemo(() => ({
    uDepth: { value: 0 }
  }), [])

  useFrame(() => {
    const p = scrollStore.progress
    uniforms.uDepth.value = p
  })

  // Cross shape geometry
  const crossGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 0.25; 
    const l = 0.5; 
    shape.moveTo(-w, l);
    shape.lineTo(w, l);
    shape.lineTo(w, w);
    shape.lineTo(l, w);
    shape.lineTo(l, -w);
    shape.lineTo(w, -w);
    shape.lineTo(w, -l);
    shape.lineTo(-w, -l);
    shape.lineTo(-w, -w);
    shape.lineTo(-l, -w);
    shape.lineTo(-l, w);
    shape.lineTo(-w, w);
    shape.lineTo(-w, l);
    
    const geom = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false });
    geom.rotateX(Math.PI / 2); // Depth now goes along -Y
    geom.translate(0, 0.5, 0); // Shift so bounds are -0.5 to 0.5 on Y
    return geom;
  }, [])

  const shaderModifier = (shader) => {
    shader.uniforms.uDepth = uniforms.uDepth
    
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>\nuniform float uDepth;`
    )
    
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      float camZ = 10.0 - uDepth * 90.0;
      float foldZ = camZ - 30.0; 
      float R = 45.0; 
      
      // 1. Dream Distortion (Abstract Wavy Ripple)
      float rippleY = cos(transformed.x * 0.05 + uDepth * 10.0) * (uDepth * uDepth) * 15.0;
      float rippleZ = sin(transformed.x * 0.08 + uDepth * 8.0) * uDepth * 10.0;
      
      transformed.y += rippleY;
      transformed.z += rippleZ;
      
      // 2. True Fold: Bending blocks upwards
      if (transformed.z < foldZ) {
          float d = foldZ - transformed.z;
          float foldAmount = smoothstep(0.0, 0.4, uDepth); 
          float theta = (d / R) * foldAmount; 
          
          float newY = R * (1.0 - cos(theta));
          float newZOffset = d - R * sin(theta);
          
          transformed.y += newY;
          transformed.z += newZOffset;
      }
      `
    )
  }

  return (
    <group ref={groupRef}>
      {/* Rectangular Buildings */}
      <Instances limit={rectBuildings.length} range={rectBuildings.length}>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute 
            attach="attributes-color" 
            args={[Float32Array.from(rectBuildings.flatMap(b => [b.color.r, b.color.g, b.color.b])), 3]} 
          />
        </boxGeometry>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.9} 
          metalness={0.1}
          onBeforeCompile={shaderModifier}
        />
        {rectBuildings.map((b, i) => (
          <Instance key={i} position={b.position} scale={b.scale} />
        ))}
      </Instances>

      {/* Cross Buildings */}
      <Instances limit={crossBuildings.length} range={crossBuildings.length}>
        <primitive object={crossGeometry} attach="geometry">
           <instancedBufferAttribute 
            attach="attributes-color" 
            args={[Float32Array.from(crossBuildings.flatMap(b => [b.color.r, b.color.g, b.color.b])), 3]} 
          />
        </primitive>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.9} 
          metalness={0.1}
          onBeforeCompile={shaderModifier}
        />
        {crossBuildings.map((b, i) => (
          <Instance key={i} position={b.position} scale={b.scale} />
        ))}
      </Instances>
    </group>
  )
}

function Atmosphere() {
  const { scene } = useThree()
  
  useEffect(() => {
    // Hazy grey fog for brutalist monochromatic lighting
    scene.fog = new THREE.FogExp2('#9ca3af', 0.007)
    scene.background = new THREE.Color('#e5e7eb')
    
    return () => {
      scene.fog = null
      scene.background = null
    }
  }, [scene])

  return (
    <group>
      <directionalLight position={[0, 100, -200]} intensity={3} color="#ffffff" />
      <directionalLight position={[50, 50, 50]} intensity={1.5} color="#d1d5db" />
      <ambientLight intensity={0.6} color="#ffffff" />
    </group>
  )
}

function CameraManager() {
  useFrame(({ camera }) => {
    const p = scrollStore.progress
    // High up bird's-eye view, looking down at the rooftops
    camera.position.y = 25 
    camera.position.z = 40 - p * 90
    // Tilt camera down to see the city spread, tilt up slightly as we enter the fold
    camera.rotation.x = -0.35 + (p * 0.15)
  })
  return null
}

export function InceptionCity() {
  return (
    <group position={[0, -20, 0]}>
      <CameraManager />
      
      {/* Ground City (Inception) */}
      <VoxelCityGrid />
      
      <Atmosphere />
      <Environment preset="city" />
    </group>
  )
}
