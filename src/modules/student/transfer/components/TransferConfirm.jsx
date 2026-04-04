import { useState } from 'react'
import { usePostQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { useTranslation } from 'react-i18next'

const TransferConfirm = ({ transferId, onSuccess, onBack }) => {
  const { t } = useTranslation()

  const [otp, setOtp] = useState('')
  const { mutate, isLoading } = usePostQuery({})

  const handleConfirm = () => {
    mutate(
      {
        url: URLS.transferConfirm,
        attributes: {
          transfer_id: transferId,
          otp_code: otp
        }
      },
      {
        onSuccess
      }
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <button onClick={onBack} className="text-sm text-gray-500">
        ← {t('back')}
      </button>

      <input
        placeholder={t('enterOtp')}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button onClick={handleConfirm} disabled={isLoading} className="w-full bg-green-600 text-white p-3 rounded">
        {isLoading ? t('checking') : t('confirm')}
      </button>
    </div>
  )
}

export default TransferConfirm
