import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  RoundedBox,
  useVideoTexture,
} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

import linkedinVideo from '../assets/contact/linkedin-profile.mp4'

function IPad() {
  const groupRef = useRef()

  const videoTexture = useVideoTexture(linkedinVideo, {
    muted: true,
    loop: true,
    autoplay: true,
    playsInline: true,
    start: true,
  })

  useFrame((state) => {
    if (!groupRef.current) return

    const targetY = state.pointer.x * 0.08
    const targetX = -state.pointer.y * 0.05

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      0.04,
    )

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.04,
    )
  })

  return (
    <Float
      speed={1.4}
      rotationIntensity={0.04}
      floatIntensity={0.22}
    >
      <group ref={groupRef}>
        {/* IPAD BODY */}
        <RoundedBox
          args={[6.2, 4.15, 0.22]}
          radius={0.18}
          smoothness={8}
        >
          <meshStandardMaterial
            color="#17131f"
            metalness={0.85}
            roughness={0.22}
          />
        </RoundedBox>

        {/* PURPLE EDGE */}
        <RoundedBox
          args={[6.08, 4.03, 0.235]}
          radius={0.16}
          smoothness={8}
          position={[0, 0, 0.025]}
        >
          <meshStandardMaterial
            color="#6d28d9"
            metalness={0.65}
            roughness={0.3}
          />
        </RoundedBox>

        {/* BLACK BEZEL */}
        <RoundedBox
          args={[5.94, 3.89, 0.25]}
          radius={0.13}
          smoothness={8}
          position={[0, 0, 0.05]}
        >
          <meshStandardMaterial
            color="#030304"
            metalness={0.2}
            roughness={0.4}
          />
        </RoundedBox>

        {/* LINKEDIN VIDEO */}
        <mesh position={[0, 0, 0.185]}>
          <planeGeometry args={[5.72, 3.67]} />

          <meshBasicMaterial
            map={videoTexture}
            toneMapped={false}
          />
        </mesh>

        {/* FRONT CAMERA */}
        <mesh position={[0, 1.89, 0.2]}>
          <circleGeometry args={[0.032, 24]} />

          <meshStandardMaterial color="#111118" />
        </mesh>
      </group>
    </Float>
  )
}

function ContactScene() {
  return (
    <div className="contactScene">
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[5, 5, 6]}
          intensity={2.5}
        />

        <directionalLight
          position={[-4, -2, 5]}
          intensity={1.5}
          color="#8b5cf6"
        />

        <pointLight
          position={[0, 0, -2]}
          intensity={8}
          distance={8}
          color="#7c3aed"
        />

        <IPad />
      </Canvas>
    </div>
  )
}

export default ContactScene