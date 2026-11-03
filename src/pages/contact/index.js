import React from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'

import Footer from '@/components/footer'
import LayoutHome from '@/home/Layout'
import ContactPage from '@/home/components/contact/ContactPage'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'

function Contact() {
  const theme = ThemeSettings()
  const { i18n } = useTranslation()
  const ru = i18n.language === 'ru'

  return (
    <LayoutHome>
      <Head>
        <title key="title">{ru ? 'Контакты | IQMath' : 'Bog‘lanish | IQMath'}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContactPage />
        <ScrollToTop />
        <Footer />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Contact
