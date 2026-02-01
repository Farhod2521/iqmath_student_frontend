import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Video, Sparkles, ShieldCheck, Users } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Container } from '@mui/material'
import Auth from '../../auth/Auth'

const PowerfulDozens = () => {
  const { t } = useTranslation()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)

  const router = useRouter()
  const authRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemBanner)
      .then((res) => setData(res.data?.[0] || {}))
      .catch((error) => console.error('Error fetching banner image:', error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    getSession().then((sess) => setSession(sess))
  }, [])

  const openAuthPanel = () => {
    setShowAuth(true)
    // keyin panelga yumshoq scroll
    // setTimeout(() => authRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const handleAuthRedirect = () => {
    // session bo'lsa: eski logika
    if (session) {
      toast.success(t('welcome', 'Xush kelibsiz!'))
      if (session?.role === 'teacher') router.push('/dashboard/teacher/statistics')
      else if (session?.role === 'parent') router.push('/dashboard/parent/my-children')
      else router.push('/dashboard/student/subjects')
      return
    }

    // session yo'q bo'lsa: AuthPanel ochamiz
    toast.success(t('start_register', "Boshlash uchun ro'yxatdan o'ting"))
    openAuthPanel()
  }

  const handleAboutRedirect = () => router.push('/about')

  return (
    <section className="relative w-full overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${data?.image || ''})`,
            filter: loading ? 'blur(14px)' : 'blur(6px)',
            transform: 'scale(1.08)',
            transition: 'filter .4s ease'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
        <div className="absolute -top-44 -left-44 h-[520px] w-[520px] rounded-full bg-blue-500/25 blur-3xl" />
        <div className="absolute -bottom-44 -right-44 h-[520px] w-[520px] rounded-full bg-purple-500/25 blur-3xl" />
      </div>

      <Container sx={{ maxWidth: '1400px !important', py: { xs: '18px', sm: '24px', md: '32px', lg: '36px' } }}>
        <div className="relative">
          <div
            className="
              grid gap-10 lg:grid-cols-12 lg:gap-12
              min-h-[calc(100vh-120px)] md:min-h-[calc(80vh-60px)]
              items-center py-10 md:py-14
            "
          >
            {/* LEFT / HERO */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white border rounded-full border-white/15 bg-white/10 backdrop-blur-md">
                <span className="font-semibold">🚀 {t('headerInfo')}</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t('newMatem')}{' '}
                <span className="text-transparent bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text">
                  {t('learn')}
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
                {t('iqMathHeartitle')}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
                <button
                  onClick={handleAuthRedirect}
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-full bg-gradient-to-r from-blue-600 to-purple-600
                    px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/20
                    transition hover:shadow-xl hover:shadow-purple-600/25 active:scale-[0.98]
                  "
                >
                  <span>{session ? t('login') : t('signIn')}</span>
                  <Play className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </button>

                <button
                  onClick={handleAboutRedirect}
                  className="
                    inline-flex items-center justify-center rounded-full
                    border-2 border-white/70 px-8 py-3 font-semibold text-white
                    transition hover:bg-white hover:text-black active:scale-[0.98]
                  "
                >
                  {t('moreInfo')}
                </button>
              </div>

              {/* Stats (qoldiravering) */}
              <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="text-2xl font-extrabold md:text-3xl">8,000+</div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('activeReader')}</div>
                </div>
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="text-2xl font-extrabold md:text-3xl">400+</div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('VideoTutorials')}</div>
                </div>
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="text-2xl font-extrabold md:text-3xl">4.9⭐</div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('ratings')}</div>
                </div>
              </div>
            </div>

            {/* RIGHT / AUTH AREA */}
            <div className="lg:col-span-5" ref={authRef}>
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto lg:sticky lg:top-24">
                {!showAuth ? (
                  <PreAuthCard onStart={openAuthPanel} />
                ) : (
                  <div className="duration-300 animate-in fade-in slide-in-from-bottom-2">
                    <Auth />
                    <button
                      onClick={() => setShowAuth(false)}
                      className="w-full mt-3 text-sm text-center transition text-white/70 hover:text-white"
                    >
                      ← Ortga
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PowerfulDozens

function PreAuthCard({ onStart }) {
  const { t } = useTranslation()
  return (
    <div className="relative p-[1px] rounded-3xl bg-gradient-to-r from-white/25 via-white/10 to-white/25">
      <div className="p-5 border shadow-2xl rounded-3xl border-white/10 bg-white/10 backdrop-blur-xl sm:p-6">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white border rounded-full border-white/15 bg-white/10">
          <Sparkles className="w-4 h-4" />
          {t('authCard.badge')}
        </div>

        <h3 className="mt-4 text-xl font-extrabold text-white">{t('authCard.title')}</h3>
        <p className="mt-2 text-sm text-white/75">{t('authCard.subtitle')}</p>

        {/* mini features */}
        <div className="grid gap-3 mt-5">
          <div className="flex items-center gap-3 p-3 border rounded-2xl border-white/10 bg-white/5">
            <ShieldCheck className="w-5 h-5 text-white/90" />
            <div className="text-sm text-white/85"> {t('authCard.features.secure')}</div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-2xl border-white/10 bg-white/5">
            <Video className="w-5 h-5 text-white/90" />
            <div className="text-sm text-white/85"> {t('authCard.features.videos')}</div>
          </div>

          <div className="flex items-center gap-3 p-3 border rounded-2xl border-white/10 bg-white/5">
            <Users className="w-5 h-5 text-white/90" />
            <div className="text-sm text-white/85"> {t('authCard.features.roles')}</div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="
            mt-6 w-full rounded-2xl
            bg-gradient-to-r from-blue-600 to-purple-600
            px-5 py-3 font-semibold text-white
            shadow-lg shadow-blue-600/20 transition
            hover:shadow-xl hover:shadow-purple-600/25 active:scale-[0.99]
          "
        >
          {t('authCard.cta')}
        </button>

        <p className="mt-3 text-xs text-center text-white/60"> {t('authCard.cta')}</p>
      </div>
    </div>
  )
}
