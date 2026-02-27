import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import { useGetQuery } from '@/hooks'
import usePostQuery from '@/hooks/api/usePostQuery'
import useDeleteQuery from '@/hooks/api/useDeleteQuery'
import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import EmptyCuponState from '@/modules/cupons/EmtyCuponState'
import CouponCard from '@/modules/cupons/CouponCard'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@heroui/react'
import { useState } from 'react'
import { useUserStore } from '@/store'
import { RolesList } from '@/layout/libs/menulist'

const Index = () => {
  const { t } = useTranslation()
  const { user } = useUserStore((state) => state)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [discountPercent, setDiscountPercent] = useState('')

  const isTeacher = user?.role === RolesList.TEACHER

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

  const openCreateModal = () => {
    if (isTeacher) {
      setDiscountPercent('')
      setIsCreateModalOpen(true)
    } else {
      // Teacher emas → modal ochilmaydi → direct create
      createCoupon(
        {
          url: 'api/v1/universal/coupon-generate/'
          //   attributes YUBORILMAYDI
        },
        {
          onSuccess: (data) => {
            toast.success(data?.data?.message || t('couponCreatedSuccessfully'))
            refetchCoupons()
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.error || error?.response?.data?.message || t('thereErrorCreatingCoupon')
            toast.error(errorMessage)
          }
        }
      )
    }
  }

  const closeCreateModal = () => {
    if (isCreating) return
    setIsCreateModalOpen(false)
  }

  const handleCreateCoupon = () => {
    if (!isTeacher) return

    const percent = Number(discountPercent)

    if (!percent || percent < 1 || percent > 100) {
      toast.error("Discount 1 dan 100 gacha bo'lishi kerak")
      return
    }

    createCoupon(
      {
        url: 'api/v1/universal/coupon-generate/',
        attributes: { discount_percent: percent }
      },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || t('couponCreatedSuccessfully'))
          setIsCreateModalOpen(false)
          refetchCoupons()
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.error || error?.response?.data?.message || 'Kupon yaratishda xatolik yuz berdi'
          toast.error(errorMessage)
        }
      }
    )
  }
  // const handleDeleteCoupon = () => {
  //   if (window.confirm("Bu kuponi o'chirishni xohlaysizmi?")) {
  //     deleteCoupon(
  //       { url: `api/v1/universal/coupon-generate/` },
  //       {
  //         onSuccess: (data) => {
  //           toast.success("Kupon muvaffaqiyatli o'chirildi")
  //           refetchCoupons()
  //         },
  //         onError: (error) => {
  //           const errorMessage =
  //             error.response?.data?.error || error.response?.data?.message || "Kupon o'chirishda xatolik yuz berdi"
  //           toast.error(errorMessage)
  //         }
  //       }
  //     )
  //   }
  // }

  const handleDeleteCoupon = (couponId) => {
    if (!couponId) {
      toast.error('Kupon ID topilmadi')
      return
    }

    if (window.confirm(t('doYouDeleteCoupon'))) {
      deleteCoupon(
        // backend shunga mos bo‘lsa: /coupon-generate/{id}/
        { url: `api/v1/universal/coupon-generate/${couponId}/` },
        {
          onSuccess: () => {
            toast.success(t('couponSuccessfullyRedeemed'))
            refetchCoupons()
          },
          onError: (error) => {
            const errorMessage =
              error?.response?.data?.error || error?.response?.data?.message || "Kupon o'chirishda xatolik yuz berdi"
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
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5D87FF] mx-auto"></div>
              <p className="text-[#5A6A85] dark:text-gray-400 mt-4">{t('loading')}</p>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    )
  }

  const rawCoupon = couponsData?.data?.coupon
  const coupons = Array.isArray(rawCoupon) ? rawCoupon : rawCoupon ? [rawCoupon] : []

  return (
    <LayoutAdmin title={t('coupons')}>
      <div className="grid grid-cols-12 gap-[24px] font-sf pb-20">
        <div className="col-span-12">
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <Button
              onPress={openCreateModal}
              className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              {t('newCoupon')}
            </Button>
          </div>

          <Modal
            isOpen={isCreateModalOpen}
            onOpenChange={(open) => (open ? setIsCreateModalOpen(true) : closeCreateModal())}
            backdrop="blur"
            size="md"
            hideCloseButton
          >
            <ModalContent className="relative overflow-hidden bg-white dark:bg-[#202936] rounded-2xl shadow-2xl border border-[#EAEFF4] dark:border-[#2A3447]">
              {(onClose) => (
                <>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isCreating}
                    aria-label="Close"
                    className="absolute z-50 inline-flex items-center justify-center text-white transition rounded-full right-4 top-4 h-9 w-9 bg-white/20 hover:bg-white/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {/* Header */}
                  <ModalHeader className="p-0">
                    <div className="w-full px-6 py-5 bg-gradient-to-r from-[#5d87ff] to-[#6c5cff] text-white">
                      <div className="text-base font-semibold">{t('createNewCoupon')}</div>
                      <div className="mt-1 text-xs text-white/80">{t('enterDiscountPercentage')}</div>
                    </div>
                  </ModalHeader>

                  {/* Body */}
                  <ModalBody className="px-6 py-6">
                    <div className="space-y-3">
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder={`${t('discount')} (%)`}
                        value={discountPercent}
                        onValueChange={(v) => setDiscountPercent(v.replace(/\D/g, ''))} // faqat raqam
                        onBlur={() => {
                          const n = Number(discountPercent || 0)
                          if (!n) return setDiscountPercent('')
                          setDiscountPercent(String(Math.max(1, Math.min(100, n))))
                        }}
                        // variant="bordered"
                        classNames={{
                          inputWrapper:
                            'bg-white dark:bg-[#1b2330] border border-[#EAEFF4] dark:border-[#2A3447] shadow-sm hover:border-[#EAEFF4] focus-within:border-[#EAEFF4] focus-within:ring-0 focus-within:ring-offset-0 focus-within:shadow-none',
                          input: 'text-[#2A3547] dark:text-white outline-none'
                        }}
                      />

                      <div className="flex items-start gap-2 rounded-xl bg-[#F5F7FF] dark:bg-[#1b2330] px-4 py-3 border border-[#EAEFF4] dark:border-[#2A3447]">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-[#5d87ff]" />
                        <p className="text-xs text-[#5A6A85] dark:text-gray-300 leading-5">
                          {t('toCreateCouponEnter')} <b>10</b> = 10% <span className="lowercase">{t('discount')}</span>.
                        </p>
                      </div>
                    </div>
                  </ModalBody>

                  {/* Footer */}
                  <ModalFooter className="px-6 py-4 bg-[#FAFBFF] dark:bg-[#1b2330] border-t border-[#EAEFF4] dark:border-[#2A3447]">
                    <Button
                      variant="flat"
                      onPress={onClose}
                      className="bg-white dark:bg-[#202936] border border-[#EAEFF4] dark:border-[#2A3447] px-6 py-3 rounded-lg text-[#2A3547] dark:text-white"
                      isDisabled={isCreating}
                    >
                      {t('cancel')}
                    </Button>

                    <Button
                      onPress={handleCreateCoupon}
                      isLoading={isCreating}
                      className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                    >
                      {t('create')}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          {coupons?.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {coupons?.map((coupon) => (
                <CouponCard
                  key={coupon?.id}
                  coupon={coupon}
                  onEdit={handleEditCoupon}
                  // endi qaysi kupon o‘chishini biladi
                  onDelete={() => handleDeleteCoupon(coupon?.id)}
                />
              ))}
              {/* <CouponCard
                key={couponsData?.data.coupon.id}
                coupon={couponsData?.data.coupon}
                onEdit={handleEditCoupon}
                onDelete={handleDeleteCoupon}
              /> */}
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
