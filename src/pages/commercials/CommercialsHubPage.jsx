import { Link } from 'react-router-dom'

const promos = [
  {
    slug: 'grizzly',
    title: 'Grizzly Screens',
    status: 'Director pick ready',
    blurb: 'Wide-mesh + durability — 3 phrasing options per blurb.',
    to: '/idm/commercials/grizzly',
    active: true,
  },
  {
    slug: 'vibratory',
    title: 'Vibratory Proscreens',
    status: 'Director pick ready',
    blurb: 'On-site screening story for 68 / 78 / 108 — pick phrasing per section.',
    to: '/idm/commercials/vibratory',
    active: true,
  },
  {
    slug: 'placeholder-bins',
    title: 'Telehandler Bins',
    status: 'Coming soon',
    blurb: 'Placeholder for future debris-bin promotional drafts.',
    to: null,
    active: false,
  },
]

const liveCampaigns = [
  {
    slug: 'farmers',
    title: 'Farmer campaign',
    status: 'Live page',
    blurb: 'Farm rivers, cow races and 100 mm + 50/75 mm filling mesh.',
    to: '/for/farmers',
  },
  {
    slug: 'civil',
    title: 'Civil contractor campaign',
    status: 'Live page',
    blurb: 'Subdivisions, retaining walls and on-site soil screening.',
    to: '/for/civil-contractors',
  },
]

const officeTools = [
  {
    slug: 'prospects',
    title: 'Prospect lists',
    status: 'Office workspace',
    blurb: 'Keep farmer, civil and landscaper contacts. CSV in and out. Call sheet.',
    to: '/idm/prospects',
  },
]

export default function CommercialsHubPage() {
  return (
    <section className="page-content commercials-page commercials-compact">
      <div className="commercials-banner commercials-banner-compact">
        <span className="commercials-badge">Internal workspace</span>
        <h1>DeSite / Commercials</h1>
        <p className="commercials-sub">
          Unlisted drafts for director review, plus live campaign pages and the office prospect list.
        </p>
      </div>

      <h2 className="commercials-section-label">Promo drafts</h2>
      <div className="commercials-grid commercials-grid-compact">
        {promos.map((promo) => (
          <article key={promo.slug} className={`commercials-card${promo.active ? ' is-active' : ''}`}>
            <div className="commercials-card-status">{promo.status}</div>
            <h2>{promo.title}</h2>
            <p>{promo.blurb}</p>
            {promo.active && promo.to ? (
              <Link to={promo.to} className="equipment-cta">
                Open draft
              </Link>
            ) : (
              <span className="commercials-disabled">Not started</span>
            )}
          </article>
        ))}
      </div>

      <h2 className="commercials-section-label">Live campaigns</h2>
      <div className="commercials-grid commercials-grid-compact">
        {liveCampaigns.map((item) => (
          <article key={item.slug} className="commercials-card is-active">
            <div className="commercials-card-status">{item.status}</div>
            <h2>{item.title}</h2>
            <p>{item.blurb}</p>
            <Link to={item.to} className="equipment-cta">
              Open page
            </Link>
          </article>
        ))}
      </div>

      <h2 className="commercials-section-label">Office</h2>
      <div className="commercials-grid commercials-grid-compact">
        {officeTools.map((item) => (
          <article key={item.slug} className="commercials-card is-active">
            <div className="commercials-card-status">{item.status}</div>
            <h2>{item.title}</h2>
            <p>{item.blurb}</p>
            <Link to={item.to} className="equipment-cta">
              Open workspace
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
