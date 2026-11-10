import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import useGetQuery from './api/useGetQuery'
import { KEYS } from '@/constants/key'
import { URLS } from '@/constants/url'

/**
 * O'quvchining obunasi va tarifi (Start / Start Pro) — /payments/subscription/trial_days/.
 * Navbar bilan bir xil kalit — so'rov bir marta yuboriladi.
 *
 * isPro — Start Pro imkoniyatlari ("Ota-ona uchun", "Chat") ochiqmi:
 *   to'langan Start Pro → ha; to'langan Start → yo'q;
 *   sinov muddati (to'lov qilinmagan, muddat tugamagan) → admin tanlagan default tarifga qarab
 *   (SubscriptionSetting.default_tariff); muddati tugagan → yo'q.
 */
export function useMyTariff(enabled = true) {
  const { i18n } = useTranslation()
  const { data: session } = useSession()
  const { data, isLoading, isError } = useGetQuery({
    key: KEYS.subscription,
    url: URLS.subscription,
    enabled: !!session?.accessToken && enabled
  })
  const sub = data?.data || {}
  const tariff = sub.tariff || null
  const daysLeft = sub.days_until_next_payment || 0
  const isActive = !!sub.is_paid || daysLeft > 0
  const isTrial = !tariff
  // Sinov muddatida — admin sozlamasidagi default tarif (Start / Start Pro); eski backend bo'lsa Start Pro
  const trialTariff = sub.trial_tariff || null
  const isPro = isActive && (tariff ? !!tariff.is_pro : trialTariff ? !!trialTariff.is_pro : true)
  const tariffName = tariff
    ? (i18n.language === 'ru' ? tariff.name_ru : tariff.name_uz) || tariff.name || ''
    : trialTariff?.name || ''

  return {
    loaded: !isLoading || isError,
    isError,
    daysLeft,
    endDate: sub.end_date || '',
    paymentAmount: sub.payment_amount || 0,
    isActive,
    isTrial,
    isPro,
    tariff,
    tariffName
  }
}
