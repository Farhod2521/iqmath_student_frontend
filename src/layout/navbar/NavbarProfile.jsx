import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get } from 'lodash'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from '@/store'
import { useAuthTabStore } from '@/store'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useQueryClient } from '@tanstack/react-query'

function NavbarProfile() {
  const { data: session } = useSession()
  const { t } = useTranslation()
  const { role: currentRole } = useRoleDetection()
  const { resetAuth, clearCredentials } = useAuthTabStore()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const profileRef = useRef(null)
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
      if (profileRef.current && !profileRef.current?.contains(event.target)) {
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
    setOpenProfile(!openProfile)
  }

  const handleLogout = async () => {
    // Clear user store first
    const { setUser, setRole } = useUserStore.getState()
    setUser(null)
    setRole(null)
    
    // Clear auth tab store
    resetAuth()
    clearCredentials()
    
    // Clear all storage
    localStorage.clear()
    sessionStorage.clear()
    
    // Clear React Query cache
    queryClient.clear()
    queryClient.removeQueries()
    
    await signOut({ callbackUrl: 'https://iq-math.uz' })
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
      <button onClick={handleProfile}>
        <Image src={'/images/avatar.png'} alt={'user'} width={40} height={40} />
      </button>

      {openProfile && (
        <div
          ref={profileRef}
          className="absolute bg-white dark:bg-[#26334A] border rounded-md min-w-[300px] shadow-lg top-[60px] right-[30px] p-[30px] z-10"
        >
          <div className="flex gap-x-[12px]">
            <div className="space-y-[4px] text-black dark:text-white">
              {/* <h4 className="">{get(studentProfile, 'data.full_name', 'Student')}</h4>
              <p className="text-[17px]">
                {get(studentProfile, 'data.class_name', 'Student')}
              </p> */}
              {get(studentProfile, 'data.email') && (
                <div className="flex gap-x-[4px]">
                  <Image
                    src={"/icons/mail.svg"}
                    alt={"mail"}
                    width={18}
                    height={18}
                  />
                  <p className="text-sm text-[#7C8FAC] dark:text-gray-200">
                    {get(studentProfile, 'data.email')}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

          <button
            onClick={() => {
              // Foydalanuvchi rolini tekshirib, to'g'ri sahifaga yo'naltiramiz
              if (currentRole === 'teacher' || currentRole === 'mentor') {
                router.push("/dashboard/teacher/profile")
              } else {
                router.push("/dashboard/student/profile")
              }
            }}
            className="flex gap-x-[12px] text-start cursor-pointer"
          >
            <div className="bg-[#ECF2FF] p-[12px] rounded-md inline-block">
              <Image
                src={"/icons/user-square.svg"}
                alt={"user-square"}
                width={20}
                height={20}
              />
            </div>
            <div>
              <p className="text-black dark:text-white font-semibold">
                {t("myPage")}
              </p>
              <p className="text-[#7C8FAC] dark:text-gray-200 text-sm">
                {t("settings")}
              </p>
            </div>
          </button>

          <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

          <button
            onClick={handleLogoutClick}
            className="text-black py-[9px] w-full text-[15px] bg-[#EDEDF2] mb-4 rounded-md transform duration-200 hover:bg-[#5d87ff] hover:text-white transition-all duration-200"
          >
            {t("logout")}
          </button>
        </div>
      )}

      {isModalOpen &&
        createPortal(
          <>
            {/* Modal Backdrop */}
            <div
              className={`fixed inset-0 w-full h-full bg-black transition-opacity z-[60] duration-300 ${
                isExiting ? 'opacity-0' : 'opacity-40'
              }`}
              onClick={closeModal}
            ></div>

            {/* Modal Container */}
            <div
              className={`fixed inset-0 flex items-center justify-center z-[60] transition-all duration-300 ${
                isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <h2 className="text-xl font-semibold mb-1">{t('exitWeb')}</h2>
                <p className="text-lg font-medium text-[#7C8FAC] mb-4">{t('exitWebDesc')}</p>
                <div className="flex justify-end gap-x-[10px]">
                  <button
                    onClick={handleLogout}
                    className="bg-[#5D87FF] hover:bg-[#5680f5] w-1/4 text-white py-2 rounded-[8px]"
                  >
                    {t('yes')}
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-[#dddddd] w-1/4 text-black py-2 px-4 rounded-[8px]"
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
