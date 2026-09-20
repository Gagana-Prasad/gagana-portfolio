import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import linkedinVideo from '../assets/contact/linkedin-profile.mp4'

function IPad() {
  const ipadRef = useRef()
  const videoRef = useRef(null)
  const [videoTexture, setVideoTexture] = useState(null)
  const { size } = useThree()

  const mobile = size.width <= 768
  const small = size.width <= 480

  useEffect(() => {
    const video = document.createElement('video')

    video.src = linkedinVideo
    video.muted = true
    video.defaultMuted = true
    video.loop = true
    video.autoplay = true
    video.playsInline = true
    video.preload = 'auto'
    video.crossOrigin = 'anonymous'
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.style.display = 'none'

    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false

    videoRef.current = video
    setVideoTexture(texture)

    const playVideo = async () => {
      try {
        video.muted = true
        if (video.readyState >= 1 && video.currentTime < 0.1) {
          video.currentTime = 0.12
        }
        await video.play()
      } catch {
        // Mobile browsers may wait for the first user interaction.
      }
    }

    const handleVisibility = () => {
      if (!document.hidden) playVideo()
    }

    video.addEventListener('loadedmetadata', playVideo)
    video.addEventListener('loadeddata', playVideo)
    video.addEventListener('canplay', playVideo)
    window.addEventListener('pageshow', playVideo)
    document.addEventListener('visibilitychange', handleVisibility)
    document.addEventListener('pointerdown', playVideo, { passive: true })
    document.addEventListener('touchstart', playVideo, { passive: true })
    document.addEventListener('scroll', playVideo, { passive: true, once: true })

    video.load()
    playVideo()

    return () => {
      video.removeEventListener('loadedmetadata', playVideo)
      video.removeEventListener('loadeddata', playVideo)
      video.removeEventListener('canplay', playVideo)
      window.removeEventListener('pageshow', playVideo)
      document.removeEventListener('visibilitychange', handleVisibility)
      document.removeEventListener('pointerdown', playVideo)
      document.removeEventListener('touchstart', playVideo)

      video.pause()
      video.removeAttribute('src')
      video.load()

      texture.dispose()
      videoRef.current = null
    }
  }, [])

  useFrame((state) => {
    if (!ipadRef.current) return

    const pointerX = mobile ? 0 : state.pointer.x
    const pointerY = mobile ? 0 : state.pointer.y

    const targetRotationX = -0.035 - pointerY * 0.035
    const targetRotationY = -0.08 + pointerX * 0.06

    ipadRef.current.rotation.x = THREE.MathUtils.lerp(
      ipadRef.current.rotation.x,
      targetRotationX,
      0.035,
    )

    ipadRef.current.rotation.y = THREE.MathUtils.lerp(
      ipadRef.current.rotation.y,
      targetRotationY,
      0.035,
    )
  })

  const scale = mobile ? (small ? 0.64 : 0.74) : 1

  return (
    <Float
      speed={mobile ? 0.9 : 1.25}
      rotationIntensity={mobile ? 0.012 : 0.025}
      floatIntensity={mobile ? 0.1 : 0.18}
    >
      <group
        ref={ipadRef}
        rotation={[-0.035, -0.08, -0.025]}
        scale={scale}
      >
        <RoundedBox args={[6.25, 4.18, 0.24]} radius={0.2} smoothness={10}>
          <meshStandardMaterial
            color="#17131f"
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        <RoundedBox
          args={[6.12, 4.05, 0.255]}
          radius={0.17}
          smoothness={10}
          position={[0, 0, 0.025]}
        >
          <meshStandardMaterial
            color="#6d28d9"
            metalness={0.72}
            roughness={0.26}
          />
        </RoundedBox>

        <RoundedBox
          args={[5.96, 3.89, 0.27]}
          radius={0.14}
          smoothness={10}
          position={[0, 0, 0.055]}
        >
          <meshStandardMaterial
            color="#030304"
            metalness={0.25}
            roughness={0.38}
          />
        </RoundedBox>

        {videoTexture && (
          <mesh position={[0, 0, 0.2]}>
            <planeGeometry args={[5.72, 3.65]} />
            <meshBasicMaterial
              map={videoTexture}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}

        <mesh position={[0, 1.91, 0.21]}>
          <circleGeometry args={[0.032, 32]} />
          <meshStandardMaterial
            color="#08080c"
            metalness={0.8}
            roughness={0.2}
          />
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
          position: [0, 0, 7.4],
          fov: 48,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 1.5]}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <ambientLight intensity={1.8} />

        <directionalLight position={[5, 5, 6]} intensity={2.8} />

        <directionalLight
          position={[-4, -3, 5]}
          intensity={1.4}
          color="#8b5cf6"
        />

        <pointLight
          position={[0, 0, -1]}
          intensity={7}
          distance={8}
          color="#7c3aed"
        />

        <IPad />
      </Canvas>
    </div>
  )
}

export default ContactScene
