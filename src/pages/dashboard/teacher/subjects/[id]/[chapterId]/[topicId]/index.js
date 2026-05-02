import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import SubjectBreadcrumbs from '@/modules/teacher/subjects/components/SubjectBreadcrumbs'
import SubjectHeader from '@/modules/teacher/subjects/components/SubjectHeader'
import SubjectDetail from '@/modules/teacher/subjects/pages/SubjectDetail'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-2">
        <HeaderTitle title={t('subjectTestPart')} />
      </div>
      <SubjectBreadcrumbs />
      <SubjectHeader />
      <SubjectDetail />
    </LayoutAdmin>
  )
}

export default Index
