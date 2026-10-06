import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import AuthSignIn from './AuthSignIn'
import AuthSignUp from './AuthSignUp'
import AuthWelcome from './AuthWelcome'
import { useAuthTabStore } from '@/store'
import AuthForgetPassword from './AuthForgetPassword'
import AuthRecieveCode from './AuthRecieveCode'
import AuthVerifySms from './AuthVerifySms'
import AuthNewPassword from './AuthNewPassword'
import CredentialsPopup from '@/components/modal/CredentialsPopup'
import { getSession } from 'next-auth/react'
import { UserRound, UserRoundPlus } from 'lucide-react'

function Auth() {
  const { t } = useTranslation()
  const router = useRouter()
  const { currentTab } = useAuthTabStore((state) => state)
  const { setTab } = useAuthTabStore.getState()

  const handleTabChange = (newTab) => {
    setTab(newTab)

    // tab ni urlga yozib qo'yamiz: ?tab=signIn yoki ?tab=signUp
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: newTab }
      },
      undefined,
      { shallow: true }
    )
  }

  const getAuth = async () => {
    const session = await getSession()
    if (!!session) {
      setTab('welcome')
      return
    }

    const tab = router.query.tab
    if (tab === 'signUp' || tab === 'signIn') {
      setTab(tab)
      return
    }

    if (router.query.referral_code) {
      setTab('signUp')
      return
    }

    setTab('signIn')
  }

  useEffect(() => {
    if (!router.isReady) return
    getAuth()
  }, [router.isReady, router.query.tab, router.query.referral_code])

  const tabClass = (active) =>
    `flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-1 text-[13px] font-semibold min-[400px]:text-[14px] sm:gap-2.5 sm:text-[15px] transition ${
      active
        ? 'bg-[#2563EB] text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.9)]'
        : 'bg-white text-[#0F172A] hover:bg-[#F1F5FF]'
    }`

  return (
    <div className="relative w-full">
      <div>
        {currentTab === 'signIn' || currentTab === 'signUp' ? (
          <div>
            <div className="mb-6 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F1F5FB] p-1.5">
              <button type="button" onClick={() => handleTabChange('signIn')} className={tabClass(currentTab === 'signIn')}>
                <UserRound size={19} className="hidden shrink-0 min-[400px]:block" />
                {t('login')}
              </button>
              <button type="button" onClick={() => handleTabChange('signUp')} className={tabClass(currentTab === 'signUp')}>
                <UserRoundPlus size={19} className="hidden shrink-0 min-[400px]:block" />
                {t('signIn')}
              </button>
            </div>
            {currentTab === 'signIn' ? <AuthSignIn /> : <AuthSignUp />}
          </div>
        ) : null}
        {currentTab === 'forgetPassword' ? <AuthForgetPassword /> : null}
        {currentTab === 'receiveCode' ? <AuthRecieveCode /> : null}
        {currentTab === 'verifySms' ? <AuthVerifySms /> : null}
        {currentTab === 'newPassword' ? <AuthNewPassword /> : null}
        {currentTab === 'welcome' ? <AuthWelcome /> : null}
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
          -webkit-text-fill-color: #0f172a !important;
          transition: background-color 5000s ease-in-out 0s;
          background-color: transparent !important;
        }
      `}</style>
    </div>
  )
}

export default Auth
