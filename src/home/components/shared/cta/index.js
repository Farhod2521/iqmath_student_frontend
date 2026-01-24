import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CTA = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const handleAuthRedirect = () => {
    router.push('/auth')
  }

  const features = t('cta.features', { returnObjects: true })

  return (
    <section className="px-4 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="p-12 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl">
          <h2 className="mb-4 text-4xl font-bold text-white">{t('cta.title')}</h2>
          <p className="mb-8 text-xl text-white/90">{t('cta.description')}</p>
          <button
            onClick={handleAuthRedirect}
            className="px-10 py-4 text-lg font-bold text-blue-600 transition transform bg-white rounded-full hover:shadow-2xl hover:scale-105"
          >
            {t('cta.button')}
          </button>
          <div className="flex items-center justify-center gap-5 mt-6 text-sm text-white/80">
            {features.map((feature, idx) => (
              <span key={idx}>✓ {feature}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
