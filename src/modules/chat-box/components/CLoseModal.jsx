import React from 'react'
import { useTranslation } from 'react-i18next'
import { X, AlertCircle, Send, XCircle, Lock } from 'lucide-react'

const CloseModal = ({ closeMutation, comment, setComment, setIsClosedModalOpen }) => {
  const { t, i18n } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg duration-200 bg-white shadow-2xl rounded-2xl animate-in zoom-in-95">
        {/* Header */}
        <div className="relative p-6 text-center border-b border-gray-100">
          <button
            onClick={() => setIsClosedModalOpen(false)}
            className="absolute p-2 text-gray-400 transition-all rounded-full top-4 right-4 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-orange-100 to-red-100">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900">{t('chatBox.request_close.send_chat_close')}</h3>
          <p className="mt-2 text-sm text-gray-500">
            {t('chatBox.request_close.close_chat_description') || "Chatni yopish so'rovini yuborish"}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Comment Textarea */}
          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700">
              {t('comment')}
              <span className="ml-1 text-xs font-normal text-gray-500">
                ({t('chatBox.request_close.optional') || 'ixtiyoriy'})
              </span>
            </label>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 transition-all border-2 border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500"
                rows={4}
                placeholder={t('chatBox.request_close.enter_close_reason') || 'Yopish sababini kiriting...'}
                maxLength={500}
              />
              <div className="absolute text-xs text-gray-400 bottom-3 right-3">{comment?.length}/500</div>
            </div>
            <p className="flex items-start gap-2 mt-2 text-xs text-gray-500">
              <span className="inline-block w-1 h-1 mt-1.5 bg-gray-400 rounded-full"></span>
              {t('chatBox.request_close.close_reason_hint') || "Yopish sababini ko'rsating (ixtiyoriy)"}
            </p>
          </div>

          {/* Warning Box */}
          <div className="p-4 border-2 border-yellow-200 rounded-xl bg-yellow-50/50">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="text-sm text-yellow-800">
                {t('chatBox.request_close.close_warning') ||
                  "Diqqat: Chat yopilgandan so'ng, yangi xabarlar yuborib bo'lmaydi."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setIsClosedModalOpen(false)}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 transition-all border-2 border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 active:scale-95"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => closeMutation.mutate({ comment })}
            disabled={closeMutation?.isPending}
            className="relative px-6 py-2.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-orange-600 to-red-600 rounded-xl hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-orange-500/30 disabled:shadow-none overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {closeMutation?.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  {t('chatBox.request_close.sending') || 'Yuborilmoqda...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t('chatBox.chat_transfer.submit_and_close')}
                </>
              )}
            </span>
            <div className="absolute inset-0 transition-transform translate-y-full bg-gradient-to-r from-orange-700 to-red-700 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CloseModal
