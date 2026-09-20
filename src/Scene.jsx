import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import {
  TextureLoader,
  SRGBColorSpace,
  NoToneMapping,
  AdditiveBlending,
} from 'three'
import { useRef } from 'react'

import portraitImage from './assets/gagana-portrait.png'

function Portrait() {
  const groupRef = useRef()
  const texture = useLoader(TextureLoader, portraitImage)
  const { size } = useThree()
  const isMobile = size.width <= 768

  texture.colorSpace = SRGBColorSpace

  useFrame((state) => {
    if (!groupRef.current || isMobile) return

    const targetX = 2.05 + state.pointer.x * 0.12
    const targetY = -0.52 + state.pointer.y * 0.035
    const targetRotationY = state.pointer.x * 0.018
    const targetRotationX = -state.pointer.y * 0.008

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * 0.045
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.045
    groupRef.current.rotation.y +=
      (targetRotationY - groupRef.current.rotation.y) * 0.035
    groupRef.current.rotation.x +=
      (targetRotationX - groupRef.current.rotation.x) * 0.035
  })

  if (isMobile) return null

  return (
    <group ref={groupRef} position={[2.05, -0.52, 0.7]}>
      <mesh position={[0, -0.03, -0.08]}>
        <planeGeometry args={[2.18, 2.7]} />
        <meshBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.018}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh renderOrder={10}>
        <planeGeometry args={[2.15, 2.67]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function BottomPlanet() {
  const ref = useRef()
  const { size } = useThree()
  const isMobile = size.width <= 768

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.035
  })

  if (isMobile) return null

  return (
    <group ref={ref} position={[-4.15, -4.55, -4.8]} scale={2.65}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial color="#030108" roughness={1} metalness={0} />
      </mesh>

      <mesh scale={1.008}>
        <sphereGeometry args={[1.5, 42, 42]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.014}>
        <sphereGeometry args={[1.5, 28, 28]} />
        <meshBasicMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.065}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.021}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#6D28D9"
          transparent
          opacity={0.018}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function TopLeftPlanet() {
  const ref = useRef()
  const { size } = useThree()
  const isMobile = size.width <= 768

  const baseX = isMobile ? -1.35 : -4.25
  const baseY = isMobile ? 1.45 : 3.22

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()
    ref.current.rotation.y += delta * 0.055
    ref.current.position.x = baseX + Math.sin(time * 0.22) * 0.04
    ref.current.position.y = baseY + Math.cos(time * 0.2) * 0.03
  })

  return (
    <group
      ref={ref}
      position={[baseX, baseY, -4.8]}
      scale={isMobile ? 0.27 : 0.64}
    >
      <mesh>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial color="#07030D" roughness={1} />
      </mesh>

      <mesh scale={1.015}>
        <sphereGeometry args={[1.2, 30, 30]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.035}>
        <sphereGeometry args={[1.2, 28, 28]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.025}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function MiddlePlanet() {
  const ref = useRef()
  const { size } = useThree()
  const isMobile = size.width <= 768

  const baseX = isMobile ? -0.45 : -0.25
  const baseY = isMobile ? 1.05 : 2.05

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()
    ref.current.rotation.y += delta * 0.09
    ref.current.position.x = baseX + Math.sin(time * 0.28) * 0.05
    ref.current.position.y = baseY + Math.cos(time * 0.25) * 0.03
  })

  return (
    <group
      ref={ref}
      position={[baseX, baseY, -3.4]}
      scale={isMobile ? 0.065 : 0.145}
    >
      <mesh>
        <sphereGeometry args={[1, 40, 40]} />
        <meshStandardMaterial color="#24113D" roughness={0.8} />
      </mesh>

      <mesh scale={1.035}>
        <sphereGeometry args={[1, 26, 26]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.055}>
        <sphereGeometry args={[1, 18, 18]} />
        <meshBasicMaterial
          color="#A78BFA"
          wireframe
          transparent
          opacity={0.1}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function SmallLeftPlanet() {
  const ref = useRef()
  const { size } = useThree()
  const isMobile = size.width <= 768

  const baseX = isMobile ? -1.05 : -3.55
  const baseY = isMobile ? 0.65 : 1.45

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()
    ref.current.rotation.y += delta * 0.08
    ref.current.position.x = baseX + Math.sin(time * 0.32) * 0.03
    ref.current.position.y = baseY + Math.cos(time * 0.3) * 0.02
  })

  return (
    <group
      ref={ref}
      position={[baseX, baseY, -3.6]}
      scale={isMobile ? 0.045 : 0.09}
    >
      <mesh>
        <sphereGeometry args={[1, 36, 36]} />
        <meshStandardMaterial color="#24103E" roughness={0.8} />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#A78BFA"
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function BackgroundGlow() {
  const { size } = useThree()
  const isMobile = size.width <= 768

  return (
    <mesh
      position={isMobile ? [0.8, 0.55, -7] : [0.7, 0.15, -7]}
      scale={isMobile ? 0.65 : 1}
    >
      <circleGeometry args={[3.2, 64]} />
      <meshBasicMaterial
        color="#4C1D95"
        transparent
        opacity={0.018}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: NoToneMapping,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.32} />

      <pointLight
        position={[-3.5, 3, 2]}
        color="#7C3AED"
        intensity={1.65}
        distance={12}
      />

      <pointLight
        position={[3.5, 1, 2]}
        color="#8B5CF6"
        intensity={0.55}
        distance={8}
      />

      <BackgroundGlow />
      <TopLeftPlanet />
      <MiddlePlanet />
      <SmallLeftPlanet />
      <BottomPlanet />
      <Portrait />
    </Canvas>
  )
}

export default Scene
