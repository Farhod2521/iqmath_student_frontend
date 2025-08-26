import LayoutAdmin from '@/layout/LayoutAdmin'
import Parents from '@/modules/teacher/parents/pages/Parents'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('parents')}>
      <Parents />
    </LayoutAdmin>
  )
}

export default Index
