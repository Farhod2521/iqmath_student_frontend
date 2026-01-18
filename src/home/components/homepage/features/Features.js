import React from 'react'
import { Box, Stack, Typography, Container } from '@mui/material'
import FeatureTitle from './FeatureTitle'
import Grid from '@mui/material/Grid2'
import Image from 'next/image'

// lucide-react icons
import { SlidersHorizontal, PlayCircle, ClipboardCheck } from 'lucide-react'

const Features = () => {
  return (
    <Box pt={10} pb={10}>
      <Container maxWidth="lg">
        <FeatureTitle />
        <Grid container spacing={3} mt={3}>
          {/* ================= LEFT COLUMN ================= */}
          <Grid size={{ xs: 12, sm: 6, lg: 'grow' }}>
            {/* Moslashuvchan ta’lim */}
            <Box mb={3} bgcolor="warning.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack spacing={2} textAlign="center">
                  <SlidersHorizontal size={40} strokeWidth={1.8} />

                  <Typography variant="h6" fontWeight={700}>
                    Moslashuvchan ta’lim tizimi
                  </Typography>
                  <Typography variant="body1">
                    Har bir o‘quvchi o‘z bilim darajasi va tezligiga mos ravishda o‘rganadi.
                  </Typography>
                </Stack>
              </Box>
            </Box>

            {/* Kurslar */}
            <Box textAlign="center" mb={3} bgcolor="secondary.light" borderRadius="24px">
              <Box px={4} py="50px">
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Keng qamrovli kurslar
                  </Typography>
                  <Typography variant="body1">
                    Algebra, geometriya, statistika va boshqa muhim yo‘nalishlar bo‘yicha kurslar.
                  </Typography>
                </Stack>
              </Box>

              {/* IMAGE URL */}
              <Box height="90px">
                {/* <Image
                  src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=300&fit=crop"
                  alt="Matematika kurslari"
                  width={260}
                  height={90}
                  style={{ objectFit: 'contain' }}
                /> */}
              </Box>
            </Box>
          </Grid>

          {/* ================= CENTER MAIN CARD ================= */}
          <Grid size={{ xs: 12, lg: 5 }} sx={{ order: { xs: 3, lg: 2 } }}>
            <Box textAlign="center" mb={3} bgcolor="primary.light" borderRadius="24px">
              <Box pt="65px" pb="40px" px={5}>
                {/* LOGO (URL ham bo‘lishi mumkin) */}
                {/* <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png"
                  alt="IQmath logo"
                  width={50}
                  height={50}
                /> */}

                <Typography variant="h2" fontWeight={700} mt={4} sx={{ fontSize: { lg: '40px', xs: '35px' } }}>
                  Zamonaviy o‘quv platforma
                </Typography>

                <Typography variant="body1" mt={2}>
                  IQmath ilg‘or o‘qitish metodikasi va zamonaviy texnologiyalar asosida ishlab chiqilgan.{' '}
                  <Typography component="span" fontWeight={600}>
                    Video darslar va amaliy mashqlar bilan.
                  </Typography>
                </Typography>

                {/* MAIN IMAGE URL */}
                <Box mt={5} mb={2}>
                  {/* <Image
                    src="https://images.unsplash.com/photo-1584697964154-4d1f8f5c1f65?w=900&h=600&fit=crop"
                    alt="Online matematika darsi"
                    width={420}
                    height={260}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px'
                    }}
                  /> */}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* ================= RIGHT COLUMN ================= */}
          <Grid size={{ xs: 12, sm: 6, lg: 'grow' }} sx={{ order: { xs: 2, lg: 3 } }}>
            {/* Video darslar */}
            <Box textAlign="center" mb={3} bgcolor="success.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack spacing={2} textAlign="center">
                  <PlayCircle size={40} strokeWidth={1.8} />

                  <Typography variant="h6" fontWeight={700}>
                    Video darslar
                  </Typography>
                  <Typography variant="body1">
                    Murakkab mavzular bosqichma-bosqich video orqali tushuntiriladi.
                  </Typography>
                </Stack>
              </Box>
            </Box>

            {/* Test va mashqlar */}
            <Box textAlign="center" mb={3} bgcolor="error.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack spacing={2} textAlign="center">
                  <ClipboardCheck size={40} strokeWidth={1.8} />

                  <Typography variant="h6" fontWeight={700}>
                    Test va mashqlar
                  </Typography>
                  <Typography variant="body1">
                    Bilimingizni mustahkamlash va imtihonlarga tayyorlanish imkoniyati.
                  </Typography>
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
