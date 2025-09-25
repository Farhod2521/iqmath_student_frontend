import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import Referal from '@/modules/tutor/referal/page/Referal'

function Index() {
  const { t } = useTranslation()

  return  <LayoutAdmin title={t('referal')}>
    <Referal />
  </LayoutAdmin>
}

export default Index