import fs from 'node:fs'
import path from 'node:path'
import {
  routes,
  defaultOgImage,
  getJsonLd,
  isIndexableRoute,
  notFoundSeo,
} from '../src/data/seo.js'
import { contact } from '../src/data/contact.js'
import { getStaticPageHtml } from '../src/data/staticPages.js'

const distDir = path.resolve('dist')
const publicDir = path.resolve('public')
const indexPath = path.join(distDir, 'index.html')
const defaultRobots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const lastmod = new Date().toISOString().slice(0, 10)

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html missing. Run vite build first.')
  process.exit(1)
}

const template = fs.readFileSync(indexPath, 'utf8')

const notFoundBody = `<main class="page-content" style="max-width:720px;margin:80px auto;padding:0 20px;text-align:center;">
  <h1>Page not found</h1>
  <p>The page you requested is not available. Return to Pro Screen Australia for DeSite soil, gravel and aggregate screeners.</p>
  <p><a href="/" class="cta-primary">Back to home</a></p>
</main>`

function injectMeta(html, route, { bodyHtml } = {}) {
  const jsonLdPayload = route.path && !route.omitCanonical ? getJsonLd(route.path) : null
  const jsonLd = jsonLdPayload
    ? `<script type="application/ld+json">${JSON.stringify(jsonLdPayload)}</script>`
    : ''
  const ogImage = route.ogImage || defaultOgImage
  const canonicalTag = route.omitCanonical || !route.canonical
    ? ''
    : `<link rel="canonical" href="${escapeAttr(route.canonical)}" />`
  const ogUrlTag = route.omitCanonical || !route.canonical
    ? ''
    : `<meta property="og:url" content="${escapeAttr(route.canonical)}" />`

  const tags = `
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeAttr(route.description)}" />
    <meta name="keywords" content="${escapeAttr(route.keywords || '')}" />
    <meta name="author" content="Warwick Marshall" />
    <meta name="creator" content="Warwick Marshall" />
    <meta name="robots" content="${escapeAttr(route.robots || defaultRobots)}" />
    ${canonicalTag}
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <meta name="geo.region" content="AU" />
    <meta name="geo.placename" content="Australia" />
    <meta name="language" content="en-AU" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Pro Screen Australia" />
    <meta property="og:title" content="${escapeAttr(route.title)}" />
    <meta property="og:description" content="${escapeAttr(route.description)}" />
    ${ogUrlTag}
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:locale" content="en_AU" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(route.title)}" />
    <meta name="twitter:description" content="${escapeAttr(route.description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
    <meta name="contact:phone_number" content="${escapeAttr(contact.phoneDisplay)}" />
    <meta name="theme-color" content="#0099d8" />
    ${jsonLd}
  `

  let out = html
  // Strip tags we will re-inject so route-specific robots/canonical win
  out = out.replace(/<title>[\s\S]*?<\/title>/gi, '')
  out = out.replace(/<meta\s+name="description"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="keywords"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="author"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="creator"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="robots"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="geo\.[^"]*"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="language"[^>]*>/gi, '')
  out = out.replace(/<link\s+rel="canonical"[^>]*>/gi, '')
  out = out.replace(/<link\s+rel="icon"[^>]*>/gi, '')
  out = out.replace(/<link\s+rel="apple-touch-icon"[^>]*>/gi, '')
  out = out.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
  out = out.replace(/<meta\s+name="contact:[^"]*"[^>]*>/gi, '')
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
  // Insert tags before </head>
  out = out.replace(/<\/head>/i, `${tags}\n  </head>`)

  const resolvedBody =
    bodyHtml !== undefined ? bodyHtml : getStaticPageHtml(route.path)
  if (resolvedBody) {
    out = out.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${resolvedBody}</div>`,
    )
  }

  return out
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeAttr(str) {
  return escapeHtml(str).replaceAll('"', '&quot;')
}

function buildSitemap() {
  const urls = routes
    .filter(isIndexableRoute)
    .map((route) => {
      const loc = route.canonical
      const changefreq = route.changefreq || 'monthly'
      const priority = route.priority || '0.5'
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

for (const route of routes) {
  const html = injectMeta(template, route)
  const outPath = path.join(distDir, route.file)
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, html)
  console.log('Prerendered', route.file)
}

// GitHub Pages unknown-URL fallback — must not look like the homepage
fs.writeFileSync(
  path.join(distDir, '404.html'),
  injectMeta(template, notFoundSeo, { bodyHtml: notFoundBody }),
)
console.log('Wrote 404.html (noindex)')

const sitemap = buildSitemap()
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap)
console.log('Wrote sitemap.xml')

console.log('SEO prerender complete.')
