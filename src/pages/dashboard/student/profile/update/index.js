import { useState } from 'react'
import RightIcon from '@/components/icons/right'
import Input from '@/components/input'
// import Button from '@/components/button'
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

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  const { mutate: profileUpdate } = usePostQuery({
    listKeyId: 'profile-update'
  })

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('phoneNumber', phoneNumber)
      formData.append('birthDate', birthDate)
      formData.append('student_id', get(studentProfile, 'data.id'))
      // Agar image ham bo'lsa: formData.append('image', selectedFile);

      const response = await axios.post('https://backend.iq-math.uz/api/v1/auth/student/profile-update/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      console.error('Catch Error:', error.response?.data || error.message)
    }
  }

  const handleMainDataSubmit = () => {
    const data = {
      full_name: fullName, // inputdagi qiymatlar
      phone: phoneNumber,
      birthday: birthDate,
      student_id: get(studentProfile, 'data.id')
    }
    handleProfileUpdate(data)
  }

  const handleEmailSubmit = () => {
    const data = {
      email: newEmail
    }
    handleProfileUpdate(data)
  }
  // headerTitle={"Личные данные"}
  return (
    <LayoutAdmin title={t('profile')}>
      <div className="grid grid-cols-12 gap-[24px] font-sf pb-20">
        <div className="col-span-12 lg:col-span-6 space-y-[12px]">
          {/* Main infos */}
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
          {/* Email */}
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

                    <Input type="email" placeholder={'E-mail'} />
                  </div>

                  <Button color="primary" isDisabled>
                    Сохранить
                  </Button>
                </form>
              </AnimateUp>
            )}
          </Card>
          {/* Password */}
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
                        Новый пароль
                        <span className="text-[#FF3B30] ">*</span>
                      </p>
                      <Input type="password" />
                    </div>

                    <div className="flex gap-[12px] flex-wrap">
                      <Button color="primary" isDisabled>
                        Сохранить
                      </Button>
                      <Button>Сгенерировать новый</Button>
                    </div>
                  </form>
                </div>
              </AnimateUp>
            )}
          </Card>
          {/* Account Delete */}
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
      {/* Save or exit section */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-t-[#E9E9E9] p-4 flex justify-end gap-2">
        <Button className="py-[13px] px-[16px] bg-[#EDEDF2] text-black rounded-[10px]">Отменить изменения</Button>
        <Button className="py-[13px] px-[16px] bg-[#5D87FF]  text-white rounded-[10px]">Сохранить изменения</Button>
      </div>
    </LayoutAdmin>
  )
}

export default Index
