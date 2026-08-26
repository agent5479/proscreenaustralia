import { contact } from './contact.js'

const siteName = 'Pro Screen Australia'
const defaultOgImage = `${contact.siteUrl}/og-desite.png`

export const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'Soil & Gravel Screeners Australia | Pro Screen Australia',
    description:
      'DeSite soil, gravel and aggregate screeners for Australia. Portable vibratory ProScreens from Pro Screen Australia — view machines in your area, nationwide supply.',
    keywords:
      'soil screener Australia, gravel screener Australia, aggregate screener, topsoil screener Australia, DeSite Australia, vibratory screener, screening equipment Australia, Pro Screen Australia',
    canonical: `${contact.siteUrl}/`,
    changefreq: 'weekly',
    priority: '1.0',
    schemaType: 'home',
  },
  {
    path: '/about',
    file: 'about/index.html',
    title: `About Us | DeSite Screener Supplier - ${siteName}`,
    description:
      'Pro Screen Australia supplies DeSite soil, gravel and aggregate screening equipment. Australia-wide specialist supply and support.',
    keywords:
      'about Pro Screen Australia, DeSite supplier Australia, soil screener company Australia, screening equipment Australia, gravel screener Australia',
    canonical: `${contact.siteUrl}/about`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'about',
  },
  {
    path: '/contact',
    file: 'contact/index.html',
    title: `Contact Us | Screener Pricing | ${siteName}`,
    description:
      'Call Rob at Pro Screen Australia for DeSite screener pricing and advice. View machines in your area — supply across Australia. Phone or WhatsApp, no email.',
    keywords:
      'contact Pro Screen Australia, screener pricing Australia, buy soil screener Australia, viewing in your area, DeSite Australia',
    canonical: `${contact.siteUrl}/contact`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'contact',
  },
  {
    path: '/photos',
    file: 'photos/index.html',
    title: `Screener Photos | Equipment Gallery | ${siteName}`,
    description:
      'Photo galleries of DeSite soil, gravel and aggregate screeners in Australia — SLG-108VFRB, SLG-78VF, SLG-68V and telehandler bins on real job sites.',
    keywords:
      'soil screener photos Australia, DeSite gallery, SLG-108VFRB images, SLG-78VF photos, gravel screener photos',
    canonical: `${contact.siteUrl}/photos`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/image-catalog',
    file: 'image-catalog/index.html',
    title: `Complete Image Catalog | Equipment Photos | ${siteName}`,
    description:
      'Complete DeSite screener image catalog sorted by model — SLG-108VFRB, SLG-78VF, SLG-68V, Static Grizzly, telehandler bins and more. Thumbnails open full-size photos.',
    keywords:
      'DeSite image catalog Australia, screener photos by model, SLG-108VFRB gallery, SLG-78VF photos, SLG-68V images, gravel screener catalog',
    canonical: `${contact.siteUrl}/image-catalog`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/videos',
    file: 'videos/index.html',
    title: `Screener Videos | DeSite Demo Footage - ${siteName}`,
    description:
      'Watch DeSite soil, gravel and aggregate screeners in action. Pro Screen Australia videos of SLG-108VFRB, SLG-78VF and SLG-68V demonstrations.',
    keywords:
      'soil screener video Australia, DeSite screener demo, SLG-108VFRB video, SLG-78VF video, gravel screener video',
    canonical: `${contact.siteUrl}/videos`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'webPage',
  },
  {
    path: '/products/slg-108vfrb',
    file: 'products/slg-108vfrb/index.html',
    title: `DeSite SLG-108VFRB Heavy Duty Screener | ${siteName}`,
    description:
      'DeSite SLG-108VFRB heavy-duty vibratory screener for soil, gravel and aggregate. High-capacity ProScreen supplied across Australia by Pro Screen Australia.',
    keywords:
      'SLG-108VFRB, heavy duty soil screener Australia, DeSite 108, gravel screener, aggregate screener, vibratory ProScreen',
    canonical: `${contact.siteUrl}/products/slg-108vfrb`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-108VFRB',
      image: `${contact.siteUrl}/images/SLG108VFRB.jpg`,
      sku: 'SLG-108VFRB',
    },
  },
  {
    path: '/products/slg-78vf',
    file: 'products/slg-78vf/index.html',
    title: `DeSite SLG-78VF Portable Screener | ${siteName}`,
    description:
      'DeSite SLG-78VF portable vibratory screener with multi-slope deck. Screen topsoil, gravel and aggregate — supplied in Australia by Pro Screen Australia.',
    keywords:
      'SLG-78VF, portable soil screener Australia, topsoil screener, gravel screener Australia, DeSite ProScreen',
    canonical: `${contact.siteUrl}/products/slg-78vf`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-78VF',
      image: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
      sku: 'SLG-78VF',
    },
  },
  {
    path: '/products/slg-78vf-flow',
    file: 'products/slg-78vf-flow/index.html',
    title: `DeSite SLG-78VF Flow Control Screener | ${siteName}`,
    description:
      'DeSite SLG-78VF with Flow Control for consistent feed when screening soil, gravel and aggregate. Available in Australia from Pro Screen Australia.',
    keywords:
      'SLG-78VF flow control, DeSite flow control screener, soil screener Australia, gravel screening Australia',
    canonical: `${contact.siteUrl}/products/slg-78vf-flow`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-78VF with Flow Control',
      image: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
      sku: 'SLG-78VF-FLOW',
    },
  },
  {
    path: '/products/slg-68v',
    file: 'products/slg-68v/index.html',
    title: `DeSite SLG-68V Compact Screener | ${siteName}`,
    description:
      'DeSite SLG-68V compact portable screener for smaller contractors and landscapers. Screen soil, gravel and aggregate — supplied nationwide by Pro Screen Australia.',
    keywords:
      'SLG-68V, compact soil screener Australia, small gravel screener, DeSite 68V, portable screener Australia',
    canonical: `${contact.siteUrl}/products/slg-68v`,
    changefreq: 'monthly',
    priority: '0.9',
    schemaType: 'product',
    product: {
      name: 'DeSite SLG-68V',
      image: `${contact.siteUrl}/images/Proscreen_68.jpg`,
      sku: 'SLG-68V',
    },
  },
  {
    path: '/products/static-grizzly',
    file: 'products/static-grizzly/index.html',
    title: `DeSite Static Grizzly 78 & 108 | ${siteName}`,
    description:
      'DeSite SLG-78 and SLG-108 Static Grizzlies for oversize separation of soil, gravel and aggregate. No-power screeners supplied in Australia by Pro Screen Australia.',
    keywords:
      'static grizzly screener Australia, SLG-78 static grizzly, SLG-108 static grizzly, DeSite grizzly, rock screener, oversize screening',
    canonical: `${contact.siteUrl}/products/static-grizzly`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'product',
    product: {
      name: 'DeSite Static Grizzly SLG-78 & SLG-108',
      image: `${contact.siteUrl}/images/grizzly2.jpg`,
      sku: 'STATIC-GRIZZLY',
    },
  },
  {
    path: '/products/telehandler-bins',
    file: 'products/telehandler-bins/index.html',
    title: `Telehandler Bins | ${siteName}`,
    description:
      'Durable telehandler bins from Pro Screen Australia for handling soil, aggregate and construction materials on civil and earthmoving projects.',
    keywords:
      'telehandler bins Australia, construction bins, material handling bins, earthmoving bins Australia',
    canonical: `${contact.siteUrl}/products/telehandler-bins`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'Telehandler Bins',
      image: `${contact.siteUrl}/images/Telehandler-bin_site_machinery.jpg`,
      sku: 'TELEHANDLER-BINS',
    },
  },
  {
    path: '/products/mini-screeners',
    file: 'products/mini-screeners/index.html',
    title: `Mini Screeners SLG-56 & SLG-48 | ${siteName}`,
    description:
      'DeSite SLG-56 and SLG-48 mini screeners stocked in Australia by Pro Screen Australia. Non-vibratory decks for compact excavators, tractors and smaller skidsteers.',
    keywords: 'mini screener Australia, SLG-56, SLG-48, DeSite mini screener, compact soil screener',
    canonical: `${contact.siteUrl}/products/mini-screeners`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Mini Screeners SLG-56 & SLG-48',
      image: `${contact.siteUrl}/images/catalog/slg-56.webp`,
      sku: 'MINI-SCREENERS',
    },
  },
  {
    path: '/products/dump-trailers',
    file: 'products/dump-trailers/index.html',
    title: `Dump Trailers XD 35 55 80 | ${siteName}`,
    description:
      'DeSite Xtreme Duty dump trailers XD 35, 55 and 80 stocked in Australia. Excavator-rated floors for compact gear.',
    keywords: 'dump trailer Australia, DeSite XD 35, XD 55, XD 80, excavator dump trailer',
    canonical: `${contact.siteUrl}/products/dump-trailers`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Dump Trailers XD 35, 55 & 80',
      image: `${contact.siteUrl}/images/catalog/xd-35.webp`,
      sku: 'DUMP-TRAILERS',
    },
  },
  {
    path: '/products/skid-steer-attachments',
    file: 'products/skid-steer-attachments/index.html',
    title: `Skid-Steer Attachments | ${siteName}`,
    description:
      'DeSite Mulle Bin, SR-2 and SR-3 skid-steer attachments stocked in Australia by Pro Screen Australia.',
    keywords: 'skid steer attachments Australia, Mulle Bin, SR-2 ripper, SR-3 ripper, DeSite attachments',
    canonical: `${contact.siteUrl}/products/skid-steer-attachments`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Skid-Steer Attachments',
      image: `${contact.siteUrl}/images/catalog/mulle-bin.webp`,
      sku: 'SKID-STEER-ATTACHMENTS',
    },
  },
  {
    path: '/products/grizzly-bar',
    file: 'products/grizzly-bar/index.html',
    title: `Grizzly Bar | ${siteName}`,
    description:
      'DeSite bar-style grizzly for oversize rock and debris. Stocked in Australia. Distinct from the mesh Static Grizzly SLG-78 and SLG-108.',
    keywords: 'grizzly bar Australia, bar grizzly, oversize screener, DeSite grizzly bar',
    canonical: `${contact.siteUrl}/products/grizzly-bar`,
    changefreq: 'monthly',
    priority: '0.7',
    schemaType: 'product',
    product: {
      name: 'DeSite Grizzly Bar',
      image: `${contact.siteUrl}/images/grizzly2.jpg`,
      sku: 'GRIZZLY-BAR',
    },
  },
  {
    path: '/screening-recommendation',
    file: 'screening-recommendation/index.html',
    title: `Screen Mesh Size Guide | ${siteName}`,
    description:
      'Choose the right DeSite screen mesh for topsoil, gravel, compost, mulch, farm filling and aggregate. Mesh recommendation charts for Australia operators.',
    keywords:
      'screen mesh size Australia, topsoil mesh guide, gravel screening mesh, aggregate mesh size, cow race gravel mesh, DeSite mesh recommendation',
    canonical: `${contact.siteUrl}/screening-recommendation`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'meshGuide',
  },
  {
    path: '/for/farmers',
    file: 'for/farmers/index.html',
    title: `Screen Farm River Gravel for Cow Races | ${siteName}`,
    description:
      'Screen river gravel on the farm. Make filling for cow races from rounded riverbed stone. 100 mm mesh, then a 50 mm or 3 inch filling screen. Australia-wide.',
    keywords:
      'farm gravel screener Australia, cow race gravel, farm river screening, 100mm mesh, filling material screener, DeSite grizzly farm',
    canonical: `${contact.siteUrl}/for/farmers`,
    ogImage: `${contact.siteUrl}/images/farmers-hero.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'Farm river gravel and cow race screening',
      serviceType: 'Farm gravel screening',
    },
  },
  {
    path: '/for/civil-contractors',
    file: 'for/civil-contractors/index.html',
    title: `Screen Soil and Gravel On-Site | ${siteName}`,
    description:
      'Screen soil and gravel on the job for subdivisions, building works and retaining walls. 100 mm mesh plus a 50 mm or 3 inch filling screen. Pro Screen Australia.',
    keywords:
      'civil contractor screener Australia, subdivision landscaping screener, skid steer soil screening, retaining wall fill, DeSite Proscreen',
    canonical: `${contact.siteUrl}/for/civil-contractors`,
    ogImage: `${contact.siteUrl}/images/108-WROKING.webp`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'On-site soil and gravel screening for civil contractors',
      serviceType: 'Civil on-site screening',
    },
  },
  {
    path: '/for/topsoil-landscaping',
    file: 'for/topsoil-landscaping/index.html',
    title: `Topsoil Screening for Landscapers | ${siteName}`,
    description:
      'Grade topsoil, compost and yard soil on-site in Australia. DeSite Proscreens for landscapers — mesh matched to the finish you sell.',
    keywords:
      'topsoil screener Australia, landscaping soil screener, on-site topsoil screening, compost screener Australia, Pro Screen Australia',
    canonical: `${contact.siteUrl}/for/topsoil-landscaping`,
    ogImage: `${contact.siteUrl}/images/Proscreen_SLG78VFII_home.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'On-site topsoil screening for landscapers',
      serviceType: 'Topsoil and landscaping screening',
    },
  },
  {
    path: '/for/aggregate-and-road-metal',
    file: 'for/aggregate-and-road-metal/index.html',
    title: `Gravel & Road Metal Screening | ${siteName}`,
    description:
      'On-site aggregate screening in Australia — road metal, pea gravel, septic stone and drainage rock. DeSite Proscreens and Static Grizzlies from Pro Screen Australia.',
    keywords:
      'aggregate screener Australia, road metal screening, gravel screener Australia, drainage stone screener, septic rock mesh',
    canonical: `${contact.siteUrl}/for/aggregate-and-road-metal`,
    ogImage: `${contact.siteUrl}/images/grizzly3.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'Aggregate, road metal and drainage stone screening',
      serviceType: 'Aggregate screening',
    },
  },
  {
    path: '/for/view-in-your-area',
    file: 'for/view-in-your-area/index.html',
    title: `View Machines in Your Area | ${siteName}`,
    description:
      'View DeSite screeners in your area. Call Rob at Pro Screen Australia to arrange a viewing, then we specify mesh and machine for Australia-wide supply.',
    keywords:
      'view machines in your area, Pro Screen Australia Australia, buy soil screener Australia, DeSite Australian supplier, Australia-wide supply',
    canonical: `${contact.siteUrl}/for/view-in-your-area`,
    ogImage: `${contact.siteUrl}/images/SLG108VFRB.jpg`,
    changefreq: 'monthly',
    priority: '0.8',
    schemaType: 'service',
    service: {
      name: 'viewing in your area viewing and nationwide screener supply',
      serviceType: 'Equipment supply and viewing',
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

const localBusinessId = `${contact.siteUrl}/#organization`

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': `${contact.siteUrl}/#website`,
  url: contact.siteUrl,
  name: siteName,
  description:
    'DeSite soil, gravel and aggregate screeners for Australia. Portable vibratory ProScreens from Pro Screen Australia.',
  publisher: { '@id': localBusinessId },
  inLanguage: 'en-AU',
}

export const organizationJsonLd = {
  '@type': 'LocalBusiness',
  '@id': localBusinessId,
  name: 'Pro Screen Australia',
  alternateName: 'Pro Screen Australia',
  url: contact.siteUrl,
  telephone: contact.phoneTel,
  image: defaultOgImage,
  logo: `${contact.siteUrl}/site-logo.png`,
  sameAs: [contact.instagramUrl],
  description:
    'Australian supplier of DeSite soil, gravel and aggregate screening machines and related earthmoving equipment.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contact.phoneTel,
    contactType: 'sales',
    areaServed: 'AU',
    availableLanguage: ['English'],
  },
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },
  knowsAbout: [
    'soil screener',
    'gravel screener',
    'aggregate screener',
    'topsoil screener',
    'DeSite ProScreen',
    'vibratory screening equipment',
    'cow race gravel screening',
    'on-site civil fill screening',
    'topsoil and landscaping screening',
    'aggregate and road metal screening',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'DeSite SLG-78VF',
        url: `${contact.siteUrl}/products/slg-78vf`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'DeSite SLG-108VFRB',
        url: `${contact.siteUrl}/products/slg-108vfrb`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: 'DeSite Static Grizzly',
        url: `${contact.siteUrl}/products/static-grizzly`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Farm river gravel and cow race screening supply',
        url: `${contact.siteUrl}/for/farmers`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Civil on-site soil and gravel screening supply',
        url: `${contact.siteUrl}/for/civil-contractors`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Topsoil and landscaping screening supply',
        url: `${contact.siteUrl}/for/topsoil-landscaping`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Aggregate and road metal screening supply',
        url: `${contact.siteUrl}/for/aggregate-and-road-metal`,
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Equipment viewing and nationwide screener supply',
        url: `${contact.siteUrl}/for/view-in-your-area`,
      },
    },
  ],
}

