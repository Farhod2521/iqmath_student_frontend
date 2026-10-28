import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import NewsSingle from '@/home/components/news/banner-single/NewsSingle'
import Footer from '@/components/footer'
import ScrollToTop from '@/home/components/shared/scroll-to-top'

const NewsDetails = () => {
  const theme = ThemeSettings()

  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <style jsx global>{`
          body {
            overflow: auto !important;
          }
        `}</style>
        <NewsSingle />
        <ScrollToTop />
        <Footer />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default NewsDetails
