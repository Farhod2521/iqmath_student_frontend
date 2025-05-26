import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { config } from '@/config'
import SimpleModal from '@/components/modal/simple-modal'
import ContentLoader from '@/components/loader/content-loader'
import MainWrapper from '@/layout/MainWrapper'
import { Card, CardFooter, Image } from '@heroui/react'
import { FaLock } from 'react-icons/fa'
import { request } from '@/services/api'
import { FaSpinner } from 'react-icons/fa6'

const Index = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone')

  const [copied, setCopied] = useState(false)
  const [showModal, setShowModal] = useState(true)

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
    setShowModal(false)
    router.push('/dashboard/student/diagnostics')
  }

  const subjectsData = useMemo(() => {
    const types = !studentSubjects
      ? []
      : [...new Set([...studentSubjects?.data?.map((i) => (i18n.language === 'uz' ? i.name_uz : i.name_ru))])]

    const listData = types.map((i) => ({
      type: i,
      data: studentSubjects.data.filter((j) => j.name_uz === i || j.name_ru === i)
    }))
    return listData || []
  }, [studentSubjects, i18n.language])

  const [isPlaymentLoadinng, setIsPaymetLoading] = useState(false)
  const handleInitiatePayment = () => {
    setIsPaymetLoading(true)
    request
      .get('/api/v1/payments/initiate-payment/')
      .then((res) => {
        window.open(res.data.data.checkout_url, '_blank')
      })
      .finally(() => setIsPaymetLoading(false))
  }

  if (isLoading || isFetching) return <ContentLoader />

  return (
    <MainWrapper title={t('subjects')}>
      {phone && showModal && (
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

      <div className="mt-[28px]">
        {subjectsData.map((subject, idx) => (
          <div key={idx}>
            {/* <h2 className="font-bold mb-8 text-[20px]">{subject.type}</h2> */}
            <div className="flex flex-wrap gap-4 mb-4">
              {subject.data?.map((item, index) => {
                const imageUrl =
                  i18n.language === 'uz'
                    ? `${config.API_URL}${get(item, 'image_uz')}`
                    : `${config.API_URL}${get(item, 'image_ru')}`

                const classAll = i18n.language === 'uz' ? get(item, 'class_uz') : get(item, 'class_ru')

                if (item.is_open) {
                  return (
                    <div key={index} onClick={() => router.push(`/dashboard/student/subjects/${get(item, 'id')}`)}>
                      <Card className={`border-none cursor-pointer h-[280px]  w-[200px]`} radius="sm">
                        <Image alt={classAll} className="object-cover" src={imageUrl} width={240} />
                        <div
                          style={{
                            backgroundColor: '#5d87ff'
                          }}
                          className="justify-center text-white py-3 text-center background-[#5d87ff] border-none overflow-hidden rounded-sm  absolute before:rounded-xl bottom-0 w-full shadow-none z-10"
                        >
                          {classAll}
                        </div>
                      </Card>
                    </div>
                  )
                } else {
                  return (
                    <Card
                      isFooterBlurred
                      key={index}
                      className={`border-none cursor-pointer h-[280px] w-[200px] shadow-sm`}
                      radius="sm"
                    >
                      <Image alt={classAll} className="object-cover" src={imageUrl} width={240} />
                      <div className="absolute z-20 bottom-4 text-black/20 w-full flex justify-center">{classAll}</div>
                      <CardFooter
                        onClick={handleInitiatePayment}
                        className="absolute bg-white/10 h-full  bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100"
                      >
                        <div className="flex items-center justify-center w-full hover:scale-110">
                          {isPlaymentLoadinng ? (
                            <FaSpinner size={40} className="text-black/40" />
                          ) : (
                            <FaLock size={40} className="text-black/40" />
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  )
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </MainWrapper>
  )
}

export default Index
