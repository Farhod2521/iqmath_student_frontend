import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
// import ThemeChanger from "../theme-switcher";
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import storage from '@/services/storage'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import LanguageDropdown from '@/components/language'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'

const MainContentHead = ({ toggleSidebar, title, handleTab, tab }) => {
  const { data: session } = useSession()
  // const [tab, setTab] = useState("active");
  const [openProfile, setOpenProfile] = useState(false)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const { theme } = useTheme()
  const profileRef = useRef(null)
  const { t } = useTranslation()

  const [accessToken, setAccessToken] = useState('')
  const [showModal, setShowModal] = useState(false)

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  // o'quvchini bali
  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })

  const handleProfile = () => {
    setOpenProfile(!openProfile)
  }

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

  const handleLogout = async () => {
    await signOut({
      callbackUrl: 'https://iq-math.uz'
    })

    localStorage.clear()
    sessionStorage.clear()
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
    <div className="border-b">
      <div className={'flex flex-col xs:flex-row justify-between px-2 xs:px-4 sm:px-[16px] md:px-[24px] pt-2 xs:pt-4 pb-2 xs:pb-4 gap-y-2 xs:gap-y-0'}>
        <div className={'flex items-center gap-x-2 xs:gap-x-[16px] sm:gap-x-[24px] flex-1 min-w-0'}>
          <button onClick={toggleSidebar}>
            <Image src={'/icons/sidebar.svg'} alt={'sidebar'} width={24} height={24} />
          </button>

          <p className="truncate text-[18px] xs:text-[20px] sm:text-[24px] font-semibold text-black max-w-[150px] xs:max-w-none">{title}</p>

          {router.pathname === '/dashboard/student/my-study' && (
            <div className="flex bg-[#F2F2F7] p-[4px] max-w-[223px] w-full rounded-[8px]">
              <button
                onClick={() => {
                  handleTab('active')
                }}
                className={`py-[6px]  rounded-md text-[15px] font-medium   w-1/2 transition-all duration-300 capitalize ${
                  tab === 'active' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                }`}
              >
                Активные
              </button>

              <button
                onClick={() => {
                  handleTab('frozen')
                }}
                className={`py-2 px-4 w-2/3 rounded-md transition-all duration-300 ${
                  tab === 'frozen' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                }`}
              >
                Замароженные
              </button>
            </div>
          )}
        </div>

        <div className={'flex items-center gap-x-2 xs:gap-x-[10px] sm:gap-x-[16px] flex-wrap'}>
          <div
            onClick={() => router.push('/dashboard/student/coins')}
            className="flex gap-x-1 items-center py-1 xs:py-[7px] cursor-pointer px-2 xs:px-[12px] border border-[#E9E9E9] rounded-[12px] min-w-0"
          >
            <Image src={'/icons/coins-logo.svg'} alt="coins-logo" width={20} height={20} className="xs:w-[26px] xs:h-[26px]" />
            <p className="text-[14px] xs:text-[16px] sm:text-[19px] font-medium truncate max-w-[60px] xs:max-w-none">
              {get(coins, 'data.score')} <span className="hidden min-[401px]:inline">{t('ball')}</span>
            </p>
          </div>

          <div className="[&>button>span]:hidden min-[401px]:[&>button>span]:inline">
            <LanguageDropdown />
          </div>

          <div className="scale-100 active:scale-110 transition-all duration-300 p-1 xs:p-[6px] cursor-pointer">
            <Image src={'/icons/bell.svg'} alt="coins-logo" width={20} height={20} className="xs:w-[26px] xs:h-[26px]" />
          </div>

          <button onClick={handleProfile} className="ml-1 xs:ml-0">
            <Image src={'/images/avatar.png'} alt={'user'} width={28} height={28} className="xs:w-[40px] xs:h-[40px] rounded-full" />
          </button>

          {/* <div className="hidden lg:flex items-center gap-x-[10px]">
          {isEmpty(get(networkings, "data", []))
            ? ""
            : get(networkings, "data", []).map((networking, index) => (
                <div key={get(networking, "id") || index}>
                  {get(networking, "name") === "telegram" ? (
                    <a href={get(networking, "link")} target="_blank">
                      <TelegramIcon className="text-black dark:text-white hover:text-[#5d87ff]" />
                    </a>
                  ) : get(networking, "name") === "instagram" ? (
                    <a href={get(networking, "link")} target="_blank">
                      <InstagramIcon className="text-black dark:text-white hover:text-[#5d87ff]" />
                    </a>
                  ) : (
                    <a href="tel: +998 78 888 08 00" className="text-sm">
                      {" "}
                      <PhoneIcon className="text-black dark:text-white hover:text-[#5d87ff]" />{" "}
                    </a>
                  )}
                </div>
              ))}
        </div> */}

          {/* <ThemeChanger /> */}

          {/* <button onClick={handleProfile}>
          <Image src={"/images/user.png"} alt={"user"} width={42} height={42} />
        </button> */}

          {openProfile && (
            <div
              ref={profileRef}
              className="absolute bg-white dark:bg-[#26334A] border rounded-md  min-w-[300px] top-[80px] right-[30px] shadow-lg  p-[30px] z-50"
            >
              <div className="flex gap-x-[12px]">
                <div className="space-y-[4px] text-black dark:text-white">
                  <p className="text-[17px]">ID: {get(studentProfile, 'data.id')}</p>
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

              <button
                onClick={() => router.push('/dashboard/student/profile')}
                className="flex gap-x-[12px] text-start cursor-pointer"
              >
                <div className="bg-[#ECF2FF] p-[12px] rounded-md inline-block">
                  <Image src={'/icons/user-square.svg'} alt={'user-settings'} width={20} height={20} />
                </div>
                <div>
                  <p className="text-black dark:text-white font-semibold">{t('myPage')}</p>
                  <p className="text-[#7C8FAC] dark:text-gray-200 text-sm">{t('settings')}</p>
                </div>
              </button>

              <div className="w-full h-[1px] bg-[#EAEFF4] rounded-[4px] my-[15px]"></div>

              <button
                onClick={handleLogoutClick}
                className=" py-[8px] w-full bg-[#EDEDF2FF] text-black rounded-md hover:bg-[#dddddd] transform duration-200"
              >
                {t('logout')}
              </button>
            </div>
          )}

          {isModalOpen && (
            <>
              <div
                className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
                  isExiting ? 'opacity-0' : 'opacity-40'
                }`}
              ></div>
              <div
                className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
                  isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                  <h2 className="text-xl font-semibold mb-1">{t('exitWeb')}</h2>
                  <p className="text-lg font-medium text-[#7C8FAC] mb-4">{t('exitWebDesc')}</p>
                  <div className="flex justify-end gap-x-[10px]">
                    <button
                      onClick={handleLogout}
                      className="bg-[#5D87FF] hover:bg-[#5680f5] w-1/4 text-white py-2  rounded-[8px]"
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainContentHead
