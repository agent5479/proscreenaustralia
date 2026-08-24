import fs from 'node:fs'
import path from 'node:path'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', 'dist', 'legacy', 'site', 'idm-catalog'].includes(e.name)) continue
      walk(p, acc)
    } else if (/\.(js|jsx|mjs|css|html|md)$/i.test(e.name)) acc.push(p)
  }
  return acc
}

const pairs = [
  [/Nelson/g, 'your area'],
  [/Pascoe Street/g, ''],
  [/105 Pascoe Street/g, ''],
  [/exclusive Australian supplier/gi, 'Australian supplier'],
  [/the exclusive Australian supplier/gi, 'an Australian supplier'],
  [/Exclusive Australia specialist supplier/g, 'Australian supplier'],
  [/screener pricing NZ/gi, 'screener pricing Australia'],
  [/Contact Us \| Screener Pricing NZ/g, 'Contact Us | Screener Pricing Australia'],
  [/Mesh Size Guide NZ/g, 'Mesh Size Guide Australia'],
  [/Telehandler Bins NZ/g, 'Telehandler Bins'],
  [/info@agent5479\.github\.io\/proscreenaustralia/g, 'WhatsApp Rob'],
  [/>Email</g, '>WhatsApp<'],
  [/Email \$\{contact\.email\}/g, 'WhatsApp Rob'],
  [/from 'react-helmet-async'/g, "from 'react-helmet-async'"],
  [/from "react-helmet-async"/g, "from 'react-helmet-async'"],
]

for (const f of [...walk('src'), ...walk('scripts'), 'index.html']) {
  if (!fs.existsSync(f)) continue
  let t = fs.readFileSync(f, 'utf8')
  const orig = t
  for (const [re, to] of pairs) t = t.replace(re, to)
  if (t !== orig) {
    fs.writeFileSync(f, t)
    console.log('patched', f)
  }
}

// Home equipment: add family cards + Instagram, stocked copy
const homePath = 'src/content/home.js'
let home = fs.readFileSync(homePath, 'utf8')
home = home.replace(/additional-products/g, 'mini-screeners')
if (!home.includes('/products/dump-trailers')) {
  const extra = `
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
      </a>`
  home = home.replace(
    '</div>\\n</section>\\n\\n<!-- ',
    `${extra.replaceAll('\n', '\\n')}</div>\\n</section>\\n\\n<!-- `,
  )
}
if (!home.includes('proscreen_australia')) {
  const ig = `\\n<section class="page-content" style="text-align:center;padding:40px 20px;">\\n  <h2 style="color:#006a9a;">See machines on Instagram</h2>\\n  <p style="max-width:640px;margin:12px auto 24px;color:#2c2c2c;">Follow <a href="https://www.instagram.com/proscreen_australia/" style="color:#006a9a;font-weight:600;">@proscreen_australia</a> for DeSite screeners on Australian jobs.</p>\\n  <a href="https://www.instagram.com/proscreen_australia/" class="cta-primary" target="_blank" rel="noopener noreferrer">Instagram</a>\\n</section>\\n`
  home = home.replace(/";\s*$/, `${ig}";`)
}
fs.writeFileSync(homePath, home)
console.log('updated home.js')

// CSS: remaining orange gradients → DeSite blue
const cssPath = 'src/styles/styles.css'
let css = fs.readFileSync(cssPath, 'utf8')
css = css.replace(/#ff8533/g, '#33b4e6')
css = css.replace(/#ffcc80/g, '#b3e0f2')
css = css.replace(/#fff4eb/g, '#e6f5fb')
fs.writeFileSync(cssPath, css)
console.log('updated styles.css')

console.log('done')
