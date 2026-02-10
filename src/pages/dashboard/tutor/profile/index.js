import ProfileDetails from '@/components/profile-details'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import LayoutAdmin from '@/layout/LayoutAdmin'

const Index = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()
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
    <LayoutAdmin title={`${t('profile')}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 lg:gap-x-[24px]">
        <div className="col-span-5 border border-[#E9E9E9] rounded-[12px]">
          <div className="flex justify-center items-center flex-col  p-[20px]">
            <div className="group w-[100px] h-[100px] border-2 border-[#5d87ff] bg-white hover:bg-[#5d87ff] rounded-full flex items-center justify-center transition-colors duration-200">
              <Image
                src="/icons/avatar.png"
                alt="user"
                width={80}
                height={80}
                className="rounded-full group-hover:brightness-0 group-hover:invert transition-all duration-200"
              />
            </div>
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
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index
