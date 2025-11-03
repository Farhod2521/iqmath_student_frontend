import LayoutAdmin from '@/layout/LayoutAdmin'
import Payment from '@/modules/tutor/payment/pages/Payment'
import PaymentTable from '@/modules/tutor/payment/pages/PaymentTable'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin title={t('tutorPayments.paymentpanel')}>
      <Payment />
      <PaymentTable />
    </LayoutAdmin>
  )
}

export default Index
