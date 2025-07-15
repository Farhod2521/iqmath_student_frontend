import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import SimpleLoader from '@/components/loader/simple-loader'

function AuthWelcome() {
  const { t } = useTranslation()
  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  
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

  const handleEnter = () => {
    setShouldRedirect(true)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-medium mb-5 text-white">{t('welcome')}!</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleEnter}
          disabled={shouldRedirect}
          className={`w-full sm:w-1/2 bg-[#5D87FF] hover:bg-[#4570EA] text-white py-3 rounded-md ${shouldRedirect ? 'opacity-70' : ''}`}
        >
          {shouldRedirect ? <SimpleLoader /> : t('enter')}
        </button>
        <button onClick={handleLogout} className="w-full sm:w-1/2 bg-[#EDEDF2] text-black py-3 rounded-md">
          {t('left')}
        </button>
      </div>
    </div>
  )
}

export default AuthWelcome
