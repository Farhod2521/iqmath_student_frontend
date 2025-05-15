import BannerFaq from '@/home/components/faqs/banner'
import FAQ from '@/home/components/homepage/faq'
import HeaderAlert from '@/home/components/shared/header/HeaderAlert'
import HpHeader from '@/home/components/shared/header/HpHeader'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

function Faqs() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <HeaderAlert /> */}
      <HpHeader />
      <BannerFaq />
      <FAQ />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Faqs
