import { useSession } from 'next-auth/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useGetQuery } from '@/hooks'

function PaymentTable() {
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { data: converts, isLoading: convertsLoading } = useGetQuery({
    key: '/api/v1/tutor/tutor/withdrawals/list/',
    url: '/api/v1/tutor/tutor/withdrawals/list/',
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
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
        <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600"></div>
      </div>
    )
  }

  if (!withdrawals.length) {
    return (
      <div className="p-8 mt-3 text-center bg-white border border-gray-200 rounded-lg">
        <p className="text-gray-500">{t('noDataFound')}</p>
      </div>
    )
  }

  return (
    <div className="mt-3 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                {t('amount')}
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                {t('status')}
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                {t('date')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {withdrawals?.map((withdrawal) => (
              <tr key={withdrawal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">#{withdrawal.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {withdrawal.amount.toLocaleString()} {t('currency')}
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      withdrawal.status
                    )}`}
                  >
                    {getStatusText(withdrawal.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{withdrawal.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentTable
