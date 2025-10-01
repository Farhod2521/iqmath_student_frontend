import { useState } from 'react'
import { Input } from '@heroui/react'
import toast from 'react-hot-toast'

const CreateReferralModal = ({ isOpen, onClose, onCreate, isLoading }) => {
  const [referralCode, setReferralCode] = useState('')

  const handleSubmit = () => {
    if (!referralCode.trim()) {
      toast.error('Referral kodi kiriting')
      return
    }

    if (referralCode.trim().length < 3) {
      toast.error('Referral kodi kamida 3 ta belgidan iborat bo\'lishi kerak')
      return
    }

    onCreate(referralCode)
  }

  const handleClose = () => {
    setReferralCode('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-[#202936] rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#2A3547] dark:text-white mb-2">
            Yangi referral yaratish
          </h2>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Masalan: REFERAL123"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            className="w-full"
            variant="bordered"
            size="lg"
            isRequired
            errorMessage={!referralCode.trim() && "Referral kodi kiritilishi shart"}
            classNames={{
              input: "text-[15px] !outline-none",
              inputWrapper: "border border-[#E9E9E9] rounded-[10px] bg-white hover:border-[#5d87ff] focus-within:border-[#5d87ff]"
            }}
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
            disabled={!referralCode.trim() || isLoading}
            className="flex-1 py-4 text-lg bg-[#5D87FF] hover:bg-[#4570EA] disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Yaratilmoqda...
              </>
            ) : (
              'Yaratish'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateReferralModal
