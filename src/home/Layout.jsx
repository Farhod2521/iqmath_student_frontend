import React from 'react'
import HpHeader from '@/home/components/shared/header/HpHeader'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ThemeSettings } from '@/home/theme/Theme'

function LayoutHome({ children }) {
  const theme = ThemeSettings()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HpHeader />
      {children}
    </ThemeProvider>
  )
}

export default LayoutHome
