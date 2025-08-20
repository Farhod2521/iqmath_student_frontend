import LayoutAdmin from '@/layout/LayoutAdmin'
import Friends from '@/modules/student/friends/pages/Friends'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin title={t('friends')}>
      <Friends />
    </LayoutAdmin>
  )
}

export default Index
