import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { TriangleAlert, UserMinus } from 'lucide-react'
import { request } from '@/services/api'

/** Farzandni ota-ona ro'yxatidan chiqarishni tasdiqlash oynasi */
const RemoveChildModal = ({ child, onClose, onDone }) => {
  const { t } = useTranslation()
  const c = (key, opts) => t(`childSwitch.${key}`, opts)
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!child || !mounted) return null
  const noPhone = child.has_phone === false

  const remove = async () => {
    setLoading(true)
    try {
      await request.delete(`https://api.iqmath.uz/api/v1/auth/parent/children/${child.id}/`)
      toast.success(c('removed'))
      onDone?.()
    } catch (err) {
      toast.error(err?.response?.data?.detail || c('genericError'))
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#0F172A]/55 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
        <div
          className="w-full max-w-[420px] rounded-t-[28px] bg-white p-6 text-center shadow-2xl sm:rounded-[28px]"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2] text-[#DC2626] ring-8 ring-[#FEF2F2]">
            <UserMinus size={26} />
          </span>
          <h3 className="mt-4 text-xl font-extrabold text-[#0B1B3F]">{c('removeTitle')}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#475569]">{c('removeText', { name: child.full_name })}</p>
          {noPhone ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5 text-left text-[13px] font-medium leading-snug text-[#92400E]">
              <TriangleAlert size={16} className="mt-px shrink-0 text-[#D97706]" />
              {c('removeNoPhone')}
            </p>
          ) : null}
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-12 flex-1 rounded-xl bg-[#F1F5FB] text-[15px] font-semibold text-[#0F172A] hover:bg-[#E6ECF7]"
            >
              {c('cancel')}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={loading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#DC2626] text-[15px] font-semibold text-white hover:bg-[#B91C1C] disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : null}
              {c('remove')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RemoveChildModal
