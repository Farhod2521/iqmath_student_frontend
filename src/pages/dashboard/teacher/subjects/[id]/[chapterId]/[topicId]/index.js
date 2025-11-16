import LayoutAdmin from '@/layout/LayoutAdmin'
import SubjectBreadcrumbs from '@/modules/teacher/subjects/components/SubjectBreadcrumbs'
import SubjectHeader from '@/modules/teacher/subjects/components/SubjectHeader'
import SubjectDetail from '@/modules/teacher/subjects/pages/SubjectDetail'

const Index = () => {
  return (
    <LayoutAdmin title={'Предметная и тестовая часть'}>
      <SubjectBreadcrumbs />
      <SubjectHeader />
      <SubjectDetail />
    </LayoutAdmin>
  )
}

export default Index
