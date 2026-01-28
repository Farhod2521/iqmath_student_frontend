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

const images = {
  adaptive: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  courses: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
  platform: 'https://images.unsplash.com/photo-1532012197267-da84d127e765',
  video: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178',
  tests: 'https://images.unsplash.com/photo-1588072432836-e10032774350'
}

const Features = () => {
  const { t } = useTranslation()

  return (
    <Box pt={{ xs: 6, md: 10 }} pb={{ xs: 6, md: 10 }}>
      <Container
        sx={{
          maxWidth: '1400px !important'
        }}
      >
        <FeatureTitle />

        <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 2, md: 3 }}>
          {/* CENTER MAIN CARD - Mobile first position */}
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              order: { xs: 1, lg: 2 },
              display: 'flex'
            }}
          >
            <Box bgcolor="primary.light" sx={cardStyle}>
              <Box
                px={{ xs: 3, sm: 4, md: 5 }}
                pt={{ xs: 4, md: 8 }}
                pb={{ xs: 3, md: 5 }}
                textAlign="center"
                flexGrow={1}
              >
                <Typography
                  variant="h2"
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: '28px', sm: '32px', lg: '40px' },
                    lineHeight: 1.2
                  }}
                >
                  {t('featuresSection.platform.title')}
                </Typography>

                <Typography mt={2} px={{ xs: 1, sm: 2 }}>
                  {t('featuresSection.platform.desc')}
                  <Typography component="span" fontWeight={600}>
                    {' '}
                    {t('featuresSection.platform.highlight')}
                  </Typography>
                </Typography>

                <Box mt={3} mx="auto" maxWidth={{ xs: '100%', sm: '400px' }}>
                  <Image
                    src={images.platform}
                    alt={t('featuresSection.platform.alt') || 'Learning platform interface'}
                    width={420}
                    height={240}
                    style={{
                      borderRadius: 16,
                      objectFit: 'cover',
                      width: '100%',
                      height: 'auto'
                    }}
                    unoptimized
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* LEFT COLUMN - Appears after center on mobile */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ order: { xs: 2, lg: 1 } }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* Moslashuvchan ta'lim */}
              <Box bgcolor="warning.light" sx={cardStyle}>
                <Box px={{ xs: 3, sm: 4 }} py={{ xs: 3, sm: 4 }}>
                  <Stack spacing={2} textAlign="center">
                    <SlidersHorizontal size={32} />
                    <Typography variant="h6" fontWeight={700} fontSize={{ xs: '1.1rem', sm: '1.25rem' }}>
                      {t('featuresSection.adaptive.title')}
                    </Typography>
                    <Typography fontSize={{ xs: '0.9rem', sm: '1rem' }}>
                      {t('featuresSection.adaptive.desc')}
                    </Typography>
                    <Box mt={1} mx="auto" maxWidth="100%">
                      <Image
                        src={images.adaptive}
                        alt={t('featuresSection.adaptive.alt') || 'Adaptive learning interface'}
                        width={300}
                        height={180}
                        style={{ borderRadius: 16, objectFit: 'cover', width: '100%', height: 'auto' }}
                        unoptimized
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Kurslar */}
              <Box bgcolor="secondary.light" sx={cardStyle}>
                <Box px={{ xs: 3, sm: 4 }} py={{ xs: 3, sm: 4 }}>
                  <Stack spacing={2} textAlign="center">
                    <BookOpen size={32} />
                    <Typography variant="h6" fontWeight={700} fontSize={{ xs: '1.1rem', sm: '1.25rem' }}>
                      {t('featuresSection.courses.title')}
                    </Typography>
                    <Typography fontSize={{ xs: '0.9rem', sm: '1rem' }}>{t('featuresSection.courses.desc')}</Typography>
                    <Box mt={1} mx="auto" maxWidth="100%">
                      <Image
                        src={images.courses}
                        alt={t('featuresSection.courses.alt') || 'Course materials'}
                        width={300}
                        height={180}
                        style={{ borderRadius: 16, objectFit: 'cover', width: '100%', height: 'auto' }}
                        unoptimized
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT COLUMN - Appears last on mobile */}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} sx={{ order: { xs: 3, lg: 3 } }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              {/* Video darslar */}
              <Box bgcolor="success.light" sx={cardStyle}>
                <Box px={{ xs: 3, sm: 4 }} py={{ xs: 3, sm: 4 }}>
                  <Stack spacing={2} textAlign="center">
                    <PlayCircle size={32} />
                    <Typography variant="h6" fontWeight={700} fontSize={{ xs: '1.1rem', sm: '1.25rem' }}>
                      {t('featuresSection.video.title')}
                    </Typography>
                    <Typography fontSize={{ xs: '0.9rem', sm: '1rem' }}>{t('featuresSection.video.desc')}</Typography>
                    <Box mt={1} mx="auto" maxWidth="100%">
                      <Image
                        src={images.video}
                        alt={t('featuresSection.video.alt') || 'Video lesson example'}
                        width={300}
                        height={180}
                        style={{ borderRadius: 16, objectFit: 'cover', width: '100%', height: 'auto' }}
                        unoptimized
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>

              {/* Test va mashqlar */}
              <Box bgcolor="error.light" sx={cardStyle}>
                <Box px={{ xs: 3, sm: 4 }} py={{ xs: 3, sm: 4 }}>
                  <Stack spacing={2} textAlign="center">
                    <ClipboardCheck size={32} />
                    <Typography variant="h6" fontWeight={700} fontSize={{ xs: '1.1rem', sm: '1.25rem' }}>
                      {t('featuresSection.tests.title')}
                    </Typography>
                    <Typography fontSize={{ xs: '0.9rem', sm: '1rem' }}>{t('featuresSection.tests.desc')}</Typography>
                    <Box mt={1} mx="auto" maxWidth="100%">
                      <Image
                        src={images.tests}
                        alt={t('featuresSection.tests.alt') || 'Practice tests interface'}
                        width={300}
                        height={180}
                        style={{ borderRadius: 16, objectFit: 'cover', width: '100%', height: 'auto' }}
                        unoptimized
                      />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
