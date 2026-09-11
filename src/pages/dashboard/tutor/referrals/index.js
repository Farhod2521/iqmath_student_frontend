import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'
import TutorHome from '@/modules/tutor/home/pages/TutorHome'

const Index = () => {
  return (
    <LayoutAdmin>
      <ModalConfidentiality />
      <TutorHome />
    </LayoutAdmin>
  )
}

export default Index
