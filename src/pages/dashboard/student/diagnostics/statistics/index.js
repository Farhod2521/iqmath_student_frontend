import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useGetQuery } from '@/hooks'
import { get } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from '@heroui/react'
import LayoutAdmin from '@/layout/LayoutAdmin'
import HeaderTitle from '@/components/header-title'

const Index = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const { data: levelStatistics } = useGetQuery({
    key: KEYS.levelStatistics,
    url: URLS.levelStatistics,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken
  })

  return (
    <LayoutAdmin>
      <HeaderTitle title={t('diagnostics')} />
      <div className="grid grid-cols-12 gap-[24px] rounded-[12px]">
        <div className="col-span-8 rounded-[12px]">
          <div className="space-y-[12px]">
            {get(levelStatistics, 'data', []).map((item, index) => (
              <div
                key={index}
                className="border border-[#E9E9E9] py-[12px] px-[24px] rounded-[12px] bg-white flex justify-between items-center"
              >
                <div className="w-1/3">
                  <p className="text-[17px] font-medium">
                    {get(item, 'level')} - {t('degree')}
                  </p>
                </div>

                <div className="w-1/3 flex items-center gap-x-[10px]">
                  <div className="w-[80px] bg-gray-200 rounded-full h-[12px] overflow-hidden">
                    <div
                      className="bg-[#FF9500] h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${get(item, 'score') === null || get(item, 'score') === undefined ? 0 : get(item, 'score', 0)}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-[17px] font-medium text-gray-700">
                    {get(item, 'score') === null || get(item, 'score') === undefined ? 0 : get(item, 'score', 0)}%
                  </p>
                </div>

                <div className="w-1/3 flex justify-end">
                  {get(item, 'message', '') ? (
                    <Button
                      isDisabled={get(item, 'level') != '1'}
                      onPress={() => {
                        router.push('/dashboard/student/diagnostics')
                      }}
                      className="py-[9px] px-[33px] bg-[#EDEDF2] hover:bg-[#c0c0c0] rounded-[8px] transition-all duration-300"
                    >
                      {t('begin')}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-x-[17px]">
                      <Button
                        onPress={() => {
                          router.push('/dashboard/student/diagnostics')
                        }}
                        className="py-[9px] px-[13px] bg-[#5D87FF] text-white rounded-[8px]"
                      >
                        {t('continueTest')}
                      </Button>
                      <Button
                        isIconOnly
                        onPress={() => {
                          router.push('/dashboard/student/diagnostics')
                        }}
                        className="rotate-0 hover:rotate-90 transition-all duration-200"
                      >
                        <Image src={'/icons/refresh.svg'} alt="refresh" width={24} height={24} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
