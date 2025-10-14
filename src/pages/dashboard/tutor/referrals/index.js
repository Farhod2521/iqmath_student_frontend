import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import Referal from '@/modules/tutor/referal/page/Referal'
// import Referrals from '@/modules/tutor/referrals/pages/Referrals'

const Index = () => {
  return (
    <LayoutAdmin title="Referrallar">
      <ModalConfidentiality />
      <Referal />
    </LayoutAdmin>
  )
}

export default Index
