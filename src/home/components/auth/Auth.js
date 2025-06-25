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
    <div className="min-h-screen flex items-center justify-center relative" style={{backgroundImage: 'url(/your-bg-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="w-full max-w-xl md:min-w-[550px] rounded-lg p-12 shadow-lg" style={{background: 'rgba(255,255,255,0.4)'}}>
        {!session?.accessToken ? (
          <div>
            {currentTab === 'signIn' || currentTab === 'signUp' ? (
              <div>
                <div className="flex gap-2 p-2 mb-8 rounded-md" style={{background: '#ECF2FF'}}>
                  <button
                    onClick={() => handleTabChange('signIn')}
                    className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                      currentTab === 'signIn'
                        ? 'bg-[#5D87FF] hover:bg-[#4570EA] shadow-md text-white'
                        : 'text-[#222] hover:bg-[#ECF2FF]'
                    }`}
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => handleTabChange('signUp')}
                    className={`w-1/2 py-1.5 text-sm font-medium rounded-md transition ${
                      currentTab === 'signUp'
                        ? 'bg-[#5D87FF] hover:bg-[#4570EA] text-white shadow-md'
                        : 'text-[#222] hover:bg-[#ECF2FF]'
                    }`}
                  >
                    {t('sign in')}
                  </button>
                </div>
                {currentTab === 'signIn' ? <AuthSignIn /> : <AuthSignUp />}
              </div>
            ) : null}
            {currentTab === 'forgetPassword' ? <AuthForgetPassword /> : null}
            {currentTab === 'receiveCode' ? <AuthRecieveCode /> : null}
            {currentTab === 'verifySms' ? <AuthVerifySms /> : null}
            {currentTab === 'newPassword' ? <AuthNewPassword /> : null}
          </div>
        ) : (
          <AuthWelcome />
        )}
      </div>
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
          box-shadow: 0 0 0 1000px transparent inset !important;
          -webkit-text-fill-color: white !important;
          transition: background-color 5000s ease-in-out 0s;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  )
}

export default Auth
