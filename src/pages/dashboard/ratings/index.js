import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'

const COUNTS = [10, 50, 100, 1000]

const StudentTopLeaderboard = () => {
  const { t } = useTranslation()
  const [type, setType] = useState('coin')
  const [topCount, setTopCount] = useState(10)
  const [list, setList] = useState([])

  const { mutate, isLoading } = usePostQuery({
    hideSuccessToast: true
  })

  const TYPES = [
    { label: t('topBall'), value: 'score' },
    { label: t('topTanga'), value: 'coin' },
    { label: t('topSum'), value: 'som' }
  ]

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
    if (type === 'score') return <span className="lowercase">{t('ball')}</span>
    if (type === 'coin') return t('tanga')
    if (type === 'som') return <span className="lowercase">{t('sum')}</span>
    return ''
  }

  return (
    <LayoutAdmin>
      <div className="bg-white dark:bg-[#202936] border rounded-xl p-3 sm:p-4">
        {/* <h3 className="mb-4 text-lg font-semibold">{t('studentRating')}</h3> */}
        <div className="py-2">
          {' '}
          <HeaderTitle title={t('studentRating')} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg"
          >
            {TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            value={topCount}
            onChange={(e) => setTopCount(Number(e.target.value))}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg"
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
            <table className="w-full table-auto min-w-[400px]  text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">#</th>
                  <th className="py-2 text-left">{t('student')}</th>
                  <th className="py-2 text-right">{t('value')}</th>
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
