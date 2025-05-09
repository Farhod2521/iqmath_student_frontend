import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

function SidebarLogo() {
  const router = useRouter()
  return (
    <div className="py-[16px] px-[32px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF] ">
      <div className={'  '}>
        <Link href={'/'} className="flex gap-x-[16px] items-center">
          <Image src={'/icons/brand.svg'} alt="brand" width={34} height={34} />
          <h1
            className={` font-normal text-[32px] font-bicubik text-black font-myriad   ${
              router.pathname === '/' ? 'dark:text-[#3965c6]' : 'dark:text-white'
            }`}
          >
            IQmath
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default SidebarLogo
