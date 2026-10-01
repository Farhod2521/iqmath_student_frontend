import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, Target } from 'lucide-react'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'

// Kartaning foni — tog'lar va o'sish ustunlari tasviri, o'z holatida (ustiga qatlam qo'yilmaydi)
const WidgetShell = ({ icon, title, children }) => (
  <div className="relative h-full min-h-[230px] overflow-hidden rounded-2xl sm:min-h-[260px] border border-[#E6ECFA] bg-[#EEF4FF] dark:border-[#2A3547]">
    <img
      src="/images/battle-back.webp"
      alt=""
      className="absolute inset-0 h-full w-full select-none object-cover object-right pointer-events-none"
    />
    <div className="relative z-10 flex h-full flex-col justify-center p-6 sm:max-w-[58%] sm:p-7">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <p className="text-sm font-bold text-[#0F1B3D] dark:text-white">{title}</p>
      </div>
      {children}
    </div>
  </div>
)

const BattleRatingWidget = () => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(null)

  useEffect(() => {
    request
      .get(URLS.battleRatingMe)
      .then((res) => setRating(res?.data))
      .catch(() => {})
  }, [])

  if (!rating) return null

  if (rating.is_in_placement) {
    const total = rating.matches_played + rating.matches_left_for_placement

    return (
      <WidgetShell icon={<Target size={18} className="text-[#3B6FF6]" />} title={t('battle.levelWidgetTitle')}>
        <div className="mb-4 flex items-center gap-3.5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-xl font-extrabold text-[#A0A8BA] shadow-[0_6px_16px_-6px_rgba(59,111,246,0.45)] ring-4 ring-white/70">
            ?
          </div>
          <div>
            <p className="text-2xl font-extrabold leading-none text-[#0F1B3D] dark:text-white">{t('battle.placement')}</p>
            <p className="mt-1.5 text-xs font-medium text-[#6B7385]">
              {t('battle.placementProgress', { played: rating.matches_played, total })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${i < rating.matches_played ? 'bg-[#3B6FF6]' : 'bg-white/80'}`}
            />
          ))}
        </div>
      </WidgetShell>
    )
  }

  const progress = rating.level_progress
  const isTopLevel = !progress || progress.pct_to_next === null

  return (
    <WidgetShell icon={<TrendingUp size={18} className="text-[#3B6FF6]" />} title={t('battle.levelWidgetTitle')}>
      <div className="mb-4 flex items-center gap-3.5">
        <div
          className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border-[3px] border-white text-2xl font-extrabold text-white"
          style={{
            background: 'linear-gradient(145deg, #6FA0FF 0%, #3B6FF6 45%, #1D4ED8 100%)',
            boxShadow: '0 8px 18px -6px rgba(37, 99, 235, 0.7), inset 0 2px 3px rgba(255,255,255,0.5)'
          }}
        >
          {rating.level}
        </div>
        <div>
          <p className="flex items-baseline gap-1.5 leading-none">
            <span className="text-[34px] font-extrabold tracking-tight text-[#0F1B3D] dark:text-white">{rating.elo}</span>
            <span className="text-lg font-extrabold text-[#2563EB]">XP</span>
          </p>
          <p className="mt-1.5 text-xs font-medium text-[#6B7385]">
            {rating.wins}W / {rating.losses}L / {rating.draws}D
          </p>
        </div>
      </div>

      <div className="mb-2 h-3 overflow-hidden rounded-full border border-[#D6E2FF] bg-white shadow-[inset_0_1px_2px_rgba(15,27,61,0.08)]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${isTopLevel ? 100 : progress.pct_to_next}%`,
            background: 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 55%, #3B82F6 100%)'
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-medium text-[#6B7385]">
        <span className="font-bold text-[#2563EB]">{isTopLevel ? t('battle.maxLevelReached') : `${progress.pct_to_next}%`}</span>
        {!isTopLevel ? (
          <span>
            <b className="font-bold text-[#0F1B3D] dark:text-white">+{progress.ceiling - rating.elo + 1} XP</b>{' '}
            {t('battle.toNextLevel')}
          </span>
        ) : null}
      </div>
    </WidgetShell>
  )
}

export default BattleRatingWidget
