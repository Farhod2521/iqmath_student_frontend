import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const FinesTab = () => {
  const { t } = useTranslation()

  const { data, isLoading, error } = useGetQuery({
    key: KEYS.teacherFine,
    url: URLS.teacherFine
  })

  useEffect(() => {
    if (error) {
      toast.error(error?.response?.data?.error)
    }
  }, [error])

  const fines = data?.data?.results || []

  return (
    <div className="overflow-x-auto border border-[#E9E9E9] rounded-lg">
      <table className="w-full text-left border-collapse min-w-[700px] text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wide border-b border-[#E9E9E9]">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">{t('tutor')}</th>
            <th className="p-4">{t('reason')}</th>
            <th className="p-4">{t('type')}</th>
            <th className="p-4">{t('amount')}</th>
            <th className="p-4">{t('date')}</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {isLoading ? (
            <tr>
              <td colSpan="6" className="py-10 text-center text-gray-400">
                {t('loading')}
              </td>
            </tr>
          ) : fines.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-10 text-center text-gray-400">
                {t('noData')}
              </td>
            </tr>
          ) : (
            fines.map((item, index) => (
              <tr key={item.fine_id} className="hover:bg-gray-50 border-b border-[#E9E9E9] transition-colors">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium text-gray-900">{item?.given_by?.full_name || '-'}</span>
                    <span className="text-xs text-gray-400">{item?.given_by?.phone || '-'}</span>
                  </div>
                </td>
                <td className="p-4">{item.reason}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-blue-50 text-[#5D87FF] rounded-md text-[11px] font-bold uppercase tracking-wider">
                    {item.fine_type_display}
                  </span>
                </td>
                <td className="p-4 font-semibold">{item.amount}</td>
                <td className="p-4 text-xs text-gray-500">{item.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default FinesTab
