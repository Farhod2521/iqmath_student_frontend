import React, { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import SimpleModal from '@/components/modal/simple-modal'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

const SendToMentorModal = ({ open, onClose, questionId }) => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [message, setMessage] = useState('')
  const { mutate, isLoading } = usePostQuery({})

  console.log(session)
  useEffect(() => {
    if (open) setMessage('')
  }, [open])

  const handleSend = () => {
    if (!message.trim()) {
      toast.error(t('pleaseEnterComment', 'Iltimos, izoh kiriting!'))
      return
    }
    mutate(
      {
        url: URLS.sendMentor,
        attributes: {
          question_id: questionId,
          message,
        },
        config: { headers: { Authorization: `Bearer ${session?.accessToken}` } }
      },
      {
        onSuccess: () => {
          toast.success(t('sentToMentor', 'Mentorga yuborildi!'))
          setMessage('')
          onClose()
        },
        onError: () => {
          toast.error(t('errorOccurred', 'Xatolik yuz berdi!'))
        },
      }
    )
  }

  return (
    <SimpleModal open={open} onClose={onClose}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{t('sendToMentor', 'Mentorga yuborish')}</h2>
            <p className="text-xs text-gray-500">{t('mentorModalSubtitle', 'Savolingiz haqida izoh bering')}</p>
          </div>
        </div>
        {/* Content */}
        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('yourComment', 'Izohingiz')}</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[90px] text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder={t('mentorHelpPlaceholder', 'Bu misolni tushunmadim, iltimos tushuntirib bering...')}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">
            {t('mentorReadComment', "Mentor sizga yordam berish uchun izohingizni o'qiydi")}
          </p>
        </div>
        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <Button
            onPress={onClose}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg"
          >
            {t('cancel', 'Bekor qilish')}
          </Button>
          <Button
            onPress={handleSend}
            disabled={isLoading || !message.trim()}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isLoading || !message.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t('sending', 'Yuborilmoqda...')}
              </div>
            ) : (
              t('sendToMentor', 'Mentorga yuborish')
            )}
          </Button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default SendToMentorModal 