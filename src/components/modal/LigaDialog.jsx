import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Loader2, X } from 'lucide-react'

const TONES = {
  primary: { icon: 'bg-[#EAF0FF] text-[#5D87FF]', button: 'bg-[#5D87FF] hover:bg-[#4570EA]' },
  danger: { icon: 'bg-[#FEE2E2] text-[#DC2626]', button: 'bg-[#DC2626] hover:bg-[#B91C1C]' }
}

/** Liga oynalari: brauzerning oddiy confirm/prompt oynasi o'rniga */
const LigaDialog = ({
  open,
  title,
  text,
  Icon,
  tone = 'primary',
  confirmLabel,
  cancelLabel,
  disabled = false,
  onConfirm,
  onClose,
  children
}) => {
  const [mounted, setMounted] = useState(false)
  const [busy, setBusy] = useState(false)
  const style = TONES[tone]

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, busy, onClose])

  if (!mounted || !open) return null

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      await onConfirm()
    } finally {
      setBusy(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[1300] flex items-center justify-center bg-[#0B1B3F]/40 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          disabled={busy}
          aria-label={cancelLabel}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[#8A8A8E] transition hover:bg-[#F1F4F9]"
        >
          <X size={18} />
        </button>

        {Icon ? (
          <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}>
            <Icon size={24} />
          </span>
        ) : null}
        <h3 className={`pr-8 text-lg font-bold text-[#191C1D] ${Icon ? 'mt-4' : ''}`}>{title}</h3>
        {text ? <p className="mt-1.5 text-sm leading-relaxed text-[#64748B]">{text}</p> : null}
        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="h-11 flex-1 rounded-xl bg-[#F1F4F9] text-sm font-semibold text-[#475569] transition hover:bg-[#E6EBF5]"
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            disabled={busy || disabled}
            className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition disabled:opacity-50 ${style.button}`}
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : null}
            {confirmLabel}
          </button>
        </div>
      </form>
    </div>,
    document.body
  )
}

export default LigaDialog
