import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'
import { useState } from 'react'
import ContentLoader from '@/components/loader/content-loader'
import EyeIcon from '/public/icons/eyeIcon'
import { useGetQuery } from '@/hooks'

const StudentSubjectsList = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState('mastery')
  const [isTabLoading, setIsTabLoading] = useState(false)

  const { data, isLoading, isFetching } = useGetQuery({
    key: ['studentSubjects', id],
    url: id ? `/api/v1/func_student/students/${id}/subjects/` : null,
    enabled: !!id && !!session?.accessToken
  })

  const subjects = get(data, 'data', data) || []

  const { data: dataD } = useGetQuery({
    key: `studentSubjectsD-${id}`,
    url: id ? `/api/v1/func_student/diagnost/students/${id}/subjects/` : null,
    enabled: !!id && !!session?.accessToken
  })

  const subjectsD = get(dataD, 'data', dataD) || []

  const handleTabChange = (tab) => {
    setIsTabLoading(true)
    setActiveTab(tab)
    // Simulate loading time to prevent UI jumping
    setTimeout(() => {
      setIsTabLoading(false)
    }, 300)
  }

  if (isLoading || isFetching || isTabLoading) {
    return <ContentLoader />
  }

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-4 font-medium">{t('subjectName')}</th>
            <th className="p-4 font-medium text-center">{t('class')}</th>
            <th className="p-4 font-medium">{t('mastery')}</th>
            <th className="p-4 font-medium text-center">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id} className="border-b last:border-none">
              <td className="p-4 font-semibold">{i18n.language === 'ru' ? subject.name_ru : subject.name_uz}</td>
              <td className="p-4 text-center align-middle">{subject.class_name}</td>
              <td className="p-4">
                <div className="flex items-center gap-2 min-w-[80px]">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          subject.mastery_percent === null || subject.mastery_percent === undefined
                            ? 0
                            : subject.mastery_percent
                        }%`
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm">
                    {subject.mastery_percent === null || subject.mastery_percent === undefined
                      ? 0
                      : subject.mastery_percent}
                    %
                  </span>
                </div>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => router.push(`/dashboard/teacher/pupils/${id}/${subject.id}`)}
                  className="text-gray-500 hover:text-blue-600"
                  title={t('details')}
                >
                  <EyeIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderTableD = () => (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="p-4 font-medium">{t('subjectName')}</th>
            <th className="p-4 font-medium text-center">{t('class')}</th>
            <th className="p-4 font-medium">{t('mastery')}</th>
            <th className="p-4 font-medium text-center">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {subjectsD.map((subject) => (
            <tr key={subject.id} className="border-b last:border-none">
              <td className="p-4 font-semibold">{i18n.language === 'ru' ? subject.name_ru : subject.name_uz}</td>
              <td className="p-4 text-center align-middle">{subject.class_name}</td>
              <td className="p-4">
                <div className="flex items-center gap-2 min-w-[80px]">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          subject.mastery_percent === null || subject.mastery_percent === undefined
                            ? 0
                            : subject.mastery_percent
                        }%`
                      }}
                    ></div>
                  </div>
                  <span className="font-semibold text-sm">
                    {subject.mastery_percent === null || subject.mastery_percent === undefined
                      ? 0
                      : subject.mastery_percent}
                    %
                  </span>
                </div>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => router.push(`/dashboard/teacher/pupils/${id}/${subject.id}`)}
                  className="text-gray-500 hover:text-blue-600"
                  title={t('details')}
                >
                  <EyeIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <div className="bg-white rounded-xl border p-4">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => handleTabChange('mastery')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'mastery' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {i18n.language === 'ru' ? 'Освоение по предметам' : "Fanlar bo'yicha o'zlashtirish"}
          </button>
          <button
            onClick={() => handleTabChange('diagnostics')}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === 'diagnostics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {i18n.language === 'ru' ? 'Диагностика' : 'Diagnostika'}
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'mastery' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{t('subjectMastery')}</h2>
              {renderTable()}
            </div>
          )}
          {activeTab === 'diagnostics' && (
            <div>
              <h2 className="text-xl font-bold mb-4">{i18n.language === 'ru' ? 'Диагностика' : 'Diagnostika'}</h2>
              {renderTableD()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentSubjectsList
