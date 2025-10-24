'use client'

import { useGetQuery, usePostQuery } from '@/hooks'
import { useSession } from 'next-auth/react'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const MIN_WITHDRAWAL = 1000

export default function TutorPayments() {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [message, setMessage] = useState(null)

  // Joriy locale (raqam formatlash uchun)
  const locale = useMemo(() => {
    const lang = i18n.language?.toLowerCase()
    if (lang?.startsWith('ru')) return 'ru-RU'
    if (lang?.startsWith('uz')) return 'uz-UZ'
    return 'en-US'
  }, [i18n.language])

  // 🔹 Ma'lumotlarni olish (React Query orqali)
  const {
    data: resData,
    isLoading: isPaymentsLoading,
    refetch: refetchPayments
  } = useGetQuery({
    key: '/api/v1/tutor/tutor/payments/',
    url: '/api/v1/tutor/tutor/payments/',
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })
  const paymentData = resData?.data

  // 🔹 Pul yechib olish mutation
  const { mutate: withdraw, isPending: isWithdrawLoading } = usePostQuery({
    url: '/api/v1/tutor/tutor/withdraw/',
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    onSuccess: () => {
      setMessage({ type: 'success', text: t('tutorPayments.messages.success') })
      setWithdrawAmount('')
      refetchPayments()
    },
    onError: (err) => {
      setMessage({
        type: 'error',
        text: err?.response?.data?.message || t('tutorPayments.messages.error')
      })
    }
  })

  const handleWithdraw = () => {
    setMessage(null)
    const amount = parseFloat(withdrawAmount)

    if (isNaN(amount) || amount < MIN_WITHDRAWAL) {
      setMessage({
        type: 'error',
        text: t('tutorPayments.messages.minAmount', {
          amount: MIN_WITHDRAWAL.toLocaleString(locale)
        })
      })
      return
    }

    if (amount > (paymentData?.balance || 0)) {
      setMessage({ type: 'error', text: t('tutorPayments.messages.notEnough') })
      return
    }
    withdraw({ amount })
  }

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setWithdrawAmount(value)
  }

  const setMaxAmount = () => {
    if (paymentData?.balance) setWithdrawAmount(Math.floor(paymentData.balance).toString())
  }

  if (isPaymentsLoading) {
    return <div className="p-4 text-gray-500 text-center">{t('common.loading')}</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('tutorPayments.title')}</h1>

      <p className="text-sm text-gray-500 mb-6">
        {t('tutorPayments.currentBalance')}{' '}
        <span className="font-semibold text-gray-900">
          {(paymentData?.balance || 0).toLocaleString(locale)} {t('common.currency')}
        </span>
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('tutorPayments.amountLabel')}
          </label>
          <div className="relative">
            <input
              id="amount"
              type="text"
              value={withdrawAmount}
              onChange={handleAmountChange}
              placeholder="0"
              disabled={isWithdrawLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              aria-label={t('tutorPayments.amountLabel')}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              {t('common.currency')}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {t('tutorPayments.minimal')}: {MIN_WITHDRAWAL.toLocaleString(locale)} {t('common.currency')}
            </span>
            <button
              type="button"
              onClick={setMaxAmount}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {t('tutorPayments.max')}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg border text-sm ${
              message.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
            role="status"
            aria-live="polite"
          >
            {message.text}
          </div>
        )}

        <button
          type="button"
          onClick={handleWithdraw}
          disabled={isWithdrawLoading || !withdrawAmount}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWithdrawLoading ? t('common.loading') : t('tutorPayments.withdraw')}
        </button>
      </div>

      {/* ixtiyoriy: qisqa statistik ma'lumotlar */}
      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">{t('tutorPayments.stats.totalEarned')}</p>
          <p className="font-semibold text-gray-900">
            {(paymentData?.total_earned || 0).toLocaleString(locale)} {t('common.currency')}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">{t('tutorPayments.stats.withdrawn')}</p>
          <p className="font-semibold text-gray-900">
            {(paymentData?.withdrawn || 0).toLocaleString(locale)} {t('common.currency')}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">{t('tutorPayments.stats.pending')}</p>
          <p className="font-semibold text-gray-900">
            {(paymentData?.pending || 0).toLocaleString(locale)} {t('common.currency')}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <p className="text-xs text-gray-500">{t('tutorPayments.stats.balance')}</p>
          <p className="font-semibold text-gray-900">
            {(paymentData?.balance || 0).toLocaleString(locale)} {t('common.currency')}
          </p>
        </div>
      </div>
    </div>
  )
}
