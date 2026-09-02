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
    const pct = total ? Math.round((rating.matches_played / total) * 100) : 0

    return (
      <div className="p-5 bg-white border border-gray-100 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Target size={18} className="text-indigo-500" />
          <p className="text-sm font-bold text-gray-700">{t('battle.levelWidgetTitle')}</p>
        </div>
        <p className="mb-1 text-2xl font-extrabold text-gray-800">{t('battle.placement')}</p>
        <p className="mb-4 text-xs text-gray-400">
          {t('battle.placementProgress', { played: rating.matches_played, total: rating.matches_played + rating.matches_left_for_placement })}
        </p>
        <div className="h-2 overflow-hidden bg-gray-100 rounded-full">
          <div className="h-full transition-all bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    )
  }

  const progress = rating.level_progress
  const color = LEVEL_COLORS[rating.level] || '#9ca3af'
  const isTopLevel = !progress || progress.pct_to_next === null

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-indigo-500" />
        <p className="text-sm font-bold text-gray-700">{t('battle.levelWidgetTitle')}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div
          className="flex items-center justify-center w-16 h-16 text-2xl font-extrabold text-white rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 0 4px ${color}22` }}
        >
          {rating.level}
        </div>
        <div>
          <p className="text-3xl font-extrabold leading-none text-gray-900">{rating.elo}</p>
          <p className="mt-1 text-xs text-gray-400">
            {rating.wins}W / {rating.losses}L / {rating.draws}D
          </p>
        </div>
      </div>

      <div className="h-2.5 overflow-hidden bg-gray-100 rounded-full mb-2">
        <div
          className="h-full transition-all rounded-full"
          style={{ width: `${isTopLevel ? 100 : progress.pct_to_next}%`, background: color }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400">
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
