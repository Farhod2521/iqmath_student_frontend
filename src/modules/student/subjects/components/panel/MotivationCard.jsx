import { useTranslation } from 'react-i18next'

const MotivationCard = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-4 p-4 border rounded-2xl border-[#e6e0fa] bg-gradient-to-r from-[#f6f3ff] to-[#efeaff] dark:from-[#2b3648] dark:to-[#252f3f] dark:border-[#374151]">
      <div className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 bg-white/70 dark:bg-white/10">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.6" fill="#7c5cfc" stroke="none" />
        </svg>
      </div>

      <div className="min-w-0">
        <p className="text-[15px] font-bold text-[#1f2a5b] dark:text-white">{t('motivationTitle')}</p>
        <p className="mt-0.5 text-xs text-[#6b7394] dark:text-gray-400">{t('motivationDescription')}</p>
      </div>
    </div>
  )
}

export default MotivationCard
