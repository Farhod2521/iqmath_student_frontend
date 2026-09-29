import SubjectQuestions from '@/modules/student/subjects/pages/SubjectQuestions'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id, chapterId, topicId } = router.query

  return (
    <SubjectQuestions
      title={t('theory')}
      subtitle={t('task')}
      onBack={() => router.push(`/dashboard/student/subjects/${id}/${chapterId}/${topicId}`)}
      onClose={() => router.push(`/dashboard/student/subjects/${id}`)}
    />
  )
}
