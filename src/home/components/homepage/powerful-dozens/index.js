import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Play, Video, Sparkles, ShieldCheck, Users, Image } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { useRouter } from 'next/router'
import { getSession, signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Container } from '@mui/material'
import Auth from '../../auth/Auth'
import { Call } from '@mui/icons-material'
import SimpleLoader from '@/components/loader/simple-loader'

const PowerfulDozens = () => {
  const { t } = useTranslation()
  // const [session, setSession] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const { data: session, status } = useSession()

  const router = useRouter()
  const authRef = useRef(null)

  // useEffect(() => {
  //   getSession().then((sess) => setSession(sess))
  // }, [])

  const openAuthPanel = () => {
    setShowAuth(true)
    // keyin panelga yumshoq scroll
    // setTimeout(() => authRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  const handleAuthRedirect = () => {
    window.location.href = 'tel:+998881989000'
  }

  const handleAboutRedirect = () => router.push('/about')

  return (
    <section className="relative w-full overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: 'url(https://api.iqmath.uz/Media/BANNER/bg-img.jpg)',
            filter: 'blur(6px)',
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
          <div className="grid gap-8 lg:grid-cols-12 items-center min-h-[calc(100vh-120px)] md:min-h-[calc(80vh-60px)] py-10 md:py-16">
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
              {/* <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:gap-4">
                <button
                  onClick={handleAuthRedirect}
                  className="
                    group inline-flex items-center justify-center gap-2
                    rounded-[8px] bg-[#5D87FF]
                    px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/20
                    transition hover:shadow-xl hover:shadow-purple-600/25 active:scale-[0.98]
                  "
                >
                  <span> {t('connection')}</span>
                  <Call className="w-5 h-5 transition" />
                </button>

                <button
                  onClick={handleAboutRedirect}
                  className="
                    inline-flex items-center justify-center rounded-[8px]
                    border-2 border-white/70 px-8 py-3 font-semibold text-white
                    transition hover:bg-white hover:text-black active:scale-[0.98]
                  "
                >
                  {t('moreInfo')}
                </button>
              </div> */}

              <div
                className="
  flex gap-3
  max-[360px]:flex-col
  sm:flex-row
  sm:items-center
"
              >
                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.iqmath.mobile"
                  target="_blank"
                  rel="noreferrer"
                  className="
    group flex items-center gap-3
    h-[48px] sm:h-[54px] md:h-[60px]
    min-w-[160px] sm:min-w-[180px] md:min-w-[200px]
    px-3 sm:px-4 md:px-5
    rounded-xl sm:rounded-2xl
    border border-white/20
    ring-1 ring-white/15
    bg-black/70 hover:bg-black/80
    shadow-lg shadow-black/40 hover:shadow-black/50
    backdrop-blur-md
    transition
    hover:-translate-y-[1px]
    active:scale-[0.98]
    w-full sm:w-auto
  "
                >
                  {/* Icon */}

                  <svg
                    viewBox="0 0 25 25"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.7756 11.5149L17.4561 9.05957L14.0156 12.5L17.4561 15.9405L21.7756 13.4852C22.541 13.0532 22.541 11.9468 21.7756 11.5149Z"
                      fill="url(#gp0)"
                    />
                    <path
                      d="M14.0156 12.5001L3.73969 2.22412C3.53508 2.42873 3.40625 2.70154 3.40625 3.0274V21.9727C3.40625 22.2986 3.53508 22.579 3.73969 22.776L14.0156 12.5001Z"
                      fill="url(#gp1)"
                    />
                    <path
                      d="M17.456 9.05959L5.10369 2.04225C4.62626 1.76943 4.08064 1.89068 3.73962 2.22412L14.0156 12.5001L17.456 9.05959Z"
                      fill="url(#gp2)"
                    />
                    <path
                      d="M14.0156 12.5001L3.73962 22.776C4.08064 23.117 4.62626 23.2307 5.10369 22.9579L17.456 15.9405L14.0156 12.5001Z"
                      fill="url(#gp3)"
                    />

                    <defs>
                      <linearGradient id="gp0" x1="14.0156" y1="12.5" x2="22.3516" y2="12.5">
                        <stop stopColor="#FFBD00" />
                        <stop offset="1" stopColor="#FFE000" />
                      </linearGradient>

                      <linearGradient id="gp1" x1="14.0156" y1="12.5" x2="3.4" y2="23">
                        <stop stopColor="#00BEFF" />
                        <stop offset="1" stopColor="#00E3FF" />
                      </linearGradient>

                      <linearGradient id="gp2" x1="3.4" y1="1.8" x2="14.0156" y2="12.5">
                        <stop stopColor="#15CF74" />
                        <stop offset="1" stopColor="#00F076" />
                      </linearGradient>

                      <linearGradient id="gp3" x1="14.0156" y1="12.5" x2="3.4" y2="23">
                        <stop stopColor="#FF3A44" />
                        <stop offset="1" stopColor="#E12653" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Text */}
                  <span className="leading-tight">
                    <span className="block text-[9px] sm:text-[10px] md:text-[11px] text-white/70">Get it on</span>
                    <span className="block text-[13px] sm:text-[15px] md:text-[16px] font-semibold text-white">
                      Google Play
                    </span>
                  </span>
                </a>

                {/* App Store */}
                <a
                  href="https://apps.apple.com/us/app/iqmath/id6753702778"
                  target="_blank"
                  rel="noreferrer"
                  className="
    group flex items-center gap-3
    h-[48px] sm:h-[54px] md:h-[60px]
    min-w-[160px] sm:min-w-[180px] md:min-w-[200px]
    px-3 sm:px-4 md:px-5
    rounded-xl sm:rounded-2xl
    border border-black/10
    ring-1 ring-white/40
    bg-white/90 hover:bg-white
    shadow-lg shadow-black/15 hover:shadow-black/25
    transition
    hover:-translate-y-[1px]
    active:scale-[0.98]
    w-full sm:w-auto
  "
                >
                  {/* Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.1475 0.75C16.2469 2.01122 15.8492 3.27244 15.0438 4.24338C14.2583 5.22433 13.0751 5.78488 11.8223 5.77487C11.7427 4.54367 12.1504 3.3325 12.9558 2.41161C13.7711 1.4707 14.9146 0.880126 16.1475 0.75ZM20.1292 8.17598C18.6806 9.06488 17.7915 10.623 17.7715 12.3208C17.7715 14.2385 18.9204 15.9663 20.6986 16.7154C20.3589 17.814 19.8495 18.8627 19.1801 19.8016C18.291 21.1399 17.352 22.4483 15.8635 22.4683C15.1551 22.4829 14.6784 22.2802 14.1823 22.0692C13.664 21.8488 13.1244 21.6193 12.277 21.6193C11.382 21.6193 10.8176 21.8551 10.2723 22.0828C9.80114 22.2796 9.34424 22.4705 8.70063 22.4982C7.28205 22.5582 6.20313 21.08 5.27406 19.7516C3.42592 17.045 1.98736 12.1311 3.91543 8.78523C4.82452 7.15725 6.51282 6.11854 8.38095 6.05861C9.18561 6.04161 9.95812 6.35239 10.6347 6.62457C11.1509 6.83223 11.6112 7.01742 11.9873 7.01742C12.3159 7.01742 12.7611 6.84099 13.2807 6.63506C14.1041 6.30877 15.1142 5.90844 16.1432 6.01866C17.7316 6.0686 19.2101 6.86761 20.1292 8.17598Z"
                      fill="black"
                    />
                  </svg>

                  {/* Text */}
                  <span className="leading-tight">
                    <span className="block text-[9px] sm:text-[10px] md:text-[11px] text-black/60">
                      Download on the
                    </span>
                    <span className="block text-[13px] sm:text-[15px] md:text-[16px] font-semibold text-black">
                      App Store
                    </span>
                  </span>
                </a>
              </div>

              {/* Stats (qoldiravering) */}
              <div className="grid grid-cols-3 gap-3 pt-2 sm:gap-4">
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                    <p>8,000</p> <span>+</span>
                  </div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('activeReader')}</div>
                </div>
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                    <p>400</p>
                    <span>+</span>
                  </div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('VideoTutorials')}</div>
                </div>
                <div className="p-4 text-white border rounded-2xl border-white/15 bg-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-1 text-2xl font-extrabold md:text-3xl">
                    <p>4.9</p>
                    <span>⭐</span>
                  </div>
                  <div className="mt-1 text-xs text-white/75 sm:text-sm">{t('ratings')}</div>
                </div>
              </div>
            </div>

            {/* RIGHT / AUTH AREA */}
            <div className="lg:col-span-5" ref={authRef}>
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto lg:sticky lg:top-24">
                {!showAuth ? (
                  <PreAuthCard onStart={openAuthPanel} session={session} />
                ) : (
                  <div className="duration-300 animate-in fade-in slide-in-from-bottom-2">
                    <Auth background={true} />
                    <button
                      onClick={() => setShowAuth(false)}
                      className="w-full mt-3 text-sm text-center transition text-white/70 hover:text-white"
                    >
                      ← {t('back')}
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

function PreAuthCard({ onStart, session }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleEnter = async () => {
    setIsLoading(true)
    try {
      if (session?.role === 'teacher') {
        router.push('/dashboard/teacher/statistics')
      } else if (session?.role === 'parent') {
        router.push('/dashboard/parent/my-children')
      } else {
        router.push('/dashboard/student/subjects')
      }
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  // Loading matnini aniqlash
  const getLoadingText = () => {
    if (isLoading) return <SimpleLoader /> || 'Loading...'
    return t('enter')
  }

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
        {!session ? (
          <>
            <button
              onClick={onStart}
              className="
            mt-6 w-full rounded-[8px]
            bg-[#5D87FF]
            px-5 py-3 font-semibold text-white
            shadow-lg shadow-blue-600/20 transition
            hover:shadow-xl hover:shadow-purple-600/25 active:scale-[0.99]
            "
            >
              {t('authCard.cta')}
            </button>

            <p className="mt-3 text-xs text-center text-white/60"> {t('authCard.cta')}</p>
          </>
        ) : (
          <div className="flex flex-col gap-3 mt-6 sm:flex-row">
            <button
              onClick={handleEnter}
              className={`w-full sm:w-1/2 bg-[#5D87FF] hover:bg-[#4570EA] text-white py-3 rounded-md ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span>{getLoadingText()}</span>
                </div>
              ) : (
                t('enter')
              )}
            </button>
            <button onClick={handleLogout} className="w-full sm:w-1/2 bg-[#EDEDF2] text-black py-3 rounded-md">
              {t('left')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
