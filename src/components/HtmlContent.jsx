import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { prefixHtml, contact } from '../data/contact'

const PRODUCTION_RATES = {
  68: [
    { label: 'Compact bucket (~0.4 m³)', rate: 12 },
    { label: 'Standard bucket (~0.6 m³)', rate: 16 },
    { label: 'Large compact bucket (~0.8 m³)', rate: 20 },
  ],
  78: [
    { label: 'Compact / skidsteer (~0.5 m³)', rate: 15 },
    { label: 'Standard bucket (~0.8 m³)', rate: 20 },
    { label: 'Large bucket (~1.2 m³)', rate: 25 },
  ],
  108: [
    { label: 'Loader bucket (~1.2 m³)', rate: 25 },
    { label: 'Large loader bucket (~1.6 m³)', rate: 32 },
    { label: 'Wide loader bucket (~2.0 m³+)', rate: 40 },
  ],
  dual78: [
    { label: 'Standard buckets', rate: 30 },
    { label: 'Large buckets', rate: 42 },
    { label: 'Extra-large buckets', rate: 56 },
  ],
}

function formatAud(amount) {
  return `A$${Math.round(amount).toLocaleString('en-AU')}`
}

function bindProfitCalculator(root) {
  const modelSelect = root.querySelector('#modelSelect')
  const bucketSelect = root.querySelector('#bucketSelect')
  const priceInput = root.querySelector('#pricePerCubic')
  const rateDisplay = root.querySelector('#productionRateDisplay')
  const saleableEl = root.querySelector('#saleableMaterial')
  const hourEl = root.querySelector('#revenuePerHour')
  const dayEl = root.querySelector('#revenuePerDay')
  const weekEl = root.querySelector('#revenuePerWeek')

  if (!modelSelect || !bucketSelect || !priceInput) return () => {}

  const fillBuckets = (model) => {
    const options = PRODUCTION_RATES[model] || []
    bucketSelect.innerHTML = options.length
      ? '<option value="">Select bucket size</option>' +
        options.map((opt, i) => `<option value="${i}">${opt.label}</option>`).join('')
      : '<option value="">Select model first</option>'
    bucketSelect.disabled = options.length === 0
  }

  const update = () => {
    const model = modelSelect.value
    const buckets = PRODUCTION_RATES[model]
    const bucket = buckets?.[Number(bucketSelect.value)]
    const price = Number(priceInput.value)

    if (!bucket || !Number.isFinite(price) || price <= 0) {
      if (rateDisplay) rateDisplay.textContent = 'Select model and bucket size'
      return
    }

    const screened = bucket.rate
    const saleable = screened * 0.5
    const hourly = saleable * price
    if (rateDisplay) rateDisplay.textContent = `${screened} m³/hour screened`
    if (saleableEl) saleableEl.textContent = `${saleable} m³/hr`
    if (hourEl) hourEl.textContent = formatAud(hourly)
    if (dayEl) dayEl.textContent = formatAud(hourly * 8)
    if (weekEl) weekEl.textContent = formatAud(hourly * 8 * 5)
  }

  const onModelChange = () => {
    fillBuckets(modelSelect.value)
    update()
  }

  modelSelect.addEventListener('change', onModelChange)
  bucketSelect.addEventListener('change', update)
  priceInput.addEventListener('input', update)

  if (modelSelect.value) fillBuckets(modelSelect.value)
  update()

  return () => {
    modelSelect.removeEventListener('change', onModelChange)
    bucketSelect.removeEventListener('change', update)
    priceInput.removeEventListener('input', update)
  }
}

let vimeoPlayerLoader

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function loadVimeoPlayer() {
  if (window.Vimeo?.Player) return Promise.resolve(window.Vimeo.Player)
  if (vimeoPlayerLoader) return vimeoPlayerLoader
  vimeoPlayerLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-vimeo-player-api]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Vimeo.Player), { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    script.dataset.vimeoPlayerApi = 'true'
    script.onload = () => resolve(window.Vimeo.Player)
    script.onerror = reject
    document.head.appendChild(script)
  })
  return vimeoPlayerLoader
}

