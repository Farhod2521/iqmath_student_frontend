import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { LoadingState } from '@/modules/student/products/components'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  const { data, isLoading, isFetching } = useGetQuery({
    key: '/api/v1/payments/teacher/payments/',
    url: '/api/v1/payments/teacher/payments/'
  })

  if (isLoading) {
    return (
      <LayoutAdmin title={t('payments')}>
        <LoadingState />
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('payments')}>
      <PaymentsTable payments={data?.data?.rows} />
    </LayoutAdmin>
  )
}

export default Index

export function PaymentsTable({ payments }) {
  const { i18n } = useTranslation()

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0
    }).format(parseFloat(amount))
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const locale = i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ'
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    }

    const statusLabels = {
      pending: i18n.language === 'ru' ? 'В ожидании' : 'Kutilmoqda',
      completed: i18n.language === 'ru' ? 'Подтверждено' : 'Tasdiqlangan',
      failed: i18n.language === 'ru' ? 'Отменено' : 'Bekor qilingan'
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
      >
        {statusLabels[status] || status}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Ученик' : "O'quvchi"}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Сумма' : 'Summa'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Скидка' : 'Chegirma'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Купон' : 'Kupon'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Статус' : 'Holati'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Способ оплаты' : "To'lov usuli"}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Кешбэк (Учитель)' : "Cashback (O'qituvchi)"}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Дата создания' : 'Yaratilgan sana'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {i18n.language === 'ru' ? 'Дата платежа' : "To'lov sanasi"}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment, idx) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{payment.student_name}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                <div className="flex flex-col">
                  <span className="font-semibold">{formatAmount(payment.amount)}</span>
                  {payment.original_amount !== payment.amount && (
                    <span className="text-xs text-gray-500 line-through">{formatAmount(payment.original_amount)}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                {payment.discount_percent > 0 ? `${payment.discount_percent}%` : '-'}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm">
                {payment.coupon_code ? (
                  <div className="flex flex-col">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{payment.coupon_code}</span>
                    <span className="text-xs text-gray-500 mt-1">({payment.coupon_type})</span>
                  </div>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm">{getStatusBadge(payment.status)}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                <span className="capitalize">{payment.payment_gateway}</span>
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                {formatAmount(payment.teacher_cashback_amount)}
              </td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{formatDate(payment.created_at)}</td>
              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{formatDate(payment.payment_date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {i18n.language === 'ru' ? 'Платежная информация не найдена' : "Hech qanday to'lov ma'lumoti topilmadi"}
          </p>
        </div>
      )}
    </div>
  )
}
