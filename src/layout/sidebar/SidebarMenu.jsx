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
import { useUserStore } from '@/store'
// ...imports

const SidebarMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const { user } = useUserStore()

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
      path: '/dashboard/student/recommendations',
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

  const getMenuItemClasses = (itemPath, disabled) => {
    const isActive = router.pathname === itemPath || router.pathname.endsWith(itemPath)

    const base = `flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] transition-all duration-300 font-medium text-[15px]`
    const active = `bg-[#5D87FF] text-white`
    const inactive = `text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48] dark:text-white`
    const disabledCls = `opacity-50 cursor-not-allowed pointer-events-none`

    return `${base} ${disabled ? disabledCls : isActive ? active : inactive}`
  }

  const renderMenu = (items) => (
    <ul className="space-y-[8px] px-[24px]">
      {items.map(({ key, path, label, icon, disabled }) => (
        <li key={key} className="cursor-pointer">
          <Link href={disabled ? '#' : path}>
            <div className={getMenuItemClasses(path, disabled)}>
              {icon}
              <p>{label}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  const filteredMenuItems = menuItems.filter((item) => {
    // Agar item key = 'recommended' bo'lsa, va user.has_diagnost true bo'lsa — uni ko'rsatmaymiz
    if (item.key === 'recommendations' && !user?.has_diagnost) {
      return false
    }
    return true
  })

  return (
    <div className="font-sf min-h-[calc(100vh-450px)]">
      <div>
        <SidebarTitle>{t('main')}</SidebarTitle>
        <div className="my-[12px]">{renderMenu(filteredMenuItems)}</div>
      </div>
      <div className="border-t mt-[16px] pt-[12px] mb-[24px]">{renderMenu(menuItemsBottom)}</div>
    </div>
  )
}

export default SidebarMenu
