import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import HeaderTitle from '@/components/header-title'
import CouponsList from '@/modules/cupons/CouponsList'

const Index = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6 font-sf pb-16 sm:pb-20">
        <div className="col-span-12">
          <HeaderTitle title={t('coupons')} />
          <div className="mt-6">
            <CouponsList />
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
