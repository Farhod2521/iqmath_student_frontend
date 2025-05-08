import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import LanguageDropdown from '@/components/language'
import { signOut, useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useSettingsStore, useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'

const Navbar = ({ handleTab = () => {}, tab = '' }) => {
  const { data: session } = useSession()
  const [openProfile, setOpenProfile] = useState(false)
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const profileRef = useRef(null)
  const { t } = useTranslation()

  const titlePage = useSettingsStore((state) => state.titlePage)
  // const setTitlePage = useSettingsStore((state) => state.setTitlePage)

  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

  useEffect(() => {
    console.log('titlePage', titlePage)
  }, [titlePage])

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  // o'quvchini bali
  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  const handleProfile = () => {
    setOpenProfile(!openProfile)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
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
      <div className={'flex justify-between px-[24px] pt-[24px] pb-[16px]'}>
        <div className={'flex items-center gap-x-[24px] flex-1'}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <AiOutlineMenuFold size={24} /> : <AiOutlineMenuUnfold size={24} />}
          </button>

          <p className="text-[24px]  font-semibold text-black">{titlePage}sadfsad</p>

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

        <div className={' flex items-center gap-x-[16px]'}>
          <div
            onClick={() => router.push('/dashboard/student/coins')}
            className="flex gap-x-[8px] items-center py-[7px] cursor-pointer px-[12px] border border-[#E9E9E9] rounded-[12px]"
          >
            <Image src={'/icons/coins-logo.svg'} alt="coins-logo" width={26} height={26} />

            <p className="text-[19px] font-medium">{get(coins, 'data.score')} баллов</p>
          </div>

          <LanguageDropdown />

          <div className="scale-100 active:scale-110 transition-all duration-300 p-[6px] cursor-pointer">
            <Image src={'/icons/bell.svg'} alt="coins-logo" width={26} height={26} />
          </div>

          <button onClick={handleProfile}>
            <Image src={'/images/avatar.png'} alt={'user'} width={40} height={40} />
          </button>

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

export default Navbar
