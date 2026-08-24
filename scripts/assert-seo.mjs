import fs from 'node:fs'
import path from 'node:path'
import { routes, isIndexableRoute, notFoundSeo } from '../src/data/seo.js'
import { contact } from '../src/data/contact.js'

const distDir = path.resolve('dist')
const publicDir = path.resolve('public')
const errors = []

function fail(msg) {
  errors.push(msg)
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing file: ${filePath}`)
    return ''
  }
  return fs.readFileSync(filePath, 'utf8')
}

// Public App.jsx paths (exclude catch-all *)
const appSource = read(path.resolve('src/App.jsx'))
const appPaths = [...appSource.matchAll(/path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== '*')

const routeByPath = new Map(routes.map((r) => [r.path, r]))

for (const appPath of appPaths) {
  const route = routeByPath.get(appPath)
  if (!route) {
    fail(`App.jsx path missing from seo.js routes: ${appPath}`)
    continue
  }
  if (!route.title) fail(`${appPath}: missing title`)
  if (!route.description) fail(`${appPath}: missing description`)
  if (!route.canonical) fail(`${appPath}: missing canonical`)
}

const indexable = routes.filter(isIndexableRoute)
const expectedLocs = new Set(indexable.map((r) => r.canonical))

const sitemap = read(path.join(distDir, 'sitemap.xml'))
const sitemapLocs = new Set(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
)

for (const loc of expectedLocs) {
  if (!sitemapLocs.has(loc)) fail(`Sitemap missing: ${loc}`)
}
for (const loc of sitemapLocs) {
  if (!expectedLocs.has(loc)) fail(`Sitemap has unexpected URL: ${loc}`)
}

for (const route of routes) {
  if (route.robots?.includes('noindex') && sitemapLocs.has(route.canonical)) {
    fail(`noindex route appears in sitemap: ${route.path}`)
  }
}

if (!sitemap.includes('<lastmod>')) {
  fail('Sitemap missing lastmod')
}

const robotsDist = read(path.join(distDir, 'robots.txt'))
const robotsPublic = read(path.join(publicDir, 'robots.txt'))
for (const [label, text] of [
  ['dist/robots.txt', robotsDist],
  ['public/robots.txt', robotsPublic],
]) {
  if (!text.includes('Disallow: /idm/')) fail(`${label}: missing Disallow /idm/`)
  if (!text.includes(`Sitemap: ${contact.siteUrl}/sitemap.xml`)) {
    fail(`${label}: missing Sitemap URL`)
  }
  if (!text.includes('Allow: /')) fail(`${label}: missing Allow: /`)
}

const homeHtml = read(path.join(distDir, 'index.html'))
if (homeHtml) {
  if (!/<html lang="en-AU">/i.test(homeHtml)) {
    fail('Home HTML must set lang="en-AU"')
  }
  if (!homeHtml.includes('"@type":"WebSite"')) {
    fail('Home JSON-LD must include WebSite')
  }
  if (!homeHtml.includes('"@type":"LocalBusiness"')) {
    fail('Home JSON-LD must include LocalBusiness')
  }
}

// Sample public product page meta
const product = routeByPath.get('/products/slg-78vf')
const productHtml = read(path.join(distDir, 'products/slg-78vf/index.html'))
if (product && productHtml) {
  if (!productHtml.includes(`<title>${product.title}</title>`)) {
    fail('Product HTML title mismatch for /products/slg-78vf')
  }
  if (!productHtml.includes(`rel="canonical" href="${product.canonical}"`)) {
    fail('Product HTML canonical mismatch for /products/slg-78vf')
  }
  if (!/name="robots" content="index, follow/.test(productHtml)) {
    fail('Product HTML robots should be index, follow')
  }
  if (!productHtml.includes('<h1>DeSite SLG-78VF</h1>')) {
    fail('Product HTML missing prerendered body h1')
  }
}

const notFoundHtml = read(path.join(distDir, '404.html'))
if (notFoundHtml) {
  if (!/name="robots" content="noindex, nofollow"/.test(notFoundHtml)) {
    fail('404.html must be noindex, nofollow')
  }
  if (notFoundHtml.includes('rel="canonical"')) {
    fail('404.html must not set a canonical URL')
  }
  if (!notFoundHtml.includes(notFoundSeo.title)) {
    fail('404.html title mismatch')
  }
  if (notFoundHtml.includes('Screen and Grade Topsoil')) {
    fail('404.html must not contain homepage hero copy')
  }
  if (!notFoundHtml.includes('Page not found')) {
    fail('404.html missing not-found body')
  }
}

// Soft length checks for indexable routes
for (const route of indexable) {
  if (route.title.length > 65) {
    fail(`${route.path}: title too long (${route.title.length})`)
  }
  if (route.description.length < 70 || route.description.length > 165) {
    fail(`${route.path}: description length ${route.description.length}`)
  }
}

if (errors.length) {
  console.error('SEO assert failed:')
  for (const err of errors) console.error(' -', err)
  process.exit(1)
}

console.log(
  `SEO assert passed (${indexable.length} sitemap URLs, ${appPaths.length} App routes).`,
)
