import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import StudentDetails from '@/modules/teacher/students/page/StudentDetails'
import { useTranslation } from 'react-i18next'

export default function ChildDetailPage() {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('childInfo')} />
      <StudentDetails />
    </LayoutAdmin>
  )
}
