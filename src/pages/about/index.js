import Banner from '@/home/components/about/banner'
import KeyMetric from '@/home/components/about/key-metric'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { config } from '@/config'

function AboutUs({ initialStats = null }) {
  const theme = ThemeSettings()
  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Banner />
        <KeyMetric initialStats={initialStats} />
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}
// Raqamlar (ro'yxatdan o'tganlar, video darslar) serverda olinadi va HTML'ga yoziladi; har 10 daqiqada yangilanadi
export async function getStaticProps() {
  let initialStats = null
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(`${config.API_URL}/api/v1/func_student/landing-stats/`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal
    })
    clearTimeout(timer)
    if (response.ok) {
      const data = await response.json()
      if (data && typeof data === 'object' && !Array.isArray(data)) initialStats = data
    }
  } catch {
    initialStats = null
  }
  return { props: { initialStats }, revalidate: 600 }
}

export default AboutUs
