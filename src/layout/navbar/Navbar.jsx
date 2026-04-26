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
      <div className="px-3 sm:px-6 lg:px-8 py-2">
        {/* 🔹 TOP ROW */}
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <AiOutlineMenuFold size={20} /> : <AiOutlineMenuUnfold size={20} />}
            </button>

            <p className="text-[16px] sm:text-[22px] lg:text-[24px] font-semibold truncate">{title}</p>

            {router.pathname === '/dashboard/student/my-study' && <NavbarStudy />}
          </div>

          {/*  RIGHT (<430px only) */}
          <div className="flex items-center gap-2 max-[430px]:flex md:hidden">
            <LanguageDropdown />
            <NavbarProfile />
          </div>

          {/*  RIGHT (>=430px desktop normal) */}
          <div className="hidden md:flex items-center gap-3">
            {oldToken && <NavbarBackTeacher />}

            <NavbarMathMenu />

            {currentRole === RolesList.STUDENT && (
              <>
                <NavbarSum />
                <NavbarCoins />
                <NavbarPoints />
              </>
            )}

            <LanguageDropdown />
            <NavbarProfile />
          </div>
        </div>

        {/* 🔹 BOTTOM ROW */}
        <div className="flex items-center justify-between mt-2">
          {/* LEFT */}
          <div className="flex items-center gap-2 max-[430px]:flex md:hidden">
            <NavbarMathMenu />

            {currentRole === RolesList.STUDENT && (
              <>
                <NavbarSum />
                <NavbarCoins />
                <NavbarPoints />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
