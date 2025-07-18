import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import Subjects from '@/modules/student/subjects/pages/Subjects'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('subjects')}>
      <ModalConfidentiality />
      <Subjects />
    </LayoutAdmin>
  )
}

export default Index
