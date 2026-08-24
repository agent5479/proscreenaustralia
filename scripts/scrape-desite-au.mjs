/**
 * One-shot scrape of desiteproducts.au product pages into public/images/au-catalog/.
 * Not part of npm run build — run manually when refreshing AU manufacturer photos.
 *
 * Usage: node scripts/scrape-desite-au.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const outRoot = path.resolve('public/images/au-catalog')

/** Product / listing pages → catalog model id */
const pages = [
  {
    modelId: 'slg-108vfrb',
    title: 'SLG-108VFRB',
    url: 'https://desiteproducts.au/slg-108vfrb/',
  },
  {
    modelId: 'static-grizzly',
    title: 'SLG-108 Static',
    url: 'https://desiteproducts.au/slg-108-2/',
  },
  {
    modelId: 'slg-78vf',
    title: 'SLG-78VF',
    url: 'https://desiteproducts.au/slg-78vfrb/',
  },
  {
    modelId: 'static-grizzly',
    title: 'Static Grizzly',
    url: 'https://desiteproducts.au/slg-78static/',
  },
  {
    modelId: 'slg-68v',
    title: 'SLG-68V',
    url: 'https://desiteproducts.au/slg-68v/',
  },
  {
    modelId: 'additional-products',
    title: 'SLG-56 Mini',
    url: 'https://desiteproducts.au/slg-56/',
  },
  {
    modelId: 'additional-products',
    title: 'SLG-48 Mini',
    url: 'https://desiteproducts.au/slg-48/',
  },
  {
    modelId: 'additional-products',
    title: 'SR3',
    url: 'https://desiteproducts.au/sr3/',
  },
  {
    modelId: 'additional-products',
    title: 'Xtreme Duty Dump Trailer',
    url: 'https://desiteproducts.au/xtreme-duty-dump-trailer/',
  },
  {
    modelId: 'telehandler-bins',
    title: 'TB 4.75 Yard Bin',
    url: 'https://desiteproducts.au/tb-4-75-yards-bin/',
  },
  {
    modelId: 'additional-products',
    title: '2 Yard Bin',
    url: 'https://desiteproducts.au/2-yards-bin/',
  },
  {
    modelId: 'additional-products',
    title: '1 Yard Bin',
    url: 'https://desiteproducts.au/1-yards-bin/',
  },
]

const UA = 'Mozilla/5.0 (compatible; SiteMachineryBot/1.0)'

const SKIP_NAME =
  /favicon|logo|sprite|icon|wp-include|gravatar|emoji|loading\.svg|testimonial|newsletter|exclusive-offers|warranty|5yearswarranty|squaremesh|elementor\/thumbs|cropped-favicons|wheel-loader|backhoes|skidsteers|excavators|compact-wheel|compact-excavator|other-products/i
const SIZE_SUFFIX = /-\d{2,4}x\d{2,4}(?=\.(jpe?g|png|webp|gif)$)/i

function absolutize(u, base) {
  try {
    return new URL(u, base).href
  } catch {
    return null
  }
}

function preferFullSize(url) {
  return url.split('?')[0].replace(SIZE_SUFFIX, '')
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

  const hrefs = [
    ...html.matchAll(/href\s*=\s*(["'])(https?:\/\/[^"']+wp-content\/uploads\/[^"']+)\1/gi),
  ]
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
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
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
const counters = {}

fs.mkdirSync(outRoot, { recursive: true })

for (const page of pages) {
  console.log('\n===', page.title, page.url)
  let html
  try {
    html = await fetchPage(page.url)
  } catch (err) {
    console.warn('page fail', err.message)
    continue
  }

  const candidates = extractCandidates(html, page.url)
  console.log('candidates:', candidates.length)

  const modelDir = path.join(outRoot, page.modelId)
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

    counters[page.modelId] = (counters[page.modelId] || 0) + 1
    const n = counters[page.modelId]
    const filename = `${String(n).padStart(2, '0')}-${base}.${ext}`
    const dest = path.join(modelDir, filename)
    const publicPath = `/images/au-catalog/${page.modelId}/${filename}`

    try {
      const bytes = await downloadImage(item.url, dest, page.url)
      if (bytes == null) continue
      const alt =
        item.alt || item.title || `${page.title} — ${base.replace(/-/g, ' ')}`
      manifest.push({
        modelId: page.modelId,
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

const jsManifestPath = path.resolve('src/data/auCatalogManifest.js')
fs.writeFileSync(
  jsManifestPath,
  `/** Auto-generated from public/images/au-catalog/manifest.json — re-run scrape-desite-au.mjs to refresh. */\nexport default ${JSON.stringify(manifest, null, 2)}\n`,
)

console.log('\nDone. downloaded', manifest.length)
console.log('wrote', jsManifestPath)
for (const [id, n] of Object.entries(counters)) {
  const kept = manifest.filter((m) => m.modelId === id).length
  console.log(`  ${id}: ${kept}/${n} candidates kept`)
}
