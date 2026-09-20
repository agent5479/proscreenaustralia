import { contact } from './contact.js'
import { homeFaqJsonLd } from './searchFaq.js'

export const siteName = 'Pro Screen Australia'
export const defaultOgImage = `${contact.siteUrl}/og-desite.png`

export const localBusinessId = `${contact.siteUrl}/#organization`
export const desiteOrgId = `${contact.siteUrl}/#desite`
export const websiteId = `${contact.siteUrl}/#website`
export const siblingNzId = `${contact.siteUrl}/#sitemachinery-nz`

const australia = { '@type': 'Country', name: 'Australia' }
const newZealand = { '@type': 'Country', name: 'New Zealand' }

export function productNodeId(canonical) {
  return `${canonical}#product`
}

function providerRef() {
  return { '@id': localBusinessId }
}

function desiteRef() {
  return { '@id': desiteOrgId }
}

function websiteRef() {
  return { '@id': websiteId }
}

function prop(name, value) {
  return {
    '@type': 'PropertyValue',
    name,
    value,
  }
}

/** Manufacturer node — info only; AU orders go through Pro Screen Australia. */
export const desiteOrganizationJsonLd = {
  '@type': 'Organization',
  '@id': desiteOrgId,
  name: 'DeSite',
  alternateName: ['DeSite Products', 'DeSite ProScreen'],
  url: 'https://desiteproducts.au/',
  description:
    'Manufacturer of DeSite vibratory Proscreens and Static Grizzlies. Australian customers order through Pro Screen Australia.',
}

/** NZ sister supplier — related entity, no shared Product @ids. */
export const siblingNzJsonLd = {
  '@type': 'Organization',
  '@id': siblingNzId,
  name: 'Site Machinery NZ',
  url: 'https://sitemachinery.nz/',
  description: 'New Zealand supplier of DeSite screening equipment.',
  areaServed: newZealand,
  brand: desiteRef(),
}

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: contact.siteUrl,
  name: siteName,
  description:
    'Australian supplier of DeSite soil, gravel and aggregate screeners — portable soil screeners and screening equipment for Australia.',
  publisher: providerRef(),
  inLanguage: 'en-AU',
}

export const organizationJsonLd = {
  '@type': 'LocalBusiness',
  '@id': localBusinessId,
  name: 'Pro Screen Australia',
  alternateName: ['Proscreen Australia', 'ProScreen'],
  url: contact.siteUrl,
  telephone: contact.phoneTel,
  image: defaultOgImage,
  logo: `${contact.siteUrl}/site-logo.png`,
  sameAs: [contact.instagramUrl],
  description:
    'Australian supplier of DeSite soil, gravel and aggregate screeners. Sydney-based, Australia-wide supply.',
  brand: desiteRef(),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  areaServed: australia,
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
    'soil screener Australia',
    'portable soil screener',
    'topsoil screener Australia',
    'gravel screener Australia',
    'aggregate screener Australia',
    'DeSite ProScreen',
    'static grizzly',
  ],
}

/** Core screener catalogue for home ItemList (not dump trailers / XD70). */
export const screenerCatalogue = [
  {
    path: '/products/mini-screeners',
    name: 'DeSite Mini Screeners SLG-56 & SLG-48',
    category: 'Mini soil screener',
  },
  {
    path: '/products/slg-68v',
    name: 'DeSite SLG-68V',
    category: 'Small portable soil screener',
  },
  {
    path: '/products/slg-78vf',
    name: 'DeSite SLG-78VF',
    category: 'Portable soil screener',
  },
  {
    path: '/products/slg-78vf-flow',
    name: 'DeSite SLG-78VF with Flow Control',
    category: 'Flow control soil screener',
  },
  {
    path: '/products/slg-108vfrb',
    name: 'DeSite SLG-108VFRB',
    category: 'Heavy duty soil screener',
  },
  {
    path: '/products/static-grizzly',
    name: 'DeSite Static Grizzly SLG-78 & SLG-108',
    category: 'Static grizzly / rock screener',
  },
]

function relatedProductRefs(paths) {
  return paths.map((path) => ({
    '@id': productNodeId(`${contact.siteUrl}${path}`),
  }))
}

/**
 * Build a Product node with stable @id for reuse across pages.
 * `route.product` may include category, carriers, materials, relatedPaths, products (mini).
 */
