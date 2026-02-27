import React from 'react'
import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/shared/scroll-to-top'
import BannerHeader from './components/homepage/banner/BannerHeader'
import Features from './components/homepage/features/Features'
import Footer from '@/components/footer'
import C2a from './components/shared/c2a'
import FAQ from './components/homepage/faq'
import Pricing from './components/homepage/pricing'
import Reviews from './components/homepage/reviews'
import PowerfulDozens from './components/homepage/powerful-dozens'
import Leadership from './components/homepage/leadership'
import CTA from './components/shared/cta'
import Benefits from './components/homepage/benefits'
import Courses from './components/homepage/courses'
import NewsPage from './components/homepage/defend-focus'
import HomePage from './components/homepage/defend-focus/NewsDetail'
import GamesSlider from './components/homepage/games'

function Landing() {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style jsx global>{`
        body {
          overflow: auto !important;
        }
      `}</style>
      {/* <HeaderAlert /> */}
      {/* <BannerHeader /> */}
      <PowerfulDozens />
      {/* <GamesSlider /> */}
      <C2a />
      <Courses />
      <Benefits />
      {/* <NewsPage /> */}
      <HomePage />
      <Features />
      {/* <ExceptionalFeature /> */}
      <Reviews />
      <Leadership />

      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Landing
