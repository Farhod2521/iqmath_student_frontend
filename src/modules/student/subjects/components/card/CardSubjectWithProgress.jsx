// CardSubjectWithProgress - Recommendations sahifasi uchun
import { config } from '@/config'
import { Card, Progress } from '@heroui/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'

const CardSubjectWithProgress = ({ item, onClick }) => {
  const { i18n } = useTranslation()

  const imageUrl =
    i18n.language === 'uz' ? `${config.API_URL}${get(item, 'image_uz')}` : `${config.API_URL}${get(item, 'image_ru')}`
  const label = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')
  
  // Progress qiymatini aniqlash
  const progressValue = get(item, 'progress_percent')
  const displayProgress = progressValue === null || progressValue === 0 ? 0 : progressValue

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <Card onPress={() => console.log('LOG')} className="border-none cursor-pointer h-[280px] w-[200px] shadow-[0px_3px_17px_-5px_#00000038] group-hover:shadow-[0px_6px_25px_-8px_#00000050] transition-all duration-300" radius="sm">
        <div className="relative">
          <img 
            alt={label} 
            className="object-cover transition-transform duration-300" 
            src={imageUrl} 
            width={240}
            onError={(e) => {
              e.target.src = '/images/education.png' // Fallback image
            }}
          />
          
       <div className="absolute top-2 left-2 right-2 z-20">
  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
    <div className="flex items-center gap-2">
      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`
            absolute top-0 left-0 h-full rounded-full transition-all duration-500
            ${displayProgress === 100 ? 'bg-green-500' : displayProgress > 50 ? 'bg-blue-500' : 'bg-yellow-400'}
          `}
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>
      
      {/* Foiz */}
      <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
        {displayProgress}%
      </span>
    </div>
  </div>
</div>
  <div className="bg-transparent rounded-lg p-2">
    <div className="flex items-center gap-2">
      <Progress 
        value={displayProgress} 
        className="w-full"
        color={displayProgress === 100 ? "success" : displayProgress > 50 ? "primary" : "warning"}
        size="sm"
      />
      <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
        {displayProgress}%
      </span>
    </div>
  </div>
</div>
        
        <div className="justify-center text-white py-3 text-center bg-[#5d87ff] group-hover:bg-[#4463bb] absolute bottom-0 w-full z-10 rounded-sm transition-all duration-200">
          {label}
        </div>
      </Card>
    </div>
  )
}

export default CardSubjectWithProgress 