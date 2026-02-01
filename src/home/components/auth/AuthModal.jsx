import React, { useEffect } from 'react'
import { X } from 'lucide-react'

export default function AuthModal({ open, onClose, title = 'Kirish / Ro‘yxatdan o‘tish', children }) {
  // ESC yopish
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // scroll lock
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop */}
      <button aria-label="Close modal" onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* dialog */}
      <div className="relative z-10 flex items-center justify-center min-h-full p-4">
        <div className="w-full max-w-[620px]  rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="font-semibold text-white">{title}</div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center text-white transition rounded-full h-9 w-9 bg-white/10 hover:bg-white/15"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
