import BannerFaq from '@/home/components/faqs/banner'
import FAQ from '@/home/components/homepage/faq'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

function Faqs() {
  const theme = ThemeSettings()
  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BannerFaq />
        <FAQ />
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Faqs
