import InputPassword from '@/components/form/input/InputPassword'
import InputPhone from '@/components/form/input/InputPhone'
import SimpleLoader from '@/components/loader/simple-loader'
import { RolesList } from '@/layout/libs/menulist'
import { useAuthTabStore } from '@/store'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import DeviceLimitModal from '@/components/devices/DeviceLimitModal'
import { getDeviceCredentials, parseDeviceLimitError } from '@/shared/utils/device'

function AuthSignIn() {
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setTab } = useAuthTabStore.getState()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  // 2 ta qurilma chegarasi: tanlash oynasi va qayta kirish uchun login ma'lumotlari
  const [deviceLimit, setDeviceLimit] = useState(null)
  const [pendingLogin, setPendingLogin] = useState(null)
  const [removingId, setRemovingId] = useState(null)

  const login = async ({ phone, password }, replaceDeviceId) => {
    const formattedPhone = `998${phone.replace(/[^0-9]/g, '')}`
    const result = await signIn('credentials', {
      phone: formattedPhone,
      password,
      device: 'web',
      lang: i18n.language,
      ...getDeviceCredentials(),
      ...(replaceDeviceId ? { replace_device_id: replaceDeviceId } : {}),
      redirect: false
    })

    const limit = parseDeviceLimitError(result?.error)
    if (limit) {
      setPendingLogin({ phone, password })
      setDeviceLimit(limit)
      return
    }
    setDeviceLimit(null)
    setPendingLogin(null)
    await handleResult(result)
  }

  const onSubmit = async (values) => {
    setIsLoading(true)
    try {
      await login(values)
    } catch (error) {
      toast.error(t('loginError'))
    } finally {
      setIsLoading(false)
    }
  }

  // Tanlangan qurilma chiqarib yuboriladi va shu qurilmadan kiriladi
  const replaceDevice = async (device) => {
    if (!pendingLogin) return
    setRemovingId(device.id)
    try {
      await login(pendingLogin, device.id)
    } catch (error) {
      toast.error(t('loginError'))
    } finally {
      setRemovingId(null)
    }
  }

  const handleResult = async (result) => {
    if (result?.ok) {
      const session = await getSession()

      const returnUrl = typeof router.query.returnUrl === 'string' ? router.query.returnUrl : ''

      toast.success(t('loggedInSuccessfully'))

      if (returnUrl) {
        window.location.href = returnUrl
        return
      }

      if (session?.role === RolesList.TEACHER) {
        window.location.href = '/dashboard/teacher/statistics'
      } else if (session?.role === RolesList.PARENT) {
        window.location.href = '/dashboard/parent/home'
      } else if (session?.role === RolesList.TUTOR) {
        window.location.href = '/dashboard/tutor/referrals'
      } else {
        window.location.href = '/dashboard/student/home'
      }
    } else {
      toast.error(t('invalidLogin'))
    }
  }

  // Loading matnini aniqlash
  const getLoadingText = () => {
    if (isLoading) return t('checking role') || 'Checking role...'
    return t('login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-h-[220px]">
      <DeviceLimitModal
        info={deviceLimit}
        removingId={removingId}
        onRemove={replaceDevice}
        onClose={() => {
          setDeviceLimit(null)
          setPendingLogin(null)
        }}
      />
      <InputPhone
        {...register('phone', {
          required: t('phoneRequired'),
          validate: (value) => value?.length === 9 || t('phoneNumberMustBe9Digits')
        })}
      />
      <InputPassword {...register('password', { required: true })} placeholder={t('password')} />
      <div className="flex items-center justify-between mt-2 text-sm">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={isChecked}
            className="placeholder-[#ffffee] "
            onChange={() => setIsChecked(!isChecked)}
          />
          <span>{t('remember')}</span>
        </label>
        <div
          className="hover:text-[#5D87FF] cursor-pointer font-medium text-white"
          onClick={() => setTab('forgetPassword')}
        >
          {t('forget password')}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full sm:w-[70%] md:w-[60%] lg:w-[50%] border mt-2 py-2 mx-auto text-sm sm:text-lg font-medium rounded-[8px] transition bg-[#5D87FF] text-white hover:bg-[#4570EA] ${
            isLoading ? 'opacity-70' : ''
          }`}
          style={{ boxShadow: '0 0 15px 1px #00000040' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <SimpleLoader />
              <span>{getLoadingText()}</span>
            </div>
          ) : (
            t('login')
          )}
        </button>
      </div>
    </form>
  )
}

export default AuthSignIn
