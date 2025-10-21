import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import toast from 'react-hot-toast'

import EmptyState from '../components/EmptyState'
import { AgGridReact } from 'ag-grid-react'
import StudentPagination from '@/modules/teacher/students/components/StudentPagination'

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
ModuleRegistry.registerModules([AllCommunityModule])

const Coupons = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [coupons, setCoupons] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })

  const {
    data: couponsData,
    isLoading: isCouponsLoading,
    refetch: refetchCoupons
  } = useGetQuery({
    key: KEYS.tutorCoupons,
    url: URLS.tutorCoupons,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  const { mutate: createCoupon, isLoading: isCreating } = usePostQuery({
    listKeyId: 'create-coupon'
  })

  useEffect(() => {
    if (couponsData?.data) {
      setCoupons(couponsData.data)
    }
  }, [couponsData])

  const handleCreateCoupon = () => {
    createCoupon(
      {
        url: URLS.tutorCoupons,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Kupon muvaffaqiyatli yaratildi')
          setIsOpen(false)
          if (refetchCoupons && typeof refetchCoupons === 'function') {
            refetchCoupons()
          }
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.error || error.response?.data?.message || 'Kupon yaratishda xatolik yuz berdi'
          toast.error(errorMessage)
        }
      }
    )
  }

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
    {
      headerName: "O'quvchi",
      field: 'student_name',
      flex: 1
    },
    {
      headerName: 'Kupon',
      field: 'coupon_code',
      flex: 1
    },
    {
      headerName: "To'lov",
      field: 'payment_amount',
      flex: 1
    },
    {
      headerName: 'Cashback',
      field: 'cashback_amount',
      flex: 1
    },
    {
      headerName: 'Sana',
      field: 'used_at',
      flex: 1,
      cellRenderer: (params) => formatDate(params.value)
    }
  ]


  if (isCouponsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-[24px] font-sf pb-20">
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
          <EmptyState onAddNew={handleCreateCoupon} />
        )}
      </div>
    </div>
  )
}

export default Coupons
