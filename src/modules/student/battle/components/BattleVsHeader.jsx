import { useTranslation } from 'react-i18next'
import { Layers, ListChecks, Clock3 } from 'lucide-react'
import BattlePlayerAvatar from './BattlePlayerAvatar'
import BattleLevelBadge, { LEVEL_COLORS } from './BattleLevelBadge'
import BattleTimer from './BattleTimer'

// Never reveal correctness mid-match — only whether each side has
// submitted an answer for the current question. Final scores are shown
// exclusively in the result screen once the battle ends.
const PlayerPanel = ({ participant, isMe, answered, align }) => {
  const { t } = useTranslation()
  const ringColor = participant?.is_placement ? '#9ca3af' : LEVEL_COLORS[participant?.level] || '#9ca3af'

  return (
    <div className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <div className="relative shrink-0">
        <BattlePlayerAvatar name={participant?.name} size={60} ringColor={ringColor} />
        {answered ? (
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
            ✓
          </span>
        ) : null}
      </div>
      <div className="min-w-0">
        <div className={`flex items-center gap-1.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
          <p className="text-sm font-bold text-gray-900 truncate max-w-[100px] sm:max-w-[160px]">
            {isMe ? t('battle.you') : participant?.name || t('battle.searchingOpponent')}
          </p>
          {!participant?.is_placement ? <BattleLevelBadge level={participant?.level} size="sm" /> : null}
        </div>
        <p className="text-xs text-gray-400">
          {participant?.is_placement ? t('battle.placement') : `⚡ ${participant?.elo ?? '—'}`}
        </p>
        <p className={`mt-1 text-[11px] font-semibold ${answered ? 'text-emerald-500' : 'text-gray-300'}`}>
          {answered ? t('battle.hasAnswered') : t('battle.thinking')}
        </p>
      </div>
    </div>
  )
}

const InfoPill = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-gray-500 rounded-full bg-gray-50">
    {icon}
    {label}
  </span>
)

const BattleVsHeader = ({
  me,
  opponent,
  total,
  myAnswered,
  opponentAnswered,
  questionStartedAt,
  secondsPerQuestion,
  room,
  onTimerExpire
}) => {
  const { t } = useTranslation()

  return (
    <div className="overflow-hidden bg-white border border-gray-100 rounded-2xl">
      <div className="flex items-center justify-between gap-2 p-4 sm:p-6">
        <PlayerPanel participant={me} isMe answered={myAnswered} />

        <div className="flex flex-col items-center gap-2 shrink-0">
          <span className="flex items-center justify-center text-sm font-extrabold text-white rounded-full shadow-lg w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 shadow-indigo-100">
            VS
          </span>
          {questionStartedAt ? (
            <BattleTimer startedAt={questionStartedAt} seconds={secondsPerQuestion} onExpire={onTimerExpire} />
          ) : null}
        </div>

        <PlayerPanel participant={opponent} answered={opponentAnswered} align="right" />
      </div>

      {room ? (
        <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-t border-gray-50 bg-gray-50/50 sm:px-6">
          <InfoPill icon={<Layers size={12} />} label={(room.subjects || []).join(', ') || '—'} />
          <InfoPill icon={<ListChecks size={12} />} label={`${total} ${t('battle.questionsUnit')}`} />
          <InfoPill icon={<Clock3 size={12} />} label={`${secondsPerQuestion} ${t('battle.secondsUnit')}`} />
        </div>
      ) : null}
    </div>
  )
}

export default BattleVsHeader
