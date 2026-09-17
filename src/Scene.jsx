import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function RotatingCube() {
  const cubeRef = useRef()

  useFrame(() => {
    cubeRef.current.rotation.x += 0.005
    cubeRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  )
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 3, 3]} intensity={2} />
      <RotatingCube />
    </Canvas>
  )
}

export default Scene