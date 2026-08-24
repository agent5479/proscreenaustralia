import { Link } from 'react-router-dom'
import { contact, phoneHref, whatsappHref, withBase } from '../data/contact'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Pro Screen Australia</h3>
          <p className="footer-tagline">Affordable, top quality soil, gravel and aggregate screening machines</p>
          <p>Australian supplier of DeSite soil, gravel and earthmoving processing equipment.</p>
          <a className="footer-desite" href="https://desiteproducts.au/" target="_blank" rel="noopener noreferrer">
            <img src={withBase('/images/desite-logo.png')} alt="DeSite Products" />
          </a>
        </div>

        <div>
          <h3>Call Rob</h3>
          <a href={phoneHref}>Phone: {contact.phoneDisplay}</a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            WhatsApp Rob
          </a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
            Instagram {contact.instagramHandle}
          </a>
          <p style={{ marginTop: 15 }}>{contact.locationLine}</p>
        </div>

        <div>
          <h3>Products</h3>
          <Link to="/products/slg-108vfrb">Proscreen SLG-108VFRB</Link>
          <Link to="/products/slg-78vf">Proscreen SLG-78VF</Link>
          <Link to="/products/slg-78vf-flow">Proscreen SLG-78VF with Flow Control</Link>
          <Link to="/products/slg-68v">Proscreen SLG-68V</Link>
          <Link to="/products/static-grizzly">Static Grizzly (78 & 108)</Link>
          <Link to="/products/mini-screeners">Mini Screeners</Link>
          <Link to="/products/telehandler-bins">Telehandler Bins</Link>
          <Link to="/products/dump-trailers">Dump Trailers</Link>
          <Link to="/products/skid-steer-attachments">Skid-Steer Attachments</Link>
          <Link to="/products/grizzly-bar">Grizzly Bar</Link>
        </div>

        <div>
          <h3>Information</h3>
          <Link to="/about">About Us</Link>
          <Link to="/screening-recommendation">Mesh Size Guide</Link>
          <Link to="/for/farmers">For Farmers</Link>
          <Link to="/for/civil-contractors">For Civil Contractors</Link>
          <Link to="/for/topsoil-landscaping">Topsoil & Landscaping</Link>
          <Link to="/for/aggregate-and-road-metal">Aggregate & Road Metal</Link>
          <Link to="/for/view-in-your-area">View machines in your area</Link>
          <Link to="/photos">Photos</Link>
          <Link to="/image-catalog">Image Catalog</Link>
          <Link to="/videos">Videos</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; PRO SCREEN AUSTRALIA 2026. All rights reserved. DeSite equipment supplied in Australia.</p>
      </div>
    </footer>
  )
}
