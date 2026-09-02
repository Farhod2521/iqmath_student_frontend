import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swords, Target, Flame } from 'lucide-react'
import { URLS } from '@/constants/url'
import { request } from '@/services/api'

const Tile = ({ icon, value, label }) => (
  <div className="flex flex-col items-center gap-1 p-3 text-center bg-gray-50 rounded-xl">
    <div className="mb-1">{icon}</div>
    <p className="text-lg font-extrabold text-gray-800">{value}</p>
    <p className="text-[11px] text-gray-400 leading-tight">{label}</p>
  </div>
)

const BattleStatsCard = () => {
  const { t } = useTranslation()
  const [rating, setRating] = useState(null)

  useEffect(() => {
    request
      .get(URLS.battleRatingMe)
      .then((res) => setRating(res?.data))
      .catch(() => {})
  }, [])

  const total = rating ? rating.wins + rating.losses + rating.draws : 0
  const winRate = total ? Math.round((rating.wins / total) * 100) : 0

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Target size={18} className="text-indigo-500" />
        <p className="text-sm font-bold text-gray-700">{t('battle.statsWidgetTitle')}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Tile icon={<Swords size={18} className="text-indigo-500" />} value={total} label={t('battle.totalMatches')} />
        <Tile icon={<Target size={18} className="text-emerald-500" />} value={`${winRate}%`} label={t('battle.winRate')} />
        <Tile icon={<Flame size={18} className="text-amber-500" />} value={rating?.win_streak ?? 0} label={t('battle.winStreak')} />
      </div>
    </div>
  )
}

export default BattleStatsCard
