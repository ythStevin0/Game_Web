import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../hooks/scrollStore'
import { imageToParticles } from '../utils/imageToParticles'
import { textToParticles } from '../utils/textToParticles'

const NUM_PARTICLES = 14000

// Custom glow shader material
const glowVertexShader = `
  attribute float aSize;
  attribute float aPulse;
  uniform float uTime;
  varying float vAlpha;
  varying float vPulse;
  
  void main() {
    vPulse = aPulse;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    
    // Breathing pulse
    float pulse = 1.0 + sin(uTime * 2.0 + aPulse * 6.28) * 0.15;
    
    gl_Position = projectionMatrix * mvPosition;
    vAlpha = 0.85;
  }
`

const glowFragmentShader = `
  varying float vAlpha;
  varying float vPulse;
  uniform float uTime;
  
  void main() {
    // Soft circle with glow falloff
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    
    // Core glow
    float brightness = 1.0 + sin(uTime * 1.5 + vPulse * 6.28) * 0.2;
    vec3 color = vec3(0.9, 0.95, 1.0) * brightness;
    
    // Subtle cyan tint
    color += vec3(0.0, 0.08, 0.1) * (1.0 - dist * 2.0);
    
    gl_FragColor = vec4(color, vAlpha);
  }
`

export function ParticleMorph() {
  const meshRef = useRef()
  const materialRef = useRef()
  const [dataA, setDataA] = useState(null)
  const [dataB, setDataB] = useState(null)
  const [dataC, setDataC] = useState(null)
  const [dataD, setDataD] = useState(null)
  
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  useEffect(() => {
    imageToParticles('/assets/profile.jpeg', NUM_PARTICLES).then(result => {
      const bgData = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        bgData.push({
          x: (Math.random() - 0.5) * 45,
          y: (Math.random() - 0.5) * 35,
          size: 0.05 + Math.random() * 0.1,
          freqX: 0.2 + Math.random() * 0.8,
          freqY: 0.2 + Math.random() * 0.8,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          driftSpeed: 0.05 + Math.random() * 0.15
        })
      }
      setDataA(bgData)

      const rawImgData = result.particles
      const imgData = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        if (i < rawImgData.length) {
          imgData.push({
            x: rawImgData[i].x,
            y: rawImgData[i].y,
            targetSize: rawImgData[i].targetSize,
            isStructure: true
          })
        } else {
          imgData.push({
            x: bgData[i].x,
            y: bgData[i].y,
            targetSize: bgData[i].size,
            isStructure: false
          })
        }
      }
      for (let i = imgData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imgData[i], imgData[j]] = [imgData[j], imgData[i]];
      }
      setDataC(imgData)

      const rawTextData = textToParticles()
      const textData = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        if (i < rawTextData.length) {
          textData.push({
            x: rawTextData[i].x,
            y: rawTextData[i].y,
            size: rawTextData[i].size,
            isStructure: true
          })
        } else {
          textData.push({
            x: bgData[i].x,
            y: bgData[i].y,
            size: bgData[i].size,
            isStructure: false
          })
        }
      }
      setDataB(textData)
      
      const fallData = []
      for (let i = 0; i < NUM_PARTICLES; i++) {
        fallData.push({
          x: imgData[i].x + (Math.random() - 0.5) * 10,
          y: imgData[i].y - 40 - Math.random() * 30,
          size: imgData[i].targetSize > 0 ? imgData[i].targetSize : bgData[i].size,
          fallDelay: Math.random() * 0.3
        })
      }
      setDataD(fallData)
    })
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !dataA || !dataB || !dataC) return

    const rawScroll = scrollStore.scrollY
    
    let progressAB = 0
    let progressBC = 0
    let progressCD = 0
    
    if (rawScroll <= 250) {
      progressAB = rawScroll / 250
    } else if (rawScroll <= 400) {
      progressAB = 1
    } else if (rawScroll <= 900) {
      progressAB = 1
      progressBC = (rawScroll - 400) / 500
    } else if (rawScroll <= 1100) {
      progressAB = 1
      progressBC = 1
    } else if (rawScroll <= 1600) {
      progressAB = 1
      progressBC = 1
      progressCD = (rawScroll - 1100) / 500
    } else {
      progressAB = 1
      progressBC = 1
      progressCD = 1
    }
    
    progressAB = Math.min(Math.max(progressAB, 0), 1)
    progressBC = Math.min(Math.max(progressBC, 0), 1)
    progressCD = Math.min(Math.max(progressCD, 0), 1)
    
    const easeAB = progressAB * progressAB * (3 - 2 * progressAB)
    const easeBC = progressBC * progressBC * (3 - 2 * progressBC)

    const time = state.clock.elapsedTime
    const mouseX = state.pointer.x
    const mouseY = state.pointer.y

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const pA = dataA[i]
      const pB = dataB[i]
      const pC = dataC[i]

      const floatX = Math.sin(time * pA.freqX + pA.phaseX) * pA.driftSpeed
      const floatY = Math.cos(time * pA.freqY + pA.phaseY) * pA.driftSpeed
      
      // Breathing scale pulse
      const breathe = 1.0 + Math.sin(time * 1.5 + i * 0.01) * 0.1
      
      let currentX, currentY, currentSize, currentFloatX, currentFloatY
      
      if (progressBC === 0) {
        currentX = THREE.MathUtils.lerp(pA.x, pB.x, easeAB)
        currentY = THREE.MathUtils.lerp(pA.y, pB.y, easeAB)
        currentSize = THREE.MathUtils.lerp(pA.size, pB.size, easeAB)
        
        const floatReduction = pB.isStructure ? THREE.MathUtils.lerp(1, 0.2, easeAB) : 1
        currentFloatX = floatX * floatReduction
        currentFloatY = floatY * floatReduction
        
      } else if (progressCD === 0) {
        currentX = THREE.MathUtils.lerp(pB.x, pC.x, easeBC)
        currentY = THREE.MathUtils.lerp(pB.y, pC.y, easeBC)
        
        const sizeC = pC.targetSize * 1.0
        currentSize = THREE.MathUtils.lerp(pB.size, sizeC, easeBC)
        
        const floatStart = pB.isStructure ? 0.2 : 1
        const floatEnd = pC.isStructure ? 0.05 : 1
        const floatReduction = THREE.MathUtils.lerp(floatStart, floatEnd, easeBC)
        currentFloatX = floatX * floatReduction
        currentFloatY = floatY * floatReduction
      } else {
        const pD = dataD[i]
        
        let gravityProgress = Math.max(0, (progressCD - pD.fallDelay) / (1 - pD.fallDelay))
        gravityProgress = Math.min(gravityProgress, 1)
        const easeCD = gravityProgress * gravityProgress
        
        currentX = THREE.MathUtils.lerp(pC.x, pD.x, easeCD)
        currentY = THREE.MathUtils.lerp(pC.y, pD.y, easeCD)
        currentSize = THREE.MathUtils.lerp(pC.targetSize > 0 ? pC.targetSize : pA.size, pD.size, easeCD)
        
        currentFloatX = floatX * (1 + easeCD * 2)
        currentFloatY = floatY * (1 + easeCD * 2)
      }

      // Mouse proximity glow — particles near cursor grow slightly
      const particleScreenX = currentX / 22.5
      const particleScreenY = currentY / 17.5
      const mouseDistSq = (particleScreenX - mouseX) ** 2 + (particleScreenY - mouseY) ** 2
      const mouseProximity = Math.max(0, 1.0 - mouseDistSq * 8)
      const proximityScale = 1.0 + mouseProximity * 0.5

      dummy.position.set(currentX + currentFloatX, currentY + currentFloatY, 0)
      dummy.scale.set(
        currentSize * breathe * proximityScale,
        currentSize * breathe * proximityScale,
        currentSize * breathe * proximityScale
      )
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true

    // Subtle parallax tilt
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouseX * 0.08, 0.05)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouseY * 0.08, 0.05)
  })

  if (!dataA || !dataB || !dataC || !dataD) return null

  return (
    <instancedMesh ref={meshRef} args={[null, null, NUM_PARTICLES]} position={[0, 0, -5]}>
      <circleGeometry args={[0.07, 16]} />
      <meshBasicMaterial color="#e0f0ff" transparent opacity={0.9} toneMapped={false} />
    </instancedMesh>
  )
}
