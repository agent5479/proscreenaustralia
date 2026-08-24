/**
 * Complete equipment image catalog — local site assets + scraped DeSite / AU galleries.
 * Mesh-guide grade photos and the DeSite logo are intentionally excluded.
 */
import auManifest from './auCatalogManifest.js'
import idmManifest from './idmCatalogManifest.js'

function img(src, alt) {
  return { src, alt }
}

function fromManifest(manifest, modelId) {
  return manifest.filter((m) => m.modelId === modelId).map((m) => img(m.file, m.alt))
}

function fromIdm(modelId) {
  return fromManifest(idmManifest, modelId)
}

function fromAu(modelId) {
  return fromManifest(auManifest, modelId)
}

/** Dedupe by full path and by basename so AU/DeSite copies of local feature shots are skipped. */
function mergeUnique(...lists) {
  const seenSrc = new Set()
  const seenBase = new Set()
  const out = []
  for (const list of lists) {
    for (const item of list) {
      const srcKey = item.src.toLowerCase()
      // Strip scrape numbering prefix (01-Name.webp → name.webp)
      const baseKey = item.src
        .split('/')
        .pop()
        .toLowerCase()
        .replace(/^\d{2}-/, '')
      if (seenSrc.has(srcKey) || seenBase.has(baseKey)) continue
      seenSrc.add(srcKey)
      seenBase.add(baseKey)
      out.push(item)
    }
  }
  return out
}

const local108 = [
  img('/images/SLG108VFRB.jpg', 'DeSite SLG-108VFRB in action'),
  img('/images/108-VFRB-FEATURES-IMAGE.webp', 'DeSite SLG-108VFRB features'),
  img('/images/108-WROKING.webp', 'DeSite SLG-108VFRB working on site'),
  img('/images/bucket for 108.webp', 'DeSite SLG-108VFRB bucket compatibility'),
  img('/images/FEED-DEFLECTOR-SYSTEM_108VFRB.webp', 'Feed deflector system front view'),
  img('/images/FEED-DEFLECTOR-SYSTEM-108VFRB_2.webp', 'Feed deflector system side view'),
  img('/images/TILTING-SCREEN-DECK_108VFRB.webp', 'Tilting screen deck front view'),
  img('/images/TILTING-SCREEN-DECK-108VFRB_2.webp', 'Tilting screen deck side view'),
  img(
    '/images/Cantilevered-Spring-Suspension-System-108VFRB.webp',
    'Cantilevered spring suspension system',
  ),
  img('/images/SUSPENSION_108VFRB.webp', 'Spring suspension system compressing'),
  img('/images/VIBRATORY-PACKS_108VFRB.webp', 'Dual eccentric vibratory packs'),
  img('/images/ECCENTRIC-VIBRATORY-PACKS-108VFRB_2.webp', 'Vibratory packs and power box'),
]

const local78 = [
  img('/images/Proscreen_SLG78VFII_home.jpg', 'DeSite SLG-78VF portable screener in action'),
  img('/images/Proscreen_SLG78VFII_3.jpg', 'DeSite SLG-78VF multi-slope screen deck'),
  img('/images/Vibratory-Screener-78VFRB.webp', 'DeSite SLG-78VF vibratory screener'),
  img('/images/bucket for 78.webp', 'DeSite SLG-78VF bucket compatibility'),
  img('/images/FEED-DEFLECTOR-SYSTEM-78VFRB.webp', 'Feed deflector system'),
  img('/images/FEED-DEFLECTOR-SYSTEM-78VFRB_2.webp', 'Feed deflector system detail'),
  img('/images/TILTING-SCREEN-DECK-78VFRB.webp', 'Tilting screen deck'),
  img('/images/TILTING-SCREEN-DECK-78VFRB_2.webp', 'Tilting screen deck side view'),
  img('/images/SUSPENSION-78VFRB.webp', 'Spring suspension system'),
  img('/images/SUSPENSION-78VFRB_2.webp', 'Spring suspension system detail'),
  img('/images/screen1.jpg', 'Proscreen SLG-78VF screening topsoil'),
  img('/images/screen2.jpg', 'Proscreen SLG-78VF on worksite'),
]

const local78Flow = [
  img('/images/Proscreen78-flow-control.jpg', 'Proscreen SLG-78VF with Flow Control'),
  img('/images/78-flow-control2.jpg', 'Flow Control feature detail'),
  img('/images/dual78-screen-setup-900-riserbox.png', 'Dual screen setup with riser box'),
  img('/images/screen3.jpg', 'Proscreen SLG-78VF with Flow Control in action'),
]

const local68 = [
  img('/images/Proscreen_68.jpg', 'DeSite SLG-68V compact screener'),
  img('/images/Proscreen_68_index.jpg', 'DeSite SLG-68V in action'),
  img('/images/68V-FEATURES-IMAGE.webp', 'DeSite SLG-68V features'),
  img('/images/bucket for 68.webp', 'DeSite SLG-68V bucket compatibility'),
  img('/images/RUBBER-SCREEN-DECK-SKIRTS-68V.webp', 'Rubber screen deck skirts'),
  img('/images/RUBBER-SCREEN-DECK-SKIRTS-68V_2-1.webp', 'Rubber screen deck skirts detail'),
  img('/images/TILTING-SCREEN-DECK-68V.webp', 'Tilting screen deck'),
  img('/images/TILTING-SCREEN-DECK-68V_2.webp', 'Tilting screen deck side view'),
  img('/images/SUSPENSION-68V.webp', 'Spring suspension system'),
  img(
    '/images/Cantilevered-Spring-Suspension-System-68V.webp',
    'Cantilevered spring suspension system',
  ),
  img('/images/VIBRATORY-SYSTEM-68V.webp', 'Vibratory system'),
  img('/images/VIBRATORY-SYSTEM-68V_2.webp', 'Vibratory system detail'),
  img('/images/POWER-BOX-68V.webp', 'Power box'),
  img('/images/screen4.jpg', 'Proscreen SLG-68V portable design'),
]

