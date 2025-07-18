import LayoutQuestion from '@/modules/student/subjects/layouts/LayoutQuestion'
import SubjectQuestions from '@/modules/student/subjects/pages/SubjectQuestions'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, chapterId, topicId } = router.query

  return (
    <LayoutQuestion
      title={t('theory')}
      subtitle={t('task')}
      onClick={() => router.push(`/dashboard/student/subjects/${id}/${chapterId}/${topicId}`)}
    >
      <SubjectQuestions />
    </LayoutQuestion>
  )
}
