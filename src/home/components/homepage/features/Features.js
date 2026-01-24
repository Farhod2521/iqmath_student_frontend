import React from 'react'
import { Box, Stack, Typography, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import FeatureTitle from './FeatureTitle'
import { useTranslation } from 'react-i18next'

// icons
import { SlidersHorizontal, PlayCircle, ClipboardCheck, BookOpen } from 'lucide-react'

const cardStyle = {
  borderRadius: '24px',
  transition: 'all .3s ease',
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
  }
}

const Features = () => {
  const { t } = useTranslation()
  return (
    <Box pt={10} pb={10}>
      <Container
        sx={{
          maxWidth: '1400px !important'
        }}
      >
        <FeatureTitle />

        <Grid container spacing={3} mt={3}>
          {/* ================= LEFT COLUMN ================= */}
          <Grid size={{ xs: 12, sm: 6, lg: 'grow' }}>
            {/* Moslashuvchan ta’lim */}
            <Box mb={3} bgcolor="warning.light" sx={cardStyle}>
              <Box px={4} py={6}>
                <Stack spacing={2} textAlign="center">
                  <SlidersHorizontal size={40} />

                  <Typography variant="h6" fontWeight={700}>
                    {t('featuresSection.adaptive.title')}
                  </Typography>
                  <Typography> {t('featuresSection.adaptive.desc')}</Typography>

                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                    alt="Moslashuvchan ta'lim"
                    width={300}
                    height={180}
                    style={{ borderRadius: 16, objectFit: 'cover', width: '100%' }}
                    unoptimized
                  />
                </Stack>
              </Box>
            </Box>

            {/* Kurslar */}
            <Box bgcolor="secondary.light" sx={cardStyle}>
              <Box px={4} py={5} textAlign="center">
                <Stack spacing={2}>
                  <BookOpen size={40} />
                  <Typography variant="h6" fontWeight={700}>
                    {t('featuresSection.courses.title')}
                  </Typography>
                  <Typography> {t('featuresSection.courses.desc')}</Typography>

                  <Image
                    src="https://images.unsplash.com/photo-1509228468518-180dd4864904"
                    alt="Matematika darslari"
                    width={300}
                    height={180}
                    style={{ borderRadius: 16, objectFit: 'cover', width: '100%' }}
                    unoptimized
                  />
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* ================= CENTER MAIN CARD ================= */}
          <Grid size={{ xs: 12, lg: 5 }} sx={{ order: { xs: 3, lg: 2 } }}>
            <Box bgcolor="primary.light" sx={{ ...cardStyle, height: '100%' }}>
              <Box px={5} pt={8} pb={5} textAlign="center">
                <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: '32px', lg: '40px' } }}>
                  {t('featuresSection.platform.title')}
                </Typography>

                <Typography mt={2}>
                  {t('featuresSection.platform.desc')}
                  <Typography component="span" fontWeight={600}>
                    {' '}
                    {t('featuresSection.platform.highlight')}
                  </Typography>
                </Typography>

                <Box mt={4}>
                  <Image
                    src="https://images.unsplash.com/photo-1532012197267-da84d127e765"
                    alt="Matematika formulalari"
                    width={420}
                    height={240}
                    style={{ borderRadius: 16, objectFit: 'cover', width: '100%' }}
                    unoptimized
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ================= RIGHT COLUMN ================= */}
          <Grid size={{ xs: 12, sm: 6, lg: 'grow' }} sx={{ order: { xs: 2, lg: 3 } }}>
            {/* Video darslar */}
            <Box mb={3} bgcolor="success.light" sx={cardStyle}>
              <Box px={4} py={6} textAlign="center">
                <Stack spacing={2}>
                  <PlayCircle size={40} />
                  <Typography variant="h6" fontWeight={700}>
                    {t('featuresSection.video.title')}
                  </Typography>
                  <Typography> {t('featuresSection.video.desc')}</Typography>

                  <Image
                    src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178"
                    alt="Video darslar"
                    width={300}
                    height={180}
                    style={{ borderRadius: 16, objectFit: 'cover', width: '100%' }}
                    unoptimized
                  />
                </Stack>
              </Box>
            </Box>

            {/* Test va mashqlar */}
            <Box bgcolor="error.light" sx={cardStyle}>
              <Box px={4} py={6} textAlign="center">
                <Stack spacing={2}>
                  <ClipboardCheck size={40} />
                  <Typography variant="h6" fontWeight={700}>
                    {t('featuresSection.tests.title')}
                  </Typography>
                  <Typography> {t('featuresSection.tests.desc')}</Typography>

                  <Image
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                    alt="Test va mashqlar"
                    width={300}
                    height={180}
                    style={{ borderRadius: 16, objectFit: 'cover', width: '100%' }}
                    unoptimized
                  />
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
