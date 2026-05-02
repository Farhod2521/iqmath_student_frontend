import { useTranslation } from 'react-i18next'
import Students from '@/modules/teacher/students/page/Students'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import HeaderTitle from '@/components/header-title'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('users')} />
      <ModalConfidentiality />
      <Students />
    </LayoutAdmin>
  )
}

export default Index
