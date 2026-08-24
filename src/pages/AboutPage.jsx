import { Link } from 'react-router-dom'
import HtmlContent from '../components/HtmlContent'
import { aboutHtml } from '../content/about'

export default function AboutPage() {
  return (
    <>
      <HtmlContent html={aboutHtml} />
      <section className="page-content about-commercials-links" aria-label="Internal commercials">
        <div className="about-commercials-box">
          <h2>Internal · Commercials</h2>
          <p>Director review drafts (unlisted). Open a page, pick phrasing options, screenshot as needed.</p>
          <div className="about-commercials-actions">
            <Link to="/idm/commercials" className="cta-secondary">
              Commercials hub
            </Link>
            <Link to="/idm/commercials/grizzly" className="cta-secondary">
              Grizzly screens
            </Link>
            <Link to="/idm/commercials/vibratory" className="cta-secondary">
              Vibratory Proscreens
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
