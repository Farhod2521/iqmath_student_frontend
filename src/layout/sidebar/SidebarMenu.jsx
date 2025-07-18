import SidebarTitle from '@/components/title/sidebar-title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { useUserStore } from '@/store'
import { getMenuItemClasses, getMenuItems, MenuType } from '../libs/menulist'

const SidebarMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { user } = useUserStore()

  // Menu itemlarni filterlab olamiz
  const menuItems = getMenuItems(t).filter((item) => {
    // "recommended" itemi faqat user.has_diagnost true bo‘lsa chiqadi
    if (item.key === 'recommended' && !user?.has_diagnost) return false
    return true
  })

  return (
    <div className="font-sf min-h-[calc(100vh-450px)]">
      <ul className="space-y-[8px]">
        {menuItems
          .filter((item) => !item.roles || item.roles.includes(user?.role))
          .map(({ key, path, label, icon, disabled, type }, idx) => {
            if (type === MenuType.TITLE) {
              return <SidebarTitle key={key || idx}>{label}</SidebarTitle>
            }
            if (type === MenuType.GROUP) {
              return <div key={key || idx} className="border-t mt-2 pb-2" />
            }
            if (type === MenuType.LINK) {
              const isActive = router.pathname === path || router.pathname.endsWith(path)
              return (
                <li key={key} className="cursor-pointer my-[16px] mx-[24px]">
                  <Link href={disabled ? '#' : path}>
                    <div className={getMenuItemClasses(isActive, disabled)}>
                      {icon}
                      <p>{label}</p>
                    </div>
                  </Link>
                </li>
              )
            }
            return null
          })}
      </ul>
    </div>
  )
}

export default SidebarMenu
