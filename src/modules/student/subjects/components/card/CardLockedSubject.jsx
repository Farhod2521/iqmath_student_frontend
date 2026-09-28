import { usePricingModalStore } from '@/store'
import CardSubject from './CardSubject'

// Obuna yo'q fan — bosilganda tarif oynasi ochiladi
const CardLockedSubject = ({ item, theme }) => {
  const { openPricingModal } = usePricingModalStore()

  return <CardSubject item={item} theme={theme} locked onClick={() => openPricingModal(0)} />
}

export default CardLockedSubject
