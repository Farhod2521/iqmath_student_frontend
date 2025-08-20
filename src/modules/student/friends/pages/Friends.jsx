import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button, Avatar } from '@heroui/react'
import { 
  UserPlus, 
} from 'lucide-react'
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

const Friends = () => {
  const { t } = useTranslation()
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    data: referralsData,  
    isLoading: isLoadingReferrals,
    isFetching: isFetchingReferrals
  } = useGetQuery({
    key: KEYS.myReferrals,
    url: URLS.myReferrals
  })
  const user = useUserStore()

  const data = referralsData?.data?.map((item, index) => ({
    ...item,
    index: index + 1
  })) || []

  console.log('Referrals Data:', referralsData)
  console.log('Processed Data:', data)

  useEffect(() => {
    if (user?.user?.identification) {
      setInviteLink(`https://iqmath.uz/?referral_code=${user.user.identification}`)
    }
  }, [user?.user?.identification])  

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
      } catch (err) {
      }
    } else {
      handleCopyLink()
    }
  }

  const formatDate = (dateString) => {
     return dateString.slice(0, 10)
  }

  const colDefs = [
    {
      headerName: '№',
      field: 'index',
      maxWidth: 80,
      cellClass: 'text-center',
      sortable: false,
      filter: false
    },
    {
      headerName: t('fullName'),
      field: 'full_name',
      flex: 2,
      cellRenderer: (params) => (
        <div className="flex items-center gap-3">
         
          <span className="font-medium text-[15px]">{params.value || '-'}</span>
        </div>
      ) 
    },
    {
      headerName: t('referredOn'),
      field: 'referred_at',
      flex: 1.5,
      cellRenderer: (params) => formatDate(params.value)
    }
  ]

  if (isLoadingReferrals || isFetchingReferrals) return <ContentLoader />

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-end">
       
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-4 py-2 rounded-[10px] font-medium"
        >
          <UserPlus size={20} className="mr-2" />
          {t('inviteFriends')}
        </Button>
      </div>

        <div className="flex flex-col">
          {isLoadingReferrals ? (
            <div className="relative">
              <ContentLoader classNames="!min-h-[400px] !w-full" />
            </div>
          ) : (
            <>
              {(!data || data.length === 0) ? (
              <Card className="border-none shadow-sm">
                   <div className="text-center py-16">
                  <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserPlus size={40} className="text-[#5A6A85]" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-black mb-3">{t('noReferralsYet')}</h3>
                  <p className="text-[16px] text-[#5A6A85] mb-8 max-w-md mx-auto">
                    {t('noReferralsDescription')}
                  </p>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#5D87FF] hover:bg-[#4570EA] text-white px-6 py-3 rounded-[10px] font-medium text-[16px]"
                  >
                    <UserPlus size={20} className="mr-2" />
                    {t('inviteFriends')}
                  </Button>
                </div>
              </Card>
            ) : (
              <div style={{ width: '100%', height: 'auto' }} className="relative">
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
            )}
          </>
          )}
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

export default Friends
