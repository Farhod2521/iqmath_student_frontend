import ContentLoader from '@/components/loader/content-loader'
import { useGetQuery } from '@/hooks'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ProgressChart } from './history/ProgressChart'
import { FileQuestion } from 'lucide-react'

function DiagnosticHistory() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const { data: histories, isLoading } = useGetQuery({
    listKeyId: '/api/v1/func_student/my-diagnost/history/progress/',
    url: '/api/v1/func_student/my-diagnost/history/progress/',
    config: {
      headers: { Authorization: `Bearer ${session?.accessToken}` }
    }
  })

  if (isLoading) return <ContentLoader />

  if (histories && histories.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center border border-gray-200">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-6">
              <FileQuestion className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {i18n.language === 'uz' ? 'Diagnostika topshirilmagan' : 'Диагностика не пройдена'}
          </h2>
          <p className="text-gray-600 mb-6">
            {i18n.language === 'uz'
              ? 'Hozircha hech qanday diagnostika topshirmadingiz. Birinchi diagnostikani topshiring va rivojlanishingizni kuzatib boring!'
              : 'Вы еще не прошли ни одной диагностики. Пройдите первую диагностику и следите за своим развитием!'}
          </p>
          <button
            onClick={() => router.push('/dashboard/student/diagnostics')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {i18n.language === 'uz' ? 'Diagnostika topshirish' : 'Пройти диагностику'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {histories.data.map((subject) => (
        <ProgressChart key={subject.id} subject={subject} language={i18n.language} />
      ))}
    </div>
  )
}

export default DiagnosticHistory
