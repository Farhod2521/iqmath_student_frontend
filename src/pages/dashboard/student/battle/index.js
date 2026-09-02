import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import BattleSetupForm from '@/modules/student/battle/components/BattleSetupForm'
import BattleRatingWidget from '@/modules/student/battle/components/BattleRatingWidget'

const BattleSetupPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const handleRoomReady = (roomId) => {
    if (roomId) router.push(`/dashboard/student/battle/room/${roomId}`)
  }

  return (
    <LayoutAdmin>
      <div className="py-2">
        <HeaderTitle title={t('battle.pageTitle')} />
      </div>
      <div className="mb-6">
        <BattleRatingWidget />
      </div>
      <BattleSetupForm onRoomReady={handleRoomReady} />
    </LayoutAdmin>
  )
}

export default BattleSetupPage
