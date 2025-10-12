import React from 'react'
import { Button } from '@heroui/react'
import SimpleModal from './simple-modal'
import { useTranslation } from 'react-i18next'
import { FaTelegram } from 'react-icons/fa'

const SuccessPopup = ({ open, onClose }) => {
  const { t } = useTranslation()

  const handleTelegramClick = () => {
    // Telegram bot linkini ochish
    window.open('https://t.me/iqmath_bot', '_blank')
    // Modalni yopamiz
    onClose()
  }

  return (
    <SimpleModal open={open} onClose={onClose}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-0">
        {/* Content */}
        <div className="px-6 py-5">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTelegram className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {t(
                'requestSubmitted',
                "Murojaatingiz tez orada ko'rib chiqiladi va javobini telegram bot orqali olasiz. Buning uchun telegram botimizga a'zo bo'ling!"
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl flex justify-center">
          <Button
            onPress={handleTelegramClick}
            className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            <FaTelegram className="w-4 h-4" />
            {t('goToTelegramBot', "Botga o'tish")}
          </Button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default SuccessPopup
