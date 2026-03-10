import React from 'react'
import Grid from '@mui/material/Grid2'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const FeatureTitle = () => {
  const { t } = useTranslation()
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
          {t('featureTitle.eyebrow')}
        </Typography>

        {/* MAIN TITLE */}
        <Typography
          variant="h3"
          fontWeight={800}
          mt={1}
          mb={2}
          sx={{
            fontSize: { xs: '24px', md: '36px' },
            lineHeight: 1.2
          }}
        >
          {t('featureTitle.titleLine1')}
          <br /> {t('featureTitle.titleLine2')}
        </Typography>

        {/* DESCRIPTION */}
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '14px' }}>
          <Box component="span" fontWeight={600} color="text.primary">
            IQmath
          </Box>{' '}
          {t('featureTitle.desc1')}{' '}
          <Box component="span" fontWeight={600}>
            {t('featureTitle.desc2')}
          </Box>{' '}
          {t('featureTitle.desc3')}
          <br />
          {t('featureTitle.desc4')}{' '}
          <Box component="span" fontWeight={600}>
            {t('featureTitle.desc5')}
          </Box>{' '}
          {t('featureTitle.desc6')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default FeatureTitle
