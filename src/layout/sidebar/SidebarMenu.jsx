import SidebarTitle from '@/components/title/sidebar-title'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { LuBookText } from 'react-icons/lu'
import { PiBagSimple } from 'react-icons/pi'
import { TbChecklist } from 'react-icons/tb'
import { TbCheckbox } from 'react-icons/tb'
import { LuUser } from 'react-icons/lu'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { FaCoins } from 'react-icons/fa6'
import { LuWalletMinimal } from 'react-icons/lu'

const SidebarMenu = () => {
  const { t } = useTranslation()

  const router = useRouter()

  const menuItems = [
    {
      key: 'main',
      path: '/dashboard/student/subjects',
      label: t('subjects'),
      icon: <LuBookText size={26} />
    },
    {
      key: 'my-study',
      path: '/dashboard/student/my-study',
      label: t('myLearning'),
      icon: <PiBagSimple size={26} />
    },
    {
      key: 'individual',
      path: '/dashboard/student/individual',
      label: t('independent'),
      icon: <TbChecklist size={26} />
    },
    {
      key: 'diagnostics',
      path: '/dashboard/student/diagnostics/statistics',
      label: t('diagnostics'),
      icon: <TbCheckbox size={26} />
    }
  ]

  const menuItemsBottom = [
    {
      key: 'profile',
      path: '/dashboard/student/profile',
      label: t('profile'),
      icon: <LuUser size={26} />
    },
    {
      key: 'chat',
      path: '/dashboard/student/chat',
      label: t('chat'),
      icon: <HiOutlineChatBubbleLeftRight size={26} />
    },
    {
      key: 'coins',
      path: '/dashboard/student/coins',
      label: t('points'),
      icon: <FaCoins size={26} />
    },
    {
      key: 'wallet',
      path: '/dashboard/student/wallet',
      label: t('wallet'),
      icon: <LuWalletMinimal size={26} />
    }
  ]

  return (
    <div className="font-sf min-h-[calc(100vh-450px)]">
      <div className="">
        <SidebarTitle>{t('main')}</SidebarTitle>
        <div className="  flex flex-col  justify-between">
          <ul className="my-[12px] space-y-[8px] px-[24px]">
            {menuItems.map((item) => {
              const isActive = router.pathname.startsWith(item.path)

              return (
                <li key={item.key} className="cursor-pointer">
                  <Link href={item.path}>
                    <div
                      className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] active:scale-90 scale-100 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#5D87FF] text-white'
                          : 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:text-white dark:hover:bg-[#252B48]'
                      }`}
                    >
                      {item.icon}
                      <p className="text-[15px] font-medium">{item.label}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t ">
        <SidebarTitle>{t('account')}</SidebarTitle>
        <div className="flex flex-col justify-between ">
          <ul className="mt-[12px] space-y-[8px] px-[24px] mb-[24px]">
            {menuItemsBottom.map((item) => {
              const isActive = router.pathname === item.path

              return (
                <li key={item.key} className="cursor-pointer">
                  <Link href={item.path}>
                    <div
                      className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] active:scale-90 scale-100 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#5D87FF] text-white'
                          : 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48] dark:text-white'
                      }`}
                    >
                      {item.icon}
                      <p className="text-[15px] font-medium">{item.label}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu
