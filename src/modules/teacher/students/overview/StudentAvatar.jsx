import { UserRound } from 'lucide-react'

/** Foydalanuvchining standart avatari (profil rasmi bo'lmasa) */
export default function StudentAvatar({ size = 120, className = '' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-[#EAF1FF] to-[#C7DBFF] text-[#2563EB] shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <UserRound size={Math.round(size * 0.5)} strokeWidth={1.8} />
    </span>
  )
}