export function buildProductNode(route, { asMainEntity = true } = {}) {
  const p = route.product
  if (!p) return null

  const id = productNodeId(route.canonical)
  const node = {
    '@type': 'Product',
    '@id': id,
    name: p.schemaName || p.name,
    description: route.description,
    image: p.image,
    sku: p.sku,
    url: route.canonical,
    category: p.category || route.primaryKeyword,
    brand: { '@type': 'Brand', name: 'DeSite' },
    manufacturer: desiteRef(),
    offers: {
      '@type': 'Offer',
      url: route.canonical,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      seller: providerRef(),
      areaServed: australia,
      description: 'Contact Pro Screen Australia for current pricing and freight.',
    },
  }

  const props = []
  if (p.carriers?.length) {
    props.push(prop('Compatible carriers', p.carriers.join(', ')))
  }
  if (p.materials?.length) {
    props.push(prop('Materials screened', p.materials.join(', ')))
  }
  if (props.length) node.additionalProperty = props

  if (p.relatedPaths?.length) {
    node.isRelatedTo = relatedProductRefs(p.relatedPaths)
  }

  if (asMainEntity) {
    node.isPartOf = websiteRef()
  }

  return node
}

/** Mini page: two Product nodes (SLG-48 + SLG-56) plus page-level Product. */
export function buildMiniProductNodes(route) {
  const baseImage = route.product?.image
  const shared = {
    brand: { '@type': 'Brand', name: 'DeSite' },
    manufacturer: desiteRef(),
    category: 'Mini soil screener',
    offers: {
      '@type': 'Offer',
      url: route.canonical,
      priceCurrency: 'AUD',
      availability: 'https://schema.org/InStock',
      seller: providerRef(),
      areaServed: australia,
      description: 'Contact Pro Screen Australia for current pricing and freight.',
    },
  }

  const slg56 = {
    '@type': 'Product',
    '@id': `${route.canonical}#slg-56`,
    name: 'DeSite SLG-56 Mini Screener',
    sku: 'SLG-56',
    url: route.canonical,
    image: baseImage,
    description:
      'Compact soil screener for mini excavators and stand-on skidsteers. Stocked in Australia by Pro Screen Australia.',
    ...shared,
    additionalProperty: [
      prop('Compatible carriers', 'Mini excavator, stand-on skid steer, subcompact tractor'),
      prop('Materials screened', 'Topsoil, dirt, gravel, aggregate'),
    ],
    isRelatedTo: [
      { '@id': `${route.canonical}#slg-48` },
      ...relatedProductRefs(['/products/slg-68v', '/products/slg-78vf']),
    ],
  }

  const slg48 = {
    '@type': 'Product',
    '@id': `${route.canonical}#slg-48`,
    name: 'DeSite SLG-48 Mini Screener',
    sku: 'SLG-48',
    url: route.canonical,
    image: `${contact.siteUrl}/images/catalog/slg-48.webp`,
    description:
      'Mini soil screener for limited-lift stand-on skidsteers and mini excavators. Stocked in Australia by Pro Screen Australia.',
    ...shared,
    additionalProperty: [
      prop('Compatible carriers', 'Stand-on skid steer, mini excavator'),
      prop('Materials screened', 'Topsoil, dirt, gravel, aggregate'),
    ],
    isRelatedTo: [
      { '@id': `${route.canonical}#slg-56` },
      ...relatedProductRefs(['/products/slg-68v', '/products/slg-78vf']),
    ],
  }

  const pageProduct = buildProductNode(route)
  return [pageProduct, slg56, slg48].filter(Boolean)
}

export function breadcrumbJsonLd(route) {
  const items = [{ name: 'Home', item: `${contact.siteUrl}/` }]

  if (route.path.startsWith('/products/')) {
    items.push({ name: 'Products', item: `${contact.siteUrl}/#equipment` })
  } else if (route.path.startsWith('/for/')) {
    items.push({ name: 'Applications', item: `${contact.siteUrl}/for/view-in-your-area` })
  }

  if (route.path !== '/') {
    const crumbName = route.primaryKeyword || route.title.split('|')[0].trim()
    items.push({ name: crumbName, item: route.canonical })
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${route.canonical}#breadcrumb`,
    itemListElement: items.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  }
}

function baseGraph(route) {
  return [websiteJsonLd, organizationJsonLd, desiteOrganizationJsonLd, breadcrumbJsonLd(route)]
}

