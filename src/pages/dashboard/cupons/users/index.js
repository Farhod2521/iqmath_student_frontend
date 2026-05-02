import { useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'

import { useGetQuery } from '@/hooks'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import LayoutAdmin from '@/layout/LayoutAdmin'
import EmptyUserState from '@/modules/cupons/EmptyUserState'
import { useTranslation } from 'react-i18next'
import HeaderTitle from '@/components/header-title'

ModuleRegistry.registerModules([AllCommunityModule])

const CouponsUsers = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })

  const { data: couponsData, isLoading: isCouponsLoading } = useGetQuery({
    key: '/api/v1/universal/coupon-transaction/',
    url: '/api/v1/universal/coupon-transaction/',
    enabled: !!session?.accessToken
  })

  const data = useMemo(() => couponsData?.data, [couponsData])
  const formatDate = (dateString) => {
    function normalizeIsoMs(str) {
      return str.replace(/(\.\d{3})\d+/, '$1')
    }

    const d = new Date(normalizeIsoMs(dateString))

    const datePart = new Intl.DateTimeFormat('uz-UZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(d)

    return datePart
  }

  const colDefs = [
    {
      headerName: '№',
      field: 'id',
      maxWidth: 80,
      checkboxSelection: true,
      valueGetter: (params) => {
        const current = pagination.current ?? 1
        const pageSize = pagination.limit ?? 10
        return (current - 1) * pageSize + params?.node.rowIndex + 1
      }
    },
    { headerName: "O'quvchi", field: 'student_name', flex: 1 },
    { headerName: 'Kupon', field: 'coupon_code', flex: 1 },
    { headerName: "To'lov", field: 'payment_amount', flex: 1 },
    { headerName: 'Cashback', field: 'cashback_amount', flex: 1 },
    { headerName: 'Sana', field: 'used_at', flex: 1, cellRenderer: (params) => formatDate(params.value) }
  ]

  if (isCouponsLoading) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('users_with_coupons')} />

        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('users_with_coupons')} />
      <div className="grid grid-cols-12 gap-[24px] font-sf pt-2 pb-20">
        <div className="col-span-12">
          {data && data.length > 0 ? (
            <>
              <div style={{ width: '100%', height: 'auto' }} className="relative">
                <AgGridReact
                  loading={isCouponsLoading}
                  rowData={data}
                  columnDefs={colDefs}
                  domLayout="autoHeight"
                  className="custom-grid"
                  pagination={false}
                />
              </div>
            </>
          ) : (
            <EmptyUserState />
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default CouponsUsers
