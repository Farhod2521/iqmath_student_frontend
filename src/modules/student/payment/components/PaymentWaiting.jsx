import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'

// To'lov sahifasi yangi oynada ochilgandan keyingi holat — modal jim qolmasin
const PaymentWaiting = ({ checkoutUrl }) => {
  const { t } = useTranslation()

  return (
    <div className="px-4 pb-2 text-center">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#DBE5FB] border-t-[#2F5FD0]" />
      <h3 className="text-lg font-bold text-[#2A3547] dark:text-white">{t('paymentWaitTitle')}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#5A6A85] dark:text-gray-300">{t('paymentWaitText')}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#CBD5E1] bg-white py-2.5 text-base font-medium text-[#1E293B] hover:bg-[#F1F5F9]"
        >
          <ExternalLink size={16} />
          {t('paymentWaitReopen')}
        </a>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex-1 rounded-2xl bg-gradient-to-r from-[#4C7CF3] to-[#2F5FD0] py-2.5 text-base font-medium text-white"
        >
          {t('paymentWaitCheck')}
        </button>
      </div>
    </div>
  )
}

export default PaymentWaiting
