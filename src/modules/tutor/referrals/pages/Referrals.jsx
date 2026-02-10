import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useGetQuery } from '@/hooks'
import usePostQuery from '@/hooks/api/usePostQuery'
import usePutQuery from '@/hooks/api/usePutQuery'
import useDeleteQuery from '@/hooks/api/useDeleteQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { Button } from '@heroui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import ReferralCard from '../components/ReferralCard'
import CreateReferralModal from '../components/CreateReferralModal'
import EditReferralModal from '../components/EditReferralModal'
import EmptyState from '../components/EmptyState'

const Referrals = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [referrals, setReferrals] = useState([])
  const [editingReferral, setEditingReferral] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const {
    data: referralsData,
    isLoading: isReferralsLoading,
    refetch: refetchReferrals
  } = useGetQuery({
    key: KEYS.tutorReferrals,
    url: URLS.tutorReferrals,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken
  })

  const { mutate: createReferral, isLoading: isCreating } = usePostQuery({
    listKeyId: 'create-referral'
  })

  const { mutate: updateReferral, isLoading: isUpdating } = usePutQuery({
    listKeyId: 'update-referral'
  })

  const { mutate: deleteReferral, isLoading: isDeleting } = useDeleteQuery({
    listKeyId: 'delete-referral'
  })

  useEffect(() => {
    if (referralsData?.data) {
      setReferrals(referralsData.data)
    }
  }, [referralsData])

  const handleCreateReferral = (referralCode) => {
    if (!referralCode.trim()) {
      toast.error('Referral kodi kiriting')
      return
    }

    if (referralCode.trim().length < 3) {
      toast.error("Referral kodi kamida 3 ta belgidan iborat bo'lishi kerak")
      return
    }

    createReferral(
      {
        url: URLS.tutorReferrals,
        attributes: { code: referralCode.trim().toUpperCase() },
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Referral muvaffaqiyatli yaratildi')
          setIsOpen(false)
          if (refetchReferrals && typeof refetchReferrals === 'function') {
            refetchReferrals()
          }
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.error || error.response?.data?.message || 'Referral yaratishda xatolik yuz berdi'
          toast.error(errorMessage)
        }
      }
    )
  }

  const handleUpdateReferral = (referralCode) => {
    if (!referralCode.trim()) {
      toast.error('Referral kodi kiriting')
      return
    }

    if (referralCode.trim().length < 3) {
      toast.error("Referral kodi kamida 3 ta belgidan iborat bo'lishi kerak")
      return
    }

    updateReferral(
      {
        url: `${URLS.tutorReferrals}${editingReferral.id}/`,
        data: { code: referralCode.trim().toUpperCase() },
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Referral muvaffaqiyatli yangilandi')
          setEditingReferral(null)
          setIsEditOpen(false)
          if (refetchReferrals && typeof refetchReferrals === 'function') {
            refetchReferrals()
          }
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.error || error.response?.data?.message || 'Referral yangilashda xatolik yuz berdi'
          toast.error(errorMessage)
        }
      }
    )
  }

  const handleDeleteReferral = (referralId) => {
    if (window.confirm("Bu referralni o'chirishni xohlaysizmi?")) {
      deleteReferral(
        {
          url: `${URLS.tutorReferrals}${referralId}/`,
          config: {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`
            }
          }
        },
        {
          onSuccess: (data) => {
            toast.success("Referral muvaffaqiyatli o'chirildi")
            setReferrals((prev) => prev.filter((referral) => referral.id !== referralId))
            if (refetchReferrals && typeof refetchReferrals === 'function') {
              refetchReferrals()
            }
          },
          onError: (error) => {
            const errorMessage =
              error.response?.data?.error || error.response?.data?.message || "Referral o'chirishda xatolik yuz berdi"
            toast.error(errorMessage)
          }
        }
      )
    }
  }

  const handleEditReferral = (referral) => {
    setEditingReferral(referral)
    setIsEditOpen(true)
  }

  const handleAddNew = () => {
    setEditingReferral(null)
    setIsOpen(true)
  }

  if (isReferralsLoading) {
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
            onPress={handleAddNew}
            className="bg-[#5d87ff] text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Yangi referral
          </Button>
        </div>

        {referrals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {referrals.map((referral) => (
              <ReferralCard
                key={referral.id}
                referral={referral}
                onEdit={handleEditReferral}
                onDelete={handleDeleteReferral}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        ) : (
          <EmptyState onAddNew={handleAddNew} />
        )}
      </div>

      <CreateReferralModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleCreateReferral}
        isLoading={isCreating}
      />
    </div>
  )
}

export default Referrals
