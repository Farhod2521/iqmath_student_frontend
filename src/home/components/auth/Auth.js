import React, { useEffect } from 'react'
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
import CredentialsPopup from '@/components/modal/CredentialsPopup'

function Auth() {
  const { t } = useTranslation()
  const { data: session } = useSession()

  const { currentTab } = useAuthTabStore((state) => state)
  const { setTab, resetAuth } = useAuthTabStore.getState()
  const handleTabChange = (newTab) => setTab(newTab)

  // Reset auth tab to signIn when user first visits
  useEffect(() => {
    // Faqat currentTab undefined, null yoki '' bo'lsa, reset qil
    if (!session?.accessToken && (!currentTab || currentTab === '')) {
      resetAuth()
    }
  }, [session?.accessToken, currentTab, resetAuth])

  return (
    <div className="min-h-screen  w-full flex items-center justify-center relative" style={{backgroundImage: 'url(/your-bg-image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="w-full max-w-xl md:min-w-[550px] rounded-lg p-8 md:p-12 shadow-lg" style={{background: 'rgba(255,255,255,0.4)', boxShadow: '0 0 15px 1px #00000040'}}>
          <div>
            {currentTab === 'signIn' || currentTab === 'signUp' ? (
              <div>
                <div className="tab-row  flex flex-col gap-2 p-2 mb-8 rounded-md" style={{background: '#ECF2FF'}}>
                  <button
                    onClick={() => handleTabChange('signIn')}
                    className={`[400px]-w-1/2 w-full py-1.5 text-sm font-medium rounded-md transition ${
                      currentTab === 'signIn'
                        ? 'bg-[#5D87FF] hover:bg-[#4570EA] shadow-md text-white'
                        : 'text-[#222] hover:bg-[#ECF2FF]'
                    }`}
                  >
                    {t('login')}
                  </button>
                  <button
                    onClick={() => handleTabChange('signUp')}
                    className={`[400px]-w-1/2 py-1.5 w-full text-sm font-medium rounded-md transition ${
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
        
      </div>
      
      {/* Login/parol ko'rsatadigan popup */}
      <CredentialsPopup />
      
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
        @media (min-width: 400px) {
          .tab-row {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  )
}

export default Auth
