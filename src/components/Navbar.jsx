import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const toggleMenu = () => {
    setMenuOpen((current) => !current)
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <a
        href="#home"
        className="logo"
        onClick={closeMenu}
        aria-label="Go to home"
      >
        Gagana
      </a>

      {/* Navigation */}
      <div
        className={`navLinks ${menuOpen ? 'active' : ''}`}
      >
        <a
          href="#home"
          onClick={closeMenu}
        >
          Home
        </a>

        <a
          href="#about"
          onClick={closeMenu}
        >
          About
        </a>

        <a
          href="#skills"
          onClick={closeMenu}
        >
          Skills
        </a>

        <a
          href="#projects"
          onClick={closeMenu}
        >
          Projects
        </a>

        <a
          href="#experience $ leadership"
          onClick={closeMenu}
        >
          Experience & Leadership
        </a>

        <a
          href="#contact"
          onClick={closeMenu}
        >
          Contact
        </a>
      </div>

      {/* Mobile Menu */}
      <button
        type="button"
        className={`menuButton ${menuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

    </nav>
  )
}

export default Navbar