import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { ArrowLeftRight, UserRound } from 'lucide-react'
import { returnToParent } from '@/shared/utils/childSwitch'

/** Ota-ona farzand profiliga o'tganda tepada chiqadigan panel: "Ota-ona hisobiga qaytish" */
const ActingParentBar = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const parent = session?.actingParent
  if (!parent) return null

  const goBack = async () => {
    setLoading(true)
    try {
      await returnToParent()
    } catch {
      toast.error(t('childSwitch.backError'))
      setLoading(false)
    }
  }

  return (
    <div className="flex shrink-0 items-center gap-3 border-b border-[#BFD3FF] bg-gradient-to-r from-[#EAF1FF] to-[#F5F8FF] px-3 py-2 sm:px-5">
      <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm sm:flex">
        <UserRound size={17} />
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[13px] font-bold text-[#0B1B3F] sm:text-sm">
          {t('childSwitch.banner', { name: session?.full_name || '' })}
        </p>
        <p className="hidden truncate text-xs text-[#64748B] sm:block">
          {t('childSwitch.bannerSub')}: {parent.full_name}
        </p>
      </div>
      <button
        type="button"
        onClick={goBack}
        disabled={loading}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-xl bg-[#2563EB] px-3 text-[13px] font-semibold text-white transition hover:bg-[#1D4ED8] disabled:opacity-60 sm:px-4 sm:text-sm"
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <ArrowLeftRight size={16} />
        )}
        <span className="sm:hidden">{t('childSwitch.backShort')}</span>
        <span className="hidden sm:inline">{t('childSwitch.back')}</span>
      </button>
    </div>
  )
}

export default ActingParentBar
