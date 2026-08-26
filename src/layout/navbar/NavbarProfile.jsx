import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import { signOut } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

import Image from 'next/image'
import { useUserStore } from '@/store'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { ChevronRight, Gem, LogOut } from 'lucide-react'

function NavbarProfile() {
  const { t } = useTranslation()
  const { role: currentRole } = useRoleDetection()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const profileRef = useRef(null)
  const buttonRef = useRef(null)
  const router = useRouter()

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile
  })

  // Zustand store
  const { setUser } = useUserStore()

  // Effect to store user profile
  useEffect(() => {
    if (studentProfile?.data) {
      setUser(studentProfile.data)
    }
  }, [studentProfile, setUser])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current?.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current?.contains(event.target)
      ) {
        setOpenProfile(false)
      }
    }

    if (openProfile) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openProfile])

  const handleProfile = () => {
    setOpenProfile((prev) => !prev)
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/'
    })
  }

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsExiting(false)
    }, 300)
  }

  const fullName = get(studentProfile, 'data.full_name', '')
  const email = get(studentProfile, 'data.email', '')
  const identification = get(studentProfile, 'data.identification', '')

  return (
    <div className="relative z-[1000]">
      <button
        ref={buttonRef}
        className="group w-7 h-7 min-[400px]:w-8 min-[400px]:h-8 sm:w-9 sm:h-9 border-2 border-[#5d87ff] bg-white hover:bg-[#5d87ff] rounded-full flex items-center justify-center transition-colors duration-200"
        onClick={handleProfile}
      >
        <Image
          src="/icons/avatar.png"
          alt="user"
          width={16}
          height={16}
          className="rounded-full group-hover:brightness-0 group-hover:invert transition-all duration-200 min-[400px]:w-5 min-[400px]:h-5 sm:w-6 sm:h-6"
        />
      </button>

      {openProfile && (
        <div
          ref={profileRef}
          className="absolute z-[9999999] min-w-[270px] min-[400px]:min-w-[300px] sm:min-w-[320px] overflow-hidden rounded-2xl border border-[#EAEFF4] bg-white shadow-[0_16px_40px_-12px_rgba(93,135,255,0.35)] top-[55px] min-[400px]:top-[50px] right-[15px] min-[400px]:right-[30px] dark:bg-[#26334A] dark:border-[#374151]"
        >
          {/* Profil sarlavhasi */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#EEF1FF] to-white px-5 py-5 dark:from-[#2b3648] dark:to-[#26334A]">
            <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-[#5d87ff]/10" />
            <div className="relative flex items-start gap-3">
              <div className="flex shrink-0 flex-col items-center gap-1.5">
                <div className="w-12 h-12 border-2 border-[#5d87ff] bg-white rounded-full flex items-center justify-center">
                  <Image src="/icons/avatar.png" alt="user" width={26} height={26} className="rounded-full" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#DCE2FF] bg-white px-2 py-0.5 text-[10px] font-bold text-[#5d87ff]">
                  <Gem size={10} />
                  {t('studentHome.proLabel')}
                </span>
              </div>

              <div className="min-w-0 pt-1">
                {fullName && (
                  <p className="truncate text-sm font-bold text-[#191C1D] dark:text-white sm:text-base">
                    {fullName}
                  </p>
                )}
                {identification && (
                  <p className="truncate text-xs text-[#7C8FAC] dark:text-gray-300">ID: #{identification}</p>
                )}
                {email && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Image src={'/icons/mail.svg'} alt="mail" width={13} height={13} />
                    <p className="truncate text-xs text-[#4A5273] dark:text-gray-200">{email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-2 min-[400px]:p-3">
            <button
              onClick={() => {
                if (currentRole === 'teacher' || currentRole === 'mentor') {
                  router.push('/dashboard/teacher/profile')
                } else {
                  router.push('/dashboard/student/profile')
                }
              }}
              className="group/item flex w-full cursor-pointer items-center gap-x-3 rounded-xl px-2.5 py-2.5 text-start transition-colors hover:bg-[#F1F4FF] dark:hover:bg-[#2b3648]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1F4FF] text-[#5d87ff] dark:bg-white/10">
                <Image src="/icons/avatar.png" alt="user" width={18} height={18} className="rounded-full" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-black dark:text-white sm:text-base">
                  {t('myPage')}
                </p>
                <p className="truncate text-xs text-[#7C8FAC] dark:text-gray-300 sm:text-sm">{t('settings')}</p>
              </div>

              <ChevronRight
                size={16}
                className="shrink-0 text-[#B0B6C9] transition-transform group-hover/item:translate-x-0.5 group-hover/item:text-[#5d87ff]"
              />
            </button>
          </div>

          <div className="p-2 pt-0 min-[400px]:p-3 min-[400px]:pt-0">
            <button
              onClick={handleLogoutClick}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FFD9D9] bg-[#FFF5F5] py-2.5 text-[13px] font-semibold text-[#E5484D] transition-all duration-200 hover:bg-[#E5484D] hover:text-white sm:text-[15px]"
            >
              <LogOut size={16} />
              {t('logout')}
            </button>
          </div>
        </div>
      )}

      {isModalOpen &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 w-full h-full bg-black transition-opacity z-[60] duration-300 ${
                isExiting ? 'opacity-0' : 'opacity-40'
              }`}
              onClick={closeModal}
            ></div>

            <div
              className={`fixed inset-0 flex items-center justify-center z-[60] transition-all duration-300 ${
                isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[90vw] max-w-[500px] mx-4">
                <h2 className="mb-1 text-lg font-semibold sm:text-xl">{t('exitWeb')}</h2>
                <p className="text-sm sm:text-base font-medium text-[#7C8FAC] mb-4">{t('exitWebDesc')}</p>
                <div className="flex justify-end gap-x-2 sm:gap-x-[10px]">
                  <button
                    onClick={handleLogout}
                    className="bg-[#5D87FF] hover:bg-[#5680f5] w-1/3 sm:w-1/4 text-white py-1.5 sm:py-2 rounded-[8px] text-sm sm:text-base"
                  >
                    {t('yes')}
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-[#dddddd] w-1/3 sm:w-1/4 text-black py-1.5 sm:py-2 px-3 sm:px-4 rounded-[8px] text-sm sm:text-base"
                  >
                    {t('no')}
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}

export default NavbarProfile
