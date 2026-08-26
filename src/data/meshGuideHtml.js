import { contact } from './contact.js'
import { gradeGallery, meshNav, meshSections } from './meshRecommendations.js'

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderTable(table) {
  const note = table.note ? `<p class="mesh-table-note">${escapeHtml(table.note)}</p>` : ''
  const rows = table.rows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`,
    )
    .join('')
  const image = table.image
    ? `<figure class="mesh-grade-figure"><img src="${escapeHtml(table.image.src)}" alt="${escapeHtml(table.image.alt)}" loading="lazy" /><figcaption>${escapeHtml(table.image.alt)}</figcaption></figure>`
    : ''
  return `<div class="mesh-table-wrap">
  <div class="mesh-table-layout${table.image ? ' has-image' : ''}">
    <div class="mesh-table-main">
      <h3>${escapeHtml(table.title)}</h3>
      ${note}
      <div class="mesh-table-scroll">
        <table class="mesh-table">
          <thead><tr>${table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
    ${image}
  </div>
</div>`
}

/**
 * Build-time HTML for /screening-recommendation so crawlers see the mesh guide without JS.
 */
export function buildMeshGuideHtml() {
  const gallery = gradeGallery
    .map(
      (item) => `<figure class="mesh-grade-thumb">
  <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy" />
  <figcaption>${escapeHtml(item.alt.replace(/ product( grade)? example$/i, ''))}</figcaption>
</figure>`,
    )
    .join('\n')

  const nav = meshNav
    .map((item) => `<a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a>`)
    .join('\n')

  const sections = meshSections
    .map((section) => {
      const sectionImage = section.image
        ? `<figure class="mesh-grade-figure"><img src="${escapeHtml(section.image.src)}" alt="${escapeHtml(section.image.alt)}" loading="lazy" /><figcaption>${escapeHtml(section.image.alt)}</figcaption></figure>`
        : ''
      const tables = section.tables.map(renderTable).join('\n')
      return `<section id="${escapeHtml(section.id)}" class="mesh-section">
  <h2>${escapeHtml(section.title)}</h2>
  <p class="mesh-section-intro">${escapeHtml(section.intro)}</p>
  ${sectionImage}
  ${tables}
</section>`
    })
    .join('\n')

  return `<!-- Mesh guide (static prerender) -->
<section class="page-content mesh-page">
  <div class="mesh-hero">
    <h1>Screen Mesh Recommendation Guide</h1>
    <p>
      Choose the right DeSite mesh for topsoil, gravel, compost, mulch, farm filling and
      aggregate. Charts below are tailored for Pro Screen Australia operators — imperial openings
      (industry standard) with approximate metric context where helpful.
    </p>
    <p class="mesh-hero-links">
      Immediate farm and civil offer: 100 mm first, then 50 mm or 3 inch (~75 mm) filling.
      <a href="#farm-filling">Farm gravel and cow races</a>
      · <a href="/for/farmers">Farmers</a>
      · <a href="/for/civil-contractors">Civil contractors</a>
      · <a href="/products/static-grizzly">Static Grizzly</a>
      · <a href="#aggregates">Aggregates</a>
    </p>
  </div>

  <div class="mesh-grade-gallery">
    <h2>Product grade examples</h2>
    <p>Visual reference for finished material size — use alongside the charts when choosing mesh.</p>
    <div class="mesh-grade-strip">
      ${gallery}
    </div>
  </div>

  <nav class="mesh-nav" aria-label="Mesh guide sections">
    ${nav}
  </nav>

  ${sections}

  <div class="product-description mesh-cta">
    <h2>Need help picking a mesh?</h2>
    <p>
      Tell us what you are screening and which machine you run — we will recommend openings that
      Based in Sydney — supply Australia-wide. Call Rob to match mesh to your material and carrier.
    </p>
    <div class="cta-buttons">
      <a href="tel:${contact.phoneTel}" class="cta-primary">Call ${escapeHtml(contact.phoneDisplay)}</a>
      <a href="https://wa.me/61433045045" class="cta-secondary">WhatsApp Rob</a>
      <a href="/products/static-grizzly" class="cta-secondary">Static Grizzly</a>
      <a href="/contact" class="cta-secondary">Contact</a>
    </div>
  </div>
</section>`
}
