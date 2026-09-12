"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles, Environment, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

function FloatingRing({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05)
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1)
    }
  })

  return (
    <group>
      {/* Main orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial
          color="#f5f0e8"
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}

function DecorativeLights() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {/* Chandelier-like light points */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = Math.cos(angle) * 3
        const z = Math.sin(angle) * 3
        return (
          <Float key={i} speed={1.5} floatIntensity={0.5}>
            <mesh position={[x, -1, z]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color="#d4af37" />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#fff5e6"
      />

      <CentralOrb />
      
      {/* Decorative rings */}
      <FloatingRing position={[0, 0, 0]} scale={1.5} speed={0.5} />
      <FloatingRing position={[0, 0, 0]} scale={2} speed={0.3} />
      <FloatingRing position={[0, 0, 0]} scale={2.5} speed={0.2} />

      <DecorativeLights />

      {/* Sparkles for magical effect */}
      <Sparkles
        count={100}
        scale={10}
        size={2}
        speed={0.3}
        color="#d4af37"
      />
      <Sparkles
        count={50}
        scale={8}
        size={3}
        speed={0.2}
        color="#ffffff"
      />

      <Environment preset="sunset" />
    </>
  )
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-cream to-cream-dark" />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none" />
    </div>
  )
}
