import CoinsIcon from '@/components/icons/coins'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import 'swiper/css'
import 'swiper/css/navigation'
import { useSession } from 'next-auth/react'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import useGetQuery from '@/hooks/api/useGetQuery'
import { get } from 'lodash'
import { useScoreStore } from '@/store'
import LayoutAdmin from '@/layout/LayoutAdmin'
import CoinConvert from '@/modules/student/coins/CoinConvert'

const Index = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { scoreData } = useScoreStore()

  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken && false
  })

  return (
    <LayoutAdmin title={t('points')}>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div
          style={{ backgroundImage: `url(/images/bg-img-2.png)` }}
          className="col-span-12 p-[24px] rounded-[12px] text-white bg-no-repeat bg-cover relative"
        >
          <div className="flex gap-8 mb-6">
            <div className=" min-w-[180px]">
              <p className="text-[17px] font-medium">{t('yourballs')}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold">
                  {get(coins, 'data.score')} {t('ball')}
                </p>
              </div>
            </div>
            <div className=" min-w-[180px]">
              <p className="text-[17px] font-medium text-white">{t('yourcoins')}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold text-white">
                  {get(scoreData, 'coin', 0)} {t('coin')}
                </p>
              </div>
            </div>
            <div className=" min-w-[180px]">
              <p className="text-[17px] font-medium text-white">{t('yoursums')}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold text-white">
                  {get(scoreData, 'sum', 0)} {t('sum')}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[17px] text-[#DCDCDD] w-3/5">{t('descballs')}</p>

          <Image
            src={'/images/wallet-img-1.png'}
            alt="wallet-img"
            width={254}
            height={266}
            className="absolute right-0 bottom-0"
          />

          <Image
            src={'/images/wallet-img-2.png'}
            alt="wallet-img"
            width={153}
            height={159}
            className="absolute right-[220px] bottom-0"
          />
          <Image
            src={'/images/wallet-img-3.png'}
            alt="wallet-img"
            width={90}
            height={90}
            className="absolute right-[240px] top-0"
          />
          <Image
            src={'/images/wallet-img-4.png'}
            alt="wallet-img"
            width={41}
            height={41}
            className="absolute right-[500px] top-5"
          />
        </div>
      </div>
      <CoinConvert />
    </LayoutAdmin>
  )
}

export default Index