export function homeJsonLdGraph() {
  const itemList = {
    '@type': 'ItemList',
    '@id': `${contact.siteUrl}/#screener-range`,
    name: 'DeSite soil screener range — Australia',
    description:
      'Portable and heavy-duty DeSite soil, gravel and aggregate screeners supplied by Pro Screen Australia.',
    numberOfItems: screenerCatalogue.length,
    itemListElement: screenerCatalogue.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: `${contact.siteUrl}${item.path}`,
      item: {
        '@type': 'Product',
        '@id': productNodeId(`${contact.siteUrl}${item.path}`),
        name: item.name,
        category: item.category,
        url: `${contact.siteUrl}${item.path}`,
      },
    })),
  }

  const collection = {
    '@type': 'CollectionPage',
    '@id': `${contact.siteUrl}/#collection`,
    name: 'Soil Screener Australia',
    description:
      'Pro Screen Australia — DeSite soil, gravel and aggregate screeners. Australian supplier, Australia-wide supply.',
    url: contact.siteUrl,
    isPartOf: websiteRef(),
    about: providerRef(),
    mainEntity: { '@id': `${contact.siteUrl}/#screener-range` },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteJsonLd,
      organizationJsonLd,
      desiteOrganizationJsonLd,
      siblingNzJsonLd,
      collection,
      itemList,
      homeFaqJsonLd(),
      breadcrumbJsonLd({
        path: '/',
        canonical: `${contact.siteUrl}/`,
        primaryKeyword: 'Soil Screener Australia',
        title: 'Soil Screener Australia | Pro Screen Australia',
      }),
    ],
  }
}

export function productJsonLdGraph(route) {
  const nodes =
    route.path === '/products/mini-screeners'
      ? buildMiniProductNodes(route)
      : [buildProductNode(route)].filter(Boolean)

  const webPage = {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: websiteRef(),
    about: nodes[0] ? { '@id': nodes[0]['@id'] } : providerRef(),
    mainEntity: nodes[0] ? { '@id': nodes[0]['@id'] } : undefined,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [...baseGraph(route), webPage, ...nodes],
  }
}

export function serviceJsonLdGraph(route) {
  const s = route.service
  const serviceNode = {
    '@type': 'Service',
    '@id': `${route.canonical}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: route.description,
    url: route.canonical,
    provider: providerRef(),
    areaServed: australia,
    isPartOf: websiteRef(),
  }

  if (s.audience) {
    serviceNode.audience = {
      '@type': 'Audience',
      audienceType: s.audience,
    }
  }

  if (s.relatedPaths?.length) {
    serviceNode.isRelatedTo = relatedProductRefs(s.relatedPaths)
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: websiteRef(),
    mainEntity: { '@id': `${route.canonical}#service` },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [...baseGraph(route), webPage, serviceNode],
  }
}

export function meshGuideJsonLdGraph(route) {
  const questions = [
    { name: 'What mesh size for topsoil?', about: 'Topsoil and triple mix' },
    { name: 'What mesh size for gravel?', about: 'Aggregates and road metal' },
    { name: 'What mesh size for compost?', about: 'Compost' },
    { name: 'What mesh size for drainage rock?', about: 'Aggregates and road metal' },
    { name: 'What mesh for crushed concrete?', about: 'Aggregates and road metal' },
    { name: 'What mesh size for farm river gravel?', about: 'Farm filling and cow races' },
  ]

  const significantLinks = [
    `${contact.siteUrl}/products/slg-68v`,
    `${contact.siteUrl}/products/slg-78vf`,
    `${contact.siteUrl}/products/slg-108vfrb`,
    `${contact.siteUrl}/products/static-grizzly`,
  ]

  const webPage = {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: websiteRef(),
    about: {
      '@type': 'Thing',
      name: 'DeSite screen mesh size selection',
    },
    provider: providerRef(),
    significantLink: significantLinks,
    mainEntity: {
      '@type': 'ItemList',
      name: 'Screener mesh size questions',
      itemListElement: questions.map((q, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: q.name,
        item: {
          '@type': 'Question',
          name: q.name,
          about: q.about,
        },
      })),
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...baseGraph(route),
      webPage,
      ...significantLinks.map((url) => ({
        '@type': 'Product',
        '@id': productNodeId(url),
        url,
      })),
    ],
  }
}

export function webPageJsonLdGraph(route) {
  const webPage = {
    '@type': 'WebPage',
    '@id': `${route.canonical}#webpage`,
    name: route.title,
    description: route.description,
    url: route.canonical,
    isPartOf: websiteRef(),
    about: providerRef(),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [...baseGraph(route), webPage],
  }
}
