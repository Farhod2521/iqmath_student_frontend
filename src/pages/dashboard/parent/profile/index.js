import ProfileDetails from '@/components/profile-details'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useGetQuery from '@/hooks/api/useGetQuery'
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
    data: parentProfile,
    isLoading,
    isFetching
  } = useGetQuery({
    key: KEYS.parentProfile,
    url: URLS.parentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    },
    enabled: !!session?.accessToken
  })
  const router = useRouter()
  return (
    <LayoutAdmin title={`${t('profile')}`}>
      <div className="grid grid-cols-12 gap-x-[24px]">
        <div className="col-span-5 border border-[#E9E9E9] rounded-[12px]">
          <div className="flex justify-center items-center flex-col  p-[20px]">
            <Image
              src={'/images/avatar-profile.png'}
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full bg-black"
            />

            <h3 className="text-[17px] font-semibold mt-[16px] mb-[6px]">
              {get(parentProfile, 'data.full_name', '')}
            </h3>
            <p className="text-[#8A8A8E] text-[15px]">ID: {get(parentProfile, 'data.id', '')}</p>
          </div>

          <div className="border-t border-t-[#E9E9E9]">
            <div className="p-[20px]">
              <ul>
                <li>
                  <ProfileDetails
                    detailIcon={'phone'}
                    title={'Номер телефона'}
                    desc={`+${get(parentProfile, 'data.phone', '')}`}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={'email'}
                    title={'Email адрес'}
                    desc={get(parentProfile, 'data.email', '')}
                  />
                </li>

                <li>
                  <ProfileDetails
                    detailIcon={'address'}
                    title={'Адрес'}
                    desc={get(parentProfile, 'data.address', '')}
                  />
                </li>
              </ul>

              <button
                onClick={() => router.push('/dashboard/parent/profile/update')}
                className="border border-[#D1D1D6] flex justify-center items-center p-[12px] gap-x-[8px] rounded-[10px] w-full mt-[8px]"
              >
                <Image src={`/icons/edit.svg`} alt={`edit`} width={20} height={20} />
                <p className="font-medium">Изменить</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default Index