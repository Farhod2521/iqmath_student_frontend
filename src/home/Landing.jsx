import React from 'react'
import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/shared/scroll-to-top'
import BannerHeader from './components/homepage/banner/BannerHeader'
import Features from './components/homepage/features/Features'
import Footer from '@/components/footer'
import C2a from './components/shared/c2a'
import FAQ from './components/homepage/faq'
import Pricing from './components/shared/pricing'
import ExceptionalFeature from './components/homepage/exceptional-feature'
import Reviews from './components/shared/reviews'
import PowerfulDozens from './components/homepage/powerful-dozens'
import Leadership from './components/shared/leadership'
import DefendFocus from './components/homepage/defend-focus'
import CTA from './components/shared/cta'

function Landing() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        body {
          overflow: auto !important;
        }
      `}</style>
      {/* <HeaderAlert /> */}

      {/* <BannerHeader /> */}
      <PowerfulDozens />
      <C2a />
      {/* <Features /> */}
      {/* <ExceptionalFeature /> */}
      <DefendFocus />
      <Reviews />
      {/* <Leadership /> */}
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Landing
