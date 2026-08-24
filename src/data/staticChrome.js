import { contact, whatsappHref, withBase } from './contact.js'

/**
 * Lightweight nav/footer for static prerender shells (crawlers / no-JS).
 * React replaces #root on hydrate for interactive users.
 */
export function buildStaticChrome(bodyHtml, { showTagline = false } = {}) {
  const tagline = showTagline
    ? `<span class="nav-tagline">Affordable, top quality soil, gravel and aggregate screening machines</span>`
    : ''
  const logo = withBase('/images/desite-logo.png')

  return `<nav class="sticky-nav">
  <div class="nav-content">
    <div class="nav-brand">
      <a href="${withBase('/')}" class="nav-logo-lockup">
        <span class="nav-desite-mark"><img src="${logo}" alt="DeSite Products" /></span>
        <span class="nav-logo">PRO SCREEN AUSTRALIA</span>
      </a>
      ${tagline}
    </div>
    <div class="nav-menu" id="navMenu">
      <a href="${withBase('/')}">Home</a>
      <a href="${withBase('/')}#equipment">Products</a>
      <a href="${withBase('/about')}">About Us</a>
      <a href="${withBase('/photos')}">Photos</a>
      <a href="${withBase('/videos')}">Videos</a>
      <a href="${withBase('/contact')}">Contact</a>
    </div>
    <div class="nav-contact">
      <a href="tel:${contact.phoneTel}" class="nav-phone">Call Rob ${contact.phoneDisplay}</a>
      <a href="${whatsappHref}" class="nav-whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a href="${contact.instagramUrl}" class="nav-instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
    </div>
  </div>
</nav>
${bodyHtml}
<footer class="footer">
  <div class="footer-content">
    <div>
      <h3>Pro Screen Australia</h3>
      <p class="footer-tagline">Affordable, top quality soil, gravel and aggregate screening machines</p>
      <p>Australian supplier of DeSite soil, gravel and earthmoving processing equipment.</p>
      <a class="footer-desite" href="https://desiteproducts.au/" target="_blank" rel="noopener noreferrer">
        <img src="${logo}" alt="DeSite Products" />
      </a>
    </div>
    <div>
      <h3>Call Rob</h3>
      <a href="tel:${contact.phoneTel}">Phone: ${contact.phoneDisplay}</a>
      <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer">WhatsApp Rob</a>
      <a href="${contact.instagramUrl}" target="_blank" rel="noopener noreferrer">Instagram ${contact.instagramHandle}</a>
      <p style="margin-top:15px">${contact.locationLine}</p>
    </div>
    <div>
      <h3>Products</h3>
      <a href="${withBase('/products/slg-108vfrb')}">Proscreen SLG-108VFRB</a>
      <a href="${withBase('/products/slg-78vf')}">Proscreen SLG-78VF</a>
      <a href="${withBase('/products/slg-78vf-flow')}">Proscreen SLG-78VF with Flow Control</a>
      <a href="${withBase('/products/slg-68v')}">Proscreen SLG-68V</a>
      <a href="${withBase('/products/static-grizzly')}">Static Grizzly (78 &amp; 108)</a>
      <a href="${withBase('/products/mini-screeners')}">Mini Screeners</a>
      <a href="${withBase('/products/telehandler-bins')}">Telehandler Bins</a>
      <a href="${withBase('/products/dump-trailers')}">Dump Trailers</a>
      <a href="${withBase('/products/skid-steer-attachments')}">Skid-Steer Attachments</a>
      <a href="${withBase('/products/grizzly-bar')}">Grizzly Bar</a>
    </div>
    <div>
      <h3>Information</h3>
      <a href="${withBase('/about')}">About Us</a>
      <a href="${withBase('/screening-recommendation')}">Mesh Size Guide</a>
      <a href="${withBase('/for/farmers')}">For Farmers</a>
      <a href="${withBase('/for/civil-contractors')}">For Civil Contractors</a>
      <a href="${withBase('/for/topsoil-landscaping')}">Topsoil &amp; Landscaping</a>
      <a href="${withBase('/for/aggregate-and-road-metal')}">Aggregate &amp; Road Metal</a>
      <a href="${withBase('/for/view-in-your-area')}">View machines in your area</a>
      <a href="${withBase('/photos')}">Photos</a>
      <a href="${withBase('/image-catalog')}">Image Catalog</a>
      <a href="${withBase('/videos')}">Videos</a>
      <a href="${withBase('/contact')}">Contact Us</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; PRO SCREEN AUSTRALIA 2026. All rights reserved. DeSite equipment supplied in Australia.</p>
  </div>
</footer>`
}
