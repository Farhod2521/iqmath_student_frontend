// modules/library/components/MyPurchasedBooks.jsx
// Sotib olingan kitoblar bo'limi.
// `/api/v1/book/my-purchases/` javobini qabul qiladi va offline/online ajratib chiqaradi.
// Ham "Kutubxona" sahifasidagi tabda, ham /dashboard/library/history sahifasida ishlatiladi.
import { useTranslation } from 'react-i18next'
import {
  BookOpen,
  Monitor,
  ShoppingBag,
  Calendar,
  CreditCard,
  Layers,
  CheckCircle2,
  Clock,
  Truck,
  Eye,
  Package,
  Loader2
} from 'lucide-react'

const API_BASE = 'https://api.iqmath.uz'

const toAbs = (path) => {
  if (!path) return ''
  return path.startsWith('http') ? path : `${API_BASE}${path}`
}

const STATUS_CONFIG = {
  delivered: { icon: CheckCircle2, className: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
  delivering: { icon: Truck, className: 'bg-violet-100 text-violet-700 border border-violet-200' },
  pending: { icon: Clock, className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  new: { icon: Package, className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  seen: { icon: Eye, className: 'bg-gray-100 text-gray-600 border border-gray-200' },
  preparing: { icon: Clock, className: 'bg-sky-100 text-sky-700 border border-sky-200' }
}

function StatusBadge({ status, label }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
      <Icon size={11} />
      {label}
    </span>
  )
}

function CoverImage({ src, alt, type }) {
  if (src) {
    return <img src={src} alt={alt} className="flex-shrink-0 object-cover w-full h-44" />
  }
  const isOnline = type === 'online'
  return (
    <div
      className={`w-full h-44 flex-shrink-0 flex flex-col items-center justify-center gap-2 ${
        isOnline ? 'bg-indigo-50' : 'bg-emerald-50'
      }`}
    >
      {isOnline ? (
        <Monitor size={36} className="text-indigo-300" />
      ) : (
        <BookOpen size={36} className="text-emerald-300" />
      )}
    </div>
  )
}

const MyPurchasedBooks = ({ data, isLoading, showStats = true }) => {
  const { t, i18n } = useTranslation()

  const DELIVERY_STATUS = {
    new: t('deliveryStatus.new'),
    seen: t('deliveryStatus.seen'),
    preparing: t('deliveryStatus.preparing'),
    delivering: t('deliveryStatus.delivering'),
    delivered: t('deliveryStatus.delivered'),
    pending: t('deliveryStatus.pending')
  }

  // 'card' — karta orqali onlayn to'lov (balans yetmaganda)
  const PAYMENT_LABEL = {
    som: t('sum'),
    coin: t('coin'),
    score: t('ball'),
    card: t('library.paymentCard')
  }

  const statusLabel = (status) => (!status ? DELIVERY_STATUS.pending : DELIVERY_STATUS[status] || status)
  const paymentLabel = (method) => PAYMENT_LABEL[method] || PAYMENT_LABEL.som
  const bookName = (book) => (i18n.language === 'uz' ? book?.name_uz : book?.name_ru) || book?.name_uz || '—'

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3 text-indigo-600">
        <Loader2 size={24} className="animate-spin" />
        <span className="text-sm text-gray-400">{t('library.loading')}</span>
      </div>
    )
  }

  const onlineBooks = data?.online_books || []
  const offlineBooks = data?.offline_books || []
  const onlineCount = data?.online_count ?? onlineBooks.length
  const offlineCount = data?.offline_count ?? offlineBooks.length

  // Umumiy xarid ma'lumotlari (ikkala turdagi kartada bir xil)
  const PurchaseMeta = ({ item }) => (
    <div className="space-y-1.5 text-xs text-gray-500">
      <div className="flex items-center gap-2">
        <Calendar size={12} className="flex-shrink-0 text-gray-400" />
        <span>
          {t('library.purchaseDate')}: <span className="font-medium text-gray-700">{item.purchased_at}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Layers size={12} className="flex-shrink-0 text-gray-400" />
        <span>
          {t('library.quantity')}: <span className="font-medium text-gray-700">{item.quantity}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <CreditCard size={12} className="flex-shrink-0 text-gray-400" />
        <span>
          {t('library.paymentMethod')}:{' '}
          <span className="font-medium text-gray-700">{paymentLabel(item.payment_method)}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ShoppingBag size={12} className="flex-shrink-0 text-gray-400" />
        <span>
          {t('totalPrice')}:{' '}
          <span className="font-medium text-gray-700">
            {new Intl.NumberFormat('uz-UZ').format(Number(item.paid_amount) || 0)}
          </span>
        </span>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      {showStats && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-indigo-50 rounded-xl">
              <Monitor size={18} className="text-indigo-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.onlineBooks')}</p>
            <p className="text-2xl font-bold text-gray-800">{onlineCount}</p>
          </div>

          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-emerald-50 rounded-xl">
              <BookOpen size={18} className="text-emerald-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.offlineBooks')}</p>
            <p className="text-2xl font-bold text-gray-800">{offlineCount}</p>
          </div>

          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-amber-50 rounded-xl">
              <ShoppingBag size={18} className="text-amber-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.totalPurchases')}</p>
            <p className="text-2xl font-bold text-gray-800">{onlineCount + offlineCount}</p>
          </div>
        </div>
      )}

      {/* Hech narsa sotib olinmagan */}
      {onlineCount + offlineCount === 0 && (
        <div className="py-12 text-center rounded-2xl bg-gray-50 border border-gray-100">
          <ShoppingBag size={36} className="mx-auto text-gray-300" />
          <h3 className="mt-3 text-sm font-semibold text-gray-800">{t('library.noPurchases')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('library.noPurchasesHint')}</p>
        </div>
      )}

      {/* Offline kitoblar */}
      {offlineBooks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={17} className="text-emerald-600" />
            <h2 className="text-base font-semibold text-gray-800">{t('library.offlineBooks')}</h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              {offlineBooks.length}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offlineBooks.map((item) => (
              <div
                key={item.purchase_id}
                className="flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
              >
                <CoverImage src={toAbs(item.book.cover_image)} alt={bookName(item.book)} type="offline" />

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="mb-3 text-sm font-semibold leading-snug text-gray-800">{bookName(item.book)}</h3>
                  <PurchaseMeta item={item} />
                  <div className="pt-3 mt-auto">
                    <StatusBadge status={item.delivery_status} label={statusLabel(item.delivery_status)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Online kitoblar */}
      {onlineBooks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={17} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-800">{t('library.onlineBooks')}</h2>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
              {onlineBooks.length}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {onlineBooks.map((item) => (
              <div
                key={item.purchase_id}
                className="flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
              >
                <CoverImage src={toAbs(item.book.cover_image)} alt={bookName(item.book)} type="online" />

                <div className="flex flex-col flex-1 p-4">
                  <h3 className="mb-3 text-sm font-semibold leading-snug text-gray-800">{bookName(item.book)}</h3>
                  <PurchaseMeta item={item} />

                  <div className="pt-3 mt-auto">
                    {item.book.file ? (
                      <a
                        href={toAbs(item.book.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all duration-150"
                      >
                        <Eye size={13} />
                        {t('library.viewBook')}
                      </a>
                    ) : (
                      <span className="flex items-center justify-center w-full py-2.5 text-xs font-semibold text-gray-400 bg-gray-50 rounded-xl">
                        {t('library.fileNotAvailable')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPurchasedBooks
