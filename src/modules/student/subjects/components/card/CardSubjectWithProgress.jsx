import { config } from '@/config'
import { Card, Progress } from '@heroui/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'

const CardSubjectWithProgress = ({ item,  onRecommendationsClick, onDiagnosticsClick, showDiagnosticStatus = false, isDiagnostic = false }) => {
  const { t, i18n } = useTranslation()

  const imageUrl =
    i18n.language === 'uz' ? `${config.API_URL}${get(item, 'image_uz')}` : `${config.API_URL}${get(item, 'image_ru')}`
  const label = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')
  
  const progressValue = get(item, 'progress_percent')
  const displayProgress = (progressValue === null || progressValue === undefined) ? 0 : Math.round(progressValue || 0)
  
  const hasTakenDiagnostic = get(item, 'has_taken_diagnostic', false) || get(item, 'has_taken_diagnostic ', false)

  // Agar has_taken_diagnostic false bo'lsa va bu recommendations sahifasi bo'lsa, card yaratmaslik
  if (!isDiagnostic && !hasTakenDiagnostic) {
    return null
  }

  const handleCardClick = () => {
    if (isDiagnostic) {
      onDiagnosticsClick()
    } else {
      onRecommendationsClick()
    }
  }

  return (
    <div 
    onClick={handleCardClick} 
      className={`group cursor-pointer`}
    >
      <Card className="border-none h-[280px] w-[200px] shadow-[0px_3px_17px_-5px_#00000038] group-hover:shadow-[0px_6px_25px_-8px_#00000050] transition-all duration-300" radius="sm">
        <div className="relative">
          <img 
            alt={label} 
            className="object-cover transition-transform duration-300" 
            src={imageUrl} 
            width={240}
            onError={(e) => {
              e.target.src = '/images/education.png'
            }}
          />
      
        </div>
        
        <div className="justify-center text-white py-3 text-center bg-[#5d87ff] group-hover:bg-[#4463bb] absolute bottom-0 w-full z-10 rounded-sm transition-all duration-200">
          {label}
        </div>
      </Card>
      
      <div className="mt-3 w-[200px]">
        <div className="">
          <div className="flex items-center gap-2">
            {showDiagnosticStatus && !hasTakenDiagnostic ? (
              // Agar diagnostika o'tilmagan bo'lsa, "Hali yechilmagan" yozuvini ko'rsatish
              <div className="flex-1">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black"
                    >
                      <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z" 
                        fill="currentColor"
                      />
                    </svg>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        onDiagnosticsClick()
                      }}
                      className="text-sm font-medium hover:underline cursor-pointer"
                    >
                      {t('notYetSolved')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Agar diagnostika o'tilgan bo'lsa yoki oddiy recommendations bo'lsa, progress ko'rsatish
              <>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`
                      absolute top-0 left-0 h-full rounded-full transition-all duration-500
                      ${displayProgress === 100 ? 'bg-green-500' : displayProgress > 50 ? 'bg-blue-500' : 'bg-yellow-400'}
                    `}
                    style={{ width: `${displayProgress}%` }}
                  ></div>
                </div>
                
                <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                  {displayProgress}%
                </span>
              </>
            )}
            
            <div className="flex items-center gap-1">
              {showDiagnosticStatus ? (
                // Diagnostic specific buttons
                <>
                  {hasTakenDiagnostic ? (
                    // Retake and recommendations buttons for completed diagnostics
                    <>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation() 
                          onDiagnosticsClick() 
                        }}
                        title="Qayta topshirish"
                      >
                        <img 
                          src='/icons/refresh.svg' 
                          alt='retake' 
                          width={35} 
                          height={35}
                          className="text-gray-600 hover:text-blue-600"
                        />
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation() 
                          onRecommendationsClick && onRecommendationsClick() 
                        }}
                        title="Tavsiyalarga o'tish"
                      >
                        <img 
                          src='/icons/eye-dark.svg' 
                          alt='recommendations' 
                          width={35} 
                          height={35}
                          className="text-gray-600 hover:text-blue-600"
                        />
                      </button>
                    </>
                  ) : (
                    <>
                    
                    </>
                  )}
                </>
              ) : (
                // Regular buttons for recommendations
                <>
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Qayta topshirish tugmasi diagnostika testlariga o'tadi
                      onDiagnosticsClick()
                    }}
                    title="Qayta topshirish"
                  >
                    <img 
                      src='/icons/refresh.svg' 
                      alt='refresh' 
                      width={35} 
                      height={35}
                      className="text-gray-600 hover:text-blue-600"
                    />
                  </button>
                  
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation() 
                      onRecommendationsClick() 
                    }}
                    title="Tavsiyalarga o'tish"
                  >
                    <img 
                      src='/icons/eye-dark.svg' 
                      alt='eye' 
                      width={38} 
                      height={38}
                      className="text-gray-600 hover:text-blue-600"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSubjectWithProgress 