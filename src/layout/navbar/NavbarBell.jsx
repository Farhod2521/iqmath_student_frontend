import { Button } from '@heroui/react'
import Image from 'next/image'
import React from 'react'

function NavbarBell() {
  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      className="scale-100 active:scale-110 transition-all duration-300 p-[6px] cursor-pointer"
    >
      <Image src={'/icons/bell.svg'} alt="coins-logo" width={26} height={26} />
    </Button>
  )
}

export default NavbarBell
