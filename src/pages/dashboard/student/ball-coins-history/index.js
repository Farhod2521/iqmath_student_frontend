import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineClock, HiOutlineGift, HiOutlineSparkles } from 'react-icons/hi2'

const BallCoinsHistory = () => {
  const { t } = useTranslation()

  const {
    data,
    isLoading: coinsLoading,
    error
  } = useGetQuery({
    key: KEYS.ballCoinsHistory,
    url: URLS.ballCoinsHistory
  })

  const historyData = data?.data?.results || []

  if (coinsLoading) {
    return (
      <LayoutAdmin>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
        </div>
      </LayoutAdmin>
    )
  }

  if (error) {
    return (
      <LayoutAdmin>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-xl font-bold text-red-500">Xatolik yuz berdi</div>

            <p className="mt-2 text-gray-400">Ma&apos;lumotlarni yuklashda muammo bo&apos;ldi</p>
          </div>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <div className="">
        <div className="mb-6">
          <HeaderTitle title={t('pointsHistory')} />
        </div>

        {historyData.length > 0 ? (
          <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full table-auto min-w-[400px]  text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">#</th>

                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                      {t('type')}
                    </th>

                    {/* <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                      Coin
                    </th> */}

                    <th className="w-48 px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                      {t('date')}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {historyData.map((item, index) => {
                    const isCoin = item.award_type === 'coin'

                    // BOOLEAN kelsa normalize qilamiz
                    const awardedCoin =
                      typeof item.awarded_coin === 'boolean' ? (item.awarded_coin ? 1 : 0) : item.awarded_coin

                    return (
                      <tr key={item.id} className="transition hover:bg-gray-50">
                        {/* ID */}
                        <td className="px-6 py-2">
                          <div className="text-sm font-semibold text-gray-800">{index + 1}</div>
                        </td>

                        {/* TYPE */}
                        <td className="px-6 py-2">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              isCoin ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {isCoin ? <HiOutlineSparkles size={14} /> : <HiOutlineGift size={14} />}

                            {isCoin ? t('coin') : t('score')}
                          </span>
                        </td>

                        {/* COIN */}
                        {/* <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-bold text-amber-500">+</div>

                            <div className="text-lg font-bold text-gray-800">{awardedCoin}</div>
                          </div>
                        </td> */}

                        {/* DATE */}
                        <td className="px-6 py-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <HiOutlineClock size={16} />

                            {item.awarded_at}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center bg-white border border-gray-200 shadow-sm rounded-3xl">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 rounded-full bg-amber-100">
              <HiOutlineSparkles size={40} className="text-amber-500" />
            </div>

            <h3 className="text-xl font-bold text-gray-700">Hech qanday ma&apos;lumot topilmadi</h3>

            <p className="mt-2 text-gray-400">Hali coinlar mavjud emas</p>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default BallCoinsHistory
