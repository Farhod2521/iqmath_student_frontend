import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import PricingContent from '@/pages/prices/components/PricingContent'
import { useTranslation } from 'react-i18next'

const Pricing = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        py: {
          xs: 5
        }
      }}
    >
      <Container sx={{ maxWidth: '1400px !important', mt: 4, pb: { xs: 4, lg: 4 } }}>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, lg: 7 }}>
            <Typography
              textAlign="center"
              variant="h4"
              lineHeight={1.4}
              mb={2}
              fontWeight={700}
              sx={{
                fontSize: {
                  lg: '40px',
                  xs: '35px'
                }
              }}
            >
              {/* i18n bilan title */}
              {t('pricingPageHeader', 'O‘quvchilaringizga mos tariflarni tanlang')}
            </Typography>
            <Typography
              textAlign="center"
              variant="body1"
              mb={2}
              sx={{
                fontSize: {
                  lg: '18px',
                  xs: '16px'
                },
                color: 'text.secondary'
              }}
            >
              {t(
                'pricingPageSubHeader',
                'IQmath platformasidagi eng mos tariflarni tanlab, matematikani tez va samarali o‘rganing'
              )}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <PricingContent />
    </Box>
  )
}

export default Pricing
