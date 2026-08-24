import fs from 'node:fs'
import path from 'node:path'

const siteDir = path.resolve('site')
const outDir = path.resolve('src/content')

const pages = [
  { src: 'index.html', out: 'home.js', exportName: 'homeHtml' },
  { src: 'about.html', out: 'about.js', exportName: 'aboutHtml' },
  { src: 'contact.html', out: 'contact.js', exportName: 'contactHtml' },
  { src: 'photos.html', out: 'photos.js', exportName: 'photosHtml' },
  { src: 'videos.html', out: 'videos.js', exportName: 'videosHtml' },
  { src: 'products/slg-108vfrb.html', out: 'slg-108vfrb.js', exportName: 'slg108Html' },
  { src: 'products/slg-78vf.html', out: 'slg-78vf.js', exportName: 'slg78Html' },
  { src: 'products/slg-78vf-flow.html', out: 'slg-78vf-flow.js', exportName: 'slg78FlowHtml' },
  { src: 'products/slg-68v.html', out: 'slg-68v.js', exportName: 'slg68Html' },
  { src: 'products/static-grizzly.html', out: 'static-grizzly.js', exportName: 'staticGrizzlyHtml' },
  { src: 'products/telehandler-bins.html', out: 'telehandler-bins.js', exportName: 'telehandlerBinsHtml' },
  { src: 'products/additional-products.html', out: 'additional-products.js', exportName: 'additionalProductsHtml' },
]

function stripNavFooter(html) {
  let body = html
  // Remove sticky nav
  body = body.replace(/<!-- Sticky Navigation -->[\s\S]*?<\/nav>\s*/i, '')
  // Remove footer
  body = body.replace(/<!-- Footer -->[\s\S]*?<\/footer>\s*/i, '')
  // Remove scripts and leftover html/body wrappers if any
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '')
  // Extract only between <body> and </body> if still present
  const bodyMatch = body.match(/<body[^>]*>([\s\S]*)<\/body>/i)
  if (bodyMatch) body = bodyMatch[1]
  // Drop doctype/head leftovers
  body = body.replace(/<!DOCTYPE[\s\S]*?<\/head>/i, '')
  body = body.replace(/<\/?html[^>]*>/gi, '')
  return body.trim()
}

