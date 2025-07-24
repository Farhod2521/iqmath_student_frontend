import { Button } from '@heroui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'

function NavbarBackTeacher() {
  const router = useRouter()

  const handleBackAsTeacher = () => {
    const oldToken = sessionStorage.getItem('old_token');
    if (oldToken) {
      // O‘qituvchi tokenini tiklaymiz
      sessionStorage.setItem('access_token', oldToken);
      sessionStorage.removeItem('old_token');

      // User-store ni teacher qilib o‘zgartiramiz
      const currentUser = JSON.parse(localStorage.getItem('user-store') || '{}');
      if (currentUser.user) {
        currentUser.user.role = 'teacher';
        localStorage.setItem('user-store', JSON.stringify(currentUser));
      }
    }
    // O‘qituvchi sahifasiga yo‘naltiramiz
    router.push('/dashboard/teacher/pupils');
  }

  return (
    <Button
      radius="full"
      variant="bordered"
      onPress={handleBackAsTeacher}
      className="border-[#E9E9E9] py-1 px-2 sm:px-3 rounded-md border shadow-sm min-w-10 sm:min-w-20 h-8 sm:h-9 flex items-center gap-1 sm:gap-2"
    >
      <IoMdArrowRoundBack size={16} />
      <p className="text-sm sm:text-md font-medium hidden sm:block">Qaytish</p>
    </Button>
  )
}

export default NavbarBackTeacher
