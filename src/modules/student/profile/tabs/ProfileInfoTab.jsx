import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import Image from 'next/image'
import { Avatar, AvatarIcon } from '@heroui/react'
import { SiWebmoney } from 'react-icons/si'
import {
  Phone,
  Cake,
  MapPin,
  Map as MapIcon,
  Home,
  GraduationCap,
  BookOpen,
  Building2,
  Users,
  Pencil,
  Coins,
  BadgeCheck
} from 'lucide-react'
import { useGetQuery } from '@/hooks'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'
import { useScoreStore } from '@/store'
import UzbekistanMap from '@/components/uzbekistan-map'

const InfoRow = ({ icon: Icon, title, desc }) => {
  if (!desc) return null
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-[#5D87FF]" />
      </div>
      <div>
        <p className="text-[12px] text-[#8A8A8E] mb-0.5">{title}</p>
        <p className="text-[14px] text-[#191C1D] font-medium leading-tight">{desc}</p>
      </div>
    </div>
  )
}

const SectionCard = ({ icon: Icon, title, children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm p-5 ${className}`}>
    <div className="flex items-center gap-2 mb-3">
      <Icon size={16} className="text-[#5D87FF]" />
      <h3 className="text-[14px] font-semibold text-[#191C1D]">{title}</h3>
    </div>
    <hr className="border-gray-100 mb-4" />
    {children}
  </div>
)

const ProfileInfoTab = () => {
  const { data: session } = useSession()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { scoreData } = useScoreStore()

  const { data: studentProfile } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    enabled: !!session?.accessToken
  })

  const region = get(studentProfile, 'data.region', '')
  const districts = get(studentProfile, 'data.districts', '')
  const phone = get(studentProfile, 'data.phone', '')
  const className =
    i18n.language === 'uz'
      ? get(studentProfile, 'data.class_name_uz', '').split(' ')[0]
      : get(studentProfile, 'data.class_name_ru', '').split(' ')[0]

  // TODO: static placeholder until the backend exposes a per-metric ranking endpoint
  const rankStats = [
    { key: 'sum', label: t('sum'), rank: 21, icon: <SiWebmoney size={16} className="text-[#FDA001]" /> },
    {
      key: 'coin',
      label: t('coin'),
      rank: 7,
      icon: <Image src="/icons/ball.svg" alt="tanga" width={16} height={16} />
    },
    {
      key: 'ball',
      label: t('ball'),
      rank: 42,
      icon: <Image src="/icons/coins-logo.svg" alt="ball" width={16} height={16} />
    }
  ]

  return (
    <div className="flex flex-col gap-4 bg-[#F7F8FA] -m-4 p-4">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-[#EEF3FF] via-[#F5F8FF] to-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <Avatar size="lg" className="w-20 h-20 ring-4 ring-white shadow-sm" icon={<AvatarIcon />} />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h2 className="text-[22px] font-bold text-[#191C1D] leading-tight">
                {get(studentProfile, 'data.full_name', '')}
              </h2>
              <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-white/70 text-[#8A8A8E] rounded-md border border-[#E9E9E9] text-[11px] font-medium">
                <BadgeCheck size={11} />
                ID: {get(studentProfile, 'data.identification', '')}
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-[#F0D9A6] text-[12px] font-medium text-[#B8860B]">
                  <Coins size={13} className="text-amber-500" />
                  {get(scoreData, 'coin', 0)} {t('coin')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-[#D6E0FF] text-[12px] font-medium text-[#5D87FF]">
                  <GraduationCap size={13} />
                  {className ? `${className}-${t('class')}` : ''}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/dashboard/student/profile/update')}
            className="bg-[#5D87FF] hover:bg-[#4570EA] text-white flex justify-center items-center py-2.5 px-5 gap-x-[6px] rounded-[8px] text-[13px] font-semibold transition-colors shadow-sm flex-shrink-0"
          >
            <Pencil size={14} />
            {t('editProfile')}
          </button>
        </div>
      </div>

      {/* Personal info + education (left) / location & ranking (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <SectionCard icon={Users} title={t('personalInfo')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <InfoRow icon={Phone} title={t('childPhone')} desc={phone ? `+${phone}` : ''} />
              <InfoRow icon={Cake} title={t('childBirthday')} desc={get(studentProfile, 'data.brithday', '')} />
              <InfoRow icon={MapPin} title={t('region')} desc={region} />
              <InfoRow icon={MapIcon} title={t('childRegion')} desc={districts} />
              <InfoRow icon={Home} title={t('childAddress')} desc={get(studentProfile, 'data.address', '')} />
            </div>
          </SectionCard>

          <SectionCard icon={GraduationCap} title={t('educationInfo')} className="flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 flex-1 content-center">
              <InfoRow icon={BookOpen} title={t('registeredClass')} desc={className ? `${className}-${t('class')}` : ''} />
              <InfoRow
                icon={Building2}
                title={t('educationalInstitution').replace(/:$/, '')}
                desc={get(studentProfile, 'data.academy_or_school_name', '')}
              />
            </div>
          </SectionCard>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
          <h3 className="text-[14px] font-semibold text-[#191C1D] mb-0.5">{t('territorialLocation')}</h3>
          <p className="text-[12px] text-[#5D87FF] font-medium mb-3">
            {[region, districts].filter(Boolean).join(', ')}
          </p>
          <div className="flex-1 flex items-center justify-center min-h-[140px] sm:min-h-[180px]">
            <UzbekistanMap
              regionName={region}
              className="w-full max-w-[220px] sm:max-w-[300px] aspect-[793/517] h-auto"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {rankStats.map((stat) => (
              <div
                key={stat.key}
                className="bg-[#F5F7FA] rounded-lg text-center py-3 px-1.5 flex flex-col items-center gap-1"
              >
                {stat.icon}
                <p className="text-[15px] font-bold text-[#5D87FF]">#{stat.rank}</p>
                <p className="text-[10px] text-[#8A8A8E]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoTab
