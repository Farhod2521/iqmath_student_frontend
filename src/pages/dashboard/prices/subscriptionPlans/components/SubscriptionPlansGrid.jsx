import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Check, Pencil, Sparkles, Trash2, X, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// const categoryColors = {
//   'Best Value': 'from-emerald-500 to-teal-500',
//   Popular: 'from-orange-500 to-amber-500',
//   Premium: 'from-purple-500 to-indigo-500'
// }

const categoryColors = {
  STANDARD: {
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    glow: 'shadow-emerald-500/50',
    icon: 'text-emerald-500'
  },
  Premium: {
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'shadow-amber-500/50',
    icon: 'text-amber-500'
  },
  Popular: {
    gradient: 'from-blue-400 via-sky-500 to-cyan-500',
    glow: 'shadow-blue-500/50',
    icon: 'text-blue-500'
  }
}

export default function SubscriptionPlansGrid({ plans = [], onEdit, onDelete, isDeleting }) {
  const { t, i18n } = useTranslation()

  console.log('plans', plans)

  const getCategoryStyle = (category) => {
    if (!category) return categoryColors.STANDARD
    const catTitle = category.title.toUpperCase()
    return categoryColors[catTitle] || categoryColors.STANDARD
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {plans.map((item) => {
        const catTitle = item.category?.title?.toUpperCase() || ''
        const catGradient = categoryColors[catTitle] || 'from-gray-500 to-gray-400'
        const catStyle = getCategoryStyle(item.category)

        return (
          <div
            key={item.id}
            // className={`relative flex flex-col rounded-3xl p-[1px] transition-transform duration-300
            //   hover:scale-[1.03] hover:shadow-2xl
            //   ${item.discount_percent > 0 ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gray-200'}`}
            className="
              group relative rounded-3xl p-[1px]
              bg-gradient-to-br from-gray-200 to-gray-100
              hover:from-blue-500 hover:to-purple-500
              transition-all duration-300
            "
          >
            {/* CATEGORY PILL */}
            {catTitle && (
              <div className="absolute z-20 -translate-x-1/2 -top-2 left-1/2">
                <span
                  className={`px-5 py-1.5 text-xs font-bold tracking-wide text-white rounded-full shadow-lg
                  bg-gradient-to-r ${catStyle.gradient}`}
                >
                  {i18n.language === 'uz' ? item.category.title_uz : item.category.title_ru}
                </span>
              </div>
            )}

            <div className="relative flex flex-col h-full p-6 pt-10 transition-all duration-300 rounded-3xl bg-white/95 backdrop-blur-md group-hover:shadow-2xl">
              {/* DISCOUNT BADGE */}
              {item.discount_percent > 0 && (
                <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                  {/* <Zap className="w-4 h-4 fill-current" /> */}
                  🔥 -{item.discount_percent}%
                </span>
              )}
              {/* TITLE & MONTHS */}
              <h3 className="text-xl font-bold text-gray-900">{item.name || `${item.months} ${t('monthly')}`}</h3>
              <p className="flex items-center gap-1 mt-1 text-sm text-gray-500 lowercase">
                <CalendarMonthIcon sx={{ color: '#5d87ff', fontSize: 18 }} />
                {item.months} {t('monthly')}
              </p>
              {/* PRICE */}
              <div className="mt-4">
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">{item.sale_price.toLocaleString()}</span>
                  <span className="mb-1 text-sm text-gray-500">so'm</span>
                </div>
                {item.discount_percent > 0 && (
                  <span className="block mt-1 text-sm text-gray-400 line-through">
                    {(item.price_per_month * item.months).toLocaleString()} so'm
                  </span>
                )}
              </div>
              {/* BENEFITS */}
              {/* <ul className="flex-1 mt-6 space-y-2">
                {item.benefits?.map((b) => (
                  <li
                    key={b.id}
                    className={`flex items-center gap-2 text-sm
                      ${b.is_selected ? 'text-gray-800' : 'text-gray-400 line-through'}`}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold
                      ${b.is_selected ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                    >
                      {b.is_selected ? '✓' : '✕'}
                    </span>
                    {i18n.language === 'uz' ? b.title_uz : b.title_ru}
                  </li>
                ))}
              </ul> */}
              {/* Benefits */}
              <div className="flex-1 mt-6 mb-0 space-y-3">
                {item.benefits?.map((b) => (
                  <div
                    key={b.id}
                    className={`flex items-start gap-3 transition-all duration-300
                        ${b.is_selected ? 'opacity-100' : 'opacity-40'}`}
                  >
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full
                          transition-all duration-300 transform group-hover:scale-110
                          ${b.is_selected ? `bg-gradient-to-br ${catStyle.gradient} shadow-lg` : 'bg-gray-200'}`}
                    >
                      {b.is_selected ? (
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </div>
                    <span
                      className={`text-sm leading-relaxed pt-0.5
                          ${b.is_selected ? 'text-gray-700 font-medium' : 'text-gray-400 line-through font-normal'}`}
                    >
                      {i18n.language === 'uz' ? b.title_uz : b.title_ru}
                    </span>
                  </div>
                ))}
              </div>
              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => onEdit(item)}
                  className="flex items-center justify-center flex-1 gap-2 py-2 text-sm font-semibold transition border border-gray-200 rounded-xl hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4" />
                  {t('editProfile')}
                </button>

                <button
                  disabled={isDeleting}
                  onClick={() => onDelete(item.id)}
                  className="flex items-center justify-center flex-1 gap-2 py-2 text-sm font-semibold text-red-600 transition rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
