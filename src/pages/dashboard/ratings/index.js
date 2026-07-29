import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { request } from '@/services/api'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { RolesList } from '@/layout/libs/menulist'
import { Coins } from 'lucide-react'

const COUNTS = [10, 50, 100, 1000]

const AVATAR_COLORS = [
  'from-blue-400 to-blue-600',
  'from-violet-400 to-violet-600',
  'from-pink-400 to-pink-600',
  'from-emerald-400 to-emerald-600',
  'from-cyan-400 to-cyan-600',
  'from-indigo-400 to-indigo-600',
  'from-rose-400 to-rose-600',
  'from-teal-400 to-teal-600'
]

const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() || '?'
const getAvatarColor = (name) => AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length]

const InitialAvatar = ({ name, className, style }) => (
  <div
    style={style}
    className={`flex items-center justify-center shrink-0 rounded-full bg-gradient-to-br font-bold text-white ${getAvatarColor(
      name
    )} ${className}`}
  >
    {getInitial(name)}
  </div>
)

const PODIUM_STYLES = {
  1: {
    order: 'order-2',
    winner: true,
    tierKey: 'tierGold',
    medalColor: '#fbbf24',
    medalSize: 68,
    avatarBorder: '#fbbf24',
    barTrack: '#f2f4f6',
    barFill: 'linear-gradient(90deg, #fde68a, #d97706)',
    tierTextColor: '#92700a',
    scoreBg: 'rgba(251,191,36,0.08)',
    scoreBorder: 'rgba(251,191,36,0.35)',
    pedestalBars: 2
  },
  2: {
    order: 'order-1',
    winner: false,
    tierKey: 'tierSilver',
    medalColor: '#a8adb5',
    medalSize: 52,
    avatarBorder: '#cbd5e1',
    barTrack: '#f2f4f6',
    barFill: '#94a3b8',
    tierTextColor: '#8a8f98',
    scoreBg: 'transparent',
    scoreBorder: 'rgba(0,0,0,0.06)',
    pedestalBars: 1
  },
  3: {
    order: 'order-3',
    winner: false,
    tierKey: 'tierBronze',
    medalColor: '#bc6c25',
    medalSize: 52,
    avatarBorder: '#dba36c',
    barTrack: '#f2f4f6',
    barFill: '#bc6c25',
    tierTextColor: '#bc6c25',
    scoreBg: 'transparent',
    scoreBorder: 'rgba(0,0,0,0.06)',
    pedestalBars: 1
  }
}

const handleTilt = (e) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const rotateX = (y - rect.height / 2) / 30
  const rotateY = (rect.width / 2 - x) / 30
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const resetTilt = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
}

