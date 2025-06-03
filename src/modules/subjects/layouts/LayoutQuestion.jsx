import LanguageDropdown from '@/components/language'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function LayoutQuestion({ children }) {
  const router = useRouter()
  const { id, chapterId, topicId } = router.query
  const { t } = useTranslation()

  return (
    <div className="font-sf">
      <div className="flex justify-between pl-6 pr-4 py-3 border-b border-gray-100 items-center">
        <div className="flex items-center gap-x-3">
          <h1 className="text-xl font-semibold">{t('theory')}</h1>
          <div className="w-px h-6 bg-gray-200"></div>
          <p className="text-base text-gray-600">{t('task')}</p>
        </div>
        <div className="flex items-center">
          <LanguageDropdown />
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <Button
            onPress={() => router.push(`/dashboard/student/subjects/${id}/${chapterId}/${topicId}`)}
            className="rounded"
            variant="light"
            isIconOnly
          >
            <Image src="/icons/close.svg" alt="close" width={24} height={24} />
          </Button>
        </div>
      </div>

      {children}
    </div>
  )
}

export default LayoutQuestion
