import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import SubjectsStats from '@/modules/student/subjects/components/stats/SubjectsStats'
import Subjects from '@/modules/student/subjects/pages/Subjects'

const Index = () => {
  return (
    <LayoutAdmin>
      <div className="mb-6">
        <SubjectsStats />
      </div>
      <ModalConfidentiality />
      <Subjects />
    </LayoutAdmin>
  )
}

export default Index
