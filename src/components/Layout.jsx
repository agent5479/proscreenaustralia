import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'
import SEO from './SEO'

export default function Layout() {
  const location = useLocation()
  const showTagline = location.pathname === '/'

  return (
    <>
      <SEO pathname={location.pathname} />
      <Nav showTagline={showTagline} />
      <Outlet />
      <Footer />
    </>
  )
}
