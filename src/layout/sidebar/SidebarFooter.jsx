import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'

import { signOut } from 'next-auth/react'

function SidebarFooter() {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const handleLogout = async () => {
    await signOut({
      callbackUrl: 'https://iq.iq-math.uz' // Redirect to iq-math.uz after sign out
    })

    localStorage.clear()
    sessionStorage.clear()
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
    <div>
      <div className="w-full px-[24px] mb-6">
        <button
          onClick={handleLogoutClick}
          className=" text-black py-[9px] w-full text-[15px] bg-[#EDEDF2] rounded-md  transform duration-200"
        >
          {t('logout')}
        </button>
      </div>

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
