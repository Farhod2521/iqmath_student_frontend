import React from 'react'
import Navbar from './navbar/Navbar'
import { useSettingStore } from '@/store'

function Main({ children }) {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  return (
    <div
      className={`transition-all bg-slate-100 duration-300 flex-1 font-sf  ${
        isSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'
      }`}
    >
      <Navbar />
      <div className="p-8">{children}</div>
    </div>
  )
}

export default Main