const StudentTopLeaderboard = () => {
  const session = useSession()
  const { t, i18n } = useTranslation()
  const [type, setType] = useState('coin')
  const [topCount, setTopCount] = useState(10)
  const [list, setList] = useState([])
  const goldCardRef = useRef(null)

  const { mutate, isLoading } = usePostQuery({
    hideSuccessToast: true
  })

  const TYPES = [
    { label: t('topBall'), value: 'score' },
    { label: t('topTanga'), value: 'coin' },
    { label: t('topSum'), value: 'som' }
  ]

  useEffect(() => {
    mutate(
      {
        url: URLS.studentTop,
        attributes: {
          type,
          top_count: topCount
        }
      },
      {
        onSuccess: (res) => {
          setList(res?.data?.results || [])
        }
      }
    )
  }, [type, topCount])

  const getValueByType = (item) => {
    if (type === 'score') return item.score
    if (type === 'coin') return item.coin
    if (type === 'som') return item.som
    return 0
  }

  const getUnitByType = () => {
    if (type === 'score') return <span className="lowercase">{t('ball')}</span>
    if (type === 'coin') return t('tanga')
    if (type === 'som') return <span className="lowercase">{t('sum')}</span>
    return ''
  }

  const getClassLabel = (item) => (i18n.language === 'ru' ? item.class_ru : item.class_uz) || ''

  function downloadCertificate(student_id) {
    if (!student_id) return
    request
      .post(
        URLS.downloadCertificate,
        {
          student_id
        },
        { responseType: 'blob' }
      )
      .then((res) => {
        if (res.status !== 200 || !res.data) return
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate_file.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((err) => {
        toast.error(err?.message || err?.data?.message || t('downloadCertificateError'))
      })
  }

  const canDownloadCertificate = session?.data?.role !== RolesList.STUDENT && session?.data?.role !== RolesList.PARENT

  const top3 = list.slice(0, 3)
  const rest = list.slice(3)
  const maxTop3Value = Math.max(1, ...top3.map((item) => getValueByType(item) || 0))

  // Winner card sparkle flourish — mirrors the reference design's particle effect.
  useEffect(() => {
    const el = goldCardRef.current
    if (!el) return

    const interval = setInterval(() => {
      const sparkle = document.createElement('span')
      sparkle.textContent = 'star'
      sparkle.className = 'material-symbols-outlined'
      sparkle.style.position = 'absolute'
      sparkle.style.pointerEvents = 'none'
      sparkle.style.zIndex = '20'
      sparkle.style.fontSize = `${Math.random() * 12 + 8}px`
      sparkle.style.color = ['#fbbf24', '#fde68a', '#ffffff'][Math.floor(Math.random() * 3)]
      sparkle.style.fontVariationSettings = "'FILL' 1"
      sparkle.style.left = `${Math.random() * el.offsetWidth}px`
      sparkle.style.top = `${Math.random() * el.offsetHeight}px`
      sparkle.style.opacity = '0'
      el.appendChild(sparkle)

      sparkle.animate(
        [
          { opacity: 0, transform: 'scale(0) rotate(0deg)' },
          { opacity: 0.8, transform: 'scale(1.2) rotate(180deg)' },
          { opacity: 0, transform: 'scale(0.5) translateY(-30px) rotate(360deg)' }
        ],
        { duration: 2500, easing: 'ease-out' }
      ).onfinish = () => sparkle.remove()
    }, 1000)

    return () => clearInterval(interval)
  }, [top3.length])

  return (
    <LayoutAdmin>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="py-2">
        <HeaderTitle title={t('studentRating')} />
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-5">
        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg sm:w-auto"
          >
            {TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={topCount}
            onChange={(e) => setTopCount(Number(e.target.value))}
            className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg sm:w-auto"
          >
            {COUNTS.map((n) => (
              <option key={n} value={n}>
                Top {n}
              </option>
            ))}
          </select>

          {session?.data?.role === RolesList.STUDENT ? (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
              onClick={() => downloadCertificate(session?.data?.id)}
            >
              {t('downloadCertificate')}
            </button>
          ) : null}
        </div>

        {isLoading ? (
          <div className="py-10 text-center text-gray-400">Yuklanmoqda...</div>
        ) : (
          <>
            {/* Podium */}
            {top3.length > 0 ? (
              <div className="flex items-end justify-center gap-4 pb-6 mb-6 border-b border-gray-100 sm:gap-6">
                {top3.map((item, index) => {
                  const rank = index + 1
                  const style = PODIUM_STYLES[rank]
                  const value = getValueByType(item) || 0
                  const barPct = Math.max(6, Math.round((value / maxTop3Value) * 100))
                  const isWinner = style.winner

                  return (
                    <div
                      key={item.student_id}
                      className={`relative flex flex-col items-center transition-transform duration-500 hover:-translate-y-1 ${
                        style.order
                      } ${isWinner ? 'w-32 sm:w-40 z-10 rating-animate-float' : 'w-28 sm:w-32'}`}
                    >
                      <div
                        ref={isWinner ? goldCardRef : undefined}
                        onMouseMove={handleTilt}
                        onMouseLeave={resetTilt}
                        className={`rating-glass-card relative w-full text-center transition-transform ${
                          isWinner ? 'rating-luminous-gold rounded-[1.5rem] p-4 sm:p-5' : 'rounded-xl p-3 sm:p-4'
                        }`}
                      >
                        {/* Medal badge */}
                        <div
                          className={`absolute rating-medal-icon ${
                            isWinner ? '-top-7 -left-5 sm:-top-8 sm:-left-6' : '-top-5 -left-3 sm:-top-6 sm:-left-4'
                          }`}
                        >
                          <div
                            className="relative flex items-center justify-center"
                            style={{ width: style.medalSize, height: style.medalSize }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: style.medalSize, color: style.medalColor, fontVariationSettings: "'FILL' 1" }}
                            >
                              military_tech
                            </span>
                          </div>
                        </div>

                        {/* Avatar */}
                        <div className="relative inline-block mt-1 mb-2 sm:mb-3">
                          <InitialAvatar
                            name={item.full_name}
                            className={isWinner ? 'w-16 h-16 sm:w-20 sm:h-20 text-xl' : 'w-14 h-14 sm:w-16 sm:h-16 text-base'}
                            style={{ border: `3px solid ${style.avatarBorder}` }}
                          />
                          {isWinner ? (
                            <div
                              className="absolute rounded-full pointer-events-none -inset-2 animate-spin-slow"
                              style={{ border: `2px dashed ${style.avatarBorder}66` }}
                            />
                          ) : null}
                        </div>

                        <h2 className={`font-bold text-gray-900 ${isWinner ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                          {item.full_name}
                        </h2>
                        {getClassLabel(item) ? (
                          <p className={`text-gray-400 text-[11px] ${isWinner ? 'mb-3' : 'mb-2'}`}>{getClassLabel(item)}</p>
                        ) : null}

                        {/* Progress */}
                        <div
                          className={`w-full rounded-full overflow-hidden mb-1.5 ${isWinner ? 'h-2' : 'h-1.5'}`}
                          style={{ background: style.barTrack }}
                        >
                          <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: style.barFill }} />
                        </div>
                        <div
                          className={`flex items-center justify-between font-bold uppercase tracking-widest ${
                            isWinner ? 'text-[9px] mb-3' : 'text-[8px] mb-2'
                          }`}
                          style={{ color: style.tierTextColor }}
                        >
                          <span>{t(style.tierKey)}</span>
                          <span>{getUnitByType()}</span>
                        </div>

                        {/* Score */}
                        <div
                          className={`rating-score-ring relative inline-flex items-center gap-1.5 rounded-lg font-extrabold text-gray-900 ${
                            isWinner ? 'py-1.5 px-3 text-sm' : 'py-1 px-2.5 text-xs'
                          }`}
                          style={{ background: style.scoreBg, borderColor: style.scoreBorder }}
                        >
                          <Coins size={isWinner ? 14 : 12} color={style.tierTextColor} />
                          <span>
                            {value.toLocaleString()} {getUnitByType()}
                          </span>
                        </div>
                      </div>

                      {/* Podium base */}
                      <div
                        className={`flex flex-col items-center justify-center gap-1 w-full mt-2 rating-podium-base rounded-t-xl ${
                          isWinner ? 'h-16' : rank === 2 ? 'h-11' : 'h-8'
                        }`}
                      >
                        {Array.from({ length: style.pedestalBars }).map((_, i) => (
                          <div key={i} className="rounded-full bg-white/50" style={{ width: i === 0 ? 44 : 30, height: 4 }} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* Rest of the list */}
            {rest.length > 0 ? (
              <>
                <p className="mb-2 text-xs font-bold tracking-wider text-gray-400 uppercase">{t('otherParticipants')}</p>
                <div className="divide-y divide-gray-100">
                  {rest.map((item, index) => (
                    <div key={item.student_id} className="flex items-center gap-3 py-3">
                      <span className="w-5 text-sm font-semibold text-center text-gray-400 shrink-0">{index + 4}</span>
                      <InitialAvatar name={item.full_name} className="w-9 h-9 text-sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.full_name}</p>
                        {getClassLabel(item) ? (
                          <p className="text-xs text-gray-400 truncate">{getClassLabel(item)}</p>
                        ) : null}
                      </div>
                      {canDownloadCertificate ? (
                        <button
                          className="px-2 py-1 text-xs text-white bg-green-500 rounded-lg shrink-0"
                          onClick={() => downloadCertificate(item?.student_id)}
                        >
                          {t('downloadCertificate')}
                        </button>
                      ) : null}
                      <span className="flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full shrink-0 text-amber-600 bg-amber-50">
                        <Coins size={14} />
                        {getValueByType(item)?.toLocaleString()} {getUnitByType()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {!list.length ? <div className="py-10 text-center text-gray-400">{t('noData')}</div> : null}
          </>
        )}
      </div>

      <style jsx>{`
        .rating-glass-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow: 0 10px 40px -12px rgba(0, 0, 0, 0.08);
        }
        .rating-luminous-gold {
          box-shadow: 0 0 60px rgba(251, 191, 36, 0.25);
          border: 1px solid rgba(251, 191, 36, 0.4);
        }
        .rating-podium-base {
          background: linear-gradient(180deg, #f2f4f6 0%, #eceef0 100%);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }
        .rating-score-ring {
          border: 1px solid;
        }
        .animate-spin-slow {
          animation: rating-spin 12s linear infinite;
        }
        @keyframes rating-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes rating-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .rating-animate-float {
          animation: rating-float 5s ease-in-out infinite;
        }
        :global(.material-symbols-outlined) {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </LayoutAdmin>
  )
}

export default StudentTopLeaderboard
