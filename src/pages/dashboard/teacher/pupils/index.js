import Students from '@/modules/teacher/students/page/Students'
import LayoutAdmin from '@/layout/LayoutAdmin'
import ModalConfidentiality from '@/modules/student/subjects/components/modal/ModalConfidentiality'

const Index = () => {
  return (
    <LayoutAdmin>
      <ModalConfidentiality />
      <Students />
    </LayoutAdmin>
  )
}

export default Index
