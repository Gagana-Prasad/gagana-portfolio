import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import roamlyVideo from '../assets/projects/roamly-preview.mp4'
import salesVideo from '../assets/projects/sales-management-preview.mp4'
import restaurantVideo from '../assets/projects/restaurant-preview.mp4'

const ROAMLY_URL =
  'https://github.com/Chethiya4/Roamly_Platform'

const SALES_URL =
  'https://github.com/Gagana-Prasad/sales-management-system'

/* =========================================================
   GLOBE
   ========================================================= */

function ProjectsGlobe() {
  const globeRef = useRef()
  const orbitRef = useRef()

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.055
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.z += delta * 0.018
    }
  })

  return (
    <group>
      <group
        ref={globeRef}
        rotation={[0.18, -0.35, -0.08]}
      >
        <mesh>
          <sphereGeometry args={[2.05, 20, 14]} />
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={0.22}
            depthWrite={false}
          />
        </mesh>

        <mesh rotation={[0.12, 0.2, 0]}>
          <sphereGeometry args={[2.09, 12, 10]} />
          <meshBasicMaterial
            color="#c4b5fd"
            wireframe
            transparent
            opacity={0.05}
            depthWrite={false}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2, 24, 18]} />
          <meshBasicMaterial
            color="#4c1d95"
            transparent
            opacity={0.025}
            depthWrite={false}
          />
        </mesh>
      </group>

      <group ref={orbitRef}>
        <mesh
          rotation={[
            Math.PI / 2.35,
            0.15,
            0.32,
          ]}
        >
          <torusGeometry
            args={[2.55, 0.008, 8, 180]}
          />

          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.32}
          />
        </mesh>

        <mesh
          rotation={[
            Math.PI / 1.85,
            0.9,
            -0.48,
          ]}
        >
          <torusGeometry
            args={[2.62, 0.006, 8, 180]}
          />

          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      <mesh position={[2.32, 0.7, 0]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshBasicMaterial color="#ddd6fe" />
      </mesh>

      <mesh position={[-2.1, -1.15, 0]}>
        <sphereGeometry args={[0.025, 10, 10]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
    </group>
  )
}

/* =========================================================
   PROJECT TABLET
   ========================================================= */

