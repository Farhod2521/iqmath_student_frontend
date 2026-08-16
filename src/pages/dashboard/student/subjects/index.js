import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import SubjectsBanner from '@/modules/student/subjects/components/banner/SubjectsBanner'
import Subjects from '@/modules/student/subjects/pages/Subjects'

const Index = () => {
  return (
    <LayoutAdmin>
      <div className="mb-6">
        <SubjectsBanner />
      </div>
      <ModalConfidentiality />
      <Subjects />
    </LayoutAdmin>
  )
}

export default Index
