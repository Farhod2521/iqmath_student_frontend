import { useState, useEffect } from 'react'
import RightIcon from '@/components/icons/right'
import Input from '@/components/input'
import Image from 'next/image'
import TrashIcon from '@/components/icons/trash'
import ImageUploader from '@/components/image-uploader'
import AnimateUp from '@/components/motion-animation'
import usePostQuery from '@/hooks/api/usePostQuery'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { Button, Card } from '@heroui/react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'
import { request } from '@/services/api'

const ParentProfile = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [showDropdownMain, setShowDropdownMain] = useState(false)
  const [showDropdownPassword, setShowDropdownPassword] = useState(false)
  const [showDropdownAccount, setShowDropdownAccount] = useState(false)

  // Form states - faqat API'da mavjud bo'lgan fieldlar
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Phone verification states
  const [newPhone, setNewPhone] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)

  const { data: parentProfile, isLoading } = useGetQuery({
    key: KEYS.parentProfile,
    url: URLS.parentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
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

  const { mutate: profileUpdate } = usePostQuery({
    listKeyId: 'profile-update'
  })

  const { mutate: changePassword, isLoading: isChangingPassword } = usePostQuery({
    listKeyId: 'change-password'
  })

  const { mutate: verifyPhoneChange, isLoading: isVerifyingPhone } = usePostQuery({
    listKeyId: 'verify-phone-change'
  })

  const handleProfileUpdate = () => {
    console.log('handleProfileUpdate called', { fullName, email, address, phoneNumber })

    const updateData = {
      full_name: fullName,
      email: email,
      address: address
    }

    // Agar telefon raqam o'zgargan bo'lsa, parol ham kerak
    if (phoneNumber !== get(parentProfile, 'data.phone', '')) {
      if (!currentPassword) {
        toast.error("Telefon raqamni o'zgartirish uchun joriy parolni kiriting")
        return
      }
      updateData.phone = phoneNumber
      updateData.password = currentPassword
    }

    console.log('Sending profile update request:', {
      url: URLS.updateProfile,
      data: updateData,
      token: session?.accessToken
    })

    profileUpdate(
      {
        url: URLS.updateProfile,
        attributes: updateData,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          console.log('Profile update success:', data)
          toast.success('Profil muvaffaqiyatli yangilandi')
          if (phoneNumber !== get(parentProfile, 'data.phone', '')) {
            setShowPhoneVerification(true)
            setNewPhone(phoneNumber)
          }
        },
        onError: (error) => {
          console.log('Profile update error:', error)
          toast.error(error.response?.data?.error || 'Profil yangilashda xatolik yuz berdi')
        }
      }
    )
  }

  const handlePasswordChange = () => {
    if (!currentPassword) {
      toast.error('Joriy parolni kiriting')
      return
    }

    if (!newPassword) {
      toast.error('Yangi parolni kiriting')
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

    const passwordData = {
      old_password: currentPassword,
      new_password: newPassword
    }

    changePassword(
      {
        url: URLS.changePasswordNew,
        attributes: passwordData,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          console.log('Password change success:', data)
          toast.success("Parol muvaffaqiyatli o'zgartirildi")
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setShowDropdownPassword(false)
        },
        onError: (error) => {
          console.log('Password change error:', error)
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

    const verificationData = {
      sms_code: smsCode,
      new_phone: newPhone
    }

    verifyPhoneChange(
      {
        url: URLS.verifyPhoneChange,
        attributes: verificationData,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      },
      {
        onSuccess: (data) => {
          console.log('Phone verification success:', data)
          toast.success('Telefon raqam muvaffaqiyatli tasdiqlandi')
          setSmsCode('')
          setNewPhone('')
          setShowPhoneVerification(false)
          setPhoneNumber(newPhone)
        },
        onError: (error) => {
          console.log('Phone verification error:', error)
          toast.error(error.response?.data?.error || "SMS kod noto'g'ri")
        }
      }
    )
  }

  const handleDelete = () => {
    request
      .delete('/api/v1/auth/student/delete-profile/')
      .then((res) => {
        toast.success("Hisob o'chirildi")
        window.location.reload()
      })
      .catch((err) => {
        toast.error("O'chirib bo'lmadi")
      })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-[24px] font-sf pb-20">
        <div className="col-span-12 sm:col-span-6 space-y-[12px]">
          {/* Asosiy ma'lumotlar */}
          <div className="border py-[17px] px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownMain(!showDropdownMain)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Asosiy ma'lumotlar</h4>
              <button>
                <RightIcon
                  className={`${!showDropdownMain ? 'rotate-90' : '-rotate-90'} transition-all duration-200`}
                  color="#BCBFC2"
                />
              </button>
            </div>

            {showDropdownMain && (
              <AnimateUp>
                <div className="w-full h-[1px] bg-[#E9E9E9] my-[16px]"></div>

                <form className="space-y-[24px]" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <p className="text-[15px] mb-[8px]">
                      To'liq ism <span className="text-[#FF3B30]">*</span>
                    </p>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="To'liq ismingizni kiriting"
                    />
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Telefon raqam <span className="text-[#FF3B30]">*</span>
                    </p>
                    <Input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+998901234567"
                    />
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Email <span className="text-[#FF3B30]">*</span>
                    </p>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">Manzil</p>
                    <Input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Manzilingizni kiriting"
                    />
                  </div>

                  {phoneNumber !== get(parentProfile, 'data.phone', '') && (
                    <div>
                      <p className="text-[15px] mb-[8px]">
                        Joriy parol (telefon raqamni o'zgartirish uchun) <span className="text-[#FF3B30]">*</span>
                      </p>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Joriy parolingizni kiriting"
                        />
                        <button
                          type="button"
                          className="absolute -translate-y-1/2 right-3 top-1/2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? (
                            <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
                          ) : (
                            <Image src="/icons/eye-off.svg" alt="eye-off" width={24} height={24} />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      console.log("Saqlash button clicked - Asosiy ma'lumotlar")
                      handleProfileUpdate()
                    }}
                    className="bg-[#5d87ff] text-white py-2 px-4 rounded-lg hover:bg-[#4a6bcc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm border border-[#5d87ff]"
                  >
                    Saqlash
                  </button>
                </form>
              </AnimateUp>
            )}
          </div>

          {/* Parol */}
          <div className="border py-[17px] px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownPassword(!showDropdownPassword)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Parol o'zgartirish</h4>
              <button>
                <RightIcon
                  className={`${!showDropdownPassword ? 'rotate-90' : '-rotate-90'} transition-all duration-200`}
                  color="#BCBFC2"
                />
              </button>
            </div>

            {showDropdownPassword && (
              <AnimateUp>
                <div className="w-full h-[1px] bg-[#E9E9E9] my-[16px]"></div>

                <form className="space-y-[24px]" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Joriy parol <span className="text-[#FF3B30]">*</span>
                    </p>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Joriy parolingizni kiriting"
                      />
                      <button
                        type="button"
                        className="absolute -translate-y-1/2 right-3 top-1/2"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
                        ) : (
                          <Image src="/icons/eye-off.svg" alt="eye-off" width={24} height={24} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Yangi parol <span className="text-[#FF3B30]">*</span>
                    </p>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Yangi parolni kiriting"
                      />
                      <button
                        type="button"
                        className="absolute -translate-y-1/2 right-3 top-1/2"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
                        ) : (
                          <Image src="/icons/eye-off.svg" alt="eye-off" width={24} height={24} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Yangi parolni tasdiqlang <span className="text-[#FF3B30]">*</span>
                    </p>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Yangi parolni qayta kiriting"
                      />
                      <button
                        type="button"
                        className="absolute -translate-y-1/2 right-3 top-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <Image src="/icons/eye.svg" alt="eye" width={24} height={24} />
                        ) : (
                          <Image src="/icons/eye-off.svg" alt="eye-off" width={24} height={24} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      console.log('Saqlash button clicked - Parol')
                      handlePasswordChange()
                    }}
                    disabled={isChangingPassword}
                    className="bg-[#5d87ff] text-white py-2 px-4 rounded-lg hover:bg-[#4a6bcc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm border border-[#5d87ff]"
                  >
                    {isChangingPassword ? 'Saqlanmoqda...' : 'Saqlash'}
                  </button>
                </form>
              </AnimateUp>
            )}
          </div>

          {/* Hisob ma'lumotlari */}
          <div className="border py-[17px] px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownAccount(!showDropdownAccount)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Hisob ma'lumotlari</h4>
              <button>
                <RightIcon
                  className={`${!showDropdownAccount ? 'rotate-90' : '-rotate-90'} transition-all duration-200`}
                  color="#BCBFC2"
                />
              </button>
            </div>

            {showDropdownAccount && (
              <div>
                <div className="w-full h-[1px] bg-[#E9E9E9] my-[16px]"></div>

                <div className="flex justify-between gap-[8px] flex-wrap">
                  <div className="flex items-center gap-x-[15px]">
                    <Image
                      src={'/images/avatar-profile.png'}
                      alt="avatar"
                      width={50}
                      height={50}
                      className="bg-black rounded-full"
                    />

                    <div>
                      <h3 className="text-[17px] font-semibold">{get(parentProfile, 'data.full_name', '')}</h3>
                      <p className="text-[#8A8A8E] text-[15px]">ID: {get(parentProfile, 'data.id', '')}</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleDelete}
                    variant="bordered"
                    className={'flex bg-transparent !text-black gap-x-[8px] border border-[#FF3B30]'}
                  >
                    <TrashIcon color="#FF3B30" />
                    <p>Hisobni o'chirish</p>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 sm:col-span-6">
          <ImageUploader />
        </div>
      </div>

      {/* Phone Verification Modal */}
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
                onClick={() => {
                  console.log('Tasdiqlash button clicked')
                  handlePhoneVerification()
                }}
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
    </>
  )
}

export default ParentProfile
