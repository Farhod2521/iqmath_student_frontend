import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { HiOutlineClock, HiOutlineGift, HiOutlineSparkles } from 'react-icons/hi2'

const CoinsHistoryTab = () => {
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
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-10 h-10 border-4 rounded-full border-amber-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="text-xl font-bold text-red-500">Xatolik yuz berdi</div>
          <p className="mt-2 text-gray-400">Ma&apos;lumotlarni yuklashda muammo bo&apos;ldi</p>
        </div>
      </div>
    )
  }

  if (historyData.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 rounded-full bg-amber-100">
          <HiOutlineSparkles size={40} className="text-amber-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Hech qanday ma&apos;lumot topilmadi</h3>
        <p className="mt-2 text-gray-400">Hali coinlar mavjud emas</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
      <table className="w-full table-auto min-w-[400px] text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">#</th>
            <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">{t('type')}</th>
            <th className="w-48 px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
              {t('date')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {historyData.map((item, index) => {
            const isCoin = item.award_type === 'coin'
            return (
              <tr key={item.id} className="transition hover:bg-gray-50">
                <td className="px-6 py-3">
                  <div className="text-sm font-semibold text-gray-800">{index + 1}</div>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isCoin ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isCoin ? <HiOutlineSparkles size={14} /> : <HiOutlineGift size={14} />}
                    {isCoin ? t('coin') : t('score')}
                  </span>
                </td>
                <td className="px-6 py-3">
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
  )
}

export default CoinsHistoryTab
