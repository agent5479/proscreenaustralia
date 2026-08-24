import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { contact, phoneHref, whatsappHref, withBase } from '../data/contact'

export default function Nav({ showTagline = false }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onDocClick = (event) => {
      const nav = document.querySelector('.sticky-nav')
      if (!nav) return
      if (!nav.contains(event.target) && open) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  const productsTo = '/#equipment'

  const onProductsClick = (event) => {
    if (location.pathname === '/') {
      event.preventDefault()
      const el = document.getElementById('equipment')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <nav className="sticky-nav">
      <div className="nav-content">
        <div className="nav-brand">
          <Link to="/" className="nav-logo-lockup">
            <span className="nav-desite-mark">
              <img src={withBase('/images/desite-logo.png')} alt="DeSite Products" />
            </span>
            <span className="nav-logo">PRO SCREEN AUSTRALIA</span>
          </Link>
          {showTagline && (
            <span className="nav-tagline">Affordable, top quality soil, gravel and aggregate screening machines</span>
          )}
        </div>
        <button
          className={`mobile-menu-toggle${open ? ' active' : ''}`}
          aria-label="Toggle menu"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-menu${open ? ' active' : ''}`} id="navMenu">
          <Link to="/">Home</Link>
          <Link to={productsTo} onClick={onProductsClick}>
            Products
          </Link>
          <Link to="/about">About Us</Link>
          <Link to="/photos">Photos</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="nav-contact">
          <a href={phoneHref} className="nav-phone">
            Call Rob {contact.phoneDisplay}
          </a>
          <a href={whatsappHref} className="nav-whatsapp" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a
            href={contact.instagramUrl}
            className="nav-instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </nav>
  )
}
