import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { URLS } from '@/constants/url'
import { usePostQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'
import { request } from '@/services/api'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { RolesList } from '@/layout/libs/menulist'

const COUNTS = [10, 50, 100, 1000]

const StudentTopLeaderboard = () => {
  const session = useSession()
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

  function downloadCertificate(student_id) {
    if (!student_id) return
    request
      .post(
        URLS.downloadCertificate,
        {
          student_id
        },
        { responseType: 'blob' }
      )
      .then((res) => {
        if (res.status !== 200 || !res.data) return
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'Certificate_file.pdf')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((err) => {
        toast.error(err?.message || err?.data?.message || t('downloadCertificateError'))
      })
  }

  return (
    <LayoutAdmin>
      <div className="py-2">
        <HeaderTitle title={t('studentRating')} />
      </div>

      <div className="bg-white dark:bg-[#202936] border rounded-xl p-3 sm:p-4">
        {/* <h3 className="mb-4 text-lg font-semibold">{t('studentRating')}</h3> */}

        {/* Filters */}
        <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg sm:w-auto"
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
            className="w-full px-3 py-2 border rounded-lg sm:w-auto"
          >
            {COUNTS.map((n) => (
              <option key={n} value={n}>
                Top {n}
              </option>
            ))}
          </select>

          {session?.data?.role === RolesList.STUDENT ? (
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
              onClick={() => downloadCertificate(session?.data?.id)}
            >
              {t('downloadCertificate')}
            </button>
          ) : null}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="py-10 text-center">Yuklanmoqda...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto min-w-[400px]  text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">#</th>
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                    {t('student')}
                  </th>
                  {session?.data?.role !== RolesList.STUDENT && session?.data?.role !== RolesList.PARENT ? (
                    <th className="px-6 py-4 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                      {t('certificate')}
                    </th>
                  ) : null}
                  <th className="px-6 py-4 text-xs font-bold tracking-wider text-right text-gray-500 uppercase">
                    {t('value')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {list?.map((item, index) => (
                  <tr key={item.student_id} className="border-b last:border-0">
                    <td className="px-6 py-2">{index + 1}</td>
                    <td className="px-6 py-2">
                      <div className="font-medium">{item.full_name}</div>
                    </td>
                    {session?.data?.role !== RolesList.STUDENT && session?.data?.role !== RolesList.PARENT ? (
                      <td className="px-6 py-2 font-semibold text-left">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                          onClick={() => downloadCertificate(item?.student_id)}
                        >
                          {t('downloadCertificate')}
                        </button>
                      </td>
                    ) : null}
                    <td className="px-6 py-2 font-semibold text-right">
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
