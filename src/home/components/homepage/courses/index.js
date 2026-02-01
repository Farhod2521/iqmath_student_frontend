import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Courses = () => {
  const { t } = useTranslation()

  const courses = [
    t('algebra'),
    t('geometry'),
    t('statistics'),
    t('account'),
    t('trigonometry'),
    t('probabilityTheory')
  ]

  return (
    <section className="relative py-10 overflow-hidden text-white md:py-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700" />
        <div className="absolute -translate-x-1/2 rounded-full -top-24 left-1/2 h-72 w-72 bg-white/15 blur-3xl" />
        <div className="absolute rounded-full -bottom-24 left-1/3 h-80 w-80 bg-black/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <Container sx={{ maxWidth: '1400px !important', py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' } }}>
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
              {t('availableCourses')}
            </h2>

            <p className="mt-3 text-sm leading-relaxed sm:text-base md:text-lg text-white/80">
              {t('coursesSection.subtitle')}
            </p>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 sm:mt-10 sm:gap-4">
            {courses.map((name) => (
              <div key={name} className="relative cursor-pointer select-none group">
                {/* glow */}
                <div className="absolute transition rounded-full opacity-0 -inset-1 bg-white/10 blur-lg group-hover:opacity-100" />

                <div
                  className="relative rounded-full border border-white/20 bg-white/10 px-5 py-3 sm:px-7 sm:py-3.5
                             text-sm sm:text-base md:text-lg font-semibold backdrop-blur-md
                             transition duration-300 hover:bg-white/15 active:scale-[0.98]"
                >
                  {name}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="flex justify-center mt-10 sm:mt-12">
            <div className="max-w-2xl px-5 py-4 text-center border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
              <div className="text-sm font-semibold sm:text-base">{t('coursesSection.goalTitle')}</div>
              <div className="mt-1 text-xs leading-relaxed sm:text-sm text-white/80">
                {t('coursesSection.goalText')}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Courses
