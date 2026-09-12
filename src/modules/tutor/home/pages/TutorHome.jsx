import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useUserStore } from '@/store'
import CreateReferalModal from '@/modules/tutor/referal/components/CreateReferalModal'
import TutorHomeGreeting from '../components/TutorHomeGreeting'
import TutorHomeHero from '../components/TutorHomeHero'
import TutorPromoCard from '../components/TutorPromoCard'
import TutorStatsGrid from '../components/TutorStatsGrid'
import TutorRecentStudents from '../components/TutorRecentStudents'
import TutorGroupsCard from '../components/TutorGroupsCard'
import TutorResultsChart from '../components/TutorResultsChart'

const TutorHome = () => {
  const { t } = useTranslation()
  const user = useUserStore()
  const [inviteLink, setInviteLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: referralsData, isLoading: isLoadingReferrals } = useGetQuery({
    key: KEYS.myReferrals,
    url: URLS.myReferrals
  })

  const { data: groupsData, isLoading: isLoadingGroups } = useGetQuery({
    key: KEYS.tutorGroups,
    url: URLS.tutorGroups
  })

  const { data: overviewData, isLoading: isLoadingOverview } = useGetQuery({
    key: KEYS.tutorResultsOverview,
    url: URLS.tutorResultsOverview
  })

  const { data: chartData, isLoading: isLoadingChart } = useGetQuery({
    key: KEYS.tutorResultsChart,
    url: URLS.tutorResultsChart
  })

  const students = get(referralsData, 'data', [])
  const groups = get(groupsData, 'data', [])
  const overview = get(overviewData, 'data', null)
  const chart = get(chartData, 'data', null)

  const fullName = get(user, 'user.full_name', '')
  const firstName = fullName ? fullName.split(' ')[0] : ''

  const linktext = useMemo(
    () => `https://iqmath.uz/?referral_code=${user?.user?.identification}`,
    [user]
  )

  useEffect(() => {
    if (user?.user?.identification) {
      setInviteLink(linktext)
    }
  }, [user?.user?.identification, linktext])

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
        await navigator.share({ title: t('inviteFriends'), text: t('inviteMessage'), url: inviteLink })
      } catch (err) {}
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
      <TutorHomeGreeting firstName={firstName} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <TutorHomeHero onAddStudent={() => setIsModalOpen(true)} />
        </div>
        <div className="lg:col-span-4">
          <TutorPromoCard
            inviteLink={inviteLink}
            studentsCount={students.length}
            copied={copied}
            onCopyLink={handleCopyLink}
          />
        </div>
      </div>

      <TutorStatsGrid overview={overview} isLoading={isLoadingOverview} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TutorRecentStudents students={students} isLoading={isLoadingReferrals} />
        </div>
        <div className="lg:col-span-3">
          <TutorGroupsCard groups={groups} isLoading={isLoadingGroups} />
        </div>
        <div className="lg:col-span-4">
          <TutorResultsChart
            labels={get(chart, 'labels', [])}
            values={get(chart, 'values', [])}
            isLoading={isLoadingChart}
            compact
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

export default TutorHome
