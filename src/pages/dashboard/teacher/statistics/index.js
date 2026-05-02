import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import Statistics from '@/modules/teacher/statistics/Statistics'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('statistics')} />
      <Statistics />
    </LayoutAdmin>
  )
}

export default Index
