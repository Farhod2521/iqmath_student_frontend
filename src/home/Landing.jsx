import React from 'react'
import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import HpHeader from './components/shared/header/HpHeader'
import Banner from './components/homepage/banner/Banner'
import Features from './components/homepage/features/Features'
import DefendFocus from './components/homepage/defend-focus'
import Leadership from './components/shared/leadership'
import PowerfulDozens from './components/homepage/powerful-dozens'
import Reviews from './components/shared/reviews'
import ExceptionalFeature from './components/homepage/exceptional-feature'
import Pricing from './components/shared/pricing'
import FAQ from './components/homepage/faq'
import C2a from './components/shared/c2a'
import Footer from './components/shared/footer'
import ScrollToTop from './components/shared/scroll-to-top'
import BannerLogin from './components/homepage/banner/BannerLogin'

function Landing() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HpHeader />
      <BannerLogin />
      {/* <Banner /> */}
      <Features />
      <DefendFocus />
      <Leadership />
      <PowerfulDozens />
      <Reviews />
      <ExceptionalFeature />
      <Pricing />
      <FAQ />
      <C2a />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Landing
