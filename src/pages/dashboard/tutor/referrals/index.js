import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import Referal from '@/modules/tutor/referal/page/Referal'
import { useTranslation } from 'react-i18next'
// import Referrals from '@/modules/tutor/referrals/pages/Referrals'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('via_link')}>
      <ModalConfidentiality />
      <Referal />
    </LayoutAdmin>
  )
}

export default Index
