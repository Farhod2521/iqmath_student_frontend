import Banner from '@/home/components/about/banner'
import KeyMetric from '@/home/components/about/key-metric'
import Process from '@/home/components/about/process'
import HeaderAlert from '@/home/components/shared/header/HeaderAlert'
import HpHeader from '@/home/components/shared/header/HpHeader'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

function AboutUs() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <HeaderAlert /> */}
      <HpHeader />
      <Banner />

      <KeyMetric />

      <ScrollToTop />
    </ThemeProvider>
  )
}

export default AboutUs
