import React from 'react'
import { useTranslation } from 'react-i18next'
import { Plus } from 'lucide-react'

export const NewChatButton = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-4 mb-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#2F6BFF] font-semibold text-white shadow-[0_10px_22px_-12px_rgba(47,107,255,0.95)] transition hover:bg-[#1F5AF0] active:scale-95"
    >
      <Plus size={20} />
      <span>{t('chatBox.startConversation')}</span>
    </button>
  )
}
