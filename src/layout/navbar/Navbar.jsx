import { useRouter } from 'next/router'
import { useMyStudyStore, useSettingStore } from '@/store'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import NavbarTitle from './NavbarTitle'
import NavbarLangue from './NavbarLangue'
import NavbarPoints from './NavbarPoints'
import NavbarBell from './NavbarBell'
import NavbarProfile from './NavbarProfile'

const Navbar = () => {
  const router = useRouter()

  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

  const tab = useMyStudyStore((state) => state.tab)
  const handleTab = useMyStudyStore((state) => state.handleTab)

  return (
    <div className="border-b">
      <div className={'flex justify-between px-[24px] pt-[24px] pb-[16px]'}>
        <div className="flex items-center gap-x-[24px] flex-1">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <AiOutlineMenuFold size={24} /> : <AiOutlineMenuUnfold size={24} />}
          </button>
          <NavbarTitle />
          {router.pathname === '/dashboard/student/my-study' && (
            <div className="flex bg-[#F2F2F7] p-[4px] max-w-[223px] w-full rounded-[8px]">
              <button
                onClick={() => handleTab('active')}
                className={`py-[6px]  rounded-md text-[15px] font-medium   w-1/2 transition-all duration-300 capitalize ${
                  tab === 'active' ? 'bg-white text-black shadow-md' : 'text-[#5A6A85] hover:bg-[#ECF2FF]'
                }`}
              >
                Активные
              </button>

              <button
                onClick={() => handleTab('frozen')}
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
          <NavbarPoints />
          <NavbarLangue />
          <NavbarBell />
          <NavbarProfile />
        </div>
      </div>
    </div>
  )
}

export default Navbar
