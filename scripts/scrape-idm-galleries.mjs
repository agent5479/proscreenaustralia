/**
 * One-shot scrape of DeSite (idmcabc.com) photo galleries into public/images/idm-catalog/.
 * Not part of npm run build — run manually when refreshing manufacturer photos.
 *
 * Usage: node scripts/scrape-idm-galleries.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const outRoot = path.resolve('public/images/idm-catalog')

/** Curated DeSite gallery pages (idmcabc.com) → local model folder id */
const galleries = [
  {
    modelId: 'slg-108vfrb',
    title: 'SLG-108VFRB',
    url: 'https://idmcabc.com/slg-108-photos/',
  },
  {
    modelId: 'slg-108vfrb',
    title: 'SLG-108VFRB',
    url: 'https://idmcabc.com/topsoil-screeners/slg108vf-photo-gallery/',
  },
  {
    modelId: 'slg-78vf',
    title: 'SLG-78VF',
    url: 'https://idmcabc.com/topsoil-screeners/slg78vf-photo-gallery/',
  },
  {
    modelId: 'slg-68v',
    title: 'SLG-68V',
    url: 'https://idmcabc.com/topsoil-screeners/desite-slg68v/photos/',
  },
  {
    modelId: 'static-grizzly',
    title: 'Static Grizzly',
    url: 'https://idmcabc.com/slg-78-static-grizzly-screener-photo-galery/',
  },
]

const UA = 'Mozilla/5.0 (compatible; SiteMachineryBot/1.0)'

const SKIP_NAME =
  /idm-metal|favicon|logo|sprite|icon|wp-include|gravatar|emoji|loading\.svg/i
const SIZE_SUFFIX = /-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp|gif)$)/i

function absolutize(u, base) {
  try {
    return new URL(u, base).href
  } catch {
    return null
  }
}

/** Prefer full-size URL (strip WordPress size suffixes). */
function preferFullSize(url) {
  const clean = url.split('?')[0]
  return clean.replace(SIZE_SUFFIX, '')
}

function extractCandidates(html, pageUrl) {
  const candidates = []

  const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
  for (const tag of imgTags) {
    const attrs = {}
    for (const m of tag.matchAll(/([a-zA-Z_:-]+)\s*=\s*(["'])(.*?)\2/g)) {
      attrs[m[1].toLowerCase()] = m[3]
    }
    const src =
      attrs['data-src'] ||
      attrs['data-lazy-src'] ||
      attrs['data-orig-file'] ||
      attrs['data-large-file'] ||
      attrs.src ||
      ''
    const srcset = attrs['data-srcset'] || attrs.srcset || ''
    const fromSrcset = srcset
      .split(',')
      .map((p) => p.trim().split(/\s+/)[0])
      .filter(Boolean)
    for (const u of [src, ...fromSrcset].filter(Boolean)) {
      candidates.push({ url: u, alt: attrs.alt || '', title: attrs.title || '' })
    }
  }

  // Linked full-size images (galleries wrap thumbs in <a href="...webp">)
  const hrefs = [...html.matchAll(/href\s*=\s*(["'])(https?:\/\/[^"']+wp-content\/uploads\/[^"']+)\1/gi)]
  for (const m of hrefs) {
    if (/\.(jpe?g|png|webp|gif)($|\?)/i.test(m[2])) {
      candidates.push({ url: m[2], alt: '', title: '' })
    }
  }

  const uploadUrls = [
    ...html.matchAll(/https?:\/\/[^"'>\s]+wp-content\/uploads\/[^"'>\s]+/gi),
  ].map((m) => m[0])
  for (const u of uploadUrls) {
    if (/\.(jpe?g|png|webp|gif)($|\?)/i.test(u)) {
      candidates.push({ url: u, alt: '', title: '' })
    }
  }

  const seen = new Set()
  const unique = []
  for (const c of candidates) {
    const abs = absolutize(c.url, pageUrl)
    if (!abs) continue
    if (!/\.(jpe?g|png|webp|gif)($|\?)/i.test(abs) && !abs.includes('/uploads/')) continue
    const full = preferFullSize(abs)
    if (SKIP_NAME.test(full)) continue
    const key = full.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    unique.push({ ...c, url: full })
  }
  return unique
}

async function fetchPage(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`Fetch failed ${res.status}: ${url}`)
  return res.text()
}

async function downloadImage(url, dest, referer) {
  const r = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: referer },
  })
  if (!r.ok) {
    console.warn('skip', r.status, url)
    return null
  }
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 2500) {
    console.warn('skip tiny', buf.length, url)
    return null
  }
  fs.writeFileSync(dest, buf)
  return buf.length
}

const globalSeen = new Set()
const manifest = []
let counters = {}

fs.mkdirSync(outRoot, { recursive: true })

for (const gallery of galleries) {
  console.log('\n===', gallery.title, gallery.url)
  let html
  try {
    html = await fetchPage(gallery.url)
  } catch (err) {
    console.warn('page fail', err.message)
    continue
  }

  const candidates = extractCandidates(html, gallery.url)
  console.log('candidates:', candidates.length)

  const modelDir = path.join(outRoot, gallery.modelId)
  fs.mkdirSync(modelDir, { recursive: true })

  for (const item of candidates) {
    const key = item.url.toLowerCase()
    if (globalSeen.has(key)) continue
    globalSeen.add(key)

    const clean = item.url.split('?')[0]
    const extMatch = clean.match(/\.(jpe?g|png|webp|gif)$/i)
    const ext = extMatch ? extMatch[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
    const base =
      path
        .basename(clean)
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 80) || 'photo'

    counters[gallery.modelId] = (counters[gallery.modelId] || 0) + 1
    const n = counters[gallery.modelId]
    const filename = `${String(n).padStart(2, '0')}-${base}.${ext}`
    const dest = path.join(modelDir, filename)
    const publicPath = `/images/idm-catalog/${gallery.modelId}/${filename}`

    try {
      const bytes = await downloadImage(item.url, dest, gallery.url)
      if (bytes == null) continue
      const alt =
        item.alt ||
        item.title ||
        `${gallery.title} — ${base.replace(/-/g, ' ')}`
      manifest.push({
        modelId: gallery.modelId,
        file: publicPath,
        alt,
        source: item.url,
        bytes,
      })
      console.log('saved', publicPath, bytes)
    } catch (err) {
      console.warn('fail', item.url, err.message)
    }
  }
}

fs.writeFileSync(path.join(outRoot, 'manifest.json'), JSON.stringify(manifest, null, 2))

// Also write a JS module for Vite + Node prerender imports
const jsManifestPath = path.resolve('src/data/idmCatalogManifest.js')
fs.writeFileSync(
  jsManifestPath,
  `/** Auto-generated from public/images/idm-catalog/manifest.json — re-run scrape-idm-galleries.mjs to refresh. */\nexport default ${JSON.stringify(manifest, null, 2)}\n`,
)
console.log('\nDone. downloaded', manifest.length)
console.log('wrote', jsManifestPath)
for (const [id, n] of Object.entries(counters)) {
  const kept = manifest.filter((m) => m.modelId === id).length
  console.log(`  ${id}: ${kept}/${n} candidates kept`)
}
