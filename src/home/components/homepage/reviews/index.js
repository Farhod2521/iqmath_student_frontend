import React, { useMemo } from 'react'
import { Box, Container, Typography } from '@mui/material'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Reviews = () => {
  const { t } = useTranslation()

  const benefits = useMemo(() => {
    const val = t('benefitsSection.items', { returnObjects: true })
    return Array.isArray(val) ? val : []
  }, [t])

  return (
    <Box
      component="section"
      id="benefits"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        color: '#fff',
        // gradient background
        background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)'
      }}
    >
      {/* Background blur blobs */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.65
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 260, md: 420 },
            height: { xs: 260, md: 420 },
            top: { xs: -80, md: -120 },
            left: { xs: -80, md: -120 },
            borderRadius: '999px',
            filter: 'blur(60px)',
            background: 'rgba(255,255,255,0.18)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: { xs: 280, md: 520 },
            height: { xs: 280, md: 520 },
            bottom: { xs: -120, md: -180 },
            right: { xs: -120, md: -180 },
            borderRadius: '999px',
            filter: 'blur(70px)',
            background: 'rgba(0,0,0,0.18)'
          }}
        />
      </Box>

      <Container
        sx={{
          position: 'relative',
          maxWidth: '1400px !important',
          py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' }
        }}
      >
        {/* Title */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 7 } }}>
          <Typography
            variant="h2"
            fontWeight={900}
            sx={{
              fontSize: { xs: '28px', sm: '34px', md: '42px' },
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
          >
            {t('benefitsSection.title')}
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              mx: 'auto',
              maxWidth: 760,
              fontSize: { xs: '15px', sm: '16px', md: '18px' },
              opacity: 0.9
            }}
          >
            {t('benefitsSection.subtitle')}
          </Typography>
        </Box>

        {/* Cards grid */}
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 2.5 },
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              lg: '1fr 1fr 1fr'
            }
          }}
        >
          {benefits.map((benefit, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: 'center',
                p: { xs: 2.25, md: 2.75 },
                borderRadius: 3,
                backgroundColor: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                transition: 'transform .2s ease, background-color .2s ease, border-color .2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  backgroundColor: 'rgba(255,255,255,0.16)',
                  borderColor: 'rgba(255,255,255,0.30)'
                }
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  backgroundColor: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.22)'
                }}
              >
                <CheckCircle size={18} />
              </Box>

              <Typography
                sx={{
                  fontSize: { xs: '15px', md: '16px' },
                  lineHeight: 1.5,
                  opacity: 0.98
                }}
              >
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Reviews
