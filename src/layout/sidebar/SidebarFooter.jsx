import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'

import { logout } from '@/shared/utils/logout'

function SidebarFooter() {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const handleLogout = async () => {
    await logout('/')
  }

  // Function to handle showing the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true)
  }

  // Function to handle closing the modal
  const closeModal = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsExiting(false)
    }, 300) // Delay for the animation to complete
  }

  return (
    <div className="px-[24px] py-[16px] ">
      <button
        onClick={handleLogoutClick}
        className=" py-3 w-full border border-[#5d87ff] text-[15px] text-[#5d87ff] bg-[#EDEDF2] rounded-md transform hover:bg-[#5d87ff] hover:text-white transition-all duration-200"
      >
        {t('logout')}
      </button>

      {isModalOpen &&
        createPortal(
          <>
            {/* Modal Backdrop */}
            <div
              className={`fixed inset-0 w-full h-full bg-black transition-opacity z-[2000] duration-300 ${
                isExiting ? 'opacity-0' : 'opacity-40'
              }`}
              onClick={closeModal}
            ></div>

            {/* Modal Container */}
            <div
              className={`fixed inset-0 flex items-center justify-center z-[2000] p-4 transition-all duration-300 ${
                isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[500px]">
                <h2 className="mb-1 text-lg sm:text-xl font-semibold">{t('exitWeb')}</h2>
                <p className="text-sm sm:text-lg font-medium text-[#7C8FAC] mb-4">{t('exitWebDesc')}</p>
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
          </>,
          document.body // Ensure modal is outside Sidebar
        )}
    </div>
  )
}

export default SidebarFooter
