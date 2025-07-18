import React from 'react'
import Navbar from './navbar/Navbar'
import { useSettingStore } from '@/store'

function Main({ children, title }) {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  return (
    <div
      className={`transition-all bg-white duration-300 flex-1 font-sf  ${isSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'}`}
    >
      <Navbar title={title} />
      <div className="p-4 md:p-8">{children}</div>
    </div>
  )
}

export default Main
