import RightIcon from '@/components/icons/right'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

function SubjectBreadcrumbs() {
  const { t } = useTranslation()
  const router = useRouter()
  const { id } = router.query

  return (
    <section className="flex items-center space-x-[12px]">
      <button onClick={() => router.back()} className="text-[#262D33] text-xs  md:text-sm font-semibold">
        <div className="bg-[#9AA8BC] rounded-full p-[5px] rotate-180">
          <RightIcon color="white" />
        </div>
      </button>
      <Link href={'/'} className="text-[#262D33] text-xs md:text-sm font-semibold">
        {t('homePage')}
      </Link>
      <RightIcon color="#BCBFC2" />
      <Link className="text-[#0256BA] text-xs md:text-sm font-semibold" href={'/dashboard/teacher/subjects'}>
        {t('subjects')}
      </Link>
      <RightIcon color="#BCBFC2" />
      <Link className="text-[#0256BA] text-xs md:text-sm font-semibold" href={`/dashboard/teacher/subjects/${id}`}>
        Bob va mavzular
      </Link>
    </section>
  )
}

export default SubjectBreadcrumbs
