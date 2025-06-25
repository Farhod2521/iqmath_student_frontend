import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Brand from '@/components/brand'

function SidebarLogo() {
  const router = useRouter()
  return (
    <div className="py-[16px] px-[32px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF] ">
     <Brand/>
    </div>
  )
}

export default SidebarLogo
