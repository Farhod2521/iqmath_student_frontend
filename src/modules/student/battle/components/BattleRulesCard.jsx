import { useTranslation } from 'react-i18next'
import { Check, ShieldCheck } from 'lucide-react'

const RULES = ['battle.ruleFairPlay', 'battle.ruleAnswerInTime', 'battle.ruleDisconnect', 'battle.ruleNoAbuse']

const BattleRulesCard = () => {
  const { t } = useTranslation()

  return (
    <div className="relative h-full min-h-[190px] overflow-hidden rounded-2xl border border-[#E6ECFA] bg-gradient-to-br from-white via-white to-[#EAF1FF] p-5 sm:p-6 dark:border-[#2A3547] dark:from-[#1B2330] dark:via-[#1B2330] dark:to-[#22304A]">
      <div className="relative z-10 mb-4 flex items-center gap-2">
        <ShieldCheck size={20} className="text-[#3B6FF6]" />
        <p className="text-sm font-bold text-[#0F1B3D] dark:text-white">{t('battle.rules')}</p>
      </div>

      <ul className="relative z-10 max-w-[62%] space-y-3">
        {RULES.map((key) => (
          <li key={key} className="flex items-start gap-2 text-[13px] font-medium leading-snug text-[#3F4A63] dark:text-gray-300">
            <Check size={16} strokeWidth={3} className="mt-px shrink-0 text-[#22C55E]" />
            {t(key)}
          </li>
        ))}
      </ul>

      {/* Qalqon rasmi — oq foni karta foniga singib ketadi (multiply) */}
      <img
        src="/images/battle-qoida.webp"
        alt=""
        className="pointer-events-none absolute -right-3 top-1/2 w-[46%] max-w-[220px] -translate-y-1/2 select-none mix-blend-multiply dark:opacity-80 dark:mix-blend-normal"
      />
    </div>
  )
}

export default BattleRulesCard
