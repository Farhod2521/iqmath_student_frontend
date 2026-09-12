import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { get } from 'lodash'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import TutorProfileHero from '../components/TutorProfileHero'
import TutorProfileQuickLinks from '../components/TutorProfileQuickLinks'
import TutorProfileInfo from '../components/TutorProfileInfo'
import TutorProfileStats from '../components/TutorProfileStats'
import TutorProfileActivity from '../components/TutorProfileActivity'

// "998944180008" -> "+998 94 418 00 08"
const formatPhone = (phone) => {
  if (!phone) return ''
  const digits = String(phone).replace(/\D/g, '')
  if (digits.length !== 12) return `+${digits}`
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`
}

// "2024-08-12" + "14:25:00" -> "12.08.2024  14:25"
const formatRegisteredAt = (date, time) => {
  if (!date) return ''
  const [year, month, day] = String(date).split('-')
  const formattedDate = day && month && year ? `${day}.${month}.${year}` : date
  const formattedTime = time ? String(time).slice(0, 5) : ''
  return formattedTime ? `${formattedDate}  ${formattedTime}` : formattedDate
}

const TutorProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const { data: profileResponse, isLoading } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    enabled: !!session?.accessToken
  })

  const profile = useMemo(() => {
    const data = get(profileResponse, 'data', {})
    const address =
      get(data, 'address') || [get(data, 'region'), get(data, 'districts')].filter(Boolean).join(', ')

    return {
      fullName: get(data, 'full_name', ''),
      phone: formatPhone(get(data, 'phone', '')),
      email: get(data, 'email', ''),
      address,
      identification: get(data, 'identification', ''),
      registeredAt: formatRegisteredAt(get(data, 'tutor_date'), get(data, 'tutor_time')),
      isVerified: Boolean(get(data, 'status'))
    }
  }, [profileResponse])

  const goToUpdate = () => router.push('/dashboard/tutor/profile/update')

  return (
    <div className="flex flex-col gap-3 pb-4 sm:gap-4">
      <TutorProfileHero
        fullName={profile.fullName}
        phone={profile.phone}
        email={profile.email}
        address={profile.address}
        isVerified={profile.isVerified}
        onEdit={goToUpdate}
      />

      <TutorProfileQuickLinks />

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TutorProfileInfo profile={profile} isLoading={isLoading} onEdit={goToUpdate} />
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5">
          <TutorProfileStats />
          <TutorProfileActivity />
        </div>
      </div>
    </div>
  )
}

export default TutorProfile
