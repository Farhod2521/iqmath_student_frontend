import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
import DeleteAccountModal from './DeleteAccountModal'

const TEXTS = {
  uz: {
    title: 'Akkauntni o‘chirish',
    desc: 'Akkauntingiz va unga tegishli barcha ma’lumotlar butunlay o‘chiriladi. Bu amalni ortga qaytarib bo‘lmaydi.',
    button: 'Akkauntni o‘chirish'
  },
  ru: {
    title: 'Удаление аккаунта',
    desc: 'Ваш аккаунт и все связанные с ним данные будут удалены безвозвратно. Это действие нельзя отменить.',
    button: 'Удалить аккаунт'
  }
}

/** Profil sahifasining pastidagi "xavfli hudud" bloki */
export default function DeleteAccountCard({ role = 'student', className = '' }) {
  const { i18n } = useTranslation()
  const text = TEXTS[i18n.language === 'ru' ? 'ru' : 'uz']
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-[#FDE2E2] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEECEC] text-[#E5484D]">
          <Trash2 size={18} />
        </span>
        <div>
          <p className="text-[15px] font-bold text-[#191C1D]">{text.title}</p>
          <p className="mt-0.5 max-w-[560px] text-[13px] leading-relaxed text-[#8A8A8E]">{text.desc}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-xl border border-[#E5484D] px-4 py-2.5 text-[14px] font-semibold text-[#E5484D] transition hover:bg-[#E5484D] hover:text-white"
      >
        {text.button}
      </button>

      <DeleteAccountModal open={open} onClose={() => setOpen(false)} role={role} />
    </div>
  )
}
