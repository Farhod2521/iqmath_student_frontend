import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()
  return (
    <section class="py-20 bg-white">
      <Container sx={{ maxWidth: '1300px !important' }}>
        <div class="px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-4xl font-bold text-center mb-16 text-gray-800">{t('withIQmath')}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                01
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">{t('academicResults')}</h3>
              <p class="text-gray-600">{t('significantlyBetter')}</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                02
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">{t('logicalThinking')}</h3>
              <p class="text-gray-600">{t('logicalThinkingDesc')}</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                03
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">{t('independence')}</h3>
              <p class="text-gray-600">{t('independenceDesc')}</p>
            </div>

            <div class="text-center p-8 rounded-xl">
              <div class="text-6xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                04
              </div>
              <h3 class="text-xl font-bold mb-3 text-gray-800">{t('examPreparation')}</h3>
              <p class="text-gray-600">{t('examPreparationDesc')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Benefits
