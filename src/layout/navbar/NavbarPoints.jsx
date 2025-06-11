import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { Button } from '@heroui/react'
import { get } from 'lodash'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function NavbarPoints() {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTranslation()
  // o'quvchini bali
  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })


  return (
    <Button
      variant="bordered"
      onPress={() => router.push('/dashboard/student/coins')}
      className="border-[#E9E9E9] border-1 min-w-0 h-8 sm:h-9 px-3 sm:px-4 py-1 rounded-md flex items-center gap-x-1 sm:gap-x-2 bg-white"
    >
      <Image src={'/icons/coins-logo.svg'} alt="coins-logo" width={16} height={16} className="sm:w-[20px] sm:h-[20px]" />
      <span className="text-[16px] sm:text-[19px] font-medium">
        {get(coins, 'data.score')} <span className="ball-text">{t('ball')}</span>
      </span>
    </Button>
  )
}

export default NavbarPoints
