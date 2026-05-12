import HeaderTitle from '@/components/header-title'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { LoadingState } from '@/modules/student/products/components'
import { formatDateTime } from '@/shared/utils'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  const { data, isLoading, isFetching, error } = useGetQuery({
    key: '/api/v1/payments/teacher/payments/',
    url: '/api/v1/payments/teacher/payments/'
  })

  console.log('error', error)

  useEffect(() => {
    if (error?.response?.data?.detail) toast.error(error?.response?.data?.detail)
  }, [error?.response?.data?.detail])

  if (isLoading) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('payments')} />
        <LoadingState />
      </LayoutAdmin>
    )
  }

  if (error) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('payments')} />

        <div className="p-5 text-red-500">{error?.response?.data?.detail || 'Error'}</div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('payments')} />
      <PaymentsTable payments={data?.data?.rows || []} />
    </LayoutAdmin>
  )
}

export default Index

export function PaymentsTable({ payments }) {
  const { t, i18n } = useTranslation()

  // const formatAmount = (amount) => {
  //   return new Intl.NumberFormat('uz-UZ', {
  //     style: 'currency',
  //     currency: 'UZS',
  //     minimumFractionDigits: 0
  //   }).format(parseFloat(amount))
  // }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(parseFloat(amount))
  }

  // const formatDate = (dateString) => {
  //   if (!dateString) return 'N/A'
  //   const locale = i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ'
  //   return new Date(dateString).toLocaleDateString(locale, {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   })
  // }

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
    <div className="mt-2 overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">ID</th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Ученик' : "O'quvchi"}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? `Сумма (${t('sum')})` : `Summa (${t('sum')})`}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Скидка' : 'Chegirma'}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Купон' : 'Kupon'}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Статус' : 'Holati'}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Способ оплаты' : "To'lov usuli"}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? `Кешбэк (Учитель) ${t('sum')}` : `Cashback (O'qituvchi) ${t('sum')}`}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Дата создания' : 'Yaratilgan sana'}
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              {i18n.language === 'ru' ? 'Дата платежа' : "To'lov sanasi"}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments?.map((payment, idx) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap">{idx + 1}</td>
              <td className="px-6 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{payment.student_name}</td>
              <td className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="font-semibold">{formatAmount(payment.amount)}</span>
                  {payment.original_amount !== payment.amount && (
                    <span className="text-xs text-gray-500 line-through">{formatAmount(payment.original_amount)}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap">
                {payment.discount_percent > 0 ? `${payment.discount_percent}%` : '-'}
              </td>
              <td className="px-6 py-2 text-sm whitespace-nowrap">
                {payment.coupon_code ? (
                  <div className="flex flex-col">
                    <span className="px-2 py-1 font-mono text-xs bg-gray-100 rounded">{payment.coupon_code}</span>
                    <span className="mt-1 text-xs text-gray-500">({payment.coupon_type})</span>
                  </div>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-6 py-2 text-sm whitespace-nowrap">{getStatusBadge(payment.status)}</td>
              <td className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap">
                <span className="capitalize">{payment.payment_gateway}</span>
              </td>
              <td className="px-6 py-2 text-sm text-gray-900 whitespace-nowrap">
                {formatAmount(payment.teacher_cashback_amount)}
              </td>
              <td className="px-6 py-2 text-sm text-gray-500 whitespace-nowrap">
                {formatDateTime(payment.created_at)}
              </td>
              <td className="px-6 py-2 text-sm text-gray-500 whitespace-nowrap">
                {formatDateTime(payment.payment_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {payments?.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">
            {i18n.language === 'ru' ? 'Платежная информация не найдена' : "Hech qanday to'lov ma'lumoti topilmadi"}
          </p>
        </div>
      )}
    </div>
  )
}
