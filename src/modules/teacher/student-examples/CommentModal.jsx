import React from 'react'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const CommentModal = ({ isOpen, onClose, comment, studentName }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mentor izohi</h3>
              <p className="text-sm text-gray-500">O'quvchi: {studentName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Image src="/icons/close.svg" alt="close" width={24} height={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {comment}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            onPress={onClose}
            className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-600 rounded-lg transition-colors"
          >
            {t('close')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommentModal
