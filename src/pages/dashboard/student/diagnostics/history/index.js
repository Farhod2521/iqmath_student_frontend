import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import DiagnosticHistory from '@/modules/student/diagnostic/History'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const { t } = useTranslation()
  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        <HeaderTitle title={t('diagnosis_history')} />
      </div>
      <DiagnosticHistory />
    </LayoutAdmin>
  )
}
