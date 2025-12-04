import { useScoreStore } from '@/store'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

function NavbarPoints() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <Button
      isLoading={scoreData.isLoading}
      variant="bordered"
      onPress={() => router.push('/dashboard/student/coins')}
      className="
        border-[#E9E9E9]
        rounded-md border shadow-sm
        flex items-center gap-1 sm:gap-2
        hover:bg-[#5d87ff] hover:text-white hover:border-white
        transition-all duration-200
         py-1 px-3 h-8 sm:h-9 
      "
    >
      <Image src="/icons/coins-logo.svg" alt="Coins logo" width={16} height={16} className="sm:w-[22px] sm:h-[22px]" />

      <p className="text-sm sm:text-md font-medium flex gap-1">
        {scoreData.score} <span className="hidden sm:block">{t('ball')}</span>
      </p>
    </Button>
  )
}

export default NavbarPoints
