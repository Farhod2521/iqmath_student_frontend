import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Eye } from 'lucide-react'

/** Mentor "O'quvchi sifatida kirish" rejimidan chiqish: o'quvchi tokeni olib tashlanadi, sahifa qayta yuklanadi */
export const exitImpersonation = () => {
  sessionStorage.removeItem('access_token')
  sessionStorage.removeItem('old_token')
  sessionStorage.removeItem('impersonated_name')
  window.location.href = '/dashboard/teacher/pupils'
}

/**
 * Mentor o'quvchi sifatida kirganda har bir sahifada pastda turadigan panel:
 * kimning nomidan ko'rilayotgani va mentor paneliga qaytish tugmasi.
 */
export default function ImpersonationBar() {
  const router = useRouter()
  const { i18n } = useTranslation()
  const [name, setName] = useState(null)

  useEffect(() => {
    try {
      setName(sessionStorage.getItem('old_token') ? sessionStorage.getItem('impersonated_name') || '' : null)
    } catch {
      setName(null)
    }
  }, [router.asPath])

  if (name === null) return null
  const ru = i18n.language === 'ru'

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[1100] flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-2xl bg-[#0F1B3D] py-2 pl-4 pr-2 text-sm text-white shadow-[0_18px_40px_-16px_rgba(15,27,61,0.8)]">
        <Eye size={18} className="shrink-0 text-[#93C5FD]" />
        <span className="min-w-0 truncate">
          {ru ? 'Вы просматриваете как ученик' : "O'quvchi sifatida ko'ryapsiz"}
          {name ? <b className="ml-1">{name}</b> : null}
        </span>
        <button
          type="button"
          onClick={exitImpersonation}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 font-semibold text-[#0F1B3D] transition hover:bg-[#E8F0FF]"
        >
          <ArrowLeft size={16} />
          {ru ? 'Назад' : 'Mentor paneli'}
        </button>
      </div>
    </div>
  )
}
