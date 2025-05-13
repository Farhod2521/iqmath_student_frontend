import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
function AuthWelcome() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
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
  )
}

export default AuthWelcome
