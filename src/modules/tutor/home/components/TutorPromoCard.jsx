import { useTranslation } from 'react-i18next'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, CheckCircle, QrCode, Link2, Users } from 'lucide-react'

const TutorPromoCard = ({ inviteLink, studentsCount, copied, onCopyLink }) => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF0FF] text-[#5D87FF]">
          <Link2 size={16} />
        </span>
        <p className="text-base font-bold text-[#191C1D]">{t('tutorHome.promoTitle')}</p>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-full border border-[#E9E9E9] bg-[#F8F9FE] py-2 pl-4 pr-1.5">
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#5A6A85]">{inviteLink}</span>
        <button
          onClick={onCopyLink}
          className={`shrink-0 rounded-full p-2 text-white transition-colors ${
            copied ? 'bg-emerald-500' : 'bg-[#5D87FF] hover:bg-[#4570EA]'
          }`}
        >
          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="mt-3.5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF0FF] text-[#5D87FF]">
          <Users size={18} />
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-[#191C1D]">{studentsCount}</span>
          <span className="text-sm font-semibold text-[#5A6A85]">{t('tutorHome.studentsJoinedSuffix')}</span>
        </div>
      </div>

      <div className="mt-3.5 flex flex-1 items-center gap-4 rounded-xl border border-[#EEF1FF] bg-gradient-to-br from-[#F8F9FE] to-[#EEF1FF] p-3.5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-[#E9E9E9]">
          {inviteLink ? (
            <QRCodeSVG value={inviteLink} size={68} />
          ) : (
            <QrCode size={32} className="text-[#B0B6C9]" />
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0EA5A5] text-white">
              <QrCode size={13} />
            </span>
            <p className="text-sm font-bold text-[#191C1D]">{t('tutorHome.qrShareTitle')}</p>
          </div>
          <p className="mt-1 text-xs leading-snug text-[#8A8A8E]">{t('tutorHome.qrShareDescription')}</p>
        </div>
      </div>
    </div>
  )
}

export default TutorPromoCard
