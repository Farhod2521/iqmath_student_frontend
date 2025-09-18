import React, { useState, useEffect } from 'react'
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
  const [unreadCount, setUnreadCount] = useState(0)

  // Ochilmagan murojaatlarni olish
//   const { data: mentorRequests } = useGetQuery({
//     key: KEYS.mentorRequests,
//     url: '/api/v1/func_teacher/teacher-independent/list/',
//     headers: { Authorization: `Bearer ${session?.accessToken}` },
//     enabled: !!session?.accessToken
//   })

//   // Ochilmagan habarlar sonini hisoblash
//   useEffect(() => {
//     if (mentorRequests?.data?.results) {
//       const unread = mentorRequests.data.results.reduce((count, student) => {
//         return count + student.requests.filter(request => request.status === 'pending').length
//       }, 0)
//       setUnreadCount(unread)
//     }
//   }, [mentorRequests])

  const handleNotificationClick = () => {
    router.push('/dashboard/teacher/student-examples')
  }

  return (
    <button
      onClick={handleNotificationClick}
      className="relative p-2 text-[#5d87ff] hover:text-[#5d87ff] transition-colors duration-200"
      title={t('mentorRequests', 'Mentor murojaatlari')}
    >
      <HiBell className="w-6 h-6" />
      {/* {unreadCount > 0 && ( */}
        <span className="absolute -top-1 -right-1 bg-[#5d87ff] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {/* {unreadCount > 99 ? '99+' : unreadCount} */}10
        </span>
      {/* )} */}
    </button>
  )
}

export default NavbarNotification
