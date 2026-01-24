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
          py: {
            xs: '20px',
            lg: '30px'
          }
        }}
      >
        {/* Features Section */}
        <section id="features" className="px-4 py-20 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">{t('PlatCapabilit')}</h2>
              <p className="text-xl text-gray-600">{t('everythingEducation')}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 transition transform cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-xl hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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
