import React from 'react'
import Brand from '@/components/brand'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import SimpleLoader from '@/components/loader/simple-loader'
function BannerLogin() {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const [openIndex, setOpenIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [tab, setTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const {
    data: faqsData,
    isLoading: isLoadingFAQs,
    isFetching: isFetchingFAQS
  } = useGetQuery({
    key: KEYS.faqs,
    url: URLS.faqs
  })

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const onSubmit = async ({ phone, password }) => {
    setIsLoading(true)
    const formattedPhone = `998${phone.replace(/[^0-9]/g, '')}`
    const result = await signIn('credentials', {
      phone: formattedPhone,
      password,
      redirect: false // Prevent automatic redirect
    })

    if (result?.error) {
      toast.error(result?.error)
    } else {
      toast.success('Logged in successfully')
      router.push('/dashboard/student/subjects')
    }

    setIsLoading(false)
  }

  const handleTab = (tab) => {
    setTab(tab)
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/' // Redirect to iq-math.uz after sign out
    })

    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <div
      style={{ backgroundImage: `url(/images/bg-main-img.png)` }}
      className="bg-center bg-cover bg-no-repeat min-h-screen flex flex-col font-sf"
    >
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-[486px] bg-white mx-auto rounded-lg p-6 md:p-8 shadow-lg">
          {!session?.accessToken ? (
            <div className="w-full">
              <div className="flex items-center justify-center">
                <Brand />
              </div>
              {/* Tab Buttons */}
              <div className="flex bg-[#F2F2F7] p-[4px] my-[32px] rounded-[8px]">
                <button
                  onClick={() => {
                    handleTab('login')
                    router.push('/')
                  }}
                  className={`py-[6px]  rounded-md text-[15px] font-medium   w-1/2 transition-all duration-300 capitalize ${
                    tab === 'login' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                  }`}
                >
                  {t('login')}
                </button>

                <button
                  onClick={() => {
                    handleTab('register')
                    router.push('/register')
                  }}
                  className={`py-2 px-4 w-2/3 rounded-md transition-all duration-300 ${
                    tab === 'register' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                  }`}
                >
                  {t('sign in')}
                </button>
              </div>

              {/* Form Section */}
              <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-[12px] ">
                  <div className="min-h-[46px]">
                    {/* <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                  {t("phone number")}
                </label> */}

                    <div className="border border-[#E9E9E9] flex items-center rounded-[12px] px-3 py-2">
                      <p className="text-[17px] font-medium text-black">+998</p>
                      <div className="w-px h-[20px] bg-[#59626B] mx-2"></div>
                      <input
                        type="tel"
                        maxLength="9"
                        {...register('phone', { required: true })}
                        className="w-full bg-white text-[17px] text-black  focus:outline-none"
                        placeholder="Номер телефона"
                      />
                    </div>
                  </div>

                  <div>
                    {/* <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                  {t("password")}
                </label> */}
                    <div className="relative ">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', { required: true })}
                        placeholder="Введите пароль"
                        className="border border-[#E9E9E9] bg-white rounded-[12px] text-black w-full px-3 min-h-[46px] focus:outline-none relative"
                      />
                      <div
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-3 right-3 bottom-0 cursor-pointer"
                      >
                        {showPassword ? (
                          <Image src={'/icons/eye.svg'} alt={'edit'} width={24} height={24} />
                        ) : (
                          <Image src={'/icons/eye-off.svg'} alt={'edit'} width={24} height={24} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-4">
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="w-4 h-4" />
                      <span>{t('remember')}</span>
                    </label>

                    <Link
                      href="/auth/forget-password"
                      className="text-[#5D87FF] font-medium hover:underline transition duration-200"
                    >
                      {t('forget password')}
                    </Link>
                  </div>

                  <button
                    disabled={isLoading}
                    className={`w-full ${
                      isLoading ? 'bg-[#8D97B2]' : 'bg-[#5D87FF] hover:bg-[#4570EA]'
                    } text-white py-2 rounded-md transition-all duration-300`}
                  >
                    {isLoading ? <SimpleLoader /> : t('login')}
                  </button>
                </form>
              </div>
              {/* {isEmpty(get(banner, "data", [])) ? "" : <Modal />} */}
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-medium mb-5">{t('welcome')}!</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push('/dashboard/student/subjects')}
                  className="bg-[#5D87FF] hover:bg-[#4570EA] py-3  w-1/2 text-white rounded-md transition-all"
                >
                  {t('enter')}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#EDEDF2]  hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
                >
                  {t('left')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BannerLogin
