import { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, subtitle, icon, iconClass, children, footer, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={`flex max-h-[90vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${maxWidth}`}>
        <div className="flex items-start justify-between gap-3 border-b border-[#F0F0F0] p-5">
          <div className="flex min-w-0 items-center gap-3">
            {icon ? (
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  iconClass || 'bg-[#EAF0FF] text-[#5D87FF]'
                }`}
              >
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-[#191C1D]">{title}</h3>
              {subtitle ? <p className="mt-0.5 truncate text-sm text-[#8A8A8E]">{subtitle}</p> : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-[#8A8A8E] transition hover:bg-[#F6F8FB] hover:text-[#191C1D]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>

        {footer ? <div className="border-t border-[#F0F0F0] p-5">{footer}</div> : null}
      </div>
    </div>
  )
}

export default Modal
