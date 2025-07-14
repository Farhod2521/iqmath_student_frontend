import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SimpleLoader from '@/components/loader/simple-loader'
import MenuSection from '@/components/dashboard/menu-section'
import ProfileSection from '@/components/dashboard/profile-section'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { createMenuConfig } from '@/config/menuConfig'

const DashboardNav = () => {
  const { t } = useTranslation()
  const [tab, setTab] = useState('main')
  const { isTeacher, isLoading } = useRoleDetection()
  
  // Menu configuration
  const menuConfig = createMenuConfig(t)
  const currentConfig = isTeacher ? menuConfig.teacher : menuConfig.student

  const handleTab = (tab) => {
    setTab(tab)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <SimpleLoader />
      </div>
    )
  }

  return (
    <div>
      {/* LOGO SECTION */}
      <div className="py-[16px] px-[32px] border-b border-b-[#E9E9E9] dark:border-b-[#2A3447FF]">
        <div>
          <a className="flex gap-x-[4px] items-center" href="/">
            <img src="https://api.iqmath.uz/system/logo/logo.png" alt="brand" width="34" height="34" />
            <h1 className="font-normal text-[32px] font-bicubik text-black font-myriad dark:text-white">
              MATH
            </h1>
          </a>
        </div>
      </div>

      <div className="font-sf h-[calc(100vh-200px)]">
        {/* MAIN MENU SECTION */}
        <MenuSection
          title={t('main')}
          items={currentConfig.main}
          onTabChange={handleTab}
        />

        {/* PROFILE SECTION */}
        <ProfileSection
          menuItems={currentConfig.account}
          onTabChange={handleTab}
        />
      </div>
    </div>
  )
}

export default DashboardNav
