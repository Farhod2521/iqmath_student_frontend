import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { HiBell } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'

const NavbarNotification = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()

  const { data: mentorRequests, isLoading } = useGetQuery({
    key: KEYS.mentorRequests,
    url: '/api/v1/func_teacher/my-notifications/',
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  const handleNotificationClick = () => {
    router.push('/dashboard/teacher/student-examples')
  }

  const unread_count = useMemo(() => {
    return mentorRequests?.data?.unread_count || 0
  }, [mentorRequests])

  return (
    <button
      onClick={handleNotificationClick}
      className="relative p-2 text-[#5d87ff] hover:text-[#4a6fd9] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2  focus:ring-[#5d87ff] focus:ring-opacity-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      // title={t('mentorRequests', 'Mentor murojaatlari')}
      disabled={isLoading}
    >
      <div className={unread_count > 0 ? 'animate-ring' : ''}>
        <HiBell className="w-8 h-8 transition-transform duration-300" />
      </div>
      {unread_count > 0 && (
        <>
          <span
            className="absolute -top-1 -right-1 bg-[#5d87ff] rounded-full p-1 animate-ping opacity-75"
            style={{ width: '24px', height: '24px' }}
          />

          <span className="absolute -top-1 -right-1 bg-[#5d87ff] text-white text-xs rounded-full min-w-[24px] h-6 px-1.5 shadow-lg flex items-center justify-center font-medium  animate-badge-appear border-2 border-white">
            {unread_count > 99 ? '99+' : unread_count}
          </span>
        </>
      )}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg">
          <div className="w-4 h-4 border-2 border-[#5d87ff] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  )
}

export default NavbarNotification
