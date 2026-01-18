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
      <section id="benefits" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nima Uchun IQmath?</h2>
            <p className="text-xl opacity-90">O'qish natijasida oladigan afzalliklar</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition flex items-start space-x-3"
              >
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* </Container>
      </Box> */}
    </>
  )
}

export default Reviews
