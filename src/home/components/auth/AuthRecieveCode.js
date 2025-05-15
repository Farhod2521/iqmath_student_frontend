import { useState, useEffect, useContext } from 'react'
import Brand from '@/components/brand'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import storage from '@/services/storage'
import { useRouter } from 'next/router'
import { UserProfileContext } from '@/context/responseProvider'
import { get } from 'lodash'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import Header from '@/components/header'
import { useAuthTabStore } from '@/store'

const AuthRecieveCode = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [verifyCode, setVerifyCode] = useState('')
  // const { phone } = router.query
  const { setResult } = useContext(UserProfileContext)
  const [code, setCode] = useState(new Array(5).fill(''))
  const [timer, setTimer] = useState(120)
  const [isMounted, setIsMounted] = useState(false)

  const { phoneTab } = useAuthTabStore((state) => state)
  const { setTab } = useAuthTabStore.getState()

  const formatPhoneNumber = (phone) => {
    if (phone?.length !== 9) return phone // Noto'g'ri uzunlikda bo'lsa, o'zgartirmaymiz
    return `+998 (${phone.slice(0, 2)}) ${phone.slice(2, 5)}-${phone.slice(5, 7)}-${phone.slice(7, 9)}`
  }

  const formattedPhone = formatPhoneNumber(phoneTab)

  useEffect(() => {
    // Get saved timestamp from localStorage
    const savedTimestamp = localStorage.getItem('timerTimestamp')
    const savedTime = parseInt(localStorage.getItem('timer'), 10)

    if (savedTimestamp && savedTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000)
      const newTime = Math.max(savedTime - elapsedTime, 0) // Ensure timer never goes negative
      setTimer(newTime)
    } else {
      setTimer(120)
      localStorage.setItem('timer', 120)
      localStorage.setItem('timerTimestamp', Date.now().toString())
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        localStorage.setItem('timer', prev - 1)
        localStorage.setItem('timerTimestamp', Date.now().toString())
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      localStorage.removeItem('timerTimestamp')
      localStorage.removeItem('timer')
    }
  }, [])

  const onSubmit = async () => {
    const formattedPhone = `998${phoneTab.replace(/[^0-9]/g, '')}`
    const result = await signIn('credentials', {
      phone: formattedPhone,
      sms_code: verifyCode,
      redirect: false // Prevent automatic redirect
    })

    if (result?.error) {
      toast.error('Invalid credentials')
    } else {
      toast.success('Logged in successfully')
      await router.push(`/dashboard/student/subjects?phone=${phoneTab}`)
    }
  }

  const { mutate: resendSMSCode, isLoading } = usePostQuery({
    listKeyId: KEYS.resendSMSCode
  })

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white mx-auto rounded-md">
      <h3 className="font-extrabold text-[26px] text-center">{t('authTitle')}</h3>
      <p className="text-sm sm:text-[19px] font-medium text-center mt-[8px] mb-[32px]">
        {t('authSubTitle')}
        <br />
        {formattedPhone}
      </p>

      <div className="flex flex-col  justify-center">
        <div className=" rounded-lg">
          <div className="flex items-center w-full gap-x-[12px] mb-[50px]">
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder={t('authCodePlaceholder')}
                className="border border-[#E9E9E9] bg-white rounded-[12px] text-black w-full px-3 min-h-[46px] focus:outline-none relative text-[17px] placeholder:text-[17px]"
              />
            </div>

            <div className="flex justify-center items-center">
              <span className="text-black text-sm sm:text-[22px] py-[9px] px-[27px] border border-[#D1D1D6] rounded-[10px]">
                {formattedTime}
              </span>
            </div>
          </div>

          <div className="flex gap-x-[16px]">
            <button
              onClick={() => {
                setTab('signUp')
              }}
              className="bg-[#EDEDF2] hover:bg-[#EDEDF2] text-black py-2 sm:py-[13px] w-1/2 rounded-[10px] transition-all duration-300"
            >
              {t('back')}
            </button>
            <button
              onClick={onSubmit}
              className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 sm:py-3 w-1/2 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
            >
              {t('submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthRecieveCode
