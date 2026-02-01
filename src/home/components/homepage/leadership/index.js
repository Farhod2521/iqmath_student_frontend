import React from 'react'
import { useTranslation } from 'react-i18next'
import LeadershipSlider from './LeadershipSlider'
import { Container, Grid, Typography } from '@mui/material'

const Leadership = () => {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      {/* Background blur blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-purple-200/40 blur-3xl" />
      </div>

      <Container
        sx={{
          maxWidth: '1400px !important',
          position: 'relative',
          py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' }
        }}
      >
        <div className="relative mx-auto max-w-7xl">
          {/* Header */}

          <Grid container spacing={3} mb={5} alignItems="center" justifyContent="center">
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
                {t('leadership.title')}
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
                {t('leadership.subtitle')}
              </Typography>
            </Grid>
          </Grid>

          {/* Slider */}
          <div className="relative">
            <LeadershipSlider />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Leadership
