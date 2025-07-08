import React, { useEffect } from 'react'
import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/shared/scroll-to-top'
import BannerHeader from './components/homepage/banner/BannerHeader'

function Landing() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
