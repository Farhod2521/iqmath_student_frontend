// CardSubject
import { config } from '@/config'
import { Card, Image } from '@heroui/react'
import { get } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

const CardSubject = ({ item, onClick }) => {
  const { i18n } = useTranslation()
  const router = useRouter()

  const imageUrl =
    i18n.language === 'uz' ? `${config.API_URL}${get(item, 'image_uz')}` : `${config.API_URL}${get(item, 'image_ru')}`
  const label = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')
  return (
    <div onClick={onClick}>
      <Card onPress={() => console.log('LOG')} className="border-none cursor-pointer h-[280px] w-[200px]" radius="sm">
        <Image alt={label} className="object-cover" src={imageUrl} width={240} />
        <div className="justify-center text-white py-3 text-center bg-[#5d87ff] absolute bottom-0 w-full z-10 rounded-sm">
          {label}
        </div>
      </Card>
    </div>
  )
}

export default CardSubject
