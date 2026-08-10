import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import HeaderTitle from '@/components/header-title'
import CouponUsersList from '@/modules/cupons/CouponUsersList'

const CouponsUsers = () => {
  const { t } = useTranslation()

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('users_with_coupons')} />
      <div className="grid grid-cols-12 gap-[24px] font-sf pt-2 pb-20">
        <div className="col-span-12">
          <CouponUsersList />
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default CouponsUsers
