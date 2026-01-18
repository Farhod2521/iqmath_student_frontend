import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Video } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const PowerfulDozens = () => {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemBanner)
      .then((res) => {
        setData(res.data[0] || {})
      })
      .catch((error) => {
        console.error('Error fetching banner image:', error)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    getSession().then((sess) => setSession(sess))
  }, [])

  // Handle button click
  const handleAuthRedirect = () => {
    toast.success(session ? 'Xush kelibsiz!' : "Boshlash uchun ro'yxatdan o'ting")
    if (session) {
      toast.success('Xush kelibsiz!')
      if (session?.role === 'teacher') {
        router.push('/dashboard/teacher/statistics')
      } else if (session?.role === 'parent') {
        router.push('/dashboard/parent/my-children')
      } else {
        router.push('/dashboard/student/subjects')
      }
    } else {
      router.push('/auth')
    }
  }

  const handleAboutRedirect = () => {
    router.push('/about')
  }

  return (
    <section
      className="relative w-full flex justify-center items-center h-[80vh] md:h-[calc(100vh-60px)]"
      style={{
        height: 'calc(80vh - 60px)',
        filter: loading ? 'blur(12px)' : 'none'
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-filter duration-500"
        style={{
          backgroundImage: `url(${data?.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: loading ? 'blur(12px)' : 'blur(4px)'
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative max-w-7xl w-full px-4 py-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6 text-left md:text-left">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 {t('headerInfo')}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              {t('newMatem')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                {t('learn')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80">{t('iqMathHeartitle')}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAuthRedirect}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{session ? t('begin') : t('sign in')}</span>
                <Play className="w-5 h-5" />
              </button>
              <button
                onClick={handleAboutRedirect}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
              >
                {t('moreInfo')}
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-6 text-white">
              <div>
                <div className="text-2xl md:text-3xl font-bold">8,000+</div>
                <div className="text-sm md:text-base">{t('activeReader')}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">400+</div>
                <div className="text-sm md:text-base">{t('VideoTutorials')}</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">4.9⭐</div>
                <div className="text-sm md:text-base">{t('ratings')}</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
              <div className="bg-white rounded-2xl p-5 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{t('newLesson')}</div>
                    <div className="text-sm text-gray-500">{t('basicAlgebra')}</div>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div className="w-3/4 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {[12, 24, 36].map((dars) => (
                    <div key={dars} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">{dars}</div>
                      <div className="text-xs text-gray-600">{t('lessons')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PowerfulDozens
