'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'
import { useMotionValue } from 'framer-motion'

// Generate random points in a sphere
const generateRandomPoints = (count: number) => {
  const points = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = Math.random() * 2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    points[i3] = radius * Math.sin(phi) * Math.cos(theta)
    points[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    points[i3 + 2] = radius * Math.cos(phi)
  }
  return points
}

// Generate points in a shark shape
const generateSharkPoints = (count: number) => {
  const points = new Float32Array(count * 3)
  
  // Simplified shark shape parameters
  const length = 2.5
  const width = 1.0
  const height = 1.2
  const tailWidth = 0.8
  const finHeight = 0.6
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const t = i / count
    
    // Body points (60%)
    if (i < count * 0.6) {
      const bodyT = i / (count * 0.6)
      const x = (bodyT - 0.5) * length
      const bodyWidth = width * (1 - Math.abs(bodyT - 0.5) * 1.5)
      const y = (Math.random() - 0.5) * bodyWidth
      const z = (Math.random() - 0.5) * height
      
      points[i3] = x
      points[i3 + 1] = y
      points[i3 + 2] = z
    }
    // Tail points (20%)
    else if (i < count * 0.8) {
      const tailT = (i - count * 0.6) / (count * 0.2)
      const x = length * 0.5 + tailT * length * 0.3
      const tailH = tailWidth * (1 - tailT)
      const y = (Math.random() - 0.5) * tailH
      const z = (Math.random() - 0.5) * tailH
      
      points[i3] = x
      points[i3 + 1] = y
      points[i3 + 2] = z
    }
    // Fin points (10%)
    else if (i < count * 0.9) {
      const finT = (i - count * 0.8) / (count * 0.1)
      const x = (finT - 0.5) * length * 0.3
      const y = 0
      const z = height * 0.5 + finT * finHeight
      
      points[i3] = x
      points[i3 + 1] = y
      points[i3 + 2] = z
    }
    // Head details (10%)
    else {
      const headT = (i - count * 0.9) / (count * 0.1)
      const x = -length * 0.5 - headT * length * 0.1
      const y = (Math.random() - 0.5) * width * 0.8
      const z = (Math.random() - 0.5) * height * 0.8
      
      points[i3] = x
      points[i3 + 1] = y
      points[i3 + 2] = z
    }
  }
  
  return points
}

const ParticleSystem = () => {
  const [randomPoints] = useState(() => generateRandomPoints(2500))
  const [sharkPoints] = useState(() => generateSharkPoints(2500))
  const [currentPoints, setCurrentPoints] = useState(randomPoints)
  const pointsRef = useRef<THREE.Points>(null)
  const { viewport, mouse } = useThree()
  
  const progress = useMotionValue(0)
  const rotationY = useMotionValue(0)
  
  // Animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      // Animate to shark shape
      progress.set(1, { duration: 2.5, ease: [0.34, 1.56, 0.64, 1] })
    }, 1000)
    
    return () => {
      clearTimeout(timer1)
    }
  }, [progress])
  
  // Interpolate between random and shark points
  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      const newPoints = new Float32Array(randomPoints.length)
      for (let i = 0; i < randomPoints.length; i++) {
        newPoints[i] = randomPoints[i] * (1 - latest) + sharkPoints[i] * latest
      }
      setCurrentPoints(newPoints)
    })
    
    return () => unsubscribe()
  }, [progress, randomPoints, sharkPoints])
  
  // Follow mouse movement
  useFrame(() => {
    if (pointsRef.current) {
      // Subtle rotation based on mouse position
      const targetRotationY = (mouse.x * 0.2)
      rotationY.set(THREE.MathUtils.lerp(rotationY.get(), targetRotationY, 0.05))
      
      pointsRef.current.rotation.y = rotationY.get()
      pointsRef.current.rotation.x = mouse.y * 0.1
    }
  })
  
  return (
    <motion.group
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: { duration: 1.5, ease: "easeOut" }
      }}
    >
      <Points ref={pointsRef}>
        <bufferAttribute 
          attach="geometry-attributes-position" 
          array={currentPoints} 
          count={currentPoints.length / 3} 
          itemSize={3} 
        />
        <PointMaterial 
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#00FFFF"
        />
      </Points>
    </motion.group>
  )
}

const SharkParticles = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <ParticleSystem />
    </Canvas>
  )
}

export default SharkParticles