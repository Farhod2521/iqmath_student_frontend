import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Bell, Flame, Search } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { RolesList } from '../libs/menulist'
import NavbarSum from './NavbarSum'
import NavbarCoins from './NavbarCoins'
import NavbarPoints from './NavbarPoints'
import NavbarProfile from './NavbarProfile'
import LanguageDropdown from '@/components/language'

const STREAK_DAYS = 5 // TODO: static placeholder until the backend exposes a streak endpoint

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { data: session } = useSession()
  const { role: currentRole } = useRoleDetection()

  const { data: studentProfile } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    enabled: !!session?.accessToken
  })

  const fullName = get(studentProfile, 'data.full_name', '')
  const classNum = (
    (i18n.language === 'uz'
      ? get(studentProfile, 'data.class_name_uz', '')
      : get(studentProfile, 'data.class_name_ru', '')
    ).match(/\d+/) || []
  )[0]

  const isStudent = currentRole === RolesList.STUDENT

  return (
    <div className="border-b border-[#F0F0F0] bg-white px-3 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="shrink-0">
          <h1 className="text-lg font-bold text-[#191C1D] sm:text-xl">
            {t('studentHome.greeting', { name: fullName || t('studentHome.you') })} 👋
          </h1>
          {isStudent && (
            <p className="mt-0.5 text-xs text-[#8A8A8E] sm:text-sm">
              {t('studentHome.dailyGoal', { classNum: classNum || '', minutes: 15 })}
            </p>
          )}
        </div>

        <div className="relative order-last flex-1 sm:order-none sm:max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8E]" />
          <input
            type="text"
            placeholder={t('studentHome.searchPlaceholder')}
            className="w-full rounded-full border border-[#EDEDED] bg-[#F7F8FA] py-2.5 pl-10 pr-4 text-sm text-[#191C1D] outline-none placeholder:text-[#B0B0B0] focus:border-[#5D87FF]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {isStudent && (
            <>
              <div className="flex items-center gap-1.5 rounded-full bg-[#F7F8FA] py-1 pl-1.5 pr-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 sm:h-7 sm:w-7">
                  <Flame size={15} className="fill-[#F97316] text-[#F97316]" />
                </div>
                <span className="flex items-baseline gap-1 leading-none">
                  <span className="text-sm font-bold text-[#191C1D] sm:text-base">{STREAK_DAYS}</span>
                  <span className="text-xs font-medium text-[#8A8A8E]">{t('studentHome.streakUnit')}</span>
                </span>
              </div>

              <NavbarSum />
              <NavbarCoins />
              <NavbarPoints />
            </>
          )}

          <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F0F0F0] text-[#5A6A85] hover:bg-gray-50">
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          </button>

          <LanguageDropdown />

          <div className="relative shrink-0">
            <NavbarProfile />
            <span className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-[#F97316] px-1.5 py-[1px] text-[8px] font-bold text-white">
              {t('studentHome.proLabel')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
