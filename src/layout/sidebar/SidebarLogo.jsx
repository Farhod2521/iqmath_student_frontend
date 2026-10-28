import React, { useMemo } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Brand from '@/components/brand'
import { useSettingStore, useUserStore } from '@/store'
import { getMenuItems, MenuType } from '../libs/menulist'

function SidebarLogo() {
  const { t } = useTranslation()
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)
  const { role } = useUserStore()

  // Kabinet ichida logotip — rolning birinchi menyu sahifasiga (o'quvchi: "Главная"), sayt landingiga emas
  const homeHref = useMemo(() => {
    const first = getMenuItems(t).find(
      (item) => item?.type !== MenuType.TITLE && item?.path && (!item.roles || item.roles.includes(role))
    )
    return first?.path || '/'
  }, [t, role])

  return (
    <div className="flex items-center justify-between gap-2 py-[16px] pl-[24px] pr-[16px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF]">
      <Brand href={homeHref} />
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
