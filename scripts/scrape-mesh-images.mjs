import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const pageUrl = 'https://idmcabc.com/screening-recomendation/'
const outDir = path.resolve('public/images/mesh-guide')

const res = await fetch(pageUrl, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteMachineryBot/1.0)' },
})
if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
const html = await res.text()

const imgTags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])
console.log('img tags:', imgTags.length)

const candidates = []
for (const tag of imgTags) {
  const attrs = {}
  for (const m of tag.matchAll(/([a-zA-Z_:-]+)\s*=\s*(["'])(.*?)\2/g)) {
    attrs[m[1].toLowerCase()] = m[3]
  }
  const src =
    attrs['data-src'] ||
    attrs['data-lazy-src'] ||
    attrs.src ||
    attrs['data-orig-file'] ||
    ''
  const srcset = attrs['data-srcset'] || attrs.srcset || ''
  const fromSrcset = srcset
    .split(',')
    .map((p) => p.trim().split(/\s+/)[0])
    .filter(Boolean)
  const urls = [src, ...fromSrcset].filter(Boolean)
  for (const u of urls) {
    candidates.push({
      url: u,
      alt: attrs.alt || '',
      title: attrs.title || '',
    })
  }
}

// Also catch background or linked media in wp-content uploads
const uploadUrls = [...html.matchAll(/https?:\/\/[^"'>\s]+wp-content\/uploads\/[^"'>\s]+/gi)].map(
  (m) => m[0],
)
for (const u of uploadUrls) {
  if (/\.(jpe?g|png|webp|gif)($|\?)/i.test(u)) {
    candidates.push({ url: u, alt: '', title: '' })
  }
}

function absolutize(u) {
  try {
    return new URL(u, pageUrl).href
  } catch {
    return null
  }
}

const seen = new Set()
const unique = []
for (const c of candidates) {
  const abs = absolutize(c.url)
  if (!abs) continue
  // Skip tiny icons/logos/sprites when possible later; keep all image-like first
  if (!/\.(jpe?g|png|webp|gif)($|\?)/i.test(abs) && !abs.includes('/uploads/')) continue
  const key = abs.split('?')[0]
  if (seen.has(key)) continue
  seen.add(key)
  unique.push({ ...c, url: abs })
}

console.log('unique candidates:', unique.length)
unique.forEach((c, i) => console.log(i, c.url, '|', c.alt))

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, '_sources.json'), JSON.stringify(unique, null, 2))

const downloaded = []
for (let i = 0; i < unique.length; i++) {
  const item = unique[i]
  const clean = item.url.split('?')[0]
  const extMatch = clean.match(/\.(jpe?g|png|webp|gif)$/i)
  const ext = extMatch ? extMatch[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
  const base =
    path
      .basename(clean)
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 80) || `mesh-${i + 1}`
  const filename = `${String(i + 1).padStart(2, '0')}-${base}.${ext}`
  const dest = path.join(outDir, filename)
  try {
    const r = await fetch(item.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SiteMachineryBot/1.0)', Referer: pageUrl },
    })
    if (!r.ok) {
      console.warn('skip', r.status, item.url)
      continue
    }
    const buf = Buffer.from(await r.arrayBuffer())
    // Skip very small files (icons)
    if (buf.length < 2500) {
      console.warn('skip tiny', buf.length, item.url)
      continue
    }
    fs.writeFileSync(dest, buf)
    downloaded.push({
      file: `/images/mesh-guide/${filename}`,
      alt: item.alt || item.title || base.replace(/-/g, ' '),
      source: item.url,
      bytes: buf.length,
    })
    console.log('saved', filename, buf.length)
  } catch (err) {
    console.warn('fail', item.url, err.message)
  }
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(downloaded, null, 2))
console.log('downloaded', downloaded.length)
