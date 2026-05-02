import HeaderTitle from '@/components/header-title'
import LayoutAdmin from '@/layout/LayoutAdmin'
import Payment from '@/modules/tutor/payment/pages/Payment'
import PaymentTable from '@/modules/tutor/payment/pages/PaymentTable'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  return (
    <LayoutAdmin>
      <div className="mb-4 border-b">
        <HeaderTitle title={t('tutorPayments.paymentpanel')} />
      </div>
      <Payment />
      <PaymentTable />
    </LayoutAdmin>
  )
}

export default Index
