import Footer from '@/components/footer'
import NewsAll from '@/home/components/news'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'

function News() {
  const theme = ThemeSettings()
  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NewsAll />
        <ScrollToTop />
        <Footer />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default News
