import React from 'react'
import { useTranslation } from 'react-i18next'
import { MessagesSquare } from 'lucide-react'

const EmptyMessage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="max-w-sm rounded-3xl bg-white/85 px-8 py-10 text-center shadow-[0_20px_50px_-30px_rgba(15,23,42,0.5)] backdrop-blur dark:bg-[#111A2B]/90">
        <span className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#2F6BFF] text-white shadow-[0_14px_30px_-12px_rgba(47,107,255,0.9)]">
          <MessagesSquare size={36} />
        </span>
        <h3 className="mb-2 text-xl font-bold text-[#0F172A] dark:text-white">{t('startConversation')}</h3>
        <p className="text-sm text-[#6B7385]">{t('chatSendMessage')}</p>
      </div>
    </div>
  )
}

export default EmptyMessage
