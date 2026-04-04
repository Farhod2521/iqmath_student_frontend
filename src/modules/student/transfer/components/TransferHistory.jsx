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
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <button onClick={onBack} className="text-sm text-gray-500">
        ← {t('back')}
      </button>

      {/* SENT */}
      <div>
        <h3 className="font-bold mb-3">📤 {t('sent')}</h3>
        <div className="space-y-2">
          {history.sent?.length ? (
            history.sent.map((item) => (
              <div key={item.id} className="flex justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{item.other_party}</p>
                  <p className="text-xs text-gray-400">{item.confirmed_at}</p>
                </div>
                <span className="text-red-500 font-semibold">-{item.amount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">{t('noData')}</p>
          )}
        </div>
      </div>

      {/* RECEIVED */}
      <div>
        <h3 className="font-bold mb-3">📥 {t('received')}</h3>
        <div className="space-y-2">
          {history.received?.length ? (
            history.received.map((item) => (
              <div key={item.id} className="flex justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{item.other_party}</p>
                  <p className="text-xs text-gray-400">{item.confirmed_at}</p>
                </div>
                <span className="text-green-600 font-semibold">+{item.amount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">{t('noData')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransferHistory
