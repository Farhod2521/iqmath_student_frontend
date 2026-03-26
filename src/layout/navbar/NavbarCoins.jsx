import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { useScoreStore } from '@/store'

function NavbarCoins() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()
  console.log('data', scoreData)

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
      <Image src="/icons/ball.svg" alt="Points logo" width={16} height={16} className="sm:w-[22px] sm:h-[22px]" />
      <p className="text-sm sm:text-md font-medium flex gap-1">
        {scoreData.coin} <span className="hidden sm:block">{t('coin')}</span>
      </p>
    </Button>
  )
}

export default NavbarCoins
