import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signIn, signOut, useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import SimpleLoader from '@/components/loader/simple-loader'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

function BannerLogin() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()

  const [tab, setTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm()

  useGetQuery({
    key: KEYS.faqs,
    url: URLS.faqs
  })

  const onSubmit = async ({ phone, password }) => {
    setIsLoading(true)
    const formattedPhone = `998${phone.replace(/[^0-9]/g, '')}`
    const result = await signIn('credentials', { phone: formattedPhone, password, redirect: false })

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Logged in successfully')
      router.push('/dashboard/student/subjects')
    }

    setIsLoading(false)
  }

  const handleTabChange = (newTab) => {
    setTab(newTab)
    router.push(newTab === 'login' ? '/' : '/register')
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-[486px] bg-white rounded-lg p-6 md:p-8 shadow-lg">
      {!session?.accessToken ? (
        <div>
          <div className="flex bg-[#F2F2F7] p-1 mb-8 rounded-md">
            <button
              onClick={() => handleTabChange('login')}
              className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                tab === 'login' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
              }`}
            >
              {t('login')}
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                tab === 'register' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
              }`}
            >
              {t('sign in')}
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center border border-[#E9E9E9] rounded-md px-3 py-2">
              <span className="text-sm font-medium text-black">+998</span>
              <div className="w-px h-5 bg-[#59626B] mx-2" />
              <input
                type="tel"
                maxLength={9}
                {...register('phone', { required: true })}
                className="w-full text-sm bg-white text-black focus:outline-none"
                placeholder="Номер телефона"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                className="w-full border border-[#E9E9E9] bg-white rounded-md px-3 py-2 text-sm text-black focus:outline-none"
                placeholder="Введите пароль"
              />
              <div onClick={() => setShowPassword((prev) => !prev)} className="absolute top-2.5 right-3 cursor-pointer">
                <Image
                  src={showPassword ? '/icons/eye.svg' : '/icons/eye-off.svg'}
                  alt="toggle visibility"
                  width={24}
                  height={24}
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <span>{t('remember')}</span>
              </label>
              <Link href="/auth/forget-password" className="text-[#5D87FF] font-medium hover:underline">
                {t('forget password')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white rounded-md transition ${
                isLoading ? 'bg-[#8D97B2]' : 'bg-[#5D87FF] hover:bg-[#4570EA]'
              }`}
            >
              {isLoading ? <SimpleLoader /> : t('login')}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-5">{t('welcome')}!</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push('/dashboard/student/subjects')}
              className="w-full sm:w-1/2 bg-[#5D87FF] hover:bg-[#4570EA] text-white py-3 rounded-md"
            >
              {t('enter')}
            </button>
            <button onClick={handleLogout} className="w-full sm:w-1/2 bg-[#EDEDF2] text-black py-3 rounded-md">
              {t('left')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BannerLogin
