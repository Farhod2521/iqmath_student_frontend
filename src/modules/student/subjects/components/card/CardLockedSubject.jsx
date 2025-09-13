import { config } from '@/config'
import { getPaymentInitiate } from '@/services/controllers'
import { Card, CardFooter, Image } from '@heroui/react'
import { get } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaLock } from 'react-icons/fa'
import { FaSpinner } from 'react-icons/fa6'

const CardLockedSubject = ({ item }) => {
  const { i18n } = useTranslation()
  const [isPlaymentLoadinng, setIsPaymetLoading] = useState(false)
  const handleInitiatePayment = () => {
    setIsPaymetLoading(true)
    // CardLockedSubject da subscription_id yo'q, shuning uchun null yuboramiz
    getPaymentInitiate(null,null)
      .then((res) => {
        // API dan kelayotgan checkout_url allaqachon tayyor
        const checkoutUrl = res.data.data.checkout_url
        // To'lov sahifasiga yo'naltirish
        window.open(checkoutUrl, '_blank')
      })
      .finally(() => setIsPaymetLoading(false))
  }

  const imageUrl =
    i18n.language === 'uz' ? `${config.API_URL}${get(item, 'image_uz')}` : `${config.API_URL}${get(item, 'image_ru')}`
  const label = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')

  return (
    <Card isFooterBlurred className="border-none  cursor-pointer h-[280px] w-[200px] shadow-sm" radius="sm">
      <img alt={label} className="object-cover" src={imageUrl} width={240} />
      <div className="absolute z-20 bottom-4 text-black/20 w-full flex justify-center">{label}</div>
      <CardFooter onClick={handleInitiatePayment} className="absolute bg-white/10 h-full bottom-0 z-10">
        <div className="flex items-center justify-center w-full hover:scale-110">
          {isPlaymentLoadinng ? (
            <FaSpinner spin size={40} className="text-black/40" />
          ) : (
            <FaLock size={40} className="text-black/40" />
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardLockedSubject
