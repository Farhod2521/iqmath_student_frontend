import React, { useState } from 'react'
import { getSession, signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import SimpleLoader from '@/components/loader/simple-loader'
import { RolesList } from '@/layout/libs/menulist'

function AuthWelcome() {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const handleEnter = async () => {
    setIsLoading(true)
    try {
      const session = await getSession()

      if (session?.role === RolesList.TEACHER) {
        window.location.href = '/dashboard/teacher/statistics'
      } else if (session?.role === RolesList.PARENT) {
        window.location.href = '/dashboard/parent/my-children'
      } else if (session?.role === RolesList.TUTOR) {
        window.location.href = '/dashboard/tutor/referrals'
      } else {
        window.location.href = '/dashboard/student/home'
      }
    } catch (e) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  // Loading matnini aniqlash
  const getLoadingText = () => {
    if (isLoading) return <SimpleLoader /> || 'Loading...'
    return t('enter')
  }

  return (
    <div className="text-center">
      <h1 className="mb-5 text-2xl font-medium text-white">{t('welcome')}!</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleEnter}
          className={`w-full sm:w-1/2 bg-[#5D87FF] hover:bg-[#4570EA] text-white py-3 rounded-md ${
            isLoading ? 'opacity-70' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <span>{getLoadingText()}</span>
            </div>
          ) : (
            t('enter')
          )}
        </button>
        <button onClick={handleLogout} className="w-full sm:w-1/2 bg-[#EDEDF2] text-black py-3 rounded-md">
          {t('left')}
        </button>
      </div>
    </div>
  )
}

export default AuthWelcome
