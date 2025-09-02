import InputPassword from '@/components/form/input/InputPassword'
import InputPhone from '@/components/form/input/InputPhone'
import SimpleLoader from '@/components/loader/simple-loader'
import { useAuthTabStore } from '@/store'
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

function AuthSignIn() {
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setTab } = useAuthTabStore.getState()
  const { t } = useTranslation()
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  const onSubmit = async ({ phone, password }) => {
    setIsLoading(true)
    try {
      const formattedPhone = `998${phone.replace(/[^0-9]/g, '')}`
      const result = await signIn('credentials', { phone: formattedPhone, password, redirect: false })
      if (result?.ok) {
        const session = await getSession()
        if (session?.role === 'teacher') {
          router.push('/dashboard/teacher/statistics')
        } else if (session?.role === 'parent') {
          router.push('/dashboard/parent/my-children')
        } else {
          router.push('/dashboard/student/subjects')
        }
        toast.success('Logged in successfully')
      }
    } catch (error) {
      toast.error('Login error')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading matnini aniqlash
  const getLoadingText = () => {
    if (isLoading) return t('checking role') || 'Checking role...'
    return t('login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 min-h-[220px]">
      <InputPhone {...register('phone', { required: true })} placeholder={t('phone number')} />
      <InputPassword {...register('password', { required: true })} placeholder={t('password')} />
      <div className="flex justify-between items-center text-sm mt-2">
        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          <span>{t('remember')}</span>
        </label>
        <div
          className="hover:text-[#5D87FF] cursor-pointer font-medium text-white"
          onClick={() => setTab('forgetPassword')}
        >
          {t('forget password')}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-[60%] border mt-2 py-2 mx-auto text-lg font-medium rounded-[8px] transition bg-[#5D87FF] text-white hover:bg-[#4570EA] ${
            isLoading ? 'opacity-70' : ''
          }`}
          style={{ boxShadow: '0 0 15px 1px #00000040' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
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
