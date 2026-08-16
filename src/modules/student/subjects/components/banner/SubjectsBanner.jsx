import { useTranslation } from 'react-i18next'

// Rasm almashtirilganda brauzer keshini yangilash uchun versiyani oshiring
const BANNER_IMAGE = '/images/fanlar.png?v=2'

const SubjectsBanner = () => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#f4f0fd] dark:bg-[#252f3f] h-[130px] sm:h-[150px] lg:h-[170px] xl:h-[190px] 2xl:h-[210px] shadow-[0px_3px_17px_-8px_#00000030]">
      {/* Illyustratsiya: balandlik bo'yicha o'lchanadi va o'ngga yopishadi.
          Chap chekkasi maska bilan fon rangiga singdiriladi (rasmdagi kitoblar to'plami ham shu bilan yashiriladi). */}
      <img
        src={BANNER_IMAGE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-0 top-0 h-full w-auto max-w-none dark:opacity-70"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0, transparent 15%, #000 32%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, transparent 15%, #000 32%)'
        }}
      />

      {/* Matn ustidagi yengil parda — tor ekranda illyustratsiya matn ostiga kirib qolsa o'qilishi uchun */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f0fd] via-[#f4f0fd]/90 to-transparent to-60% dark:from-[#252f3f] dark:via-[#252f3f]/90" />

      {/* Matn */}
      <div className="relative h-full flex flex-col justify-center pl-6 sm:pl-8 lg:pl-10 pr-4">
        <h1 className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold leading-tight text-[#1f2a5b] dark:text-white">
          {t('subjects')}
        </h1>
        <p className="mt-1 max-w-[58%] sm:max-w-[46%] text-[12px] sm:text-[13px] lg:text-[14px] leading-snug text-[#5a6182] dark:text-gray-300">
          {t('subjectsBannerDescription')}
        </p>
      </div>
    </div>
  )
}

export default SubjectsBanner
