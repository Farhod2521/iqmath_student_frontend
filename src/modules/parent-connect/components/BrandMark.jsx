export const LOGO_URL = 'https://api.iqmath.uz/system/logo/logo.png'

/** IQMATH belgisi: logo + "MATH" yozuvi */
export default function BrandMark({ small = false }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <img src={LOGO_URL} alt="IQMATH" className={`${small ? 'h-8' : 'h-10'} w-auto object-contain`} />
      <span className={`${small ? 'text-xl' : 'text-[26px]'} font-extrabold tracking-tight text-[#0B1B3F]`}>MATH</span>
    </span>
  )
}
