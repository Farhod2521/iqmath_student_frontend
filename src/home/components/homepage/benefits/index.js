import { Container } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Benefits = () => {
  const { t } = useTranslation()

  const items = [
    {
      no: '01',
      title: t('academicResults'),
      desc: t('significantlyBetter')
    },
    {
      no: '02',
      title: t('logicalThinking'),
      desc: t('logicalThinkingDesc')
    },
    {
      no: '03',
      title: t('independence'),
      desc: t('independenceDesc')
    },
    {
      no: '04',
      title: t('examPreparation'),
      desc: t('examPreparationDesc')
    }
  ]

  return (
    <section className="relative py-10 bg-white md:py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -translate-x-1/2 rounded-full -top-24 left-1/2 h-72 w-72 bg-purple-500/10 blur-3xl" />
        <div className="absolute rounded-full -bottom-24 left-1/4 h-72 w-72 bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.35)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>
      <Container
        sx={{
          maxWidth: '1400px !important',
          py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' }
        }}
      >
        <div className="">
          <div className="max-w-3xl mx-auto mb-10 text-center sm:mb-12 md:mb-16">
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              {t('withIQmath')}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">{t('withIQmathTitle')}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items?.map((item, index) => (
              <div key={index} className="p-4 text-center sm:p-8 rounded-xl">
                <div className="mb-4 text-6xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                  {item.no}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-800"> {item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Benefits
