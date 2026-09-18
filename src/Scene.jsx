import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
  TextureLoader,
  SRGBColorSpace,
  NoToneMapping,
  AdditiveBlending,
} from 'three'
import { useRef } from 'react'

import portraitImage from './assets/gagana-portrait.png'


/* =========================================================
   PORTRAIT
========================================================= */

function Portrait() {
  const groupRef = useRef()
  const texture = useLoader(TextureLoader, portraitImage)

  texture.colorSpace = SRGBColorSpace

  useFrame((state) => {
    if (!groupRef.current) return

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

  return (
    <group
      ref={groupRef}
      position={[2.05, -0.52, 0.7]}
    >
      {/* Very subtle purple depth behind portrait */}
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


/* =========================================================
   LARGE BOTTOM LEFT GLOBE
========================================================= */

function BottomPlanet() {
  const ref = useRef()

  useFrame((_, delta) => {
    if (!ref.current) return

    ref.current.rotation.y += delta * 0.035
  })

  return (
    <group
      ref={ref}
      position={[-4.15, -4.55, -4.8]}
      scale={2.65}
    >
      {/* Dark body */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />

        <meshStandardMaterial
          color="#030108"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Main brighter grid */}
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

      {/* Fine grid */}
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

      {/* Soft outer purple surface */}
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


/* =========================================================
   TOP LEFT WIREFRAME PLANET
========================================================= */

function TopLeftPlanet() {
  const ref = useRef()

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()

    ref.current.rotation.y += delta * 0.055

    ref.current.position.x =
      -4.25 + Math.sin(time * 0.22) * 0.05

    ref.current.position.y =
      3.22 + Math.cos(time * 0.2) * 0.04
  })

  return (
    <group
      ref={ref}
      position={[-4.25, 3.22, -4.8]}
      scale={0.64}
    >
      <mesh>
        <sphereGeometry args={[1.2, 48, 48]} />

        <meshStandardMaterial
          color="#07030D"
          roughness={1}
        />
      </mesh>

      {/* Brighter wireframe */}
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

      {/* Small edge glow */}
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


/* =========================================================
   MIDDLE SMALL PLANET
========================================================= */

function MiddlePlanet() {
  const ref = useRef()

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()

    ref.current.rotation.y += delta * 0.09

    ref.current.position.x =
      -0.25 + Math.sin(time * 0.28) * 0.08

    ref.current.position.y =
      2.05 + Math.cos(time * 0.25) * 0.045
  })

  return (
    <group
      ref={ref}
      position={[-0.25, 2.05, -3.4]}
      scale={0.145}
    >
      <mesh>
        <sphereGeometry args={[1, 40, 40]} />

        <meshStandardMaterial
          color="#24113D"
          roughness={0.8}
        />
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

      {/* Tiny wireframe detail */}
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


/* =========================================================
   SMALL LEFT PLANET
========================================================= */

function SmallLeftPlanet() {
  const ref = useRef()

  useFrame((state, delta) => {
    if (!ref.current) return

    const time = state.clock.getElapsedTime()

    ref.current.rotation.y += delta * 0.08

    ref.current.position.x =
      -3.55 + Math.sin(time * 0.32) * 0.06

    ref.current.position.y =
      1.45 + Math.cos(time * 0.3) * 0.04
  })

  return (
    <group
      ref={ref}
      position={[-3.55, 1.45, -3.6]}
      scale={0.09}
    >
      <mesh>
        <sphereGeometry args={[1, 36, 36]} />

        <meshStandardMaterial
          color="#24103E"
          roughness={0.8}
        />
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


/* =========================================================
   BACKGROUND PURPLE DEPTH
========================================================= */

function BackgroundGlow() {
  return (
    <mesh position={[0.7, 0.15, -7]}>
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


/* =========================================================
   FINAL SCENE
========================================================= */

function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: NoToneMapping,
      }}
      dpr={[1, 1.5]}
    >
      {/* Slightly brighter global lighting */}
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

      {/* Space objects */}
      <TopLeftPlanet />
      <MiddlePlanet />
      <SmallLeftPlanet />

      {/* Large globe */}
      <BottomPlanet />

      {/* Portrait */}
      <Portrait />
    </Canvas>
  )
}

export default Scene