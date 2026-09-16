import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Target, Users, BarChart3 } from 'lucide-react'
import { request } from '@/services/api'
import { URLS } from '@/constants/url'
import iqmathImg from '@/assets/images/about/iqmath.png'

const FEATURES = [
  { key: 'goal', Icon: Target, bg: 'bg-[#EAF0FF]', color: 'text-[#3076FE]' },
  { key: 'audience', Icon: Users, bg: 'bg-[#E7F8EF]', color: 'text-[#0D875E]' },
  { key: 'offer', Icon: BarChart3, bg: 'bg-[#FFF3DD]', color: 'text-[#F59E0B]' }
]

const KeyMetric = () => {
  const { t, i18n } = useTranslation()
  const language = i18n.language
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    request
      .get(URLS.systemSettings)
      .then((res) => {
        if (res.data) {
          setData(res.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching system settings:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const aboutHtml = (language === 'ru' ? data?.about_ru : data?.about_uz) ?? ''
  const styledAboutHtml = aboutHtml.replace(
    /IQmath/,
    '<span style="color:#357BFD;font-weight:700">IQmath</span>'
  )

  return (
    <div className="relative z-[2] -mt-2 pb-16 sm:-mt-4 lg:pb-24">
      <div className="mx-auto w-full bg-white px-6 py-6 sm:py-10">
        <div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <img src={iqmathImg.src} alt="" className="w-full rounded-3xl" />
            </div>

            <div className="lg:col-span-8">
              <span className="inline-flex items-center rounded-full bg-[#DCEAFE] px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-[#357BFD]">
                {t('aboutContent.badge')}
              </span>

              <h2 className="mt-3 text-2xl font-extrabold leading-snug text-[#162948] sm:text-3xl">
                {t('aboutContent.headingLine1')}
                <br />
                <span className="bg-gradient-to-r from-[#3076FE] to-[#357BFD] bg-clip-text text-transparent">
                  {t('aboutContent.headingLine2')}
                </span>
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-7">
                  {loading ? (
                    <div className="space-y-3">
                      <div className="h-4 w-full animate-pulse rounded bg-white" />
                      <div className="h-4 w-full animate-pulse rounded bg-white" />
                      <div className="h-4 w-2/3 animate-pulse rounded bg-white" />
                    </div>
                  ) : aboutHtml ? (
                    <div
                      className="rounded-2xl border border-[#F0F0F0] border-l-4 border-l-[#357BFD] bg-white p-5 text-[15px] leading-8 text-[#3A3A45] shadow-sm [&_a]:font-semibold [&_a]:text-[#5D87FF] [&_p]:mb-3 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: styledAboutHtml }}
                    />
                  ) : (
                    <p className="text-sm text-[#8A8A8E]">{t('noData')}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4 md:col-span-5">
                  {FEATURES.map(({ key, Icon, bg, color }) => (
                    <div key={key} className="flex items-start gap-3 rounded-2xl border border-[#F0F0F0] bg-white p-4 shadow-sm">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}>
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#162948]">{t(`aboutContent.${key}Title`)}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#5A6A85]">{t(`aboutContent.${key}Desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeyMetric
