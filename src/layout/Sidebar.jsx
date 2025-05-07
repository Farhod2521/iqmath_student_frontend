import Brand from '@/components/brand'
import React, { useState } from 'react'
import SidebarMenu from './SidebarMenu'

function Sidebar({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
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
        <div className="p-[30px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF] ">
          <Brand />
        </div>
        <SidebarMenu />
      </div>
    </>
  )
}

export default Sidebar
