import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import KpiDashboard from '@/modules/teacher/kpi/KpiDashboard'
import { useTranslation } from 'react-i18next'

function KpiPage() {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('kpiDashboard')} />
      <KpiDashboard />
    </LayoutAdmin>
  )
}

export default KpiPage
