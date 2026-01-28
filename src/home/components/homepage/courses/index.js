import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Courses = () => {
  const { t } = useTranslation()
  return (
    <section className="py-20 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
      <Container sx={{ maxWidth: '1400px !important' }}>
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-2xl font-bold text-center md:text-4xl">{t('availableCourses')}</h2>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('algebra')}
            </div>
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('geometry')}
            </div>
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('statistics')}
            </div>
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('account')}
            </div>
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('trigonometry')}
            </div>
            <div className="px-8 py-4 text-xl font-semibold transition duration-300 transform rounded-full bg-white/20 backdrop-blur-lg hover:bg-white/30 hover:scale-105">
              {t('probabilityTheory')}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Courses
