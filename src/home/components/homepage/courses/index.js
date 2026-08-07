import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Courses = () => {
  const { t } = useTranslation()

  const courses = [
    t('math'),
    t('algebra'),
    t('geometry')
    // t('statistics')
    // t('account'),
    // t('trigonometry'),
    // t('probabilityTheory')
  ]

  return (
    <section className="py-10 md:py-14">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] to-[#7C6FF5] px-6 py-8 sm:px-10 sm:py-10">
          {/* decorative faint formula */}
          <div className="absolute right-10 top-6 hidden select-none text-3xl font-bold text-white/10 sm:block md:text-4xl">
            a² + b² = c²
          </div>

          <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{t('availableCourses')}</h2>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                {t('coursesSection.subtitle')}
              </p>

              {/* Chips */}
              <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
                {courses?.map((name) => (
                  <div
                    key={name}
                    className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 sm:text-base"
                  >
                    {name}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/70 sm:text-sm">
                <span className="font-semibold text-white">{t('coursesSection.goalTitle')}: </span>
                {t('coursesSection.goalText')}
              </p>
            </div>

            {/* Image */}
            <div className="shrink-0">
              <Image
                src="/images/mavjud_kurs.png"
                alt={t('availableCourses')}
                width={260}
                height={260}
                className="h-[160px] w-[160px] object-contain sm:h-[200px] sm:w-[200px] lg:h-[240px] lg:w-[240px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Courses
