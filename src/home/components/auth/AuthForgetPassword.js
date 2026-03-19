import { useAuthTabStore } from '@/store'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import InputPhone from '@/components/form/input/InputPhone'

function AuthForgetPassword() {
  const { currentTab } = useAuthTabStore((state) => state)

  const { setTab } = useAuthTabStore.getState()
  const { setPhoneTab } = useAuthTabStore.getState()

  const router = useRouter()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { mutate: forgetPassword } = usePostQuery({
    listKeyId: KEYS.forgetPassword
  })

  const onSubmit = ({ phone }) => {
    let formData = new FormData()
    formData.append('phone', `${String(998) + String(phone)}`)
    forgetPassword(
      {
        url: URLS.forgetPassword,
        attributes: formData
      },
      {
        onSuccess: (data) => {
          toast.success('Logged in successfully')
          setTab('verifySms')
          setPhoneTab(phone)
        },
        onError: (error) => {
          toast.error(`${error.response?.data.retry_after} dan keyin sinab ko'ring`)

          toast.error(error.response?.data.error)
        }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5  rounded-md">
      <div className="min-h-[46px]">
        <InputPhone
          {...register('phone', {
            required: t('phoneRequired'),
            validate: (value) => value?.length === 9 || t('phoneNumberMustBe9Digits')
          })}
          placeholder="Номер телефона"
        />
      </div>
      <div className="flex gap-x-[16px]">
        <button
          type="button"
          onClick={() => setTab('signIn')}
          className="bg-[#EDEDF2] hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
        >
          {t('back')}
        </button>
        <button
          type="submit"
          className="bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 sm:py-3 w-1/2 rounded-md transition-all duration-300"
        >
          {t('sendCode')}
        </button>
      </div>
    </form>
  )
}

export default AuthForgetPassword
