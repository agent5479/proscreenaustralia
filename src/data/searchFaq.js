import { contact } from './contact.js'

/**
 * FAQ copy mapped to real Search Console / Bing queries
 * (soil screener, skid steer screen, XD70, power rock screen + topsoil, etc.).
 */
export const searchFaqs = [
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
    question: 'What portable soil screener or dirt screener do you supply in Australia?',
    answer:
      'Pro Screen Australia stocks DeSite portable soil screeners nationwide: SLG-68V (small / compact dirt screener), SLG-78VF (skid-steer class), SLG-108VFRB (full-size), plus SLG-56 and SLG-48 mini screeners. They screen soil, dirt, topsoil, gravel and aggregate. Call Rob to view a machine in your area.',
  },
  {
    question: 'Do you sell compact aggregate screening plants in Australia?',
    answer:
      'We supply compact, portable screening machines rather than a full crushing and screening plant. DeSite Proscreens and Static Grizzlies grade aggregate, road metal, gravel and recycled concrete on the job with the carrier you already run — that is usually what operators mean by a compact aggregate screening plant at this scale. Stocked in Australia, freight arranged with you.',
  },
  {
    question: 'Do you stock an XD70 dump trailer?',
    answer:
      'DeSite’s current Xtreme Duty dump trailers are the XD 35 (3.5 cubic yards), XD 55 (5.5 cubic yards) and XD 80 (8 cubic yards). There is no XD70 in the range Pro Screen Australia stocks. If you searched XD70, the closest capacities are the XD 55 and XD 80. Call Rob to match trailer size to your excavator or skid steer.',
  },
]

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function buildSearchFaqHtml() {
  const items = searchFaqs
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
    <p class="section-subtitle">Straight answers for operators comparing portable soil screeners, skid-steer screens and compact aggregate machines in Australia</p>
    ${items}
    <p class="search-faq-cta"><a href="${contact.siteUrl}/contact">Contact Pro Screen Australia</a> or call ${escapeHtml(contact.phoneDisplay)}.</p>
  </div>
</section>
`
}

export function searchFaqJsonLd() {
  return {
    '@type': 'FAQPage',
    '@id': `${contact.siteUrl}/#faq`,
    mainEntity: searchFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
