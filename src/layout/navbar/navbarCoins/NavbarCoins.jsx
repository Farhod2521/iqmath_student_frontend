import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import CoinIcon from './CoinIcon'
import { useRouter } from 'next/router'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'

const NavbarCoins = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { t } = useTranslation()

  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })


  return (
    <div
      className="flex items-center gap-2 px-3 border-2 py-[5px] rounded-lg cursor-pointer"
      onClick={() => router.push('/dashboard/student/coins')}
    >
      <CoinIcon className="w-5 h-5" />
      <span className="font-medium">
        {coins?.data?.coin}
        <span className="hidden sm:inline ml-1">{t('coin')}</span>
      </span>
    </div>
  )
}

export default NavbarCoins
