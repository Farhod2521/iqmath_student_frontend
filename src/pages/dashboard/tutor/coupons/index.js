import LayoutAdmin from '@/layout/LayoutAdmin'
import Coupons from '@/modules/tutor/coupons/pages/Coupons'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('users_with_coupons')}>
      <Coupons />
    </LayoutAdmin>
  )
}

export default Index
