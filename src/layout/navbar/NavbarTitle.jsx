import { useSettingStore } from '@/store'
import React from 'react'

function NavbarTitle() {
  const titlePage = useSettingStore((state) => state.titlePage)

  return <p className="text-[24px]  font-semibold text-black">{titlePage}</p>
}

export default NavbarTitle
