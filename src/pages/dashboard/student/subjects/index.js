import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { config } from '@/config'
import SimpleModal from '@/components/modal/simple-modal'
import ContentLoader from '@/components/loader/content-loader'
import MainWrapper from '@/layout/MainWrapper'
import { Button } from '@heroui/react'

const Index = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone')

  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(!!phone)

  const {
    data: studentSubjects,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentSubjects,
    url: URLS.studentSubjects,
    headers: { Authorization: `Bearer ${session?.accessToken}` },
    enabled: !!session?.accessToken
  })

  const handleCopy = () => {
    const text = `Login: ${session?.login}\nPassword: ${session?.password}`
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(console.error)
  }

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false)
      router.push('/dashboard/student/diagnostics')
    }, 300)
  }

  if (isLoading || isFetching) return <ContentLoader />

  return (
    <MainWrapper title="Предметы">
      {showModal && phone && (
        <SimpleModal>
          <div className="flex justify-between px-4 py-4">
            <h3 className="text-[19px] font-semibold">{t('confidentiality')}</h3>
            <button onClick={closeModal}>
              <Image src="/icons/close.svg" alt="close" width={24} height={24} />
            </button>
          </div>

          <hr className="bg-[#E9E9E9] h-[1px]" />

          <div className="px-4 py-6">
            <h2 className="text-sm font-semibold mb-1">{t('userLoginandPassword')}</h2>
            <p className="text-sm font-medium text-[#7C8FAC] mb-2">
              {t('yourLogin')}: {session?.login}
            </p>
            <p className="text-sm font-medium text-[#7C8FAC] mb-4">
              {t('yourPassword')}: {session?.password}
            </p>
            <p className="text-xs font-medium text-[#7C8FAC]">{t('WantchangePassword')}</p>
          </div>

          <hr className="bg-[#E9E9E9] h-[1px]" />

          <div className="flex flex-col sm:flex-row justify-center gap-2 py-4">
            <button onClick={handleCopy} className="bg-[#5D87FF] text-white py-2 px-4 rounded w-full sm:w-auto">
              {copied ? t('copied') : t('copy')}
            </button>
          </div>
        </SimpleModal>
      )}

      <div className="flex flex-wrap gap-6">
        {studentSubjects.data.map((item, index) => {
          const imageUrl =
            i18n.language === 'uz'
              ? `${config.API_URL}${get(item, 'image_uz')}`
              : `${config.API_URL}${get(item, 'image_ru')}`

          const className = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')

          return (
            <div
              key={index}
              className="space-y-3 w-[200px] cursor-pointer group"
              onClick={() => router.push(`/dashboard/student/subjects/${get(item, 'id')}`)}
            >
              <div className="rounded-[12px]">
                <Image
                  src={imageUrl}
                  alt={className}
                  width={95}
                  height={124}
                  className="w-full object-contain shadow-lg transition-all duration-300 group-hover:-translate-y-3 group-hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] bg-white"
                />
              </div>
              <p className="text-[20px] font-medium text-center transition-all duration-300 group-hover:text-[#007AFF]">
                {className}
              </p>
            </div>
          )
        })}
      </div>
    </MainWrapper>
  )
}

export default Index
