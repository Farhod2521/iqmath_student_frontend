import React from 'react'
import Grid from '@mui/material/Grid2'
import { Box, Typography } from '@mui/material'

const FeatureTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid size={{ xs: 12, lg: 6 }} textAlign="center">
        <Typography variant="body1">
          IQmath — matematikani tushunib o‘rganish uchun yaratilgan zamonaviy platforma.{' '}
          <Box fontWeight={500} component="span">
            Video darslar
          </Box>
          , mashqlar va testlar bilan <br />
          real natijaga erishing.
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FeatureTitle
