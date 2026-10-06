import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { CheckCircle2, Copy, Smartphone, X } from 'lucide-react'
import { request } from '@/services/api'
import { fieldBorder, fieldBox, fieldIcon, fieldInput } from '@/components/form/field/fieldStyles'

/** Telefonsiz farzand hisobiga telefon raqam biriktirish (keyin farzand o'zi kira oladi) */
const SetPhoneModal = ({ open, onClose, childId, onDone }) => {
  const { t } = useTranslation()
  const c = (key, opts) => t(`childSwitch.${key}`, opts)
  const [mounted, setMounted] = useState(false)
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  const close = () => {
    setPhone('')
    setError('')
    setResult(null)
    onClose()
  }

  const save = async () => {
    if (phone.length !== 9) return setError(c('phoneInvalid'))
    setError('')
    setLoading(true)
    try {
      const res = await request.post(`https://api.iqmath.uz/api/v1/auth/parent/children/${childId}/set-phone/`, {
        phone: `998${phone}`
      })
      setResult(res.data)
      onDone?.()
    } catch (err) {
      setError(err?.response?.data?.detail || c('genericError'))
    } finally {
      setLoading(false)
    }
  }

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success(c('copied'))
    } catch {
      // brauzer ruxsat bermasa — jim
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#0F172A]/55 backdrop-blur-sm" onClick={close}>
      <div className="flex min-h-full items-end justify-center sm:items-center sm:p-6">
        <div
          className="relative w-full max-w-[440px] rounded-t-[28px] bg-white p-5 shadow-2xl sm:rounded-[28px] sm:p-7"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={close}
            aria-label="close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] hover:bg-[#F1F5F9]"
          >
            <X size={20} />
          </button>

          {result ? (
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DCFCE7] text-[#16A34A] ring-8 ring-[#F0FDF4]">
                <CheckCircle2 size={32} />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-[#0B1B3F]">{c('doneTitle')}</h3>
              <p className="mt-1 text-sm text-[#64748B]">{c('doneText')}</p>
              <div className="mt-5 space-y-2 text-left">
                {[
                  [c('login'), `+${result.login}`],
                  [c('password'), result.password]
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl bg-[#F5F8FF] px-4 py-3">
                    <span className="w-16 shrink-0 text-xs text-[#64748B]">{label}</span>
                    <span className="flex-1 font-mono text-[15px] font-bold text-[#0F172A]">{value}</span>
                    <button
                      type="button"
                      onClick={() => copy(value)}
                      className="text-[#2563EB] hover:text-[#1D4ED8]"
                      aria-label="copy"
                    >
                      <Copy size={17} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={close}
                className="mt-6 h-12 w-full rounded-xl bg-[#2563EB] text-[15px] font-semibold text-white hover:bg-[#1D4ED8]"
              >
                {c('close')}
              </button>
            </div>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
                <Smartphone size={24} />
              </span>
              <h3 className="mt-4 pr-10 text-xl font-extrabold text-[#0B1B3F]">{c('phoneTitle')}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{c('phoneText')}</p>
              <div className={`mt-5 ${fieldBox} ${fieldBorder}`}>
                <span className={fieldIcon}>
                  <Smartphone size={20} />
                </span>
                <span className="flex h-full shrink-0 items-center border-r border-[#EEF1F6] px-4 text-[15px] font-semibold text-[#0F172A]">
                  +998
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="901234567"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 9))}
                  className={fieldInput}
                />
              </div>
              {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={close}
                  className="h-12 flex-1 rounded-xl bg-[#F1F5FB] text-[15px] font-semibold text-[#0F172A] hover:bg-[#E6ECF7]"
                >
                  {c('cancel')}
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={loading}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563EB] text-[15px] font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : null}
                  {c('save')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SetPhoneModal
