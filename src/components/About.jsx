import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const statsContainerRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.aboutCard')
      const statNumbers = gsap.utils.toArray('.aboutStatNumber')

      /* =====================================================
         CARD ENTRANCE
      ===================================================== */

      gsap.set(cards, {
        y: -140,
        opacity: 0,
      })

      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: 'top 85%',
        once: true,

        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            clearProps: 'transform',
          })
        },
      })

      /* =====================================================
         STAT COUNTERS
      ===================================================== */

      ScrollTrigger.create({
        trigger: statsContainerRef.current,
        start: 'top 90%',
        once: true,

        onEnter: () => {
          statNumbers.forEach((element, index) => {
            const finalValue = Number(element.dataset.value)
            const suffix = element.dataset.suffix || ''

            const counter = {
              value: 0,
            }

            gsap.fromTo(
              counter,
              {
                value: 0,
              },
              {
                value: finalValue,
                duration: 1.8,
                delay: index * 0.12,
                ease: 'power2.out',

                onStart: () => {
                  element.textContent = `0${suffix}`
                },

                onUpdate: () => {
                  element.textContent =
                    `${Math.round(counter.value)}${suffix}`
                },

                onComplete: () => {
                  element.textContent =
                    `${finalValue}${suffix}`
                },
              }
            )
          })
        },
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="about"
      id="about"
      ref={sectionRef}
    >

      {/* =====================================================
          ANIMATED BACKGROUND STARS
      ===================================================== */}

      <div
        className="aboutStars"
        aria-hidden="true"
      >
        <span className="aboutStar star1" />
        <span className="aboutStar star2" />
        <span className="aboutStar star3" />
        <span className="aboutStar star4" />
        <span className="aboutStar star5" />
        <span className="aboutStar star6" />
        <span className="aboutStar star7" />
        <span className="aboutStar star8" />
        <span className="aboutStar star9" />
        <span className="aboutStar star10" />
        <span className="aboutStar star11" />
        <span className="aboutStar star12" />
      </div>


      {/* =====================================================
          BACKGROUND TEXT
      ===================================================== */}

      <div
        className="aboutBackgroundText"
        aria-hidden="true"
      >
        ABOUT
      </div>


      <div className="aboutContainer">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="aboutContent">

          <div className="aboutLabel">
            <span>ABOUT ME</span>
            <span className="aboutLabelLine" />
          </div>


          <h2 className="aboutTitle">
            Curious by nature.
            <br />
            Building through{' '}
            <span>experience.</span>
          </h2>


          <p className="aboutDescription">
            I’m Gagana Prasad, an undergraduate student at the
            University of Sri Jayewardenepura. I enjoy exploring
            technology, solving problems, and turning ideas into
            meaningful digital experiences.
          </p>


          <p className="aboutDescription">
            Beyond academics, I enjoy learning new technologies,
            building practical projects, collaborating with others,
            and taking part in activities that help me grow both
            personally and professionally.
          </p>


          <a
            href="#experience"
            className="aboutButton"
          >
            <span>Get to know me</span>
            <span>→</span>
          </a>


          {/* =================================================
              STATS
          ================================================= */}

          <div
            className="aboutStats"
            ref={statsContainerRef}
          >

            <div className="aboutStat">

              <strong
                className="aboutStatNumber"
                data-value="10"
                data-suffix="+"
              >
                0+
              </strong>

              <span>
                Projects
              </span>

              <small>
                Built & Explored
              </small>

            </div>


            <div className="aboutStat">

              <strong
                className="aboutStatNumber"
                data-value="3"
                data-suffix="+"
              >
                0+
              </strong>

              <span>
                Years
              </span>

              <small>
                Learning Continuously
              </small>

            </div>


            <div className="aboutStat">

              <strong
                className="aboutStatNumber"
                data-value="100"
                data-suffix="%"
              >
                0%
              </strong>

              <span>
                Curiosity
              </span>

              <small>
                Still Growing
              </small>

            </div>

          </div>

        </div>


        {/* =================================================
            RIGHT CARDS
        ================================================= */}

        <div
          className="aboutCards"
          ref={cardsContainerRef}
        >

          {/* CARD 01 */}

          <article className="aboutCard">

            <div className="aboutCardNumber">
              01
            </div>

            <div className="aboutCardContent">

              <span className="aboutCardTag">
                LEARN
              </span>

              <h3>
                Education
              </h3>

              <h4>
                University of Sri Jayewardenepura
              </h4>

              <p>
                Building knowledge, experience, and skills through
                academic learning and continuous exploration.
              </p>

            </div>

          </article>


          {/* CARD 02 */}

          <article className="aboutCard">

            <div className="aboutCardNumber">
              02
            </div>

            <div className="aboutCardContent">

              <span className="aboutCardTag">
                CREATE
              </span>

              <h3>
                Explore & Build
              </h3>

              <h4>
                Projects • Technology • Learning
              </h4>

              <p>
                Exploring modern technologies and transforming ideas
                into practical, real-world projects.
              </p>

            </div>

          </article>


          {/* CARD 03 */}

          <article className="aboutCard">

            <div className="aboutCardNumber">
              03
            </div>

            <div className="aboutCardContent">

              <span className="aboutCardTag">
                GROW
              </span>

              <h3>
                Beyond Academics
              </h3>

              <h4>
                Collaboration • Leadership • Communities
              </h4>

              <p>
                Taking part in teams, student communities, and
                collaborative activities that create positive impact.
              </p>

            </div>

          </article>

        </div>

      </div>

    </section>
  )
}

export default About