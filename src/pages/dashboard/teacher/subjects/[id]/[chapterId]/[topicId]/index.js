import LayoutAdmin from '@/layout/LayoutAdmin'
import SubjectBreadcrumbs from '@/modules/teacher/subjects/components/SubjectBreadcrumbs'
import SubjectHeader from '@/modules/teacher/subjects/components/SubjectHeader'
import SubjectDetail from '@/modules/teacher/subjects/pages/SubjectDetail'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('subjectTestPart')}>
      <SubjectBreadcrumbs />
      <SubjectHeader />
      <SubjectDetail />
    </LayoutAdmin>
  )
}

export default Index
