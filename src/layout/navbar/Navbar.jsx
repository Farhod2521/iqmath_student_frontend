import { useRouter } from 'next/router'
import { useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import NavbarPoints from './NavbarPoints'
import NavbarProfile from './NavbarProfile'
import NavbarStudy from './NavbarStudy'
import NavbarCoins from './NavbarCoins'
import LanguageDropdown from '@/components/language'
import NavbarBackTeacher from './NavbarBackTeacher'
import NavbarNotification from './NavbarNotification'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import NavbarSum from './NavbarSum'
import { RolesList } from '../libs/menulist'
import NavbarMultiplication from './NavbarMultiplication'
import NavbarMathMenu from './NavbatMathMenu'

const Navbar = ({ title }) => {
  const router = useRouter()
  const { role: currentRole } = useRoleDetection()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const oldToken = sessionStorage.getItem('old_token')

  return (
    <div className="bg-white border-b">
      <div className="flex flex-wrap justify-between px-3 pt-3 pb-2 sm:px-6 lg:px-8 gap-y-2">
        {/* Left */}
        <div className="flex items-center flex-1 gap-x-3 sm:gap-x-6">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
            {isSidebarOpen ? <AiOutlineMenuFold size={20} /> : <AiOutlineMenuUnfold size={20} />}
          </button>

          <p className="max-[400px]:text-[16px] max-[640px]:text-[20px] text-[24px] font-semibold text-black">
            {title}
          </p>

          {router.pathname === '/dashboard/student/my-study' && <NavbarStudy />}
        </div>

        {/* Right Side */}
        <div className="flex flex-wrap items-center justify-end gap-x-1 md:gap-x-2 sm:gap-x-4">
          {oldToken && <NavbarBackTeacher />}

          {currentRole === RolesList.STUDENT && (
            <>
              {/* <NavbarMultiplication /> */}
              <NavbarMathMenu />
              <NavbarSum />
              <NavbarCoins />
              <NavbarPoints />
            </>
          )}

          {currentRole === 'teacher' && (
            <div className="mr-2">
              <NavbarNotification />
            </div>
          )}

          <LanguageDropdown />

          <NavbarProfile />
        </div>
      </div>
    </div>
  )
}

export default Navbar
