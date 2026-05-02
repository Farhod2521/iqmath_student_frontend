import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import Friends from '@/modules/student/friends/pages/Friends'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div>
        <HeaderTitle title={t('friends')} />
      </div>
      <Friends />
    </LayoutAdmin>
  )
}

export default Index
