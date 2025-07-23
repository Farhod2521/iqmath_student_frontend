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
import { get } from 'react-hook-form'
import { Button, Card } from '@heroui/react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [showDropdownMain, setShowDropdownMain] = useState(false)
  const [showDropdownMail, setShowDropdownMail] = useState(false)
  const [showDropdownPassword, setShowDropdownPassword] = useState(false)
  const [showDropdownAccount, setShowDropdownAccount] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [newEmail, setNewEmail] = useState('')
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    data: studentProfile,
    isLoading
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  useEffect(() => {
    if (studentProfile?.data) {
      setFullName(studentProfile.data.full_name || '')
      setPhoneNumber(studentProfile.data.phone || '')
      setBirthDate(studentProfile.data.birthday || '')
    }
  }, [studentProfile])

  const { mutate: profileUpdate } = usePostQuery({
    listKeyId: 'profile-update'
  })

  const { mutate: changePassword, isLoading: isChangingPassword } = usePostQuery({
    listKeyId: 'change-password'
  })

  const handleProfileUpdate = () => {
    const formData = new FormData()
    formData.append('full_name', fullName)
    formData.append('phone', phoneNumber)
    formData.append('birthday', birthDate)
    formData.append('student_id', get(studentProfile, 'data.id'))
    // Agar image ham bo'lsa: formData.append('image', selectedFile);

    profileUpdate(
      {
        url: URLS.profileUpdate,
        attributes: formData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      },
      {
        onSuccess: (data) => {
          toast.success('Profil muvaffaqiyatli yangilandi')
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || 'Profil yangilashda xatolik yuz berdi')
        }
      }
    )
  }

  const handleEmailSubmit = () => {
    const formData = new FormData()
    formData.append('email', newEmail)

    profileUpdate(
      {
        url: URLS.profileUpdate,
        attributes: formData
      },
      {
        onSuccess: (data) => {
          toast.success('Email muvaffaqiyatli yangilandi')
          setNewEmail('')
          setShowDropdownMail(false)
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || 'Email yangilashda xatolik yuz berdi')
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
      toast.error('Yangi parol kamida 6 ta belgi bo\'lishi kerak')
      return
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('Yangi parollar mos kelmadi')
      return
    }

    const studentPhone = get(studentProfile, 'data.phone', '')
    if (!studentPhone) {
      toast.error('Telefon raqam topilmadi')
      return
    }

    const sessionPassword = session?.password
    if (!sessionPassword) {
      toast.error('Sessiya ma\'lumotlari topilmadi')
      return
    }

    if (currentPassword !== sessionPassword) {
      toast.error('Joriy parol noto\'g\'ri')
      return
    }

    const resetFormData = new FormData()
    resetFormData.append('phone', studentPhone)
    resetFormData.append('new_password', newPassword)

    changePassword(
      {
        url: URLS.newPassword,
        attributes: resetFormData
      },
      {
        onSuccess: (data) => {
          toast.success('Parol muvaffaqiyatli o\'zgartirildi')
          setCurrentPassword('')
          setNewPassword('')
          setConfirmPassword('')
          setShowDropdownPassword(false)
        },
        onError: (error) => {
          toast.error(error.response?.data?.error || 'Yangi parol o\'rnatishda xatolik yuz berdi')
        }
      }
    )
  }

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewPassword(password)
    setConfirmPassword(password)
  }

  return (
    <LayoutAdmin title={t('profile')}>
      <div className="grid grid-cols-12 gap-[24px] font-sf pb-20">
        <div className="col-span-12 lg:col-span-6 space-y-[12px]">
          <Card className="border py-[17px] shadow-sm px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownMain(!showDropdownMain)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Основные данные</h4>
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

                <form className="space-y-[24px]">
                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Полное имя <span className="text-[#FF3B30] ">*</span>
                    </p>

                    <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Номер телефона <span className="text-[#FF3B30] ">*</span>
                    </p>

                    <Input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>

                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Дата рождение <span className="text-[#FF3B30] ">*</span>
                    </p>

                    <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                  </div>

                  <Button color="primary" className="border" onPress={handleProfileUpdate}>
                    Сохранить
                  </Button>
                </form>
              </AnimateUp>
            )}
          </Card>
          <Card className="border py-[17px] shadow-sm  px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownMail(!showDropdownMail)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Изменить email-адрес</h4>
              <button>
                <RightIcon
                  className={`${!showDropdownMail ? 'rotate-90' : '-rotate-90'} transition-all duration-200`}
                  color="#BCBFC2"
                />
              </button>
            </div>

            {showDropdownMail && (
              <AnimateUp>
                <div className="w-full h-[1px] bg-[#E9E9E9] my-[16px]"></div>

                <form className="space-y-[24px]">
                  <div>
                    <p className="text-[15px] mb-[8px]">
                      Новый email-адрес <span className="text-[#FF3B30] ">*</span>
                    </p>

                    <Input type="email" placeholder={'E-mail'} value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                  </div>

                  <Button color="primary" onPress={handleEmailSubmit}>
                    Сохранить
                  </Button>
                </form>
              </AnimateUp>
            )}
          </Card>
          <Card className="border py-[17px] shadow-sm px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownPassword(!showDropdownPassword)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Изменить пароль</h4>
              <button>
                <RightIcon
                  className={`${!showDropdownPassword ? 'rotate-90' : '-rotate-90'} transition-all duration-200`}
                  color="#BCBFC2"
                />
              </button>
            </div>

            {showDropdownPassword && (
              <AnimateUp>
                <div>
                  <div className="w-full h-[1px] bg-[#E9E9E9] my-[16px]"></div>

                  <form className="space-y-[24px]">
                    <div>
                      <p className="text-[15px] mb-[8px]">
                        Текущий пароль
                        <span className="text-[#FF3B30] ">*</span>
                      </p>
                      <div className="relative">
                        <Input 
                          type={showCurrentPassword ? "text" : "password"} 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Введите текущий пароль"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
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
                        Новый пароль
                        <span className="text-[#FF3B30] ">*</span>
                      </p>
                      <div className="relative">
                        <Input 
                          type={showNewPassword ? "text" : "password"} 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Введите новый пароль"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
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
                        Подтвердите новый пароль
                        <span className="text-[#FF3B30] ">*</span>
                      </p>
                      <div className="relative">
                        <Input 
                          type={showConfirmPassword ? "text" : "password"} 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Повторите новый пароль"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
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

                    <div className="flex gap-[12px] flex-wrap">
                      <Button 
                        color="primary" 
                        onPress={handlePasswordChange}
                        isLoading={isChangingPassword}
                      >
                        Сохранить
                      </Button>
                      <Button onPress={generatePassword}>
                        Сгенерировать новый
                      </Button>
                    </div>
                  </form>
                </div>
              </AnimateUp>
            )}
          </Card>
          <Card className="border py-[17px]  shadow-sm  px-[24px] rounded-[12px]">
            <div
              onClick={() => setShowDropdownAccount(!showDropdownAccount)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h4 className="font-medium text-[17px]">Учетная запись</h4>
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
                  <div className="flex items-center  gap-x-[15px] ">
                    <Image
                      src={'/images/avatar-profile.png'}
                      alt="avatar"
                      width={50}
                      height={50}
                      className="rounded-full bg-black"
                    />

                    <div>
                      <h3 className="text-[17px] font-semibold  ">Dilshod Suyunov</h3>
                      <p className="text-[#8A8A8E] text-[15px]">ID:123023020</p>
                    </div>
                  </div>

                  <Button
                    variant="bordered"
                    className={'flex bg-transparent !text-black gap-x-[8px] border border-[#FF3B30]'}
                  >
                    <TrashIcon color="#FF3B30" />
                    <p>Удалить аккаунт</p>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <ImageUploader />
        </div>
      </div>
            
    </LayoutAdmin>
  )
}

export default Index
