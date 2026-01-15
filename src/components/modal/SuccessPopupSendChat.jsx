import React from 'react'
import { Button } from '@heroui/react'
import SimpleModal from './simple-modal'
import { useTranslation } from 'react-i18next'
import { FaTelegram } from 'react-icons/fa'
import { HiChatBubbleLeftRight } from 'react-icons/hi2'

const SuccessPopupSendChat = ({ open, onClose }) => {
  const { t } = useTranslation()

  const handleTelegramClick = () => {
    // // Modalni yopamiz
    onClose()
  }

  return (
    <SimpleModal open={open} onClose={onClose}>
      <div className="w-full max-w-md p-0 bg-white shadow-2xl rounded-xl">
        {/* Content */}
        <div className="px-6 py-5">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
              <HiChatBubbleLeftRight className="w-8 h-8 text-blue-600" />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-700">{t('requestMentor')}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center px-6 py-4 bg-gray-50 rounded-b-xl">
          <Button
            onPress={handleTelegramClick}
            className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            {/* <HiChatBubbleLeftRight className="w-4 h-4" /> */}
            {t('understandable')}
          </Button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default SuccessPopupSendChat
