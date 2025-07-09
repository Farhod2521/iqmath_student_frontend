import React from 'react'
import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/shared/scroll-to-top'
import BannerHeader from './components/homepage/banner/BannerHeader'

function Landing() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        body {
          overflow: hidden !important;
        }
      `}</style>
      {/* <HeaderAlert /> */}
      <BannerHeader/>
      {/* <Features />
      <DefendFocus />
      <Leadership />
      <PowerfulDozens />
      <Reviews />
      <ExceptionalFeature />
      <Pricing />
      <FAQ />
      <C2a /> */}
      {/* <Footer /> */}
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Landing
