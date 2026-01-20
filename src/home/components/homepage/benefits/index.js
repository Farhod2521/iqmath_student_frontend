import { Container } from '@mui/material'
import React from 'react'

const Benefits = () => {
  return (
    <section class="py-20 bg-white">
      <Container sx={{ maxWidth: '1300px !important' }}>
        <div class="px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-4xl font-bold text-center mb-16 text-gray-800">IQmath Bilan Erishish Mumkin</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                01
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">Akademik Natijalar</h3>
              <p class="text-gray-600">Sezilarli darajada yaxshi baholar va bilim darajasi</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                02
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">Mantiqiy Fikrlash</h3>
              <p class="text-gray-600">Muammolarni hal qilish va tahlil qilish ko'nikmalari</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                03
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">Mustaqillik</h3>
              <p class="text-gray-600">O'z-o'zini rivojlantirish va o'rganish qobiliyati</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                04
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">Imtihon Tayyorgarligi</h3>
              <p class="text-gray-600">Har qanday test va imtihonlarga ishonch bilan kirish</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Benefits
