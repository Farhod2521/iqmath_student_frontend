import CoinsIcon from '@/components/icons/coins'
import Image from 'next/image'
import { useState } from 'react'
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
const items = [
  { img: 't-shirt', title: 'Футболка с принтом', coin: '50' },
  { img: 'phone', title: 'Смартфон', coin: '50' },
  { img: 'noutbook', title: 'Ноутбук', coin: '50' },
  { img: 'bag', title: 'Сумка', coin: '50' },
  { img: 'noutbook', title: 'Сумка', coin: '50' },
  { img: 'bag', title: 'Сумка', coin: '50' },
  { img: 'phone', title: 'Сумка', coin: '50' }
]

const Index = () => {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const closeModal = () => setOpenModal(false)
  const { scoreData } = useScoreStore()

  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  console.log(scoreData)
  // headerTitle={"Баллы"}
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
              <p className="text-[17px] font-medium text-white">{t('yourcoins') || 'Jami tangalaringiz'}</p>
              <div className="flex items-center gap-x-[10px] mt-[8px] mb-[8px]">
                <CoinsIcon color="white" />
                <p className="text-[26px] font-semibold text-white">
                  {get(scoreData, 'coin', 0)} {t('coin') || 'tanga'}
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

        {/* <div className="col-span-12 ">
          <h1 className="text-[24px] font-semibold my-[24px]">Доступные призы</h1>

          <div className="relative">
            <Swiper
              spaceBetween={24}
              navigation={true}
              modules={[Navigation]}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 }
              }}
              loop={true}
              className="present-swiper bg-transparent"
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card className="bg-[#F5F6F8] border border-[#E9E9E9] pt-[5px] px-[16px] pb-[16px] rounded-[12px]">
                    <PresentCard
                      img={item.img}
                      title={item.title}
                      coin={item.coin}
                      onclick={index === 0 ? handleOpenModal : undefined}
                    />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div> */}
      </div>

      {openModal && (
        <>
          <div
            onClick={closeModal}
            className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 `}
          ></div>
          <div
            onClick={closeModal}
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 `}
          >
            <div className="bg-white p-6 rounded-[16px] shadow-lg w-[497px] font-sf">
              <button onClick={closeModal} className="float-right rounded">
                <Image src={'/icons/close.svg'} alt="circle" width={24} height={24} />
              </button>
              <div className="flex flex-col items-center justify-center">
                <Image src={'/images/success-circle.png'} alt="circle" width={85} height={85} />

                <h2 className=" font-semibold mt-[24px] text-[22px]">Вы успешно обменяли свои баллы</h2>
                <p className="text-[19px] text-[#484848] mt-[16px] text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </LayoutAdmin>
  )
}

export default Index
