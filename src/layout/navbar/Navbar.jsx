import { useRouter } from 'next/router'
import { useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import NavbarTitle from './NavbarTitle'
import NavbarLangue from './NavbarLangue'
import NavbarPoints from './NavbarPoints'
import NavbarProfile from './NavbarProfile'
import NavbarStudy from './NavbarStudy'
import NavbarCoins from './NavbarCoins'
import LanguageDropdown from '@/components/language'
import NavbarBackTeacher from './NavbarBackTeacher'
import { useRoleDetection } from '@/hooks/useRoleDetection'

const Navbar = ({ title }) => {
  const router = useRouter()
  const { role: currentRole } = useRoleDetection()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

  const oldToken = sessionStorage.getItem('old_token')

  return (
    <div className="border-b bg-white">
      <div className="flex flex-row justify-between px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex items-center gap-x-4 sm:gap-x-6 flex-1">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle sidebar">
            {isSidebarOpen ? <AiOutlineMenuFold size={20} /> : <AiOutlineMenuUnfold size={20} />}
          </button>
          <p className=" max-[400px]:text-[16px] max-[640px]:text-[20px] text-[24px] font-semibold  text-black">
            {title}
          </p>
          {router.pathname === '/dashboard/student/my-study' && <NavbarStudy />}
        </div>
        <div className="flex items-center gap-x-2 sm:gap-x-4 flex-wrap ">
          {oldToken && <NavbarBackTeacher />}

          {(currentRole !== 'teacher' && currentRole !== 'mentor') && (
            <>
              <NavbarCoins />
              <NavbarPoints />
            </>
          )}
          <LanguageDropdown />
          <NavbarProfile />
        </div>
      </div>
    </div>
  )
}

export default Navbar
