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

  const statusRow = isLoading ? t('loading') : fines.length === 0 ? t('noData') : null

  return (
    <>
      {/* Mobil: kartalar */}
      <div className="flex flex-col gap-2.5 sm:hidden">
        {statusRow ? (
          <div className="rounded-lg border border-[#E9E9E9] py-10 text-center text-sm text-gray-400">{statusRow}</div>
        ) : (
          fines.map((item, index) => (
            <div key={item.fine_id} className="rounded-xl border border-[#E9E9E9] bg-white p-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-900">
                    {index + 1}. {item?.given_by?.full_name || '-'}
                  </p>
                  <p className="text-xs text-gray-400">{item?.given_by?.phone || '-'}</p>
                </div>
                <span className="shrink-0 font-bold text-gray-900">{item.amount}</span>
              </div>
              {item.reason ? <p className="mt-2 break-words text-gray-700">{item.reason}</p> : null}
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#5D87FF]">
                  {item.fine_type_display}
                </span>
                <span className="text-xs text-gray-500">{item.created_at}</span>
              </div>
            </div>
          ))
        )}
      </div>

    <div className="hidden overflow-x-auto border border-[#E9E9E9] rounded-lg sm:block">
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
    </>
  )
}

export default FinesTab
