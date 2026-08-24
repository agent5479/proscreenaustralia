import { Link } from 'react-router-dom'
import PhrasePicker from '../../components/PhrasePicker'
import { contact, emailHref, phoneHref } from '../../data/contact'

const phrases = {
  hook: [
    'DeSite vibratory Proscreens turn spoil into saleable product on-site — cut tip fees, cut buy-in costs, and keep material working for you.',
    'Screen, grade and reuse where you stand. Unique DeSite vibratory action, NZ supply and support from Pro Screen Australia.',
    'From compact 68V to heavy 108VFRB — quiet, low-maintenance vibratory screening built for Australia contractors.',
  ],
  tagline: [
    'Screen on-site. Sell the product. Skip the tip.',
    'Vibratory power. Low maintenance. NZ backed.',
    'Grade it once. Reuse it everywhere.',
  ],
  unique: [
    'The vibratory screening system on Proscreens is unique to DeSite — supplied in Australia through Pro Screen Australia.',
    'Harmonic deck motion drives material cleanly across the mesh — not a copy of a fixed grizzly, not a high-maintenance plant.',
    'Eccentric vibratory packs + spring suspension: precise flow, fewer clogs, parts and advice local to NZ.',
  ],
  range: [
    '68V for subcompact gear, 78VF best-seller for skidsteers, 108VFRB for full-size loaders and excavators — pick the deck that matches your bucket.',
    'One family, three scales: landscaping and civil through heavy earthmoving. Mesh options from fine topsoil to coarse aggregate.',
    'Start with the 78VF if you want the proven portable workhorse; step up to 108 when production and bucket width demand it.',
  ],
  benefits: [
    'No engine oil circus on many setups, quick mesh changes, multi-slope decks, and production that turns waste streams into revenue.',
    'Quiet operation, low vibration at the carrier, and screen decks that tilt to match wet or sticky material.',
    'Cut dump fees and aggregate purchases in one move — screen what you already have, on the site you already occupy.',
  ],
  cta: [
    'Match model to bucket and material, then contact Pro Screen Australia for pricing and viewing in your area viewing.',
    'See the range, check the mesh guide, call for a setup that fits your carrier.',
    'Ready for vibratory Proscreen numbers? Talk to us — Australia-wide supply.',
  ],
}

export default function VibratoryCommercialPage() {
  return (
    <section className="page-content commercials-page commercials-compact">
      <div className="commercials-banner commercials-banner-compact">
        <div className="commercials-banner-row">
          <Link to="/idm/commercials" className="commercials-kicker-inline">
            ← Hub
          </Link>
          <span className="commercials-badge">Director pick · Vibratory</span>
        </div>
        <h1>Vibratory Proscreens</h1>
        <p className="commercials-sub">Click a phrasing to keep it; others hide. Use Change to re-pick.</p>
      </div>

      <div className="promo-hero-media promo-hero-compact">
        <img src="/images/Proscreen_SLG78VFII_home.jpg" alt="DeSite SLG-78VF Proscreen" />
        <img src="/images/SLG108VFRB.jpg" alt="DeSite SLG-108VFRB Proscreen" />
        <img src="/images/Proscreen_68.jpg" alt="DeSite SLG-68V Proscreen" />
      </div>

      <PhrasePicker id="vib-hook" label="Hook" options={phrases.hook} />
      <PhrasePicker id="vib-tagline" label="Lead line" options={phrases.tagline} />
      <PhrasePicker id="vib-unique" label="Unique vibratory" options={phrases.unique} />
      <PhrasePicker id="vib-range" label="Model range" options={phrases.range} />
      <PhrasePicker id="vib-benefits" label="Benefits" options={phrases.benefits} />
      <PhrasePicker id="vib-cta" label="Close / CTA" options={phrases.cta} />

      <div className="promo-feature-row promo-feature-compact">
        <figure>
          <img src="/images/VIBRATORY-SYSTEM-68V.webp" alt="Vibratory system" />
          <figcaption>Vibratory system</figcaption>
        </figure>
        <figure>
          <img src="/images/TILTING-SCREEN-DECK-78VFRB.webp" alt="Tilting screen deck" />
          <figcaption>Tilting deck</figcaption>
        </figure>
      </div>

      <div className="cta-buttons commercials-cta-compact">
        <Link to="/products/slg-78vf" className="cta-primary">
          SLG-78VF
        </Link>
        <Link to="/products/slg-108vfrb" className="cta-secondary">
          SLG-108
        </Link>
        <Link to="/products/slg-68v" className="cta-secondary">
          SLG-68V
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
