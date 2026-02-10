import ProgressCard from '@/card/progress-card'
import ProfileDetails from '@/components/profile-details'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { Avatar, AvatarIcon, Button, Card } from '@heroui/react'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'

const Index = () => {
  const { data: session } = useSession()
  const { t, i18n } = useTranslation()
  const {
    data: studentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    // headers: {
    //   Authorization: `Bearer ${session?.accessToken}`
    // },
    enabled: !!session?.accessToken
  })
  const router = useRouter()

  return (
    <LayoutAdmin title={t('profile')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 lg:gap-x-[24px]">
        <Card className="col-span-12 sm:col-span-8 md:col-span-5 border p-4 border-[#E9E9E9] rounded-[12px]">
          <div className="flex justify-center items-center flex-col  p-[20px]">
            <Avatar size="lg" className="" icon={<AvatarIcon />} />
            <h3 className="text-[17px] font-semibold mt-[16px] mb-[6px]">
              {get(studentProfile, 'data.full_name', '')}
            </h3>
            <p className="text-[#8A8A8E] text-[15px]">ID: {get(studentProfile, 'data.identification', '')}</p>
          </div>

          <div className="border-t border-t-[#E9E9E9]">
            <div className="p-[20px]">
              <ul>
                <li>
                  <ProfileDetails
                    detailIcon={'phone'}
                    title={t('phone number')}
                    desc={`+${get(studentProfile, 'data.phone', '')}`}
                  />
                </li>
                {get(studentProfile, 'data.email', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'email'}
                      title={'Email адрес'}
                      desc={get(studentProfile, 'data.email', '')}
                    />
                  </li>
                )}
                {get(studentProfile, 'data.brithday', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'calendar'}
                      title={'Дата рождения'}
                      desc={get(studentProfile, 'data.brithday', '')}
                    />
                  </li>
                )}
                {get(studentProfile, 'data.region', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'region'}
                      title={'Регион'}
                      desc={get(studentProfile, 'data.region', '')}
                    />
                  </li>
                )}

                {get(studentProfile, 'data.districts', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'region'}
                      title={'Область'}
                      desc={get(studentProfile, 'data.districts', '')}
                    />
                  </li>
                )}

                {get(studentProfile, 'data.address', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'address'}
                      title={'Адрес'}
                      desc={get(studentProfile, 'data.address', '')}
                    />
                  </li>
                )}
                {get(studentProfile, 'data.academy_or_school_name', '') && (
                  <li>
                    <ProfileDetails
                      detailIcon={'education'}
                      title={'Учреждение'}
                      desc={`${get(studentProfile, 'data.academy_or_school_name', '')}`}
                    />
                  </li>
                )}
                {(get(studentProfile, 'data.class_name_uz', '') || get(studentProfile, 'data.class_name_ru', '')) && (
                  <li>
                    <ProfileDetails
                      detailIcon={'course'}
                      title={t('registeredClass')}
                      desc={
                        i18n.language === 'uz'
                          ? get(studentProfile, 'data.class_name_uz', '').split(' ')[0]
                          : get(studentProfile, 'data.class_name_ru', '').split(' ')[0]
                      }
                    />
                  </li>
                )}
              </ul>

              <button
                onClick={() => router.push('/dashboard/student/profile/update')}
                className="border border-[#D1D1D6] flex justify-center items-center p-[12px] gap-x-[8px] rounded-[10px] w-full mt-[8px]"
              >
                <Image src={`/icons/edit.svg`} alt={`edit`} width={20} height={20} />
                <p className="font-medium">{t('edit')}</p>
              </button>
            </div>
          </div>
        </Card>
        <div className="col-span-7 p-4">
          <div className="flex gap-x-[24px]">
            <div className="space-y-[20px] w-2/3">
              <Card className="relative opacity-0 border border-[#E9E9E9] rounded-[12px] py-[12px] px-[16px] space-y-[12px]">
                <Image
                  src={`/images/education.png`}
                  alt={`education`}
                  width={71}
                  height={71}
                  className="absolute  top-9 right-9 lg:block hidden"
                />
                <p className="text-[28px] font-extrabold">6,825</p>
                <div className="space-y-[4px]">
                  <p className="text-[17px]">Общее количество учеников</p>
                  <div className="flex gap-x-[4px] items-center py-[3px]">
                    <Image src={`/icons/arrow-up.svg`} alt={`arrow-up`} width={20} height={20} />

                    <p className="text-[17px] text-[#2EB14F] font-medium">+14%</p>
                    <p className="text-[15px] font-medium text-[#8A8A8E]">Больше в этом месяце</p>
                  </div>
                </div>
              </Card>

              <Card className="relative  opacity-0 border border-[#E9E9E9] rounded-[12px] py-[12px] px-[16px] space-y-[12px]">
                <Image
                  src={`/images/education.png`}
                  alt={`education`}
                  width={71}
                  height={71}
                  className="absolute top-9 right-3"
                />
                <p className="text-[28px] font-extrabold">6,825</p>
                <div className="space-y-[4px]">
                  <p className="text-[17px]">Общее количество учеников</p>
                  <div className="flex gap-x-[4px] items-center py-[3px]">
                    <Image src={`/icons/arrow-up.svg`} alt={`arrow-up`} width={20} height={20} />

                    <p className="text-[17px] text-[#2EB14F] font-medium">+14%</p>
                    <p className="text-[15px] font-medium text-[#8A8A8E]">Больше в этом месяце</p>
                  </div>
                </div>
              </Card>
            </div>
            <Card className="bg-[#114FFF]  opacity-0 rounded-[12px] w-1/3">
              <ProgressCard />
            </Card>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
