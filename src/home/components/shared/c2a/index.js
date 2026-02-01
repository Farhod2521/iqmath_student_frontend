import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Container, Stack, Button } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Award, BookOpen, TrendingUp, Video } from 'lucide-react'

const C2a = () => {
  const { t } = useTranslation()
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const smUp = useMediaQuery((theme) => theme.breakpoints.only('sm'))

  const features = [
    {
      icon: <Video className="w-8 h-8" />,
      title: t('VideoTutorials'),
      description: t('detailedVideo')
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t('kengKurslar'),
      description: t('setCourses')
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('flexibleLearning'),
      description: t('learnPlatform')
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('testingEvaluation'),
      description: t('testKnowledge')
    }
  ]

  return (
    <>
      <Container
        sx={{
          maxWidth: '1400px !important',
          py: { xs: '16px', sm: '22px', md: '28px', lg: '30px' }
        }}
      >
        {/* Features Section */}
        <section id="features" className="relative py-10 md:py-16 ">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                {t('PlatCapabilit')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg">
                {t('everythingEducation')}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition
                           hover:-translate-y-1 hover:shadow-xl active:scale-[0.99]"
                >
                  {/* Glow */}
                  <div className="absolute transition rounded-full pointer-events-none -right-10 -top-10 h-28 w-28 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20" />
                  <div className="absolute w-32 h-32 transition rounded-full pointer-events-none -left-12 -bottom-12 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20" />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 text-white shadow-md rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
                      {feature.icon}
                    </div>

                    <h3 className="text-base font-bold text-gray-900 sm:text-lg">{feature.title}</h3>
                  </div>
                  {/* <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3> */}
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}

export default C2a
