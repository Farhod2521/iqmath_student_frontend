import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import SimpleLoader from '@/components/loader/simple-loader'
import { useQueryClient } from '@tanstack/react-query'
import { useAuthTabStore } from '@/store'

function AuthWelcome() {
  const { t } = useTranslation()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { resetAuth, clearCredentials } = useAuthTabStore()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { isTeacher, isLoading: roleLoading, role } = useRoleDetection()

  // Redirect when role is detected (faqat tugma bosilgandan keyin)
  useEffect(() => {
    if (shouldRedirect && !roleLoading) {
      if (isTeacher) {
        router.push('/dashboard/teacher/statistics')
      } else {
        router.push('/dashboard/student/subjects')
      }
    }
  }, [shouldRedirect, isTeacher, roleLoading, router])

  const handleEnter = () => {
    setIsLoading(true)
    setShouldRedirect(true)
  }

  const handleLogout = async () => {
    // Clear auth tab store
    resetAuth()
    clearCredentials()
    
    // Clear React Query cache
    queryClient.clear()
    queryClient.removeQueries()
    
    // Clear all storage
    localStorage.clear()
    sessionStorage.clear()
    
    await signOut({ callbackUrl: '/' })
  }

  // Loading holatini aniqlash - tugma bosilgandan keyin
  const isButtonLoading = isLoading || (shouldRedirect && roleLoading)

  // Loading matnini aniqlash
  const getLoadingText = () => {
    if (isLoading || (shouldRedirect && roleLoading)) return <SimpleLoader   /> || 'Loading...'
    if (shouldRedirect) return t('redirecting') || 'Redirecting...'
    return t('enter')
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-medium mb-5 text-white">{t('welcome')}!</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleEnter}
          disabled={isButtonLoading}
          className={`w-full sm:w-1/2 bg-[#5D87FF] hover:bg-[#4570EA] text-white py-3 rounded-md ${isButtonLoading ? 'opacity-70' : ''}`}
        >
          {isButtonLoading ? (
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
