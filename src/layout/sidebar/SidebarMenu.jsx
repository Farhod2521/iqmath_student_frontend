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
import { BiDirections } from 'react-icons/bi'
// ...imports

const SidebarMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const menuItems = [
    {
      key: 'main',
      path: '/dashboard/student/subjects',
      label: t('subjects'),
      icon: <LuBookText size={26} />,
      disabled: false
    },
    // {
    //   key: 'my-study',
    //   path: '/dashboard/student/my-study',
    //   label: t('myLearning'),
    //   icon: <PiBagSimple size={26} />,
    //   disabled: false
    // },
    // {
    //   key: 'individual',
    //   path: '/dashboard/student/individual',
    //   label: t('independent'),
    //   icon: <TbChecklist size={26} />,
    //   disabled: false
    // },
    {
      key: 'diagnostics',
      path: '/dashboard/student/diagnostics',
      label: t('diagnostics'),
      icon: <TbCheckbox size={26} />,
      disabled: false
    },
    {
      key: 'recommended',
      path: '/dashboard/student/diagnostics/recommended-topics',
      label: t('recommended'),
      icon: <BiDirections size={26} />,
      disabled: false
    }
  ]

  const menuItemsBottom = [
    {
      key: 'profile',
      path: '/dashboard/student/profile',
      label: t('profile'),
      icon: <LuUser size={26} />,
      disabled: false
    },
    // {
    //   key: 'chat',
    //   path: '/dashboard/student/chat',
    //   label: t('chat'),
    //   icon: <HiOutlineChatBubbleLeftRight size={26} />,
    //   disabled: true
    // },
    {
      key: 'coins',
      path: '/dashboard/student/coins',
      label: t('points'),
      icon: <FaCoins size={26} />
    }
    // {
    //   key: 'wallet',
    //   path: '/dashboard/student/wallet',
    //   label: t('wallet'),
    //   icon: <LuWalletMinimal size={26} />,
    //   disabled: true
    // }
  ]

  const renderMenuItem = (item, isActive) => {
    const baseClasses = `flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] transition-all duration-300 font-medium text-[15px]`

    const activeClasses = 'bg-[#5D87FF] text-white'
    const inactiveClasses =
      'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48] dark:text-white'
    const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none'

    const classes = `${baseClasses} ${item.disabled ? disabledClasses : isActive ? activeClasses : inactiveClasses}`

    return (
      <li key={item.key} className="cursor-pointer">
        <Link href={item.disabled ? '#' : item.path}>
          <div className={classes}>
            {item.icon}
            <p>{item.label}</p>
          </div>
        </Link>
      </li>
    )
  }

  return (
    <div className="font-sf min-h-[calc(100vh-450px)]">
      <div>
        <SidebarTitle>{t('main')}</SidebarTitle>
        <ul className="my-[12px] space-y-[8px] px-[24px]">
          {menuItems.map((item) => renderMenuItem(item, router.pathname.endsWith(item.path)))}
        </ul>
      </div>

      <div className="border-t">
        {/* <SidebarTitle>{t('account')}</SidebarTitle> */}
        <ul className="mt-[12px] space-y-[8px] px-[24px] mb-[24px]">
          {menuItemsBottom.map((item) => renderMenuItem(item, router.pathname === item.path))}
        </ul>
      </div>
    </div>
  )
}

export default SidebarMenu
