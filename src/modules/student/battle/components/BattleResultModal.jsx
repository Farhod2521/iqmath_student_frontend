import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Trophy, Handshake, Frown, Target } from 'lucide-react'
import BattleLevelBadge from './BattleLevelBadge'

const RESULT_META = {
  win: { icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50', labelKey: 'battle.youWon' },
  loss: { icon: Frown, color: 'text-gray-400', bg: 'bg-gray-50', labelKey: 'battle.youLost' },
  draw: { icon: Handshake, color: 'text-indigo-500', bg: 'bg-indigo-50', labelKey: 'battle.draw' }
}

const BattleResultModal = ({ result, myParticipantId, questionCount }) => {
  const { t } = useTranslation()
  const router = useRouter()

  if (!result) return null
  const mine = result.results?.find((r) => r.participant_id === myParticipantId)
  const opponentResult = result.results?.find((r) => r.participant_id !== myParticipantId)
  if (!mine) return null

  const meta = RESULT_META[mine.result] || RESULT_META.draw
  const Icon = meta.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-sm p-6 text-center bg-white rounded-2xl">
        <div className={`w-16 h-16 rounded-full ${meta.bg} flex items-center justify-center mx-auto mb-4`}>
          <Icon className={meta.color} size={32} />
        </div>
        <h2 className="mb-1 text-xl font-extrabold text-gray-900">{t(meta.labelKey)}</h2>
        <p className="mb-4 text-sm text-gray-400">
          {mine.score} / {questionCount} {t('battle.correctAnswers')}
        </p>

        {mine.still_calibrating ? (
          <div className="flex flex-col items-center gap-2 p-4 mb-6 bg-indigo-50 rounded-xl">
            <Target size={20} className="text-indigo-500" />
            <p className="text-sm font-semibold text-indigo-600">
              {t('battle.placementProgress', { played: mine.matches_played, total: mine.placement_matches_total })}
            </p>
            <p className="text-xs text-indigo-400">{t('battle.placementHint')}</p>
          </div>
        ) : mine.is_placement_reveal ? (
          <div className="flex flex-col items-center gap-2 p-4 mb-6 bg-emerald-50 rounded-xl">
            <p className="text-sm font-semibold text-emerald-600">{t('battle.placementComplete')}</p>
            <div className="flex items-center gap-2">
              <BattleLevelBadge level={mine.level} />
              <span className="text-lg font-extrabold text-gray-800">{mine.elo_after} ELO</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-gray-400">ELO</span>
            <span
              className={`text-lg font-extrabold ${
                mine.elo_change > 0 ? 'text-emerald-500' : mine.elo_change < 0 ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {mine.elo_change > 0 ? '+' : ''}
              {mine.elo_change}
            </span>
            <span className="text-xs text-gray-400">
              ({mine.elo_before} → {mine.elo_after})
            </span>
          </div>
        )}

        {opponentResult ? (
          <p className="mb-6 text-xs text-gray-400">
            {t('battle.opponentScore')}: {opponentResult.score} / {questionCount}
          </p>
        ) : null}

        <div className="flex gap-3">
          <button
            onClick={() => router.push('/dashboard/student/battle')}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-indigo-500 rounded-xl"
          >
            {t('battle.playAgain')}
          </button>
          <button
            onClick={() => router.push('/dashboard/student/battle/leaderboard')}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl"
          >
            {t('battle.viewLeaderboard')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BattleResultModal
