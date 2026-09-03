import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TrendingUp, Target } from 'lucide-react'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'
import BattleLevelBadge, { LEVEL_COLORS } from './BattleLevelBadge'

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
      <div className="flex flex-col justify-center h-full p-4 bg-white border border-gray-100 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-indigo-500" />
          <p className="text-xs font-bold text-gray-700">{t('battle.levelWidgetTitle')}</p>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center text-lg font-extrabold text-gray-400 bg-gray-100 rounded-full shrink-0 w-11 h-11">
            ?
          </div>
          <div>
            <p className="text-xl font-extrabold leading-none text-gray-900">{t('battle.placement')}</p>
            <p className="mt-1 text-xs text-gray-400">{t('battle.placementProgress', { played: rating.matches_played, total })}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => {
            const played = i < rating.matches_played
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all ${played ? 'bg-indigo-500' : 'bg-gray-100'}`}
              />
            )
          })}
        </div>
      </div>
    )
  }

  const progress = rating.level_progress
  const color = LEVEL_COLORS[rating.level] || '#9ca3af'
  const isTopLevel = !progress || progress.pct_to_next === null

  return (
    <div className="flex flex-col justify-center h-full p-4 bg-white border border-gray-100 rounded-2xl">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={16} className="text-indigo-500" />
        <p className="text-xs font-bold text-gray-700">{t('battle.levelWidgetTitle')}</p>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center text-lg font-extrabold text-white rounded-full shrink-0 w-11 h-11"
          style={{ background: color, boxShadow: `0 0 0 3px ${color}22` }}
        >
          {rating.level}
        </div>
        <div>
          <p className="text-2xl font-extrabold leading-none text-gray-900">{rating.elo}</p>
          <p className="mt-1 text-xs text-gray-400">
            {rating.wins}W / {rating.losses}L / {rating.draws}D
          </p>
        </div>
      </div>

      <div className="h-2 overflow-hidden bg-gray-100 rounded-full mb-1.5">
        <div
          className="h-full transition-all rounded-full"
          style={{ width: `${isTopLevel ? 100 : progress.pct_to_next}%`, background: color }}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-gray-400">
        <span>{isTopLevel ? t('battle.maxLevelReached') : `${progress.pct_to_next}%`}</span>
        {!isTopLevel ? (
          <span>
            +{progress.ceiling - rating.elo + 1} {t('battle.toNextLevel')}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default BattleRatingWidget
