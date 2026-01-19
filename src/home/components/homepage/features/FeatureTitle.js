import React from 'react'
import Grid from '@mui/material/Grid2'
import { Box, Typography } from '@mui/material'

const FeatureTitle = () => {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid size={{ xs: 12, lg: 7 }} textAlign="center">
        {/* EYEBROW TEXT */}
        <Typography
          variant="overline"
          sx={{
            letterSpacing: 2,
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Nega IQmath?
        </Typography>

        {/* MAIN TITLE */}
        <Typography
          variant="h3"
          fontWeight={800}
          mt={1}
          mb={2}
          sx={{
            fontSize: { xs: '28px', md: '36px' },
            lineHeight: 1.2
          }}
        >
          Matematikani tushunib o‘rganing,
          <br /> natijani his qiling
        </Typography>

        {/* DESCRIPTION */}
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '16px' }}>
          <Box component="span" fontWeight={600} color="text.primary">
            IQmath
          </Box>{' '}
          — matematikani yodlash emas, balki{' '}
          <Box component="span" fontWeight={600}>
            tushunish
          </Box>{' '}
          orqali o‘rgatuvchi zamonaviy platforma.
          <br />
          Video darslar, interaktiv mashqlar va testlar yordamida{' '}
          <Box component="span" fontWeight={600}>
            real natijaga
          </Box>{' '}
          erishing.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FeatureTitle
