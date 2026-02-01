import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import AuthModal from '../../auth/AuthModal'
import Auth from '../../auth/Auth'

const CTA = () => {
  const { t } = useTranslation()
  const [openAuth, setOpenAuth] = useState(false)

  const handleAuthRedirect = () => {
    setOpenAuth(true)
  }

  const features = useMemo(() => {
    const val = t('cta.features', { returnObjects: true })
    return Array.isArray(val) ? val : []
  }, [t])

  return (
    <>
      <section className="relative px-4 py-16 overflow-hidden sm:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* soft background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full -top-24 -left-24 h-72 w-72 bg-blue-300/30 blur-3xl" />
          <div className="absolute rounded-full -bottom-28 -right-24 h-80 w-80 bg-purple-300/30 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden shadow-2xl rounded-3xl">
            {/* animated-ish gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            {/* shine layer */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-0 w-1/2 h-full -left-1/2 rotate-12 bg-white/30 blur-2xl" />
            </div>

            <div className="relative p-8 text-center sm:p-10 md:p-12">
              <h2 className="mb-4 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                {t('cta.title')}
              </h2>

              <p className="max-w-2xl mx-auto mb-8 text-base text-white/90 sm:text-lg md:text-xl">
                {t('cta.description')}
              </p>

              {/* button */}
              <button
                onClick={handleAuthRedirect}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-extrabold text-blue-700
                         bg-white rounded-full shadow-xl transition
                         hover:-translate-y-0.5 hover:shadow-2xl
                         active:translate-y-0 active:scale-[0.98]"
              >
                {t('cta.button')}
                <IconArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={18} />
              </button>

              {/* features */}
              {features.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8 text-sm text-white/90">
                  {features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-2 border rounded-full bg-white/10 border-white/15 backdrop-blur"
                    >
                      <span className="grid w-5 h-5 rounded-full place-items-center bg-white/15">
                        <IconCheck size={14} />
                      </span>
                      <span className="font-semibold">{feature}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} title={t('login', 'Kirish / Ro‘yxatdan o‘tish')}>
        <Auth />
      </AuthModal>
    </>
  )
}

export default CTA
