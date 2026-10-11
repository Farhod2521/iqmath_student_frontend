import { ThemeSettings } from './theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import ScrollToTop from './components/shared/scroll-to-top'
import Footer from '@/components/footer'
import C2a from './components/shared/c2a'
import FAQ from './components/homepage/faq'
import Pricing from './components/homepage/pricing'
import Reviews from './components/homepage/reviews'
import PowerfulDozens from './components/homepage/powerful-dozens'
import Leadership from './components/homepage/leadership'
import Benefits from './components/homepage/benefits'
import HomePage from './components/homepage/defend-focus/NewsDetail'

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
      <C2a />
      <Benefits />
      {/* <NewsPage /> */}
      <HomePage /> {/*news */}
      {/* <ExceptionalFeature /> */}
      <Reviews />
      <Leadership />
      <Pricing />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default Landing
