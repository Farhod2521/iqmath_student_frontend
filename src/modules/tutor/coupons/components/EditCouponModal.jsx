import { useState, useEffect } from 'react'
import { Input } from '@heroui/react'
import toast from 'react-hot-toast'

const EditCouponModal = ({ isOpen, onClose, onUpdate, coupon, isLoading }) => {
  const [couponCode, setCouponCode] = useState('')

  useEffect(() => {
    if (coupon) {
      setCouponCode(coupon.code)
    }
  }, [coupon])

  const handleSubmit = () => {
    if (!couponCode.trim()) {
      toast.error('Kupon kodi kiriting')
      return
    }

    if (couponCode.trim().length < 3) {
      toast.error('Kupon kodi kamida 3 ta belgidan iborat bo\'lishi kerak')
      return
    }

    onUpdate(couponCode)
  }

  const handleClose = () => {
    setCouponCode('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2A3547] dark:text-white mb-2">
            Kuponni tahrirlash
          </h2>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kupon kodi
          </label>
          <Input
            placeholder="Masalan: IQMATH50"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="w-full [&>div]:border [&>div]:border-gray-300 [&>div]:focus-within:border-[#5d87ff]"
            variant="bordered"
            size="lg"
            isRequired
            errorMessage={!couponCode.trim() && "Kupon kodi kiritilishi shart"}
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-4 text-lg bg-gray-400 hover:bg-gray-600 text-[#2A3547] dark:bg-[#2A3447] dark:hover:bg-[#1F2937] dark:text-white rounded-xl font-medium transition-colors"
          >
            Bekor qilish
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!couponCode.trim() || isLoading}
            className="flex-1 py-4 text-lg bg-[#5D87FF] hover:bg-[#4570EA] disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saqlanmoqda...
              </>
            ) : (
              'Saqlash'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCouponModal
