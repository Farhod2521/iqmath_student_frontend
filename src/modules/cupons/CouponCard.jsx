import { useState } from 'react'
import toast from 'react-hot-toast'
import { Copy, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const CouponCard = ({ coupon, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code)
      setCopied(true)
      toast.success('Nusxa olindi')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  return (
    <div className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm bg-gradient-to-r from-blue-500 to-blue-600">
                {coupon.code}
              </div>
              <button
                onClick={handleCopy}
                className={`p-2 transition-colors rounded-lg ${
                  copied ? 'text-green-500 bg-green-50' : 'text-gray-500 hover:bg-gray-100'
                }`}
                title="Nusxa olish"
              >
                <Copy size={18} />
              </button>
            </div>

            <button
              onClick={() => onDelete(coupon.id)}
              className="p-2 text-red-500 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-50"
              title="O'chirish"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">{t('discount')}:</span>
              <span className="text-lg font-bold text-blue-600">{coupon.discount_percent}%</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">{t('startDate')}:</span>
              <span className="text-sm font-medium text-gray-700">{formatDate(coupon.valid_from)}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">{t('endDate')}:</span>
              <span className="text-sm font-medium text-gray-700">{formatDate(coupon.valid_until)}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-500">{t('status')}:</span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  coupon.is_active ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-100'
                }`}
              >
                {coupon.is_active ? t('active') : t('inactive')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponCard
