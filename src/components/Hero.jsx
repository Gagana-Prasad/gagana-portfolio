import Scene from '../Scene'
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="heroContent">

        <p className="heroGreeting">
          Hello, I'm
        </p>

        <h1 className="heroName">
          Gagana Prasad
        </h1>

        <h2 className="heroRole">
          Undergraduate Student
        </h2>

        <p className="heroDescription">
          I enjoy building modern digital experiences and exploring
          new technologies through projects, learning, and collaboration.
        </p>

        <div className="heroActions">
          <a href="#projects" className="primaryButton">
            View Projects
          </a>

          <a href="#contact" className="secondaryButton">
            Contact Me
          </a>
        </div>

      </div>

      <div className="heroVisual">
         <Scene />
      </div>
    </section>
  )
}

export default Hero