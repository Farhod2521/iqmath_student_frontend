import { useTranslation } from 'react-i18next'
import CouponsList from '@/modules/cupons/CouponsList'
import CouponUsersList from '@/modules/cupons/CouponUsersList'

const CouponsTab = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-[14px] font-semibold text-[#191C1D]">{t('coupons')}</h3>
        <CouponsList />
      </div>

      <div>
        <h3 className="mb-3 text-[14px] font-semibold text-[#191C1D]">{t('users_with_coupons')}</h3>
        <CouponUsersList />
      </div>
    </div>
  )
}

export default CouponsTab
