import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { X, User, Check, ArrowRight } from 'lucide-react'

const TransferModal = ({
  transferTeacherId,
  setTransferTeacherId,
  transferReason,
  setTransferReason,
  transferMutation,
  setIsTransferModalOpen,
  activeChat,
  teachers,
  teachersLoading
}) => {
  const { t, i18n } = useTranslation()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-2xl duration-200 bg-white shadow-2xl rounded-2xl animate-in zoom-in-95">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{t('chatBox.chat_transfer.transfer_chat')}</h3>
              <p className="mt-1 text-sm text-gray-500">{t('chatBox.chat_transfer.select_teacher_to_transfer')}</p>
            </div>
            <button
              onClick={() => {
                setIsTransferModalOpen(false)
                setTransferTeacherId('')
                setTransferReason('')
              }}
              className="p-2 text-gray-400 transition-all rounded-full hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Teacher selection */}
          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700">
              {t('chatBox.chat_transfer.select_teacher')}
              <span className="ml-1 text-red-500">*</span>
            </label>

            {teachersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            ) : teachers?.length === 0 ? (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">{t('chatBox.chat_transfer.no_teachers_available')}</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-80">
                {teachers?.map((teacher) => (
                  <div
                    key={teacher.id}
                    onClick={() => setTransferTeacherId(teacher.id)}
                    className={`group relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      transferTeacherId === teacher.id
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-md '
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm '
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1 space-x-3">
                        {/* Avatar */}
                        <div
                          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                            transferTeacherId === teacher.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 group-hover:from-blue-100 group-hover:to-blue-200'
                          }`}
                        >
                          {teacher.full_name?.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{teacher.full_name}</h4>
                          {teacher.specialization && (
                            <p className="mt-1 text-sm text-gray-600 line-clamp-1">{teacher.specialization}</p>
                          )}
                          {teacher.support && (
                            <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                              <Check className="w-3 h-3" />
                              {t('support')}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Check indicator */}
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          transferTeacherId === teacher.id
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300 group-hover:border-blue-300'
                        }`}
                      >
                        {transferTeacherId === teacher.id && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reason input */}
          <div>
            <label className="block mb-3 text-sm font-semibold text-gray-700">
              {t('chatBox.chat_transfer.reason_optional')}
            </label>
            <textarea
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              className="w-full px-4 py-3 transition-all border-2 border-gray-200 resize-none rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
              rows={4}
              placeholder={t('chatBox.chat_transfer.enter_transfer_reason')}
            />
            <p className="flex items-start gap-2 mt-2 text-xs text-gray-500">
              <span className="inline-block w-1 h-1 mt-1.5 bg-gray-400 rounded-full"></span>
              {t('chatBox.chat_transfer.transfer_reason_hint')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={() => {
              setIsTransferModalOpen(false)
              setTransferTeacherId('')
              setTransferReason('')
            }}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 transition-all border-2 border-gray-200 rounded-xl hover:bg-gray-100 hover:border-gray-300 active:scale-95"
          >
            {t('cancel')}
          </button>
          <button
            onClick={() => {
              if (transferTeacherId) {
                transferMutation.mutate({
                  conversation_id: activeChat.id,
                  teacher_id: transferTeacherId,
                  reason: transferReason
                })
              }
            }}
            disabled={!transferTeacherId || transferMutation?.isPending}
            className="relative px-6 py-2.5 text-sm font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-blue-500/30 disabled:shadow-none overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {transferMutation?.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  {t('transferring')}
                </>
              ) : (
                <>
                  {t('transfer')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </span>
            <div className="absolute inset-0 transition-transform translate-y-full bg-gradient-to-r from-blue-700 to-blue-800 group-hover:translate-y-0"></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransferModal
