import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button } from '@heroui/react'
import { UserPlus, Link, Gift } from 'lucide-react'
import toast from 'react-hot-toast'
import ContentLoader from '@/components/loader/content-loader'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import CreateReferalModal from '../components/CreateReferalModal'
import { useUserStore } from '@/store'

ModuleRegistry.registerModules([AllCommunityModule])

const Referal = () => {
  const { t } = useTranslation()
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, limit: 100, total: 0, totalPages: 0 })

  const {
    data: referralsData,
    isLoading: isLoadingReferrals,
    isFetching: isFetchingReferrals
  } = useGetQuery({
    key: KEYS.myReferrals,
    url: URLS.myReferrals
  })
  const user = useUserStore()

  const linktext = useMemo(() => {
    return `https://iqmath.uz/?referral_code=${user?.user?.identification}`
  }, [user])

  useEffect(() => {
    if (user?.user?.identification) {
      setInviteLink(linktext)
    }
  }, [user?.user?.identification, user])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      toast.success(t('linkCopied'))
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error(t('copyError'))
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('inviteFriends'),
          text: t('inviteMessage'),
          url: inviteLink
        })
      } catch (err) {}
    } else {
      handleCopyLink()
    }
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
      headerName: t('fullName'),
      field: 'student_name',
      flex: 2,
      cellRenderer: (params) => (
        <div className="flex items-center gap-3">
          <span className="font-medium text-[15px]">{params.value || '-'}</span>
        </div>
      )
    },
    {
      headerName: "To'lov",
      field: 'bonus_amount',
      flex: 1.5
    },
    {
      headerName: 'Sana',
      field: 'used_at',
      flex: 1.5
    }
  ]

  const data = useMemo(() => referralsData?.data || [], [referralsData])

  if (isLoadingReferrals || isFetchingReferrals)
    return (
      <div className="relative">
        <ContentLoader classNames="!min-h-[400px] !w-full" />
      </div>
    )

  if (!data || data.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="bg-white border-none shadow-sm rounded-xl">
          <div className="px-6 py-16 text-center">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full">
              <UserPlus size={40} className="text-gray-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-black">
              {t('noInvitedFriends', "Taklif qilingan do'stlar mavjud emas!")}
            </h3>
            <p className="max-w-md mx-auto mb-8 text-base text-gray-600">
              {t('inviteFriendsDescription', "Do'stlaringizni taklif qiling va ularni ro'yxatdan o'tkazing")}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onPress={() => setIsModalOpen(true)}
                className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                <Link size={20} />
                {t('referralLink', 'Referal link')}
              </Button>
            </div>
          </div>
        </Card>
        <CreateReferalModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          inviteLink={inviteLink}
          handleCopyLink={handleCopyLink}
          handleShare={handleShare}
          copied={copied}
          setCopied={setCopied}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <UserPlus size={20} />
          {t('inviteStudent', "O'quvchi taklif qilish")}
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="relative h-auto min-w-[600px] sm:w-full">
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            domLayout="autoHeight"
            className="custom-grid"
            pagination={false}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true
            }}
          />
        </div>
      </div>

      <CreateReferalModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        inviteLink={inviteLink}
        handleCopyLink={handleCopyLink}
        handleShare={handleShare}
        copied={copied}
        setCopied={setCopied}
      />
    </div>
  )
}

export default Referal
