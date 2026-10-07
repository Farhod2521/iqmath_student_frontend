import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { usePricingModalStore } from '@/store'
import PaymentsTabView from '@/modules/parent/children/overview/PaymentsTab'

/** O'quvchining o'z to'lovlari — ota-ona sahifasidagi "To'lovlar" tabi bilan bir xil ko'rinish */
const PaymentsTab = () => {
  const { openPricingModal } = usePricingModalStore()

  return (
    <PaymentsTabView
      url={URLS.studentMyPayments}
      queryKey={KEYS.studentMyPayments}
      onExtend={() => openPricingModal()}
    />
  )
}

export default PaymentsTab
