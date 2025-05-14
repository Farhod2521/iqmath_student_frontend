import { useRouter } from 'next/router'
import { useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import NavbarTitle from './NavbarTitle'
import NavbarLangue from './NavbarLangue'
import NavbarPoints from './NavbarPoints'
import NavbarBell from './NavbarBell'
import NavbarProfile from './NavbarProfile'
import NavbarStudy from './NavbarStudy'

const Navbar = () => {
  const router = useRouter()

  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

  return (
    <div className="border-b bg-white">
      <div className={'flex justify-between px-[24px] pt-[24px] pb-[16px]'}>
        <div className="flex items-center gap-x-[24px] flex-1">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <AiOutlineMenuFold size={24} /> : <AiOutlineMenuUnfold size={24} />}
          </button>
          <NavbarTitle />
          {router.pathname === '/dashboard/student/my-study' && <NavbarStudy />}
        </div>

        <div className={' flex items-center gap-x-[16px]'}>
          <NavbarPoints />
          <NavbarLangue />
          {/* <NavbarBell /> */}
          <NavbarProfile />
        </div>
      </div>
    </div>
  )
}

export default Navbar
