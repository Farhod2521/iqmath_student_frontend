import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import Subjects from '@/modules/student/subjects/pages/Subjects'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b-1">
        <HeaderTitle title={t('subjects')} />
      </div>
      <ModalConfidentiality />
      <Subjects />
    </LayoutAdmin>
  )
}

export default Index
