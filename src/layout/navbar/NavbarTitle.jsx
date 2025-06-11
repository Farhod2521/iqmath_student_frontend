import { useSettingStore } from '@/store'
import React from 'react'

function NavbarTitle() {
  const titlePage = useSettingStore((state) => state.titlePage)

  return <p className=" max-[400px]:text-[16px] max-[640px]:text-[20px] text-[24px]  text-black">{titlePage}</p>
}

export default NavbarTitle
