import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Pencil, Trash2 } from 'lucide-react'

const categoryColors = {
  STANDARD: 'from-pink-500 to-fuchsia-500',
  PREMIUM: 'from-purple-500 to-indigo-500',
  SPECIAL: 'from-blue-500 to-cyan-500'
}

export default function SubscriptionPlansGrid({ plans = [], onEdit, onDelete, isDeleting }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-4">
      {plans.map((item) => {
        const catTitle = item.category?.title?.toUpperCase() || ''
        const catGradient = categoryColors[catTitle] || 'from-gray-500 to-gray-400'

        return (
          <div
            key={item.id}
            className={`relative flex flex-col rounded-3xl p-[1px] transition-transform duration-300
              hover:scale-[1.03] hover:shadow-2xl
              ${item.discount_percent > 0 ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-gray-200'}`}
          >
            {/* CATEGORY PILL */}
            {catTitle && (
              <div className="absolute z-20 -translate-x-1/2 -top-2 left-1/2">
                <span
                  className={`px-5 py-1.5 text-xs font-bold tracking-wide text-white rounded-full shadow-lg
                  bg-gradient-to-r ${catGradient}`}
                >
                  {catTitle}
                </span>
              </div>
            )}

            <div className="relative flex flex-col h-full p-6 pt-10 rounded-3xl bg-white/95 backdrop-blur-md">
              {/* DISCOUNT BADGE */}
              {item.discount_percent > 0 && (
                <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500">
                  🔥 -{item.discount_percent}%
                </span>
              )}

              {/* TITLE & MONTHS */}
              <h3 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                {item.name || item.months_display}
              </h3>
              <p className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                <CalendarMonthIcon sx={{ color: '#5d87ff', fontSize: 18 }} />
                {item.months_display}
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
              <ul className="flex-1 mt-6 space-y-2">
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
                    {b.title}
                  </li>
                ))}
              </ul>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => onEdit(item)}
                  className="flex items-center justify-center w-full gap-2 py-2 text-sm font-semibold text-gray-700 transition border rounded-xl hover:bg-gray-100"
                >
                  <Pencil className="w-4 h-4" />
                  Tahrirlash
                </button>

                <button
                  disabled={isDeleting}
                  onClick={() => onDelete(item.id)}
                  className="flex items-center justify-center w-full gap-2 py-2 text-sm font-semibold text-red-600 transition rounded-xl bg-red-50 hover:bg-red-100 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  O‘chirish
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
