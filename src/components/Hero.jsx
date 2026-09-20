import Scene from '../Scene'
import portraitImage from '../assets/gagana-portrait.png'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="heroScene" aria-hidden="true">
        <Scene />
      </div>

      <div className="heroOverlay" aria-hidden="true" />

      <div className="heroMobileVisual" aria-hidden="true">
        <img src={portraitImage} alt="" />
      </div>

      <div className="heroContent">
        <p className="heroGreeting">HELLO, I'M</p>

        <h1 className="heroName">
          Gagana <span>Prasad</span>
        </h1>

        <h2 className="heroRole">Undergraduate Student</h2>

        <p className="heroUniversity">
          University of Sri Jayewardenepura
        </p>

        <p className="heroDescription">
          I enjoy building modern digital experiences and exploring
          new technologies through projects, learning, and collaboration.
        </p>

        <div className="heroActions">
          <a href="#projects" className="primaryButton">
            <span>View Projects</span>
            <span className="buttonArrow">→</span>
          </a>

          <a href="#contact" className="secondaryButton">
            Contact Me
          </a>
        </div>
      </div>

      <div className="heroSideText" aria-hidden="true">
        <span>LEARN</span>
        <span>BUILD</span>
        <span>EXPLORE</span>
        <span>GROW</span>
      </div>

      <a
        href="#about"
        className="scrollIndicator"
        aria-label="Scroll to About section"
      >
        <span className="scrollLine" />
        <span className="scrollText">SCROLL DOWN</span>
        <span className="scrollArrow">↓</span>
      </a>
    </section>
  )
}

export default Hero
