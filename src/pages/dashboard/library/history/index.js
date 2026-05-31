import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'

const API_BASE = 'https://api.iqmath.uz'

const toAbs = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `${API_BASE}${path}`
}

const MyBooksPage = () => {
  const { t, i18n } = useTranslation()

  const { data: bookData, isLoading } = useGetQuery({
    key: KEYS.bookMyPurchases,
    url: URLS.bookMyPurchases
  })

  const data = bookData?.data

  console.log('data', data)

  const DELIVERY_STATUS = {
    new: 'Yangi',
    seen: "Ko'rildi",
    preparing: 'Tayyorlanmoqda',
    delivering: 'Yetkazilmoqda',
    delivered: 'Yetkazildi',
    pending: 'Kutilmoqda'
  }

  const statusLabel = (status) => {
    if (!status) return 'Kutilmoqda'
    return DELIVERY_STATUS[status] || status
  }

  const paymentLabel = (method) => {
    return t(`${method?.toLowerCase() || 'som'}`)
  }

  const paymentMeta = {
    coin: { label: t('coin'), icon: '🪙' },
    score: { label: t('score'), icon: '⭐' },
    ball: { label: t('ball'), icon: '⭐' },
    som: { label: t('som'), icon: '💵' }
  }

  if (isLoading) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('library.myBooks')} />
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-b-2 border-indigo-600 rounded-full animate-spin" />
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('library.myBooks')} />

      <div className="space-y-8">
        {/* Statistikalar */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 bg-white border rounded-xl">
            <p className="text-sm text-gray-500">{t('library.onlineBooks')}</p>
            <p className="mt-1 text-2xl font-bold">{data?.online_count || 0}</p>
          </div>

          <div className="p-4 bg-white border rounded-xl">
            <p className="text-sm text-gray-500">{t('library.offlineBooks')}</p>
            <p className="mt-1 text-2xl font-bold">{data?.offline_count || 0}</p>
          </div>
        </div>

        {/* Offline kitoblar */}
        <div>
          <h2 className="mb-4 text-xl font-bold">{t('library.offlineBooks')}</h2>

          {data?.offline_books?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.offline_books.map((item) => (
                <div key={item.purchase_id} className="overflow-hidden bg-white border rounded-xl">
                  <img
                    src={toAbs(item.book.cover_image)}
                    alt={item.book.name_uz}
                    className="object-cover w-full h-56"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">
                      {i18n.language === 'uz' ? item.book.name_uz : item.book.name_ru}
                    </h3>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>
                        <b>{t('library.purchaseDate')}:</b> {item.purchased_at}
                      </p>

                      <p>
                        <b>{t('library.quantity')}:</b> {item.quantity}
                      </p>

                      <p>
                        <b>{t('library.paymentMethod')}:</b> {paymentLabel(item.payment_method)}
                      </p>

                      <p>
                        <b>{t('totalPrice')}:</b> {item.paid_amount}
                      </p>

                      <p>
                        <b>{t('status')}:</b>{' '}
                        <span className="px-2 py-1 bg-gray-200 rounded-sm">{statusLabel(item.delivery_status)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white border rounded-xl">{t('library.noOfflineBooks')}</div>
          )}
        </div>

        {/* Online kitoblar */}
        <div>
          <h2 className="mb-4 text-xl font-bold">{t('library.onlineBooks')}</h2>

          {data?.online_books?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.online_books.map((item) => (
                <div key={item.purchase_id} className="overflow-hidden bg-white border rounded-xl">
                  <img
                    src={toAbs(item.book.cover_image)}
                    alt={item.book.name_uz}
                    className="object-cover w-full h-56"
                  />

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">
                      {i18n.language === 'uz' ? item.book.name_uz : item.book.name_ru}
                    </h3>

                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p>
                        <b>{t('library.purchaseDate')}:</b> {item.purchased_at}
                      </p>

                      <p>
                        <b>{t('library.quantity')}:</b> {item.quantity}
                      </p>

                      <p>
                        <b>{t('library.paymentMethod')}:</b> {paymentLabel(item.payment_method)}
                      </p>

                      <p>
                        <b>{t('totalPrice')}:</b> {item.paid_amount}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <a
                        href={toAbs(item.book.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        {t('library.viewBook')}
                      </a>

                      {/* <a href={toAbs(item.book.file)} download className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                        {t('library.download')}
                      </a> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white border rounded-xl">{t('library.noOnlineBooks')}</div>
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default MyBooksPage
