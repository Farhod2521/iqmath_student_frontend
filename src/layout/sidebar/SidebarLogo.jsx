import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Brand from '@/components/brand'
import { useSettingStore } from '@/store'

function SidebarLogo() {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

  return (
    <div className="flex items-center justify-between gap-2 py-[16px] pl-[24px] pr-[16px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF]">
      <Brand />
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E9E9E9] text-[#5A6A85] transition hover:bg-gray-100"
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  )
}

export default SidebarLogo
