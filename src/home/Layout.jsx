import React, { useState } from 'react'
import HpHeader from '@/home/components/shared/header/HpHeader'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ThemeSettings } from '@/home/theme/Theme'

function LayoutHome({ children }) {
  const theme = ThemeSettings()
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          filter: isLoading ? 'blur(10px)' : 'none',
          transition: 'filter 0.5s'
        }}
      >
        <HpHeader isLoading={isLoading} />
        {children}
      </div>
    </ThemeProvider>
  )
}

export default LayoutHome