function bindHeroVideo(root) {
  const hero = root.querySelector('.hero-has-video')
  const iframe = root.querySelector('.hero-video')
  const soundBtn = root.querySelector('.hero-sound')
  if (!hero || !iframe) return () => {}

  if (prefersReducedMotion()) {
    iframe.remove()
    soundBtn?.remove()
    return () => {}
  }

  let player = null
  let observer = null
  let cancelled = false

  const onSound = async () => {
    if (!player) return
    try {
      const muted = await player.getMuted()
      if (muted) {
        await player.setVolume(1)
        await player.setMuted(false)
        soundBtn.textContent = 'MUTE'
        soundBtn.setAttribute('aria-pressed', 'true')
      } else {
        await player.setMuted(true)
        soundBtn.textContent = 'UNMUTE'
        soundBtn.setAttribute('aria-pressed', 'false')
      }
    } catch {
      /* autoplay policies can block unmute until a later gesture */
    }
  }

  loadVimeoPlayer()
    .then((Player) => {
      if (cancelled) return
      player = new Player(iframe)
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (!player || !entry) return
          if (entry.isIntersecting) player.play().catch(() => {})
          else player.pause().catch(() => {})
        },
        { threshold: 0.2 },
      )
      observer.observe(hero)
    })
    .catch(() => {})

  soundBtn?.addEventListener('click', onSound)

  return () => {
    cancelled = true
    observer?.disconnect()
    soundBtn?.removeEventListener('click', onSound)
  }
}

function setEquipmentOpen(card, open) {
  const details = card.querySelector('.equipment-details')
  const btn = card.querySelector('.equipment-toggle')
  card.classList.toggle('is-open', open)
  if (details) details.hidden = !open
  if (btn) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false')
    btn.textContent = open ? 'Show less' : 'More details'
  }
}

function bindEquipmentCards(root) {
  root.querySelectorAll('.equipment-card').forEach((card) => {
    const content = card.querySelector('.equipment-content')
    if (!content || content.querySelector('.equipment-toggle')) return

    const summary = content.querySelector(':scope > p')
    if (!summary) return

    const detailNodes = []
    let pastSummary = false
    ;[...content.children].forEach((child) => {
      if (child === summary) {
        pastSummary = true
        return
      }
      if (pastSummary) detailNodes.push(child)
    })
    if (!detailNodes.length) return

    const details = document.createElement('div')
    details.className = 'equipment-details'
    details.hidden = true
    detailNodes.forEach((node) => details.appendChild(node))

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'equipment-toggle'
    toggle.setAttribute('aria-expanded', 'false')
    toggle.textContent = 'More details'

    summary.after(toggle)
    toggle.after(details)
    card.classList.add('is-collapsible')
  })

  const onClick = (event) => {
    const toggle = event.target.closest('.equipment-toggle')
    if (toggle && root.contains(toggle)) {
      event.preventDefault()
      const card = toggle.closest('.equipment-card')
      if (!card) return
      setEquipmentOpen(card, !card.classList.contains('is-open'))
      return
    }

    const mediaLink = event.target.closest('.equipment-card > a')
    if (mediaLink && root.contains(mediaLink)) {
      const card = mediaLink.closest('.equipment-card')
      if (card?.classList.contains('is-collapsible') && !card.classList.contains('is-open')) {
        event.preventDefault()
        setEquipmentOpen(card, true)
      }
    }
  }

  root.addEventListener('click', onClick)
  return () => root.removeEventListener('click', onClick)
}

