import ProgressCard from '@/card/progress-card'
import ProfileDetails from '@/components/profile-details'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useGetQuery from '@/hooks/api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { Avatar, AvatarIcon, Button, Card } from '@heroui/react'
import MainWrapper from '@/layout/MainWrapper'
import { useTranslation } from 'react-i18next'

const Index = () => {
  const { data: session } = useSession()
  const { t, i18n } = useTranslation()
  const {
    data: teacherProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })
  const router = useRouter()

  if (isLoading) {
    return (
      <MainWrapper title={t('profile')}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </MainWrapper>
    )
  }

  return (
    <MainWrapper title={t('profile')}>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div className="col-span-5 border border-[#E9E9E9] rounded-[12px]">
          <div className="flex justify-center items-center flex-col p-[20px]">
            <Image
              src={"/images/avatar-profile.png"}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full bg-black"
            />

            <h3 className="text-[17px] font-semibold mt-[16px] mb-[6px]">
              {get(teacherProfile, "data.full_name", "")}
            </h3>
            <p className="text-[#8A8A8E] text-[15px]">ID: {get(teacherProfile, "data.id", "")}</p>
          </div>

          <div className="border-t border-t-[#E9E9E9]">
            <div className="p-[20px]">
              <ul>
                <li>
                  <ProfileDetails
                    detailIcon={"phone"}
                    title={t('phone number')}
                    desc={`+${get(teacherProfile, "data.phone", "")}`}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={"email"}
                    title={"Email"}
                    desc={get(teacherProfile, "data.email", "")}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={"calendar"}
                    title={t('birthday')}
                    desc={get(teacherProfile, "data.brithday", "")}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={"region"}
                    title={t('region')}
                    desc={get(teacherProfile, "data.region", "")}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={"region"}
                    title={t('district')}
                    desc={get(teacherProfile, "data.districts", "")}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={"address"}
                    title={t('address')}
                    desc={get(teacherProfile, "data.address", "")}
                  />
                </li>
              </ul>

              <button
                onClick={() => router.push("/dashboard/teacher/profile/update")}
                className="border border-[#D1D1D6] flex justify-center items-center p-[12px] gap-x-[8px] rounded-[10px] w-full mt-[8px]"
              >
                <Image src={`/icons/edit.svg`} alt={`edit`} width={20} height={20} />
                <p className="font-medium">{t('edit')}</p>
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-7">
          <div className="grid grid-cols-2 gap-[24px]">
            <ProgressCard
              title={t('totalStudents')}
              value={get(teacherProfile, "data.total_students", 0)}
              icon="students"
              color="blue"
            />
            <ProgressCard
              title={t('totalSubjects')}
              value={get(teacherProfile, "data.total_subjects", 0)}
              icon="subjects"
              color="green"
            />
          </div>
        </div>
      </div>
    </MainWrapper>
  )
}

export default Index 