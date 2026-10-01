import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ArrowLeft, ChevronRight, Clock3, X } from 'lucide-react'

import Brand from '@/components/brand'
import LanguageDropdown from '@/components/language'
import { useScoreStore } from '@/store'
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut'

const formatTime = (seconds) => {
  const safe = Math.max(0, Math.floor(seconds || 0))
  const h = Math.floor(safe / 3600)
  const m = String(Math.floor((safe % 3600) / 60)).padStart(2, '0')
  const s = String(safe % 60).padStart(2, '0')
  return h ? `${h}:${m}:${s}` : `${m}:${s}`
}

/**
 * Savol sahifasining yuqori paneli: logo, breadcrumb, "Orqaga", jarayon (3 / 10),
 * sarflangan vaqt, tangalar, til va yopish tugmasi.
 */
function QuestionTopBar({ title, subtitle, current = 0, total = 0, elapsed = 0, onBack, onClose }) {
  const { t } = useTranslation()
  const router = useRouter()
  const { scoreData } = useScoreStore()

  useKeyboardShortcut(['Escape', 'Esc'], onClose, { ignoreInput: false })

  const percent = total ? Math.round((current / total) * 100) : 0

  return (
    <header className="sticky top-0 z-30 border-b border-[#E9EEF6] bg-white/95 backdrop-blur dark:border-[#1F2A3C] dark:bg-[#0F172A]/95">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-3 py-3 md:px-6 lg:flex-nowrap lg:gap-x-6">
        {/* Chap: logo, breadcrumb, orqaga */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-5">
          <Brand />
          <div className="hidden h-7 w-px bg-[#E5EAF2] dark:bg-[#26324A] xl:block" />
          <nav className="hidden min-w-0 items-center gap-1.5 text-[15px] xl:flex">
            <span className="truncate font-semibold text-[#191C1D] dark:text-white">{title}</span>
            <ChevronRight size={16} className="shrink-0 text-[#A0A8BA]" />
            <span className="truncate font-medium text-[#6B7385] dark:text-gray-400">{subtitle}</span>
          </nav>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#E1E7F0] bg-white px-3.5 text-sm font-semibold text-[#191C1D] transition hover:border-[#3B6FF6] hover:text-[#2563EB] dark:border-[#26324A] dark:bg-transparent dark:text-white"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">{t('questionPage.back')}</span>
          </button>
        </div>

        {/* O'rta: jarayon */}
        <div className="order-last flex w-full min-w-0 items-center gap-3 lg:order-none lg:w-auto lg:flex-1">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E9EEF6] dark:bg-[#1F2A3C]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-semibold tabular-nums text-[#6B7385] dark:text-gray-400 md:text-base">
            {current} / {total}
          </span>
        </div>

        {/* O'ng: vaqt, tanga, til, yopish */}
        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0 lg:gap-3">
          <div
            title={t('questionPage.timeSpent')}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#EEF3FF] px-3 text-sm font-bold tabular-nums text-[#2563EB] dark:bg-[#1E2B48] md:h-11 md:px-4 md:text-base"
          >
            <Clock3 size={18} />
            {formatTime(elapsed)}
          </div>

          <button
            type="button"
            onClick={() => router.push('/dashboard/student/coins')}
            className="hidden h-11 items-center gap-2 rounded-xl border border-[#EEF1F6] bg-white px-3 text-base font-bold text-[#191C1D] transition hover:bg-[#F7F8FA] dark:border-[#26324A] dark:bg-transparent dark:text-white sm:inline-flex"
          >
            <Image
              src="/images/homepage/tanga.png"
              alt={t('coin')}
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />
            {scoreData?.coin ?? 0}
          </button>

          <div className="hidden rounded-xl border border-[#EEF1F6] px-1 dark:border-[#26324A] sm:block">
            <LanguageDropdown />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EEF1F6] bg-white text-[#191C1D] shadow-sm transition hover:bg-[#F7F8FA] dark:border-[#26324A] dark:bg-transparent dark:text-white md:h-11 md:w-11"
          >
            <X size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default QuestionTopBar
