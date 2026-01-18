import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Container, Stack, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'
import useMediaQuery from '@mui/material/useMediaQuery'

import DesignCol from '@/assets/images/frontend-pages/homepage/design-collection.png'
import Image from 'next/image'
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
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('PlatCapabilit')}</h2>
              <p className="text-xl text-gray-600">{t('everythingEducation')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
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
