import React from 'react'
import LayoutHome from '@/home/Layout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ThemeSettings } from '@/home/theme/Theme'
import ScrollToTop from '@/home/components/shared/scroll-to-top'
import MentalGames from '@/home/components/mental-games/MentalGames'

export default function MentalGamesPage() {
  const theme = ThemeSettings()

  return (
    <>
      <LayoutHome>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MentalGames />
          <ScrollToTop />
        </ThemeProvider>
      </LayoutHome>
    </>
  )
}
