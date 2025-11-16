import { useSession } from 'next-auth/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'

function PaymentTable() {
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { data: converts, isLoading: convertsLoading } = useGetQuery({
    key: '/api/v1/tutor/tutor/withdrawals/list/',
    url: '/api/v1/tutor/tutor/withdrawals/list/',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  const withdrawals = converts?.data || [
    {
      id: 12,
      amount: 150000,
      status: 'pending',
      created_at: '13/11/2025 15:20'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return t('completed')
      case 'pending':
        return t('pending')
      case 'rejected':
        return t('rejected')
      default:
        return status
    }
  }

  if (convertsLoading) {
    return (
      <div className="flex items-center justify-center p-8 mt-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    )
  }

  if (!withdrawals.length) {
    return (
      <div className="rounded-lg mt-3 border border-gray-200 bg-white p-8 text-center">
        <p className="text-gray-500">{t('noDataFound')}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden mt-3 rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t('amount')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {t('date')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">#{withdrawal.id}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {withdrawal.amount.toLocaleString()} {t('currency')}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      withdrawal.status
                    )}`}
                  >
                    {getStatusText(withdrawal.status)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{withdrawal.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentTable