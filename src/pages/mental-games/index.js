import React from 'react'
import LayoutHome from '@/home/Layout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeSettings } from '@/home/theme/Theme'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import MentalGames from '@/home/components/mental-games/MentalGames'
import BannerGames from '@/home/components/mental-games/banner/BannerGames'

export default function MentalGamesPage() {
  const theme = ThemeSettings()

  return (
    <>
      <LayoutHome>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BannerGames />
          <MentalGames />
          <ScrollToTop />
        </ThemeProvider>
      </LayoutHome>
    </>
  )
}
