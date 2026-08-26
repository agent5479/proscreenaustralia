import HtmlContent from '../components/HtmlContent'
import ContactForm from '../components/ContactForm'
import { homeHtml } from '../content/home'
import { contactHtml } from '../content/contact'
import { photosHtml } from '../content/photos'
import { videosHtml } from '../content/videos'
import { slg108Html } from '../content/slg-108vfrb'
import { slg78Html } from '../content/slg-78vf'
import { slg78FlowHtml } from '../content/slg-78vf-flow'
import { slg68Html } from '../content/slg-68v'
import { staticGrizzlyHtml } from '../content/static-grizzly'
import { telehandlerBinsHtml } from '../content/telehandler-bins'
import { miniScreenersHtml } from '../content/mini-screeners'
import { dumpTrailersHtml } from '../content/dump-trailers'
import { skidSteerAttachmentsHtml } from '../content/skid-steer-attachments'
import { grizzlyBarHtml } from '../content/grizzly-bar'
import { additionalProductsHtml } from '../content/additional-products'
import { forFarmersHtml } from '../content/for-farmers'
import { forCivilHtml } from '../content/for-civil'
import { forTopsoilLandscapingHtml } from '../content/for-topsoil-landscaping'
import { forAggregateRoadMetalHtml } from '../content/for-aggregate-and-road-metal'
import { forNelsonNationwideHtml } from '../content/for-nelson-nationwide'
import ScreeningRecommendationPage from './ScreeningRecommendationPage'
import ImageCatalogPage from './ImageCatalogPage'
import ProspectsPage from './office/ProspectsPage'
import CommercialsHubPage from './commercials/CommercialsHubPage'
import GrizzlyCommercialPage from './commercials/GrizzlyCommercialPage'
import VibratoryCommercialPage from './commercials/VibratoryCommercialPage'
import AboutPage from './AboutPage'

function Page({ html }) {
  return <HtmlContent html={html} />
}

export { AboutPage }
export const HomePage = () => <Page html={homeHtml} />

export const ContactPage = () => (
  <>
    <HtmlContent html={contactHtml} />
    <section className="page-content contact-form-section">
      <ContactForm />
    </section>
  </>
)
export const PhotosPage = () => <Page html={photosHtml} />
export const VideosPage = () => <Page html={videosHtml} />
export const Slg108Page = () => <Page html={slg108Html} />
export const Slg78Page = () => <Page html={slg78Html} />
export const Slg78FlowPage = () => <Page html={slg78FlowHtml} />
export const Slg68Page = () => <Page html={slg68Html} />
export const StaticGrizzlyPage = () => <Page html={staticGrizzlyHtml} />
export const TelehandlerBinsPage = () => <Page html={telehandlerBinsHtml} />
export const MiniScreenersPage = () => <Page html={miniScreenersHtml} />
export const DumpTrailersPage = () => <Page html={dumpTrailersHtml} />
export const SkidSteerAttachmentsPage = () => <Page html={skidSteerAttachmentsHtml} />
export const GrizzlyBarPage = () => <Page html={grizzlyBarHtml} />
export const AdditionalProductsPage = () => <Page html={additionalProductsHtml} />
export const ForFarmersPage = () => <Page html={forFarmersHtml} />
export const ForCivilPage = () => <Page html={forCivilHtml} />
export const ForTopsoilLandscapingPage = () => <Page html={forTopsoilLandscapingHtml} />
export const ForAggregateRoadMetalPage = () => <Page html={forAggregateRoadMetalHtml} />
export const ForNelsonNationwidePage = () => <Page html={forNelsonNationwideHtml} />
export {
  ScreeningRecommendationPage,
  ImageCatalogPage,
  CommercialsHubPage,
  GrizzlyCommercialPage,
  VibratoryCommercialPage,
  ProspectsPage,
}
