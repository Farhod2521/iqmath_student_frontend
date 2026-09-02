import { useTranslation } from 'react-i18next'
import BattlePlayerAvatar from './BattlePlayerAvatar'
import BattleTimer from './BattleTimer'

const PlayerPanel = ({ participant, isMe, total, answered, align }) => {
  const { t } = useTranslation()
  const pct = total ? Math.round(((participant?.score || 0) / total) * 100) : 0

  return (
    <div className={`flex items-center gap-3 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
      <div className="relative">
        <BattlePlayerAvatar name={participant?.name} size={56} ringColor={isMe ? '#6366f1' : '#f43f5e'} />
        {answered ? (
          <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            ✓
          </span>
        ) : null}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate max-w-[120px] sm:max-w-[180px]">
          {isMe ? t('battle.you') : participant?.name || t('battle.searchingOpponent')}
        </p>
        <p className="text-xs text-gray-400">
          {participant?.is_placement ? t('battle.placement') : `⚡ ${participant?.elo ?? '—'} · L${participant?.level ?? '—'}`}
        </p>
        <div className="w-24 h-1.5 mt-1 overflow-hidden bg-gray-100 rounded-full sm:w-32">
          <div
            className={`h-full rounded-full ${isMe ? 'bg-indigo-500' : 'bg-rose-400'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}

const BattleVsHeader = ({ me, opponent, total, myAnswered, opponentAnswered, questionStartedAt, secondsPerQuestion }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-4 bg-white border border-gray-100 rounded-xl sm:p-6">
      <PlayerPanel participant={me} isMe total={total} answered={myAnswered} />

      <div className="flex flex-col items-center gap-2 shrink-0">
        <span className="flex items-center justify-center text-sm font-extrabold text-white rounded-full w-11 h-11 bg-gradient-to-br from-indigo-500 to-rose-500">
          VS
        </span>
        {questionStartedAt ? <BattleTimer startedAt={questionStartedAt} seconds={secondsPerQuestion} /> : null}
      </div>

      <PlayerPanel participant={opponent} total={total} answered={opponentAnswered} align="right" />
    </div>
  )
}

export default BattleVsHeader
