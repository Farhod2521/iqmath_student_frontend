import HeaderTitle from '@/components/header-title'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import LayoutAdmin from '@/layout/LayoutAdmin'
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
  delivered: {
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-700 border border-emerald-200'
  },
  delivering: {
    icon: Truck,
    className: 'bg-violet-100 text-violet-700 border border-violet-200'
  },
  pending: {
    icon: Clock,
    className: 'bg-amber-100 text-amber-700 border border-amber-200'
  },
  new: {
    icon: Package,
    className: 'bg-blue-100 text-blue-700 border border-blue-200'
  },
  seen: {
    icon: Eye,
    className: 'bg-gray-100 text-gray-600 border border-gray-200'
  },
  preparing: {
    icon: Clock,
    className: 'bg-sky-100 text-sky-700 border border-sky-200'
  }
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
      className={`w-full h-44 flex-shrink-0 flex flex-col items-center justify-center gap-2 ${isOnline ? 'bg-indigo-50' : 'bg-emerald-50'}`}
    >
      {isOnline ? (
        <Monitor size={36} className="text-indigo-300" />
      ) : (
        <BookOpen size={36} className="text-emerald-300" />
      )}
    </div>
  )
}

const MyBooksPage = () => {
  const { t, i18n } = useTranslation()

  const { data: bookData, isLoading } = useGetQuery({
    key: KEYS.bookMyPurchases,
    url: URLS.bookMyPurchases
  })

  const data = bookData?.data

  const DELIVERY_STATUS = {
    new: t('deliveryStatus.new'),
    seen: t('deliveryStatus.seen'),
    preparing: t('deliveryStatus.preparing'),
    delivering: t('deliveryStatus.delivering'),
    delivered: t('deliveryStatus.delivered'),
    pending: t('deliveryStatus.pending')
  }

  const statusLabel = (status) => {
    if (!status) return 'Kutilmoqda'
    return DELIVERY_STATUS[status] || status
  }

  const paymentLabel = (method) => {
    return t(`${method?.toLowerCase() || 'som'}`)
  }

  if (isLoading) {
    return (
      <LayoutAdmin>
        <HeaderTitle title={t('library.myBooks')} />
        <div className="flex items-center justify-center h-64 gap-3 text-indigo-600">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-sm text-gray-400">Yuklanmoqda...</span>
        </div>
      </LayoutAdmin>
    )
  }

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('library.myBooks')} />

      <div className="space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-indigo-50 rounded-xl">
              <Monitor size={18} className="text-indigo-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.onlineBooks')}</p>
            <p className="text-2xl font-bold text-gray-800">{data?.online_count || 0}</p>
          </div>

          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-emerald-50 rounded-xl">
              <BookOpen size={18} className="text-emerald-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.offlineBooks')}</p>
            <p className="text-2xl font-bold text-gray-800">{data?.offline_count || 0}</p>
          </div>

          <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-center mb-3 w-9 h-9 bg-amber-50 rounded-xl">
              <ShoppingBag size={18} className="text-amber-600" />
            </div>
            <p className="mb-1 text-xs text-gray-500">{t('library.totalPurchases')}</p>
            <p className="text-2xl font-bold text-gray-800">{(data?.online_count || 0) + (data?.offline_count || 0)}</p>
          </div>
        </div>

        {/* Offline kitoblar */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={17} className="text-emerald-600" />
            <h2 className="text-base font-semibold text-gray-800">{t('library.offlineBooks')}</h2>
            {data?.offline_books?.length > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                {data.offline_books.length} ta
              </span>
            )}
          </div>

          {data?.offline_books?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.offline_books.map((item) => (
                <div
                  key={item.purchase_id}
                  className="flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
                >
                  <CoverImage src={toAbs(item.book.cover_image)} alt={item.book.name_uz} type="offline" />

                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="mb-3 text-sm font-semibold leading-snug text-gray-800">
                      {i18n.language === 'uz' ? item.book.name_uz : item.book.name_ru}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="flex-shrink-0 text-gray-400" />
                        <span>
                          {t('library.purchaseDate')}:{' '}
                          <span className="font-medium text-gray-700">{item.purchased_at}</span>
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
                          {t('totalPrice')}: <span className="font-medium text-gray-700">{item.paid_amount}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 mt-auto">
                      <StatusBadge status={item.delivery_status} label={statusLabel(item.delivery_status)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-sm text-center text-gray-400 bg-white border border-gray-100 rounded-2xl">
              {t('library.noOfflineBooks')}
            </div>
          )}
        </div>

        {/* Online kitoblar */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={17} className="text-indigo-600" />
            <h2 className="text-base font-semibold text-gray-800">{t('library.onlineBooks')}</h2>
            {data?.online_books?.length > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                {data.online_books.length} ta
              </span>
            )}
          </div>

          {data?.online_books?.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.online_books.map((item) => (
                <div
                  key={item.purchase_id}
                  className="flex flex-col overflow-hidden transition-shadow duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
                >
                  <CoverImage src={toAbs(item.book.cover_image)} alt={item.book.name_uz} type="online" />

                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="mb-3 text-sm font-semibold leading-snug text-gray-800">
                      {i18n.language === 'uz' ? item.book.name_uz : item.book.name_ru}
                    </h3>

                    <div className="space-y-1.5 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="flex-shrink-0 text-gray-400" />
                        <span>
                          {t('library.purchaseDate')}:{' '}
                          <span className="font-medium text-gray-700">{item.purchased_at}</span>
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
                          {t('totalPrice')}: <span className="font-medium text-gray-700">{item.paid_amount}</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 mt-auto">
                      <a
                        href={toAbs(item.book.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all duration-150"
                      >
                        <Eye size={13} />
                        {t('library.viewBook')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-sm text-center text-gray-400 bg-white border border-gray-100 rounded-2xl">
              {t('library.noOnlineBooks')}
            </div>
          )}
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default MyBooksPage
