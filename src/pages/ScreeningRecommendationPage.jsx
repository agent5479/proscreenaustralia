import { Link } from 'react-router-dom'
import { contact, emailHref, phoneHref } from '../data/contact'
import { gradeGallery, meshNav, meshSections } from '../data/meshRecommendations'

function GradeImage({ image }) {
  if (!image) return null
  return (
    <figure className="mesh-grade-figure">
      <img src={image.src} alt={image.alt} loading="lazy" />
      <figcaption>{image.alt}</figcaption>
    </figure>
  )
}

function MeshTable({ table }) {
  return (
    <div className="mesh-table-wrap">
      <div className={`mesh-table-layout${table.image ? ' has-image' : ''}`}>
        <div className="mesh-table-main">
          <h3>{table.title}</h3>
          {table.note && <p className="mesh-table-note">{table.note}</p>}
          <div className="mesh-table-scroll">
            <table className="mesh-table">
              <thead>
                <tr>
                  {table.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={`${table.title}-${i}`}>
                    {row.map((cell, j) => (
                      <td key={`${i}-${j}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {table.image && <GradeImage image={table.image} />}
      </div>
    </div>
  )
}

export default function ScreeningRecommendationPage() {
  return (
    <section className="page-content mesh-page">
      <div className="mesh-hero">
        <h1>Screen Mesh Recommendation Guide</h1>
        <p>
          Choose the right DeSite mesh for topsoil, gravel, compost, mulch, farm filling and
          aggregate. Charts below are tailored for Pro Screen Australia operators — imperial openings
          (industry standard) with approximate metric context where helpful.
        </p>
        <p className="mesh-hero-links">
          Immediate farm and civil offer: 100 mm first, then 50 mm or 3 inch (~75 mm) filling.{' '}
          <a href="#farm-filling">Farm gravel and cow races</a>
          {' · '}
          <Link to="/for/farmers">Farmers</Link>
          {' · '}
          <Link to="/for/civil-contractors">Civil contractors</Link>
          {' · '}
          <Link to="/products/static-grizzly">Static Grizzly</Link>
          {' · '}
          <a href="#aggregates">Aggregates</a>
        </p>
      </div>

      <div className="mesh-grade-gallery">
        <h2>Product grade examples</h2>
        <p>
          Visual reference for finished material size — use alongside the charts when choosing mesh.
        </p>
        <div className="mesh-grade-strip">
          {gradeGallery.map((item) => (
            <figure key={item.src} className="mesh-grade-thumb">
              <img src={item.src} alt={item.alt} loading="lazy" />
              <figcaption>{item.alt.replace(/ product( grade)? example$/i, '')}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <nav className="mesh-nav" aria-label="Mesh guide sections">
        {meshNav.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>

      {meshSections.map((section) => (
        <section key={section.id} id={section.id} className="mesh-section">
          <h2>{section.title}</h2>
          <p className="mesh-section-intro">{section.intro}</p>
          {section.image && <GradeImage image={section.image} />}
          {section.tables.map((table) => (
            <MeshTable key={table.title} table={table} />
          ))}
        </section>
      ))}

      <div className="product-description mesh-cta">
        <h2>Need help picking a mesh?</h2>
        <p>
          Tell us what you are screening and which machine you run — we will recommend openings that
          Based in Sydney — supply Australia-wide. Call Rob to match mesh to your material and carrier.
        </p>
        <div className="cta-buttons">
          <a href={phoneHref} className="cta-primary">
            Call {contact.phoneDisplay}
          </a>
          <a href={emailHref} className="cta-secondary">
            WhatsApp Rob
          </a>
          <Link to="/products/static-grizzly" className="cta-secondary">
            Static Grizzly
          </Link>
          <Link to="/contact" className="cta-secondary">
            Contact
          </Link>
        </div>
      </div>
    </section>
  )
}
