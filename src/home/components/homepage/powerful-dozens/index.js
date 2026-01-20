import React, { use, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Video } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Container } from '@mui/material'

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
      className="relative w-full flex justify-center my-auto items-center h-[100vh] md:h-[calc(80vh-60px)]"
      style={{
        // height: 'calc(80vh - 60px)',
        filter: loading ? 'blur(12px)' : 'none'
      }}
    >
      <Container sx={{ maxWidth: '1300px !important' }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 duration-500 bg-center bg-cover transition-filter"
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
        <div className="relative w-full px-4 py-6 max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6 text-left md:text-left">
              <div className="inline-block px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                🚀 {t('headerInfo')}
              </div>
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t('newMatem')}{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
                  {t('learn')}
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80">{t('iqMathHeartitle')}</p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:gap-4">
                <button
                  onClick={handleAuthRedirect}
                  className="flex items-center justify-center px-8 py-3 space-x-2 font-semibold text-white transition transform rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:scale-105"
                >
                  <span>{session ? t('begin') : t('sign in')}</span>
                  <Play className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAboutRedirect}
                  className="px-8 py-3 font-semibold text-white transition border-2 border-white rounded-full hover:bg-white hover:text-black"
                >
                  {t('moreInfo')}
                </button>
              </div>

              <div className="flex flex-row gap-4 pt-4">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 transition bg-black rounded-xl hover:scale-105"
                >
                  <svg width="26" height="26" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill="none" d="M0,0h40v40H0V0z" />
                    <g>
                      <path
                        d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
                        fill="#EA4335"
                      />
                      <path
                        d="M35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6c0-1.5-0.9-2.9-2.2-3.6z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M4.3,4.7c-0.1,0.3-0.1,0.7-0.1,1.1v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
                        fill="#4285F4"
                      />
                      <path
                        d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3L19.8,20z"
                        fill="#34A853"
                      />
                    </g>
                  </svg>

                  <div className="text-white">
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="font-semibold leading-tight">Google Play</div>
                  </div>
                </a>

                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 transition bg-white rounded-xl hover:scale-105"
                >
                  <svg
                    data-v-326dbf2b=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ui-icon  icon-apple"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.1475 0.75C16.2469 2.01122 15.8492 3.27244 15.0438 4.24338C14.2583 5.22433 13.0751 5.78488 11.8223 5.77487C11.7427 4.54367 12.1504 3.3325 12.9558 2.41161C13.7711 1.4707 14.9146 0.880126 16.1475 0.75ZM20.1292 8.17598C18.6806 9.06488 17.7915 10.623 17.7715 12.3208C17.7715 14.2385 18.9204 15.9663 20.6986 16.7154C20.3589 17.814 19.8495 18.8627 19.1801 19.8016C18.291 21.1399 17.352 22.4483 15.8635 22.4683C15.1551 22.4829 14.6784 22.2802 14.1823 22.0692C13.664 21.8488 13.1244 21.6193 12.277 21.6193C11.382 21.6193 10.8176 21.8551 10.2723 22.0828C9.80114 22.2796 9.34424 22.4705 8.70063 22.4982C7.28205 22.5582 6.20313 21.08 5.27406 19.7516C3.42592 17.045 1.98736 12.1311 3.91543 8.78523C4.82452 7.15725 6.51282 6.11854 8.38095 6.05861C9.18561 6.04161 9.95812 6.35239 10.6347 6.62457C11.1509 6.83223 11.6112 7.01742 11.9873 7.01742C12.3159 7.01742 12.7611 6.84099 13.2807 6.63506C14.1041 6.30877 15.1142 5.90844 16.1432 6.01866C17.7316 6.0686 19.2101 6.86761 20.1292 8.17598Z"
                      fill="black"
                    ></path>
                  </svg>

                  <div className="text-black">
                    <div className="text-xs leading-none opacity-70">Download on the</div>
                    <div className="font-semibold leading-tight">App Store</div>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-6 text-white">
                <div>
                  <div className="text-2xl font-bold md:text-3xl">8,000+</div>
                  <div className="text-sm md:text-base">{t('activeReader')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold md:text-3xl">400+</div>
                  <div className="text-sm md:text-base">{t('VideoTutorials')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold md:text-3xl">4.9⭐</div>
                  <div className="text-sm md:text-base">{t('ratings')}</div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              <div className="p-6 transition duration-500 transform shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl rotate-3 hover:rotate-0">
                <div className="p-5 space-y-4 bg-white rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Video className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{t('newLesson')}</div>
                      <div className="text-sm text-gray-500">{t('basicAlgebra')}</div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="w-3/4 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[12, 24, 36].map((dars) => (
                      <div
                        key={dars}
                        className="p-3 text-center rounded-lg bg-gradient-to-br from-blue-50 to-purple-50"
                      >
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
      </Container>
    </section>
  )
}

export default PowerfulDozens