function rewrite(html, fromProducts) {
  let out = html

  // Image paths: products pages use ../images/, root uses images/
  out = out.replace(/(src|href)=(["'])\.\.\/images\//g, '$1=$2/images/')
  out = out.replace(/(src|href)=(["'])images\//g, '$1=$2/images/')

  // Internal page links -> clean React routes
  const linkMap = [
    [/href=(["'])index\.html#equipment\1/g, 'href=$1/#equipment$1'],
    [/href=(["'])index\.html\1/g, 'href=$1/$1'],
    [/href=(["'])about\.html\1/g, 'href=$1/about$1'],
    [/href=(["'])contact\.html\1/g, 'href=$1/contact$1'],
    [/href=(["'])photos\.html\1/g, 'href=$1/photos$1'],
    [/href=(["'])videos\.html\1/g, 'href=$1/videos$1'],
    [/href=(["'])\.\.\/index\.html#equipment\1/g, 'href=$1/#equipment$1'],
    [/href=(["'])\.\.\/index\.html\1/g, 'href=$1/$1'],
    [/href=(["'])\.\.\/about\.html\1/g, 'href=$1/about$1'],
    [/href=(["'])\.\.\/contact\.html\1/g, 'href=$1/contact$1'],
    [/href=(["'])\.\.\/photos\.html\1/g, 'href=$1/photos$1'],
    [/href=(["'])\.\.\/videos\.html\1/g, 'href=$1/videos$1'],
    [/href=(["'])products\/slg-108vfrb\.html\1/g, 'href=$1/products/slg-108vfrb$1'],
    [/href=(["'])products\/slg-78vf-flow\.html\1/g, 'href=$1/products/slg-78vf-flow$1'],
    [/href=(["'])products\/slg-78vf\.html\1/g, 'href=$1/products/slg-78vf$1'],
    [/href=(["'])products\/slg-68v\.html\1/g, 'href=$1/products/slg-68v$1'],
    [/href=(["'])products\/static-grizzly\.html\1/g, 'href=$1/products/static-grizzly$1'],
    [/href=(["'])products\/telehandler-bins\.html\1/g, 'href=$1/products/telehandler-bins$1'],
    [/href=(["'])products\/additional-products\.html\1/g, 'href=$1/products/additional-products$1'],
    [/href=(["'])slg-108vfrb\.html\1/g, 'href=$1/products/slg-108vfrb$1'],
    [/href=(["'])slg-78vf-flow\.html\1/g, 'href=$1/products/slg-78vf-flow$1'],
    [/href=(["'])slg-78vf\.html\1/g, 'href=$1/products/slg-78vf$1'],
    [/href=(["'])slg-68v\.html\1/g, 'href=$1/products/slg-68v$1'],
    [/href=(["'])static-grizzly\.html\1/g, 'href=$1/products/static-grizzly$1'],
    [/href=(["'])telehandler-bins\.html\1/g, 'href=$1/products/telehandler-bins$1'],
    [/href=(["'])additional-products\.html\1/g, 'href=$1/products/additional-products$1'],
  ]

  for (const [re, rep] of linkMap) {
    out = out.replace(re, rep)
  }

  // Phone number unification: +64 3 970 7602
  out = out.replace(/href=(["'])tel:0800212126\1/g, 'href=$1tel:+6439707602$1')
  out = out.replace(/href=(["'])tel:039707602\1/g, 'href=$1tel:+6439707602$1')
  out = out.replace(/📞\s*0800\s*21\s*21\s*26/g, '📞 +64 3 970 7602')
  out = out.replace(/Call 0800 21 21 26/g, 'Call +64 3 970 7602')
  out = out.replace(/Call 03 970 7602/g, 'Call +64 3 970 7602')
  out = out.replace(/>0800 21 21 26</g, '>+64 3 970 7602<')
  out = out.replace(/>03 970 7602</g, '>+64 3 970 7602<')
  out = out.replace(/Phone:\s*03 970 7602/g, 'Phone: +64 3 970 7602')
  out = out.replace(/Toll Free:\s*0800 21 21 26/g, 'Phone: +64 3 970 7602')
  out = out.replace(/<p[^>]*>\s*Toll Free\s*<\/p>/gi, '')
  out = out.replace(/<p[^>]*>\s*Direct Line\s*<\/p>/gi, '<p style="color: #ccc;">Phone</p>')

  // Collapse duplicate phone displays/CTAs after unification
  out = out.replace(
    /(<p style="font-size: 1\.3rem; color: #ffa500; font-weight: 700; margin-bottom: 10px;">\s*<a href="tel:\+6439707602"[^>]*>\+64 3 970 7602<\/a>\s*<\/p>\s*){2}/g,
    '<p style="font-size: 1.3rem; color: #ffa500; font-weight: 700; margin-bottom: 10px;"><a href="tel:+6439707602" style="color: #ffa500; text-decoration: none;">+64 3 970 7602</a></p>',
  )
  out = out.replace(
    /<a href="tel:\+6439707602" class="cta-primary">Call \+64 3 970 7602<\/a>\s*<a href="tel:\+6439707602" class="cta-(?:primary|secondary)">Call \+64 3 970 7602<\/a>/g,
    '<a href="tel:+6439707602" class="cta-primary">Call +64 3 970 7602</a>',
  )

  // onerror inline handlers are fine in HTML strings
  void fromProducts
  return out
}

fs.mkdirSync(outDir, { recursive: true })

for (const page of pages) {
  const raw = fs.readFileSync(path.join(siteDir, page.src), 'utf8')
  const stripped = stripNavFooter(raw)
  const fromProducts = page.src.startsWith('products/')
  const html = rewrite(stripped, fromProducts)
  const file = `export const ${page.exportName} = ${JSON.stringify(html)};\n`
  fs.writeFileSync(path.join(outDir, page.out), file)
  console.log('Wrote', page.out, `(${html.length} chars)`)
}

console.log('Done.')
