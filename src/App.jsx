import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import { contact } from './data/contact'
import {
  AboutPage,
  AdditionalProductsPage,
  CommercialsHubPage,
  ContactPage,
  GrizzlyCommercialPage,
  ForCivilPage,
  ForFarmersPage,
  ForTopsoilLandscapingPage,
  ForAggregateRoadMetalPage,
  ForNelsonNationwidePage,
  HomePage,
  ImageCatalogPage,
  PhotosPage,
  ProspectsPage,
  ScreeningRecommendationPage,
  Slg108Page,
  Slg68Page,
  Slg78FlowPage,
  Slg78Page,
  StaticGrizzlyPage,
  TelehandlerBinsPage,
  MiniScreenersPage,
  DumpTrailersPage,
  SkidSteerAttachmentsPage,
  GrizzlyBarPage,
  VibratoryCommercialPage,
  VideosPage,
} from './pages'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter basename={contact.basePath || undefined}>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/image-catalog" element={<ImageCatalogPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/screening-recommendation" element={<ScreeningRecommendationPage />} />
          <Route path="/for/farmers" element={<ForFarmersPage />} />
          <Route path="/for/civil-contractors" element={<ForCivilPage />} />
          <Route path="/for/topsoil-landscaping" element={<ForTopsoilLandscapingPage />} />
          <Route path="/for/aggregate-and-road-metal" element={<ForAggregateRoadMetalPage />} />
          <Route path="/for/view-in-your-area" element={<ForNelsonNationwidePage />} />
          <Route path="/for/nelson-nationwide" element={<Navigate to="/for/view-in-your-area" replace />} />
          <Route path="/products/slg-108vfrb" element={<Slg108Page />} />
          <Route path="/products/slg-78vf" element={<Slg78Page />} />
          <Route path="/products/slg-78vf-flow" element={<Slg78FlowPage />} />
          <Route path="/products/slg-68v" element={<Slg68Page />} />
          <Route path="/products/static-grizzly" element={<StaticGrizzlyPage />} />
          <Route path="/products/telehandler-bins" element={<TelehandlerBinsPage />} />
          <Route path="/products/mini-screeners" element={<MiniScreenersPage />} />
          <Route path="/products/dump-trailers" element={<DumpTrailersPage />} />
          <Route path="/products/skid-steer-attachments" element={<SkidSteerAttachmentsPage />} />
          <Route path="/products/grizzly-bar" element={<GrizzlyBarPage />} />
          <Route path="/products/additional-products" element={<Navigate to="/" replace />} />
          <Route path="/idm/commercials" element={<CommercialsHubPage />} />
          <Route path="/idm/commercials/grizzly" element={<GrizzlyCommercialPage />} />
          <Route path="/idm/commercials/vibratory" element={<VibratoryCommercialPage />} />
          <Route path="/idm/prospects" element={<ProspectsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