function ProjectTablet({
  video,
  title,
  projectUrl,
  onEnter,
  onLeave,
}) {
  const tabletRef = useRef(null)
  const [mobileActive, setMobileActive] = useState(false)

  useEffect(() => {
    const tablet = tabletRef.current
    if (!tablet) return undefined

    const mobileMedia = window.matchMedia('(max-width: 768px)')
    if (!mobileMedia.matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMobileActive(entry.isIntersecting && entry.intersectionRatio >= 0.55)
      },
      {
        threshold: [0, 0.25, 0.55, 0.75, 1],
      },
    )

    observer.observe(tablet)

    return () => observer.disconnect()
  }, [])

  const handleLoadedMetadata = (event) => {
    const videoElement = event.currentTarget

    if (videoElement.duration > 0.12) {
      videoElement.currentTime = 0.12
    }
  }

  const handleVideoEnd = (event) => {
    const videoElement = event.currentTarget

    videoElement.currentTime = 0.12

    videoElement.play().catch(() => {})
  }

  return (
    <div
      ref={tabletRef}
      className={`projectTablet ${mobileActive ? 'projectTabletMobileActive' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="tabletPowerButton" />

      <span
        className="
          tabletVolumeButton
          tabletVolumeOne
        "
      />

      <span
        className="
          tabletVolumeButton
          tabletVolumeTwo
        "
      />

      <div className="projectTabletInner">
        <video
          className="projectVideo"
          src={video}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          aria-label={`${title} project preview`}
        />

        <div className="projectVideoShade" />

        {projectUrl && (
          <div className="projectTabletAction">
            <a
              href={projectUrl}
              target="_blank"
              rel="noreferrer"
              className="tabletViewButton"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              View Project
              <span>↗</span>
            </a>
          </div>
        )}
      </div>

      <span className="projectTabletCamera" />
    </div>
  )
}

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function Tech({ children }) {
  return (
    <span className="projectTech">
      {children}
    </span>
  )
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="projectGithubIcon"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.34c.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.05c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
      />
    </svg>
  )
}

function ProjectDetails({
  category,
  title,
  subtitle,
  description,
  tech,
  codeUrl,
}) {
  return (
    <div className="projectContent">
      <span className="projectCategory">
        {category}
      </span>

      <h3>{title}</h3>

      <h4>{subtitle}</h4>

      <p>{description}</p>

      <div className="projectTechList">
        {tech.map((item) => (
          <Tech key={item}>
            {item}
          </Tech>
        ))}
      </div>

      {codeUrl && (
        <a
          className="projectCodeButton"
          href={codeUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          View Code
        </a>
      )}
    </div>
  )
}

/* =========================================================
   PROJECTS
   ========================================================= */

function Projects() {
  const [activeProject, setActiveProject] =
    useState(null)

  return (
    <section
      className="projects"
      id="projects"
    >
      <div
        className="projectsStars"
        aria-hidden="true"
      >
        {Array.from({ length: 18 }).map(
          (_, index) => (
            <span
              key={index}
              className={`projectStar projectStar${
                index + 1
              }`}
            />
          ),
        )}
      </div>

      <div
        className="projectsGlobeGlow"
        aria-hidden="true"
      />

      <div
        className="projectsGlobe"
        aria-hidden="true"
      >
        <Canvas
          camera={{
            position: [0, 0, 7.5],
            fov: 46,
          }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping:
              THREE.NoToneMapping,
          }}
        >
          <ProjectsGlobe />
        </Canvas>
      </div>

      <div className="projectsContainer">
        {/* INTRO */}

        <div className="projectsIntro">
          <div className="projectsLabel">
            <span>PROJECTS</span>
            <span className="projectsLabelLine" />
          </div>

          <h2>
            Selected
            <br />
            <strong>Work.</strong>
          </h2>

          <p>
            A collection of projects I&apos;ve
            built, exploring ideas, solving
            problems, and turning concepts into
            real-world solutions.
          </p>
        </div>

        <div
          className="projectsSideText"
          aria-hidden="true"
        >
          <span>Ideas</span>
          <span>Build</span>
          <span>Deploy</span>
          <span>Repeat</span>
          <i />
        </div>

        {/* PROJECT 01 - ROAMLY */}

        <article
          className={`projectItem projectOne ${
            activeProject === 1
              ? 'projectActive'
              : ''
          }`}
        >
          <div className="projectNumberArea">
            <span>01</span>
            <small>FEATURED PROJECT</small>
          </div>

          <div
            className="
              projectVisual
              projectVisualLeft
            "
          >
            <ProjectTablet
              video={roamlyVideo}
              title="Roamly"
              projectUrl={ROAMLY_URL}
              onEnter={() =>
                setActiveProject(1)
              }
              onLeave={() =>
                setActiveProject(null)
              }
            />
          </div>

          <ProjectDetails
            category="Full Stack Web Application"
            title="Roamly"
            subtitle="Travel & Tourism Web Application"
            description="A collaborative full-stack travel platform created by a five-member team to help users explore destinations and access useful travel information."
            tech={[
              'Full Stack',
              'JavaScript',
              'Web',
            ]}
            codeUrl={ROAMLY_URL}
          />
        </article>

        {/* PROJECT 02 - SALES */}

        <article
          className={`projectItem projectTwo ${
            activeProject === 2
              ? 'projectActive'
              : ''
          }`}
        >
          <ProjectDetails
            category="Desktop Application"
            title="Sales Management System"
            subtitle="Java Desktop Application"
            description="A Java desktop application for managing customers, products, quantities, discounts and sales records."
            tech={[
              'Java',
              'NetBeans',
              'Desktop App',
            ]}
            codeUrl={SALES_URL}
          />

          <div
            className="
              projectVisual
              projectVisualRight
            "
          >
            <ProjectTablet
              video={salesVideo}
              title="Sales Management System"
              projectUrl={SALES_URL}
              onEnter={() =>
                setActiveProject(2)
              }
              onLeave={() =>
                setActiveProject(null)
              }
            />
          </div>

          <div
            className="
              projectNumberArea
              projectNumberRight
            "
          >
            <span>02</span>
          </div>
        </article>

        {/* PROJECT 03 - RESTAURANT */}

        <article
          className={`projectItem projectThree ${
            activeProject === 3
              ? 'projectActive'
              : ''
          }`}
        >
          <div className="projectNumberArea">
            <span>03</span>
          </div>

          <div
            className="
              projectVisual
              projectVisualLeft
            "
          >
            <ProjectTablet
              video={restaurantVideo}
              title="Restaurant Website"
              onEnter={() =>
                setActiveProject(3)
              }
              onLeave={() =>
                setActiveProject(null)
              }
            />
          </div>

          <ProjectDetails
            category="Web Application"
            title="Restaurant Website"
            subtitle="Restaurant Web Experience"
            description="A restaurant website created to present its content and services through a clean and user-friendly web experience."
            tech={[
              'Web',
              'Responsive UI',
            ]}
          />
        </article>

        <div
          className="projectsQuote"
          aria-hidden="true"
        >
          <span>“Small Projects</span>
          <span>Make a Big Difference.”</span>
          <i />
        </div>
      </div>
    </section>
  )
}

export default Projects