import Banner from '@/home/components/about/banner'
import KeyMetric from '@/home/components/about/key-metric'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

function AboutUs() {
  const theme = ThemeSettings()
  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Banner />
        <KeyMetric />
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default AboutUs
