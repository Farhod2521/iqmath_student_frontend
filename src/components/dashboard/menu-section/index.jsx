import { useRouter } from 'next/router'
import SidebarTitle from '@/components/title/sidebar-title'

const MenuSection = ({ title, items, onTabChange }) => {
  const router = useRouter()

  return (
    <div>
      <SidebarTitle>{title}</SidebarTitle>
      <div className="flex flex-col justify-between">
        <ul className="my-[12px] space-y-[8px] px-[24px]">
          {items.map((item) => {
            const isActive = router.pathname.startsWith(item.path)

            return (
              <li
                key={item.key}
                onClick={() => {
                  onTabChange(item.key)
                  router.push(item.path)
                }}
                className="cursor-pointer"
              >
                <div
                  className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[8px] active:scale-90 scale-100 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#5D87FF] text-white'
                      : 'text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:text-white dark:hover:bg-[#252B48]'
                  }`}
                >
                  {isActive ? item.activeIcon : item.icon}
                  <p className="text-[15px] font-medium">{item.label}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MenuSection 