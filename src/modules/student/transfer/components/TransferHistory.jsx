import { useGetQuery } from '@/hooks'
import { URLS } from '@/constants/url'
import { useTranslation } from 'react-i18next'

const TransferHistory = ({ onBack }) => {
  const { t } = useTranslation()

  const { data, isLoading } = useGetQuery({
    key: 'transfer-history',
    url: URLS.transferHistory
  })

  const history = data?.data || {}

  if (isLoading) return <div>{t('loading')}</div>

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded-xl">
      <button onClick={onBack} className="text-sm text-gray-500">
        ← {t('back')}
      </button>

      {/* SENT */}
      <div>
        <h3 className="mb-3 font-bold">📤 {t('sent')}</h3>
        <div className="space-y-2">
          {history?.sent?.length ? (
            history?.sent?.map((item) => (
              <div key={item.id} className="flex justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{item.other_party}</p>
                  <p className="text-xs text-gray-400">{item.confirmed_at}</p>
                </div>
                <span className="font-semibold text-red-500">-{item.amount}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">{t('noData')}</p>
          )}
        </div>
      </div>

      {/* RECEIVED */}
      <div>
        <h3 className="mb-3 font-bold">📥 {t('received')}</h3>
        <div className="space-y-2">
          {history.received?.length ? (
            history.received?.map((item) => (
              <div key={item.id} className="flex justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{item.other_party}</p>
                  <p className="text-xs text-gray-400">{item.confirmed_at}</p>
                </div>
                <span className="font-semibold text-green-600">+{item.amount}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">{t('noData')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransferHistory
