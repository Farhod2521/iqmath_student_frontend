import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import { config } from '@/config'

// Ommaviy oferta (shartnoma) — admin panel > Tizim sozlamalari > shartnoma_uz / shartnoma_ru.
// Fayl yuklanmagan bo'lsa hech narsa ko'rsatilmaydi (bo'sh havola qo'yilmaydi).
export const useOfferUrl = () => {
  const { i18n } = useTranslation()
  const { data } = useQuery({
    queryKey: ['system-settings-offer'],
    queryFn: () => request.get(URLS.systemSettings).then((res) => res.data),
    staleTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false
  })
  const settings = Array.isArray(data) ? data[0] : data
  const file = (i18n.language === 'ru' ? settings?.shartnoma_ru || settings?.shartnoma_uz : settings?.shartnoma_uz || settings?.shartnoma_ru) || null
  if (!file) return null
  return /^https?:\/\//.test(file) ? file : `${config.API_URL}${file.startsWith('/') ? '' : '/'}${file}`
}

/** Matn ichidagi "ommaviy oferta" havolasi; fayl yo'q bo'lsa null */
const OfferLink = ({ className = 'font-semibold text-[#2563EB] underline' }) => {
  const { t } = useTranslation()
  const url = useOfferUrl()
  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {t('offerLinkText')}
    </a>
  )
}

export default OfferLink
