import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import Referal from '@/modules/tutor/referal/page/Referal'
import HeaderTitle from '@/components/header-title'

function Index() {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        <HeaderTitle title={t('referal')} />
      </div>
      <Referal />
    </LayoutAdmin>
  )
}

export default Index
