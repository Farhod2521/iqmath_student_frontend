import LayoutAdmin from '@/layout/LayoutAdmin'
import DiagnosticSubjects from '@/modules/student/subjects/pages/DiagnosticSubjects'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

export default function Index() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <LayoutAdmin>
      <DiagnosticSubjects />
    </LayoutAdmin>
  )
}
