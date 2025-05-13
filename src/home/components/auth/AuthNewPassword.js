import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthTabStore } from '@/store'

const AuthNewPassword = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { currentTab, phoneTab } = useAuthTabStore((state) => state)
  const { setTab, setPhoneTab } = useAuthTabStore.getState()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { mutate: newPassword } = usePostQuery({
    listKeyId: KEYS.newPassword
  })

  const onSubmit = ({ new_password }) => {
    let formData = new FormData()
    formData.append('phone', `${String(998) + String(phoneTab)}`)
    formData.append('new_password', new_password)
    newPassword(
      {
        url: URLS.newPassword,
        attributes: formData
      },
      {
        onSuccess: (data) => {
          toast.success('Logged in successfully')
          setTab('signIn')
        },
        onError: (error) => {
          console.log('Full error response:')

          toast.error(error.response?.data.error)
        }
      }
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-xl  font-extrabold sm:text-[26px] text-center mb-6">{t('resetPassword')}</p>
      <div>
        <div className="border border-[#EAEFF4] flex gap-x-2 items-center rounded-[12px] px-[16px] py-[10px]">
          <p className="text-[17px] font-medium text-black">+998</p>
          <div className="w-px h-[20px] bg-[#59626B] mx-2"></div>

          <input
            type="tel"
            maxLength="9"
            value={phoneTab}
            disabled
            className="w-full bg-white text-sm sm:text-[17px] text-black "
          />
        </div>
      </div>

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('new_password', { required: true })}
          placeholder={`${t('newPassword')}`}
          className="border border-[#EAEFF4] bg-white rounded-[12px] text-sm sm:text-[17px] text-black w-full px-[16px] py-[10px] min-h-[46px]"
        />
        <div
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-[10px] right-3 bottom-0 cursor-pointer"
        >
          {showPassword ? (
            <Image src={'/icons/eye.svg'} alt={'edit'} width={24} height={24} />
          ) : (
            <Image src={'/icons/eye-off.svg'} alt={'edit'} width={24} height={24} />
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setTab('signIn')
            setPhoneTab('')
          }}
          className="bg-[#EDEDF2] hover:bg-[#EDEDF2] text-black py-2 sm:py-3 w-full rounded-md transition-all duration-300"
        >
          {t('back')}
        </button>
        <button className="bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 sm:py-3 w-full rounded-md transition-all duration-300">
          {t('finish')}
        </button>
      </div>
    </form>
  )
}

export default AuthNewPassword
