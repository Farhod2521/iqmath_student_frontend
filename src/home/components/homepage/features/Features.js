import React from 'react'
import { Box, Stack, Typography, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'
import FeatureTitle from './FeatureTitle'
import { useTranslation } from 'react-i18next'
import { SlidersHorizontal, PlayCircle, ClipboardCheck, BookOpen } from 'lucide-react'

const cardStyle = {
  borderRadius: '24px',
  transition: 'all .3s ease',
  cursor: 'default',
  height: '100%',
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

const IconHeader = ({ icon, title }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1.25}
      sx={{ mb: 1, '& svg': { flexShrink: 0 } }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 999,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'rgba(255,255,255,0.45)',
          backdropFilter: 'blur(6px)'
        }}
      >
        {icon}
      </Box>

      <Typography variant="h6" fontWeight={800} sx={{ fontSize: { xs: '1.05rem', sm: '1.15rem' }, lineHeight: 1.15 }}>
        {title}
      </Typography>
    </Stack>
  )
}

/**
 * RASMNI "KATTA BO'LIB KETISHI"NI TO'XTATISH:
 * - wrapperga aspectRatio beramiz
 * - maxHeight breakpoint bo'yicha
 * - Image fill ishlatamiz (width/height emas)
 */
const ResponsiveImage = ({ src, alt }) => {
  return (
    <Box
      mt={2}
      sx={{
        width: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '16 / 10', // bir xil ratio
        maxHeight: { xs: 180, sm: 170, md: 160 }, // 1200px dan kichikda kattalashmaydi
        backgroundColor: 'rgba(255,255,255,0.25)'
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
        unoptimized
      />
    </Box>
  )
}

const FeatureCard = ({ bgcolor, icon, title, desc, imageSrc, imageAlt }) => {
  return (
    <Box bgcolor={bgcolor} sx={cardStyle}>
      <Box
        sx={{
          px: { xs: 2.5, sm: 3 },
          py: { xs: 2.5, sm: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <IconHeader icon={icon} title={title} />

        <Typography textAlign="center" sx={{ fontSize: { xs: '0.92rem', sm: '0.98rem' }, flexGrow: 1 }}>
          {desc}
        </Typography>

        <ResponsiveImage src={imageSrc} alt={imageAlt} />
      </Box>
    </Box>
  )
}

const Features = () => {
  const { t } = useTranslation()

  //  py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' }
  return (
    <Box pt={{ xs: 6, md: 10 }} pb={{ xs: 6, md: 10 }}>
      <Container sx={{ maxWidth: '1400px !important', pyz: { xs: '16px', sm: '22px', md: '28px', lg: '30px' } }}>
        <FeatureTitle />

        <Grid container spacing={{ xs: 2, md: 3 }} mt={{ xs: 2, md: 3 }}>
          {/* CENTER MAIN CARD */}
          <Grid
            // 1200px dan kichikda (md) 12 bo'lib tepaga chiqadi, pastda 2 ustunlar yonma-yon ketadi
            size={{ xs: 12, md: 12, lg: 6 }}
            sx={{ order: { xs: 1, lg: 2 }, display: 'flex' }}
          >
            <Box bgcolor="primary.light" sx={{ ...cardStyle, width: '100%' }}>
              <Box
                sx={{
                  px: { xs: 2.5, sm: 4, md: 5 },
                  pt: { xs: 3, sm: 4, md: 6 },
                  pb: { xs: 2.5, sm: 3.5, md: 4.5 },
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{ fontSize: { xs: '22px', sm: '28px', md: '32px', lg: '40px' }, lineHeight: 1.15 }}
                >
                  {t('featuresSection.platform.title')}
                </Typography>

                <Typography mt={1.5} px={{ xs: 0, sm: 2 }} sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                  {t('featuresSection.platform.desc')}
                  <Typography component="span" fontWeight={700}>
                    {' '}
                    {t('featuresSection.platform.highlight')}
                  </Typography>
                </Typography>

                {/* Center rasm ham kattalashmasin */}
                <Box
                  mt={{ xs: 2, sm: 3 }}
                  mx="auto"
                  sx={{
                    width: '100%',
                    maxWidth: { xs: '100%', sm: 520, md: 560, lg: 520 },
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '16 / 9',
                    maxHeight: { xs: 220, sm: 260, md: 280, lg: 320 }
                  }}
                >
                  <Image
                    src={images.platform}
                    alt={t('featuresSection.platform.alt') || 'Learning platform interface'}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* LEFT COLUMN -> 1200px dan kichikda 6 (yonma-yon) */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} sx={{ order: { xs: 2, lg: 1 } }}>
            <Stack spacing={{ xs: 2, md: 3 }} sx={{ height: '100%' }}>
              <FeatureCard
                bgcolor="warning.light"
                icon={<SlidersHorizontal size={22} />}
                title={t('featuresSection.adaptive.title')}
                desc={t('featuresSection.adaptive.desc')}
                imageSrc={images.adaptive}
                imageAlt={t('featuresSection.adaptive.alt') || 'Adaptive learning interface'}
              />

              <FeatureCard
                bgcolor="secondary.light"
                icon={<BookOpen size={22} />}
                title={t('featuresSection.courses.title')}
                desc={t('featuresSection.courses.desc')}
                imageSrc={images.courses}
                imageAlt={t('featuresSection.courses.alt') || 'Course materials'}
              />
            </Stack>
          </Grid>

          {/* RIGHT COLUMN -> 1200px dan kichikda 6 (yonma-yon) */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} sx={{ order: { xs: 3, lg: 3 } }}>
            <Stack spacing={{ xs: 2, md: 3 }} sx={{ height: '100%' }}>
              <FeatureCard
                bgcolor="success.light"
                icon={<PlayCircle size={22} />}
                title={t('featuresSection.video.title')}
                desc={t('featuresSection.video.desc')}
                imageSrc={images.video}
                imageAlt={t('featuresSection.video.alt') || 'Video lesson example'}
              />

              <FeatureCard
                bgcolor="error.light"
                icon={<ClipboardCheck size={22} />}
                title={t('featuresSection.tests.title')}
                desc={t('featuresSection.tests.desc')}
                imageSrc={images.tests}
                imageAlt={t('featuresSection.tests.alt') || 'Practice tests interface'}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Features
