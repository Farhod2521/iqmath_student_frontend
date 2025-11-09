import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { useScoreStore } from '@/store'

function NavbarCoins() {
  const router = useRouter()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  return (
    <Button
      isLoading={scoreData.isLoading}
      variant="bordered"
      onPress={() => router.push('/dashboard/student/coins')}
      className="border-[#E9E9E9] py-1 px-2 sm:px-3 rounded-md border shadow-sm min-w-10 sm:min-w-20 h-8 sm:h-9 flex items-center gap-1 sm:gap-2 hover:bg-[#5d87ff] hover:text-white hover:border-white transition-all duration-200"
    >
      <Image src="/icons/ball.svg" alt="Points logo" width={18} height={18} className="sm:w-22 sm:h-22" />
      <p className="text-sm sm:text-md font-medium hidden sm:block">
        {scoreData.coin} {t('coin')}
      </p>
    </Button>
  )
}

export default NavbarCoins
