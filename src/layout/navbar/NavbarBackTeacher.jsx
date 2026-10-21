import { Button } from '@heroui/react'
import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useTranslation } from 'react-i18next'
import { exitImpersonation } from '@/components/ImpersonationBar'

function NavbarBackTeacher() {
  const { t } = useTranslation()

  return (
    <Button
      radius="full"
      variant="bordered"
      onPress={exitImpersonation}
      className="border-[#E9E9E9] py-0.5 px-1.5 min-[400px]:px-2 sm:px-3 rounded-md border shadow-sm min-w-7 min-[400px]:min-w-12 sm:min-w-20 h-7 min-[400px]:h-8 sm:h-9 flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-2"
    >
      <IoMdArrowRoundBack size={12} className="min-[400px]:size-3.5 sm:size-4" />
      <p className="text-xs min-[400px]:text-sm sm:text-md font-medium hidden min-[360px]:block">{t('backAdmin')}</p>
    </Button>
  )
}

export default NavbarBackTeacher
