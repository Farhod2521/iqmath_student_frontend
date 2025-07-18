import LayoutAdmin from '@/layout/LayoutAdmin'
import Statistics from '@/modules/teacher/statistics/Statistics'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('statistics')}>
      <Statistics />
    </LayoutAdmin>
  )
}

export default Index
