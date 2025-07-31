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
        transition-transform duration-300 z-50 w-[300px] flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <SidebarLogo />
          <SidebarMenu />
          <SidebarPlan />
        </div>
        
        {/* Fixed footer area */}
        <div className="flex-shrink-0 bg-white dark:bg-[#202936] border-t border-[#EAEFF4]">
          <SidebarFooter />
        </div>
      </div>
    </>
  )
}

export default Sidebar
