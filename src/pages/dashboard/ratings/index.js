import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'

const TYPES = [
  { label: 'Eng ko‘p ball', value: 'score' },
  { label: 'Eng ko‘p tanga', value: 'coin' },
  { label: 'Eng ko‘p so‘m', value: 'som' }
]

const COUNTS = [10, 50, 100, 1000]

const StudentTopLeaderboard = () => {
  const { t } = useTranslation()
  const [type, setType] = useState('coin')
  const [topCount, setTopCount] = useState(10)
  const [list, setList] = useState([])

  const { mutate, isLoading } = usePostQuery({
    hideSuccessToast: true
  })

  useEffect(() => {
    mutate(
      {
        url: URLS.studentTop,
        attributes: {
          type,
          top_count: topCount
        }
      },
      {
        onSuccess: (res) => {
          setList(res?.data?.results || [])
        }
      }
    )
  }, [type, topCount])

  const getValueByType = (item) => {
    if (type === 'score') return item.score
    if (type === 'coin') return item.coin
    if (type === 'som') return item.som
    return 0
  }

  const getUnitByType = () => {
    if (type === 'score') return 'ball'
    if (type === 'coin') return 'tanga'
    if (type === 'som') return "so'm"
    return ''
  }

  return (
    <LayoutAdmin title={t('ratings')}>
      <div className="bg-white dark:bg-[#202936] border rounded-xl p-6 mt-8">
        <h3 className="mb-4 text-lg font-semibold">🏆 Studentlar reytingi</h3>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-2 border rounded-lg">
            {TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={topCount}
            onChange={(e) => setTopCount(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg"
          >
            {COUNTS.map((n) => (
              <option key={n} value={n}>
                Top {n}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="py-10 text-center">Yuklanmoqda...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">#</th>
                  <th className="py-2 text-left">Talaba</th>
                  <th className="py-2 text-right">Qiymat</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={item.student_id} className="border-b last:border-0">
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">
                      <div className="font-medium">{item.full_name}</div>
                      <div className="text-xs text-gray-500">{item.phone}</div>
                    </td>
                    <td className="py-2 font-semibold text-right">
                      {getValueByType(item)?.toLocaleString()} {getUnitByType()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </LayoutAdmin>
  )
}

export default StudentTopLeaderboard
