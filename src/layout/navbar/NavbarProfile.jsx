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

  return (
    <>
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
          className="absolute bg-white z-40 dark:bg-[#26334A] border rounded-md min-w-[250px] min-[400px]:min-w-[280px] sm:min-w-[300px] shadow-lg top-[55px] min-[400px]:top-[60px] right-[15px] min-[400px]:right-[30px] p-4 min-[400px]:p-[25px] sm:p-[30px]"
        >
          <div className="space-y-2">
            {get(studentProfile, 'data.email') && (
              <div className="flex gap-x-2">
                <Image
                  src={'/icons/mail.svg'}
                  alt={'mail'}
                  width={14}
                  height={14}
                  className="min-[400px]:w-4 min-[400px]:h-4"
                />
                <p className="text-xs min-[400px]:text-sm text-[#7C8FAC] dark:text-gray-200">
                  {get(studentProfile, 'data.email')}
                </p>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-[#EAEFF4] rounded-[4px] my-3 sm:my-[15px]"></div>

          <button
            onClick={() => {
              if (currentRole === 'teacher' || currentRole === 'mentor') {
                router.push('/dashboard/teacher/profile')
              } else {
                router.push('/dashboard/student/profile')
              }
            }}
            className="flex gap-x-2 sm:gap-x-3 text-start cursor-pointer w-full"
          >
            <div className="w-8 h-8 min-[400px]:w-9 min-[400px]:h-9 sm:w-10 sm:h-10 border-2 border-[#5d87ff] bg-white rounded-full flex items-center justify-center">
              <Image
                src="/icons/avatar.png"
                alt="user"
                width={20}
                height={20}
                className="rounded-full min-[400px]:w-6 min-[400px]:h-6 sm:w-7 sm:h-7"
              />
            </div>

            <div className="text-left">
              <p className="text-black dark:text-white font-semibold text-sm sm:text-base">{t('myPage')}</p>
              <p className="text-[#7C8FAC] dark:text-gray-200 text-xs sm:text-sm">{t('settings')}</p>
            </div>
          </button>

          <div className="w-full h-px bg-[#EAEFF4] rounded-[4px] my-3 sm:my-[15px]"></div>

          <button
            onClick={handleLogoutClick}
            className="py-2 sm:py-3 w-full border border-[#5d87ff] text-[13px] sm:text-[15px] text-[#5d87ff] bg-[#EDEDF2] rounded-md transform hover:bg-[#5d87ff] hover:text-white transition-all duration-200"
          >
            {t('logout')}
          </button>
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
                <h2 className="text-lg sm:text-xl font-semibold mb-1">{t('exitWeb')}</h2>
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
    </>
  )
}

export default NavbarProfile
