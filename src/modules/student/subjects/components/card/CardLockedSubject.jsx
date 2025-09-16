import { config } from '@/config'
import { Card, CardFooter } from '@heroui/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { usePricingModalStore } from '@/store'

const CardLockedSubject = ({ item }) => {
  const { i18n } = useTranslation()
  const { openPricingModal } = usePricingModalStore()
  
  const handleInitiatePayment = () => {
    openPricingModal(0)
  }

  const imageUrl =
    i18n.language === 'uz' ? `${config.API_URL}${get(item, 'image_uz')}` : `${config.API_URL}${get(item, 'image_ru')}`
  const label = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')

  return (
    <Card isFooterBlurred className="border-none  cursor-pointer h-[280px] w-[200px] shadow-sm" radius="sm">
      <img alt={label} className="object-cover" src={imageUrl} width={240} />
      <div className="absolute z-20 bottom-4 text-[#b5b5b5] w-full flex justify-center">{label}</div>
      <CardFooter onClick={handleInitiatePayment} className="absolute bg-white/10 h-full bottom-0 z-10">
        <div className="flex items-center justify-center w-full hover:scale-110">
          <img src="/icons/qulf.svg" alt="lock" width={55} height={55} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardLockedSubject
