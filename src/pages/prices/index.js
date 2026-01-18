import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Box, Breadcrumbs, CssBaseline, ThemeProvider, Typography } from '@mui/material'

import LayoutHome from '@/home/Layout'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import { ThemeSettings } from '@/home/theme/Theme'

// ICONS

import PricingContent from './components/PricingContent'

function Prices() {
  const theme = ThemeSettings()
  const { t, i18n } = useTranslation()

  return (
    <LayoutHome>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* HEADER */}
        <Box py={7} bgcolor="#5d87ff">
          <Typography variant="h5" align="center" color="white" fontWeight={600}>
            {t('prices')}
          </Typography>

          <Box mt={2} display="flex" justifyContent="center">
            <Breadcrumbs sx={{ color: 'white' }}>
              <Link href="/" className="text-white/80 hover:underline">
                {t('homePage')}
              </Link>
              <Typography color="white">{t('prices')}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>

        {/* CONTENT */}
        <PricingContent />
        {/*  */}
        <ScrollToTop />
      </ThemeProvider>
    </LayoutHome>
  )
}

export default Prices
