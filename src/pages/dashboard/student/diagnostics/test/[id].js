import DiagnosticQuestions from '@/modules/student/subjects/pages/DiagnosticQuestions'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function DiagnosticTestPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query
  const goBack = () => router.push('/dashboard/student/diagnostics')

  return (
    <DiagnosticQuestions
      // Router query yuklanmaguncha subjectId bo'sh — test so'rovi yuborilmaydi
      subjectId={router.isReady ? id : undefined}
      title={t('diagnostics')}
      subtitle={t('test')}
      onBack={goBack}
      onClose={goBack}
    />
  )
}
