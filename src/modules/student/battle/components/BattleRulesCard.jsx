import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'
import qoidaImg from '@/assets/images/battle/qoida.png'

const BattleRulesCard = () => {
  const { t } = useTranslation()

  return (
    <div className="relative p-5 overflow-hidden bg-white border border-gray-100 rounded-2xl">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck size={18} className="text-emerald-500" />
        <p className="text-sm font-bold text-gray-700">{t('battle.rules')}</p>
      </div>

      <ul className="relative z-10 space-y-2.5 text-xs text-gray-500 max-w-[65%]">
        <li className="flex items-start gap-1.5">
          <span className="text-emerald-500">✓</span> {t('battle.ruleFairPlay')}
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-emerald-500">✓</span> {t('battle.ruleAnswerInTime')}
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-emerald-500">✓</span> {t('battle.ruleDisconnect')}
        </li>
        <li className="flex items-start gap-1.5">
          <span className="text-emerald-500">✓</span> {t('battle.ruleNoAbuse')}
        </li>
      </ul>

      <img
        src={qoidaImg.src}
        alt=""
        className="absolute w-24 h-24 pointer-events-none select-none sm:w-28 sm:h-28 -right-2 top-2 opacity-90"
      />
    </div>
  )
}

export default BattleRulesCard
