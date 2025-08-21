import SidebarTitle from '@/components/title/sidebar-title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

import { useUserStore } from '@/store'
import { getMenuItemClasses, getMenuItems, MenuType } from '../libs/menulist'

const SidebarMenu = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { user } = useUserStore()
  const [hasScrollbar, setHasScrollbar] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState({})

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

  const menuItems = getMenuItems(t).filter((item) => {
    if (item.key === 'recommended' && !user?.has_diagnost) return false
    return true
  })

  const toggleMenu = (key) => {
    setExpandedMenus(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isMenuExpanded = (key) => expandedMenus[key]

  return (
    <div className={`font-sf overflow-y-auto sidebar-menu mb-[16px] ${hasScrollbar ? 'pr-[32px]' : ''}`}>
      <ul className="space-y-[8px]">
        {menuItems
          .filter((item) => !item.roles || item.roles.includes(user?.role))
          .map(({ key, path, label, icon, disabled, type, children }, idx) => {
            if (type === MenuType.TITLE) {
              return <SidebarTitle key={key || idx}>{label}</SidebarTitle>
            }
            if (type === MenuType.GROUP) {
              return <div key={key || idx} className="border-t mb-2 pb-2" />
            }
            if (type === MenuType.LINK) {
              const isActive = router.pathname === path || router.pathname.endsWith(path)
              
              if (children) {
                const isExpanded = isMenuExpanded(key)
                const hasActiveChild = children.some(child => 
                  router.pathname === child.path || router.pathname.endsWith(child.path)
                )
                
                return (
                  <li key={key} className="my-[16px] mx-[24px]">
                    <div 
                      className={`${getMenuItemClasses(hasActiveChild, disabled)} cursor-pointer`}
                      onClick={() => toggleMenu(key)}
                    >
                      {icon}
                      <p className="flex-1">{label}</p>
                      <ChevronDownIcon 
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
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
                                  {child.icon}
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
