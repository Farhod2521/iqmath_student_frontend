import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'
import usePostQuery from '@/hooks/api/usePostQuery'
import useDeleteQuery from '@/hooks/api/useDeleteQuery'
import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import EmptyCuponState from '@/modules/cupons/EmtyCuponState'
import CouponCard from '@/modules/cupons/CouponCard'
// import CouponCard from '@/modules/cupons/CouponCard'

const Index = () => {
  const { t } = useTranslation()

  const {
    data: couponsData,
    isLoading: isCouponsLoading,
    refetch: refetchCoupons
  } = useGetQuery({ key: '/api/v1/universal/coupon-generate/', url: '/api/v1/universal/coupon-generate/' })

  const { mutate: createCoupon, isLoading: isCreating } = usePostQuery({
    listKeyId: 'create-coupon',
    hideSuccessToast: true
  })

  const { mutate: deleteCoupon } = useDeleteQuery({
    listKeyId: 'delete-coupon'
  })

  const handleCreateCoupon = () => {
    createCoupon(
      { url: 'api/v1/universal/coupon-generate/' },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || 'Kupon muvaffaqiyatli yaratildi')
          refetchCoupons()
        }
      }
    )
  }

  const handleDeleteCoupon = () => {
    if (window.confirm("Bu kuponi o'chirishni xohlaysizmi?")) {
      deleteCoupon(
        { url: `api/v1/universal/coupon-generate/` },
        {
          onSuccess: (data) => {
            toast.success("Kupon muvaffaqiyatli o'chirildi")
            refetchCoupons()
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

  const handleEditCoupon = (coupon) => {}

  if (isCouponsLoading) {
    return (
      <LayoutAdmin title={t('coupons')}>
        <div className="p-6">
          <div className="bg-white dark:bg-[#202936] rounded-[10px] dark:border-[#2A3447FF] p-6">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D87FF] mx-auto"></div>
              <p className="text-[#5A6A85] dark:text-gray-400 mt-4">Yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin title={t('coupons')}>
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

          {!!couponsData?.data.coupon ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
              <CouponCard
                key={couponsData?.data.coupon.id}
                coupon={couponsData?.data.coupon}
                onEdit={handleEditCoupon}
                onDelete={handleDeleteCoupon}
              />
            </div>
          ) : (
            <EmptyCuponState onAddNew={handleCreateCoupon} />
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
