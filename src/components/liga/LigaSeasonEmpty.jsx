import Image from 'next/image'

const WAVE_FADE = '[-webkit-mask-image:linear-gradient(to_top,transparent,#000_70%)] [mask-image:linear-gradient(to_top,transparent,#000_70%)]'

/** Mavsum yo'qligi: mentor va o'quvchi sahifalari uchun. title: [oldi, ko'k so'z, keyini] */
const LigaSeasonEmpty = ({ title, text }) => (
  <div className="relative -mx-3 -mb-3 overflow-hidden px-4 pb-16 pt-2 text-center sm:-mx-4 sm:-mb-4 md:-mx-6 md:-mb-6 xl:-mx-8 xl:-mb-8">
    <svg viewBox="0 0 500 160" aria-hidden="true" className={`pointer-events-none absolute bottom-0 left-0 w-1/2 ${WAVE_FADE}`}>
      <path d="M0 40C120 60 260 110 500 160H0Z" fill="#E3EDFF" fillOpacity="0.7" />
    </svg>
    <svg viewBox="0 0 500 160" aria-hidden="true" className={`pointer-events-none absolute bottom-0 right-0 w-1/2 ${WAVE_FADE}`}>
      <path d="M500 0C400 70 220 130 0 160H500Z" fill="#E3EDFF" fillOpacity="0.7" />
    </svg>

    <div className="relative mx-auto max-w-[660px]">
      <Image src="/images/league/season-empty.webp" alt="" width={1100} height={573} priority className="mx-auto h-auto w-full max-w-[560px]" />
      <h2 className="mt-5 text-[28px] font-extrabold leading-tight text-[#0B1B3F] sm:text-[38px]">
        {title[0]} <span className="text-[#1F6BFF]">{title[1]}</span> {title[2]}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-[#64748B] sm:text-[17px]">{text}</p>
    </div>
  </div>
)

export default LigaSeasonEmpty
