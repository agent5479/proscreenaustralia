import { aboutHtml } from '../content/about.js'
import { additionalProductsHtml } from '../content/additional-products.js'
import { contactHtml } from '../content/contact.js'
import { forAggregateRoadMetalHtml } from '../content/for-aggregate-and-road-metal.js'
import { forCivilHtml } from '../content/for-civil.js'
import { forFarmersHtml } from '../content/for-farmers.js'
import { forNelsonNationwideHtml } from '../content/for-nelson-nationwide.js'
import { forTopsoilLandscapingHtml } from '../content/for-topsoil-landscaping.js'
import { homeHtml } from '../content/home.js'
import { photosHtml } from '../content/photos.js'
import { slg108Html } from '../content/slg-108vfrb.js'
import { slg68Html } from '../content/slg-68v.js'
import { slg78Html } from '../content/slg-78vf.js'
import { slg78FlowHtml } from '../content/slg-78vf-flow.js'
import { staticGrizzlyHtml } from '../content/static-grizzly.js'
import { telehandlerBinsHtml } from '../content/telehandler-bins.js'
import { miniScreenersHtml } from '../content/mini-screeners.js'
import { dumpTrailersHtml } from '../content/dump-trailers.js'
import { skidSteerAttachmentsHtml } from '../content/skid-steer-attachments.js'
import { grizzlyBarHtml } from '../content/grizzly-bar.js'
import { videosHtml } from '../content/videos.js'
import { buildMeshGuideHtml } from './meshGuideHtml.js'
import { buildImageCatalogHtml } from './imageCatalogHtml.js'
import { buildStaticChrome } from './staticChrome.js'

const pageBodies = {
  '/': homeHtml,
  '/about': aboutHtml,
  '/contact': contactHtml,
  '/photos': photosHtml,
  '/videos': videosHtml,
  '/products/slg-108vfrb': slg108Html,
  '/products/slg-78vf': slg78Html,
  '/products/slg-78vf-flow': slg78FlowHtml,
  '/products/slg-68v': slg68Html,
  '/products/static-grizzly': staticGrizzlyHtml,
  '/products/telehandler-bins': telehandlerBinsHtml,
  '/products/mini-screeners': miniScreenersHtml,
  '/products/dump-trailers': dumpTrailersHtml,
  '/products/skid-steer-attachments': skidSteerAttachmentsHtml,
  '/products/grizzly-bar': grizzlyBarHtml,
  '/products/additional-products': additionalProductsHtml,
  '/for/farmers': forFarmersHtml,
  '/for/civil-contractors': forCivilHtml,
  '/for/topsoil-landscaping': forTopsoilLandscapingHtml,
  '/for/aggregate-and-road-metal': forAggregateRoadMetalHtml,
  '/for/view-in-your-area': forNelsonNationwideHtml,
}

/**
 * Full static HTML (nav + body + footer) for crawler-friendly prerender.
 * Returns null for routes that should skip body injection (e.g. /idm/*).
 */
export function getStaticPageHtml(pathname) {
  if (pathname.startsWith('/idm')) return null

  let body
  if (pathname === '/screening-recommendation') {
    body = buildMeshGuideHtml()
  } else if (pathname === '/image-catalog') {
    body = buildImageCatalogHtml()
  } else {
    body = pageBodies[pathname]
  }

  if (!body) return null

  return buildStaticChrome(body)
}
