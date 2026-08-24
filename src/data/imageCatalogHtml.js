import { contact } from './contact.js'
import { imageCatalog, imageCatalogNav } from './imageCatalog.js'

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

/**
 * Build-time HTML for /image-catalog so crawlers see the catalog without JS.
 * Thumbs link to the full image file (no lightbox in static shell).
 */
export function buildImageCatalogHtml() {
  const nav = imageCatalogNav
    .map((item) => `<a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a>`)
    .join('\n')

  const sections = imageCatalog
    .map((group) => {
      const productLink = group.href
        ? `<a href="${escapeHtml(group.href)}" class="image-catalog-product-link">View product page</a>`
        : ''
      const thumbs = group.images
        .map(
          (image) => `<a class="image-catalog-thumb" href="${escapeHtml(image.src)}" target="_blank" rel="noopener">
  <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async" />
</a>`,
        )
        .join('\n')
      return `<section id="${escapeHtml(group.id)}" class="image-catalog-section">
  <div class="image-catalog-section-head">
    <h2>${escapeHtml(group.title)}</h2>
    ${productLink}
  </div>
  <div class="image-catalog-grid">
    ${thumbs}
  </div>
</section>`
    })
    .join('\n')

  return `<!-- Image catalog (static prerender) -->
<section class="page-content image-catalog">
  <div class="image-catalog-hero">
    <h1>Complete Image Catalog</h1>
    <p>
      All Pro Screen Australia / DeSite equipment photos sorted by model. Click a
      thumbnail to view the full-size image. Includes local product shots plus
      manufacturer galleries from DeSite Products Australia.
    </p>
    <p class="image-catalog-hero-links">
      <a href="/photos">Curated photo gallery</a>
      · <a href="/videos">Videos</a>
      · <a href="/#equipment">Products</a>
      · <a href="/contact">Contact</a>
    </p>
  </div>

  <nav class="image-catalog-nav" aria-label="Models">
    ${nav}
  </nav>

  ${sections}

  <div class="product-description image-catalog-cta">
    <h2>Looking for a machine?</h2>
    <p>
      Tell us what you are screening and we will match a DeSite model —
      nationwide supply from our viewing in your area.
    </p>
    <div class="cta-buttons">
      <a href="tel:${contact.phoneTel}" class="cta-primary">Call ${escapeHtml(contact.phoneDisplay)}</a>
      <a href="https://wa.me/61433045045" class="cta-secondary">WhatsApp Rob</a>
      <a href="/photos" class="cta-secondary">Photos</a>
      <a href="/contact" class="cta-secondary">Contact</a>
    </div>
  </div>
</section>`
}
