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

  console.log(converts)
  return <></>
}

export default PaymentTable
