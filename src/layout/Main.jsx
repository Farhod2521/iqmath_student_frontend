import Navbar from './navbar/Navbar'
import { useSettingStore } from '@/store'

function Main({ children, title }) {
  const isSidebarOpen = useSettingStore((state) => state.isSidebarOpen)

  return (
    <div
      className={`flex flex-col flex-1 min-h-0 bg-white font-sf  transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-[300px]' : 'lg:ml-0'
      }`}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-40 flex-shrink-0 bg-white">
        <Navbar title={title} />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6 xl:p-8 [webkit-overflow-scrolling:touch] relative">{children}</div>
    </div>
  )
}

export default Main
