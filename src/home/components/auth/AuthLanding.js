import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import Footer from '@/components/footer'
import BannerHeader from '../homepage/banner/BannerHeader'
import { ThemeSettings } from '@/home/theme/Theme'

function AuthLanding() {
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

      <BannerHeader />
      {/* <Footer /> */}
      {/* <ScrollToTop /> */}
    </ThemeProvider>
  )
}

export default AuthLanding
