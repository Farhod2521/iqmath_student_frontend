import { useRouter } from 'next/router'
import { useState } from 'react'

const Brand = ({ onLoad, footer = false }) => {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  const handleLogoClick = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
    if (onLoad) onLoad()
  }

  const fallbackImage = '/icons/brand.svg'

  const imageSrc = 'https://api.iqmath.uz/system/logo/logo.png' || fallbackImage

  return (
    <div className={'  '}>
      <button onClick={handleLogoClick} className="flex  gap-1.5 sm:gap-2 items-center">
        <img
          src={imageError ? fallbackImage : imageSrc}
          alt="brand"
          // width={34}
          // height={34}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="
            w-7 h-7
            sm:w-8 sm:h-8
            md:w-9 md:h-9
            lg:w-[34px] lg:h-[34px]
            object-contain
          "
        />
        <h1
          className={`
            font-bicubik font-myriad font-normal
            text-xl sm:text-2xl md:text-3xl lg:text-[32px]
            leading-none
            ${footer ? 'text-white' : 'text-black'}
            ${router.pathname === '/' ? 'dark:text-[#3965c6]' : 'dark:text-white'}
          `}
        >
          MATH
        </h1>
      </button>
    </div>
  )
}

export default Brand
