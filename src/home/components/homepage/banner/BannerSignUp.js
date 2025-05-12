import { useRouter } from 'next/router'
import { useState } from 'react'
import usePostQuery from '@/hooks/api/usePostQuery'
import toast from 'react-hot-toast'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

// import UserAgreement from '@/components/oferta'

import InputText from '@/components/form/input/InputText'
import InputPhone from '@/components/form/input/InputPhone'
import SelectClass from '@/components/form/select/SelectClass'

function BannerSignUp() {
  const { t, i18n } = useTranslation()

  const router = useRouter()

  const [selectedOptionCourse, setSelectedOptionCourse] = useState(null)

  const { register, handleSubmit } = useForm()

  const { mutate: registerRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.register
  })

  const onSubmit = ({ full_name, phone }) => {
    let formData = new FormData()
    formData.append('full_name', full_name)
    formData.append('phone', `${String(998) + String(phone)}`)
    formData.append('class_name', selectedOptionCourse?.value)
    console.log('ERROR')
    // registerRequest(
    //   { url: URLS.register, attributes: formData },
    //   {
    //     onSuccess: (data) => {
    //       toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz")
    //       router.push(`/auth/recieve-code/${phone}`)
    //     },
    //     onError: (error) => {
    //       if (error.response?.data?.errors) {
    //         const errors = error.response.data.errors
    //         toast.error(Object.values(errors).flat().join('\n'))
    //       } else {
    //         console.log('error occured')
    //       }
    //     }
    //   }
    // )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[10px]  rounded-[4px]">
      {/* Ism */}
      <InputText {...register('full_name', { required: true })} placeholder={`${t('full name')}`} />
      <InputPhone
        inputMode="numeric"
        pattern="[0-9]*"
        {...register('phone', { required: true })}
        onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ''))}
        placeholder="Номер телефона"
      />
      <SelectClass onChange={setSelectedOptionCourse} option={selectedOptionCourse} />

      {/* <UserAgreement /> */}

      <div className="flex justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-1/2 py-2 text-white rounded-md transition ${
            isLoading ? 'bg-[#8D97B2]' : 'bg-[#5D87FF] hover:bg-[#4570EA]'
          }`}
        >
          {isLoading ? <SimpleLoader /> : t('enter')}
        </button>
      </div>
    </form>
  )
}

export default BannerSignUp
