import React from 'react'
import Navbar from './navbar/Navbar'
import { useSettingStore } from '@/store'

function Main({ children, title }) {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)

  return (
    <div
      className={`flex flex-col flex-1 min-h-0 bg-white font-sf transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'
      }`}
    >
      {/* Navbar */}
      <div className="flex-shrink-0">
        <Navbar title={title} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 [webkit-overflow-scrolling:touch]">{children}</div>
    </div>
  )
}

export default Main
