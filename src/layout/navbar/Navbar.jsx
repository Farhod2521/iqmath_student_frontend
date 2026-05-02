import { useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import NavbarPoints from './NavbarPoints'
import NavbarProfile from './NavbarProfile'
import NavbarCoins from './NavbarCoins'
import LanguageDropdown from '@/components/language'
import NavbarBackTeacher from './NavbarBackTeacher'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import NavbarSum from './NavbarSum'
import { RolesList } from '../libs/menulist'
import NavbarMathMenu from './NavbatMathMenu'

const Navbar = ({ title }) => {
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
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 hover:bg-gray-100 rounded-lg transition"
            >
              {isSidebarOpen ? <AiOutlineMenuFold size={18} /> : <AiOutlineMenuUnfold size={18} />}
            </button>
          </div>

          {/*  RIGHT (<475px only) */}
          <div className="flex items-center gap-2 max-[475px]:flex min-[475px]:hidden">
            <LanguageDropdown />
            <NavbarProfile />
          </div>

          {/*  RIGHT (>=475px desktop normal) */}
          <div className="hidden min-[475px]:flex items-center  gap-1">
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
        <div className="flex items-center justify-center mt-2">
          {/* LEFT */}
          <div className="flex items-center gap-2 max-[475px]:flex min-[475px]:hidden">
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
