import { useRouter } from 'next/router'
import React from 'react'
import { Box, Container, CssBaseline, ThemeProvider, Typography } from '@mui/material'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import NewsSingle from '@/home/components/news/banner-single/NewsSingle'
import BannerSingle from '@/home/components/news/banner-single/BannerSingle'
import Footer from '@/components/footer'
import ScrollToTop from '@/home/components/shared/scroll-to-top'

const NewsDetails = () => {
  const theme = ThemeSettings()

  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BannerSingle />
        <NewsSingle />
        <ScrollToTop />
        <Footer />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default NewsDetails
