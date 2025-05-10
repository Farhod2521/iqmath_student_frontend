import { Button } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { FaBell } from 'react-icons/fa'

function NavbarBell() {
  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      className="scale-100 active:scale-110 transition-all duration-300 p-[6px] cursor-pointer"
    >
      <FaBell size={24} />
    </Button>
  )
}

export default NavbarBell
