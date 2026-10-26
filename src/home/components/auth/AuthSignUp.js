import { useRouter } from 'next/router'
import { useState } from 'react'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import InputText from '@/components/form/input/InputText'
import InputPhone from '@/components/form/input/InputPhone'
import SelectClass from '@/components/form/select/SelectClass'
import SelectRole from '@/components/form/select/SelectRole'
import { useAuthTabStore } from '@/store'
import { URLS } from '@/constants/url'
import SimpleLoader from '@/components/loader/simple-loader'
import toast from 'react-hot-toast'
import AuthButton from './AuthButton'

function AuthSignUp() {
  const { t, i18n } = useTranslation()
  const { setTab, setPhoneTab, setLoginCredentials, setShowCredentialsPopup, setSelectedRole } = useAuthTabStore(
    (state) => state
  )
  const router = useRouter()

  const [selectedOptionCourse, setSelectedOptionCourse] = useState(null)
  const [selectedRole, setSelectedRoleLocal] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [consent, setConsent] = useState(false)

  const { register, handleSubmit } = useForm()

  const { mutate: registerRequest } = usePostQuery({
    listKeyId: KEYS.register
  })

  // Function to translate error messages
  const translateErrorMessage = (errorMessage) => {
    if (errorMessage.includes("Bu telefon raqam allaqachon ro'yxatdan o'tgan")) {
      return t('phoneAlreadyRegistered')
    }
    return errorMessage // Return original message if no translation found
  }

  const onSubmit = async ({ full_name, phone }) => {
    if (!selectedRole) {
      toast.error(t('userTypeRequired'))
      return
    }

    if (selectedRole.value === 'student' && !selectedOptionCourse) {
      toast.error(t('classRequired'))
      return
    }

    if (!consent) {
      toast.error(t('signUpConsentRequired'))
      return
    }

    setIsLoading(true)
    try {
      let formData = new FormData()
      formData.append('full_name', full_name)
      formData.append('phone', `${String(998) + String(phone)}`)
      formData.append('role', selectedRole.value)
      formData.append('lang', i18n.language)
      formData.append('device', 'web')

      if (selectedRole.value === 'student') {
        formData.append('class_name', selectedOptionCourse?.value)
      }

      if (router.query.referral_code) {
        formData.append('referral_code', router.query.referral_code)
      }
      registerRequest(
        { url: URLS.register, attributes: formData },
        {
          onSuccess: (data) => {
            toast.success(t('authSuccess'))

            // Login/parol ma'lumotlarini ko'rsatish
            if (data?.data?.login && data?.data?.password) {
              setLoginCredentials({
                login: data.data.login,
                password: data.data.password
              })
              setShowCredentialsPopup(true)
            } else {
              // Try alternative response structures
              if (data?.login && data?.password) {
                setLoginCredentials({
                  login: data.login,
                  password: data.password
                })
                setShowCredentialsPopup(true)
              }
            }

            setPhoneTab(phone)
            setTab('receiveCode')
          },
          onError: (error) => {
            if (error.response?.data?.errors) {
              const errors = error.response.data.errors
              const errorMessages = Object.values(errors).flat()
              const translatedMessages = errorMessages?.map((msg) => translateErrorMessage(msg))
              toast.error(translatedMessages.join('\n'))
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
      <InputText {...register('full_name', { required: true })} placeholder={t('full_name')} />
      <InputPhone
        placeholder="(__) ___-__-__"
        {...register('phone', {
          required: t('phoneRequired'),
          validate: (value) => value?.length === 9 || t('phoneNumberMustBe9Digits')
        })}
      />

      {/* Foydalanuvchi turi */}
      <SelectRole
        value={selectedRole}
        onChange={(role) => {
          setSelectedRoleLocal(role)
          setSelectedRole(role)
        }}
      />

      {/* O'quvchi uchun sinf tanlash */}
      {selectedRole?.value === 'student' && (
        <SelectClass onChange={setSelectedOptionCourse} option={selectedOptionCourse} />
      )}

      {/* Shaxsiy ma'lumotlarni qayta ishlashga rozilik */}
      <label className="flex cursor-pointer items-start gap-2 text-left text-[13px] leading-snug text-[#475569]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#2563EB]"
        />
        <span>
          {t('signUpConsentStart')}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2563EB] underline">
            {t('signUpConsentLink')}
          </a>
          {t('signUpConsentEnd')}
        </span>
      </label>

      <div className="pt-2">
        <AuthButton type="submit" disabled={isLoading || !consent}>
          {isLoading ? <SimpleLoader /> : t('signIn')}
        </AuthButton>
      </div>
    </form>
  )
}

export default AuthSignUp
