import InputPassword from '@/components/form/input/InputPassword'
import InputPhone from '@/components/form/input/InputPhone'
import SimpleLoader from '@/components/loader/simple-loader'
import { useAuthTabStore } from '@/store'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import usePostQuery from '@/hooks/api/usePostQuery'
import { KEYS } from '@/constants/key'
import { useRoleDetection } from '@/hooks/useRoleDetection'

const AuthRecieveCode = () => {
  const [timer, setTimer] = useState(120)
  const [phoneTab, setPhoneTab] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { setTab } = useAuthTabStore.getState()
  const { t } = useTranslation()
  const router = useRouter()
  
  const { isTeacher, isLoading: roleLoading } = useRoleDetection()

  // Redirect when role is detected
  useEffect(() => {
    if (shouldRedirect && !roleLoading) {
      if (isTeacher) {
        router.push('/dashboard/teacher/statistics')
      } else {
        router.push('/dashboard/student/subjects')
      }
      setShouldRedirect(false)
    }
  }, [shouldRedirect, isTeacher, roleLoading, router])

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
    setIsLoading(true)
    try {
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
        setShouldRedirect(true)
      }
    } catch (error) {
      toast.error('Login error')
    } finally {
      setIsLoading(false)
    }
  }

  const { mutate: resendSMSCode, isLoading: resendLoading } = usePostQuery({
    listKeyId: KEYS.resendSMSCode
  })

  const minutes = Math.floor(timer / 60)
  const seconds = timer % 60
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

  return (
    <div className="space-y-4 min-h-[220px]">
      <InputPhone
        value={phoneTab}
        onChange={(e) => setPhoneTab(e.target.value)}
        placeholder={t('phone number')}
      />
      <InputPassword
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value)}
        placeholder={t('sms code')}
      />
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="text-white">{t('resend code')}</span>
        <span className="text-white">{formattedTime}</span>
      </div>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={onSubmit}
          disabled={isLoading || timer > 0 || shouldRedirect}
          className={`w-[60%] border mt-2 py-2 mx-auto text-lg font-medium rounded-[8px] transition bg-[#5D87FF] text-white hover:bg-[#4570EA] ${isLoading || timer > 0 || shouldRedirect ? 'opacity-70' : ''}`}
          style={{ boxShadow: '0 0 15px 1px #00000040' }}
        >
          {(isLoading || shouldRedirect) ? <SimpleLoader /> : t('verify')}
        </button>
      </div>
    </div>
  )
}

export default AuthRecieveCode
