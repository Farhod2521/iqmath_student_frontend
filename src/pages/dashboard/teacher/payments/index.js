import HeaderTitle from '@/components/header-title'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { LoadingState } from '@/modules/student/products/components'
import PaymentsPage from '@/modules/teacher/payments/PaymentsPage'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()
  const { data, isLoading, error } = useGetQuery({
    key: '/api/v1/payments/teacher/payments/',
    url: '/api/v1/payments/teacher/payments/'
  })

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
      <PaymentsPage payments={data?.data?.rows || []} />
    </LayoutAdmin>
  )
}

export default Index
