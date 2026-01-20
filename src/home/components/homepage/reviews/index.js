import React from 'react'
import { Box, Container } from '@mui/material'
import ContentArea from './ContentArea'
import ReviewCarousel from './ReviewCarousel'
import Grid from '@mui/material/Grid2'
import { CheckCircle } from 'lucide-react'

const Reviews = () => {
  const benefits = [
    'Mantiqiy va analitik fikrlash rivojlanadi',
    "Akademik ko'rsatkichlar yaxshilanadi",
    "Hayotiy muammolarni hal qilish ko'nikmalari",
    "O'z tezligingizda o'rganish imkoniyati",
    'Imtihonlarga professional tayyorgarlik',
    'Doimiy progress monitoring'
  ]

  return (
    <>
      {/* <Box
        sx={{
          py: {
            xs: 5,
            lg: 10
          }
        }}
      >
        <Container maxWidth="lg"> */}
      {/* <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid size={{ xs: 12, lg: 5, sm: 8 }} pr={6}>
              <ContentArea />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Grid container spacing={3} justifyContent="center">
                <Grid size={{ xs: 12, lg: 10 }}>
                  <ReviewCarousel />
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
      {/* Benefits Section */}
      <section id="benefits" className="px-4 py-20 text-white bg-gradient-to-r from-blue-600 to-purple-600">
        <Container
          sx={{
            maxWidth: '1400px !important',
            margin: 'auto !important'
          }}
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Nima Uchun IQmath?</h2>
            <p className="text-xl opacity-90">O'qish natijasida oladigan afzalliklar</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start p-6 space-x-3 transition bg-white/10 backdrop-blur-lg rounded-xl hover:bg-white/20"
              >
                <CheckCircle className="flex-shrink-0 w-6 h-6 mt-1" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* </Container>
      </Box> */}
    </>
  )
}

export default Reviews
