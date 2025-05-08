import React from 'react'

import { useSettingStore } from '@/store'
import SidebarMenu from './SidebarMenu'
import SidebarLogo from './SidebarLogo'
import SidebarPlan from './SidebarPlan'
import SidebarFooter from './SidebarFooter'

function Sidebar() {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div
        className={`fixed left-0 top-0 h-full bg-white dark:bg-[#202936] border-r border-[#EAEFF4] dark:border-[#2A3447FF] 
        transition-transform duration-300 z-50 w-[350px] overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarLogo />
        <SidebarMenu />
        <SidebarPlan />
        <SidebarFooter />
      </div>
    </>
  )
}

export default Sidebar
