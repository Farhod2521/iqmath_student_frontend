import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import BattleArena from '@/modules/student/battle/components/BattleArena'

const BattleRoomPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query

  return (
    <LayoutAdmin>
      <div className="py-2">
        <HeaderTitle title={t('battle.arenaTitle')} />
      </div>
      {id ? <BattleArena roomId={id} /> : null}
    </LayoutAdmin>
  )
}

export default BattleRoomPage
