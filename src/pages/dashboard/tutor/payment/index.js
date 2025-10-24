import LayoutAdmin from '@/layout/LayoutAdmin'
import Payment from '@/modules/tutor/payment/pages/Payment'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('tutorPayments.paymentpanel')}>
      <Payment />
    </LayoutAdmin>
  )
}

export default Index