function bindIgStories(root) {
  const rail = root.querySelector('.ig-stories-rail')
  if (!rail) return () => {}

  const stories = [...rail.querySelectorAll('.ig-story')]
  if (!stories.length) return () => {}

  let viewer = root.querySelector('.ig-story-viewer')
  if (!viewer) {
    viewer = document.createElement('div')
    viewer.className = 'ig-story-viewer'
    viewer.hidden = true
    viewer.innerHTML = `
      <div class="ig-story-viewer-frame" role="dialog" aria-modal="true" aria-label="Equipment story">
        <div class="ig-story-progress" aria-hidden="true"></div>
        <header class="ig-story-viewer-head">
          <div class="ig-story-viewer-identity">
            <img class="ig-story-viewer-avatar" alt="" />
            <div>
              <strong class="ig-story-viewer-title"></strong>
              <span class="ig-story-viewer-handle">@proscreen_australia</span>
            </div>
          </div>
          <button type="button" class="ig-story-close" aria-label="Close story">×</button>
        </header>
        <img class="ig-story-viewer-image" alt="" />
        <p class="ig-story-viewer-caption"></p>
        <a class="ig-story-viewer-cta" href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">Follow on Instagram</a>
        <button type="button" class="ig-story-nav ig-story-nav-prev" aria-label="Previous story"></button>
        <button type="button" class="ig-story-nav ig-story-nav-next" aria-label="Next story"></button>
      </div>
    `
    root.appendChild(viewer)
  }

  const progress = viewer.querySelector('.ig-story-progress')
  const avatar = viewer.querySelector('.ig-story-viewer-avatar')
  const titleEl = viewer.querySelector('.ig-story-viewer-title')
  const imageEl = viewer.querySelector('.ig-story-viewer-image')
  const captionEl = viewer.querySelector('.ig-story-viewer-caption')
  const closeBtn = viewer.querySelector('.ig-story-close')
  const prevBtn = viewer.querySelector('.ig-story-nav-prev')
  const nextBtn = viewer.querySelector('.ig-story-nav-next')

  let index = 0
  let timer = null
  let reduced = prefersReducedMotion()

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const markSeen = (i) => {
    stories[i]?.classList.add('is-seen')
  }

  const renderProgress = () => {
    progress.innerHTML = stories
      .map(
        (_, i) =>
          `<span class="ig-story-progress-seg${i < index ? ' is-done' : ''}${i === index ? ' is-active' : ''}"><i></i></span>`,
      )
      .join('')
  }

  const closeViewer = () => {
    clearTimer()
    viewer.hidden = true
    document.body.classList.remove('ig-story-open')
  }

  const showStory = (nextIndex) => {
    if (nextIndex < 0) {
      closeViewer()
      return
    }
    if (nextIndex >= stories.length) {
      closeViewer()
      return
    }

    index = nextIndex
    const story = stories[index]
    const src = story.dataset.igSrc || story.querySelector('img')?.getAttribute('src') || ''
    const title = story.dataset.igTitle || story.querySelector('.ig-story-label')?.textContent || ''
    const caption = story.dataset.igCaption || ''

    avatar.src = src
    imageEl.src = src
    imageEl.alt = title
    titleEl.textContent = title
    captionEl.textContent = caption
    markSeen(index)
    renderProgress()
    viewer.hidden = false
    document.body.classList.add('ig-story-open')

    clearTimer()
    if (!reduced) {
      timer = window.setTimeout(() => showStory(index + 1), 5200)
    }
  }

  const onRailClick = (event) => {
    const story = event.target.closest('.ig-story')
    if (!story || !rail.contains(story)) return
    event.preventDefault()
    showStory(stories.indexOf(story))
  }

  const onViewerClick = (event) => {
    if (event.target === viewer) {
      closeViewer()
      return
    }
    if (event.target.closest('.ig-story-close')) {
      event.preventDefault()
      closeViewer()
      return
    }
    if (event.target.closest('.ig-story-nav-prev')) {
      event.preventDefault()
      showStory(index - 1)
      return
    }
    if (event.target.closest('.ig-story-nav-next')) {
      event.preventDefault()
      showStory(index + 1)
    }
  }

  const onKey = (event) => {
    if (viewer.hidden) return
    if (event.key === 'Escape') closeViewer()
    if (event.key === 'ArrowRight') showStory(index + 1)
    if (event.key === 'ArrowLeft') showStory(index - 1)
  }

  rail.addEventListener('click', onRailClick)
  viewer.addEventListener('click', onViewerClick)
  closeBtn?.addEventListener('click', closeViewer)
  prevBtn?.addEventListener('click', () => showStory(index - 1))
  nextBtn?.addEventListener('click', () => showStory(index + 1))
  document.addEventListener('keydown', onKey)

  return () => {
    clearTimer()
    document.body.classList.remove('ig-story-open')
    rail.removeEventListener('click', onRailClick)
    viewer.removeEventListener('click', onViewerClick)
    document.removeEventListener('keydown', onKey)
  }
}

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

    const unbindCalculator = bindProfitCalculator(root)
    const unbindHeroVideo = bindHeroVideo(root)
    const unbindEquipmentCards = bindEquipmentCards(root)
    const unbindIgStories = bindIgStories(root)

    root.addEventListener('click', onClick)
    root.addEventListener('click', onExpandClick)
    return () => {
      unbindCalculator()
      unbindHeroVideo()
      unbindEquipmentCards()
      unbindIgStories()
      root.removeEventListener('click', onClick)
      root.removeEventListener('click', onExpandClick)
    }
  }, [html, navigate])

  return <div ref={ref} className="html-content" dangerouslySetInnerHTML={{ __html: prefixHtml(html) }} />
}
