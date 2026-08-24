import fs from 'node:fs'
import { homeHtml } from '../src/content/home.js'

const extraCards = `
      <a class="equipment-card" href="/products/mini-screeners">
        <img src="/images/catalog/slg-56.webp" alt="DeSite mini screeners SLG-56 and SLG-48">
        <h3>Mini Screeners</h3>
        <p>SLG-56 &amp; SLG-48 — stocked in Australia for compact carriers.</p>
      </a>
      <a class="equipment-card" href="/products/dump-trailers">
        <img src="/images/catalog/xd-35.webp" alt="DeSite dump trailers">
        <h3>Dump Trailers</h3>
        <p>XD 35, 55 and 80 — excavator-rated floors, stocked in Australia.</p>
      </a>
      <a class="equipment-card" href="/products/skid-steer-attachments">
        <img src="/images/catalog/mulle-bin.webp" alt="DeSite skid-steer attachments">
        <h3>Skid-Steer Attachments</h3>
        <p>Mulle Bin, SR-2 and SR-3 — stocked with the DeSite range.</p>
      </a>
      <a class="equipment-card" href="/products/grizzly-bar">
        <img src="/images/grizzly2.jpg" alt="DeSite grizzly bar">
        <h3>Grizzly Bar</h3>
        <p>Bar-style oversize separation, distinct from the mesh Static Grizzly.</p>
      </a>
`

const instagram = `
<section class="page-content" style="text-align:center;padding:48px 20px;">
  <h2 style="color:#006a9a;">See machines on Instagram</h2>
  <p style="max-width:640px;margin:12px auto 24px;color:#2c2c2c;">Follow <a href="https://www.instagram.com/proscreen_australia/" style="color:#006a9a;font-weight:600;">@proscreen_australia</a> for DeSite screeners on Australian jobs.</p>
  <a href="https://www.instagram.com/proscreen_australia/" class="cta-primary" target="_blank" rel="noopener noreferrer">Instagram</a>
</section>
`

let html = homeHtml
  .replaceAll('href="/products/additional-products"', 'href="/products/mini-screeners"')
  .replaceAll('Available to Order', 'Stocked in Australia')
  .replaceAll('available to order', 'stocked in Australia')
  .replaceAll('next container', 'Australian stock')
  .replaceAll('Exclusive specialist supplier', 'Specialist supplier')
  .replaceAll('exclusive specialist supplier', 'specialist supplier')

if (!html.includes('/products/dump-trailers')) {
  const closeGrid = html.lastIndexOf('</div>\n</section>')
  const marker = html.includes('class="equipment-grid"') ? html.lastIndexOf('</div>', html.lastIndexOf('equipment-grid') + 8000) : -1
  // Insert before the last equipment grid closing div after equipment-grid
  const eq = html.indexOf('id="equipment"')
  if (eq !== -1) {
    const sectionEnd = html.indexOf('</section>', eq)
    const lastDiv = html.lastIndexOf('</div>', sectionEnd)
    html = html.slice(0, lastDiv) + extraCards + html.slice(lastDiv)
  }
}

if (!html.includes('proscreen_australia')) {
  html += instagram
}

fs.writeFileSync('src/content/home.js', `export const homeHtml = ${JSON.stringify(html)}\n`)
console.log('home length', html.length)
console.log('has mini', html.includes('/products/mini-screeners'))
console.log('has dump', html.includes('/products/dump-trailers'))
console.log('has ig', html.includes('proscreen_australia'))
