import { Link } from 'react-router-dom'
import PhrasePicker from '../../components/PhrasePicker'
import { contact, emailHref, phoneHref } from '../../data/contact'

const phrases = {
  hook: [
    'Contractors do not want fine topsoil screens for this job — they want wider openings that shrug off rock, recycled concrete and oversize, on a frame built to last with no electrics to babysit.',
    'Lead with tough, wide-mesh grizzly performance: separate oversize fast, keep the job moving, and skip the power pack.',
    'The most sought setup is simple — wide square mesh, heavy structure, zero electrics. Built for aggregate, not garden mulch.',
  ],
  tagline: [
    'Wider mesh. Built tough. No power required.',
    'Screen oversize. Keep working. Stay offline.',
    '2″ / 3″ / 4″ mesh. Grizzly tough. Static simple.',
  ],
  mesh: [
    '2″ × 2″, 3″ × 3″ and 4″ × 4″ square options — ideal for pre-screening and oversize separation, with quick-change mesh and double-lock crimp weave.',
    'Wide openings contractors actually ask for. Swap mesh in minutes; keep one machine across multiple aggregate jobs.',
    'Lead with 4″ / ~100 mm class for the hardest oversize work, then step down to 3″ or 2″ when the product size tightens.',
  ],
  durability: [
    'Rugged static grizzly design — no power required, spring suspension to reduce clogging, tilting deck for control, 3-year structural warranty.',
    'Durability first: heavy build, low maintenance, and a tilting deck that keeps material moving when traditional bars bind up.',
    'No engine, no electrics, no babysitting. Suspension + tilt deliver grizzly toughness with cleaner flow than fixed bars.',
  ],
  applications: [
    'Aggregate: road gravel, landscape and decorative stone, erosion rock. Recycled: asphalt, crushed concrete, wood mulch. Fits skid steers, bucket tractors, mid excavators and compact loaders.',
    'Built for base rock, crushed concrete and decorative stone — the jobs where wide mesh and a tough deck earn their keep.',
    'One machine for oversize on civil and recycle sites — mid-size gear, wide mesh, contact for pricing.',
  ],
  cta: [
    'Soft close: view the product page, check the mesh guide, then call for the right opening and setup.',
    'Ready to specify mesh and machine? Talk to Pro Screen Australia — Australia-wide.',
    'See the Static Grizzly details (78 and 108), then contact us for current pricing and delivery.',
  ],
}

export default function GrizzlyCommercialPage() {
  return (
    <section className="page-content commercials-page commercials-compact">
      <div className="commercials-banner commercials-banner-compact">
        <div className="commercials-banner-row">
          <Link to="/idm/commercials" className="commercials-kicker-inline">
            ← Hub
          </Link>
          <span className="commercials-badge">Director pick · Grizzly</span>
        </div>
        <h1>Grizzly — Wide Mesh &amp; Durability</h1>
        <p className="commercials-sub">Click a phrasing to keep it; others hide. Use Change to re-pick.</p>
      </div>

      <div className="promo-hero-media promo-hero-compact">
        <img src="/images/grizzly2.jpg" alt="DeSite Static Grizzly screener" />
        <img src="/images/grizzly3.jpg" alt="Grizzly screening dirt, stone and sticks" />
      </div>

      <PhrasePicker id="grizzly-hook" label="Hook" options={phrases.hook} />
      <PhrasePicker id="grizzly-tagline" label="Lead line" options={phrases.tagline} />
      <PhrasePicker id="grizzly-mesh" label="Wide mesh" options={phrases.mesh} />
      <PhrasePicker id="grizzly-durability" label="Durability" options={phrases.durability} />
      <PhrasePicker id="grizzly-apps" label="Applications" options={phrases.applications} />
      <PhrasePicker id="grizzly-cta" label="Close / CTA" options={phrases.cta} />

      <div className="promo-feature-row promo-feature-compact">
        <figure>
          <img src="/images/TILTING-SCREEN-DECK-78STATIC_2.webp" alt="Tilting screen deck" />
          <figcaption>Tilt deck</figcaption>
        </figure>
        <figure>
          <img src="/images/SUSPENSION-78STATIC.webp" alt="Spring suspension system" />
          <figcaption>Suspension</figcaption>
        </figure>
      </div>

      <div className="cta-buttons commercials-cta-compact">
        <Link to="/products/static-grizzly" className="cta-primary">
          Product page
        </Link>
        <Link to="/screening-recommendation" className="cta-secondary">
          Mesh guide
        </Link>
        <a href={phoneHref} className="cta-secondary">
          {contact.phoneDisplay}
        </a>
        <a href={emailHref} className="cta-secondary">
          WhatsApp
        </a>
      </div>
    </section>
  )
}
