import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import usePutQuery from '@/hooks/api/usePutQuery'
import useDeleteQuery from '@/hooks/api/useDeleteQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import CouponCard from '../components/CouponCard'
import EmptyState from '../components/EmptyState'

const Coupons = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [coupons, setCoupons] = useState([])
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const {
    data: couponsData,
    isLoading: isCouponsLoading,
    refetch: refetchCoupons
  } = useGetQuery({
    key: KEYS.myCuponers,
    url: URLS.myCuponers,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })
  const data =
    couponsData?.data?.map((item, index) => ({
      ...item,
      index: index + 1
    })) || []

  const { mutate: createCoupon, isLoading: isCreating } = usePostQuery({
    listKeyId: 'create-coupon',
    hideSuccessToast: true
  })

  const { mutate: deleteCoupon, isLoading: isDeleting } = useDeleteQuery({
    listKeyId: 'delete-coupon'
  })

  useEffect(() => {
    if (couponsData?.data) {
      setCoupons(couponsData.data)
    }
  }, [couponsData])

  const handleCreateCoupon = () => {
    createCoupon(
      {
        url: URLS.myCuponers,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Kupon muvaffaqiyatli yaratildi')
          setIsOpen(false)
          refetchCoupons()
        }
      }
    )
  }

  const handleDeleteCoupon = (couponId) => {
    if (window.confirm("Bu kuponi o'chirishni xohlaysizmi?")) {
      deleteCoupon(
        {
          url: `${URLS.myCuponers}${couponId}/`,
          config: {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          }
        },
        {
          onSuccess: (data) => {
            toast.success("Kupon muvaffaqiyatli o'chirildi")
            // Update local state immediately for better UX
            setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId))
            // Also refetch to ensure data consistency
            if (refetchCoupons && typeof refetchCoupons === 'function') {
              refetchCoupons()
            }
          },
          onError: (error) => {
            const errorMessage =
              error.response?.data?.error || error.response?.data?.message || "Kupon o'chirishda xatolik yuz berdi"
            toast.error(errorMessage)
          }
        }
      )
    }
  }

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon)
    setIsEditOpen(true)
  }

  const handleAddNew = () => {
    setEditingCoupon(null)
    setIsOpen(true)
  }

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
        <div className="flex justify-between items-center mb-6">
          <div></div>
          <Button
            onPress={handleCreateCoupon}
            className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Yangi kupon
          </Button>
        </div>

        {coupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                onEdit={handleEditCoupon}
                onDelete={handleDeleteCoupon}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

export default Coupons
