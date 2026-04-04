import { useState } from 'react'
import { usePostQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { useTranslation } from 'react-i18next'

const TransferForm = ({ onSuccess }) => {
  const { t } = useTranslation()

  const [id, setId] = useState('')
  const [amount, setAmount] = useState('')
  const [receiver, setReceiver] = useState(null)

  const { mutate, isLoading } = usePostQuery({})

  const fetchUser = async () => {
    if (!id) return
    try {
      const res = await fetch(`${URLS.studentById}${id}/`)
      const data = await res.json()
      setReceiver(data)
    } catch {
      setReceiver(null)
    }
  }

  const handleSubmit = () => {
    if (!id || !amount) return

    mutate(
      {
        url: URLS.transferRequest,
        attributes: {
          receiver_identification: id,
          amount: Number(amount)
        }
      },
      {
        onSuccess: (res) => {
          onSuccess(res.data.id)
        }
      }
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <input
        placeholder={t('enterIdentification')}
        value={id}
        onChange={(e) => setId(e.target.value)}
        onBlur={fetchUser}
        className="w-full border p-3 rounded"
      />

      {receiver && <div className="bg-gray-100 p-3 rounded text-sm">👤 {receiver.full_name}</div>}

      <input
        type="number"
        placeholder={t('enterAmount')}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded"
      />

      <button onClick={handleSubmit} disabled={isLoading} className="w-full bg-indigo-600 text-white p-3 rounded">
        {isLoading ? t('loading') : t('send')}
      </button>
    </div>
  )
}

export default TransferForm
