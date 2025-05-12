import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import BannerSignIn from './BannerSignIn'
import BannerSignUp from './BannerSignUp'

function BannerLogin() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const router = useRouter()

  const [tab, setTab] = useState('login')
  const handleTabChange = (newTab) => setTab(newTab)

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
    localStorage.clear()
    sessionStorage.clear()
  }

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-[486px] bg-white rounded-lg p-6 md:p-8 shadow-lg">
      {!session?.accessToken ? (
        <div>
          <div className="flex bg-[#F2F2F7] p-2 mb-8 rounded-md">
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
          {tab === 'login' ? <BannerSignIn /> : <BannerSignUp />}
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
