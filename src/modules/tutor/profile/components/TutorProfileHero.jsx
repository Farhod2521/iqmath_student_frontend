import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Camera, Check, GraduationCap, Mail, MapPin, Pencil, Phone } from 'lucide-react'
import heroImg from '@/assets/images/teacher/home_page.png'

const initialsOf = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || '?'

const TutorProfileHero = ({ fullName, phone, email, address, avatar, isVerified, onEdit }) => {
  const { t } = useTranslation()

  return (
    <div className="relative flex min-h-[260px] overflow-hidden rounded-3xl bg-[#EAF1FF] sm:min-h-[290px]">
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg.src})` }}
      />

      <div className="relative flex w-full flex-col gap-5 px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-stretch lg:gap-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 lg:flex-1">
          <div className="relative shrink-0">
            <div className="h-[116px] w-[116px] rounded-full bg-white p-[5px] shadow-lg sm:h-[150px] sm:w-[150px]">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt={fullName || 'avatar'} className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#5D87FF] to-[#8B5CF6] text-3xl font-extrabold text-white sm:text-4xl">
                  {initialsOf(fullName)}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => toast(t('tutorProfile.avatarSoon'))}
              className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#5D87FF] text-white ring-4 ring-white transition hover:bg-[#4570EA] sm:bottom-2 sm:right-2"
              aria-label={t('tutorProfile.avatarSoon')}
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1F3D8A] px-3 py-1.5 text-xs font-semibold text-white">
              <GraduationCap size={14} />
              {t('tutorProfile.roleBadge')}
            </span>

            <div className="mt-2.5 flex items-center gap-2">
              <h1 className="truncate text-2xl font-extrabold text-[#191C1D] sm:text-[32px] sm:leading-tight">
                {fullName || '-'}
              </h1>
              {isVerified ? (
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                  <Check size={14} strokeWidth={3} />
                </span>
              ) : null}
            </div>

            <p className="mt-1.5 text-sm italic text-[#5A6A85]">&ldquo;{t('tutorHome.quote')}&rdquo;</p>

            <div className="mt-3.5 flex flex-col gap-2">
              {phone ? (
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#191C1D]">
                    <Phone size={16} className="text-[#5A6A85]" />
                    {phone}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-[#DCF6E6] px-2 py-0.5 text-xs font-semibold text-[#0D875E]">
                    {t('tutorProfile.verified')}
                  </span>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {email ? (
                  <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[#5A6A85]">
                    <Mail size={16} className="shrink-0 text-[#5A6A85]" />
                    <span className="truncate">{email}</span>
                  </span>
                ) : null}
                {address ? (
                  <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[#5A6A85]">
                    <MapPin size={16} className="shrink-0 text-[#5A6A85]" />
                    <span className="truncate">{address}</span>
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end lg:justify-end">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#191C1D] shadow-md transition hover:bg-[#F1F4FF]"
          >
            <Pencil size={16} className="text-[#5D87FF]" />
            {t('tutorProfile.editProfile')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorProfileHero
