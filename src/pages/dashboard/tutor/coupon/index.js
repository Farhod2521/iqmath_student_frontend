import LayoutAdmin from '@/layout/LayoutAdmin'
import Coupons from '@/modules/tutor/coupon/pages/Coupons'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('coupons')}>
      <Coupons />
    </LayoutAdmin>
  )
}

export default Index
