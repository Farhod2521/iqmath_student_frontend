import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ProgressChart } from './history/ProgressChart'
import { FileQuestion } from 'lucide-react'

function DiagnosticHistory() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data: session, status } = useSession()

  const token = session?.accessToken

  const {
    data: histories,
    isLoading,
    isError,
    error
  } = useGetQuery({
    listKeyId: '/api/v1/func_student/my-diagnost/history/progress/',
    url: '/api/v1/func_student/my-diagnost/history/progress/',
    config: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    // Agar sizning hook'ingiz qo'llasa:
    enabled: !!token
  })

  const lang = i18n.language
  const texts = useMemo(() => {
    const uz = {
      title: 'Diagnostika topshirilmagan',
      desc: 'Hozircha hech qanday diagnostika topshirmadingiz. Birinchi diagnostikani topshiring va rivojlanishingizni kuzatib boring!',
      cta: 'Diagnostika topshirish',
      error: 'Maʼlumotlarni yuklashda xatolik yuz berdi.',
      login: 'Davom etish uchun tizimga kiring.'
    }
    const ru = {
      title: 'Диагностика не пройдена',
      desc: 'Вы еще не прошли ни одной диагностики. Пройдите первую диагностику и следите за своим развитием!',
      cta: 'Пройти диагностику',
      error: 'Произошла ошибка при загрузке данных.',
      login: 'Войдите в систему, чтобы продолжить.'
    }
    return lang === 'uz' ? uz : ru
  }, [lang])

  // Auth tekshirish
  if (status === 'loading' || (status === 'authenticated' && !token)) {
    return <ContentLoader />
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-6">
              <FileQuestion className="w-16 h-16" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{texts.title}</h2>
          <p className="text-gray-600 mb-6">{texts.login}</p>
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) return <ContentLoader />

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6">
              <FileQuestion className="w-16 h-16" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{texts.error}</h2>
          <p className="text-gray-600 mb-6">{error?.message || ''}</p>
          <button
            type="button"
            onClick={() => router.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Reload
          </button>
        </div>
      </div>
    )
  }

  const items = Array.isArray(histories?.data) ? histories.data : []

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-6">
              <FileQuestion className="w-16 h-16 text-blue-600" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{texts.title}</h2>
          <p className="text-gray-600 mb-6">{texts.desc}</p>
          <button
            type="button"
            onClick={() => router.push('/dashboard/student/diagnostics')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {texts.cta}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((subject) => (
        <ProgressChart key={subject.id} subject={subject} language={lang} />
      ))}
    </div>
  )
}

export default DiagnosticHistory
