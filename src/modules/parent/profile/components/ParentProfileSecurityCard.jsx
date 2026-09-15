import { useTranslation } from 'react-i18next'
import { ShieldCheck } from 'lucide-react'

const ParentProfileSecurityCard = () => {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
          <ShieldCheck size={16} />
        </span>
        <h3 className="text-base font-bold text-[#191C1D]">{t('parentProfile.security')}</h3>
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#E7F8EF] p-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0D875E] text-white">
          <ShieldCheck size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#0D875E]">{t('parentProfile.accountSecureTitle')}</p>
          <p className="text-xs text-[#0D875E]/80">{t('parentProfile.accountSecureDesc')}</p>
        </div>
      </div>
    </div>
  )
}

export default ParentProfileSecurityCard
