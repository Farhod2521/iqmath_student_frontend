import { useTranslation } from 'react-i18next'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import SidebarTitle from '@/components/title/sidebar-title'

const ProfileSection = ({ menuItems, onTabChange }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const handleLogout = async () => {
    await signOut({
      callbackUrl: 'https://iq.iq-math.uz'
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
    <div className="border-t">
      <SidebarTitle>{t('account')}</SidebarTitle>
      <div className="flex flex-col justify-between">
        <ul className="mt-[12px] space-y-[8px] px-[24px] mb-[24px]">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path

            return (
              <li
                key={item.key}
                onClick={() => {
                  onTabChange(item.key)
                  router.push(item.path)
                }}
                className="cursor-pointer"
              >
                <div
                  className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] active:scale-90 scale-100 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#5D87FF] text-white'
                      : 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:text-white dark:hover:bg-[#252B48] dark:text-white'
                  }`}
                >
                  {isActive ? item.activeIcon : item.icon}
                  <p className="text-[15px] font-medium">{item.label}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="border-t px-[24px] py-[24px] !text-white">
          <div
            className="p-[16px] rounded-[16px] bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(/images/bg-img.png)` }}
          >
            <h3 className="text-[13px] font-medium">{t('tariffPlan')}</h3>
            <p className="text-[24px] font-semibold my-[12px]">499,000 {t('sum')}</p>
            <p className="text-[15px] font-medium">
              {t('nextCharge')} <br /> 21 {t('mart')}
            </p>

            <button className="border border-[#D1D1D6] rounded-[8px] text-[15px] py-[9px] w-full mt-[24px]">
              {t('cancelContract')}
            </button>
          </div>
        </div>
        
        <button
          onClick={handleLogoutClick}
          className="text-black py-[9px] mx-[24px] text-[15px] bg-[#EDEDF2] mb-4 rounded-md transform duration-200"
        >
          {t('logout')}
        </button>
      </div>

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
    </div>
  )
}

export default ProfileSection 