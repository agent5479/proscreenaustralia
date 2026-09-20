import { contact } from './contact.js'
import {
  defaultOgImage,
  homeJsonLdGraph,
  localBusinessId,
  meshGuideJsonLdGraph,
  productJsonLdGraph,
  serviceJsonLdGraph,
  siteName,
  webPageJsonLdGraph,
} from './entityGraph.js'

export const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'Soil Screener Australia | Pro Screen Australia',
    description:
      'Australian supplier of DeSite soil screeners — portable soil, gravel and aggregate screening machines. View in your area, Australia-wide supply.',
    keywords: 'soil screener Australia, soil screening machine Australia, screening equipment Australia',
    primaryKeyword: 'Soil Screener Australia',
    canonical: `${contact.siteUrl}/`,
    changefreq: 'weekly',
    priority: '1.0',
    schemaType: 'home',
  },
  {
    path: '/about',
    file: 'about/index.html',
    title: `DeSite Supplier Australia | ${siteName}`,
    description:
      'Pro Screen Australia is the Australian supplier of DeSite soil, gravel and aggregate screening equipment. Sydney-based, Australia-wide support.',
    keywords: 'DeSite supplier Australia, Pro Screen Australia, Australian DeSite screener supplier',
    primaryKeyword: 'DeSite Supplier Australia',
    canonical: `${contact.siteUrl}/about`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'about',
  },
  {
    path: '/contact',
    file: 'contact/index.html',
    title: `Screener Pricing Australia | ${siteName}`,
    description:
      'Call Rob for DeSite screener pricing and advice. View machines in your area — supply across Australia. Phone or WhatsApp, no email.',
    keywords: 'screener pricing Australia, contact Pro Screen Australia, buy soil screener Australia',
    primaryKeyword: 'Screener Pricing Australia',
    canonical: `${contact.siteUrl}/contact`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'contact',
  },
  {
    path: '/photos',
    file: 'photos/index.html',
    title: `Screener Photos Australia | ${siteName}`,
    description:
      'Photo galleries of DeSite soil, gravel and aggregate screeners in Australia — SLG-108VFRB, SLG-78VF, SLG-68V and telehandler bins on real job sites.',
    keywords: 'soil screener photos Australia, DeSite gallery, SLG-78VF photos',
    primaryKeyword: 'Screener Photos Australia',
    canonical: `${contact.siteUrl}/photos`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/image-catalog',
    file: 'image-catalog/index.html',
    title: `DeSite Image Catalog Australia | ${siteName}`,
    description:
      'Complete DeSite screener image catalog sorted by model — SLG-108VFRB, SLG-78VF, SLG-68V, Static Grizzly, telehandler bins and more.',
    keywords: 'DeSite image catalog Australia, screener photos by model',
    primaryKeyword: 'DeSite Image Catalog Australia',
    canonical: `${contact.siteUrl}/image-catalog`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/videos',
    file: 'videos/index.html',
    title: `Screener Videos Australia | ${siteName}`,
    description:
      'Watch DeSite soil, gravel and aggregate screeners in action. Pro Screen Australia videos of SLG-108VFRB, SLG-78VF and SLG-68V demonstrations.',
    keywords: 'soil screener video Australia, DeSite screener demo',
    primaryKeyword: 'Screener Videos Australia',
    canonical: `${contact.siteUrl}/videos`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/products/slg-108vfrb',
    file: 'products/slg-108vfrb/index.html',
    title: `Heavy Duty Soil Screener Australia | ${siteName}`,
    description:
      'Heavy-duty soil screener for full-size loaders and excavators. DeSite SLG-108VFRB high-capacity ProScreen — supplied across Australia.',
    keywords: 'heavy duty soil screener Australia, SLG-108VFRB, DeSite 108',
    primaryKeyword: 'Heavy Duty Soil Screener Australia',
    canonical: `${contact.siteUrl}/products/slg-108vfrb`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-108VFRB',
      schemaName: 'DeSite SLG-108VFRB Heavy Duty Soil Screener Australia',
      image: `${contact.siteUrl}/images/SLG108VFRB.jpg`,
      sku: 'SLG-108VFRB',
      category: 'Heavy duty soil screener',
      carriers: ['Wheel loader', 'Backhoe', 'Excavator', 'Compact excavator', 'Skid steer'],
      materials: ['Topsoil', 'Gravel', 'Aggregate', 'Dirt', 'Construction debris'],
      relatedPaths: [
        '/products/slg-78vf',
        '/products/slg-68v',
        '/products/static-grizzly',
        '/products/mini-screeners',
      ],
    },
  },
  {
    path: '/products/slg-78vf',
    file: 'products/slg-78vf/index.html',
    title: `Portable Soil Screener Australia | ${siteName}`,
    description:
      'Portable soil screener for skid steers and compact loaders. Grade topsoil, dirt and gravel on-site. DeSite SLG-78VF from Pro Screen Australia.',
    keywords: 'portable soil screener Australia, skid steer soil screener, SLG-78VF',
    primaryKeyword: 'Portable Soil Screener Australia',
    canonical: `${contact.siteUrl}/products/slg-78vf`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-78VF',
      schemaName: 'DeSite SLG-78VF Portable Soil Screener Australia',
      image: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
      sku: 'SLG-78VF',
      category: 'Portable soil screener',
      carriers: ['Skid steer', 'Compact loader', 'Bucket tractor', 'Mid-size excavator'],
      materials: ['Topsoil', 'Dirt', 'Gravel', 'Aggregate'],
      relatedPaths: [
        '/products/slg-108vfrb',
        '/products/slg-68v',
        '/products/slg-78vf-flow',
        '/products/static-grizzly',
        '/products/mini-screeners',
      ],
    },
  },
  {
    path: '/products/slg-78vf-flow',
    file: 'products/slg-78vf-flow/index.html',
    title: `Flow Control Soil Screener | ${siteName}`,
    description:
      'DeSite SLG-78VF with Flow Control for consistent feed when screening soil, gravel and aggregate. Available in Australia from Pro Screen Australia.',
    keywords: 'flow control soil screener Australia, SLG-78VF flow control',
    primaryKeyword: 'Flow Control Soil Screener Australia',
    canonical: `${contact.siteUrl}/products/slg-78vf-flow`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-78VF with Flow Control',
      schemaName: 'DeSite SLG-78VF Flow Control Soil Screener Australia',
      image: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
      sku: 'SLG-78VF-FLOW',
      category: 'Flow control soil screener',
      carriers: ['Skid steer', 'Compact loader', 'Mid-size excavator'],
      materials: ['Topsoil', 'Dirt', 'Gravel', 'Aggregate'],
      relatedPaths: ['/products/slg-78vf', '/products/slg-108vfrb', '/products/slg-68v'],
    },
  },
  {
    path: '/products/slg-68v',
    file: 'products/slg-68v/index.html',
    title: `Small Portable Soil Screener | ${siteName}`,
    description:
      'Small portable soil screener for mini skids and compact tractors. DeSite SLG-68V screens topsoil, gravel and aggregate — Australia-wide supply.',
    keywords: 'small portable soil screener Australia, SLG-68V, dirt screener',
    primaryKeyword: 'Small Portable Soil Screener Australia',
    canonical: `${contact.siteUrl}/products/slg-68v`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-68V',
      schemaName: 'DeSite SLG-68V Small Portable Soil Screener Australia',
      image: `${contact.siteUrl}/images/Proscreen_68.jpg`,
      sku: 'SLG-68V',
      category: 'Small portable soil screener',
      carriers: ['Mini skid steer', 'Subcompact tractor', 'Mini excavator'],
      materials: ['Topsoil', 'Dirt', 'Gravel', 'Aggregate'],
      relatedPaths: [
        '/products/slg-78vf',
        '/products/mini-screeners',
        '/products/slg-108vfrb',
        '/products/static-grizzly',
      ],
    },
  },
  {
    path: '/products/static-grizzly',
    file: 'products/static-grizzly/index.html',
    title: `Static Grizzly Australia | ${siteName}`,
    description:
      'Static grizzly and rock screener for oversize soil, gravel and aggregate. DeSite SLG-78 and SLG-108 no-power screeners supplied in Australia.',
    keywords: 'static grizzly Australia, rock screener Australia, SLG-78 static grizzly',
    primaryKeyword: 'Static Grizzly Australia',
    canonical: `${contact.siteUrl}/products/static-grizzly`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'product',
    product: {
      name: 'DeSite Static Grizzly SLG-78 & SLG-108',
      schemaName: 'DeSite Static Grizzly Australia',
      image: `${contact.siteUrl}/images/grizzly2.jpg`,
      sku: 'STATIC-GRIZZLY',
      category: 'Static grizzly / rock screener',
      carriers: ['Skid steer', 'Compact loader', 'Wheel loader', 'Excavator'],
      materials: ['Oversize rock', 'Gravel', 'Soil', 'Aggregate', 'Farm river gravel'],
      relatedPaths: [
        '/products/slg-78vf',
        '/products/slg-108vfrb',
        '/products/grizzly-bar',
        '/products/slg-68v',
      ],
    },
  },
  {
    path: '/products/telehandler-bins',
    file: 'products/telehandler-bins/index.html',
    title: `Telehandler Bins Australia | ${siteName}`,
    description:
      'Durable telehandler bins from Pro Screen Australia for handling soil, aggregate and construction materials on civil and earthmoving projects.',
    keywords: 'telehandler bins Australia, construction bins, material handling bins',
    primaryKeyword: 'Telehandler Bins Australia',
    canonical: `${contact.siteUrl}/products/telehandler-bins`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'Telehandler Bins',
      image: `${contact.siteUrl}/images/Telehandler-bin_site_machinery.jpg`,
      sku: 'TELEHANDLER-BINS',
      category: 'Telehandler bins',
      carriers: ['Telehandler', 'Forklift'],
      materials: ['Soil', 'Aggregate', 'Construction debris'],
      relatedPaths: ['/products/dump-trailers', '/products/skid-steer-attachments'],
    },
  },
  {
    path: '/products/mini-screeners',
    file: 'products/mini-screeners/index.html',
    title: `Mini Soil Screener Australia | ${siteName}`,
    description:
      'Mini soil screener for sale in Australia. DeSite SLG-56 and SLG-48 decks for mini excavators, stand-on skids and compact tractors.',
    keywords: 'mini soil screener Australia, SLG-56, SLG-48, compact soil screener',
    primaryKeyword: 'Mini Soil Screener Australia',
    canonical: `${contact.siteUrl}/products/mini-screeners`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Mini Screeners SLG-56 & SLG-48',
      schemaName: 'DeSite Mini Soil Screener Australia',
      image: `${contact.siteUrl}/images/catalog/slg-56.webp`,
      sku: 'MINI-SCREENERS',
      category: 'Mini soil screener',
      carriers: ['Mini excavator', 'Stand-on skid steer', 'Subcompact tractor'],
      materials: ['Topsoil', 'Dirt', 'Gravel', 'Aggregate'],
      relatedPaths: ['/products/slg-68v', '/products/slg-78vf', '/products/static-grizzly'],
    },
  },
  {
    path: '/products/dump-trailers',
    file: 'products/dump-trailers/index.html',
    title: `XD Dump Trailers Australia | ${siteName}`,
    description:
      'XD70 searchers: DeSite dump trailers in Australia are XD 35, 55 and 80 — not an XD 70. Excavator-rated floors; view a unit in your area.',
    keywords: 'XD70, XD dump trailer Australia, DeSite XD 35, XD 55, XD 80',
    primaryKeyword: 'XD Dump Trailers Australia',
    canonical: `${contact.siteUrl}/products/dump-trailers`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Dump Trailers XD 35, 55 & 80',
      image: `${contact.siteUrl}/images/catalog/xd-35.webp`,
      sku: 'DUMP-TRAILERS',
      category: 'Dump trailer',
      carriers: ['Excavator', 'Skid steer'],
      materials: ['Soil', 'Aggregate', 'Fill'],
      relatedPaths: ['/products/telehandler-bins', '/products/skid-steer-attachments'],
    },
  },
  {
    path: '/products/skid-steer-attachments',
    file: 'products/skid-steer-attachments/index.html',
    title: `Skid Steer Attachments Australia | ${siteName}`,
    description:
      'Need a screen attachment for a skid steer? See the SLG-78VF. This page is DeSite mule bins and rippers — stocked in Australia.',
    keywords: 'skid steer attachments Australia, Mulle Bin, SR-2 ripper',
    primaryKeyword: 'Skid Steer Attachments Australia',
    canonical: `${contact.siteUrl}/products/skid-steer-attachments`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Skid-Steer Attachments',
      image: `${contact.siteUrl}/images/catalog/mulle-bin.webp`,
      sku: 'SKID-STEER-ATTACHMENTS',
      category: 'Skid steer attachments',
      carriers: ['Skid steer', 'Compact loader'],
      materials: ['Hard ground', 'Packed fill', 'Bulk material'],
      relatedPaths: ['/products/slg-78vf', '/products/mini-screeners'],
    },
  },
  {
    path: '/products/grizzly-bar',
    file: 'products/grizzly-bar/index.html',
    title: `Grizzly Bar Australia | ${siteName}`,
    description:
      'DeSite bar-style grizzly for oversize rock and debris. Stocked in Australia. Distinct from the mesh Static Grizzly SLG-78 and SLG-108.',
    keywords: 'grizzly bar Australia, bar grizzly, oversize screener',
    primaryKeyword: 'Grizzly Bar Australia',
    canonical: `${contact.siteUrl}/products/grizzly-bar`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Grizzly Bar',
      image: `${contact.siteUrl}/images/grizzly2.jpg`,
      sku: 'GRIZZLY-BAR',
      category: 'Bar grizzly',
      carriers: ['Loader', 'Excavator', 'Skid steer'],
      materials: ['Oversize rock', 'Debris', 'River stone'],
      relatedPaths: ['/products/static-grizzly', '/products/slg-108vfrb'],
    },
  },
  {
    path: '/screening-recommendation',
    file: 'screening-recommendation/index.html',
    title: `Screener Mesh Sizes Australia | ${siteName}`,
    description:
      'Choose the right DeSite screen mesh for topsoil, gravel, compost, mulch, farm filling and aggregate. Mesh charts for Australian operators.',
    keywords: 'screener mesh sizes Australia, topsoil mesh guide, gravel screening mesh',
    primaryKeyword: 'Screener Mesh Sizes Australia',
    canonical: `${contact.siteUrl}/screening-recommendation`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'meshGuide',
  },
  {
    path: '/for/farmers',
    file: 'for/farmers/index.html',
    title: `Farm Gravel Screening Australia | ${siteName}`,
    description:
      'Screen river gravel on the farm. Make filling for cow races from rounded riverbed stone. 100 mm mesh, then a 50 mm or 3 inch filling screen.',
    keywords: 'farm gravel screening Australia, cow race gravel, farm river screening',
    primaryKeyword: 'Farm Gravel Screening Australia',
    canonical: `${contact.siteUrl}/for/farmers`,
    ogImage: `${contact.siteUrl}/images/farmers-hero.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'Farm river gravel and cow race screening',
      serviceType: 'Farm gravel screening',
      audience: 'Farmers',
      relatedPaths: ['/products/static-grizzly', '/products/slg-78vf', '/products/slg-108vfrb'],
    },
  },
  {
    path: '/for/civil-contractors',
    file: 'for/civil-contractors/index.html',
    title: `Civil Soil Screening Australia | ${siteName}`,
    description:
      'Soil screening equipment for civil contractors in Australia — subdivision fill, retaining walls and building works. Screen on site with DeSite Proscreens.',
    keywords: 'soil screening for civil contractors Australia, subdivision soil screening',
    primaryKeyword: 'Soil Screening for Civil Contractors Australia',
    canonical: `${contact.siteUrl}/for/civil-contractors`,
    ogImage: `${contact.siteUrl}/images/108-WROKING.webp`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'On-site soil and gravel screening for civil contractors',
      serviceType: 'Civil on-site screening',
      audience: 'Civil contractors',
      relatedPaths: [
        '/products/slg-108vfrb',
        '/products/slg-78vf',
        '/products/static-grizzly',
        '/products/slg-68v',
      ],
    },
  },
  {
    path: '/for/topsoil-landscaping',
    file: 'for/topsoil-landscaping/index.html',
    title: `Topsoil Screening Equipment | ${siteName}`,
    description:
      'Topsoil screening equipment for landscapers in Australia. A vibratory Proscreen grades dirt and top dressing — not a power rock screen.',
    keywords: 'topsoil screening equipment Australia, topsoil screener Australia',
    primaryKeyword: 'Topsoil Screening Equipment Australia',
    canonical: `${contact.siteUrl}/for/topsoil-landscaping`,
    ogImage: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'On-site topsoil screening for landscapers',
      serviceType: 'Topsoil and landscaping screening',
      audience: 'Landscapers',
      relatedPaths: ['/products/slg-68v', '/products/slg-78vf', '/products/slg-108vfrb'],
    },
  },
  {
    path: '/for/aggregate-and-road-metal',
    file: 'for/aggregate-and-road-metal/index.html',
    title: `Gravel & Aggregate Screening | ${siteName}`,
    description:
      'Gravel and aggregate screening equipment for Australia — road metal, pea gravel, septic stone and drainage rock. Portable DeSite screens, not a full plant.',
    keywords: 'gravel and aggregate screening equipment Australia, road metal screening',
    primaryKeyword: 'Gravel and Aggregate Screening Equipment Australia',
    canonical: `${contact.siteUrl}/for/aggregate-and-road-metal`,
    ogImage: `${contact.siteUrl}/images/grizzly3.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'Aggregate, road metal and drainage stone screening',
      serviceType: 'Aggregate screening',
      audience: 'Contractors, quarries and material yards',
      relatedPaths: [
        '/products/static-grizzly',
        '/products/slg-78vf',
        '/products/slg-108vfrb',
        '/products/grizzly-bar',
      ],
    },
  },
  {
    path: '/for/view-in-your-area',
    file: 'for/view-in-your-area/index.html',
    title: `View DeSite Screeners Australia | ${siteName}`,
    description:
      'View DeSite screeners in your area. Call Rob at Pro Screen Australia to arrange a viewing, then we specify mesh and machine for Australia-wide supply.',
    keywords: 'view DeSite screeners Australia, view machines in your area',
    primaryKeyword: 'View DeSite Screeners Australia',
    canonical: `${contact.siteUrl}/for/view-in-your-area`,
    ogImage: `${contact.siteUrl}/images/SLG108VFRB.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'Equipment viewing and nationwide screener supply',
      serviceType: 'Equipment supply and viewing',
      audience: 'Australian operators',
      relatedPaths: [
        '/products/slg-78vf',
        '/products/slg-108vfrb',
        '/products/slg-68v',
        '/products/static-grizzly',
      ],
    },
  },
  {
    path: '/for/nelson-nationwide',
    file: 'for/nelson-nationwide/index.html',
    title: `View Machines in Your Area | ${siteName}`,
    description: 'This URL redirects to the current viewing page for Pro Screen Australia.',
    keywords: 'Pro Screen Australia',
    canonical: `${contact.siteUrl}/for/nelson-nationwide`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
  {
    path: '/products/additional-products',
    file: 'products/additional-products/index.html',
    title: `DeSite Range | ${siteName}`,
    description: 'This URL redirects to the Pro Screen Australia equipment range.',
    keywords: 'Pro Screen Australia',
    canonical: `${contact.siteUrl}/products/additional-products`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
  {
    path: '/idm/commercials',
    file: 'idm/commercials/index.html',
    title: `Commercials Workspace - ${siteName}`,
    description: 'Internal promotional materials workspace for Pro Screen Australia.',
    keywords: 'Pro Screen Australia commercials',
    canonical: `${contact.siteUrl}/idm/commercials`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
  {
    path: '/idm/commercials/grizzly',
    file: 'idm/commercials/grizzly/index.html',
    title: `Grizzly Screens Promo Draft - ${siteName}`,
    description: 'Draft promotional material for DeSite static grizzly screens.',
    keywords: 'grizzly screener promo',
    canonical: `${contact.siteUrl}/idm/commercials/grizzly`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
  {
    path: '/idm/commercials/vibratory',
    file: 'idm/commercials/vibratory/index.html',
    title: `Vibratory Proscreens Promo Draft - ${siteName}`,
    description: 'Draft promotional material for DeSite vibratory Proscreens.',
    keywords: 'vibratory proscreen promo',
    canonical: `${contact.siteUrl}/idm/commercials/vibratory`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
  {
    path: '/idm/prospects',
    file: 'idm/prospects/index.html',
    title: `Prospects Workspace - ${siteName}`,
    description: 'Internal prospect list workspace for Pro Screen Australia.',
    keywords: 'Pro Screen Australia prospects',
    canonical: `${contact.siteUrl}/idm/prospects`,
    robots: 'noindex, nofollow',
    includeInSitemap: false,
  },
]

export function getSeo(pathname) {
  const normalized = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
  return routes.find((r) => r.path === normalized) || routes[0]
}

/** Routes that should appear in sitemap.xml and be indexable. */
export function isIndexableRoute(route) {
  if (route.includeInSitemap === false) return false
  if (route.robots && String(route.robots).includes('noindex')) return false
  return true
}

export const notFoundSeo = {
  path: '/404',
  title: `Page Not Found | ${siteName}`,
  description:
    'This page could not be found. Return to Pro Screen Australia for DeSite soil, gravel and aggregate screeners.',
  keywords: 'Pro Screen Australia',
  robots: 'noindex, nofollow',
  includeInSitemap: false,
  omitCanonical: true,
}

/**
 * Return JSON-LD for a pathname (object or null). Used by Helmet and prerender.
 */
export function getJsonLd(pathname) {
  const route = getSeo(pathname)
  if (route.robots && String(route.robots).includes('noindex')) return null

  switch (route.schemaType) {
    case 'home':
      return homeJsonLdGraph()
    case 'product':
      return productJsonLdGraph(route)
    case 'service':
      return serviceJsonLdGraph(route)
    case 'meshGuide':
      return meshGuideJsonLdGraph(route)
    case 'about':
    case 'contact':
    case 'webPage':
      return webPageJsonLdGraph(route)
    default:
      return null
  }
}

export { defaultOgImage, siteName, localBusinessId }
