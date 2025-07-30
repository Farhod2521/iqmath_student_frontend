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
      <Card onPress={() => console.log('LOG')} className=" border-none cursor-pointer h-[280px] w-[200px] shadow-[0px_3px_17px_-5px_#00000038]" radius="sm">
        <img 
          alt={label} 
          className="object-cover" 
          src={imageUrl} 
          width={240}
          onError={(e) => {
            e.target.src = '/images/education.png' // Fallback image
          }}
        />
        <div className="justify-center text-white py-3 text-center bg-[#5d87ff] hover:bg-[#4463bb] absolute bottom-0 w-full z-10 rounded-sm transition-all duration-200">
          {label}
        </div>
      </Card>
    </div>
  )
}

export default CardSubject
