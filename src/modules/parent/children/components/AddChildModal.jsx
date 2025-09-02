import React, { useState } from 'react'
import usePostQuery from '@/hooks/api/usePostQuery'

const AddChildModal = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('phone')
  const [error, setError] = useState('')

  // API hooks
  const addChildMutation = usePostQuery({
    hideSuccessToast: true,
    hideErrorToast: true
  })

  const confirmChildMutation = usePostQuery({
    hideSuccessToast: true,
    hideErrorToast: true
  })

  const handleSendCode = () => {
    if (!phone || phone.length < 9) {
      setError('Telefon raqamni to\'g\'ri kiriting')
      return
    }

    setError('')

    // API so'rov yuborish
    addChildMutation.mutate({
      url: 'https://api.iqmath.uz/api/v1/auth/parent/add-child/',
      attributes: {
        phone: `998${phone}`
      }
    }, {
      onSuccess: () => {
        setStep('code')
        setError('')
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.detail || 'Xatolik yuz berdi'
        setError(errorMessage)
      }
    })
  }

  const handleVerifyCode = () => {
    if (!code || code.length < 4) {
      setError('Kodni to\'g\'ri kiriting')
      return
    }

    setError('')

    // API so'rov yuborish
    confirmChildMutation.mutate({
      url: 'https://api.iqmath.uz/api/v1/auth/parent/confirm-child/',
      attributes: {
        phone: `998${phone}`,
        code: code
      }
    }, {
      onSuccess: () => {
        onSuccess()
        onClose()
        setPhone('')
        setCode('')
        setStep('phone')
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || 'Kod noto\'g\'ri'
        setError(errorMessage)
      }
    })
  }

  const handleClose = () => {
    setPhone('')
    setCode('')
    setStep('phone')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {step === 'phone' ? 'Farzand qo\'shish' : 'Kodni tasdiqlash'}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {step === 'phone' ? (
          <div>
            <p className="text-gray-600 mb-4">
              Farzandingizning telefon raqamini kiriting
            </p>
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 w-full mb-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-colors">
              <span className="text-sm font-medium text-gray-600">+998</span>
              <div className="w-px h-5 mx-3 bg-gray-300" />
              <input
                type="tel"
                placeholder="901234567"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setPhone(value)
                }}
                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                maxLength={9}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full text-sm bg-transparent text-gray-800 placeholder-gray-400 border-none focus:outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex gap-2">
            <button
                onClick={handleClose}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSendCode}
                disabled={addChildMutation.isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                {addChildMutation.isLoading ? 'Yuborilmoqda...' : 'Kod yuborish'}
              </button>
             
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              +998{phone} raqamiga yuborilgan kodni kiriting
            </p>
            <input
              type="text"
              placeholder="54321"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={handleVerifyCode}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                Tasdiqlash
              </button>
              <button
                onClick={() => setStep('phone')}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Orqaga
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddChildModal
