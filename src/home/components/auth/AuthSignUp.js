import { useRouter } from 'next/router'
import { useState } from 'react'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// import UserAgreement from '@/components/oferta'

import InputText from '@/components/form/input/InputText'
import InputPhone from '@/components/form/input/InputPhone'
import SelectClass from '@/components/form/select/SelectClass'
import { useAuthTabStore } from '@/store'
import { URLS } from '@/constants/url'
import SimpleLoader from '@/components/loader/simple-loader'
import toast from 'react-hot-toast'
// import UserAgreement from '@/components/oferta'

function AuthSignUp() {
  const { t, i18n } = useTranslation()
  const { setTab, setPhoneTab } = useAuthTabStore.getState()
  const router = useRouter()

  const [selectedOptionCourse, setSelectedOptionCourse] = useState(null)

  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: registerRequest } = usePostQuery({
    listKeyId: KEYS.register
  })

  const onSubmit = async ({ full_name, phone }) => {
    setIsLoading(true)
    try {
      let formData = new FormData()
      formData.append('full_name', full_name)
      formData.append('phone', `${String(998) + String(phone)}`)
      formData.append('class_name', selectedOptionCourse?.value)
      registerRequest(
        { url: URLS.register, attributes: formData },
        {
          onSuccess: (data) => {
            toast.success(t('authSuccess'))
            setTab('receiveCode')
            setPhoneTab(phone)
          },
          onError: (error) => {
            if (error.response?.data?.errors) {
              const errors = error.response.data.errors
              toast.error(Object.values(errors).flat().join('\n'))
            } else {
              console.log('error occured')
            }
          }
        }
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-h-[220px] rounded-[4px]">
      {/* Ism */}
      <InputText {...register('full_name', { required: true })} placeholder={`${t('full name')}`} />
      <InputPhone
        inputMode="numeric"
        pattern="[0-9]*"
        {...register('phone', { required: true })}
        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
      />
      <SelectClass onChange={setSelectedOptionCourse} option={selectedOptionCourse} />

      {/* <UserAgreement /> */}

      <div className="w-full flex justify-center items-center">
      <button
          type="submit"
          disabled={isLoading}
          className={`w-[60%] border py-2 mt-2 text-lg font-medium rounded-[8px] transition bg-[#5D87FF] text-white hover:bg-[#4570EA] ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? <SimpleLoader /> : t('Kirish')}
        </button>
      </div>
    </form>
  )
}

export default AuthSignUp
