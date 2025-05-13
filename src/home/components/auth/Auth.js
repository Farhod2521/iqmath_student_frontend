import React from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import AuthSignIn from './AuthSignIn'
import AuthSignUp from './AuthSignUp'
import AuthWelcome from './AuthWelcome'
import { useAuthTabStore } from '@/store'
import AuthForgetPassword from './AuthForgetPassword'
import AuthRecieveCode from './AuthRecieveCode'
import AuthVerifySms from './AuthVerifySms'
import AuthNewPassword from './AuthNewPassword'

function Auth() {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const { currentTab } = useAuthTabStore((state) => state)
  const { setTab } = useAuthTabStore.getState()
  const handleTabChange = (newTab) => setTab(newTab)

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-[486px] bg-white rounded-lg p-6 md:p-8 shadow-lg">
      {!session?.accessToken ? (
        <div>
          {currentTab === 'signIn' || currentTab === 'signUp' ? (
            <div>
              <div className="flex bg-[#F2F2F7] gap-2 p-2 mb-8 rounded-md">
                <button
                  onClick={() => handleTabChange('signIn')}
                  className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                    currentTab === 'signIn'
                      ? 'bg-[#5D87FF] hover:bg-[#4570EA] shadow-md text-white'
                      : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                  }`}
                >
                  {t('login')}
                </button>
                <button
                  onClick={() => handleTabChange('signUp')}
                  className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                    currentTab === 'signUp'
                      ? 'bg-[#5D87FF] hover:bg-[#4570EA] shadow-md text-white'
                      : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                  }`}
                >
                  {t('sign in')}
                </button>
              </div>
              {currentTab === 'signIn' ? <AuthSignIn /> : <AuthSignUp />}
            </div>
          ) : (
            <></>
          )}
          {currentTab === 'forgetPassword' ? <AuthForgetPassword /> : <></>}
          {currentTab === 'receiveCode' ? <AuthRecieveCode /> : <></>}
          {currentTab === 'verifySms' ? <AuthVerifySms /> : <></>}
          {currentTab === 'newPassword' ? <AuthNewPassword /> : <></>}
        </div>
      ) : (
        <AuthWelcome />
      )}
    </div>
  )
}

export default Auth
