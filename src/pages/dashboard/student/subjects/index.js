import MainWrapper from '@/layout/MainWrapper'
import Subjects from '@/modules/subjects/pages/Subjects'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper title={t('subjects')}>
      <Subjects />
    </MainWrapper>
  )
}

export default Index
