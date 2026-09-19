import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiArrowUpRight,
} from 'react-icons/fi'

import ContactScene from './ContactScene'

const contactLinks = [
  {
    id: '01',
    label: 'EMAIL',
    value: 'gaganaprasad2020@gmail.com',
    href: 'mailto:gaganaprasad2020@gmail.com',
    icon: FiMail,
    external: false,
  },
  {
    id: '02',
    label: 'PHONE',
    value: '076 278 4876',
    href: 'tel:+94762784876',
    icon: FiPhone,
    external: false,
  },
  {
    id: '03',
    label: 'LINKEDIN',
    value: 'Gagana Prasad',
    href: 'https://www.linkedin.com/in/gagana-prasad-565ba6266',
    icon: FiLinkedin,
    external: true,
  },
  {
    id: '04',
    label: 'GITHUB',
    value: 'Gagana-Prasad',
    href: 'https://github.com/Gagana-Prasad',
    icon: FiGithub,
    external: true,
  },
]

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contactStars" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className={`contactStar contactStar${index + 1}`}
          />
        ))}
      </div>

      <div className="contactContainer">
        <div className="contactContent">
          <div className="contactLabel">
            <span>CONTACT</span>
            <i />
          </div>

          <h2 className="contactTitle">
            Get in <strong>Touch.</strong>
          </h2>

          <p className="contactDescription">
            Feel free to reach out if you'd like to connect or know more about
            me and my work.
          </p>

          <div className="contactLinks">
            {contactLinks.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="contactLink"
                >
                  <span className="contactLinkNumber">
                    {item.id}
                  </span>

                  <span className="contactLinkIcon">
                    <Icon />
                  </span>

                  <span className="contactLinkInfo">
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>

                  <span className="contactLinkArrow">
                    <FiArrowUpRight />
                  </span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="contactVisual">
          <div className="contactVisualGlow" />
          <ContactScene />
        </div>
      </div>

      <footer className="portfolioFooter">
        <div className="footerIdentity">
          <a href="#home" className="footerLogo">
            Gagana.
          </a>

          <span>Undergraduate Student</span>
        </div>

        <p className="footerCopyright">
          © 2026 Gagana Prasad
        </p>

        <a href="#home" className="backToTop">
          Back to Top
          <span>↑</span>
        </a>
      </footer>
    </section>
  )
}

export default Contact