import SidebarTitle from '@/components/title/sidebar-title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { useUserStore } from '@/store'
import { getMenuItemClasses, getMenuItems, MenuType } from '../libs/menulist'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useSidebarCount } from '@/hooks'

const HIDDEN_MENU_KEYS_WHEN_INACTIVE = [
  'diagnostics-history',
  'chat',
  'ratings',
  'tutor-referrals',
  'cupon-users',
  'cupon-list'
]

const SidebarMenu = () => {
  const { t } = useTranslation()
  const { data } = useSidebarCount()
  const router = useRouter()
  const { user, role: userRole } = useUserStore()
  const { role } = useRoleDetection()
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})

  const chat_read_count = data?.data?.total_unread_messages

  useEffect(() => {
    const checkScrollbar = () => {
      const menuContainer = document.querySelector('.sidebar-menu')
      if (menuContainer) {
        setHasScrollbar(menuContainer.scrollHeight > menuContainer.clientHeight)
      }
    }

    checkScrollbar()
    window.addEventListener('resize', checkScrollbar)
    return () => window.removeEventListener('resize', checkScrollbar)
  }, [])

  const menuItems = getMenuItems(t)
    .filter((item) => {
      if (item.key === 'recommended' && !user?.has_diagnost) return false
      if (role && item.roles && Array.isArray(item.roles)) {
        return item.roles.includes(userRole)
      }
      return true
    })
    .filter((item) => {
      // user.status false bo'lsa ayrim menularni yashiramiz
      if (user?.status === false && HIDDEN_MENU_KEYS_WHEN_INACTIVE.includes(item.key)) {
        return false
      }
      return true
    })

  const toggleMenu = (key) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isMenuExpanded = (key) => expandedMenus[key]

  return (
    <div className={`font-sf overflow-y-auto sidebar-menu mb-[16px] h-full ${hasScrollbar ? 'pr-[32px]' : ''}`}>
      <ul className="space-y-[12px] px-[24px]">
        {menuItems
          .filter((item) => !item.roles || item.roles.includes(userRole))
          .map(({ key, path, label, icon, disabled, type, children, activePatterns }, idx) => {
            if (type === MenuType.TITLE) {
              return <SidebarTitle key={key || idx}>{label}</SidebarTitle>
            }
            if (type === MenuType.GROUP) {
              return <div key={key || idx} className="my-3 border-t border-gray-200" />
            }
            if (type === MenuType.LINK) {
              // Check if current path matches any active patterns
              let isActive = router.pathname === path || router.pathname.endsWith(path)
              if (activePatterns && activePatterns.length > 0) {
                isActive = isActive || activePatterns?.some((pattern) => router.pathname.startsWith(pattern))
              }

              if (children) {
                const isExpanded = isMenuExpanded(key)
                const hasActiveChild = children?.some(
                  (child) => router.pathname === child.path || router.pathname.endsWith(child.path)
                )

                return (
                  <li key={key}>
                    <div
                      className={`${getMenuItemClasses(hasActiveChild, disabled)} cursor-pointer`}
                      onClick={() => toggleMenu(key)}
                    >
                      {typeof icon === 'function' ? icon(hasActiveChild) : icon}
                      <p className="flex-1">{label}</p>
                      <ChevronDownIcon
                        className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>

                    {isExpanded && (
                      <ul className="mt-2 ml-6 space-y-1">
                        {children.map((child) => {
                          const isChildActive = router.pathname === child.path || router.pathname.endsWith(child.path)
                          return (
                            <li key={child.key}>
                              <Link href={child.path}>
                                <div className={getMenuItemClasses(isChildActive, false)}>
                                  {typeof child.icon === 'function' ? child.icon(isChildActive) : child.icon}
                                  <p className="text-sm">{child.label}</p>
                                </div>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={key} className="cursor-pointer">
                  <Link href={disabled ? '#' : path}>
                    <div className={getMenuItemClasses(isActive, disabled)}>
                      {typeof icon === 'function' ? icon(isActive) : icon}
                      <p>{label}</p>
                      {key === 'chat' && chat_read_count > 0 && (
                        <span
                          className={`ml-auto min-w-[20px] h-[20px] px-1 text-xs flex items-center justify-center rounded-full  ${
                            isActive ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'
                          } font-medium`}
                        >
                          {chat_read_count}
                        </span>
                      )}
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
