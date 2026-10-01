import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { Bell, Flame, Gem, Menu, Search } from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useRoleDetection } from '@/hooks/useRoleDetection'
import { useSettingStore } from '@/store'
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
  const setIsSidebarOpen = useSettingStore((state) => state.setIsSidebarOpen)

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
  const ROLE_LABEL_KEY = { teacher: 'tutor', tutor: 'tutor', parent: 'parent', student: 'student' }
  const roleLabel = t(ROLE_LABEL_KEY[currentRole] || 'student')

  return (
    <div className="border-b border-[#F0F0F0] bg-white px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 sm:gap-x-3 2xl:flex-nowrap 2xl:gap-x-5">
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F0F0F0] text-[#5A6A85] hover:bg-gray-50 lg:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0 flex-1">
          {isStudent ? (
            <>
              <h1 className="truncate text-[15px] font-bold leading-tight text-[#191C1D] sm:text-xl">
                {t('studentHome.greeting', { name: fullName || t('studentHome.you') })} 👋
              </h1>
              <p className="mt-0.5 truncate text-[11px] text-[#8A8A8E] sm:text-sm">
                {t('studentHome.dailyGoal', { classNum: classNum || '', minutes: 15 })}
              </p>
            </>
          ) : (
            fullName && (
              <div className="leading-tight sm:hidden">
                <p className="truncate text-sm font-bold text-[#191C1D]">{fullName}</p>
                <p className="truncate text-xs text-[#8A8A8E]">{roleLabel}</p>
              </div>
            )
          )}
        </div>

        {isStudent && (
          <div className="order-last grid w-full grid-cols-4 gap-1.5 sm:flex sm:w-auto sm:basis-full sm:flex-wrap sm:items-center sm:gap-2 2xl:order-none 2xl:basis-auto 2xl:shrink-0">
            <div className="flex min-w-0 items-center justify-center gap-1 rounded-full bg-[#F7F8FA] py-1 pl-1 pr-2 sm:gap-1.5 sm:pl-1.5 sm:pr-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 sm:h-7 sm:w-7">
                <Flame size={14} className="fill-[#F97316] text-[#F97316]" />
              </div>
              <span className="flex min-w-0 items-baseline gap-0.5 leading-none sm:gap-1">
                <span className="text-sm font-bold text-[#191C1D] sm:text-base">{STREAK_DAYS}</span>
                <span className="truncate text-[11px] font-medium text-[#8A8A8E] sm:text-xs">
                  {t('studentHome.streakUnit')}
                </span>
              </span>
            </div>

            <NavbarSum />
            <NavbarCoins />
            <NavbarPoints />
          </div>
        )}

        <div className="hidden w-64 shrink-0 md:block lg:w-72 2xl:w-80">
          <SearchInput t={t} />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F0F0F0] text-[#5A6A85] hover:bg-gray-50">
            <Bell size={16} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
          </button>

          <LanguageDropdown />

          {fullName && (
            <div className={`hidden max-w-[180px] text-right leading-tight ${isStudent ? '2xl:block' : 'sm:block'}`}>
              <p className="truncate text-sm font-bold text-[#191C1D]">{fullName}</p>
              <p className="text-xs text-[#8A8A8E]">{roleLabel}</p>
            </div>
          )}
          <div className="relative shrink-0">
            <NavbarProfile />
            {isStudent && (
              <span className="pointer-events-none absolute -bottom-1.5 left-1/2 z-[1001] flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-[#DCE2FF] bg-[#EEF1FF] px-1.5 py-[1px] text-[8px] font-bold leading-none text-[#5d87ff]">
                <Gem size={8} className="shrink-0" />
                {t('studentHome.proLabel')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchInput({ t }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8E]" />
      <input
        type="text"
        placeholder={t('studentHome.searchPlaceholder')}
        className="w-full rounded-full border border-[#EDEDED] bg-gradient-to-r from-[#EFF6FD] to-[#F0F6FE] py-2 pl-10 pr-16 text-sm text-[#191C1D] outline-none placeholder:text-[#B0B0B0] focus:border-[#5D87FF]"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-[#E5E5E5] bg-white px-1.5 py-0.5 text-[10px] font-semibold text-[#B0B0B0]">
        Ctrl K
      </span>
    </div>
  )
}

export default Navbar
