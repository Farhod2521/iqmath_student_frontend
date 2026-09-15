import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { User, Camera, Users, BookOpen, Settings, GraduationCap } from 'lucide-react'

const ParentProfileHero = ({ fullName, identification }) => {
  const { t } = useTranslation()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAF1FF] via-[#DCEAFE] to-[#C7DBFC] px-6 py-8 sm:px-9 sm:py-10">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 320"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-50 260 C 250 180, 450 340, 750 220 S 1150 120, 1300 200"
          stroke="white"
          strokeOpacity="0.45"
          strokeWidth="90"
          strokeLinecap="round"
        />
        <path
          d="M-50 60 C 200 140, 500 -20, 800 90 S 1150 220, 1300 60"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="2"
        />
        <path
          d="M-50 130 C 220 40, 480 220, 780 110 S 1120 20, 1300 140"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path
          d="M400 -40 C 550 120, 380 260, 560 320"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="2"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-52 w-72 rounded-full bg-[#5D87FF]/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-white/60">
              <User size={44} className="text-[#5D87FF]" />
            </div>
            <button
              onClick={() => toast(t('tutorHome.comingSoon'))}
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#5D87FF] text-white shadow-md ring-2 ring-white transition hover:bg-[#4570EA]"
            >
              <Camera size={15} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-extrabold leading-tight text-[#191C1D] sm:text-3xl">{fullName || '—'}</h2>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#0D875E] shadow-sm">
              <Users size={14} />
              {t('parent')}
            </span>
            {identification ? <p className="mt-2 text-sm text-[#5A6A85]">ID: {identification}</p> : null}
          </div>
        </div>

        <div className="hidden max-w-xs shrink-0 lg:block">
          <p className="text-base font-semibold italic leading-snug text-[#191C1D]/80">"{t('parentProfile.quote')}"</p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-8 hidden gap-3 sm:flex">
        <span className="flex h-12 w-12 rotate-[-8deg] items-center justify-center rounded-2xl bg-white shadow-lg">
          <BookOpen size={20} className="text-[#5D87FF]" />
        </span>
        <span className="mt-5 flex h-12 w-12 rotate-[8deg] items-center justify-center rounded-2xl bg-white shadow-lg">
          <Settings size={20} className="text-[#7626FB]" />
        </span>
        <span className="flex h-14 w-14 -rotate-3 items-center justify-center rounded-2xl bg-[#5D87FF] shadow-lg">
          <GraduationCap size={26} className="text-white" />
        </span>
      </div>
    </div>
  )
}

export default ParentProfileHero
