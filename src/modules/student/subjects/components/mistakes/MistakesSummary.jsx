import { useTranslation } from 'react-i18next'
import { Check, Clock3, FileText, X } from 'lucide-react'
import { GRAY, GREEN, RED, Ring, cardClass, formatDuration } from './utils'

const LegendRow = ({ color, label, value }) => (
  <li className="flex items-center gap-2.5 text-sm">
    <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
    <span className="flex-1 text-[#5B6478] dark:text-gray-300">{label}</span>
    <span className="font-bold text-[#191C1D] dark:text-white">{value}</span>
  </li>
)

const Tile = ({ icon: Icon, iconBg, iconColor, soft, label, value, unit, badge, badgeClass, hint }) => (
  <div
    className="flex flex-col items-center justify-center rounded-2xl px-3 py-4 text-center"
    style={{ backgroundColor: soft }}
  >
    <span
      className="mb-2 flex h-11 w-11 items-center justify-center rounded-full"
      style={{ backgroundColor: iconBg, color: iconColor }}
    >
      <Icon size={22} strokeWidth={2.5} />
    </span>
    <span className="text-sm text-[#5B6478] dark:text-gray-300">{label}</span>
    <span className="mt-1 flex items-baseline gap-1.5">
      <span className="text-2xl font-bold text-[#191C1D] dark:text-white">{value}</span>
      {unit ? <span className="text-base font-semibold text-[#191C1D] dark:text-white">{unit}</span> : null}
      {badge ? <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${badgeClass}`}>{badge}</span> : null}
    </span>
    {hint ? <span className="mt-0.5 text-xs text-[#8A93A6]">{hint}</span> : null}
  </div>
)

/** Umumiy natija (halqa + legenda) va 4 ta ko'rsatkich */
function MistakesSummary({ attempt }) {
  const { t } = useTranslation()
  const total = attempt?.total_answers || 0
  const correct = attempt?.correct_answers || 0
  const wrong = attempt?.wrong_answers || 0
  const unanswered = attempt?.unanswered_answers || 0
  const score = Math.round(attempt?.score || 0)
  const pct = (value) => (total ? `${Math.round((value * 100) / total)}%` : '0%')
  const unit = t('mistakes.pcs')

  return (
    <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[minmax(0,5fr)_minmax(0,9fr)]">
      <div className={`${cardClass} flex items-center gap-5 p-5`}>
        <Ring value={score} size={132} stroke={9} gradient={['#F59E0B', '#EF4444']}>
          <span className="text-3xl font-bold text-[#191C1D] dark:text-white">{score}%</span>
        </Ring>
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-[#191C1D] dark:text-white">{t('mistakes.overall')}</p>
          <p className="mb-3 text-sm text-[#8A93A6]">{t('mistakes.ofQuestions', { count: total })}</p>
          <ul className="space-y-2">
            <LegendRow color={GREEN} label={t('mistakes.correctAnswers')} value={correct} />
            <LegendRow color={RED} label={t('mistakes.wrongAnswers')} value={wrong} />
            <LegendRow color={GRAY} label={t('mistakes.unanswered')} value={unanswered} />
          </ul>
        </div>
      </div>

      <div className={`${cardClass} grid grid-cols-2 gap-3 p-3 lg:grid-cols-4`}>
        <Tile
          icon={FileText}
          iconBg="#DCE7FF"
          iconColor="#2563EB"
          soft="#F1F5FF"
          label={t('mistakes.total')}
          value={total}
          unit={unit}
        />
        <Tile
          icon={Check}
          iconBg="#22C55E"
          iconColor="#fff"
          soft="#EFFBF3"
          label={t('mistakes.correctAnswers')}
          value={correct}
          unit={unit}
          badge={pct(correct)}
          badgeClass="bg-[#DCFCE7] text-[#15803D]"
        />
        <Tile
          icon={X}
          iconBg="#EF4444"
          iconColor="#fff"
          soft="#FEF2F2"
          label={t('mistakes.wrongAnswers')}
          value={wrong}
          unit={unit}
          badge={pct(wrong)}
          badgeClass="bg-[#FEE2E2] text-[#DC2626]"
        />
        <Tile
          icon={Clock3}
          iconBg="#DCE7FF"
          iconColor="#2563EB"
          soft="#F1F5FF"
          label={t('mistakes.timeSpent')}
          value={formatDuration(attempt?.duration_seconds, t) || '—'}
          hint={attempt?.date}
        />
      </div>
    </div>
  )
}

export default MistakesSummary
