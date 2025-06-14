import LayoutQuestion from '@/modules/subjects/layouts/LayoutQuestion'
import RecommendQuestions from '@/modules/subjects/pages/RecommendQuestions'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query

  return (
    <LayoutQuestion
      title={t('recommended')}
      subtitle={t('task')}
      onClick={() => router.push(`/dashboard/student/recommendations/${id}`)}
    >
      <RecommendQuestions />
    </LayoutQuestion>
  )
}
