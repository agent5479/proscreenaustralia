import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('src')
const extras = [
  path.resolve('docs'),
  path.resolve('index.html'),
  path.resolve('package.json'),
  path.resolve('public/robots.txt'),
  path.resolve('scripts/prerender-meta.mjs'),
  path.resolve('scripts/assert-seo.mjs'),
]

const pairs = [
  [/Site Machinery NZ/g, 'Pro Screen Australia'],
  [/Site Machinery Ltd/g, 'Pro Screen Australia'],
  [/Site Machinery/g, 'Pro Screen Australia'],
  [/SITE MACHINERY/g, 'PRO SCREEN AUSTRALIA'],
  [/sitemachinery\.nz/g, 'agent5479.github.io/proscreenaustralia'],
  [/info@sitemachinery\.nz/g, ''],
  [/\+64 3 970 7602/g, '+61 433 045 045'],
  [/\+6439707602/g, '+61433045045'],
  [/mailto:/g, 'https://wa.me/61433045045'],
  [/Email Us/g, 'WhatsApp Rob'],
  [/Email:/g, 'WhatsApp:'],
  [/class="nav-email"/g, 'class="nav-whatsapp"'],
  [/from Nelson, nationwide/g, 'Australia-wide'],
  [/from Nelson — nationwide/g, 'Australia-wide'],
  [/Ex Nelson/g, 'Freight arranged with the purchaser'],
  [/ex Nelson/g, 'freight arranged with the purchaser'],
  [/105 Pascoe Street, Nelson 7011/g, 'Australia-wide — call Rob to view machines in your area'],
  [/105 Pascoe Street, Nelson/g, 'Australia-wide — call Rob to view machines in your area'],
  [/105 Pascoe St, Nelson 7011/g, 'Australia-wide — call Rob to view machines in your area'],
  [/105 Pascoe St, Nelson/g, 'Australia-wide — call Rob to view machines in your area'],
  [/Nelson showroom/gi, 'viewing in your area'],
  [/Nelson Showroom/g, 'View in your area'],
  [/\/for\/nelson-nationwide/g, '/for/view-in-your-area'],
  [/NZ operators/g, 'Australian operators'],
  [/New Zealand supplier/g, 'Australian supplier'],
  [/in New Zealand/g, 'in Australia'],
  [/across New Zealand/g, 'across Australia'],
  [/nationwide New Zealand/g, 'Australia-wide'],
  [/New Zealand/g, 'Australia'],
  [/ IDM \/ DeSite/g, ' DeSite'],
  [/IDM \/ DeSite/g, 'DeSite'],
  [/IDM and DeSite/g, 'DeSite'],
  [/from IDM and /g, 'from DeSite and '],
  [/manufacturer galleries from IDM/g, 'manufacturer galleries from DeSite'],
  [/Source charts adapted from IDM \/ DeSite/g, 'Source charts adapted from DeSite'],
  [/IDM \/ Commercials/g, 'DeSite / Commercials'],
  [/<h1>IDM \/ Commercials<\/h1>/g, '<h1>DeSite / Commercials</h1>'],
  [/priceCurrency: 'NZD'/g, "priceCurrency: 'AUD'"],
  [/en-NZ/g, 'en-AU'],
  [/en_NZ/g, 'en_AU'],
  [/#b34700/g, '#006a9a'],
  [/#ff6600/g, '#0099d8'],
  [/#ffa500/g, '#33b4e6'],
  [/rgba\(255,102,0/g, 'rgba(0,153,216'],
  [/rgba\(255, 102, 0/g, 'rgba(0, 153, 216'],
]

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files
  const stat = fs.statSync(dir)
  if (stat.isFile()) {
    files.push(dir)
    return files
  }
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist') continue
    walk(path.join(dir, name), files)
  }
  return files
}

const files = [
  ...walk(root),
  ...walk(path.resolve('docs')),
  path.resolve('index.html'),
  path.resolve('package.json'),
  path.resolve('public/robots.txt'),
  path.resolve('scripts/prerender-meta.mjs'),
  path.resolve('scripts/assert-seo.mjs'),
].filter((f) => /\.(js|jsx|mjs|css|html|md|txt|json)$/.test(f))

let changed = 0
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8')
  const orig = text
  for (const [from, to] of pairs) text = text.replace(from, to)
  // Don't blank leftover mailto-only artifacts
  text = text.replace(/href="https:\/\/wa\.me\/61433045045"/g, 'href="https://wa.me/61433045045"')
  if (text !== orig) {
    fs.writeFileSync(file, text)
    changed++
    console.log('updated', path.relative(process.cwd(), file))
  }
}
console.log('files changed', changed)
