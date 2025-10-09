import { useState } from 'react'
import { Button, Input } from '@heroui/react'
import toast from 'react-hot-toast'

const CreateCouponModal = ({ isOpen, onClose, onCreate, isLoading }) => {
  const [couponCode, setCouponCode] = useState('')

  const handleSubmit = () => {
    if (!couponCode.trim()) {
      return
    }

    if (couponCode.trim().length < 3) {
      return
    }

    onCreate(couponCode)
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
          <h2 className="text-2xl font-bold text-[#2A3547] dark:text-white mb-2">Yangi kupon yaratish</h2>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Masalan: IQMATH50"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="w-full"
            variant="bordered"
            size="lg"
            isRequired
            errorMessage={!couponCode.trim() && 'Kupon kodi kiritilishi shart'}
            classNames={{
              input: 'text-[15px] !outline-none',
              inputWrapper:
                'border border-[#E9E9E9] rounded-[10px] bg-white hover:border-[#5d87ff] focus-within:border-[#5d87ff]'
            }}
          />
        </div>

        <div className="flex gap-4">
          <Button
            className="bg-red-500 w-full text-white hover:bg-red-600 transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            onPress={handleClose}
          >
            Bekor qilish
          </Button>
          <Button
            className="bg-[#5d87ff] w-full text-white hover:bg-[#4a6bcc] transition-colors px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            onPress={handleSubmit}
            disabled={!couponCode.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Yaratilmoqda...
              </>
            ) : (
              'Yaratish'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponModal
