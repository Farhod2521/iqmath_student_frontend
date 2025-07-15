import MainWrapper from '@/layout/MainWrapper'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import Subjects from '@/modules/student/subjects/pages/Subjects'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('subjects')}>
      <ModalConfidentiality />
      <Subjects />
    </MainWrapper>
  )
}

export default Index
