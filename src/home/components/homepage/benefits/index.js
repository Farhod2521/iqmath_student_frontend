import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()
  return (
    <section className="py-20 bg-white">
      <Container sx={{ maxWidth: '1300px !important' }}>
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-2xl font-bold text-center text-gray-800 md:text-4xl">{t('withIQmath')}</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-8 text-center rounded-xl">
              <div className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                01
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">{t('academicResults')}</h3>
              <p className="text-gray-600">{t('significantlyBetter')}</p>
            </div>

            <div className="p-8 text-center rounded-xl">
              <div className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                02
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">{t('logicalThinking')}</h3>
              <p className="text-gray-600">{t('logicalThinkingDesc')}</p>
            </div>

            <div className="p-8 text-center rounded-xl">
              <div className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                03
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">{t('independence')}</h3>
              <p className="text-gray-600">{t('independenceDesc')}</p>
            </div>

            <div className="p-8 text-center rounded-xl">
              <div className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                04
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">{t('examPreparation')}</h3>
              <p className="text-gray-600">{t('examPreparationDesc')}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Benefits
