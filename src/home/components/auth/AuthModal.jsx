import React, { useEffect } from 'react'
import AuthCard from './AuthCard'

export default function AuthModal({ open, onClose, title, children }) {
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
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-[#0F172A]/45 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          className="w-full max-w-[940px] animate-in fade-in zoom-in-95 duration-200"
          onClick={(event) => event.stopPropagation()}
          role="presentation"
        >
          <AuthCard title={title} onClose={onClose}>
            {children}
          </AuthCard>
        </div>
      </div>
    </div>
  )
}
