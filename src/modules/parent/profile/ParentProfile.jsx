import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import toast from 'react-hot-toast'
import { useGetQuery } from '@/hooks'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import { KEYS } from '@/constants/key'
import { request } from '@/services/api'
import Input from '@/components/input'
import ContentLoader from '@/components/loader/content-loader'
import ParentProfileHero from './components/ParentProfileHero'
import ParentProfileInfoCard from './components/ParentProfileInfoCard'
import ParentProfileSecurityCard from './components/ParentProfileSecurityCard'
import ParentProfileQuickActions from './components/ParentProfileQuickActions'
import ParentEditInfoModal from './components/ParentEditInfoModal'
import ParentChangePasswordModal from './components/ParentChangePasswordModal'

const ParentProfile = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [newPhone, setNewPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)

  const { data: parentProfile, isLoading } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    enabled: !!session?.accessToken
  })

  useEffect(() => {
    if (parentProfile?.data) {
      setFullName(parentProfile.data.full_name || '')
      setPhoneNumber(parentProfile.data.phone || '')
      setEmail(parentProfile.data.email || '')
      setAddress(parentProfile.data.address || '')
    }
  }, [parentProfile])

  const { mutate: profileUpdate } = usePostQuery({ listKeyId: 'profile-update' })
  const { mutate: changePassword, isLoading: isChangingPassword } = usePostQuery({ listKeyId: 'change-password' })
  const { mutate: verifyPhoneChange, isLoading: isVerifyingPhone } = usePostQuery({ listKeyId: 'verify-phone-change' })

  const savedPhone = get(parentProfile, 'data.phone', '')
  const phoneChanged = phoneNumber !== savedPhone
  const identification = get(parentProfile, 'data.identification') || get(parentProfile, 'data.id', '')
  const parentDate = get(parentProfile, 'data.parent_date', '')
  const parentTime = get(parentProfile, 'data.parent_time', '')
  const createdAtRaw = parentDate ? `${parentDate}${parentTime ? ` ${parentTime}` : ''}` : ''

  const handleProfileUpdate = () => {
    const updateData = { full_name: fullName, email, address }

    if (phoneChanged) {
      if (!currentPassword) {
        toast.error(t('parentProfile.phoneChangePasswordHint'))
        return
      }
      updateData.phone = phoneNumber
      updateData.password = currentPassword
    }

    profileUpdate(
      {
        url: URLS.updateProfile,
        attributes: updateData,
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}`, 'Content-Type': 'application/json' }
        }
      },
      {
        onSuccess: () => {
          toast.success(t('save'))
          setIsEditModalOpen(false)
          if (phoneChanged) {
            setShowPhoneVerification(true)
            setNewPhone(phoneNumber)
          }
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || 'Xatolik yuz berdi')
        }
      }
    )
  }

  const handlePasswordChange = () => {
    if (!currentPassword) {
      toast.error(t('parentProfile.currentPasswordLabel'))
      return
    }
    if (!newPassword) {
      toast.error(t('parentProfile.newPasswordLabel'))
      return
    }
    if (newPassword.length < 6) {
      toast.error("Yangi parol kamida 6 ta belgi bo'lishi kerak")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Yangi parollar mos kelmadi')
      return
    }

    changePassword(
      {
        url: URLS.changePasswordNew,
        attributes: { old_password: currentPassword, new_password: newPassword },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}`, 'Content-Type': 'application/json' }
        }
      },
      {
        onSuccess: () => {
          toast.success("Parol muvaffaqiyatli o'zgartirildi")
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setIsPasswordModalOpen(false)
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || "Parol o'zgartirishda xatolik yuz berdi")
        }
      }
    )
  }

  const handlePhoneVerification = () => {
    if (!smsCode) {
      toast.error('SMS kodni kiriting')
      return
    }

    verifyPhoneChange(
      {
        url: URLS.verifyPhoneChange,
        attributes: { sms_code: smsCode, new_phone: newPhone },
        config: {
          headers: { Authorization: `Bearer ${session?.accessToken}`, 'Content-Type': 'application/json' }
        }
      },
      {
        onSuccess: () => {
          toast.success('Telefon raqam muvaffaqiyatli tasdiqlandi')
          setSmsCode('')
          setNewPhone('')
          setShowPhoneVerification(false)
          setPhoneNumber(newPhone)
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || "SMS kod noto'g'ri")
        }
      }
    )
  }

  const handleDelete = () => {
    if (!window.confirm(t('parentProfile.deleteConfirm'))) return
    request
      .delete('/api/v1/auth/student/delete-profile/')
      .then(() => {
        toast.success("Hisob o'chirildi")
        window.location.reload()
      })
      .catch(() => {
        toast.error("O'chirib bo'lmadi")
      })
  }

  if (isLoading) {
    return <ContentLoader classNames="!min-h-[400px] !w-full" />
  }

  return (
    <div className="flex flex-col gap-3 pb-4">
      <ParentProfileHero fullName={fullName} identification={identification} />

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ParentProfileInfoCard
            fullName={fullName}
            phone={phoneNumber}
            identification={identification}
            createdAt={createdAtRaw}
            onEdit={() => setIsEditModalOpen(true)}
          />
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <ParentProfileSecurityCard />
          <ParentProfileQuickActions
            onEditInfo={() => setIsEditModalOpen(true)}
            onChangePassword={() => setIsPasswordModalOpen(true)}
            onDeleteAccount={handleDelete}
          />
        </div>
      </div>

      <ParentEditInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fullName={fullName}
        setFullName={setFullName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        address={address}
        setAddress={setAddress}
        phoneChanged={phoneChanged}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        onSave={handleProfileUpdate}
      />

      <ParentChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isSaving={isChangingPassword}
        onSave={handlePasswordChange}
      />

      {showPhoneVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 mx-4 bg-white rounded-lg w-96">
            <h3 className="mb-4 text-lg font-semibold">Telefon raqamni tasdiqlash</h3>
            <p className="mb-4 text-gray-600">
              {newPhone} raqamiga SMS kod yuborildi. Tasdiqlash uchun kodni kiriting.
            </p>

            <div className="mb-4">
              <Input
                type="text"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
                placeholder="SMS kodni kiriting"
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handlePhoneVerification}
                disabled={isVerifyingPhone}
                className="flex-1 bg-[#5d87ff] text-white py-2 px-4 rounded-lg hover:bg-[#4a6bcc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm border border-[#5d87ff]"
              >
                {isVerifyingPhone ? 'Tasdiqlanmoqda...' : 'Tasdiqlash'}
              </button>
              <button
                onClick={() => {
                  setShowPhoneVerification(false)
                  setSmsCode('')
                  setNewPhone('')
                }}
                className="flex-1 px-4 py-2 text-sm text-white transition-colors bg-gray-500 border border-gray-500 rounded-lg hover:bg-gray-600"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ParentProfile
