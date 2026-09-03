import { useRouter } from 'next/router'
import LayoutAdmin from '@/layout/LayoutAdmin'
import BattleSetupForm from '@/modules/student/battle/components/BattleSetupForm'

const BattleSetupPage = () => {
  const router = useRouter()

  const handleRoomReady = (roomId) => {
    if (roomId) router.push(`/dashboard/student/battle/room/${roomId}`)
  }

  return (
    <LayoutAdmin>
      <BattleSetupForm onRoomReady={handleRoomReady} />
    </LayoutAdmin>
  )
}

export default BattleSetupPage
