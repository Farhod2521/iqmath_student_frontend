import LayoutQuestion from '@/layout/LayoutQuestion'
import DiagnosticQuestions from '@/modules/student/subjects/pages/DiagnosticQuestions'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function DiagnosticTestPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query

  return (
    <LayoutQuestion
      title={t('diagnostics')}
      subtitle={t('test')}
      onClick={() => router.push('/dashboard/student/diagnostics')}
    >
      <DiagnosticQuestions subjectId={id} />
    </LayoutQuestion>
  )
}
