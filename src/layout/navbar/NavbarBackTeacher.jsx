import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useUserStore } from '@/store/userStore'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'

function NavbarBackTeacher() {
  const router = useRouter()
  const { setRole } = useUserStore()
  const { data: session } = useSession()
  const { t } = useTranslation()

  const handleBackAsTeacher = () => {
    const oldToken = sessionStorage.getItem('old_token')

    if (oldToken) {
      // O'qituvchi tokenini tiklaymiz
      sessionStorage.setItem('access_token', oldToken)
      sessionStorage.removeItem('old_token')

      // User-store ni teacher qilib o'zgartiramiz
      const currentUser = JSON.parse(localStorage.getItem('user-store') || '{}')
      if (currentUser.user) {
        currentUser.user.role = 'teacher'
        localStorage.setItem('user-store', JSON.stringify(currentUser))
      }

      // Role'ni yangilash
      setRole('teacher')
    } else {
      // Agar old_token yo'q bo'lsa, NextAuth session'dan token'ni olishni sinab ko'ramiz
      if (session?.accessToken) {
        sessionStorage.setItem('access_token', session.accessToken)
      }
    }
    // O'qituvchi sahifasiga yo'naltiramiz
    router.push('/dashboard/teacher/pupils')
  }

  return (
    <Button
      radius="full"
      variant="bordered"
      onPress={handleBackAsTeacher}
      className="border-[#E9E9E9] py-0.5 px-1.5 min-[400px]:px-2 sm:px-3 rounded-md border shadow-sm min-w-7 min-[400px]:min-w-12 sm:min-w-20 h-7 min-[400px]:h-8 sm:h-9 flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-2"
    >
      <IoMdArrowRoundBack size={12} className="min-[400px]:size-3.5 sm:size-4" />
      <p className="text-xs min-[400px]:text-sm sm:text-md font-medium hidden min-[360px]:block">{t('backAdmin')}</p>
    </Button>
  )
}

export default NavbarBackTeacher
