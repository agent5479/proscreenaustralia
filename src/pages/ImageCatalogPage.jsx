import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contact, emailHref, phoneHref } from '../data/contact'
import { imageCatalog, imageCatalogNav } from '../data/imageCatalog'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)
  const titleId = useId()
  const image = images[index]

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  if (!image) return null

  return (
    <div
      className="image-catalog-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="image-catalog-lightbox-inner"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="image-catalog-lightbox-close"
          onClick={onClose}
          aria-label="Close full-size image"
        >
          ×
        </button>
        <button
          type="button"
          className="image-catalog-lightbox-nav prev"
          onClick={onPrev}
          aria-label="Previous image"
          disabled={images.length < 2}
        >
          ‹
        </button>
        <figure className="image-catalog-lightbox-figure">
          <img src={image.src} alt={image.alt} decoding="async" />
          <figcaption id={titleId}>
            {image.alt}
            <span className="image-catalog-lightbox-count">
              {index + 1} / {images.length}
            </span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="image-catalog-lightbox-nav next"
          onClick={onNext}
          aria-label="Next image"
          disabled={images.length < 2}
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default function ImageCatalogPage() {
  const [lightbox, setLightbox] = useState(null)
  const returnFocusRef = useRef(null)

  const openAt = useCallback((groupId, imageIndex, triggerEl) => {
    returnFocusRef.current = triggerEl ?? null
    setLightbox({ groupId, imageIndex })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    requestAnimationFrame(() => returnFocusRef.current?.focus?.())
  }, [])

  const activeGroup = lightbox
    ? imageCatalog.find((g) => g.id === lightbox.groupId)
    : null
  const activeImages = activeGroup?.images ?? []

  const goPrev = useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return cur
      const group = imageCatalog.find((g) => g.id === cur.groupId)
      if (!group?.images.length) return cur
      const next =
        (cur.imageIndex - 1 + group.images.length) % group.images.length
      return { ...cur, imageIndex: next }
    })
  }, [])

  const goNext = useCallback(() => {
    setLightbox((cur) => {
      if (!cur) return cur
      const group = imageCatalog.find((g) => g.id === cur.groupId)
      if (!group?.images.length) return cur
      const next = (cur.imageIndex + 1) % group.images.length
      return { ...cur, imageIndex: next }
    })
  }, [])

  return (
    <section className="page-content image-catalog">
      <div className="image-catalog-hero">
        <h1>Complete Image Catalog</h1>
        <p>
          All Pro Screen Australia / DeSite equipment photos sorted by model. Click a
          thumbnail to view the full-size image. Includes local product shots plus
          manufacturer galleries from DeSite Products Australia.
        </p>
        <p className="image-catalog-hero-links">
          <Link to="/photos">Curated photo gallery</Link>
          {' · '}
          <Link to="/videos">Videos</Link>
          {' · '}
          <Link to="/#equipment">Products</Link>
          {' · '}
          <Link to="/contact">Contact</Link>
        </p>
      </div>

      <nav className="image-catalog-nav" aria-label="Models">
        {imageCatalogNav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>

      {imageCatalog.map((group) => (
        <section
          key={group.id}
          id={group.id}
          className="image-catalog-section"
        >
          <div className="image-catalog-section-head">
            <h2>{group.title}</h2>
            {group.href && (
              <Link to={group.href} className="image-catalog-product-link">
                View product page
              </Link>
            )}
          </div>
          <div className="image-catalog-grid">
            {group.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="image-catalog-thumb"
                onClick={(event) => openAt(group.id, index, event.currentTarget)}
                aria-label={`Open full size: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </section>
      ))}

      <div className="product-description image-catalog-cta">
        <h2>Looking for a machine?</h2>
        <p>
          Tell us what you are screening and we will match a DeSite model —
          nationwide supply from our viewing in your area.
        </p>
        <div className="cta-buttons">
          <a href={phoneHref} className="cta-primary">
            Call {contact.phoneDisplay}
          </a>
          <a href={emailHref} className="cta-secondary">
            WhatsApp Rob
          </a>
          <Link to="/photos" className="cta-secondary">
            Photos
          </Link>
          <Link to="/contact" className="cta-secondary">
            Contact
          </Link>
        </div>
      </div>

      {lightbox && activeImages.length > 0 && (
        <Lightbox
          images={activeImages}
          index={lightbox.imageIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </section>
  )
}
