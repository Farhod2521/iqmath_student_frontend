import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import LayoutHome from '@/home/Layout'
import { ThemeSettings } from '@/home/theme/Theme'
import ParentsLanding from '@/home/components/parents/ParentsLanding'
import Footer from '@/components/footer'
import ScrollToTop from '@/home/components/shared/scroll-to-top'

const SEO = {
  uz: {
    title: 'Ota-onalar uchun — IQMath',
    description:
      "Farzandingiz matematikani video darslar va mashqlar orqali o'rganadi, siz esa ota-ona kabinetida uning natijalarini kuzatib borasiz."
  },
  ru: {
    title: 'Родителям — IQMath',
    description:
      'Ребёнок изучает математику по видеоурокам и упражнениям, а вы следите за его результатами в кабинете родителя.'
  }
}

export default function ParentsPage() {
  const theme = ThemeSettings()
  const { i18n } = useTranslation()
  const seo = SEO[i18n.language === 'ru' ? 'ru' : 'uz']

  return (
    <LayoutHome>
      <Head>
        <title key="title">{seo.title}</title>
        <meta key="description" name="description" content={seo.description} />
        <meta key="og:title" property="og:title" content={seo.title} />
        <meta key="og:description" property="og:description" content={seo.description} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ParentsLanding />
        <Footer />
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}
