import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useAuthTabStore } from '@/store'
import toast from 'react-hot-toast'

const CredentialsPopup = () => {
  const { t } = useTranslation()
  const { loginCredentials, showCredentialsPopup, setShowCredentialsPopup, clearCredentials } = useAuthTabStore()

  if (!showCredentialsPopup || !loginCredentials) {
    return null
  }

  const handleClose = () => {
    setShowCredentialsPopup(false)
    clearCredentials()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success(t('copied'))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" style={{ zIndex: 999999, position: 'fixed' }} onClick={handleBackdropClick}>
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" style={{ zIndex: 1000000, position: 'relative' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{t('yourCredentials')}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Image src="/icons/close.svg" alt="close" width={24} height={24} />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed">
            {t('credentialsMessage')}
          </p>

          <div className="space-y-4">
            {/* Login */}
            <div className="border-2 border-gray-100 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{t('login')}</p>
                  <p className="text-lg font-mono text-gray-900 bg-white px-3 py-2 rounded border">{loginCredentials.login}</p>
                </div>
                <button
                  onClick={() => handleCopy(loginCredentials.login)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {t('copy')}
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="border-2 border-gray-100 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{t('password')}</p>
                  <p className="text-lg font-mono text-gray-900 bg-white px-3 py-2 rounded border">{loginCredentials.password}</p>
                </div>
                <button
                  onClick={() => handleCopy(loginCredentials.password)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {t('copy')}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <span className="text-yellow-600 text-lg mr-2">⚠️</span>
              <p className="text-sm text-yellow-800 leading-relaxed">
                {t('saveCredentialsWarning')}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            {t('gotIt')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CredentialsPopup 