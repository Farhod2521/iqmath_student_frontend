import LayoutAdmin from '@/layout/LayoutAdmin'
import ChildDetails from '@/modules/teacher/parents/pages/ChildDetails'
import { useTranslation } from 'react-i18next'

const ChildDetailsPage = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('childInfo')}>
      <ChildDetails />
    </LayoutAdmin>
  )
}

export default ChildDetailsPage