const localGrizzly = [
  img('/images/grizzly2.jpg', 'DeSite Static Grizzly screener'),
  img('/images/grizzly3.jpg', 'DeSite Static Grizzly screening dirt, stone and sticks'),
  img('/images/TILTING-SCREEN-DECK-78STATIC_2.webp', 'Tilting screen deck side view'),
  img('/images/TILTING-SCREEN-DECK-78STATIC_.webp', 'Tilting screen deck front view'),
  img('/images/SUSPENSION-78STATIC.webp', 'Spring suspension system'),
  img('/images/SUSPENSION-78STATIC_.webp', 'Spring suspension system detail'),
]

const localBins = [
  img('/images/Telehandler-bin_site_machinery.jpg', 'Telehandler Bins'),
  img('/images/Telehandler-bin_site_machinery_products.jpg', 'Telehandler Bins with removable sides'),
  img('/images/Telehandler_bin_tipped_site_machinery.jpg', 'Telehandler Bins on construction site'),
]

const localAdditional = [
  img('/images/catalog/slg-56.webp', 'DeSite SLG-56 Mini screener'),
  img('/images/catalog/slg-48.webp', 'DeSite SLG-48 Mini screener'),
  img('/images/catalog/mulle-bin.webp', 'DeSite Mulle Bin skid-steer attachment'),
  img('/images/catalog/sr2.webp', 'DeSite SR-2 skid-steer ripper'),
  img('/images/catalog/sr3.webp', 'DeSite SR-3 skid-steer ripper'),
  img('/images/catalog/xd-35.webp', 'DeSite Xtreme Duty dump trailer XD 35'),
  img('/images/catalog/xd-55.webp', 'DeSite Xtreme Duty dump trailer XD 55'),
  img('/images/catalog/xd-80.webp', 'DeSite Xtreme Duty dump trailer XD 80'),
  img('/images/catalog/tb-475.png', 'DeSite TB 4.75 yard construction bin'),
  img('/images/catalog/bin-2yd.webp', 'DeSite 2 yard construction bin'),
  img('/images/catalog/bin-1yd.webp', 'DeSite 1 yard construction bin'),
]

const localAccessories = [
  img('/images/rise-box.jpg', 'Riser box for increased screening capacity'),
  img('/images/lugs.jpg', 'Bucket transport lugs'),
]

const localInAction = [
  img('/images/farmers-hero.jpg', 'Farm river gravel screening'),
  img('/images/screen7.jpg', 'Screening operation in progress'),
  img('/images/screen8.jpg', 'Material being screened'),
  img('/images/screen9.jpg', 'Screened material output'),
  img('/images/screen10.jpg', 'Equipment on worksite'),
]

/** @type {{ id: string, title: string, href: string | null, images: { src: string, alt: string }[] }[]} */
export const imageCatalog = [
  {
    id: 'slg-108vfrb',
    title: 'Proscreen SLG-108VFRB',
    href: '/products/slg-108vfrb',
    images: mergeUnique(local108, fromIdm('slg-108vfrb'), fromAu('slg-108vfrb')),
  },
  {
    id: 'slg-78vf',
    title: 'Proscreen SLG-78VF',
    href: '/products/slg-78vf',
    images: mergeUnique(local78, fromIdm('slg-78vf'), fromAu('slg-78vf')),
  },
  {
    id: 'slg-78vf-flow',
    title: 'Proscreen SLG-78VF with Flow Control',
    href: '/products/slg-78vf-flow',
    images: local78Flow,
  },
  {
    id: 'slg-68v',
    title: 'Proscreen SLG-68V',
    href: '/products/slg-68v',
    images: mergeUnique(local68, fromIdm('slg-68v'), fromAu('slg-68v')),
  },
  {
    id: 'static-grizzly',
    title: 'Static Grizzly (78 & 108)',
    href: '/products/static-grizzly',
    images: mergeUnique(localGrizzly, fromIdm('static-grizzly'), fromAu('static-grizzly')),
  },
  {
    id: 'telehandler-bins',
    title: 'Telehandler Bins',
    href: '/products/telehandler-bins',
    images: mergeUnique(localBins, fromAu('telehandler-bins')),
  },
  {
    id: 'additional-products',
    title: 'Additional Products',
    href: '/products/additional-products',
    images: mergeUnique(localAdditional, fromAu('additional-products')),
  },
  {
    id: 'accessories',
    title: 'Accessories',
    href: null,
    images: localAccessories,
  },
  {
    id: 'equipment-in-action',
    title: 'Equipment in Action',
    href: null,
    images: localInAction,
  },
].filter((group) => group.images.length > 0)

export const imageCatalogNav = imageCatalog.map((g) => ({
  id: g.id,
  label: g.title,
}))