/** Home page entity graph: WebSite + LocalBusiness for crawlers and AI engines. */
export const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [websiteJsonLd, organizationJsonLd],
}

function providerRef() {
  return { '@id': localBusinessId }
}

function productJsonLd(route) {
  const p = route.product
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: route.description,
    image: p.image,
    sku: p.sku,
    brand: {
      '@type': 'Brand',
      name: 'DeSite',
    },
    url: route.canonical,
    offers: {
      '@type': 'Offer',
      url: route.canonical,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      seller: providerRef(),
      areaServed: {
        '@type': 'Country',
        name: 'Australia',
      },
      description: 'Contact Pro Screen Australia for current pricing and freight.',
    },
  }
}

function serviceJsonLd(route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: route.service.name,
    serviceType: route.service.serviceType,
    description: route.description,
    url: route.canonical,
    provider: providerRef(),
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
  }
}

function meshGuideJsonLd(route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: contact.siteUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'DeSite screen mesh size selection',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Screen mesh recommendation charts',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Square and elongated base charts' },
        { '@type': 'ListItem', position: 2, name: 'Topsoil and triple mix' },
        { '@type': 'ListItem', position: 3, name: 'Farm filling and cow races' },
        { '@type': 'ListItem', position: 4, name: 'Aggregates and road metal' },
      ],
    },
    provider: providerRef(),
  }
}

function webPageJsonLd(route) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: contact.siteUrl,
    },
    about: providerRef(),
  }
}

/**
 * Return JSON-LD for a pathname (object or null). Used by Helmet and prerender.
 */
export function getJsonLd(pathname) {
  const route = getSeo(pathname)
  if (route.robots && String(route.robots).includes('noindex')) return null

  switch (route.schemaType) {
    case 'home':
      return homeJsonLd
    case 'product':
      return productJsonLd(route)
    case 'service':
      return serviceJsonLd(route)
    case 'meshGuide':
      return meshGuideJsonLd(route)
    case 'about':
    case 'contact':
    case 'webPage':
      return webPageJsonLd(route)
    default:
      return null
  }
}

export { defaultOgImage, siteName, localBusinessId }
