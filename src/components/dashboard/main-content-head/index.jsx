import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
// import ThemeChanger from "../theme-switcher";
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import storage from '@/services/storage'
import { get, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import LanguageDropdown from '@/components/language'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { useRoleDetection } from '@/hooks'

const MainContentHead = ({ toggleSidebar, title, handleTab, tab }) => {
  const { data: session } = useSession()
  // const [tab, setTab] = useState("active");
  const [openProfile, setOpenProfile] = useState(false)
  const router = useRouter()
  const profileRef = useRef(null)
  const { t } = useTranslation()

  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken
  })

  // o'quvchini bali
  const { data: coins, isLoading: coinsLoading } = useGetQuery({
    key: KEYS.coins,
    url: URLS.coins,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
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

  return (
    <div className="border-b">
      <div className={'flex justify-between px-[24px] pt-[24px] pb-[16px]'}>
        <div className={'flex items-center gap-x-[24px] flex-1'}>
          <button onClick={toggleSidebar}>
            <Image src={'/icons/sidebar.svg'} alt={'sidebar'} width={24} height={24} />
          </button>

          <p className="text-[24px]  font-semibold text-black">{title}</p>

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
                onClick={() => router.push('/dashboard/student/profile')}
                className=" py-[8px] w-full bg-[#EDEDF2FF] text-black rounded-md hover:bg-[#dddddd] transform duration-200"
              >
                {t('profile')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainContentHead
