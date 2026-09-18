import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* =========================================================
   REAL SVG LOGOS
========================================================= */

// ROUND 01
import htmlLogo from '../assets/skills/html.svg'
import cssLogo from '../assets/skills/css.svg'
import javascriptLogo from '../assets/skills/javascript.svg'
import reactLogo from '../assets/skills/react.svg'
import nodeLogo from '../assets/skills/nodejs.svg'

// ROUND 02
import expressLogo from '../assets/skills/express.svg'
import mongodbLogo from '../assets/skills/mongodb.svg'
import gitLogo from '../assets/skills/git.svg'
import javaLogo from '../assets/skills/java.svg'
import pythonLogo from '../assets/skills/python.svg'

// ROUND 03
import photoshopLogo from '../assets/skills/photoshop.svg'
import illustratorLogo from '../assets/skills/illustrator.svg'
import canvaLogo from '../assets/skills/canva.svg'
import premiereLogo from '../assets/skills/premiere-pro.svg'
import figmaLogo from '../assets/skills/figma.svg'

/* =========================================================
   SETTINGS
========================================================= */

const ROUND_DELAY = 2500 // 2.5 seconds
const IDLE_WATER_LEVEL = '4%'
const HOVER_WATER_LEVEL = '115%'

function SkillsGlobe() {
  const globeRef = useRef(null)

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015
      globeRef.current.rotation.x += 0.0003
    }
  })

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[2.8, 22, 22]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>
    </group>
  )
}

function SkillsBackground() {
  return (
    <div className="skillsBackground">
      <div className="skillsStars">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={`skillsStar skillsStar${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

/* =========================================================
   SKILL ROUNDS
========================================================= */

const skillRounds = [
  [
    {
      name: 'HTML',
      category: 'Web Development',
      logo: htmlLogo,
    },
    {
      name: 'CSS',
      category: 'Web Development',
      logo: cssLogo,
    },
    {
      name: 'JavaScript',
      category: 'Web Development',
      logo: javascriptLogo,
    },
    {
      name: 'React',
      category: 'Web Development',
      logo: reactLogo,
    },
    {
      name: 'Node.js',
      category: 'Web Development',
      logo: nodeLogo,
    },
  ],

  [
    {
      name: 'Express.js',
      category: 'Development',
      logo: expressLogo,
    },
    {
      name: 'MongoDB',
      category: 'Development',
      logo: mongodbLogo,
    },
    {
      name: 'Git',
      category: 'Development',
      logo: gitLogo,
    },
    {
      name: 'Java',
      category: 'Programming',
      logo: javaLogo,
    },
    {
      name: 'Python',
      category: 'Programming',
      logo: pythonLogo,
    },
  ],

  [
    {
      name: 'Photoshop',
      category: 'Design & Creative',
      logo: photoshopLogo,
    },
    {
      name: 'Illustrator',
      category: 'Design & Creative',
      logo: illustratorLogo,
    },
    {
      name: 'Canva',
      category: 'Design & Creative',
      logo: canvaLogo,
    },
    {
      name: 'Premiere Pro',
      category: 'Design & Creative',
      logo: premiereLogo,
    },
    {
      name: 'Figma',
      category: 'Design & Creative',
      logo: figmaLogo,
    },
  ],
]

/* =========================================================
   SINGLE SKILL CARD
========================================================= */

function SkillCard({
  skill,
  index,
  round,
  onCardEnter,
  onCardLeave,
}) {
  const cardRef = useRef(null)
  const liquidRef = useRef(null)
  const logoRef = useRef(null)

  /* =======================================================
     HOVER ENTER
  ======================================================= */

  const handleMouseEnter = () => {
    onCardEnter()

    if (!liquidRef.current) return

    gsap.killTweensOf(liquidRef.current)

    gsap.to(liquidRef.current, {
      height: HOVER_WATER_LEVEL,
      duration: 0.9,
      ease: 'power2.inOut',
      overwrite: true,
    })
  }

  /* =======================================================
     MOUSE FOLLOW + 3D ROTATION
  ======================================================= */

  const handleMouseMove = (event) => {
    if (!cardRef.current || !logoRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const normalizedX = mouseX / rect.width - 0.5
    const normalizedY = mouseY / rect.height - 0.5

    const rotateY = normalizedX * 180
    const rotateX = normalizedY * -180

    const moveX = normalizedX * 18
    const moveY = normalizedY * 18

    gsap.to(logoRef.current, {
      x: moveX,
      y: moveY,
      rotateX,
      rotateY,
      duration: 0.25,
      ease: 'power2.out',
      transformPerspective: 700,
      transformOrigin: 'center center',
      overwrite: 'auto',
    })
  }

  /* =======================================================
     HOVER LEAVE
  ======================================================= */

  const handleMouseLeave = () => {
    if (liquidRef.current) {
      gsap.killTweensOf(liquidRef.current)

      gsap.to(liquidRef.current, {
        height: IDLE_WATER_LEVEL,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    if (logoRef.current) {
      gsap.killTweensOf(logoRef.current)

      gsap.to(logoRef.current, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    onCardLeave()
  }

  const number = round * 5 + index + 1

  return (
    <article
      ref={cardRef}
      className="skillCard"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* WATER */}
      <div
        ref={liquidRef}
        className="skillLiquid"
        style={{ height: IDLE_WATER_LEVEL }}
      >
        <div className="skillWave skillWaveOne" />
        <div className="skillWave skillWaveTwo" />
      </div>

      {/* CONTENT */}
      <div className="skillCardContent">

        {/* NUMBER 01 - 15 */}
        <span className="skillNumber">
          {String(number).padStart(2, '0')}
        </span>

        {/* LOGO */}
        <div
          ref={logoRef}
          className="skillLogoArea"
        >
          <img
            src={skill.logo}
            alt={`${skill.name} logo`}
            className="skillLogo"
            draggable="false"
          />
        </div>

        {/* INFO */}
        <div className="skillInfo">
          <h3>{skill.name}</h3>
          <p>{skill.category}</p>
        </div>

      </div>
    </article>
  )
}

/* =========================================================
   SKILLS SECTION
========================================================= */

function Skills() {
  const [round, setRound] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const gridRef = useRef(null)
  const timerRef = useRef(null)
  const isAnimatingRef = useRef(false)

  /* =======================================================
     START TIMER
  ======================================================= */

  const clearRoundTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  /* =======================================================
     CHANGE ROUND
  ======================================================= */

  const changeRound = () => {
    if (!gridRef.current) return
    if (isAnimatingRef.current) return

    clearRoundTimer()

    isAnimatingRef.current = true

    const cards = Array.from(
      gridRef.current.querySelectorAll('.skillCard')
    )

    /*
      CURRENT ROUND:
      01 -> 02 -> 03 -> 04 -> 05
      disappear quickly from left to right
    */

    gsap.to(cards, {
      opacity: 0,
      x: 25,
      scale: 0.97,
      duration: 0.18,
      stagger: {
        each: 0.045,
        from: 'start',
      },
      ease: 'power2.in',
      overwrite: true,

      onComplete: () => {
        /*
          Switch to next round
        */

        setRound((currentRound) => {
          return (currentRound + 1) % skillRounds.length
        })
      },
    })
  }

  /* =========================================================
     NEW ROUND ENTRANCE

     Runs every time round changes.
     Cards enter:

     LEFT -> RIGHT
     one by one
  ========================================================= */

  useEffect(() => {
    if (!gridRef.current) return undefined

    /*
      Don't run entrance animation on first page render.
    */

    if (!isAnimatingRef.current) {
      return undefined
    }

    const cards = Array.from(
      gridRef.current.querySelectorAll('.skillCard')
    )

    gsap.killTweensOf(cards)

    /*
      Start each new card slightly to the left.
    */

    gsap.set(cards, {
      opacity: 0,
      x: -38,
      y: 0,
      scale: 0.96,
    })

    /*
      LEFT -> RIGHT

      06
         07
            08
               09
                  10
    */

    gsap.to(cards, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,

      duration: 0.32,

      stagger: {
        each: 0.085,
        from: 'start',
      },

      ease: 'power2.out',
      overwrite: true,

      onComplete: () => {
        isAnimatingRef.current = false
      },
    })

    return () => {
      gsap.killTweensOf(cards)
    }
  }, [round])

  /* =========================================================
     AUTO ROUND TIMER
  ========================================================= */

  useEffect(() => {
    clearRoundTimer()

    /*
      Pause when:
      - user hovering
      - animation running
    */

    if (isHovering || isAnimatingRef.current) {
      return undefined
    }

    timerRef.current = setTimeout(() => {
      changeRound()
    }, ROUND_DELAY)

    return () => {
      clearRoundTimer()
    }
  }, [round, isHovering])

  /* =========================================================
     AFTER ENTRANCE ANIMATION
     START NEXT TIMER
  ========================================================= */

  useEffect(() => {
    if (!gridRef.current) return undefined

    const cards = gridRef.current.querySelectorAll('.skillCard')

    const handleAnimationComplete = () => {
      if (isHovering) return

      clearRoundTimer()

      timerRef.current = setTimeout(() => {
        changeRound()
      }, ROUND_DELAY)
    }

    /*
      We use a small timeout only to wait until
      the quick entrance animation is finished.
    */

    const animationWait = setTimeout(() => {
      if (!isAnimatingRef.current && !isHovering) {
        handleAnimationComplete()
      }
    }, 800)

    return () => {
      clearTimeout(animationWait)
      gsap.killTweensOf(cards)
    }
  }, [round, isHovering])

  /* =========================================================
     CARD HOVER
  ========================================================= */

  const handleCardEnter = () => {
    setIsHovering(true)
    clearRoundTimer()
  }

  const handleCardLeave = () => {
    setIsHovering(false)
  }

  /* =========================================================
     COMPONENT CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      clearRoundTimer()

      if (gridRef.current) {
        const cards =
          gridRef.current.querySelectorAll('.skillCard')

        gsap.killTweensOf(cards)
      }
    }
  }, [])

  const currentSkills = skillRounds[round]

  return (
    <section
      className="skills"
      id="skills"
    >
        <SkillsBackground />
      <div className="skillsContainer">

        {/* HEADING */}
        <div className="skillsHeading">

          <div className="skillsLabel">
            <span>SKILLS</span>
            <span className="skillsLabelLine" />
          </div>

          <h2 className="skillsTitle">
            Tools I Use to
            <br />
            <span>Build & Create.</span>
          </h2>

          <p className="skillsDescription">
            A collection of technologies and creative tools I use to
            learn, build, experiment, and bring ideas to life.
          </p>

        </div>

        {/* CARDS */}
        <div
          ref={gridRef}
          className="skillsGrid"
        >
          {currentSkills.map((skill, index) => (
            <SkillCard
              key={`${round}-${skill.name}`}
              skill={skill}
              index={index}
              round={round}
              onCardEnter={handleCardEnter}
              onCardLeave={handleCardLeave}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export { skillRounds }

export default Skills