import { contact } from './contact.js'

/**
 * Homepage FAQ — soil-screener commercial intent only.
 * XD70 / compact-plant answers live on product pages, not the home graph.
 */
export const homeFaqs = [
  {
    question: 'Can you use a power rock screen with topsoil?',
    answer:
      'You can run topsoil over a high-amplitude rock or “power” screen, but that deck is built for oversize stone, not a fine dirt or top-dressing grade. DeSite vibratory Proscreens (SLG-68V, SLG-78VF and SLG-108VFRB) take finer mesh and a quieter action for soil screening. Knock rock off first with a Static Grizzly or bar grizzly, then screen the soil fraction on a Proscreen. Call Pro Screen Australia to match mesh to the finish you need.',
  },
  {
    question: 'Do you sell a screen attachment for a skid steer?',
    answer:
      'Yes. The DeSite SLG-78VF is the portable soil screener designed to be fed by a skid steer or compact loader — optional bucket lugs let you pick it up and move it on site while you screen topsoil, dirt and gravel. Smaller skids and mini excavators use the SLG-56 / SLG-48 mini screeners or the compact SLG-68V. The Mulle Bin and SR rippers on our attachments page are material-handling tools, not screeners.',
  },
  {
    question: 'What portable soil screener do you supply in Australia?',
    answer:
      'Pro Screen Australia stocks DeSite portable soil screeners nationwide: SLG-68V (small / compact), SLG-78VF (skid-steer class), SLG-108VFRB (full-size), plus SLG-56 and SLG-48 mini screeners. They screen soil, dirt, topsoil, gravel and aggregate. Call Rob to view a machine in your area.',
  },
]

/** @deprecated Use homeFaqs — kept for any imports expecting searchFaqs */
export const searchFaqs = homeFaqs

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function buildSearchFaqHtml() {
  const items = homeFaqs
    .map(
      (faq) => `<article class="search-faq-item">
    <h3>${escapeHtml(faq.question)}</h3>
    <p>${escapeHtml(faq.answer)}</p>
  </article>`,
    )
    .join('\n')

  return `
<section class="search-faq" id="faq">
  <div class="container">
    <h2 class="section-title">Soil screener questions</h2>
    <p class="section-subtitle">Portable soil screeners, skid-steer screens and topsoil vs power rock screens — answered for Australian operators</p>
    ${items}
    <p class="search-faq-cta"><a href="${contact.siteUrl}/contact">Contact Pro Screen Australia</a> or call ${escapeHtml(contact.phoneDisplay)}.</p>
  </div>
</section>
`
}

export function homeFaqJsonLd() {
  return {
    '@type': 'FAQPage',
    '@id': `${contact.siteUrl}/#faq`,
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/** @deprecated Use homeFaqJsonLd */
export function searchFaqJsonLd() {
  return homeFaqJsonLd()
}
