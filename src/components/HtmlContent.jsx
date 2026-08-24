import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { prefixHtml, contact } from '../data/contact'

/**
 * Renders migrated HTML content and routes internal links through React Router.
 */
export default function HtmlContent({ html }) {
  const navigate = useNavigate()
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const onClick = (event) => {
      const anchor = event.target.closest('a')
      if (!anchor || event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // External / special protocols
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('//')
      ) {
        return
      }

      // In-page hash on current path
      if (href.startsWith('#')) {
        event.preventDefault()
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // Internal app routes
      if (href.startsWith('/')) {
        event.preventDefault()
        let path = href
        const base = contact.basePath || ''
        if (base && (path === base || path.startsWith(`${base}/`))) {
          path = path.slice(base.length) || '/'
        }
        const [pathname, hash] = path.split('#')
        navigate(pathname || '/')
        if (hash) {
          requestAnimationFrame(() => {
            const el = document.getElementById(hash)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        } else {
          window.scrollTo(0, 0)
        }
      }
    }

    // Feature card expand (ported from main.js)
    const onExpandClick = (event) => {
      const btn = event.target.closest('.expand-btn')
      if (!btn) return
      const card = btn.closest('.feature-card')
      if (!card) return
      event.preventDefault()
      const expandSection = card.querySelector('.feature-expand')
      if (!expandSection) return
      if (expandSection.classList.contains('active')) {
        expandSection.classList.remove('active')
        btn.textContent = 'Learn More'
      } else {
        root.querySelectorAll('.feature-expand.active').forEach((section) => {
          section.classList.remove('active')
          const otherBtn = section.parentElement?.querySelector('.expand-btn')
          if (otherBtn) otherBtn.textContent = 'Learn More'
        })
        expandSection.classList.add('active')
        btn.textContent = 'Show Less'
      }
    }

    // Image load markers
    root.querySelectorAll('img').forEach((img) => {
      const markLoaded = () => {
        img.setAttribute('data-image-loaded', 'true')
        img.setAttribute('data-image-loading', 'false')
        img.removeAttribute('data-image-error')
      }
      const markError = () => {
        img.setAttribute('data-image-error', 'true')
        img.setAttribute('data-image-loading', 'false')
      }
      if (img.complete && img.naturalWidth > 0) markLoaded()
      else if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) markError()
      else {
        img.setAttribute('data-image-loading', 'true')
        img.addEventListener('load', markLoaded, { once: true })
        img.addEventListener('error', markError, { once: true })
      }
    })

    root.addEventListener('click', onClick)
    root.addEventListener('click', onExpandClick)
    return () => {
      root.removeEventListener('click', onClick)
      root.removeEventListener('click', onExpandClick)
    }
  }, [html, navigate])

  return <div ref={ref} className="html-content" dangerouslySetInnerHTML={{ __html: prefixHtml(html) }} />
}
