import { Container } from '@mui/material'
import React from 'react'

const Courses = () => {
  return (
    <section class="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient text-white">
      <Container sx={{ maxWidth: '1300px !important' }}>
        <div class=" px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-4xl font-bold text-center mb-12">Mavjud Kurslar</h2>

          <div class="flex flex-wrap justify-center gap-4 mt-10">
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Algebra
            </div>
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Geometriya
            </div>
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Statistika
            </div>
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Hisob
            </div>
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Trigonometriya
            </div>
            <div class="bg-white/20 backdrop-blur-lg px-8 py-4 rounded-full text-xl font-semibold hover:bg-white/30 hover:scale-105 transform transition duration-300">
              Ehtimollik nazariyasi
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Courses
